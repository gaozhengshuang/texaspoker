
/// <summary>
/// 帐号prefs本地储存
/// </summary>
class AccountPlayerPrefs
{
	private static readonly PrefsKey: string = "Qingame.Account";
	private static readonly MaxCount: number = 5;
	//
	private static _accountList: Array<any>;
	public static Reset()
	{
		AccountPlayerPrefs._accountList = null;
	}
	public static GetAccountList(): Array<any>
	{
		if (AccountPlayerPrefs._accountList == null)
		{
			let data: string = PrefsManager.getValue(AccountPlayerPrefs.PrefsKey);
			try
			{
				AccountPlayerPrefs._accountList = JSON.parse(data);
			}
			catch (e)
			{
				game.Console.log("获取账号列表解析json格式失败：" + data);
			}
		}
		return AccountPlayerPrefs._accountList;
	}
	/// <summary>
	/// 是否有匹配的帐号密码
	/// </summary>
	/// <param name="account"></param>
	/// <param name="pw"></param>
	public static IsMatchAccountPassword(account: string, pw: string): boolean
	{
		let list: Array<any> = AccountPlayerPrefs.GetAccountList();
		if (list != null && list.length > 0)
		{
			for (let i: number = 0; i < list.length; i++)
			{
				let info: any = list[i];
				if (info.account == account && info.pw == pw)
				{
					return true;
				}
			}
		}
		return false;
	}

	public static InsertAccount(account: string, pw: string, type: string = AccountPwdType.pw)
	{
		if (AccountPlayerPrefs._accountList == null)
		{
			AccountPlayerPrefs._accountList = new Array<any>();
		}
		let isHas: boolean = false;
		for (let i: number = 0; i < AccountPlayerPrefs._accountList.length; i++)
		{
			let info: any = AccountPlayerPrefs._accountList[i];
			if (info.account == account)
			{
				if (i == 0 && ((info.pw == pw && info.type == AccountPwdType.pw) || (info.token == pw && info.type == AccountPwdType.token)))
				{
					return;
				}
				isHas = true;
				if (type == AccountPwdType.token)
				{
					info.token = pw;
				} else
				{
					info.pw = pw;
				}
				info.type = type;
				if (i > 0)
				{
					AccountPlayerPrefs._accountList.splice(i, 1);
					AccountPlayerPrefs._accountList.unshift(info);
				}
				break;
			}
		}
		if (isHas == false)
		{
			let info: any;
			if (type == AccountPwdType.token)
			{
				info = { account: account, token: pw, type: type };
			} else
			{
				info = { account: account, pw: pw, type: type };
			}
			AccountPlayerPrefs._accountList.unshift(info);
		}
		if (AccountPlayerPrefs._accountList.length > AccountPlayerPrefs.MaxCount)
		{
			AccountPlayerPrefs._accountList.splice(AccountPlayerPrefs._accountList.length - 1, 1)
		}
		AccountPlayerPrefs.Flush(AccountPlayerPrefs._accountList);
	}

	public static RemoveAccount(account: string)
	{
		if (AccountPlayerPrefs._accountList == null)
		{
			return;
		}
		for (let i: number = 0; i < AccountPlayerPrefs._accountList.length; i++)
		{
			let info: any = AccountPlayerPrefs._accountList[i];
			if (info.account == account)
			{
				AccountPlayerPrefs._accountList.splice(i, 1);
				break;
			}
		}
		AccountPlayerPrefs.Flush(AccountPlayerPrefs._accountList);
	}

	private static Flush(list: Array<any>)
	{
		if (list == null)
		{
			PrefsManager.removeData(AccountPlayerPrefs.PrefsKey);
			return;
		}
		PrefsManager.setValue(AccountPlayerPrefs.PrefsKey, JSON.stringify(list))
	}
}
