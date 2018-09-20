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
 * 引导问答面板
*/
var GuideQuestionPanel = (function (_super) {
    __extends(GuideQuestionPanel, _super);
    function GuideQuestionPanel() {
        var _this = _super.call(this) || this;
        _this.isIgnoreAdaptation = true;
        _this.panelAlignType = PanelAlignType.Center_Top;
        _this.offsetV = 105;
        _this.setSkinName(UIModuleName.GuideQuestionPanel);
        return _this;
    }
    GuideQuestionPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.answerList, this.answerScroller, GuideQueItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, false);
    };
    GuideQuestionPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.getQuestionInfo();
    };
    GuideQuestionPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuideQuestionPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.answerList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.getChoiceResult, this);
    };
    GuideQuestionPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.answerList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.getChoiceResult, this);
    };
    /**
     * 获得选择的答案
    */
    GuideQuestionPanel.prototype.getChoiceResult = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.answerList.selectedItem) {
            var cardList1 = new Array();
            GamblingUtil.cardArr2CardInfoList(this.panelData.cardList1, cardList1);
            CardTypeMatchUtil.matchCardType(cardList1);
            if (this.answerList.selectedItem.id == CardTypeMatchUtil.cardType) {
                if (this.panelData.self > 0) {
                    GuideExecutor.guideProcessComplete(this.panelData.self);
                }
            }
            else {
                UIManager.showPanel(UIModuleName.GuideAnswerErrorPanel, this.panelData);
            }
            this.onCloseBtnClickHandler(null);
        }
    };
    /**
     * 获得答案数据
    */
    GuideQuestionPanel.prototype.getQuestionInfo = function () {
        var def = GuideQuestionDefined.GetInstance().getDefinition(this.panelData.question);
        if (def) {
            if (def.title) {
                this.titleLabel.text = def.title;
            }
            if (def.answer) {
                UIUtil.writeListInfo(this.answerList, def.answer, "id", true);
            }
        }
    };
    return GuideQuestionPanel;
}(BasePanel));
__reflect(GuideQuestionPanel.prototype, "GuideQuestionPanel");
//# sourceMappingURL=GuideQuestionPanel.js.map