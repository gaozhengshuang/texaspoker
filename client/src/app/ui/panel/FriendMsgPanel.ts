/**
 * 好友消息面板
 */
class FriendMsgPanel extends BasePanel
{
	public inviteMsg_bg: eui.Image;
	public requireMsg_bg: eui.Image;
	public tweenGp: eui.Group;
	private _requestInfo: RequestNewsInfo;
	public constructor()
	{
		super();
		this.isTween = false;
		this.layer = UILayerType.Tips;
		this.setSkinName(UIModuleName.FriendMsgPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		game.Tick.RemoveSecondsInvoke(this.onTimeRefresf, this);
		game.Tick.AddSecondsInvoke(this.onTimeRefresf, this);
		this.refreshUI(appendData);
		this.tweenGp.y = -100;
		egret.Tween.get(this.tweenGp).to({ y: 0 }, 600, egret.Ease.backOut)
		SoundManager.playEffect(MusicAction.notice);
	}
	private refreshUI(appendData: any)
	{
		this._requestInfo = appendData;
		if (this._requestInfo)
		{
			if (this._requestInfo.type == FriendMsgType.InviteMsg)
			{
				this.inviteMsg_bg.visible = true;
				this.requireMsg_bg.visible = false;
			}
			else if (this._requestInfo.type == FriendMsgType.RequireMsg)
			{
				this.inviteMsg_bg.visible = false;
				this.requireMsg_bg.visible = true;
			}
		}
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		//FriendManager.InviteFriendEvent.addListener(this.friendInviteHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
		game.Tick.RemoveSecondsInvoke(this.onTimeRefresf, this);
		//FriendManager.InviteFriendEvent.removeListener(this.friendInviteHandler, this);
	}
	protected clickHandler(event: egret.TouchEvent)
	{
		if (this._requestInfo)
		{
			if (this._requestInfo.type == FriendMsgType.InviteMsg)
			{
				UIManager.showPanel(UIModuleName.InviteMsgPanel, this._requestInfo.info);
			}
			else if (this._requestInfo.type == FriendMsgType.RequireMsg)
			{
				if (!UIManager.isShowPanel(UIModuleName.FriendPanel))
				{
					UIManager.showPanel(UIModuleName.FriendPanel, { tabFlag: FriendUIType.RequestList, prevPanelName: UIModuleName.None });
				}
				else
				{
					FriendManager.allowFriendJumpEvent.dispatch();
				}
			}
			this.removeFriendMsg();
		}
	}
	private removeFriendMsg()
	{
		if (this._requestInfo)
		{
			FriendManager.removeFriendMsgInfo(this._requestInfo);
			let info = FriendManager.getFriendMsgInfo();
			if (info)
			{
				this.refreshUI(info);
			}
			else
			{
				this.onCloseBtnClickHandler(null);
			}
		}
	}
	private onTimeRefresf()
	{
		if (this._requestInfo && this._requestInfo.time && TimeManager.GetServerUtcSecondstamp() - this._requestInfo.time > FriendManager.msgTime)
		{
			let info = FriendManager.getFriendMsgInfo();
			if (info)
			{
				this.init({ type: info.type, data: info.info, time: info.time });
			}
			else
			{
				this.onCloseBtnClickHandler(null);
			}
		}
	}
	private friendInviteHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
}
