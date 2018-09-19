module game {
	/**
	 * 引导面板
	 */
	export class GuidePanel extends PanelComponent {

		guideGroup: eui.Group;
		fingerGroup: eui.Group;
		fingerBtn: eui.Image;
		tipsGroup: eui.Group;
		desLabel: eui.Label;
		promptBgImg: eui.Image;

		private _fingerWidth = 162;
		private _fingerHeight = 165;

		private _container: egret.DisplayObjectContainer;
		private _bitmap: egret.Bitmap;

		public get bitmap() {
			return this._bitmap;
		}

		private _gap: number = 200;
		private _changeTime: number;

		private _data: table.TGuideDefine;

		constructor() {
			super();
			this._isShowDark = this._isShowEffect = false;
			this._layerType = PanelLayerType.MaskLayer;
		}
		protected getSkinName() {
			return GuidePanelSkin;
		}

		protected init() {
			this._container = new egret.DisplayObjectContainer();
			this._bitmap = new egret.Bitmap();
			this._bitmap.touchEnabled = true;
			this._bitmap.pixelHitTest = true;
			this.guideGroup.touchEnabled = false;
			this.tipsGroup.touchChildren = false;
		}

		/**
		 * 设置引导数据
		 */
		public setData(data: table.TGuideDefine, rect: egret.Rectangle) {
			this._data = data;
			this.blendErase(data, rect);

			this.updateTips(data, rect);

			this.updateFinger(data, rect);
		}

		private updateTips(data: table.TGuideDefine, rect: egret.Rectangle) {
			this.tipsGroup.visible = false;
			if (data.Desc != "") {
				this.tipsGroup.visible = true;

				this.desLabel.text = data.Desc;

				this.tipsGroup.x = rect.x - Math.abs((rect.width - this.tipsGroup.width) / 2);
				this.tipsGroup.y = rect.y - rect.height - this.tipsGroup.height;

				this.promptBgImg.width = this.desLabel.width + 50;
				this.promptBgImg.height = Math.max(this.desLabel.height + 20, 150);

				/**
				 * 限制左边缘
				 */
				if (this.tipsGroup.x + this.promptBgImg.width > gamelayer.stage.stageWidth) {
					this.tipsGroup.x = gamelayer.stage.stageWidth - this.promptBgImg.width;
				}

				if (this.tipsGroup.x < 0) {
					this.tipsGroup.x = 0;
				}

				// if (this.tipsGroup.y + this.promptBgImg.height > gamelayer.stage.stageHeight) {

				// }
				/**
				 * 限制下边缘
				 */
				if (this.tipsGroup.y < 0) {
					this.tipsGroup.y = rect.y + rect.height;
				}
			}
		}

		private updateFinger(data: table.TGuideDefine, rect: egret.Rectangle) {

			let targetX = this.fingerBtn.x;
			let targetY = this.fingerBtn.y;
			let offsetX: number = 0;
			let offsetY: number = 0;
			switch (data.Direction) {
				case GuideFingerOrientation.Up:
					offsetY = 50;
					this.fingerGroup.x = rect.x + rect.width / 2;
					this.fingerGroup.y = rect.y - this._fingerHeight / 2 - 50;
					this.fingerBtn.rotation = 180;
					break;
				case GuideFingerOrientation.Down:
					this.fingerGroup.x = rect.x + rect.width / 2;
					this.fingerGroup.y = rect.y + rect.height + this._fingerHeight / 2 + 50;
					this.fingerBtn.rotation = 0;
					offsetY = -50;
					break;
				case GuideFingerOrientation.Left:
					this.fingerGroup.x = rect.x - this._fingerWidth / 2;
					this.fingerGroup.y = rect.y + rect.height / 2;
					this.fingerBtn.rotation = 90;
					offsetX = -50;
					break;
				case GuideFingerOrientation.Right:
					this.fingerGroup.x = rect.x + rect.width + this._fingerWidth / 2;
					this.fingerGroup.y = rect.y + rect.height / 2;
					this.fingerBtn.rotation = -90;
					offsetX = 50;
					break;
			}
			let initX = this.fingerBtn.x = this._fingerWidth / 2;
			let initY = this.fingerBtn.y = this._fingerHeight / 2;
			let tween = egret.Tween.get(this.fingerBtn, { loop: true });

			tween.to({ x: initX + offsetX, y: initY + offsetY }, 500).to({ x: initX, y: initY }, 500);
		}

		protected beforeShow() {
			this._changeTime = 0;
			this.guideGroup.addChild(this._bitmap);
		}

		protected beforeRemove() {
			this._container.removeChildren();
			if (this._bitmap.parent) {
				this.guideGroup.removeChild(this._bitmap);
			}
			egret.Tween.removeTweens(this.fingerBtn);
		}


		/**
		 * 动态画遮罩
		 */
		private blendErase(data: table.TGuideDefine, rect: egret.Rectangle): void {
			let maskIcon: egret.Shape = new egret.Shape();
			maskIcon.graphics.beginFill(0x000000, 1);
			maskIcon.graphics.drawRoundRect(rect.x, rect.y, rect.width, rect.height, 20, 20);
			maskIcon.graphics.endFill();

			let bg: egret.Shape = new egret.Shape();
			let bgAlpha = data.BgAlpha == undefined ? 0.5 : data.BgAlpha;
			bg.graphics.beginFill(0x000000, bgAlpha);
			bg.graphics.drawRect(0, 0, gamelayer.stage.stageWidth, gamelayer.stage.stageHeight);
			bg.graphics.endFill();

			this._container.addChild(bg);
			this._container.addChild(maskIcon);
			maskIcon.blendMode = egret.BlendMode.ERASE;
			let renderTexture: egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(this._container);
			this._bitmap.texture = renderTexture;
		}

		private static _instance: GuidePanel;
		public static getInstance(): GuidePanel {
			if (!GuidePanel._instance) {
				GuidePanel._instance = new GuidePanel();
			}
			return GuidePanel._instance;
		}
	}
}