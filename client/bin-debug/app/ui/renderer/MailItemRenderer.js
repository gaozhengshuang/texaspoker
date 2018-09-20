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
 * 邮件渲染项
 */
var MailItemRenderer = (function (_super) {
    __extends(MailItemRenderer, _super);
    function MailItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.MailItemRenderer;
        return _this;
    }
    MailItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.takePrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    };
    MailItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.itemTitleLabel.text = this.bindData.Title;
            this.itemDesLabel.textFlow = qin.TextUtil.parse(this.bindData.Content);
            this.dateLabel.text = qin.DateTimeUtil.formatDate(new Date(this.bindData.Date * 1000), qin.DateTimeUtil.Format_China_MonthDay);
            if (this.bindData.isHavePrize) {
                this.itemComp.init(this.bindData.attaList[0].id, 88);
                if (this.bindData.IsGot) {
                    this.takePrizeBtn.visible = false;
                    this.takeDesLabel.visible = true;
                }
                else {
                    this.takePrizeBtn.visible = true;
                    this.takeDesLabel.visible = false;
                }
            }
            else {
                this.itemComp.init(SheetSubName.DefaultMail, 88);
                this.takePrizeBtn.visible = false;
                this.takeDesLabel.visible = false;
            }
        }
    };
    //领取附件
    MailItemRenderer.prototype.takePrize = function () {
        PropertyManager.OpenGet();
        SocketManager.call(Command.Mail_TakePrize_3098, { "MailId": this.bindData.Id }, this.onTakePrize, null, this);
    };
    MailItemRenderer.prototype.onTakePrize = function (result) {
        SoundManager.playEffect(MusicAction.buttonClick);
        this.bindData.IsGot = true;
        PropertyManager.ShowItemList();
        this.refresh();
        MailManager.getMailPrizeEvent.dispatch();
    };
    MailItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.takePrizeBtn) {
            this.takePrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.takePrize, this);
        }
    };
    return MailItemRenderer;
}(BaseItemRenderer));
__reflect(MailItemRenderer.prototype, "MailItemRenderer");
//# sourceMappingURL=MailItemRenderer.js.map