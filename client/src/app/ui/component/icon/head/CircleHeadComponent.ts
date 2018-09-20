/**
 * 圆形用户头像组件
 */
class CircleHeadComponent extends HeadComponent
{
    public group: egret.DisplayObjectContainer;
    public headMask: egret.Bitmap;

    private renderTexture: egret.RenderTexture;
    private bmp: egret.Bitmap;


    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);

        this.group = new egret.DisplayObjectContainer();
        this.headMask = new egret.Bitmap();
        this.headMask.texture = RES.getRes(ResFixedFileName.HeadEarser);

        this.group.addChild(this.userImg);
        this.group.addChild(this.headMask);
        this.headMask.blendMode = egret.BlendMode.ERASE;

        this.touchChildren = false;
        this.bmp = new egret.Bitmap();
        this.addChildAt(this.bmp, 0);
    }
    public init(data: IBaseHead, size?: number)
    {
        super.init(data, size);
        this.headMask.width = this.headMask.height = this._size;
        this.group.width = this.group.height = this._size;
    }
    protected drawHead(idDefault: boolean)
    {
        super.drawHead(idDefault);
        egret.callLater(() =>
        {
            if (game.StringUtil.isNullOrEmpty(this.headPath))
            {
                return;
            }
            if (idDefault)
            {
                if (!this.renderTexture)
                {
                    this.renderTexture = new egret.RenderTexture();
                }
                this.renderTexture.drawToTexture(this.group);
                this.bmp.texture = this.renderTexture;
                this.bmp.width = this.bmp.height = this.size;
            }
            else
            {
                let cache = ResCacheManager.getRes(ResCacheType.CircleHead, this.headPath)
                // if (HeadCache._circleheadCacheList.containsKey(this.headPath))
                if (cache)
                {
                    // this.bmp.texture = HeadCache._circleheadCacheList.getValue(this.headPath);
                    this.bmp.texture = <egret.Texture>cache;
                    this.bmp.width = this.bmp.height = this.size;
                }
                else
                {
                    let renderTexture: egret.RenderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(this.group);
                    this.bmp.texture = renderTexture;
                    ResCacheManager.addRes(ResCacheType.CircleHead, this.headPath, renderTexture);
                    // HeadCache._circleheadCacheList.add(this.headPath, renderTexture);
                }
            }
        }, this);
    }
    public clear()
    {
       super.clear();
       this.bmp.texture = null;
    }
}