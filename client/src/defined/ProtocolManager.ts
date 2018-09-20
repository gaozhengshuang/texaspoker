class ProtocolManager
{
	/**
	 * 登陆协议文件
	 */
	public static LoginBin: ArrayBuffer = null;
	/**
	 * 游戏协议文件c2s
	 */
	public static Gamec2sBin: ArrayBuffer = null;
	/**
	 * 游戏协议文件s2c
	 */
	public static Games2cBin: ArrayBuffer = null;
	/**
	 * 设置协议
	 */
	public static SetProtocolData(zipList: JSZipObject[])
	{
		for (let item of zipList)
		{
			if (item.name == 'loginall.bin')
			{
				ProtocolManager.LoginBin = item.asArrayBuffer();
			}
			else if (item.name == 'c2s.bin')
			{
				ProtocolManager.Gamec2sBin = item.asArrayBuffer();
			}
			else if (item.name == 's2c.bin')
			{
				ProtocolManager.Games2cBin = item.asArrayBuffer();
			}
			else
			{
				qin.Console.log("未知的协议文件:", item.name);
			}
		}
	}
}