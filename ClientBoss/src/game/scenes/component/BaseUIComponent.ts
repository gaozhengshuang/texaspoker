module game {
	/**
	 * 基础UI组件
	 */
	export abstract class BaseUIComponent<T> extends GameComponent {
		public data: T;
		public constructor() {
			super();
		}
		public show(data: T) {
			this.data = data;
			this.beforeShow();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}
		protected beforeShow() {

		}
		private onRemove() {
			this.beforeRemove();
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		}
		protected beforeRemove() {

		}
	}
}