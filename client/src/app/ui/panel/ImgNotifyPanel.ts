/**
 * 公告页面
 */
class ImgNotifyPanel extends BasePanel
{
    public noticeImg: eui.Image;
    public _currentImgUrl: string;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ImgNotifyPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        UIManager.pushResizeGroup(this);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.3;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this._currentImgUrl = appendData.shift()
        this.loadImg(this._currentImgUrl);
    }

    public loadImg(url: string)
    {
        RES.getResByUrl(url, this.onLoadComp, this, RES.ResourceItem.TYPE_IMAGE);
    }
    private onLoadComp(data: any, url: string)
    {
        // this.noticeImg.bitmapData = data;
    }
    protected onCloseBtnClickHandler(event: egret.TouchEvent)
    {
        if (this._currentImgUrl)
        {
            RES.destroyRes(this._currentImgUrl);
        }
        if (this.panelData && this.panelData.length > 0)
        {
            this.init(this.panelData);
        }
        else
        {
			// RES.destroyRes(this.noticeImg.bitmapData.source);
            super.onCloseBtnClickHandler(event);
        }
    }
}