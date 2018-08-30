module game {
	/**
	 * 基础滑动面板
	 */
	export class BaseSlidePanel extends PanelComponent {
		public tweenGroup: eui.Group;
		protected isOnTween: boolean;
		constructor() {
			super();
			this._isShowEffect = false;
		}
		public show() {
			super.show();

			this.tweenGroup.y = -this.tweenGroup.height;
			if (this.isOnTween == false) {
				let tween = egret.Tween.get(this.tweenGroup);
				this.isOnTween = true;
				tween.to({ y: 0 }, 300, egret.Ease.cubicOut).call(() => {
					this.isOnTween = false;
				}, this);
			}
		}
		protected beforeShow() {
			this.darkRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDarkClik, this);
		}
		protected beforeRemove()
		{
			this.darkRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDarkClik, this);
		}
		private onDarkClik()
		{
			this.remove();
		}
		protected playRemoveEffect() {
			if (!this.isOnTween) {
				let tween = egret.Tween.get(this.tweenGroup);
				this.isOnTween = true;
				tween.to({ y: -this.tweenGroup.height }, 300, egret.Ease.cubicOut).call(() => {
					this.isOnTween = false;
					this.removeDarkRect();
					this.removeFromParent();
				}, this);
			}
		}
	}
}
