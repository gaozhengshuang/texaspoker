/**
 * 牌局面板设置
 */
class GamblingPanelSetting
{
	/**
	 * 最小坑位索引
	 */
	public static readonly MinPitIndex: number = 1;
	/**
	 * 最大座位数量
	 */
	public static readonly MaxPitIndex: number = 9;

	/**
	 * 本家手牌的变形
	 */
	public static readonly handCardMatrix1: egret.Matrix = new egret.Matrix(1.502, -0.285, 0.285, 1.502, 55, 245);
	public static readonly handCardMatrix2: egret.Matrix = new egret.Matrix(1.507, 0.259, -0.259, 1.507, 98, 260);
	public static readonly handCardMatrix3: egret.Matrix = new egret.Matrix(1.507, 0, 0, 1.507, 30, 245);
	public static readonly handCardMatrix4: egret.Matrix = new egret.Matrix(1.507, 0, 0, 1.507, 65, 245);
	public static readonly handCardMatrix5: egret.Matrix = new egret.Matrix(1.507, 0, 0, 1.507, 100, 245);
	public static readonly handCardMatrix6: egret.Matrix = new egret.Matrix(1.507, 0, 0, 1.507, 135, 245);
	/**
	 * 桌面牌
	 */
	public static readonly boardCardMatrix: egret.Matrix = new egret.Matrix(1.23, 0, 0, 1.23);

	/**
	 * 弃牌目标位置
	 */
	public static readonly FoldPosPoint: egret.Point = new egret.Point(360.5, 601.5);
	/**
	 * 发牌起始的相对布局属性v
	 */
	public static readonly FlopCardVerticalCenter: number = -57.5;
	/**
	 * 公共牌的起始的相对布局v c 
	 */
	public static readonly BoardCardPoint: egret.Point = new egret.Point(-20, -183.5);

	/**
 	* 按钮位置列表 位置从0-9 由于自适应已废弃 
 	*/
	private static buttonPosList9: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(256, 955),
		new egret.Point(139, 740),
		new egret.Point(139, 412),
		new egret.Point(139, 208),
		new egret.Point(291, 281),
		new egret.Point(400, 281),
		new egret.Point(552, 208),
		new egret.Point(552, 412),
		new egret.Point(552, 740)];

	/**
	* 按钮位置列表 位置从0-6 由于自适应已废弃 
	*/
	private static buttonPosList6: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(256, 955),
		new egret.Point(139, 742),
		new egret.Point(139, 388),
		new egret.Point(256, 281),
		new egret.Point(552, 388),
		new egret.Point(552, 742)];

	/**
	* 按钮位置列表 位置从0-5 由于自适应已废弃 
	*/
	private static buttonPosList5: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(256, 955),
		new egret.Point(139, 412),
		new egret.Point(291, 281),
		new egret.Point(400, 281),
		new egret.Point(552, 412)];
	/**
	 * 用于做头像自适应的 top bottom
	 */
	public static headTopBottomReleativePoint: egret.Point = new egret.Point(53, 137);
	/**
	 * 头像位置列表
	 */
	private static headPosList9: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(0, 137),
		new egret.Point(-303.5, 179.5),
		new egret.Point(-303.5, -26.5),//
		new egret.Point(-303.5, -304.5),
		new egret.Point(-126.5, 53),//
		new egret.Point(125.5, 53), //
		new egret.Point(302.5, -304.5),
		new egret.Point(302.5, -26.5), //
		new egret.Point(302.5, 179.5)];
	/**
	 * 6人桌头像位置 
	 */
	private static headPosList6: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(0, 137),
		new egret.Point(-303.5, 394),
		new egret.Point(-303.5, -303.5),
		new egret.Point(0, 53),
		new egret.Point(302.5, -303.5),
		new egret.Point(302.5, 394)];
	/**
	* 头像位置列表5人桌 
	*/
	private static headPosList5: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(0, 137),
		new egret.Point(-303.5, 394),
		new egret.Point(-303.5, -303.5),
		new egret.Point(302.5, -303.5),
		new egret.Point(302.5, 394)];
	/**
	* 头像位置列表3人桌 
	*/
	private static headPosList3: Array<egret.Point> = [
		new egret.Point(0, 0),
		new egret.Point(0, 137),
		new egret.Point(-303.5, 700),
		new egret.Point(302.5, 700)];
	/**
	 * 公共牌列表 v c
	 */
	public static boardPosList: Array<egret.Point> = [
		new egret.Point(-179, 0),
		new egret.Point(-78, 0),
		new egret.Point(23, 0),
		new egret.Point(124, 0),
		new egret.Point(225, 0),
	];
	/**
	 * 向后获取指定差值个目标索引
	 */
	public static getNextIndex(sourceIndex: number, offset: number = 1): number
	{
		sourceIndex += offset;
		if (sourceIndex > GamblingManager.maxSeats)
		{
			sourceIndex -= GamblingManager.maxSeats;
		}
		return sourceIndex;
	}
	/**
	 * 向前获取指定差值个目标索引
	 */
	public static getPreIndex(sourceIndex: number, offset: number = 1): number
	{
		if (sourceIndex < GamblingManager.maxSeats)
		{
			sourceIndex -= offset;
		}
		else
		{
			sourceIndex = 0 - offset;
		}
		if (sourceIndex <= 0)
		{
			sourceIndex += GamblingManager.maxSeats;
		}
		if (sourceIndex < GamblingPanelSetting.MinPitIndex)
		{
			sourceIndex = GamblingPanelSetting.MinPitIndex;
		}
		if (sourceIndex > GamblingManager.maxSeats)
		{
			return sourceIndex - GamblingManager.maxSeats;
		}
		return sourceIndex;
	}

	/**
	 * 获取两个索引的差值
	 */
	public static getOffset(sourceIndex: number, targetIndex: number): number
	{
		let offset: number = targetIndex - sourceIndex;
		if (offset < 0)
		{
			return offset + GamblingManager.maxSeats;
		}
		return offset;
	}
	/**
	 * 获取座位中间值
	 */
	public static get centerNum(): number
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.definition)
		{
			return Math.floor(GamblingManager.roomInfo.definition.seat / 2) + 1;
		}
		return 0;
	}
	/**
 	* 获取头像位置列表信息
 	*/
	public static getHeadPosList(): Array<egret.Point>
	{
		if (GamblingManager.roomInfo)
		{
			switch (GamblingManager.maxSeats)
			{
				case SeatMode.Three:
					return GamblingPanelSetting.headPosList3;
				case SeatMode.Five:
					return GamblingPanelSetting.headPosList5;
				case SeatMode.Six:
					return GamblingPanelSetting.headPosList6;
				case SeatMode.Nine:
					return GamblingPanelSetting.headPosList9;
			}
		}
		return null;
	}
	/**
	 * 获取按钮位置 由于自适应已废弃 
	 */
	public static get buttonPosList(): Array<egret.Point>
	{
		if (GamblingManager.roomInfo)
		{
			switch (GamblingManager.maxSeats)
			{
				case SeatMode.Five:
					return GamblingPanelSetting.buttonPosList5;
				case SeatMode.Six:
					return GamblingPanelSetting.buttonPosList6;
				case SeatMode.Nine:
					return GamblingPanelSetting.buttonPosList9;
			}
		}
		return null;
	}
}