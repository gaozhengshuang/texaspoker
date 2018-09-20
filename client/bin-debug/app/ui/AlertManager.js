var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 弹窗管理器
 */
var AlertManager = (function () {
    function AlertManager() {
    }
    /**
     * 显示提示框（单按钮）
     */
    AlertManager.showAlert = function (msg, onConfirm, onCancel, onConfirmParam, title, subTitle, confirmLabel, cancelLabel, onCancelParam) {
        var alertInfo = qin.PoolUtil.GetObject(AlertInfo);
        alertInfo.title = title;
        alertInfo.subTitle = subTitle;
        alertInfo.message = msg;
        alertInfo.OnConfirm = onConfirm;
        alertInfo.OnCancel = onCancel;
        alertInfo.confirmParam = onConfirmParam;
        alertInfo.cancelParam = onCancelParam;
        alertInfo.confirmLabel = confirmLabel;
        alertInfo.cancelLabel = cancelLabel;
        alertInfo.isSingle = true;
        AlertManager.showAlertInfo(alertInfo);
    };
    AlertManager.showAlert2 = function (msg, thisObject, onConfirm, onCancel, confirmParam, cancelParam) {
        var alertInfo = qin.PoolUtil.GetObject(AlertInfo);
        alertInfo.thisObject = thisObject;
        alertInfo.message = msg;
        alertInfo.OnConfirm = onConfirm;
        alertInfo.OnCancel = onCancel;
        alertInfo.confirmParam = confirmParam;
        alertInfo.cancelParam = cancelParam;
        alertInfo.isSingle = true;
        AlertManager.showAlertInfo(alertInfo);
    };
    /**
     * 显示确认框（双按钮）
     */
    AlertManager.showConfirm = function (msg, onConfirm, onCancel, onConfirmParam, title, subTitle, confirmLabel, cancelLabel, onCancelParam) {
        var alertInfo = qin.PoolUtil.GetObject(AlertInfo);
        alertInfo.title = title;
        alertInfo.subTitle = subTitle;
        alertInfo.message = msg;
        alertInfo.OnConfirm = onConfirm;
        alertInfo.OnCancel = onCancel;
        alertInfo.confirmParam = onConfirmParam;
        alertInfo.cancelParam = onCancelParam;
        alertInfo.confirmLabel = confirmLabel;
        alertInfo.cancelLabel = cancelLabel;
        alertInfo.isSingle = false;
        AlertManager.showAlertInfo(alertInfo);
    };
    AlertManager.showConfirm2 = function (msg, thisObject, onConfirm, onCancel, confirmParam, cancelParam) {
        var alertInfo = qin.PoolUtil.GetObject(AlertInfo);
        alertInfo.thisObject = thisObject;
        alertInfo.message = msg;
        alertInfo.OnConfirm = onConfirm;
        alertInfo.OnCancel = onCancel;
        alertInfo.confirmParam = confirmParam;
        alertInfo.cancelParam = cancelParam;
        alertInfo.isSingle = false;
        AlertManager.showAlertInfo(alertInfo);
    };
    /**
     * 显示对话框 基于alertinfo
     */
    AlertManager.showAlertInfo = function (alertInfo) {
        UIManager.showPanel(UIModuleName.AlertInfoPanel, alertInfo);
    };
    /**
     * 显示对话框 基于obj
     */
    AlertManager.showAlertObj = function (obj) {
        UIManager.showPanel(UIModuleName.AlertInfoPanel, obj);
    };
    /**
     * 显示提示框
     */
    AlertManager.showAlertByString = function (msg) {
        UIManager.showPanel(UIModuleName.AlertInfoPanel, { isSingle: true, message: msg });
    };
    /**
     * 显示确认框
     */
    AlertManager.showConfirmByString = function (msg) {
        UIManager.showPanel(UIModuleName.AlertInfoPanel, { message: msg });
    };
    return AlertManager;
}());
__reflect(AlertManager.prototype, "AlertManager");
//# sourceMappingURL=AlertManager.js.map