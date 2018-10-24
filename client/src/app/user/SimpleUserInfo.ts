/**
 * 简单的用户信息
*/
class SimpleUserInfo extends BaseServerValueInfo
{
	/**
	 * 角色ID
	 */
	public roleId: number;
	/**
	 * 头像
	 */
	private _head: string;
	/**
	 * 审核中的头像
	 */
	private _verifyHead: string;

	public get verifyHead(): string
	{
		return this._verifyHead;
	}
	public set head(value: string)
	{
		this._isHeadUnPass = false;
		this._isHeadVerify = false;
		if (game.StringUtil.isNullOrEmpty(value) == false)
		{
			this._isHeadVerify = value.indexOf(GameSetting.HeadUploadVerifySign) != -1;
			this._isHeadUnPass = value.indexOf(GameSetting.HeadUploadUnPassSign) != -1;
			if (this._isHeadVerify)
			{
				let heads: string[] = value.split(GameSetting.HeadUploadVerifySign);
				value = heads[0];
				this._verifyHead = heads[1];
			}
		}
		this._head = value;
	}
	public get head(): string
	{
		if (game.StringUtil.isNullOrEmpty(this._head))
		{
			return SheetSubName.getdefaultHead(this.sex);
		}
		else
		{
			return this._head;
		}
	}

	private _isHeadVerify: boolean;
	/**
	 * 获取头像审核状态
	 */
	public get isHeadVerify(): boolean
	{
		return this._isHeadVerify;
	}

	private _isHeadUnPass: boolean;
	/**
	 * 头像上传审核未通过
	 */
	public get isHeadUnPass(): boolean
	{
		return this._isHeadUnPass;
	}
	/**
	 * 昵称
	 */
	public name: string;
	/**
	 * 性别
	 */
	public sex: number;
	/**
	 * 金币
	 */
	public gold: number;
    /**
     * 会员等级
    */
	public vipLevel: number;
	/**
	 * 庄家的位置
	 */
	public pos:number;

	public reset()
	{
		this.roleId = 0;
		this.head = null;
		this.name = null;
		this.sex = undefined;
		this.gold = undefined;
		this.vipLevel = undefined;
		this.pos = undefined;
	}
}