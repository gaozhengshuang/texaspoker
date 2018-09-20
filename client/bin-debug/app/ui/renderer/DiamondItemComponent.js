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
 * 商城钻石列表
*/
var DiamondItemComponent = (function (_super) {
    __extends(DiamondItemComponent, _super);
    function DiamondItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiamondItemComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
    };
    DiamondItemComponent.prototype.onDisable = function (event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
        _super.prototype.onDisable.call(this, event);
    };
    DiamondItemComponent.prototype.init = function (info) {
        if (InfoUtil.checkAvailable(info)) {
            this._info = info;
            this._awardDef = AwardDefined.GetInstance().getDefinition(info.definition.awardId);
            if (this._awardDef && this._awardDef.costList) {
                this.diamondImg.source = info.definition.iconName + ResSuffixName.PNG;
                this.diamondNum.text = this._awardDef.name;
                for (var _i = 0, _a = this._awardDef.costList; _i < _a.length; _i++) {
                    var def = _a[_i];
                    if (def.type == CostType.RMB) {
                        this.diamondBtn.label = def.count / 100 + "元";
                        break;
                    }
                }
            }
        }
    };
    DiamondItemComponent.prototype.buy = function () {
        ChannelManager.PaySend(this._info.id);
        // if (this._awardDef)
        // {
        //     let def: AwardInfoDefinition;
        //     for (let cost of this._awardDef.costList)
        //     {
        //         if (cost.type == CostType.RMB)
        //         {
        //             def = cost;
        //         }
        //     }
        //     AlertManager.showConfirm(qin.StringUtil.format("是否花费{0}元，购买{1}？", def.count, this._awardDef.name), ChannelManager.PaySend, null, this._info.id);
        // }
    };
    return DiamondItemComponent;
}(BaseComponent));
__reflect(DiamondItemComponent.prototype, "DiamondItemComponent");
//# sourceMappingURL=DiamondItemComponent.js.map