var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 成就/任务进度信息基类
 */
var BaseAchieveProcessInfo = (function () {
    function BaseAchieveProcessInfo(group) {
        this.group = group;
        this.process = 0;
        this.achieveList = new Array();
        for (var _i = 0, _a = UserManager.userInfo.allAchieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.definition && info.definition.group == this.group) {
                this.achieveList.push(info);
                var curInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.id);
                var preInfo = AchievementManager.getAchieveInfoById(UserManager.userInfo.allAchieveList, info.definition.preId);
                if ((!preInfo || preInfo.isComplete) && !curInfo.isComplete) {
                    this.step = curInfo.id;
                }
            }
        }
        if (this.achieveList.length > 0) {
            var achieveDef = this.achieveList[0].definition;
            if (achieveDef) {
                this.type = achieveDef.type;
                this.tag = achieveDef.tag;
                this.dailyQuest = achieveDef.dailyQuest;
            }
        }
    }
    Object.defineProperty(BaseAchieveProcessInfo.prototype, "process", {
        get: function () {
            return this._process;
        },
        set: function (value) {
            if (this._process != undefined && value != undefined && this._process != value && this.tag == AchieveTag.Quest) {
                AchieveProcessManager.processUpdateEvent.dispatch();
            }
            if (this.achieveList) {
                for (var _i = 0, _a = this.achieveList; _i < _a.length; _i++) {
                    var info = _a[_i];
                    if (info.definition) {
                        if (info.definition.para1 <= value) {
                            info.isComplete = true;
                        }
                        else {
                            this.step = info.id;
                            break;
                        }
                    }
                }
            }
            this._process = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAchieveProcessInfo.prototype, "takeStep", {
        /**
         * 领取奖励的步骤数（现该领取哪个任务的奖励）
         */
        get: function () {
            for (var i = 0; i < this.achieveList.length; i++) {
                if (!this.achieveList[i].isTake) {
                    return this.achieveList[i].id;
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAchieveProcessInfo.prototype, "isTakeComplete", {
        get: function () {
            return this.takeStep == undefined;
        },
        enumerable: true,
        configurable: true
    });
    BaseAchieveProcessInfo.prototype.init = function (process) {
        this.process = process;
    };
    /**
     * 更新进度
     */
    BaseAchieveProcessInfo.prototype.onProcessUpdate = function (param) {
    };
    /**
     * 获得当前步骤的任务信息
     */
    BaseAchieveProcessInfo.prototype.getCurrentAchieveInfo = function () {
        for (var _i = 0, _a = this.achieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.id == this.step) {
                return info;
            }
        }
        return null;
    };
    /**
     * 重置任务进度
     */
    BaseAchieveProcessInfo.prototype.resetProcess = function () {
        this.process = 0;
        for (var _i = 0, _a = this.achieveList; _i < _a.length; _i++) {
            var info = _a[_i];
            info.isComplete = false;
            info.isTake = false;
        }
        if (this.achieveList.length > 0) {
            this.step = this.achieveList[0].id;
        }
    };
    BaseAchieveProcessInfo.prototype.destroy = function () {
    };
    return BaseAchieveProcessInfo;
}());
__reflect(BaseAchieveProcessInfo.prototype, "BaseAchieveProcessInfo");
//# sourceMappingURL=BaseAchieveProcessInfo.js.map