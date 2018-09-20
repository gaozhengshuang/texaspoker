
/**
 * 上传器
 */
class UpLoader
{
	private static ReTryMax: number = 2;//最大重试次数
	//
	private static _uploadQueue: Array<UpLoadData> = new Array<UpLoadData>();
	private static _isUpLoading: boolean = false;

	/**
	 * 上传数据
	 */
	public static UpLoad(url: string, sign: string, bytes: string, isReTry: boolean, complete: Function = null, error: Function = null, thisObj?: any)
	{
		if (qin.StringUtil.isNullOrEmpty(url))
		{
			return;
		}
		UpLoader._uploadQueue.unshift(new UpLoadData(url, sign, bytes, isReTry, complete, error, thisObj));
		UpLoader.UpLoadNext();
	}

	private static _upLoader: egret.HttpRequest;

	private static UpLoadNext()
	{
		if (UpLoader._isUpLoading == false)
		{
			if (UpLoader._uploadQueue.length != 0)
			{
				UpLoader._isUpLoading = true;
				let data: UpLoadData = UpLoader._uploadQueue[0];
				UpLoader._upLoader = new egret.HttpRequest();
				UpLoader._upLoader.responseType = egret.HttpResponseType.TEXT;
				UpLoader._upLoader.open(data.url, egret.HttpMethod.POST);
				UpLoader._upLoader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				UpLoader._upLoader.addEventListener(egret.Event.COMPLETE, UpLoader.OnLoadCompleted, this);
				UpLoader._upLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, UpLoader.OnLoadIOError, this);

				UpLoader._upLoader["url"] = data.url;

				let params: any = qin.StringConstants.Empty;
				params += "sign=" + encodeURIComponent(data.sign);
				params += "&pvp=" + encodeURIComponent(data.bytes);
				UpLoader._upLoader.send(params);
			}
			else
			{
				UpLoader.disposeLoader();
			}
		}
	}
	private static disposeLoader()
	{
		if (UpLoader._upLoader)
		{
			UpLoader._upLoader.removeEventListener(egret.Event.COMPLETE, UpLoader.OnLoadCompleted, this);
			UpLoader._upLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, UpLoader.OnLoadIOError, this);
			UpLoader._upLoader = null;
		}
	}
	private static OnLoadCompleted(event: egret.Event)
	{
		UpLoader._isUpLoading = false;
		let loader: egret.HttpRequest = event.currentTarget as egret.HttpRequest;
		let data: UpLoadData;
		for (let i: number = UpLoader._uploadQueue.length - 1; i >= 0; i--)
		{
			data = UpLoader._uploadQueue[i];
			if (data && data.url == loader["url"])
			{
				qin.Console.log("上传成功key：" + data.sign);
				UpLoader._uploadQueue.splice(i, 1);
				qin.FuncUtil.invoke(data.complete, data.thisObj, data);
			}
		}
		UpLoader.UpLoadNext();
	}
	private static OnLoadIOError(event: egret.IOErrorEvent): void
	{
		UpLoader._isUpLoading = false;
		let loader: egret.HttpRequest = event.currentTarget as egret.HttpRequest;
		let data: UpLoadData;
		for (let i: number = UpLoader._uploadQueue.length - 1; i >= 0; i--)
		{
			data = UpLoader._uploadQueue[i];
			if (data && data.url == loader["url"])
			{
				UpLoader._uploadQueue.splice(i, 1);
				qin.FuncUtil.invoke(data.error, data.thisObj, event);
			}
		}
		if (data && data.isReTry)
		{
			UpLoader.reTry(data);
		}
		else
		{
			UpLoader.UpLoadNext();
		}
	}
	private static reTry(data: UpLoadData)
	{
		qin.Console.log("重试key：" + data.sign);
		if (data.reTryCount < UpLoader.ReTryMax)
		{
			data.reTryCount++;
			UpLoader._uploadQueue.unshift(data);
			UpLoader.UpLoadNext();
		}
	}
}

class UpLoadData
{
	/// <summary>
	/// 地址
	/// </summary>
	public url: string;
	/// <summary>
	/// 签名
	/// </summary>
	public sign: string;
	/// <summary>
	/// 重试次数
	/// </summary>
	public reTryCount: number;
	/// <summary>
	/// 是否重试
	/// </summary>
	public isReTry: boolean;

	public complete: Function;

	public error: Function;

	public bytes: string;
	public thisObj: any;

	constructor(url: string, sign: string, bytes: string, isReTry: boolean, complete: Function = null, error: Function = null, thisObj?: any)
	{
		this.url = url;
		this.sign = sign;
		this.reTryCount = 0;
		this.isReTry = isReTry;
		this.complete = complete;
		this.error = error;
		this.bytes = bytes;
		this.thisObj = thisObj;
	}
	public dispose()
	{
		this.thisObj = null;
	}
}

