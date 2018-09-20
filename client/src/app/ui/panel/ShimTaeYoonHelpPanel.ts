/**
 *德州转转转帮助面板
*/
class ShimTaeYoonHelpPanel extends BasePanel
{
    public scroller: eui.Scroller;
    public list: eui.List;

    private _coefficientList: Array<number>;
    private _bottom: number;
    private _shimTaeYoonHelpInfotList: Array<ShimTaeYoonHelpInfo>;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ShimTaeYoonHelpPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIUtil.listRenderer(this.list, this.scroller, ShimTaeYoonHelpItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.AUTO, null, true);
        this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._coefficientList = new Array<number>();
        this._shimTaeYoonHelpInfotList = new Array<ShimTaeYoonHelpInfo>();
    }
    public init(appendData: any)
    {
        super.init(appendData);
        game.ArrayUtil.Clear(this._coefficientList);
        game.ArrayUtil.Clear(this._shimTaeYoonHelpInfotList);
        if (appendData)
        {
            this._coefficientList = appendData.coefficientList.concat();
            this._bottom = appendData.bottom;
        }
        this.setShimTaeYoonHelpListInfo();
        this.setPanelInfo();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
    }

    private setShimTaeYoonHelpListInfo()
    {
        let shimTaeYoonHelpInfo: ShimTaeYoonHelpInfo;
        for (let i: number = 0; i < this._coefficientList.length - 1; i++)
        {
            shimTaeYoonHelpInfo = new ShimTaeYoonHelpInfo();
            if (i < 3)
            {
                shimTaeYoonHelpInfo.coefficientDes = "奖池" + this._coefficientList[i] * 100 + "%";
            } else
            {
                shimTaeYoonHelpInfo.coefficientDes = (this._bottom * this._coefficientList[i]).toString();
            }
            if (i < 7)
            {
                let str: string;
                str = ResPrefixName.LaBaResult + i + ResSuffixName.PNG;
                shimTaeYoonHelpInfo.img1 = shimTaeYoonHelpInfo.img2 = shimTaeYoonHelpInfo.img3 = str;
            } else
            {
                if (i == 7)
                {
                    shimTaeYoonHelpInfo.img1 = shimTaeYoonHelpInfo.img2 = ResPrefixName.LaBaResult + 6 + ResSuffixName.PNG;
                    shimTaeYoonHelpInfo.img3 = ResPrefixName.LaBaResult + i + ResSuffixName.PNG;
                } else if (i == 8)
                {
                    shimTaeYoonHelpInfo.img1 = ResPrefixName.LaBaResult + 6 + ResSuffixName.PNG;
                    shimTaeYoonHelpInfo.img3 = shimTaeYoonHelpInfo.img2 = ResPrefixName.LaBaResult + 7 + ResSuffixName.PNG;
                }
            }
            this._shimTaeYoonHelpInfotList.push(shimTaeYoonHelpInfo);
        }
    }
    /**
     * 设置面板数据
    */
    private setPanelInfo()
    {
        UIUtil.writeListInfo(this.list, this._shimTaeYoonHelpInfotList);
    }
}
/**
 * 德州转转转帮助面板项数据
*/
class ShimTaeYoonHelpInfo
{
    /**
     * 图片1
    */
    public img1: string;
    /**
     * 图片2
    */
    public img2: string;
    /**
     * 图片3
    */
    public img3: string;
    /**
     *赔率描述
    */
    public coefficientDes: string;
}