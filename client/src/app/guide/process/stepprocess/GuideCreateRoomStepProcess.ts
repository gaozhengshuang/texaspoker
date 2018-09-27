/**
 * 创建房间
 */
class GuideCreateRoomStepProcess extends BaseGuideStepProcess
{
	public run()
	{
		super.run();
		this.createRoom();
	}
	private createRoom()
	{
		if (this.definition)
		{
			let roomDef: GuideRoomDefinition = GuideRoomDefined.GetInstance().getDefinition(this.definition.stepParams.id);
			if (roomDef)
			{
				GamblingManager.reset();
				GamblingManager.roomInfo = new RoomInfo();
				GamblingManager.roomInfo.data = new msg.RS2C_RetEnterRoom();
				GamblingManager.roomInfo.copyValueFrom(GamblingManager.roomInfo);

				let pInfo: PlayerInfo = GamblingManager.getPlayerInfoByPos(GuideGamblingProcess.self);
				pInfo.roleId = UserManager.userInfo.roleId;
				pInfo.userInfo.head = UserManager.userInfo.head;
				pInfo.userInfo.sex = UserManager.userInfo.sex;
				pInfo.userInfo.name = UserManager.userInfo.name;

				for (let childInfo of GamblingManager.roomInfo.playerList)
				{
					if (childInfo.pos != GuideGamblingProcess.self)
					{
						childInfo.userInfo.head = SheetSubName.getdefaultHead(childInfo.userInfo.sex)
					}
				}
				SceneManager.onSwitchCompleteEvent.addListener(this.onSwitchSceneComplete, this);
				SceneManager.switcScene(SceneType.Game);
			}
			else
			{
				game.Console.logError("新手引导创建房间数据异常！引导房间ID：" + this.definition.stepParams.id);
			}
		}
	}
	private onSwitchSceneComplete(data: any)
	{
		GuideGamblingProcess.nextRoundStart();
		this.complete();
	}
	public complete()
	{
		super.complete();
	}
	public clear()
	{
		super.clear();
		SceneManager.onSwitchCompleteEvent.removeListener(this.onSwitchSceneComplete, this);
	}
}