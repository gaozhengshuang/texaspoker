var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 公告页面
 */
var ImgNotifyPanel = (function (_super) {
    __extends(ImgNotifyPanel, _super);
    function ImgNotifyPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.ImgNotifyPanel);
        return _this;
    }
    ImgNotifyPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        UIManager.pushResizeGroup(this);
        this.isMaskClickClose = true;
        this.maskAlpha = 0.3;
    };
    ImgNotifyPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this._currentImgUrl = appendData.shift();
        this.loadImg(this._currentImgUrl);
    };
    ImgNotifyPanel.prototype.loadImg = function (url) {
        RES.getResByUrl(url, this.onLoadComp, this, RES.ResourceItem.TYPE_IMAGE);
    };
    ImgNotifyPanel.prototype.onLoadComp = function (data, url) {
        // this.noticeImg.bitmapData = data;
    };
    ImgNotifyPanel.prototype.onCloseBtnClickHandler = function (event) {
        if (this._currentImgUrl) {
            RES.destroyRes(this._currentImgUrl);
        }
        if (this.panelData && this.panelData.length > 0) {
            this.init(this.panelData);
        }
        else {
            // RES.destroyRes(this.noticeImg.bitmapData.source);
            _super.prototype.onCloseBtnClickHandler.call(this, event);
        }
    };
    return ImgNotifyPanel;
}(BasePanel));
__reflect(ImgNotifyPanel.prototype, "ImgNotifyPanel");
//# sourceMappingURL=ImgNotifyPanel.js.map