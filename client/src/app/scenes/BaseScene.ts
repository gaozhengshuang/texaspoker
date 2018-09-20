/**
 * 基础场景
 */
abstract class BaseScene 
{
    abstract clear();
    public sceneInfo: SceneInfo;
    protected _isResLoaded: boolean;
    public get isResLoaded(): boolean
    {
        return this._isResLoaded;
    }
    public LoadCompleteEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
    protected resGroupName: string[] = [];
    public async initialize()
    {
        this.clear();
        if (this.resGroupName != undefined && !this._isResLoaded)
        {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            for (let resName of this.resGroupName)
            {
                await RES.loadGroup(resName);
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
        this._isResLoaded = true;
    }
    protected onResourceLoadComplete(event: RES.ResourceEvent)
    {
        game.Console.log("场景资源组加载成功：" + event.groupName);
    }
    private onResourceLoadError(event: RES.ResourceEvent): void
    {
        game.Console.log("资源组:" + event.groupName + "加载出错");
    }
    private onItemLoadError(event: RES.ResourceEvent): void
    {
        game.Console.log("资源项:" + event.resItem.url + "加载出错");
    }
    protected onResourceProgress(event: RES.ResourceEvent)
    {
        game.Console.log("场景资源加载地址：" + event.resItem.url);
        SceneManager.updateSwitchProgress(event.itemsLoaded / event.itemsTotal);
    }
}

