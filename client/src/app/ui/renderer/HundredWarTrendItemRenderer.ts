/**
 * 百人大战胜负走势项
*/
class HundredWarTrendItemRenderer extends BaseItemRenderer<Array<number>>
{
    public newLabel: eui.Label;
    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.HundredWarTrendItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.refreshUI();
    }

    private refreshUI()
    {
        if (this.bindData)
        {
            for (let i: number = 0; i < this.bindData.length; i++)
            {
                this.setState(i, this.bindData[i]);
            }
            this.setNew();
        }
    }

    public setNew()
    {
        if (HundredWarManager.panelHandler.HundredWarTrendList.indexOf(this.bindData) == 0)
        {
            this.newLabel.visible = true;
        }
        else
        {
            this.newLabel.visible = false;
        }
    }

    private setState(index: number, isWin: number)
    {
        if (isWin == 1)
        {
            this["text" + index].text = "胜";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Win;
        }
        if (isWin == 0)
        {
            this["text" + index].text = "负";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Lose;
        }
        if (isWin == 2)
        {
            this["text" + index].text = "平";
            this["bg" + index].source = SheetSubName.HundredWarTrend_Tie;
        }
    }
}
