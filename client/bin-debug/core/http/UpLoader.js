var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 上传器
 */
var UpLoader = (function () {
    function UpLoader() {
    }
    /**
     * 上传数据
     */
    UpLoader.UpLoad = function (url, sign, bytes, isReTry, complete, error, thisObj) {
        if (complete === void 0) { complete = null; }
        if (error === void 0) { error = null; }
        if (qin.StringUtil.isNullOrEmpty(url)) {
            return;
        }
        UpLoader._uploadQueue.unshift(new UpLoadData(url, sign, bytes, isReTry, complete, error, thisObj));
        UpLoader.UpLoadNext();
    };
    UpLoader.UpLoadNext = function () {
        if (UpLoader._isUpLoading == false) {
            if (UpLoader._uploadQueue.length != 0) {
                UpLoader._isUpLoading = true;
                var data = UpLoader._uploadQueue[0];
                UpLoader._upLoader = new egret.HttpRequest();
                UpLoader._upLoader.responseType = egret.HttpResponseType.TEXT;
                UpLoader._upLoader.open(data.url, egret.HttpMethod.POST);
                UpLoader._upLoader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                UpLoader._upLoader.addEventListener(egret.Event.COMPLETE, UpLoader.OnLoadCompleted, this);
                UpLoader._upLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, UpLoader.OnLoadIOError, this);
                UpLoader._upLoader["url"] = data.url;
                var params = qin.StringConstants.Empty;
                params += "sign=" + encodeURIComponent(data.sign);
                params += "&pvp=" + encodeURIComponent(data.bytes);
                UpLoader._upLoader.send(params);
            }
            else {
                UpLoader.disposeLoader();
            }
        }
    };
    UpLoader.disposeLoader = function () {
        if (UpLoader._upLoader) {
            UpLoader._upLoader.removeEventListener(egret.Event.COMPLETE, UpLoader.OnLoadCompleted, this);
            UpLoader._upLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, UpLoader.OnLoadIOError, this);
            UpLoader._upLoader = null;
        }
    };
    UpLoader.OnLoadCompleted = function (event) {
        UpLoader._isUpLoading = false;
        var loader = event.currentTarget;
        var data;
        for (var i = UpLoader._uploadQueue.length - 1; i >= 0; i--) {
            data = UpLoader._uploadQueue[i];
            if (data && data.url == loader["url"]) {
                qin.Console.log("上传成功key：" + data.sign);
                UpLoader._uploadQueue.splice(i, 1);
                qin.FuncUtil.invoke(data.complete, data.thisObj, data);
            }
        }
        UpLoader.UpLoadNext();
    };
    UpLoader.OnLoadIOError = function (event) {
        UpLoader._isUpLoading = false;
        var loader = event.currentTarget;
        var data;
        for (var i = UpLoader._uploadQueue.length - 1; i >= 0; i--) {
            data = UpLoader._uploadQueue[i];
            if (data && data.url == loader["url"]) {
                UpLoader._uploadQueue.splice(i, 1);
                qin.FuncUtil.invoke(data.error, data.thisObj, event);
            }
        }
        if (data && data.isReTry) {
            UpLoader.reTry(data);
        }
        else {
            UpLoader.UpLoadNext();
        }
    };
    UpLoader.reTry = function (data) {
        qin.Console.log("重试key：" + data.sign);
        if (data.reTryCount < UpLoader.ReTryMax) {
            data.reTryCount++;
            UpLoader._uploadQueue.unshift(data);
            UpLoader.UpLoadNext();
        }
    };
    UpLoader.ReTryMax = 2; //最大重试次数
    //
    UpLoader._uploadQueue = new Array();
    UpLoader._isUpLoading = false;
    return UpLoader;
}());
__reflect(UpLoader.prototype, "UpLoader");
var UpLoadData = (function () {
    function UpLoadData(url, sign, bytes, isReTry, complete, error, thisObj) {
        if (complete === void 0) { complete = null; }
        if (error === void 0) { error = null; }
        this.url = url;
        this.sign = sign;
        this.reTryCount = 0;
        this.isReTry = isReTry;
        this.complete = complete;
        this.error = error;
        this.bytes = bytes;
        this.thisObj = thisObj;
    }
    UpLoadData.prototype.dispose = function () {
        this.thisObj = null;
    };
    return UpLoadData;
}());
__reflect(UpLoadData.prototype, "UpLoadData");
//# sourceMappingURL=UpLoader.js.map