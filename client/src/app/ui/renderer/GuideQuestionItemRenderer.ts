/**
 * 新手引导问答答案面板项
*/
class GuideQueItemRenderer extends BaseItemRenderer<any>
{
    /**
     * 答案
    */
    public answerRadioBtn: eui.RadioButton;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuideQuestionItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.answerRadioBtn.selected = false;
        if (this.bindData)
        {
            let des: string = CardTypeMatchUtil.getCardDes(this.bindData.id);
            if (des)
            {
                this.answerRadioBtn.label = des;
                this.answerRadioBtn.value = this.bindData.id;
            }
        }
    }
}