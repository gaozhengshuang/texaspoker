/**
 * 用户头像组件
 */
class HeadComponent extends BaseComponent<IBaseHead>
{
    public userImg: egret.Bitmap;
    protected headPath: string;

    protected headTex: egret.Texture;

    protected readonly DefaultSize: number = 150;
    protected _size: number;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.userImg = new egret.Bitmap();
        this.addChildAt(this.userImg, 0);
    }
    public init(data: IBaseHead, size?: number)
    {
        super.init(data);
        this.touchChildren = false;
        if (this.headPath != this.bindData.head || this.headPath == undefined)
        {
            this.headPath = this.bindData.head;
            this.loadHead(this.bindData.head);
        }
        if (size != this._size || this._size == undefined) //重新设置size值
        {
            this._size = size == undefined ? this.DefaultSize : size;
            this.userImg.width = this._size;
            this.userImg.height = this._size;

            this.width = this.height = this._size;
        }
    }
    protected loadHead(head: string)
    {
        if (!head)
        {
            qin.Console.log("头像为空");
            this.userImg.texture = null;
            this.drawHead(true);
            return;
        }
        //本地开发加载默认头像，不从网络上载
        if(qin.System.isLocalhost)
        {
            head = SheetSubName.getdefaultHead(this.bindData.sex);
        }
        //默认头像
        if (UploadHeadManager.isDefaultHead(head))
        {
            this.userImg.texture = RES.getRes(head);
            this.drawHead(true);
        }
        else
        {
            let result: string = ProjectDefined.GetInstance().getStorageHost() + head;
            let cache = ResCacheManager.getRes(ResCacheType.Head, result);
            if (cache)
            {
                this.userImg.texture = <egret.Texture>cache;
                this.drawHead(false);
                return;
            }
            RES.getResByUrl(result, (data: any, url: string) =>
            {
                var img: egret.Texture = <egret.Texture>data;
                if (img instanceof egret.Texture)
                {
                    this.userImg.texture = img;
                    this.drawHead(false);
                    ResCacheManager.addRes(ResCacheType.Head, result, img);
                }
                else
                {
                    let headTex = new egret.Texture();
                    try
                    {
                        let bd: egret.BitmapData = egret.BitmapData.create('base64', data);
                        if (bd)
                        {
                            headTex.bitmapData = bd;
                            this.userImg.texture = headTex;
                            this.drawHead(false);
                            //HeadCache._headCacheList.add(result, headTex);
                            ResCacheManager.addRes(ResCacheType.Head, result, img);
                        }
                        else
                        {
                            this.userImg.texture = RES.getRes(SheetSubName.getdefaultHead(this.bindData.sex)); //转换失败则用默认的头像
                            this.drawHead(true);
                            qin.Console.logError("头像数据转换失败！头像路径：" + head);
                        }
                    }
                    catch (e)
                    {
                        this.userImg.texture = RES.getRes(SheetSubName.getdefaultHead(this.bindData.sex)); //转换失败则用默认的头像
                        this.drawHead(true);
                        qin.Console.logError("头像数据转换失败！头像路径：" + head);
                    }
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }
    public get size(): number
    {
        return this._size;
    }
    /**
     * 设置头像显示
     */
    public setHeadVisible(flag: boolean)
    {
        if (this.userImg)
        {
            this.userImg.visible = flag;
        }
    }
    public clear()
    {
        this.headPath = undefined;
        this.userImg.texture = null;
    }
    protected drawHead(idDefault: boolean)
    {

    }
}