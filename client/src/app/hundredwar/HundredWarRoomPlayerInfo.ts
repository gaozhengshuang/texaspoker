/**
 * 百人大战房间玩家信息
 */
class HWHundredWarRoomPlayerInfo extends SimpleUserInfo implements IBaseHead
{
	/**
	 * 头像宽高
	 */
    public width: number = 100;
    public height: number = 100;
	/**
	 * 位置
	 */
    public pos: number;

    public reset()
    {
        super.reset();
        this.pos = undefined;
    }
}
