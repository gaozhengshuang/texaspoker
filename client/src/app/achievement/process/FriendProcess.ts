/**
 * 好友成就进度信息
 */
class FriendProcess extends BaseAchieveProcess 
{
    public init(process: number)
    {
        super.init(process);
        AchieveProcessManager.addProcessListener(this.type, this.onProcessUpdate, this);
    }

    public onProcessUpdate()
    {
        super.onProcessUpdate();
        if (FriendManager.friendList && FriendManager.friendList.length > this.process)
        {
            super.init(UserManager.userInfo.friendNum);
        }
    }

    public destroy()
    {
        AchieveProcessManager.removeProcessListener(this.type, this.onProcessUpdate, this);
        super.destroy();
    }
}