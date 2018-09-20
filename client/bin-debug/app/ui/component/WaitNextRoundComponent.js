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
 * 等待下局开始面板
 */
var WaitNextRoundComponent = (function (_super) {
    __extends(WaitNextRoundComponent, _super);
    function WaitNextRoundComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 时间速度
         */
        _this._speed = 100;
        _this._rotation = 60;
        return _this;
    }
    WaitNextRoundComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._posPointList = new Array();
        this._posPointList.push(new egret.Point(108.94, 64.73), new egret.Point(90.69, 74.23), new egret.Point(73.44, 63.48), new egret.Point(73.94, 42.73), new egret.Point(92.19, 33.48), new egret.Point(109.19, 43.73));
        this.horizontalCenter = 0;
        this.verticalCenter = -150;
    };
    WaitNextRoundComponent.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._rotateIndex = 0;
        this._lastTime = 0;
    };
    WaitNextRoundComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        qin.Tick.addFrameInvoke(this.update, this);
    };
    WaitNextRoundComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        qin.Tick.removeFrameInvoke(this.update, this);
    };
    WaitNextRoundComponent.prototype.update = function () {
        if (this._lastTime == 0) {
            this._lastTime = egret.getTimer();
        }
        if (egret.getTimer() - this._lastTime >= this._speed) {
            this._lastTime = egret.getTimer();
            var tmpRotation = this._rotateIndex * this._rotation;
            var point = this._posPointList[this._rotateIndex];
            this.rotateImg.x = point.x;
            this.rotateImg.y = point.y;
            this.rotateImg.rotation = tmpRotation;
            var index = Math.ceil(this._rotateIndex / 2);
            var str = qin.StringConstants.Empty;
            for (var i = 0; i < index; i++) {
                str += qin.StringConstants.Dot;
            }
            this.desLabel.text = str;
            this._rotateIndex++;
            if (this._rotateIndex > 5) {
                this._rotateIndex = 0;
            }
        }
    };
    WaitNextRoundComponent.prototype.show = function (flag) {
        if (flag) {
            this.onEnable(null);
            this.visible = true;
        }
        else {
            this._rotateIndex = 0;
            this._lastTime = 0;
            this.onDisable(null);
            this.visible = false;
        }
    };
    return WaitNextRoundComponent;
}(BaseComponent));
__reflect(WaitNextRoundComponent.prototype, "WaitNextRoundComponent");
//# sourceMappingURL=WaitNextRoundComponent.js.map