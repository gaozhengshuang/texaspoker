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
 * 子活动信息
 */
var BaseActivitySubInfo = (function (_super) {
    __extends(BaseActivitySubInfo, _super);
    function BaseActivitySubInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseActivitySubInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
            if (this.isUnSetedDefnition) {
                this.trySetDefinition();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseActivitySubInfo.prototype, "subId", {
        /**
         * 子ID
         */
        get: function () {
            return this._subId;
        },
        set: function (value) {
            this._subId = value;
            if (this.isUnSetedDefnition) {
                this.trySetDefinition();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseActivitySubInfo.prototype, "definition", {
        /**
         * 映射的配置表数据
         */
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseActivitySubInfo.prototype, "isUnSetedDefnition", {
        /**
         * 是否未设置过配置数据
         */
        get: function () {
            return this._id > 0 && this._subId > 0 && !this._definition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 此方法需要在子类重写 设置信息配置表映射
     */
    BaseActivitySubInfo.prototype.trySetDefinition = function () {
    };
    return BaseActivitySubInfo;
}(BaseServerValueInfo));
__reflect(BaseActivitySubInfo.prototype, "BaseActivitySubInfo", ["IHaveDefintionInfo"]);
//# sourceMappingURL=BaseActivitySubInfo.js.map