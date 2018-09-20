/**
 * 头像上传管理
 */
class UploadHeadManager
{
	private static readonly FileExt: string = "jpg";//图片格式(目前只有jpg)
	private static readonly JpgQuality: number = 75;
	private static readonly Size: number = 128;
	private static readonly MaxCache: number = 300;
	private static _cacheNameList: Array<string> = new Array<string>();
	private static _addNameList: Array<string> = new Array<string>();
	private static _isWxLoadBackStage: boolean = false; //微信后台上传不提示
	/**
	 * 上传头像路径
	 */
	private static _headPath: string;

	public static initialize()
	{
		ChannelManager.OnImageSelect.addListener(UploadHeadManager.onSelectHead, this);
		UserManager.onWxHeadLoadCompleteEvent.addListener(UploadHeadManager.onWxHeadLoadCompleteHandler, this);
	}
	public static clearAllData(): void
	{
		UploadHeadManager._cacheNameList.length = 0;
		UploadHeadManager._addNameList.length = 0;
	}
	/**
	 * 开始上传
	 */
	private static startLoad(sign: string, path: string, headData: string)
	{
		let headPath: string = ProjectDefined.GetInstance().getHeadUpLoadUrl();
		if (qin.StringUtil.isNullOrEmpty(headPath) == false && qin.StringUtil.isNullOrEmpty(headData) == false)
		{
			UpLoader.UpLoad(headPath, sign, headData, true, UploadHeadManager.upLoadComplete, UploadHeadManager.uploadError, this);
			UploadHeadManager._headPath = path;
		}
	}
	private static upLoadComplete(data: any)
	{
		if (UploadHeadManager._isWxLoadBackStage == false)
		{
			AlertManager.showAlert("头像上传完成，请等待审核");
		}
		UserManager.userInfo.head = UserManager.userInfo.head + GameSetting.HeadUploadVerifySign + UploadHeadManager._headPath;
		UploadHeadManager.OnUploadHeadUpdate.dispatch();
	}
	private static uploadError(event: egret.IOErrorEvent)
	{
		if (UploadHeadManager._isWxLoadBackStage == false)
		{
			AlertManager.showAlert("头像上传失败，请稍后重试！");
		}
	}
	public static onSelectHead(content: any): void
	{
		let data: string = content.data;
		if (!qin.StringUtil.isNullOrEmpty(data))
		{
			switch (content.type)
			{
				case HeadUploadSystemType.web:
					data = UploadHeadManager.removeAppendData(data);
					UploadHeadManager._isWxLoadBackStage = false;
					UploadHeadManager.tryUpload(data);
					break;
				case HeadUploadSystemType.native:
					if (content.data == "NoPhoto")
					{
						UIManager.showFloatTips("没有使用相册的权限");
						return;
					}
					UploadHeadManager._isWxLoadBackStage = false;
					UploadHeadManager.tryUpload(data);
					break;
			}
		}
	}
	private static onWxHeadLoadCompleteHandler(data: string)
	{
		UploadHeadManager._isWxLoadBackStage = true;

		data = UploadHeadManager.removeAppendData(data);
		UploadHeadManager.tryUpload(data);
	}
	private static removeAppendData(data: string): string
	{
		if (data.indexOf(qin.StringConstants.Comma) != -1)
		{
			let index: number = data.indexOf(qin.StringConstants.Comma);
			let len: number = data.length - index;
			data = data.substr(index + 1, len - 1);
		}
		return data;
	}
	private static tryUpload(data: string)
	{
		try
		{
			let bd: egret.BitmapData = egret.BitmapData.create('base64', data);
			UploadHeadManager.OnSelectHeadUpdate.dispatch(bd);

			let uploadFunc: Function = function (imgData: string)
			{
				if (qin.StringUtil.isNullOrEmpty(imgData))
				{
					UIManager.showFloatTips("请先选择图片");
					return;
				}
				let callBackServer: Function = function (obj: qin.SpRpcResult)
				{
					if (obj.data && obj.data["sign"] != null && obj.data["path"] != null)
					{
						let path: string = obj.data["path"];
						path = GameSetting.replaceHeadSign(path);
						UploadHeadManager.startLoad(obj.data["sign"], path, imgData);
					}
				};
				SocketManager.callAsync(Command.Role_UploadHead_3683, { "FileExt": UploadHeadManager.FileExt }, callBackServer, null, this);
			};
			uploadFunc(data);
		}
		catch (e)
		{
			UIManager.showFloatTips("选择图片失败,请尝试其他图片");
		}
	}
	private static getEncodeBytes(byteStr: string): ArrayBuffer
	{
		return qin.CodeUtil.base64ToArrayBuffer(byteStr);
	}
	public static clear(): void
	{
	}
	public static selectHead(): void
	{
		ChannelManager.imageSelect(UploadHeadManager.Size, UploadHeadManager.JpgQuality);
	}
	/**
 	* 是否为默认头像
 	*/
	public static isDefaultHead(head: string): boolean
	{
		if (head == SheetSubName.Default_Head_Secret || head == SheetSubName.Default_Head_Male || head == SheetSubName.Default_Head_Female || head == SheetSubName.HundredWarSysBanker_Head)
		{
			return true;
		}
		return false;
	}
	/**
	 * 选择头像完成
	 */
	public static OnSelectHeadUpdate: qin.DelegateDispatcher = new qin.DelegateDispatcher(); //Texture2D tex
	/**
	 * 上传头像完成
	 */
	public static OnUploadHeadUpdate: qin.DelegateDispatcher = new qin.DelegateDispatcher();
}

