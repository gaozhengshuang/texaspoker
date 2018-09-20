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
 * 筹码组件
 */
var ChipsShowComponent = (function (_super) {
    __extends(ChipsShowComponent, _super);
    function ChipsShowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChipsShowComponent.prototype, "allImgList", {
        get: function () {
            return this._allImgList;
        },
        enumerable: true,
        configurable: true
    });
    ChipsShowComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this._chipsCon = new egret.DisplayObjectContainer();
        this._allImgList = new Array();
        this.addChild(this._chipsCon);
    };
    ChipsShowComponent.prototype.init = function (data) {
        _super.prototype.init.call(this, data);
        this.initClear();
        this._chipsCon.removeChildren();
        this._betCallback = null;
        if (data.callback && data.thisObject) {
            this._betCallback = qin.Delegate.getOut(data.callback, data.thisObject);
        }
        if (data.type != undefined) {
            this._lastPos = data.type;
            this.chipsShow(data.num, data.type);
        }
        else {
            if (this._lastPos == undefined) {
                this._lastPos = ChipsPosType.Left;
            }
            this.chipsShow(data.num, this._lastPos);
        }
        if (data.isNum != undefined) {
            this.chipBar.visible = data.isNum;
        }
        if (data.isChip != undefined) {
            this._chipsCon.visible = data.isChip;
        }
    };
    ChipsShowComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        qin.Tick.RemoveTimeoutInvoke(this.runWinCallBack, this);
    };
    ChipsShowComponent.prototype.rendererStart = function (event) {
        _super.prototype.rendererStart.call(this, event);
        if (this._allImgList.length > 0 && this._allImgList[0].length > 0) {
            this._chipsCon.y = (this.height - this._allImgList[0][0].height) / 2;
        }
    };
    /**
     * 筹码组件
    */
    ChipsShowComponent.prototype.chipsShow = function (data, pos) {
        this.numLabel.text = qin.MathUtil.formatNum(data);
        if (this.bindData.isFixedWidth) {
            this.numLabel.width = 180;
            this.numLabel.horizontalCenter = 0;
        }
        else {
            this.numLabel.horizontalCenter = undefined;
        }
        this.bgImg.width = this.numLabel.width + ChipsShowComponent._oneWidth + ChipsShowComponent._offsetW;
        this.bgImg.x = 0;
        this.creatChips(data);
        if (pos == ChipsPosType.Left) {
            this.numLabel.x = ChipsShowComponent._oneWidth;
            this.numLabel.textAlign = egret.HorizontalAlign.LEFT;
        }
        else if (ChipsPosType.Right) {
            this.numLabel.x = ChipsShowComponent._offsetW;
            this.numLabel.textAlign = egret.HorizontalAlign.RIGHT;
        }
        if (this.bindData.isFixedWidth) {
            this.numLabel.textAlign = egret.HorizontalAlign.CENTER;
            this.numLabel.x = ChipsShowComponent._oneWidth - 25;
        }
        this.setInitValue(pos);
    };
    /**
     * 创建筹码数
     */
    ChipsShowComponent.prototype.creatChips = function (chipNum) {
        egret.Tween.removeTweens(this.chipBar);
        this.chipBar.alpha = 1;
        if (ChipsDefined.GetInstance().dataList) {
            var imgList = new Array();
            var dataLen = ChipsDefined.GetInstance().dataList.length;
            var def = void 0;
            for (var i = dataLen - 1; i >= 0; i--) {
                def = ChipsDefined.GetInstance().dataList[i];
                var imgNum = Math.floor(chipNum / def.phase);
                for (var j = 0; j < imgNum; j++) {
                    var img = ChipsPot.popImg(def.img + ResSuffixName.PNG);
                    imgList.push(img);
                }
                chipNum %= def.phase;
            }
            this._allImgList.push(imgList);
        }
    };
    /**
     * 设置初始值
    */
    ChipsShowComponent.prototype.setInitValue = function (pos) {
        var len = this._allImgList.length;
        if (len > 0) {
            var imgArray = this._allImgList[0];
            var imgLen = imgArray.length;
            var img = void 0;
            var yPos = -imgLen * ChipsShowComponent._chipSelfHeight * 2;
            if (yPos < -300) {
                yPos = -300;
            }
            else if (yPos > -80) {
                yPos = -80;
            }
            for (var m = 0; m < imgLen; m++) {
                img = imgArray[m];
                img.y = yPos;
                if (pos == ChipsPosType.Left) {
                    img.x = 0;
                }
                else if (pos == ChipsPosType.Right) {
                    img.x = this.bgImg.width - ChipsShowComponent._oneWidth + 3;
                }
                this._chipsCon.addChild(img);
            }
            this.createVerticalTween();
        }
    };
    /**
     * 设置下注动画
    */
    ChipsShowComponent.prototype.createVerticalTween = function () {
        var imgList = this._allImgList[0];
        var len = imgList.length;
        if (this.bindData.isTween) {
            for (var m = 0; m < len; m++) {
                if (m == len - 1) {
                    egret.Tween.get(imgList[m]).wait(m * 40).to({ y: -m * ChipsShowComponent._chipSelfHeight }, len * 50, egret.Ease.quintOut).call(this.betOver, this);
                }
                else {
                    egret.Tween.get(imgList[m]).wait(m * 40).to({ y: -m * ChipsShowComponent._chipSelfHeight }, len * 50, egret.Ease.quintOut);
                }
            }
        }
        else {
            for (var m = 0; m < len; m++) {
                imgList[m].y = -m * ChipsShowComponent._chipSelfHeight;
            }
            this.betOver();
        }
    };
    ChipsShowComponent.prototype.betOver = function () {
        if (this._betCallback) {
            this._betCallback.invoke(this);
            qin.Delegate.putIn(this._betCallback);
            this._betCallback = null;
        }
    };
    /**
     * 赢取筹码动画
     */
    ChipsShowComponent.prototype.winChipsTween = function (pointList, callBack, thisObj) {
        this._winCallBack = undefined;
        if (callBack && thisObj) {
            this._winCallBack = qin.Delegate.getOut(callBack, thisObj);
        }
        var pLen = pointList.length;
        var imgList;
        var dis;
        var time;
        if (this._allImgList.length > 0) {
            var point = void 0;
            for (var i = 0; i < pLen; i++) {
                point = pointList[i];
                dis = egret.Point.distance(point, new egret.Point(this._allImgList[0][0].x, this._allImgList[0][0].y));
                time = dis * ChipsShowComponent._winChipsSpeed;
                if (i == 0) {
                    this.toRunList(this._allImgList[0], point.x, point.y, true, time);
                }
                else {
                    imgList = this.cloneImgList(this._allImgList[0]); //处理 多人分配奖池的情况
                    this.toRunList(imgList, point.x, point.y, false, time);
                }
            }
        }
    };
    ChipsShowComponent.prototype.toRunList = function (imgList, x, y, isAddCallBack, time) {
        var len = imgList.length;
        var waitTime = 0;
        var totalTime = 0;
        time = Math.floor(time);
        var waitProportion = 0.6;
        var alphaProportion = 0.4;
        var center = Math.floor(len / 2);
        for (var n = len - 1; n >= 0; n--) {
            if (n == center && isAddCallBack) {
                waitTime = (len - n) * 43;
                totalTime = waitTime + time;
                egret.Tween.get(imgList[n]).wait(totalTime * waitProportion).to({ alpha: 0 }, totalTime * alphaProportion);
                egret.Tween.get(imgList[n]).wait(waitTime).to({ x: x, y: y }, time, egret.Ease.quartInOut).call(this.remove, this);
            }
            else {
                waitTime = (len - n) * 43;
                totalTime = waitTime + time;
                egret.Tween.get(imgList[n]).wait(totalTime * waitProportion).to({ alpha: 0 }, totalTime * alphaProportion);
                egret.Tween.get(imgList[n]).wait(waitTime).to({ x: x, y: y }, time, egret.Ease.quartInOut);
            }
        }
        qin.Tick.AddTimeoutInvoke(this.runWinCallBack, time, this);
    };
    ChipsShowComponent.prototype.runWinCallBack = function () {
        if (this._winCallBack) {
            this._winCallBack.invoke();
            qin.Delegate.putIn(this._winCallBack);
            this._winCallBack = null;
        }
    };
    /**
     * 获取图片列表
     */
    ChipsShowComponent.prototype.cloneImgList = function (sourceList) {
        var imgList = new Array();
        var imgLen = sourceList.length;
        var img;
        var sourceImg;
        for (var j = 0; j < imgLen; j++) {
            sourceImg = sourceList[j];
            img = ChipsPot.popImg(sourceImg.source);
            img.x = sourceImg.x;
            img.y = sourceImg.y;
            img.alpha = 1;
            img.scaleX = sourceImg.scaleX;
            img.scaleY = sourceImg.scaleY;
            imgList.push(img);
            this._chipsCon.addChild(img);
        }
        this._allImgList.push(imgList);
        return imgList;
    };
    /**
     * 移除下注条
    */
    ChipsShowComponent.prototype.remove = function () {
        egret.Tween.get(this.chipBar).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(this.clear, this);
    };
    /**
     * 清除图片列表和移除子项
    */
    ChipsShowComponent.prototype.clear = function () {
        this.initClear();
        ChipsPot.pushComponent(this);
    };
    ChipsShowComponent.prototype.initClear = function () {
        var imgLen;
        var img;
        for (var _i = 0, _a = this._allImgList; _i < _a.length; _i++) {
            var imgList = _a[_i];
            imgLen = imgList.length;
            for (var i = 0; i < imgLen; i++) {
                img = imgList[i];
                egret.Tween.removeTweens(img);
                this._chipsCon.removeChild(img);
                ChipsPot.pushImg(img);
            }
            imgList.length = 0;
        }
        egret.Tween.removeTweens(this.chipBar);
        qin.Tick.RemoveTimeoutInvoke(this.runWinCallBack, this);
        this._allImgList.length = 0;
        qin.Delegate.putIn(this._winCallBack);
        this._winCallBack = null;
        this._betCallback = null;
    };
    /**
    * 静态数据配置
    */
    ChipsShowComponent._chipSelfHeight = 5.5;
    ChipsShowComponent._oneWidth = 33;
    ChipsShowComponent._offsetW = 8;
    ChipsShowComponent._winChipsSpeed = 1.8;
    return ChipsShowComponent;
}(BaseComponent));
__reflect(ChipsShowComponent.prototype, "ChipsShowComponent");
/**
 * 筹码位置
*/
var ChipsPosType;
(function (ChipsPosType) {
    /**
     * 左边显示
     */
    ChipsPosType[ChipsPosType["Left"] = 1] = "Left";
    /**
     * 右边显示
     */
    ChipsPosType[ChipsPosType["Right"] = 2] = "Right";
})(ChipsPosType || (ChipsPosType = {}));
//# sourceMappingURL=ChipsShowComponent.js.map