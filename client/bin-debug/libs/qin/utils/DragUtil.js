var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var qin;
(function (qin) {
    /**
     * 拖拽工具类
     */
    var DragUtil = (function () {
        function DragUtil() {
        }
        Object.defineProperty(DragUtil, "isDragEnable", {
            /**
             * 是否启用拖拽
             */
            set: function (value) {
                DragUtil._isDragEnable = value;
            },
            enumerable: true,
            configurable: true
        });
        DragUtil.startDrag = function (target, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (DragUtil._isDragEnable) {
                if (!DragUtil.dragContainer) {
                    DragUtil.dragContainer = new eui.Group();
                }
                if (!DragUtil.dragContainer.parent) {
                    GameManager.stage.addChild(DragUtil.dragContainer);
                }
                else {
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
        };
        DragUtil.onTouchEnd = function (e) {
            DragUtil.stop();
        };
        DragUtil.onTouchMove = function (e) {
            if (DragUtil.dragContainer) {
                DragUtil.dragContainer.visible = true;
                DragUtil.dragTarget.x = e.stageX - DragUtil.dragTarget.measuredWidth / 2 - DragUtil.dragTarget.anchorOffsetX * DragUtil.dragTarget.measuredWidth + DragUtil._offsetX;
                DragUtil.dragTarget.y = e.stageY - DragUtil.dragTarget.measuredHeight / 2 - DragUtil.dragTarget.anchorOffsetY * DragUtil.dragTarget.measuredHeight + DragUtil._offsetY;
                DragUtil._isMove = true;
                // let v: number = DragUtil.dragContainer.anchorOffsetX * DragUtil.dragContainer.measuredWidth;
            }
            else {
                DragUtil.stop();
            }
        };
        DragUtil.stop = function () {
            if (DragUtil._isMove) {
                DragUtil.dragEndEvent.dispatch(DragUtil.dragContainer.getChildAt(0));
            }
            DragUtil.dragContainer.removeChildren();
            if (DragUtil.dragContainer.parent) {
                DragUtil.dragContainer.parent.removeChild(DragUtil.dragContainer);
            }
            GameManager.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, DragUtil.onTouchMove, this);
            GameManager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, DragUtil.onTouchEnd, this);
        };
        DragUtil._isDragEnable = true;
        DragUtil._isMove = false;
        /**
         * 结束事件
         */
        DragUtil.dragEndEvent = new qin.DelegateDispatcher();
        return DragUtil;
    }());
    qin.DragUtil = DragUtil;
    __reflect(DragUtil.prototype, "qin.DragUtil");
})(qin || (qin = {}));
//# sourceMappingURL=DragUtil.js.map