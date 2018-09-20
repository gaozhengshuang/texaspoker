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
 * 订单详情面板
*/
var OrderDetailPanel = (function (_super) {
    __extends(OrderDetailPanel, _super);
    function OrderDetailPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.OrderDetailPanel);
        return _this;
    }
    OrderDetailPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    OrderDetailPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.trackGroup.visible = this.addressGroup.visible = false;
        if (appendData.isGet == 1) {
            this.receivedGroup.visible = false;
            egret.callLater(this.setBaseInfo, this);
        }
        else if (appendData.isGet == 2) {
            this.receivedGroup.visible = true;
            PrizeManager.getOrderDetailInfo(appendData.id);
        }
    };
    OrderDetailPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    OrderDetailPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        PrizeManager.onGetOrderDetailInfoEvent.addListener(this.setPanelInfo, this);
    };
    OrderDetailPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        PrizeManager.onGetOrderDetailInfoEvent.removeListener(this.setPanelInfo, this);
    };
    /**
     * 设置面板数据
    */
    OrderDetailPanel.prototype.setPanelInfo = function (data) {
        this.setBaseInfo();
        if (this.panelData.state == OrderStateType.WaitSend) {
            if (this.panelData.effectType == PrizeEffectType.Kind) {
                this.stateLabel.text = "等待发货";
            }
            else if (this.panelData.effectType == PrizeEffectType.Cost) {
                this.stateLabel.text = "充值中";
            }
        }
        else if (this.panelData.state == OrderStateType.Sent) {
            if (this.panelData.effectType == PrizeEffectType.Kind) {
                this.stateLabel.text = "已发货";
            }
            else if (this.panelData.effectType == PrizeEffectType.Cost) {
                this.stateLabel.text = "已充值";
            }
        }
        else if (this.panelData.state == OrderStateType.InfoError) {
            this.stateLabel.text = "信息错误，已返回";
        }
        this.pNameLabel.text = data.name;
        this.telLabel.text = data.phone;
        if (this.panelData.effectType == PrizeEffectType.Kind) {
            this.addressGroup.visible = true;
            this.addressLabel.text = data.address;
            if (data.trackNo) {
                this.trackGroup.visible = true;
                this.trackInfoLabel.text = data.trackName + data.trackNo;
            }
        }
    };
    /**
     * 设置一定显示的信息
    */
    OrderDetailPanel.prototype.setBaseInfo = function () {
        var itemDef = ItemDefined.GetInstance().getDefinition(this.panelData.itemId);
        if (itemDef) {
            this.comItemIcon.init(this.panelData.itemId, 118, SheetSubName.GetItemBg);
            this.nameLabel.text = itemDef.name;
            this.desLabel.text = itemDef.des;
            this.getTypeLabel.text = itemDef.extern;
        }
    };
    return OrderDetailPanel;
}(BasePanel));
__reflect(OrderDetailPanel.prototype, "OrderDetailPanel");
//# sourceMappingURL=OrderDetailPanel.js.map