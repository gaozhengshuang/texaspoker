/**
 * 微信头像处理 
 */
class WxHeadHandler
{
	/**
	 * 头像地址
	 */
	public headUrl: string;

	public tryUpLoadHead()
	{
		if (qin.StringUtil.isNullOrEmpty(this.headUrl) == false)
		{
			this.upLoadHead();
		}
	}
	private upLoadHead()
	{
		RES.getResByUrl(this.headUrl, (data: any, url: string) =>
		{
			var img: egret.Texture = data;
			if (img instanceof egret.Texture)
			{
				let headData: string = qin.StringConstants.Empty;
				try
				{
					headData = img.toDataURL("image/jpeg");
					if (qin.StringUtil.isNullOrEmpty(headData))
					{
						headData = img.toDataURL("image/png");
					}
					if (!headData)
					{
						qin.Console.log("微信头像转base64失败！");
					}
				}
				catch (e)
				{
					qin.Console.log("微信头像转base64出错！");
				}
				if (headData)
				{
					UserManager.onWxHeadLoadCompleteEvent.dispatch(headData);
				}
			}
		}, this, RES.ResourceItem.TYPE_IMAGE);
	}
	public clear()
	{
		this.headUrl = undefined;
	}
}