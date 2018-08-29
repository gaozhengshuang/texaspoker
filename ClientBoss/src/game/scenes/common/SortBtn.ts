module game {
	/**
	 * 排序按钮
	 */
	export class SortBtn extends GameComponent {
		infoLabel: eui.Label;
		arrowUp: eui.Image;
		arrowDown: eui.Image;
		private _state: SortBtnState = SortBtnState.None;
		/**
		 * 选中的资源时的资源名
		 */
		private _selectResName: string;
		/**
		 * 默认时的资源名
		 */
		private _defaultResName: string | egret.Texture;

		constructor(selectResName?: string) {
			super();
			if (selectResName) {
				this._selectResName = selectResName;
			}
			else
			{
				this._selectResName = "uiCarAltas_json.arrowUpRed";
			}
		}
		protected init() {
			this._defaultResName = this.arrowUp.source;
		}
		/**
		 * 每次显示界面需要调用一次
		 */
		public onShow() {
			this._state = SortBtnState.None;
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
		public changeState(state: SortBtnState) {
			this._state = state;
			switch (state) {
				case SortBtnState.None:
					this.arrowUp.source = this.arrowDown.source = this._defaultResName;
					break;
				case SortBtnState.Up:
					this.arrowUp.source = this._selectResName;
					this.arrowDown.source = this._defaultResName;
					break;
				case SortBtnState.Down:
					this.arrowUp.source = this._defaultResName;
					this.arrowDown.source = this._selectResName;
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