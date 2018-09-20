var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局面板设置
 */
var GamblingPanelSetting = (function () {
    function GamblingPanelSetting() {
    }
    /**
     * 向后获取指定差值个目标索引
     */
    GamblingPanelSetting.getNextIndex = function (sourceIndex, offset) {
        if (offset === void 0) { offset = 1; }
        sourceIndex += offset;
        if (sourceIndex > GamblingManager.maxSeats) {
            sourceIndex -= GamblingManager.maxSeats;
        }
        return sourceIndex;
    };
    /**
     * 向前获取指定差值个目标索引
     */
    GamblingPanelSetting.getPreIndex = function (sourceIndex, offset) {
        if (offset === void 0) { offset = 1; }
        if (sourceIndex < GamblingManager.maxSeats) {
            sourceIndex -= offset;
        }
        else {
            sourceIndex = 0 - offset;
        }
        if (sourceIndex <= 0) {
            sourceIndex += GamblingManager.maxSeats;
        }
        if (sourceIndex < GamblingPanelSetting.MinPitIndex) {
            sourceIndex = GamblingPanelSetting.MinPitIndex;
        }
        if (sourceIndex > GamblingManager.maxSeats) {
            return sourceIndex - GamblingManager.maxSeats;
        }
        return sourceIndex;
    };
    /**
     * 获取两个索引的差值
     */
    GamblingPanelSetting.getOffset = function (sourceIndex, targetIndex) {
        var offset = targetIndex - sourceIndex;
        if (offset < 0) {
            return offset + GamblingManager.maxSeats;
        }
        return offset;
    };
    Object.defineProperty(GamblingPanelSetting, "centerNum", {
        /**
         * 获取座位中间值
         */
        get: function () {
            if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition) {
                return Math.floor(GamblingManager.roomInfo.definition.seat / 2) + 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 获取头像位置列表信息
    */
    GamblingPanelSetting.getHeadPosList = function () {
        if (GamblingManager.roomInfo) {
            switch (GamblingManager.maxSeats) {
                case SeatMode.Three:
                    return GamblingPanelSetting.headPosList3;
                case SeatMode.Five:
                    return GamblingPanelSetting.headPosList5;
                case SeatMode.Six:
                    return GamblingPanelSetting.headPosList6;
                case SeatMode.Nine:
                    return GamblingPanelSetting.headPosList9;
            }
        }
        return null;
    };
    Object.defineProperty(GamblingPanelSetting, "buttonPosList", {
        /**
         * 获取按钮位置 由于自适应已废弃
         */
        get: function () {
            if (GamblingManager.roomInfo) {
                switch (GamblingManager.maxSeats) {
                    case SeatMode.Five:
                        return GamblingPanelSetting.buttonPosList5;
                    case SeatMode.Six:
                        return GamblingPanelSetting.buttonPosList6;
                    case SeatMode.Nine:
                        return GamblingPanelSetting.buttonPosList9;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 最小坑位索引
     */
    GamblingPanelSetting.MinPitIndex = 1;
    /**
     * 最大座位数量
     */
    GamblingPanelSetting.MaxPitIndex = 9;
    /**
     * 本家手牌的变形
     */
    GamblingPanelSetting.handCardMatrix1 = new egret.Matrix(1.502, -0.285, 0.285, 1.502, 55, 245);
    GamblingPanelSetting.handCardMatrix2 = new egret.Matrix(1.507, 0.259, -0.259, 1.507, 98, 260);
    GamblingPanelSetting.handCardMatrix3 = new egret.Matrix(1.507, 0, 0, 1.507, 30, 245);
    GamblingPanelSetting.handCardMatrix4 = new egret.Matrix(1.507, 0, 0, 1.507, 65, 245);
    GamblingPanelSetting.handCardMatrix5 = new egret.Matrix(1.507, 0, 0, 1.507, 100, 245);
    GamblingPanelSetting.handCardMatrix6 = new egret.Matrix(1.507, 0, 0, 1.507, 135, 245);
    /**
     * 桌面牌
     */
    GamblingPanelSetting.boardCardMatrix = new egret.Matrix(1.23, 0, 0, 1.23);
    /**
     * 弃牌目标位置
     */
    GamblingPanelSetting.FoldPosPoint = new egret.Point(360.5, 601.5);
    /**
     * 发牌起始的相对布局属性v
     */
    GamblingPanelSetting.FlopCardVerticalCenter = -57.5;
    /**
     * 公共牌的起始的相对布局v c
     */
    GamblingPanelSetting.BoardCardPoint = new egret.Point(-20, -183.5);
    /**
    * 按钮位置列表 位置从0-9 由于自适应已废弃
    */
    GamblingPanelSetting.buttonPosList9 = [
        new egret.Point(0, 0),
        new egret.Point(256, 955),
        new egret.Point(139, 740),
        new egret.Point(139, 412),
        new egret.Point(139, 208),
        new egret.Point(291, 281),
        new egret.Point(400, 281),
        new egret.Point(552, 208),
        new egret.Point(552, 412),
        new egret.Point(552, 740)
    ];
    /**
    * 按钮位置列表 位置从0-6 由于自适应已废弃
    */
    GamblingPanelSetting.buttonPosList6 = [
        new egret.Point(0, 0),
        new egret.Point(256, 955),
        new egret.Point(139, 742),
        new egret.Point(139, 388),
        new egret.Point(256, 281),
        new egret.Point(552, 388),
        new egret.Point(552, 742)
    ];
    /**
    * 按钮位置列表 位置从0-5 由于自适应已废弃
    */
    GamblingPanelSetting.buttonPosList5 = [
        new egret.Point(0, 0),
        new egret.Point(256, 955),
        new egret.Point(139, 412),
        new egret.Point(291, 281),
        new egret.Point(400, 281),
        new egret.Point(552, 412)
    ];
    /**
     * 用于做头像自适应的 top bottom
     */
    GamblingPanelSetting.headTopBottomReleativePoint = new egret.Point(53, 137);
    /**
     * 头像位置列表
     */
    GamblingPanelSetting.headPosList9 = [
        new egret.Point(0, 0),
        new egret.Point(0, 137),
        new egret.Point(-303.5, 179.5),
        new egret.Point(-303.5, -26.5),
        new egret.Point(-303.5, -304.5),
        new egret.Point(-126.5, 53),
        new egret.Point(125.5, 53),
        new egret.Point(302.5, -304.5),
        new egret.Point(302.5, -26.5),
        new egret.Point(302.5, 179.5)
    ];
    /**
     * 6人桌头像位置
     */
    GamblingPanelSetting.headPosList6 = [
        new egret.Point(0, 0),
        new egret.Point(0, 137),
        new egret.Point(-303.5, 394),
        new egret.Point(-303.5, -303.5),
        new egret.Point(0, 53),
        new egret.Point(302.5, -303.5),
        new egret.Point(302.5, 394)
    ];
    /**
    * 头像位置列表5人桌
    */
    GamblingPanelSetting.headPosList5 = [
        new egret.Point(0, 0),
        new egret.Point(0, 137),
        new egret.Point(-303.5, 394),
        new egret.Point(-303.5, -303.5),
        new egret.Point(302.5, -303.5),
        new egret.Point(302.5, 394)
    ];
    /**
    * 头像位置列表3人桌
    */
    GamblingPanelSetting.headPosList3 = [
        new egret.Point(0, 0),
        new egret.Point(0, 137),
        new egret.Point(-303.5, 700),
        new egret.Point(302.5, 700)
    ];
    /**
     * 公共牌列表 v c
     */
    GamblingPanelSetting.boardPosList = [
        new egret.Point(-179, 0),
        new egret.Point(-78, 0),
        new egret.Point(23, 0),
        new egret.Point(124, 0),
        new egret.Point(225, 0),
    ];
    return GamblingPanelSetting;
}());
__reflect(GamblingPanelSetting.prototype, "GamblingPanelSetting");
//# sourceMappingURL=GamblingPanelSetting.js.map