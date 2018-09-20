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
 * 百人大战牌局坑位数据支持
 */
var HWPanelPitDataSupport = (function (_super) {
    __extends(HWPanelPitDataSupport, _super);
    function HWPanelPitDataSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HWPanelPitDataSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    HWPanelPitDataSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    HWPanelPitDataSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
    };
    /**
     * 根据玩家位置获取坑位信息
     */
    HWPanelPitDataSupport.prototype.getPitInfo = function (playerPos) {
        var pitInfo;
        for (var i = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++) {
            pitInfo = this.target.pitList[i];
            if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.pos == playerPos) {
                return pitInfo; //如果坑位有玩家 且玩家的位置为目标位置，则返回
            }
        }
        var nextPlayerInfo = this.getNextPlayerInfo(playerPos); //没有则寻找下一个玩家
        if (nextPlayerInfo) {
            var nextPitInfo = this.getPitInfoByPlayerInfo(nextPlayerInfo);
            if (nextPitInfo) {
                var nowIndex = GamblingPanelSetting.getPreIndex(nextPitInfo.pos, nextPlayerInfo.pos - playerPos);
                return this.getPitInfoByIndex(nowIndex);
            }
        }
        return this.getPitInfoByIndex(playerPos);
    };
    HWPanelPitDataSupport.prototype.getPitInfoByIndex = function (index) {
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            if (pitInfo.pos == index) {
                return pitInfo; //如果都没有玩家信息 则玩家位置即是坑位位置
            }
        }
        return null;
    };
    /**
     * 获取头像组件，根据玩家位置
     */
    HWPanelPitDataSupport.prototype.getHeadComponent = function (playerPos) {
        var pitInfo = this.getPitInfo(playerPos);
        if (pitInfo) {
            return pitInfo.headComponent;
        }
        return null;
    };
    /**
     * 获取下一个有玩家的坑位信息 如果都没有则返回null
     */
    HWPanelPitDataSupport.prototype.getNextPlayerPitInfo = function (pit) {
        var nextIndex = GamblingPanelSetting.getNextIndex(pit.pos);
        for (var i = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++) {
            var nextPitInfo = this.target.pitList[nextIndex - 1];
            if (nextPitInfo.headComponent.bindData) {
                return nextPitInfo;
            }
            // if (nextPitInfo.index == pit.index)
            // {
            // 	return null;
            // }
            nextIndex = GamblingPanelSetting.getNextIndex(nextIndex);
        }
        return null;
    };
    /**
     * 获取下一个位置的玩家信息
     */
    HWPanelPitDataSupport.prototype.getNextPlayerInfo = function (playerPos) {
        var nextPos = GamblingPanelSetting.getNextIndex(playerPos);
        for (var i = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++) {
            var nextPlayerInfo = GamblingManager.getPlayerInfoByPos(nextPos);
            if (nextPlayerInfo) {
                return nextPlayerInfo;
            }
            nextPos = GamblingPanelSetting.getNextIndex(nextPos);
        }
        return null;
    };
    /**
     * 根据玩家信息获取坑位信息
     */
    HWPanelPitDataSupport.prototype.getPitInfoByPlayerInfo = function (playerInfo) {
        var pitInfo;
        for (var i = HWPanelSetting.MinPitIndex; i < HWPanelSetting.MaxPitNum; i++) {
            pitInfo = this.target.pitList[i];
            if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.roleId == playerInfo.roleId) {
                return pitInfo;
            }
        }
        return null;
    };
    return HWPanelPitDataSupport;
}(BaseHWPanelSupport));
__reflect(HWPanelPitDataSupport.prototype, "HWPanelPitDataSupport");
//# sourceMappingURL=HWPanelPitDataSupport.js.map