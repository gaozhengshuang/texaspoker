/**
 * 网络请求处理
 */
class URLLoader 
{
	private static readonly _waitList: Array<URLLoadInfo> = new Array<URLLoadInfo>();//等待加载列表
	private static _httpRequest: egret.HttpRequest;
	public static isLoading: boolean = false;
	private static _loadTimes: number = 0;

	public static cancelLoad(onComplete: Function, thisObject: any)
	{
		for (let i: number = URLLoader._waitList.length - 1; i >= 0; i--)
		{
			let loadInfo: URLLoadInfo = URLLoader._waitList[i];
			if (loadInfo.onComplete == onComplete && loadInfo.thisObject == thisObject)
			{
				loadInfo.dispose();
				URLLoader._waitList.splice(i, 1);
			}
		}
		if (URLLoader._waitList.length == 0)
		{
			URLLoader.isLoading = false;
			URLLoader.disposeLoader();
		}
	}
	public static CancelAll()
	{
		URLLoader.isLoading = false;
		for (let info of URLLoader._waitList)
		{
			info.dispose();
		}
		URLLoader._waitList.length = 0;
		URLLoader.disposeLoader();
	}
	public static disposeLoader()
	{
		if (URLLoader._httpRequest)
		{
			URLLoader._httpRequest.abort();
			URLLoader._httpRequest.removeEventListener(egret.Event.COMPLETE, URLLoader.OnLoadCompleted, this);
			URLLoader._httpRequest.removeEventListener(egret.IOErrorEvent.IO_ERROR, URLLoader.OnLoadIOError, this);
			URLLoader._httpRequest = null;
		}
	}
	/**
	 * 加载内容
	 */
	public static downloadContent(url: string, thisObject: any, onComplete: Function = null, onError: Function = null, data?: any, retryTimes: number = 0, format: string = egret.HttpResponseType.TEXT)
	{
		if (onComplete && thisObject == null)
		{
			throw new Error('onComplete不为空时，thisObject不能为空');
		}
		let loadInfo: URLLoadInfo = new URLLoadInfo();
		loadInfo.url = url;
		loadInfo.data = data;
		loadInfo.thisObject = thisObject;
		loadInfo.onComplete = onComplete;
		loadInfo.onError = onError;
		loadInfo.retryTimes = retryTimes;
		loadInfo.dataFormat = format;
		URLLoader._waitList.push(loadInfo);
		//开始加载
		URLLoader.LoadNext();
	}
	private static LoadNext()
	{
		if (URLLoader.isLoading == false)
		{
			URLLoader.disposeLoader();
			if (URLLoader._waitList.length > 0)
			{
				URLLoader._loadTimes = 0;
				URLLoader.isLoading = true;
				let loadInfo: URLLoadInfo = URLLoader._waitList[0];
				URLLoader._httpRequest = new egret.HttpRequest();
				URLLoader._httpRequest.responseType = loadInfo.dataFormat;
				URLLoader._httpRequest.addEventListener(egret.Event.COMPLETE, URLLoader.OnLoadCompleted, this);
				URLLoader._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, URLLoader.OnLoadIOError, this);
				URLLoader._httpRequest["url"] = loadInfo.url;
				this.trySend(loadInfo);
			}
		}
	}
	private static OnLoadCompleted(event: egret.Event)
	{
		let loader: egret.HttpRequest = event.currentTarget as egret.HttpRequest;
		let data: any = loader.response;
		let loadInfo: URLLoadInfo;
		for (let i: number = URLLoader._waitList.length - 1; i >= 0; i--)
		{
			loadInfo = URLLoader._waitList[i];
			if (loadInfo && loadInfo.url == loader["url"])
			{
				URLLoader._waitList.splice(i, 1);
				game.FuncUtil.invoke(loadInfo.onComplete, loadInfo.thisObject, data);
				loadInfo.dispose();
			}
		}
		URLLoader.isLoading = false;
		URLLoader.LoadNext();
	}
	private static OnLoadIOError(event: egret.IOErrorEvent): void
	{
		let loader: egret.HttpRequest = event.currentTarget as egret.HttpRequest;
		let loadInfo: URLLoadInfo;
		for (let i: number = URLLoader._waitList.length - 1; i >= 0; i--)
		{
			loadInfo = URLLoader._waitList[i];
			if (loadInfo && loadInfo.url == loader["url"])
			{
				if (loadInfo.retryTimes > 0)
				{
					loadInfo.retryTimes--;
					this.trySend(loadInfo);
					return;
				}
				else
				{
					game.FuncUtil.invoke(loadInfo.onError, loadInfo.thisObject, event);
					URLLoader._waitList.splice(i, 1);
				}
				loadInfo.dispose();
			}
		}
		URLLoader.isLoading = false;
		URLLoader.LoadNext();
	}
	private static trySend(loadInfo: URLLoadInfo)
	{
		URLLoader._httpRequest.open(loadInfo.url, egret.HttpMethod.POST);
		URLLoader._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if (loadInfo.data)
		{
			URLLoader._httpRequest.send(loadInfo.data);
		}
		else
		{
			URLLoader._httpRequest.send();
		}
	}
}
/**
 * 网络请求信息
 */
class URLLoadInfo
{
	public data: any;
	public onComplete: Function;
	public onError: Function;
	public onProgress: Function;
	public url: string;
	public thisObject: any;
	public retryTimes: number = 0;
	public dataFormat: string;
	public dispose()
	{
		this.onComplete = null;
		this.onError = null;
		this.onProgress = null;
		this.thisObject = null;
	}
}
