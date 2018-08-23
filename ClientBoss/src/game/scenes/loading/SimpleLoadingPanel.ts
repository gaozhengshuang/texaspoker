module game {
	/**
	 * 消息通信超时loading & 简单资源加载loading
	 */
	export class SimpleLoadingPanel extends PanelComponent {
		public image: eui.Image;
		public container: eui.Group;
		public infoLabel: eui.Label;

		private _timeId: number;
		private _time: number;
		private _isOut: boolean;
		private _allowTimeout: boolean;
		private readonly timeOut = 15000;
		constructor() {
			super();
			this._isShowEffect = false;
			this.container.visible = false;
			this._darkAlpha = 0;
		}
		protected getSkinName() {
			return SimpleLoadingSkin;
		}
		protected init() {
			this._allowTimeout = true; //todo
			// if (data) {
			// 	this._allowTimeout = data as boolean;
			// }
			this._time = egret.getTimer();
			this._isOut = false;
		}
		protected beforeShow() {
			this.container.visible = false;
			this.turnRound();
			this._timeId = egret.setTimeout(this.delayShowContainer, this, 3000);
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
		protected beforeRemove() {
			egret.clearTimeout(this._timeId);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			egret.Tween.removeTweens(this.image);
		}
		private update(event: egret.Event) {
			if (this._allowTimeout && this._isOut == false && this.container.parent) {
				let offsetTime = egret.getTimer() - this._time;
				if (offsetTime >= this.timeOut) {
					this._isOut = true;
					this.remove();
					NotificationCenter.postNotification('loading_timeout'); //处理超时
				}
			}
		}
		private delayShowContainer() {
			this.container.visible = true;
		}
		private turnRound() {
			egret.Tween.get(this.image, { loop: true })
				.set({ rotation: 0 })
				.to({ rotation: 360 }, 1000);
		}

		private static _instance: SimpleLoadingPanel = null;
		public static getInstance(): SimpleLoadingPanel {
			if (!SimpleLoadingPanel._instance) {
				SimpleLoadingPanel._instance = new SimpleLoadingPanel();
			}
			return SimpleLoadingPanel._instance;
		}
	}
}