/**
 * 邀请消息面板
 */
class InviteMsgPanel extends BasePanel
{
	public joinBtn: eui.Button;
	public backBtn: eui.Button;
	public headComp: CircleHeadComponent;
	public inviteMsgLable: eui.Label;
	public roomBuyLabel: eui.Label;
	public roomIdLabel: eui.Label;
	public omahaInviteLable: eui.Label;
	public omahaGroup: eui.Group;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.InviteMsgPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0.5;
	}
	public init(appendData: any)
	{
		super.init(appendData);
		let info: FriendInfo = FriendManager.getFriendInfoById(game.longToNumber(appendData.roleid));
		this.roomBuyLabel.text = "";
		if (info && appendData.roomid && appendData.roomid != 0)
		{
			let def: table.ITexasRoomDefine = table.TexasRoomById[game.longToNumber(appendData.roomid)];
			this.inviteMsgLable.text = "你的好友" + info.name + "现在邀请您一起游戏！";
			this.omahaInviteLable.text = "你的好友" + info.name + "现在邀请您一起进行";
			this.headComp.init(info, 120);
			if (def)
			{
				this.roomBuyLabel.text = game.MathUtil.formatNum(game.longToNumber(def.SBuyin)) + "买入";
				if (def.Type == PlayingFieldType.OmahaPrimary || def.Type == PlayingFieldType.OmahaMiddle || def.Type == PlayingFieldType.OmahaHigh || def.Type == PlayingFieldType.OmahaPersonal)
				{
					this.inviteMsgLable.visible = false;
					this.omahaGroup.visible = true;
				}
				else
				{
					this.inviteMsgLable.visible = true;
					this.omahaGroup.visible = false;
				}
			}
		}
		else
		{
			game.Console.logError("ERROR好友信息未找到角色ID：" + appendData.roleid);
		}
		if (appendData.id)
		{
			if (appendData.id.toString().length < 5)
			{
				this.roomIdLabel.text = PlayingFieldManager.roomIdAddZero(game.longToNumber(appendData.id));
			}
			else
			{
				this.roomIdLabel.text = appendData.id.toString();
			}
		}
	}
	protected onRender(event: egret.Event)
	{
		super.onRender(event);
	}
	protected onEnable(event: eui.UIEvent): void
	{
		super.onEnable(event);
		this.joinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClickHandler, this);
		GamblingManager.OnGetRoomInfoEvent.addListener(this.onGetRoomInfoHandler, this);
	}
	protected onDisable(event: eui.UIEvent): void
	{
		super.onDisable(event);
		this.joinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinBtnHandler, this);
		this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClickHandler, this);
		GamblingManager.OnGetRoomInfoEvent.removeListener(this.onGetRoomInfoHandler, this);
	}
	private onBackBtnClickHandler()
	{
		this.onCloseBtnClickHandler(null);
	}
	/**
	 * 立即加入房间
	*/
	protected joinBtnHandler(event: egret.TouchEvent)
	{
		if (SceneManager.sceneType == SceneType.Game && InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.id != 0)
		{
			if (GamblingManager.roomInfo.id == this.panelData.id)
			{
				UIManager.showFloatTips("已在房间内");
				this.onBackBtnClickHandler();
				return;
			}
		}
		this.confirmGotoRoom();
	}
	private confirmGotoRoom()
	{
		if (this.panelData)
		{
			GamblingManager.reqEnterRoom(this.panelData.id, this.panelData.pwd);
		}
	}
	/**
	 * 进入房间信息返回
	 */
	private onGetRoomInfoHandler()
	{
		if (SceneManager.sceneType == SceneType.Game)
		{
			let panel: GamblingPanel = UIManager.getPanel(UIModuleName.GamblingPanel) as GamblingPanel;
			if (panel)
			{
				panel.switchToGameSceneInRoom();
			}
			else
			{
				UIManager.showPanel(UIModuleName.GamblingPanel);
			}
		}
		else
		{
			SceneManager.switcScene(SceneType.Game);
		}
		this.onCloseBtnClickHandler(null);
	}
	private backToHall()
	{
		if (GamblingManager.roomInfo)
		{
			switch (GamblingManager.roomInfo.gamblingType)
			{
				case GamblingType.Common:
					GamblingManager.reqLeaveRoom();
					break;
				case GamblingType.Match:
					AlertManager.showConfirm("退出比赛后，比赛将进入托管状态，是否确认退出？", this.leaveRoom, null, this.panelData);
					break;
				case GamblingType.PlayFieldPersonal:
				case GamblingType.OmahaPersonal:
					if (GamblingManager.isMaster) 
					{
						AlertManager.showConfirm("是否退出并解散当前房间,进入被邀请房间?", this.leaveRoom, null, this.panelData);
					}
					else
					{
						this.leaveRoom(this.panelData);
					}
					break;
			}
		}
	}
	private leaveRoom(data: any)
	{
		if (data)
		{
			GamblingManager.reqEnterRoom(data.id, data.pwd);
		}
	}
}