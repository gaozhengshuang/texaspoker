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
 * 新手引导训练营答题答错面板
*/
var GuideAnswerErrorPanel = (function (_super) {
    __extends(GuideAnswerErrorPanel, _super);
    function GuideAnswerErrorPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GuideAnswerErrorPanel);
        return _this;
    }
    GuideAnswerErrorPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.cardList, this.cardScroller, GuideAnswerErrorItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.ON, null, false);
        UIUtil.listRenderer(this.cardList0, this.cardScroller0, GuideAnswerErrorItemRenderer, ScrollViewDirection.Horizontal_L_R, eui.ScrollPolicy.ON, null, false);
        this.cardScroller.scrollPolicyV = this.cardScroller0.scrollPolicyV = eui.ScrollPolicy.OFF;
    };
    GuideAnswerErrorPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.setCardInfo();
    };
    GuideAnswerErrorPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        //显示列表2的卡牌灰色遮罩
        var maskCardList = new Array();
        GamblingUtil.cardArr2CardInfoList(this.panelData.mask2, maskCardList);
        var layout = this.cardList.layout;
        layout.gap = this.panelData.gap;
        layout = this.cardList0.layout;
        layout.gap = this.panelData.gap;
        for (var i = 0; i < this.cardList0.numChildren; i++) {
            var render = this.cardList0.getChildAt(i);
            for (var _i = 0, maskCardList_1 = maskCardList; _i < maskCardList_1.length; _i++) {
                var maskCard = maskCardList_1[_i];
                if (maskCard.card[0] == render.bindData.info.card[0] && maskCard.card[1] == render.bindData.info.card[1]) {
                    render.showMask();
                }
            }
        }
    };
    GuideAnswerErrorPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnClick, this);
    };
    GuideAnswerErrorPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmBtnClick, this);
    };
    /**
     * 确认按钮点击执行事件
    */
    GuideAnswerErrorPanel.prototype.onConfirmBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData && this.panelData.self) {
            GuideExecutor.guideProcessComplete(this.panelData.self);
        }
        this.onCloseBtnClickHandler(null);
    };
    /**
     * 写入数据
     */
    GuideAnswerErrorPanel.prototype.setCardInfo = function () {
        var cardList1 = new Array();
        var cardList2 = new Array();
        GamblingUtil.cardArr2CardInfoList(this.panelData.cardList1, cardList1);
        GamblingUtil.cardArr2CardInfoList(this.panelData.cardList2, cardList2);
        CardTypeMatchUtil.matchCardType(cardList1);
        if (CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType)) {
            this.desLabel.text = "您的牌型为" + CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
        }
        var list1 = new Array();
        var id = 0;
        for (var _i = 0, cardList1_1 = cardList1; _i < cardList1_1.length; _i++) {
            var info1 = cardList1_1[_i];
            id++;
            list1.push({ id: id, scale: this.panelData.scale, info: info1 });
        }
        this.cardInit(this.cardList, list1);
        var list2 = new Array();
        id = 0;
        for (var _a = 0, cardList2_1 = cardList2; _a < cardList2_1.length; _a++) {
            var info2 = cardList2_1[_a];
            id++;
            list2.push({ id: id, scale: this.panelData.scale, info: info2 });
        }
        this.cardInit(this.cardList0, list2);
    };
    /**
     * 写入卡牌信息
    */
    GuideAnswerErrorPanel.prototype.cardInit = function (cardList, cardListInfo) {
        if (cardListInfo) {
            UIUtil.writeListInfo(cardList, cardListInfo, "id");
        }
    };
    return GuideAnswerErrorPanel;
}(BasePanel));
__reflect(GuideAnswerErrorPanel.prototype, "GuideAnswerErrorPanel");
//# sourceMappingURL=GuideAnswerErrorPanel.js.map