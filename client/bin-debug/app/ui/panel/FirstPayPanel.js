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
 * 首充活动面板
 */
var FirstPayPanel = (function (_super) {
    __extends(FirstPayPanel, _super);
    function FirstPayPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.FirstPayPanel);
        return _this;
    }
    FirstPayPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    FirstPayPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (InfoUtil.checkAvailable(this.activityInfo) && this.itemGroup.numChildren == 0) {
            var subItem = this.activityInfo.subList[0].definition;
            if (subItem) {
                var awardDef = AwardDefined.GetInstance().getDefinition(subItem.awardId);
                if (awardDef && awardDef.rewardList) {
                    for (var _i = 0, _a = awardDef.rewardList; _i < _a.length; _i++) {
                        var itemInfo = _a[_i];
                        var itemComp = new FirstPayItemComponent(UIComponentSkinName.FirstPayItemComponent);
                        itemComp.init(itemInfo);
                        if (this.itemGroup) {
                            this.itemGroup.addChild(itemComp);
                        }
                    }
                }
                this.deslabel2.text = subItem.des;
            }
            this.deslabel1.textFlow = qin.TextUtil.parse(this.activityInfo.definition.des);
        }
    };
    FirstPayPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnClick, this);
    };
    FirstPayPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnClick, this);
    };
    FirstPayPanel.prototype.onPrizeBtnClick = function (event) {
        JumpUtil.JumpToShopping(ShopGroupIndex.Gold, UIModuleName.GameHallPanel);
        UIManager.closePanel(this);
        UIManager.closePanel(UIModuleName.GameHallPanel);
    };
    return FirstPayPanel;
}(BaseActivityPanel));
__reflect(FirstPayPanel.prototype, "FirstPayPanel");
//# sourceMappingURL=FirstPayPanel.js.map