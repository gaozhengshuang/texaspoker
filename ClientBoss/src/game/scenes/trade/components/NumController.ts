module game {
	/**
	 * 数字控制组件 支持长按增加减少
	 */
	export class NumController extends BaseUIComponent<number> {
		public addBtn: eui.Image;
		public reduceBtn: eui.Image;
		public numTxt: eui.TextInput;
		private _taxRateNum: number;
		private _nowNum: number;
		public get nowNum(): number {
			return this._nowNum;
		}

		private _lastClickTarget: eui.Image;
		private _isDown: boolean;
		private _lastDownTime: number;

		private stepTime = 300;
		private _timeId: number;

		private _onChange: CallBackHandler;

		public constructor() {
			super();
		}
		public setCallBack(callBack: CallBackHandler) {
			this._onChange = callBack;
		}
		protected getSkinName() {
			return NumControllerSkin;
		}
		public show(orignNum: number) {
			super.show(orignNum);
			this._nowNum = orignNum;
			this.numTxt.text = numAddSpace(orignNum);
			this._taxRateNum = orignNum * gameConfig.tradeTaxRate;

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);

			this._timeId = egret.setInterval(this.onUpdate, this, this.stepTime);
		}
		protected beforeRemove() {
			this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);
			this.reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);

			this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);
			this.reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);

			this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);
			this.reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);

			this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);
			this.reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);

			egret.clearInterval(this._timeId);
		}
		private onOperateClickStart(event: egret.TouchEvent) {
			this._lastClickTarget = event.currentTarget;
			this._isDown = true;
			this._lastDownTime = 0;

			this.onUpdate();
		}
		private onOperateClickEnd(event: egret.TouchEvent) {
			if (event.currentTarget == this._lastClickTarget) {
				this._lastClickTarget = null;
				this._isDown = false;
			}
		}
		private onUpdate() {
			if (this._isDown) {
				if (Date.now() - this._lastDownTime > this.stepTime) {
					this._lastDownTime = Date.now();

					if (this._lastClickTarget == this.addBtn) {
						this._nowNum += this._taxRateNum;
						this.numTxt.text = numAddSpace(this._nowNum);
						runCallBackHandler(this._onChange);
					}
					else if (this._lastClickTarget == this.reduceBtn) {
						this._nowNum -= this._taxRateNum;
						if (this._nowNum < 0) {
							this._nowNum = 0;
						}
						this.numTxt.text = numAddSpace(this._nowNum);
						runCallBackHandler(this._onChange);
					}
				}
			}
		}
	}
}