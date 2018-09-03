module game {
	/**
	 * 排序按钮
	 */
	export class SortBtn extends BaseUIComponent<any> {
		infoLabel: eui.Label;
		arrowUp: eui.Image;
		arrowDown: eui.Image;
		arrowUpRed: eui.Image;
		arrowDownRed: eui.Image;
		private _state: SortBtnState = SortBtnState.Down;
		public get state(): SortBtnState {
			return this._state;
		}

		constructor() {
			super();
		}
		/**
		 * 每次显示界面需要调用一次
		 */
		public onShow() {
			this._state = SortBtnState.Down;
			this.changeState(this._state);
		}
		protected getSkinName() {
			return SortBtnSkin;
		}
		/**
		 * 设置label显示
		 */
		public set label(value: string) {
			this.infoLabel.text = value;
		}
		/**
		 * 变更状态
		 */
		public changeState(state?: SortBtnState) {
			if (state != undefined) {
				this._state = state;
			}
			else {
				if (this._state > 0) {
					if (this._state == SortBtnState.Up) {
						this._state = SortBtnState.Down;
					}
					else {
						this._state = SortBtnState.Up;
					}
				}
				else {
					this._state = SortBtnState.Up;
				}
			}
			this.arrowUp.visible = this.arrowUpRed.visible = this.arrowDown.visible = this.arrowDownRed.visible = false;
			switch (this._state) {
				case SortBtnState.None:
					this.arrowUp.visible = this.arrowDown.visible = true;
					break;
				case SortBtnState.Up:
					this.arrowUpRed.visible = this.arrowDown.visible = true;
					break;
				case SortBtnState.Down:
					this.arrowDownRed.visible = this.arrowUp.visible = true;
					break;
			}
		}
	}
	/**
	 * 排序按钮状态
	 */
	export enum SortBtnState {
		/**
		 * 默认
		 */
		None = 0,
		/**
		 * 升序
		 */
		Up = 1,
		/**
		 * 降序
		 */
		Down = 2,
	}
}