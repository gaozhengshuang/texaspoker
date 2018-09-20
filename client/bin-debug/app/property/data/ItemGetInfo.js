var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 获得道具信息
 */
var ItemGetInfo = (function () {
    function ItemGetInfo() {
        /**
         * 尺寸
         */
        this.size = 100;
    }
    ItemGetInfo.CreateFromAwardInfoDefinition = function (infoDef, size) {
        if (size === void 0) { size = 65; }
        var info = new ItemGetInfo();
        if (infoDef != null) {
            info.id = infoDef.id;
            info.type = infoDef.type;
            info.count = infoDef.count;
            info.size = size;
        }
        return info;
    };
    ItemGetInfo.CreateFromItemInfo = function (item) {
        var info = new ItemGetInfo();
        info.id = item.id;
        if (InfoUtil.checkAvailable(item)) {
            info.type = item.definition.type;
        }
        info.count = item.count;
        return info;
    };
    return ItemGetInfo;
}());
__reflect(ItemGetInfo.prototype, "ItemGetInfo");
//# sourceMappingURL=ItemGetInfo.js.map