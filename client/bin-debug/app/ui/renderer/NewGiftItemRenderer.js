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
 * 新人礼项
 */
var NewGiftItemRenderer = (function (_super) {
    __extends(NewGiftItemRenderer, _super);
    function NewGiftItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.NewGiftItemRenderer;
        return _this;
    }
    NewGiftItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.takeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTake, this);
        }
    };
    NewGiftItemRenderer.prototype.refreshiUI = function () {
        this.icon.init(this.bindData.definition.icon + ResSuffixName.PNG, 82, null, false, true);
        this.titleLabel.text = this.bindData.definition.textDescription;
        this.processLabel.text = this.bindData.process + "/" + this.bindData.definition.para1;
        var awardDef = this.bindData.awardInfoDef;
        if (awardDef && awardDef.rewardList) {
            var awardInfo = awardDef.rewardList[0];
            var itemDef = ItemDefined.GetInstance().getDefinition(awardInfo.id);
            if (itemDef) {
                this.itemImg.source = itemDef.icon + ResSuffixName.PNG;
            }
            this.numLabel.text = awardInfo.count.toString();
        }
        this.completeImg.visible = this.bindData.isTaken;
        this.takeBtn.visible = !this.bindData.isTaken;
        if (this.bindData.isCanTake) {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftTake;
        }
        else if (this.bindData.definition.type == AchieveType.DownLoadApp) {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftDownload;
        }
        else {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftGoto;
        }
    };
    NewGiftItemRenderer.prototype.onTake = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.bindData.process < this.bindData.definition.para1) {
            if (this.bindData.definition.type == AchieveType.DownLoadApp) {
                var dlUrl = BundleManager.getUrlByOS();
                if (dlUrl) {
                    ChannelManager.openURL(dlUrl);
                }
            }
            else {
                JumpUtil.JumpByPlayField(this.bindData.definition.tran, UIModuleName.NewGiftPanel);
            }
        }
        else {
            ActivityManager.ReqGetActivityAward(this.bindData.id, this.bindData.subId);
        }
    };
    NewGiftItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTake, this);
    };
    return NewGiftItemRenderer;
}(BaseItemRenderer));
__reflect(NewGiftItemRenderer.prototype, "NewGiftItemRenderer");
//# sourceMappingURL=NewGiftItemRenderer.js.map