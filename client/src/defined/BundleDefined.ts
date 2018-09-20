/**
 * 安装包/web 定义
 * */
class BundleDefined extends BaseDefined<BundleDefinition>
{
	/**
	 * 默认的包ID
	 */
	public static readonly DefaultID: number = 1;

	private static readonly bundleConfig: string = "bundle";
	private static _instance: BundleDefined;
	public static GetInstance(): BundleDefined
	{
		if (BundleDefined._instance == null)
		{
			BundleDefined._instance = new BundleDefined();
		}
		if (DefinedManager.IsParsed(BundleDefined.bundleConfig) == false)
		{
			BundleDefined._instance.initialize();
		}
		return BundleDefined._instance;
	}

	private initialize()
	{
		this.dataList = DefinedManager.GetData(BundleDefined.bundleConfig) as Array<BundleDefinition>;
	}
	/**
	 * 从web版url参数bid获取
	 */
	public getDefinitionByWebBid(id: number): BundleDefinition
	{
		if (this.dataList != null)
		{
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				let item: BundleDefinition = this.dataList[i];
				if (item.id == id)
				{
					return item;
				}
			}
		}
		return null;
	}
	public getDefinitionByBundleId(bundleId: string): BundleDefinition
	{
		if (bundleId && this.dataList != null)
		{
			for (let i: number = 0; i < this.dataList.length; i++)
			{
				let item: BundleDefinition = this.dataList[i];
				if (item.bundleId == bundleId)
				{
					return item;
				}
			}
		}
		return null;
	}
}
class BundleDefinition implements IBaseDefintion
{
	/**
	 * 包ID，数字的，唯一的。映射 bundleId
	 */
	public id: number;
	/**
	 * bundleId
	 */
	public bundleId: string;
	/**
	 * 支付状态 0正常 1全部混合使用 2只用第三方的 3关闭
	 */
	public pay: number;
	/**
	 * 属于谁的
	 */
	public owenr: string;
	/**
	 * 安装包的下载地址(web版可以不填)
	 */
	public url: string;
	/**
	 * ios包id
	 */
	public ios: number;
	/**
	 * android包id
	 */
	public android: number;
}