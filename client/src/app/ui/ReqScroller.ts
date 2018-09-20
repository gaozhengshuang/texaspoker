/**
 * 滑动栏分页请求类
 */
class ReqScroller
{
    /**
     * 索引值
     */
    public index: number = 0;
    /**
     * 倒序拉其实startId
    */
    public startId: number = 0;
    /**
     * 请求数量
    */
    public reqNum: number;
    /**
     * 请求回调·
     */
    public reqCallback: Function;
    /**
     * 滑动栏
     */
    private _scroller: eui.Scroller;
    /**
     * 数据列表
     */
    private _list: eui.List;

    /**
     * 底部项
     */
    private _bottom: ReqScrollerbotton;
    /**
     * 是否已把数据请求完毕到底
     */
    private _isReqFinish: boolean = false;

    /**
     * 数据源
     */
    private _dpList: eui.ArrayCollection;

    constructor(scroller: eui.Scroller, list: eui.List, reqNum: number, reqCallback: Function)
    {
        this._scroller = scroller;
        this._list = list;
        this.reqNum = reqNum;
        this.reqCallback = reqCallback;
        this._bottom = new ReqScrollerbotton(list.width, UIComponentSkinName.ReqScrollerbotton);
        this._scroller.addChild(this._bottom);
        this._bottom.bottom = 0;
        this._bottom.visible = false;
        this._scroller.addEventListener(eui.UIEvent.CHANGE_END, this.checkForReq, this);
    }
    /**
     * 清除状态
     */
    public Clear()
    {
        this.index = 0;
        this.startId = 0;
        this._isReqFinish = false;
        if (this._dpList)
        {
            this._dpList.removeAll();
        }
        this._bottom.visible = false;
    }

    /**
     * 填充数据源
     */
    public init(list: eui.ArrayCollection, isReqFinish: boolean)
    {
        this._isReqFinish = isReqFinish;
        if (list)
        {
            if (this.index != 0)
            {
                for (let i: number = 0; i < list.source.length; i++)
                {
                    this._dpList.addItem(list.source[i]);
                }
            }
            else if (this.index == 0)
            {
                this._dpList = new eui.ArrayCollection(list.source.concat());
            }
            this._list.dataProvider = this._dpList;

            this.index += this.reqNum;
            let startSource = list.source[list.source.length - 1];
            if (startSource && startSource.id)
            {
                this.startId = startSource.id;
            }
        }
        else
        {
            game.Console.logError("数据源为空！");
        }
    }
    /**
     * 检查是否拉取数据
     */
    public checkForReq()
    {
        if (this.checkIsBottom())
        {
            if (!this._isReqFinish)
            {
                this.reqCallback();
            }
            this._bottom.init(this._isReqFinish);
            this._bottom.setAnime();
        }
    }
    /**
     * 根据判断是否拉到底
     */
    public checkIsBottom(): boolean
    {
        if (this._dpList)
        {
            let lastItem: any = this._dpList.source[this._dpList.source.length - 1];
            for (let i: number = 0; i < this._list.numChildren; i++)
            {
                let itemRender: BaseItemRenderer<any> = this._list.getChildAt(i) as BaseItemRenderer<any>;
                if (itemRender.bindData === lastItem)
                {
                    return true;
                }
            }
        }
        return false;
    }
}