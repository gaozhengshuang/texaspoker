/**
 * 微信分享选择面板
 */
class ChooseShareWayPanel extends BasePanel
{
    /**
     * 朋友圈
    */
    public timeLineBtn: eui.Image;
    /**
     * 微信好友
    */
    public friendBtn: eui.Image;

    private _wxMsgTitle: string;  //好友分享标题
    private _wxTimeLineTitle: string;  //好友分享标题
    private _msg: string;  //好友分享内容
    private _isHasShareId;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ChooseShareWayPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.5;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (appendData)
        {
            if (appendData.wxMsgTitle)
            {
                this._wxMsgTitle = appendData.wxMsgTitle;
            }
            if (appendData.wxTimeLineTitle)
            {
                this._wxTimeLineTitle = appendData.wxTimeLineTitle;
            }
            if (appendData.msg)
            {
                this._msg = appendData.msg;
            } else
            {
                this._msg = null;
            }
            if (appendData.isHasShareId)
            {
                this._isHasShareId = true;
            } else
            {
                this._isHasShareId = false;
            }
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.timeLineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeLineBtnClick, this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnClick, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.timeLineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimeLineBtnClick, this);
        this.friendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriendBtnClick, this);
    }

    /**
     * 朋友圈按钮点击事件
    */
    private onTimeLineBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._isHasShareId)
        {
            this.share(ChannelShareType.WxTimeLine, this._wxTimeLineTitle, UserManager.userInfo.shareId);
        } else
        {
            this.share(ChannelShareType.WxTimeLine, this._wxTimeLineTitle);
        }
    }
    /**
     * 微信好友按钮点击事件
    */
    private onFriendBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._isHasShareId)
        {
            this.share(ChannelShareType.WxMessage, this._wxMsgTitle, UserManager.userInfo.shareId);
        } else
        {
            this.share(ChannelShareType.WxMessage, this._wxMsgTitle);
        }
    }

    /**
     * 分享
    */
    private share(type: ChannelShareType, title, inviteCode?: string)
    {
        let data: Object = {};
        data['type'] = type;
        data['title'] = title;
        data['message'] = this._msg;
        data['url'] = ProjectDefined.GetInstance().getShareWebUrl(GameSetting.AppId, inviteCode);
        if (game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.Ios)
        {
            game.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
        }
        else if (game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.Android)
        {
            egret.ExternalInterface.call(ExtFuncName.Share, JSON.stringify(data));
        }
    }
}
