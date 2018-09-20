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
 * 图片数字组件
 */
var ImageNumComponent = (function (_super) {
    __extends(ImageNumComponent, _super);
    function ImageNumComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._imgList = new Array();
        return _this;
    }
    ImageNumComponent.prototype.init = function (data) {
        this.clear();
        this._numWidth = data.numWidth;
        this._numHeight = data.numHeight;
        this._wordWidth = data.wordWidth;
        this._wordHeight = data.wordHeight;
        var totalWidth = 0;
        var img;
        var index = 0;
        this.numGroup.layout.gap = data.gap;
        var str;
        for (var i = 0; i < data.content.length; i++) {
            str = data.content.substr(i, 1);
            if (ImageNumComponent._numStr.indexOf(str) != -1) {
                img = this.getImg(index);
            }
            else {
                img = new eui.Image();
                this._imgList.push(img);
            }
            img.source = this.getSource(str, data.preFix);
            this.numGroup.addChild(img);
            totalWidth += img.width;
            index++;
        }
        this.checkWidth(totalWidth, data.limtiWidth);
    };
    /**
     * 获取图片
     */
    ImageNumComponent.prototype.getImg = function (index) {
        var img;
        if (index < this._imgList.length) {
            img = this._imgList[index];
            this.resetImg(img);
            return img;
        }
        img = new eui.Image();
        this._imgList.push(img);
        return img;
    };
    /**
     * 创建图片
     */
    ImageNumComponent.prototype.getSource = function (str, resName) {
        switch (str) {
            case "万":
                return SheetSubName.Achieve_Million;
            case "亿":
                return SheetSubName.Achieve_Billion;
            case ":":
                return SheetSubName.CountDown_Colon;
            default:
                if (str != qin.StringConstants.Empty && str != undefined) {
                    return resName + str + "_png";
                }
                else {
                    return qin.StringConstants.Empty;
                }
        }
    };
    /**
     * 检查是否缩放
     */
    ImageNumComponent.prototype.checkWidth = function (width, limit) {
        if (width > limit) {
            for (var _i = 0, _a = this._imgList; _i < _a.length; _i++) {
                var img = _a[_i];
                var temp = parseFloat((limit / width).toFixed(2));
                img.width *= temp;
                img.height *= temp;
            }
        }
    };
    ImageNumComponent.prototype.clear = function () {
        this.numGroup.removeChildren();
        qin.ArrayUtil.Clear(this._imgList);
    };
    ImageNumComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.clear();
    };
    /**
     * 还原图片缩放
     */
    ImageNumComponent.prototype.resetImg = function (img) {
        if (img.source == SheetSubName.Achieve_Million || img.source == SheetSubName.Achieve_Billion) {
            img.width = this._wordWidth;
            img.height = this._wordHeight;
        }
        else {
            img.width = this._numWidth;
            img.height = this._numHeight;
        }
    };
    /**
     * 数字字符串
     */
    ImageNumComponent._numStr = "0123456789";
    ImageNumComponent._wordStr = "万亿";
    return ImageNumComponent;
}(BaseComponent));
__reflect(ImageNumComponent.prototype, "ImageNumComponent");
/**
 * 数字内容信息(一定要设置图片素材大小)
 */
var NumContentInfo = (function () {
    function NumContentInfo() {
        /**
         * 数字水平间距
         */
        this.gap = 0;
    }
    /**
     * 设置图片大小
     */
    NumContentInfo.prototype.setImgWidHei = function (numWidth, numHeight, wordWidth, wordHeight) {
        this.numWidth = numWidth;
        this.numHeight = numHeight;
        this.wordWidth = wordWidth;
        this.wordHeight = wordHeight;
    };
    return NumContentInfo;
}());
__reflect(NumContentInfo.prototype, "NumContentInfo");
//# sourceMappingURL=ImageNumComponent.js.map