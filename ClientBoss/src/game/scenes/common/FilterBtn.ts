module game {
	/**
	 * 筛选按钮
	 */
	export class FilterBtn extends GameComponent {
		infoLabel: eui.Label;
		arrowFlag: eui.Image;
		private _isRotate: boolean = true;
		protected getSkinName() {
			return FilterBtnSkin;
		}
		/**
		 * 设置label显示
		 */
		public set label(value: string) {
			this.infoLabel.text = value;
		}
		/**
		 * 变更箭头状态
		 */
		public changeArrowState() {
			this.arrowFlag.rotation = this._isRotate ? 0 : 180;
			this._isRotate = !this._isRotate;
		}
		public get isHide(): boolean {
			return this._isRotate == true;
		}
	}
}