/**
 * 游戏场面板房间列表项渲染
 */
class PlayingFieldItemRenderer extends BaseItemRenderer<PlayingFieldRoomInfo>{
    /**
     * 模式
    */
    public patternImage: eui.Image;
    /**
     * 房间Id
    */
    public roomIdLabel: eui.Label;
    /**
     * 房间玩家人数
    */
    public roomPlayNumImage: eui.Image;
    /**
     * 房间最大玩家人数
    */
    public roomMaxPlayNumImage: eui.Image;
    /**
     * 盲注
    */
    public blindLabel: eui.Label;
    /**
     * 买入
    */
    public buyLabel: eui.Label;
    /**
     * 底线
    */
    public bottomLineImg: eui.Image;
    /**
     * 前注模式前注显示
    */
    public anteLabel: eui.Label;

    public toggleBtn0: eui.ToggleButton;
    public toggleBtn1: eui.ToggleButton;
    public toggleBtn2: eui.ToggleButton;
    public toggleBtn3: eui.ToggleButton;
    public toggleBtn4: eui.ToggleButton;
    public toggleBtn5: eui.ToggleButton;
    public toggleBtn6: eui.ToggleButton;
    public toggleBtn7: eui.ToggleButton;
    public toggleBtn8: eui.ToggleButton;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.PlayingFieldItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        for (let i: number = 0; i < 9; i++)
        {
            this["toggleBtn" + i].visible = false;
            this["toggleBtn" + i].touchEnabled = false;
        }
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.anteLabel.visible = false;
            if (this.itemIndex == (PlayingFieldManager.roomList.length - 1))
            {
                this.bottomLineImg.visible = true;
            } else
            {
                this.bottomLineImg.visible = false;
            }
            if (this.bindData.id.toString().length < 5)
            {
                this.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(this.bindData.id);
            } else
            {
                this.roomIdLabel.text = this.bindData.id.toString();
            }
            this.blindLabel.text = game.MathUtil.formatNum(this.bindData.definition.sBlind) + "/" + game.MathUtil.formatNum(this.bindData.definition.bBlind);
            if (this.bindData.definition.bBuyin)
            {
                this.buyLabel.text = game.MathUtil.formatNum(this.bindData.definition.sBuyin) + "/" + game.MathUtil.formatNum(this.bindData.definition.bBuyin);
            } else
            {
                this.buyLabel.text = game.MathUtil.formatNum(this.bindData.definition.sBuyin);
            }
            this.setRoomPattern();
            for (let i: number = 0; i < this.bindData.definition.seat; i++)
            {
                this["toggleBtn" + i].visible = true;
                this["toggleBtn" + i].selected = false;
            }
            for (let j: number = 0; j < this.bindData.player; j++)
            {
                this["toggleBtn" + j].selected = true;
            }
        }
    }

    /**
     * 设置房间模式
    */
    private setRoomPattern()
    {
        switch (this.bindData.definition.pattern)
        {
            case GamblingPattern.AllIn:
                this.patternImage.source = SheetSubName.AllInImg;
                break;
            case GamblingPattern.Fast:
                this.patternImage.source = SheetSubName.FastImg;
                break;
            case GamblingPattern.Ante:
                this.patternImage.source = SheetSubName.AnteImg;
                this.anteLabel.visible = true;
                this.anteLabel.text = game.MathUtil.formatNum(this.bindData.ante);
                break;
            case GamblingPattern.NoUpperLimit:
                this.patternImage.source = "";
                break;
            case GamblingPattern.Personal:
                this.patternImage.source = SheetSubName.PersonalImg;
                break;
            default:
                this.patternImage.source = "";
                break;
        }
    }
}