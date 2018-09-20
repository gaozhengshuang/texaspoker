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
 * 牌局坑位数据支持
 */
var GamblingPanelPitDataSupport = (function (_super) {
    __extends(GamblingPanelPitDataSupport, _super);
    function GamblingPanelPitDataSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelPitDataSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
    };
    GamblingPanelPitDataSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    GamblingPanelPitDataSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
    };
    /**
     * 获取当前坑位的playerpos
     */
    GamblingPanelPitDataSupport.prototype.getPlayerPos = function (pit) {
        if (pit.headComponent.bindData) {
            return pit.headComponent.bindData.pos; //如果有玩家则直接返回玩家位置
        }
        var nextPitInfo = this.getNextPlayerPitInfo(pit);
        if (nextPitInfo) {
            var pos = GamblingPanelSetting.getPreIndex(nextPitInfo.headComponent.bindData.pos, nextPitInfo.index - pit.index);
            return pos;
        }
        else {
            return pit.index; //如果都没有则 坑位的索引即是 玩家的pos
        }
    };
    /**
     * 根据玩家位置获取坑位信息
     */
    GamblingPanelPitDataSupport.prototype.getPitInfo = function (playerPos) {
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = this.target.pitList[i - 1];
            if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.pos == playerPos) {
                return pitInfo; //如果坑位有玩家 且玩家的位置为目标位置，则返回
            }
        }
        var nextPlayerInfo = this.getNextPlayerInfo(playerPos); //没有则寻找下一个玩家
        if (nextPlayerInfo) {
            var nextPitInfo = this.getPitInfoByPlayerInfo(nextPlayerInfo);
            if (nextPitInfo) {
                var nowIndex = GamblingPanelSetting.getPreIndex(nextPitInfo.index, nextPlayerInfo.pos - playerPos);
                return this.getPitInfoByIndex(nowIndex);
            }
        }
        return this.getPitInfoByIndex(playerPos);
    };
    GamblingPanelPitDataSupport.prototype.getPitInfoByIndex = function (index) {
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            if (pitInfo.index == index) {
                return pitInfo; //如果都没有玩家信息 则玩家位置即是坑位位置
            }
        }
        return null;
    };
    /**
     * 获取头像组件，根据玩家位置
     */
    GamblingPanelPitDataSupport.prototype.getHeadComponent = function (playerPos) {
        var pitInfo = this.getPitInfo(playerPos);
        if (pitInfo) {
            return pitInfo.headComponent;
        }
        return null;
    };
    /**
     * 获取下一个有玩家的坑位信息 如果都没有则返回null
     */
    GamblingPanelPitDataSupport.prototype.getNextPlayerPitInfo = function (pit) {
        var nextIndex = GamblingPanelSetting.getNextIndex(pit.index);
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
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
    GamblingPanelPitDataSupport.prototype.getNextPlayerInfo = function (playerPos) {
        var nextPos = GamblingPanelSetting.getNextIndex(playerPos);
        for (var i = GamblingPanelSetting.MinPitIndex; i < GamblingManager.maxSeats; i++) {
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
    GamblingPanelPitDataSupport.prototype.getPitInfoByPlayerInfo = function (playerInfo) {
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = this.target.pitList[i - 1];
            if (pitInfo.headComponent.bindData && pitInfo.headComponent.bindData.roleId == playerInfo.roleId) {
                return pitInfo;
            }
        }
        return null;
    };
    return GamblingPanelPitDataSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelPitDataSupport.prototype, "GamblingPanelPitDataSupport");
//# sourceMappingURL=GamblingPanelPitDataSupport.js.map