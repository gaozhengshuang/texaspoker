module game {
	/**
	 * 基类渲染项
	 */
	export abstract class BaseItemRenderer<T> extends eui.ItemRenderer {
		public constructor() {
			super();
			let skinName = this.getSkinName();
			if (skinName) {
				this.skinName = skinName;
			}
		}
		protected getSkinName() {

		}

		protected dataChanged() {
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.beforeShow();
			this.update();
		}

		protected beforeShow() {

		}

		private onRemove() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
			this.beforeRemove();
		}

		protected beforeRemove() {

		}

		protected update() {

		}
		
		protected get bindData(): T {
			return this.data;
		}
	}
}