/**
 * 邀请好友面板
 */
class InviteFriendPanel extends BasePanel
{
	public inviteFriendGroup: eui.Group;
	public inviteFriend_scroller: eui.Scroller;
	public inviteFriendList: eui.List;
	public _dp: eui.ArrayCollection;
	public inviteBtn: eui.Button;
	public checkAll: eui.CheckBox;
	private _infoList: Array<InviteInfo>;

	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.InviteFriendPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.isCloseButtonTween = false;
		UIUtil.listRenderer(this.inviteFriendList, this.inviteFriend_scroller, InviteFriendListItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
	}
	public init(appendData: any)
	{
		super.init(appendData);
		this.checkAll.selected = false;
		if (FriendManager.friendList)
		{
			this._infoList = new Array<InviteInfo>();
			for (let i: number = 0; i < FriendManager.friendList.length; i++)
			{
				let iInfo: InviteInfo = new InviteInfo();
				iInfo.friendInfo = FriendManager.friendList[i];
				this._infoList.push(iInfo);
			}
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
		this.setFriendListInfo();
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.checkAll.addEventListener(egret.Event.CHANGE, this.checkAllHandler, this)
		this.inviteFriendList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
		this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this);
		FriendManager.InviteFriendEvent.addListener(this.inviteFriendHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.checkAll.removeEventListener(egret.Event.CHANGE, this.checkAllHandler, this)
		this.inviteFriendList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.checkBtnHandler, this);
		this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendInviteHandler, this)
		FriendManager.InviteFriendEvent.removeListener(this.inviteFriendHandler, this);
		this._infoList = null;
	}
	protected setFriendListInfo()
	{
		if (this._infoList)
		{
			this._dp = new eui.ArrayCollection(this._infoList.sort(SortUtil.inviteFriendSort));
			this.inviteFriendList.dataProvider = this._dp;
		}
	}
	public checkAllHandler()
	{
		if (this._infoList)
		{
			for (let i: number = 0; i < this._infoList.length; i++)
			{
				this._infoList[i].state = this.checkAll.selected;
				let item: InviteFriendListItemRenderer = this.getItemRender(this._infoList[i].friendInfo);
				if (item)
				{
					item.setChecked(this.checkAll.selected);
				}
			}
		}
	}
	private getItemRender(friendInfo: FriendInfo): InviteFriendListItemRenderer
	{
		for (let i = 0; i < this.inviteFriendList.numChildren; i++)
		{
			let inviteFriendListItem: InviteFriendListItemRenderer = this.inviteFriendList.getChildAt(i) as InviteFriendListItemRenderer;
			if (inviteFriendListItem.bindData.friendInfo.roleId == friendInfo.roleId)
			{
				return inviteFriendListItem;
			}
		}
		return null;
	}
	public checkBtnHandler(event: eui.ItemTapEvent)
	{
		let inviteFriendListItem: InviteFriendListItemRenderer = this.getItemRender(this.inviteFriendList.selectedItem.friendInfo);
		if (inviteFriendListItem)
		{
			let state: boolean = !inviteFriendListItem.isCheckedBtn.selected;
			inviteFriendListItem.bindData.state = state;
			inviteFriendListItem.setChecked(state);
			if (!state)
			{
				this.checkAll.selected = state;
			}
		}
	}
	public sendInviteHandler()
	{
		if (!GamblingManager.roomInfo || GamblingManager.roomInfo.id == 0)
		{
			AlertManager.showAlert("您当前不在房间中,无法邀请好友");
			return;
		}
		let friendIdArray: Array<number> = new Array<number>();
		if (this._infoList)
		{
			for (let i = 0; i < this._infoList.length; i++)
			{
				if (this._infoList[i].state && this._infoList[i].friendInfo)
				{
					friendIdArray.push(this._infoList[i].friendInfo.roleId);
				}
			}
			if (friendIdArray.length > 0)
			{
				FriendManager.reqInviteFriend(GamblingManager.roomInfo.id, friendIdArray);
			}
			else
			{
				AlertManager.showAlert("您未选择要邀请的好友");
			}
		}
	}
	private inviteFriendHandler()
	{
		UIManager.showFloatTips("好友邀请已发送");
		this.onCloseBtnClickHandler(null);
	}
}
/**
 * 邀请好友信息封装
 */
class InviteInfo
{
	public friendInfo: FriendInfo;
	public state: boolean;
}