var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 筹码组件相关缓存处理
 */
var ChipsPot = (function () {
    function ChipsPot() {
    }
    /**
     * 存入一个筹码图片
     */
    ChipsPot.pushImg = function (img) {
        if (img) {
            if (ChipsPot._imgList.indexOf(img) == -1) {
                img.x = img.y = 0;
                img.alpha = 1;
                ChipsPot._imgList.push(img);
            }
        }
    };
    /**
     * 抛出一个筹码图片
     */
    ChipsPot.popImg = function (source) {
        if (source == undefined) {
            return new eui.Image();
        }
        var img;
        for (var i = 0; i < ChipsPot._imgList.length; i++) {
            img = ChipsPot._imgList[i];
            if (img.source == source) {
                ChipsPot._imgList.splice(i, 1);
                return img;
            }
        }
        return new eui.Image(source);
    };
    /**
     * 存入一个筹码显示组件
     */
    ChipsPot.pushComponent = function (component) {
        if (component) {
            if (ChipsPot._componentList.indexOf(component) == -1) {
                ChipsPot._componentList.push(component);
            }
        }
    };
    /**
     * 抛出一个筹码显示组件
     */
    ChipsPot.popComponent = function () {
        var component = ChipsPot._componentList.pop();
        if (!component) {
            component = new ChipsShowComponent(UIComponentSkinName.ChipsShowComponent);
        }
        return component;
    };
    ChipsPot._componentList = new Array();
    ChipsPot._imgList = new Array();
    return ChipsPot;
}());
__reflect(ChipsPot.prototype, "ChipsPot");
//# sourceMappingURL=ChipsPot.js.map