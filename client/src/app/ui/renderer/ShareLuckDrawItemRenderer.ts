/**
 * 分享中奖信息渲染项
 */
class ShareLuckDrawItemRenderer extends BaseItemRenderer<ChampionshipRankInfo>
{
    public awardDesLabel: eui.Label;//获得奖励
    public nameLabel: eui.Label;//用户名字

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ShareLuckDrawItemRenderer;
    }
    public updateData()
    {
        this.dataChanged();
    }
    protected dataChanged(): void
    {
        super.dataChanged();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData)
        {
            this.nameLabel.text = this.getChar(this.bindData.name, 4);
            this.awardDesLabel.text = this.getChar(this.bindData.award, 6);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    }

    private getChar(str: string, length: number): string
    {
        let len: number = length - 1;
        if (str.length > len)
        {
            let size: number = game.CodeUtil.getStringByteLength(str);
            if (size <= len * 3) //按一个汉字占3个字节算 
            {
                return str;
            }
            else
            {
                return str.substr(0, len) + "...";
            }
        }
        return str;
    }
}