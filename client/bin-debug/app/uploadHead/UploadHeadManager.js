var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 头像上传管理
 */
var UploadHeadManager = (function () {
    function UploadHeadManager() {
    }
    UploadHeadManager.initialize = function () {
        ChannelManager.OnImageSelect.addListener(UploadHeadManager.onSelectHead, this);
        UserManager.onWxHeadLoadCompleteEvent.addListener(UploadHeadManager.onWxHeadLoadCompleteHandler, this);
    };
    UploadHeadManager.clearAllData = function () {
        UploadHeadManager._cacheNameList.length = 0;
        UploadHeadManager._addNameList.length = 0;
    };
    /**
     * 开始上传
     */
    UploadHeadManager.startLoad = function (sign, path, headData) {
        var headPath = ProjectDefined.GetInstance().getHeadUpLoadUrl();
        if (qin.StringUtil.isNullOrEmpty(headPath) == false && qin.StringUtil.isNullOrEmpty(headData) == false) {
            UpLoader.UpLoad(headPath, sign, headData, true, UploadHeadManager.upLoadComplete, UploadHeadManager.uploadError, this);
            UploadHeadManager._headPath = path;
        }
    };
    UploadHeadManager.upLoadComplete = function (data) {
        if (UploadHeadManager._isWxLoadBackStage == false) {
            AlertManager.showAlert("头像上传完成，请等待审核");
        }
        UserManager.userInfo.head = UserManager.userInfo.head + GameSetting.HeadUploadVerifySign + UploadHeadManager._headPath;
        UploadHeadManager.OnUploadHeadUpdate.dispatch();
    };
    UploadHeadManager.uploadError = function (event) {
        if (UploadHeadManager._isWxLoadBackStage == false) {
            AlertManager.showAlert("头像上传失败，请稍后重试！");
        }
    };
    UploadHeadManager.onSelectHead = function (content) {
        var data = content.data;
        if (!qin.StringUtil.isNullOrEmpty(data)) {
            switch (content.type) {
                case HeadUploadSystemType.web:
                    data = UploadHeadManager.removeAppendData(data);
                    UploadHeadManager._isWxLoadBackStage = false;
                    UploadHeadManager.tryUpload(data);
                    break;
                case HeadUploadSystemType.native:
                    if (content.data == "NoPhoto") {
                        UIManager.showFloatTips("没有使用相册的权限");
                        return;
                    }
                    UploadHeadManager._isWxLoadBackStage = false;
                    UploadHeadManager.tryUpload(data);
                    break;
            }
        }
    };
    UploadHeadManager.onWxHeadLoadCompleteHandler = function (data) {
        UploadHeadManager._isWxLoadBackStage = true;
        data = UploadHeadManager.removeAppendData(data);
        UploadHeadManager.tryUpload(data);
    };
    UploadHeadManager.removeAppendData = function (data) {
        if (data.indexOf(qin.StringConstants.Comma) != -1) {
            var index = data.indexOf(qin.StringConstants.Comma);
            var len = data.length - index;
            data = data.substr(index + 1, len - 1);
        }
        return data;
    };
    UploadHeadManager.tryUpload = function (data) {
        try {
            var bd = egret.BitmapData.create('base64', data);
            UploadHeadManager.OnSelectHeadUpdate.dispatch(bd);
            var uploadFunc = function (imgData) {
                if (qin.StringUtil.isNullOrEmpty(imgData)) {
                    UIManager.showFloatTips("请先选择图片");
                    return;
                }
                var callBackServer = function (obj) {
                    if (obj.data && obj.data["sign"] != null && obj.data["path"] != null) {
                        var path = obj.data["path"];
                        path = GameSetting.replaceHeadSign(path);
                        UploadHeadManager.startLoad(obj.data["sign"], path, imgData);
                    }
                };
                SocketManager.callAsync(Command.Role_UploadHead_3683, { "FileExt": UploadHeadManager.FileExt }, callBackServer, null, this);
            };
            uploadFunc(data);
        }
        catch (e) {
            UIManager.showFloatTips("选择图片失败,请尝试其他图片");
        }
    };
    UploadHeadManager.getEncodeBytes = function (byteStr) {
        return qin.CodeUtil.base64ToArrayBuffer(byteStr);
    };
    UploadHeadManager.clear = function () {
    };
    UploadHeadManager.selectHead = function () {
        ChannelManager.imageSelect(UploadHeadManager.Size, UploadHeadManager.JpgQuality);
    };
    /**
    * 是否为默认头像
    */
    UploadHeadManager.isDefaultHead = function (head) {
        if (head == SheetSubName.Default_Head_Secret || head == SheetSubName.Default_Head_Male || head == SheetSubName.Default_Head_Female || head == SheetSubName.HundredWarSysBanker_Head) {
            return true;
        }
        return false;
    };
    UploadHeadManager.FileExt = "jpg"; //图片格式(目前只有jpg)
    UploadHeadManager.JpgQuality = 75;
    UploadHeadManager.Size = 128;
    UploadHeadManager.MaxCache = 300;
    UploadHeadManager._cacheNameList = new Array();
    UploadHeadManager._addNameList = new Array();
    UploadHeadManager._isWxLoadBackStage = false; //微信后台上传不提示
    /**
     * 选择头像完成
     */
    UploadHeadManager.OnSelectHeadUpdate = new qin.DelegateDispatcher(); //Texture2D tex
    /**
     * 上传头像完成
     */
    UploadHeadManager.OnUploadHeadUpdate = new qin.DelegateDispatcher();
    return UploadHeadManager;
}());
__reflect(UploadHeadManager.prototype, "UploadHeadManager");
//# sourceMappingURL=UploadHeadManager.js.map