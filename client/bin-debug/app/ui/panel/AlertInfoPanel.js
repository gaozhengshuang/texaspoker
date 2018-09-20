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
 * 提示框面板
 */
var AlertInfoPanel = (function (_super) {
    __extends(AlertInfoPanel, _super);
    function AlertInfoPanel() {
        var _this = _super.call(this) || this;
        _this.layer = UILayerType.Tips;
        _this.setSkinName(UIModuleName.AlertInfoPanel);
        return _this;
    }
    AlertInfoPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    AlertInfoPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.infoTxt.text = qin.StringConstants.Empty;
        this.subTxt.text = qin.StringConstants.Empty;
        this.confirmBtn.label = "确定";
        this.cancelBtn.label = "取消";
        if (appendData) {
            if (appendData.subTitle) {
                this.subTxt.text = appendData.subTitle;
            }
            if (appendData.message) {
                this.infoTxt.textFlow = qin.TextUtil.parse(appendData.message);
            }
            if (appendData.confirmLabel) {
                this.confirmBtn.label = appendData.confirmLabel;
            }
            if (appendData.cancelLabel) {
                this.cancelBtn.label = appendData.cancelLabel;
            }
            if (appendData.alignment) {
                this.infoTxt.textAlign = appendData.alignment;
            }
            if (appendData.isSingle) {
                if (this.cancelBtn.parent) {
                    this.cancelBtn.parent.removeChild(this.cancelBtn);
                }
            }
            else {
                this.group.addChildAt(this.cancelBtn, 0);
            }
        }
    };
    AlertInfoPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    AlertInfoPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
    };
    AlertInfoPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmClick, this);
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelClick, this);
        if (this.panelData instanceof AlertInfo) {
            qin.PoolUtil.PutObject(this.panelData);
        }
    };
    AlertInfoPanel.prototype.onConfirmClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData && this.panelData.OnConfirm) {
            qin.FuncUtil.invoke(this.panelData.OnConfirm, this.panelData.thisObject, this.panelData.confirmParam);
        }
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    AlertInfoPanel.prototype.onCancelClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData && this.panelData.OnCancel) {
            qin.FuncUtil.invoke(this.panelData.OnCancel, this.panelData.thisObject, this.panelData.cancelParam);
        }
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    return AlertInfoPanel;
}(BasePanel));
__reflect(AlertInfoPanel.prototype, "AlertInfoPanel");
var AlertInfo = (function () {
    function AlertInfo() {
        /// <summary>
        /// 标题
        /// </summary>
        this.title = qin.StringConstants.Empty;
        /// <summary>
        /// 副标题
        /// </summary>
        this.subTitle = qin.StringConstants.Empty;
        /// <summary>
        /// 消息
        /// </summary>
        this.message = qin.StringConstants.Empty;
        /// <summary>
        /// 确定按钮文本
        /// </summary>
        this.confirmLabel = qin.StringConstants.Empty;
        /// <summary>
        /// 取消按钮文本
        /// </summary>
        this.cancelLabel = qin.StringConstants.Empty;
        /// <summary>
        /// 确定回调
        /// </summary>
        this.OnConfirm = null;
        /// <summary>
        /// 取消回调
        /// </summary>
        this.OnCancel = null;
        /// <summary>
        /// 确定回调参数
        /// </summary>
        this.confirmParam = null;
        /// <summary>
        /// 取消回调参数
        /// </summary>
        this.cancelParam = null;
        /// <summary>
        /// 拓展数据
        /// </summary>
        this.extraData = null;
        /// <summary>
        /// 文本对齐
        /// </summary>
        this.alignment = egret.HorizontalAlign.CENTER;
        /**
         * 是否是单按钮
         */
        this.isSingle = true;
    }
    AlertInfo.prototype.reset = function () {
        this.thisObject = null;
        this.title = qin.StringConstants.Empty;
        this.subTitle = qin.StringConstants.Empty;
        this.message = qin.StringConstants.Empty;
        this.confirmLabel = qin.StringConstants.Empty;
        this.cancelLabel = qin.StringConstants.Empty;
        this.OnConfirm = null;
        this.OnCancel = null;
        this.confirmParam = null;
        this.cancelParam = null;
        this.extraData = null;
        this.alignment = egret.HorizontalAlign.CENTER;
        this.isSingle = true;
    };
    return AlertInfo;
}());
__reflect(AlertInfo.prototype, "AlertInfo", ["qin.IPoolObject", "Object"]);
//# sourceMappingURL=AlertInfoPanel.js.map