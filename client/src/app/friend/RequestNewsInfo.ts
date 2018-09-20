/**
 * 好友请求信息
*/
class RequestNewsInfo
{
    public constructor(type: FriendMsgType, info: any)
    {
        this.type = type;
        this.info = info;
        this.time = TimeManager.GetServerUtcTimestamp();
    }
    //时间
    public time: number;
    //类型
    public type: FriendMsgType;
    public info: any;
}