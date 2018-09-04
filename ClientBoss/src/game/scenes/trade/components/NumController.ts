module game {
	/**
	 * 数字控制组件 支持长按增加减少
	 */
	export class NumController extends BaseUIComponent<number> {
		public addBtn: eui.Image;
		public reduceBtn: eui.Image;
		public numTxt: eui.EditableText;
		private _taxRateNum: number;
		private _nowNum: number;

		private _minNum: number;
		private _maxNum: number;

		public get nowNum(): number {
			this.setNowNum();
			return this._nowNum;
		}

		private _lastClickTarget: eui.Image;
		private _isDown: boolean;
		private _lastDownTime: number;

		private stepTime = 100;
		private _timeId: number;

		private _onChange: CallBackHandler;
		// private _isFocusIn: boolean = false;

		public constructor() {
			super();
		}
		public setCallBack(callBack: CallBackHandler) {
			this._onChange = callBack;
		}
		protected getSkinName() {
			return NumControllerSkin;
		}
		public show(orignNum: number, step: number = 0, minNum: number = 0, maxNum: number = 0) {
			super.show(orignNum);

			this._minNum = 0;
			this._maxNum = 0;
			if (minNum > 0) {
				this._minNum = minNum;
			}
			if (maxNum > 0) {
				this._maxNum = maxNum;
			}

			this.numTxt.restrict = '0-9';
			this.numTxt.maxChars = 9;
			this._nowNum = orignNum;
			this.numTxt.text = orignNum.toString();
			if (step > 0) {
				this._taxRateNum = step;
			}
			else {
				this._taxRateNum = Math.floor(orignNum * gameConfig.tradeTaxRate);
			}

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onOperateClickStart, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onOperateClickEnd, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onOperateClickEnd, this);

			this.addBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);
			this.reduceBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onOperateClickEnd, this);

			this.numTxt.addEventListener(egret.TextEvent.FOCUS_IN, this.onFoucusIn, this);
			this.numTxt.addEventListener(egret.TextEvent.FOCUS_OUT, this.onFoucusOut, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
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

			this.numTxt.removeEventListener(egret.TextEvent.FOCUS_IN, this.onFoucusIn, this);
			this.numTxt.removeEventListener(egret.TextEvent.FOCUS_OUT, this.onFoucusOut, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onUpdate, this);
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
		private _lastText: string;
		private onUpdate() {
			if (this._isDown) {
				// if (this._isFocusIn) {
				// 	this.setNowNum();
				// }
				// else {
				// 	this.numTxt.text = this._nowNum.toString();
				// }
				if (Date.now() - this._lastDownTime > this.stepTime) {
					this._lastDownTime = Date.now();

					if (this._lastClickTarget == this.addBtn) {
						this._nowNum += this._taxRateNum;
						if (this._maxNum > 0 && this._nowNum > this._maxNum) {
							this._nowNum = this._maxNum;
						}
						this.numTxt.text = this._nowNum.toString();
					}
					else if (this._lastClickTarget == this.reduceBtn) {
						this._nowNum -= this._taxRateNum;
						if (this._nowNum < this._minNum) {
							this._nowNum = this._minNum;
						}
						this.numTxt.text = this._nowNum.toString();
					}
				}
				if (this._lastText != this.numTxt.text) {
					this._lastText = this.numTxt.text;
					runCallBackHandler(this._onChange);
				}
			}
		}
		private onFoucusIn() {
			this._isDown = true;
		}
		private onFoucusOut() {
			this._isDown = false;
		}
		private setNowNum() {
			let text = this.numTxt.text;
			let num = parseInt(text);
			this._nowNum = num;
		}
	}
}