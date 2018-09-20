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
		if (game.StringUtil.isNullOrEmpty(this.headUrl) == false)
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
				let headData: string = game.StringConstants.Empty;
				try
				{
					headData = img.toDataURL("image/jpeg");
					if (game.StringUtil.isNullOrEmpty(headData))
					{
						headData = img.toDataURL("image/png");
					}
					if (!headData)
					{
						game.Console.log("微信头像转base64失败！");
					}
				}
				catch (e)
				{
					game.Console.log("微信头像转base64出错！");
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