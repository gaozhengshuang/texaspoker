var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌局状态
 */
var BaseGamblingPanelState = (function () {
    function BaseGamblingPanelState(context, sptList) {
        this.gb_parent = "gb_parent";
        this.gb_index = "gb_index";
        this.context = context;
        this.supportList = sptList;
    }
    Object.defineProperty(BaseGamblingPanelState.prototype, "componentList", {
        get: function () {
            return this._componentList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGamblingPanelState.prototype, "component", {
        get: function () {
            if (!this._component && this._componentList && this._componentList.length > 0) {
                return this._componentList[0];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    BaseGamblingPanelState.prototype.onAwake = function () {
    };
    BaseGamblingPanelState.prototype.initialize = function () {
        var len = this.supportList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportList[i];
            spt.initialize();
        }
    };
    BaseGamblingPanelState.prototype.run = function () {
        this.showElements();
    };
    BaseGamblingPanelState.prototype.createComponent = function (c, paramSkinName, paramType) {
        if (!this._componentList) {
            this._componentList = new Array();
        }
        if (c) {
            this._componentList.push(new c(paramSkinName, paramType));
        }
    };
    BaseGamblingPanelState.prototype.showElements = function () {
        UIUtil.clearLayout(this.context.slotContainerUp);
        UIUtil.clearLayout(this.context.slotContainerDown);
        if (this._componentList) {
            for (var _i = 0, _a = this._componentList; _i < _a.length; _i++) {
                var comp = _a[_i];
                switch (comp.layerType) {
                    case SlotLayerType.Down:
                        this.context.slotContainerDown.addChild(comp);
                        break;
                    case SlotLayerType.Up:
                        this.context.slotContainerUp.addChild(comp);
                        break;
                    default:
                        qin.Console.log("牌局面板插槽类型异常！" + comp.layerType);
                        break;
                }
            }
        }
    };
    BaseGamblingPanelState.prototype.onEnable = function () {
        var len = this.supportList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportList[i];
            spt.onEnable();
        }
    };
    BaseGamblingPanelState.prototype.onDisable = function () {
        var len = this.supportList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportList[i];
            spt.onDisable();
        }
    };
    BaseGamblingPanelState.prototype.clear = function () {
        this.context.slotContainerDown.removeChildren();
        this.context.slotContainerUp.removeChildren();
    };
    /**
     * 添加一个对象显示
     */
    BaseGamblingPanelState.prototype.addChild = function (target) {
        if (target && target.parent) {
            target[this.gb_parent] = target.parent;
            target[this.gb_index] = target.parent.getChildIndex(target);
        }
        else if (target && target[this.gb_parent]) {
            var dis = void 0;
            target[this.gb_parent].addChildAt(target, target[this.gb_index]);
        }
        else {
            qin.Console.logError("牌局切换状态，添加对象显示失败：" + target);
        }
    };
    /**
     * 暂时移除一个对象显示
     */
    BaseGamblingPanelState.prototype.removeChild = function (target) {
        if (target && target.parent) {
            target[this.gb_parent] = target.parent;
            target[this.gb_index] = target.parent.getChildIndex(target);
            target.parent.removeChild(target);
        }
        else {
            qin.Console.logError("牌局切换状态，移除对象显示失败：" + target);
        }
    };
    /**
     * 根据类型获取组件
     */
    BaseGamblingPanelState.prototype.getCompoent = function (cls) {
        if (this._componentList) {
            for (var _i = 0, _a = this._componentList; _i < _a.length; _i++) {
                var comp = _a[_i];
                if (comp instanceof cls) {
                    return comp;
                }
            }
        }
        return null;
    };
    return BaseGamblingPanelState;
}());
__reflect(BaseGamblingPanelState.prototype, "BaseGamblingPanelState");
//# sourceMappingURL=BaseGamblingPanelState.js.map