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
 * 活动信息
 */
var ActivityInfo = (function (_super) {
    __extends(ActivityInfo, _super);
    function ActivityInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 活动的完成状态
         */
        _this.completeState = false;
        /**
         * 记录玩家累计活动的数据
         */
        _this.actionNum = 0;
        /**
         * 活动是否已经过期
         */
        _this.IsOutOfTime = false;
        /**
         * 活动参与开始的时间(服务器提供)
         */
        _this.severStartDateTime = TimeManager.Utc1970;
        /**
         * 活动参与的结束时间(服务器提供)
         */
        _this.severEndDateTime = TimeManager.Utc1970;
        /**
         * 活动开始的时间
         */
        _this.startDateTime = TimeManager.Utc1970;
        /**
         * 活动的结束时间
         */
        _this.endDateTime = TimeManager.Utc1970;
        /**
         * 活动提示时间
         */
        _this.notifyTime = TimeManager.Utc1970;
        return _this;
    }
    ActivityInfo.prototype.reset = function () {
    };
    Object.defineProperty(ActivityInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            this._definition = ActivityDefined.GetInstance().getDefinition(this._id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityInfo.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    return ActivityInfo;
}(BaseServerValueInfo));
__reflect(ActivityInfo.prototype, "ActivityInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=ActivityInfo.js.map