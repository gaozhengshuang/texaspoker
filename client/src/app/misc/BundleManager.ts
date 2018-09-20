class BundleManager
{
	private static _definition: BundleDefinition;
    /**
     * 获取当前包配置
     */
	private static getBundleDefinition(): BundleDefinition
	{
		if (BundleManager._definition == null)
		{
			if (game.System.isWeb)
			{
				let bid: number = URLOption.getNumber(URLOption.Bid);
				if (!bid)
				{
					bid = BundleDefined.DefaultID;
				}
				BundleManager._definition = BundleDefined.GetInstance().getDefinitionByWebBid(bid);
			}
			else
			{
				BundleManager._definition = BundleDefined.GetInstance().getDefinitionByBundleId(ChannelManager.bundleId);
			}
			if (BundleManager._definition == null)
			{
				AlertManager.showAlertByString('没有配置包ID');
				throw new Error('没有配置包ID');
			}
			if (game.StringUtil.isNullOrEmpty(BundleManager._definition.bundleId) == false && game.StringUtil.isNullOrEmpty(BundleManager._definition.url))
			{
				AlertManager.showAlertByString('安装包必须要配置包url');
				throw new Error('安装包必须要配置包url');
			}
		}
		return BundleManager._definition;
	}
	/**
	 * 获取数字包ID，每个包唯一的数字标识
	 */
	public static getBid(): number
	{
		let def = BundleManager.getBundleDefinition();
		if (def)
		{
			return def.id;
		}
		return BundleDefined.DefaultID;
	}
	/**
	 * 获取支付状态
	 */
	public static getPayState(): number
	{
		let def = BundleManager.getBundleDefinition();
		if (def)
		{
			return def.pay;
		}
		return PayState.Normal;
	}
	/**
	 * 获取安装包下载地址
	 */
	public static getUrl(): string
	{
		let def = BundleManager.getBundleDefinition();
		if (def)
		{
			return def.url;
		}
		return game.StringConstants.Empty;
	}
	/**
	 * 根据操作系统获取下载地址
	 */
	public static getUrlByOS(): string
	{
		let def = BundleManager.getBundleDefinition();
		if (def)
		{
			let os = game.RuntimeTypeName.getOSName();
			let bundleDef: BundleDefinition;
			if (os == game.RuntimeTypeName.Android)
			{
				bundleDef = BundleDefined.GetInstance().getDefinition(def.android);
			}
			else if (os == game.RuntimeTypeName.Ios)
			{
				bundleDef = BundleDefined.GetInstance().getDefinition(def.ios);
			}
			if (bundleDef)
			{
				return bundleDef.url;
			}
		}
		return game.StringConstants.Empty;
	}
	/**
	 * 根据原始资源名获取包对应的资源名
	 */
	public static getResNameByBundle(name: string): string
	{
		return ResPrefixPathName.Bundle + BundleManager.getBid() + "/" + name;
	}
	/**
	 * 应用icon
	 */
	public static getAppIconPng(): string
	{
		return PathName.ResourceDirectory + 'icons/' + BundleManager.getBid() + '.png';
	}
}