/**
 * 手牌竞猜购买项面板
*/
class GuessBuyItemRenderer extends BaseItemRenderer<GuessOddsInfo>
{
    /**
     * 类型
    */
    public typeLabel: eui.Label;
    /**
     * 赔率
    */
    public oddsLabel: eui.Label;
    /**
     * 注数
    */
    public ante1RB: eui.ToggleButton;
    public ante2RB: eui.ToggleButton;
    public ante3RB: eui.ToggleButton;

    /**
     * 注数组
    */
    private toggleBtns: Array<eui.ToggleButton>;

    /**
     * 该项的上一个选择的注数
    */
    public preSelectedAnte: number;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.GuessBuyItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        if (InfoUtil.checkAvailable(this.bindData))
        {
            this.reset();
            this.typeLabel.text = this.bindData.definition.des;
            this.oddsLabel.text = this.bindData.definition.odds.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.ante1RB.addEventListener(eui.UIEvent.CHANGE, this.anteClick, this);
            this.ante2RB.addEventListener(egret.Event.CHANGE, this.anteClick, this);
            this.ante3RB.addEventListener(egret.Event.CHANGE, this.anteClick, this);
        }
    }
    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.ante1RB.removeEventListener(eui.UIEvent.CHANGE, this.anteClick, this);
        this.ante2RB.removeEventListener(egret.Event.CHANGE, this.anteClick, this);
        this.ante3RB.removeEventListener(egret.Event.CHANGE, this.anteClick, this);
    }

    /**
     * 注数更改
    */
    private anteClick(event: eui.UIEvent)
    {
        if (GamblingManager.guessHandler.buyInning)
        {
            AlertManager.showAlert("请先取消购买再选择");
            event.target.selected = !event.target.selected;
            return;
        }
        let ante: number = parseInt(event.target.label);
        if (this.preSelectedAnte != undefined)
        {
            if (this.preSelectedAnte == ante)
            {
                this.preSelectedAnte = 0;
                GamblingManager.guessHandler.totalAnte -= ante;
                GamblingManager.guessHandler.setBuyGuessAnteInfo(this.bindData.id, 0);
                GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
                return;
            } else
            {
                GamblingManager.guessHandler.totalAnte -= this.preSelectedAnte;
                GamblingManager.guessHandler.totalAnte += ante;
            }
        } else
        {
            GamblingManager.guessHandler.totalAnte += ante;
        }
        for (let i: number = 0; i < this.toggleBtns.length; i++)
        {
            let btn: eui.ToggleButton = this.toggleBtns[i];
            if (btn == event.target)
            {
                btn.selected = event.target.selected;
            } else
            {
                btn.selected = false;
            }
        }
        GamblingManager.guessHandler.setBuyGuessAnteInfo(this.bindData.id, ante);
        this.preSelectedAnte = ante;
        GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
    }
    /**
     * 重置数据
    */
    private reset()
    {
        this.preSelectedAnte = undefined;
        this.toggleBtns = new Array<eui.ToggleButton>();
        for (let i: number = 1; i <= 3; i++)
        {
            this.toggleBtns.push(this["ante" + i + "RB"]);
        }
        if (GamblingManager.guessHandler.buyGuessAnteInfo)
        {
            for (let info of GamblingManager.guessHandler.buyGuessAnteInfo)
            {
                if (this.bindData.id == info.id)
                {
                    for (let i: number = 0; i < this.toggleBtns.length; i++)
                    {
                        let tb: eui.ToggleButton = this.toggleBtns[i];
                        if (parseInt(tb.label) == info.num)
                        {
                            tb.selected = true;
                            this.preSelectedAnte = info.num;
                        } else
                        {
                            tb.selected = false;
                        }
                    }
                }
            }
        }
    }
    /**
     * 注数更改
    */
    private radioChangeHandler(event: eui.UIEvent)
    {
        let radioGroup: eui.RadioButtonGroup = event.target;
        if (this.preSelectedAnte)
        {
            GamblingManager.guessHandler.totalAnte -= this.preSelectedAnte;
            GamblingManager.guessHandler.totalAnte += parseInt(radioGroup.selectedValue);
        } else
        {
            GamblingManager.guessHandler.totalAnte += parseInt(radioGroup.selectedValue);
        }
        this.preSelectedAnte = parseInt(radioGroup.selectedValue);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
    }
}