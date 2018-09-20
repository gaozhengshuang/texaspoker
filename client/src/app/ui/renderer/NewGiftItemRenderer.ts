/**
 * 新人礼项
 */
class NewGiftItemRenderer extends BaseItemRenderer<PilePrizeItemInfo>
{
    public icon: CommonIcon;
    public titleLabel: eui.Label;
    public processLabel: eui.Label;
    public itemImg: eui.Image;
    public numLabel: eui.Label;
    public takeBtn: eui.Button;
    public completeImg: eui.Button;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.NewGiftItemRenderer;
    }

    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.refreshiUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.takeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTake, this);
        }
    }

    private refreshiUI()    
    {
        this.icon.init(this.bindData.definition.icon + ResSuffixName.PNG, 82, null, false, true);
        this.titleLabel.text = this.bindData.definition.textDescription;
        this.processLabel.text = this.bindData.process + "/" + this.bindData.definition.para1;
        let awardDef: AwardDefinition = this.bindData.awardInfoDef;
        if (awardDef && awardDef.rewardList)
        {
            let awardInfo: AwardInfoDefinition = awardDef.rewardList[0];
            let itemDef: ItemDefinition = ItemDefined.GetInstance().getDefinition(awardInfo.id);
            if (itemDef)
            {
                this.itemImg.source = itemDef.icon + ResSuffixName.PNG;
            }
            this.numLabel.text = awardInfo.count.toString();
        }
        this.completeImg.visible = this.bindData.isTaken;
        this.takeBtn.visible = !this.bindData.isTaken;
        if (this.bindData.isCanTake)
        {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftTake;
        }
        else if (this.bindData.definition.type == AchieveType.DownLoadApp)
        {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftDownload;
        }
        else
        {
            this.takeBtn["labelImg"].source = SheetSubName.NewGiftGoto;
        }
    }

    private onTake(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.bindData.process < this.bindData.definition.para1)
        {
            if (this.bindData.definition.type == AchieveType.DownLoadApp)
            {
                let dlUrl: string = BundleManager.getUrlByOS();
                if (dlUrl)
                {
                    ChannelManager.openURL(dlUrl);
                }
            }
            else
            {
                JumpUtil.JumpByPlayField(this.bindData.definition.tran, UIModuleName.NewGiftPanel);
            }
        }
        else
        {
            ActivityManager.ReqGetActivityAward(this.bindData.id, this.bindData.subId);
        }
    }

    public onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTake, this);
    }
}