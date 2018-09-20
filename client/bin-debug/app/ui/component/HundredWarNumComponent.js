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
 * 百人大战数字组件
 */
var HundredWarNumComponent = (function (_super) {
    __extends(HundredWarNumComponent, _super);
    function HundredWarNumComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HundredWarNumComponent.prototype.init = function (str, type, gap) {
        if (type === void 0) { type = NumResType.HundredWar; }
        if (!this.numList) {
            this.numList = new Array();
        }
        this.reset();
        this.type = type;
        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            this.setNum(char);
        }
        if (gap) {
            var Hlayer = this.numGroup.layout;
            Hlayer.gap = gap;
        }
    };
    HundredWarNumComponent.prototype.setNum = function (char) {
        var numImg;
        for (var _i = 0, _a = this.numList; _i < _a.length; _i++) {
            var num = _a[_i];
            if (!num.visible) {
                num.visible = true;
                numImg = num;
                break;
            }
        }
        if (!numImg) {
            numImg = new eui.Image();
            this.numList.push(numImg);
            this.numGroup.addChild(numImg);
        }
        var prefixName;
        if (this.type == NumResType.HundredWar) {
            prefixName = ResPrefixName.HundredWarNum;
        }
        else if (this.type == NumResType.HundredWar2) {
            prefixName = ResPrefixName.HundredWarNum2;
        }
        if (prefixName) {
            switch (char) {
                case ",":
                    numImg.source = prefixName + "10" + ResSuffixName.PNG;
                    break;
                case "$":
                    numImg.source = prefixName + "s" + ResSuffixName.PNG;
                    break;
                default:
                    numImg.source = prefixName + parseInt(char) + ResSuffixName.PNG;
                    break;
            }
        }
        else {
            qin.Console.logError("数字类型错误！   type：" + this.type);
        }
        numImg.scaleX = numImg.scaleY = this.height / numImg.texture.textureHeight;
    };
    HundredWarNumComponent.prototype.reset = function () {
        for (var _i = 0, _a = this.numList; _i < _a.length; _i++) {
            var num = _a[_i];
            num.visible = false;
        }
        this.type = null;
    };
    return HundredWarNumComponent;
}(BaseComponent));
__reflect(HundredWarNumComponent.prototype, "HundredWarNumComponent");
//# sourceMappingURL=HundredWarNumComponent.js.map