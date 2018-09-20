module qin
{
	/**
	 * 拖拽工具类
	 */
	export class DragUtil
	{
		/**
		 * 拖动的容器
		 */
		public static dragContainer: eui.Group;
		private static _isDragEnable: boolean = true;
		private static _isMove: boolean = false;
		/**
		 * 结束事件
		 */
		public static dragEndEvent: DelegateDispatcher = new DelegateDispatcher();
		/**
		 * 是否启用拖拽
		 */
		public static set isDragEnable(value: boolean)
		{
			DragUtil._isDragEnable = value;
		}
		public static dragTarget: egret.DisplayObject;
		private static _offsetX: number;
		private static _offsetY: number;
		public static startDrag(target: egret.DisplayObject, offsetX: number = 0, offsetY: number = 0)
		{
			if (DragUtil._isDragEnable)
			{
				if (!DragUtil.dragContainer)
				{
					DragUtil.dragContainer = new eui.Group();
				}
				if (!DragUtil.dragContainer.parent)
				{
					GameManager.stage.addChild(DragUtil.dragContainer);
				}
				else
				{
					GameManager.stage.addChild(DragUtil.dragContainer); //添加到舞台最上显示
				}
				DragUtil.dragTarget = target;
				DragUtil._offsetX = offsetX;
				DragUtil._offsetY = offsetY;

				DragUtil.dragContainer.removeChildren();
				DragUtil.dragContainer.addChild(target);

				DragUtil.dragContainer.visible = false;
				DragUtil._isMove = false;
				GameManager.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, DragUtil.onTouchMove, this);
				GameManager.stage.addEventListener(egret.TouchEvent.TOUCH_END, DragUtil.onTouchEnd, this);
			}
		}
		private static onTouchEnd(e: egret.TouchEvent)
		{
			DragUtil.stop();
		}
		private static onTouchMove(e: egret.TouchEvent)
		{
			if (DragUtil.dragContainer)
			{
				DragUtil.dragContainer.visible = true;
				DragUtil.dragTarget.x = e.stageX - DragUtil.dragTarget.measuredWidth / 2 - DragUtil.dragTarget.anchorOffsetX * DragUtil.dragTarget.measuredWidth + DragUtil._offsetX;
				DragUtil.dragTarget.y = e.stageY - DragUtil.dragTarget.measuredHeight / 2 - DragUtil.dragTarget.anchorOffsetY * DragUtil.dragTarget.measuredHeight + DragUtil._offsetY;
				DragUtil._isMove = true;
				// let v: number = DragUtil.dragContainer.anchorOffsetX * DragUtil.dragContainer.measuredWidth;
			}
			else
			{
				DragUtil.stop();
			}
		}
		public static stop()
		{
			if (DragUtil._isMove) //移动了才抛送事件
			{
				DragUtil.dragEndEvent.dispatch(DragUtil.dragContainer.getChildAt(0));
			}
			DragUtil.dragContainer.removeChildren();
			if (DragUtil.dragContainer.parent)
			{
				DragUtil.dragContainer.parent.removeChild(DragUtil.dragContainer);
			}
			GameManager.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, DragUtil.onTouchMove, this);
			GameManager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, DragUtil.onTouchEnd, this);
		}
	}
}