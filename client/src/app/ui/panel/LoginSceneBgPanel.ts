/**
 * 登录场景背景界面
 */
class LoginSceneBgPanel extends BasePanel
{
	public logoImg:eui.Image;
	public versionLabel: eui.Label;
	public constructor()
	{
		super();
		this.setSkinName(UIModuleName.LoginSceneBgPanel);
	}
	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this.maskAlpha = 0;
		this.logoImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Logo_png);
	}
	public showVersion()
	{
		if (this.versionLabel)
		{
			this.versionLabel.text = VersionManager.getVersionStr();
		}
	}
}