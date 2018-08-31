module game {
	/**
	 * 基础滑动面板
	 */
	export class BaseSlidePanel extends PanelComponent {
		public tweenGroup: eui.Group;
		protected isOnTween: boolean;
		constructor() {
			super();
		}
		public show() {
			super.show();

			this.tweenGroup.y = gamelayer.stage.stageHeight + this.tweenGroup.height;
			if (!this.isOnTween) {
				let tween = egret.Tween.get(this.tweenGroup);
				this.isOnTween = true;
				//200 底部栏
				tween.to({ y: gamelayer.stage.stageHeight - this.tweenGroup.height - 100 }, 300, egret.Ease.cubicOut).call(() => {
					this.isOnTween = false;
				}, this);
			}
		}
		protected beforeRemove() {
			if (this.darkRect) {
				this.darkRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDarkClik, this);
			}
		}
		private onDarkClik() {
			if (!this.isOnTween) {
				this.remove();
			}
		}
		protected playShowEffect(dark: boolean = true, effectType: number = 1, isAlert: boolean = false) {
			super.playShowEffect(dark, effectType, isAlert);
			this.darkRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDarkClik, this);
		}
		protected playRemoveEffect() {
			if (!this.isOnTween) {
				let tween = egret.Tween.get(this.tweenGroup);
				this.isOnTween = true;
				tween.to({ y: gamelayer.stage.stageHeight + this.tweenGroup.height }, 300, egret.Ease.cubicOut).call(() => {
					this.isOnTween = false;
					this.removeDarkRect();
					this.removeFromParent();
				}, this);
			}
		}
	}
}
