var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 活动处理交互基类
 */
var BaseActivitySubHandler = (function () {
    function BaseActivitySubHandler(type) {
        /**
         * 活动列表
         */
        this._list = new Array();
        this.type = type;
    }
    Object.defineProperty(BaseActivitySubHandler.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化
     */
    BaseActivitySubHandler.prototype.initialize = function (info) {
        var isExist = false;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var childInfo = _a[_i];
            if (info.id == childInfo.id) {
                isExist = true;
                childInfo.copyValueFrom(info);
            }
        }
        if (isExist == false) {
            this._list.push(info);
        }
    };
    /**
     * 创建子信息
     */
    BaseActivitySubHandler.prototype.addSubInfo = function (info, cls, def) {
        if (def.id == info.id) {
            var instance = new cls();
            instance.id = def.id;
            instance.subId = def.subId;
            if (!info.subList) {
                info.subList = new Array();
            }
            if (ActivityUtil.isExistSubInfo(info, def.subId) == false) {
                info.subList.push(instance);
            }
            return instance;
        }
        return null;
    };
    /**
     * 设置所有json数据
     */
    BaseActivitySubHandler.prototype.setJson = function (info) {
    };
    /**
     *领取奖励完成回调
     */
    BaseActivitySubHandler.prototype.onGetAwardComplete = function (id, subId) {
    };
    /**
     * 清理数据
     */
    BaseActivitySubHandler.prototype.clear = function () {
        qin.ArrayUtil.Clear(this._list);
    };
    BaseActivitySubHandler.prototype.getInfo = function (id) {
        if (this.list) {
            var info = void 0;
            for (var i = 0; i < this.list.length; i++) {
                info = this.list[i];
                if (info.id == id) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 获取活动子信息,活动ID，活动子ID
     */
    BaseActivitySubHandler.prototype.getSubInfo = function (id, subId) {
        if (this.list) {
            var info = void 0;
            for (var i = 0; i < this.list.length; i++) {
                info = this.list[i];
                if (info.id == id && info.subList) {
                    for (var _i = 0, _a = info.subList; _i < _a.length; _i++) {
                        var subInfo = _a[_i];
                        if (subInfo.subId == subId) {
                            return subInfo;
                        }
                    }
                }
            }
        }
        return null;
    };
    /**
     * 拉取单个活动信息后，刷新操作
     */
    BaseActivitySubHandler.prototype.refreshActivityInfo = function (id) {
    };
    return BaseActivitySubHandler;
}());
__reflect(BaseActivitySubHandler.prototype, "BaseActivitySubHandler");
//# sourceMappingURL=BaseActivitySubHandler.js.map