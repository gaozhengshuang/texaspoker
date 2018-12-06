class ChannelBase
{
	/**
	 * 登录
	 */
	public Login(loginType: string)
	{

	}
	/**
	 * 支付
	 */
	public PaySend(payState:number, awardId: number, serverId: number, orderId: string, price: number, productName: string)
	{

	}
	/**
	 * 分享
	 */
	public share(type: string, title: string, message: string, inviteCode?:string)
	{

	}
	/**
	 * 选择图片
	 */
	public imageSelect(size: number, quality: number): void
	{
		
	}
	/**
	 * 使用浏览器打开url
	 */
	public openURL(url:string):void
	{
		window.open(url, '_blank');
	}
	/**
	 * 拷贝内容到粘贴板
	 */
	public copyToPastboard(data:string)
	{

	}
	//------------------------------------------------------------------
	// sdk回调执行方法
	//------------------------------------------------------------------

	/**
	 * 支付成功
	 */
	public sdkPaySucceed(data: string)
	{

	}
	/**
	 * 支付失败
	 */
	public sdkPayFailed()
	{

	}
	/**
	 * 检查有没有未完成的订单
	 */
	public checkUnFinishedPayList()
	{

	}
}