var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 操作CD组件
 */
var GamblingCdComponent = (function (_super) {
    __extends(GamblingCdComponent, _super);
    function GamblingCdComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._angle = 0;
        _this._phase = 0;
        _this._maxPhase = 0;
        _this._color = 0x00ff00;
        _this._totalAngle = 359;
        return _this;
    }
    GamblingCdComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._shape = new egret.Shape();
        this.addChild(this._shape);
    };
    GamblingCdComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
    };
    /**
     * 如果没有必要，面板的所有事件移除需写在此方法内
     */
    GamblingCdComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        qin.Tick.removeFrameInvoke(this.tick, this);
        this._shape.graphics.clear();
    };
    GamblingCdComponent.prototype.init = function (data) {
        if (data != undefined) {
            this._cdTime = data;
        }
        else {
            this._cdTime = 15;
        }
    };
    GamblingCdComponent.prototype.start = function (startTime, isPush) {
        this._shape.graphics.clear();
        var nowTime = TimeManager.GetServerUtcTimestamp();
        if (isPush) {
            nowTime = startTime;
        }
        else {
            nowTime = TimeManager.GetServerUtcTimestamp(); //断线重连的则用当前时间
        }
        var remainTime = nowTime - startTime;
        if (remainTime < 0) {
            remainTime = 0;
        }
        this._phase = Math.floor(remainTime * GameManager.stage.frameRate);
        this._shape.rotation = -90;
        this._maxPhase = GameManager.stage.frameRate * this._cdTime;
        this._angleStep = 360 / this._maxPhase;
        this._angle = this._angleStep * this._phase;
        this._timePhase1 = this._maxPhase / 3;
        this._timePhase2 = this._timePhase1 * 1.5;
        this.setColorData();
        this._isShock = false;
        qin.Tick.addFrameInvoke(this.tick, this);
        this.tick();
    };
    GamblingCdComponent.prototype.setColorData = function () {
        this._color = 0x00ff00;
        this._colorChangeStep1 = Math.floor((this._timePhase2 - this._timePhase1) / 0xff);
        this._colorChangeStep2 = Math.floor((this._maxPhase - this._timePhase2) / 0xff);
        if (this._colorChangeStep1 < 1) {
            this._colorChangeStep1 = 1;
        }
        if (this._colorChangeStep2 < 1) {
            this._colorChangeStep2 = 1;
        }
        this._colorStep1 = Math.ceil(0xff / (this._timePhase2 - this._timePhase1));
        this._colorStep2 = Math.ceil(0xff / (this._maxPhase - this._timePhase2));
        if (this._colorStep1 < 1) {
            this._colorStep1 = 1;
        }
        if (this._colorStep2 < 1) {
            this._colorStep2 = 1;
        }
        if (this._phase >= this._timePhase1 && this._phase < this._timePhase2) {
            this.calculateColor(0, Math.ceil(Math.min(this._phase / this._timePhase2) * 0xff)); //立即设置颜色
        }
        else if (this._phase >= this._timePhase2) {
            this.calculateColor(0, 0xff); //绿到黄
            this.calculateColor(1, Math.ceil(Math.min(1, this._phase / this._maxPhase) * 0xff)); //立即设置颜色
        }
    };
    GamblingCdComponent.prototype.rendererStart = function (event) {
        var _this = this;
        _super.prototype.rendererStart.call(this, event);
        egret.callLater(function () {
            _this._shape.x = _this.width / 2 + 2;
            _this._shape.y = _this.height / 2 + 2;
        }, this);
    };
    GamblingCdComponent.prototype.tick = function () {
        this.showCdLabel();
        this._angle = this._angleStep * this._phase;
        if (this._angle >= this._totalAngle) {
            this._angle = this._totalAngle;
        }
        this.mgraphics(this._angle);
        if (this._phase >= this._timePhase1 && this._phase < this._timePhase2) {
            if (this._phase % this._colorChangeStep1 == 0) {
                this.calculateColor(0, this._colorStep1); //绿到黄
            }
        }
        else if (this._phase >= this._timePhase2 && this._phase < this._maxPhase) {
            if (this._phase % this._colorChangeStep2 == 0) {
                this.calculateColor(1, this._colorStep2); //黄到红
            }
            if (GameSetting.shakeEnabled && GamblingUtil.getIsOnAction(GamblingManager.self) && !this._isShock) {
                ChannelManager.shake();
                this._isShock = true;
            }
        }
        this._phase += 1;
        if (this._phase > this._maxPhase) {
            //超时操作
            qin.Tick.removeFrameInvoke(this.tick, this);
            this.mgraphics(this._totalAngle);
            GamblingManager.TimeOutEvent.dispatch();
        }
    };
    /**
     * 显示CD改变
     */
    GamblingCdComponent.prototype.showCdLabel = function () {
        var num = Math.ceil((this._maxPhase - this._phase) / GameManager.stage.frameRate);
        if (num <= 0) {
            this.cdLabel.text = "0";
        }
        else {
            this.cdLabel.text = qin.DateTimeUtil.formatCountdown(num);
        }
    };
    GamblingCdComponent.prototype.mgraphics = function (angle) {
        this._shape.graphics.clear();
        this._shape.graphics.lineStyle(5, this._color, 1);
        this._shape.graphics.drawArc(0, 0, 43, 0, angle * Math.PI / 180, true);
        this._shape.graphics.endFill();
        // console.log("angle-----:" + angle);
        // let shape: egret.Shape = new egret.Shape();
        // shape.rotation = -90;
        // shape.x = this.width / 2 + 2;
        // shape.y = this.height / 2 + 2;
        // shape.graphics.clear();
        // shape.graphics.lineStyle(5, this._color, 1);
        // shape.graphics.drawArc(0, 0, 43, 0, angle * Math.PI / 180, true);
        // shape.graphics.endFill();
        // shape.cacheAsBitmap = true;
        // shape.name = "shape" + angle;
        // if (this._lastShape != null && this._lastShape.parent)
        // {
        // 	this._lastShape.parent.removeChild(this._lastShape);
        // }
        // this._lastShape = shape;
        // this.addChild(shape);
        // if (angle == this._totalAngle)
        // {
        // 	GamblingCdComponent._cdImgList.push(shape);
        // }
        // else
        // {
        // 	GamblingCdComponent._cdImgList.push(shape);
        // }
    };
    GamblingCdComponent.prototype.calculateColor = function (phase, step) {
        var tmp;
        var tmp2;
        if (phase == 0) {
            tmp = this._color >> 16 & 0xff;
            tmp += step;
            if (tmp > 0xff) {
                tmp = 0xff;
            }
            tmp2 = this._color >> 8 & 0xff;
            this._color = tmp << 16 | tmp2 << 8;
        }
        else if (phase == 1) {
            tmp = this._color >> 8 & 0xff;
            tmp -= step;
            if (tmp < 0) {
                tmp = 0;
            }
            tmp2 = this._color >> 16 & 0xff;
            this._color = tmp2 << 16 | tmp << 8;
        }
    };
    GamblingCdComponent._cdImgList = new Array();
    return GamblingCdComponent;
}(BaseComponent));
__reflect(GamblingCdComponent.prototype, "GamblingCdComponent");
//# sourceMappingURL=GamblingCdComponent.js.map