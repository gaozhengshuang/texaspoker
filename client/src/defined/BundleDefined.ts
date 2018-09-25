/**
 * 安装包/web 定义
 * */
class BundleDefined
{
	/**
	 * 默认的包ID
	 */
	public static readonly DefaultID: number = 1;
	private static _instance: BundleDefined;
	public static GetInstance(): BundleDefined
	{
		if (BundleDefined._instance == null)
		{
			BundleDefined._instance = new BundleDefined();
		}
	
		return BundleDefined._instance;
	}

	/**
	 * 从web版url参数bid获取
	 */
	public getDefinitionByWebBid(id: number): table.IBundleDefine
	{
		if (table.Bundle != null)
		{
			for (let i: number = 0; i < table.Bundle.length; i++)
			{
				let item: table.IBundleDefine = table.Bundle[i];
				if (item.Id == id)
				{
					return item;
				}
			}
		}
		return null;
	}
	public getDefinitionByBundleId(bundleId: string): table.IBundleDefine
	{
		if (bundleId && table.Bundle != null)
		{
			for (let i: number = 0; i < table.Bundle.length; i++)
			{
				let item: table.IBundleDefine = table.Bundle[i];
				if (item.BundleId == bundleId)
				{
					return item;
				}
			}
		}
		return null;
	}
}