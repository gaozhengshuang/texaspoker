/**
 * 弹窗管理器
 */
class AlertManager
{
	/**
	 * 显示提示框（单按钮）
	 */
	public static showAlert(msg: string, onConfirm?: Function, onCancel?: Function, onConfirmParam?: any, title?: string, subTitle?: string, confirmLabel?: string, cancelLabel?: string, onCancelParam?: any)
	{
		let alertInfo: AlertInfo = qin.PoolUtil.GetObject<AlertInfo>(AlertInfo);
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
	}
	public static showAlert2(msg: string, thisObject:any, onConfirm?: Function, onCancel?: Function, confirmParam?: any, cancelParam?: any)
	{
		let alertInfo: AlertInfo = qin.PoolUtil.GetObject<AlertInfo>(AlertInfo);
		alertInfo.thisObject = thisObject;
		alertInfo.message = msg;
		alertInfo.OnConfirm = onConfirm;
		alertInfo.OnCancel = onCancel;
		alertInfo.confirmParam = confirmParam;
		alertInfo.cancelParam = cancelParam;
		alertInfo.isSingle = true;
		AlertManager.showAlertInfo(alertInfo);
	}
	/**
	 * 显示确认框（双按钮）
	 */
	public static showConfirm(msg: string, onConfirm?: Function, onCancel?: Function, onConfirmParam?: any, title?: string, subTitle?: string, confirmLabel?: string, cancelLabel?: string, onCancelParam?: any)
	{
		let alertInfo: AlertInfo = qin.PoolUtil.GetObject<AlertInfo>(AlertInfo);
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
	}
	public static showConfirm2(msg: string, thisObject:any, onConfirm?: Function, onCancel?: Function, confirmParam?: any, cancelParam?: any)
	{
		let alertInfo: AlertInfo = qin.PoolUtil.GetObject<AlertInfo>(AlertInfo);
		alertInfo.thisObject = thisObject;
		alertInfo.message = msg;
		alertInfo.OnConfirm = onConfirm;
		alertInfo.OnCancel = onCancel;
		alertInfo.confirmParam = confirmParam;
		alertInfo.cancelParam = cancelParam;
		alertInfo.isSingle = false;
		AlertManager.showAlertInfo(alertInfo);
	}
	/**
	 * 显示对话框 基于alertinfo
	 */
	public static showAlertInfo(alertInfo: AlertInfo)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, alertInfo);
	}
	/**
	 * 显示对话框 基于obj
	 */
	public static showAlertObj(obj: any)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, obj);
	}
	/**
	 * 显示提示框
	 */
	public static showAlertByString(msg: string)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, { isSingle: true, message: msg });
	}
	/**
	 * 显示确认框
	 */
	public static showConfirmByString(msg: string)
	{
		UIManager.showPanel(UIModuleName.AlertInfoPanel, { message: msg });
	}
}