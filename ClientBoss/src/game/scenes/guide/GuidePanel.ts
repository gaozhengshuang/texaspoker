module game {
	/**
	 * 引导面板
	 */
	export class GuidePanel extends PanelComponent {
		
		guideGroup: eui.Group;
		promptImg: eui.Image;
		promptBtn: eui.Image;
		tipsGroup: eui.Group;
		desLabel: eui.Label;


		private _container: egret.DisplayObjectContainer;
		private _bitmap: egret.Bitmap;

		public get bitmap()
		{
			return this._bitmap;
		}
		
		private _gap: number = 200;
		private _changeTime: number;

		private _data:table.TGuideDefine;

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
		}

		/**
		 * 设置引导数据
		 */
		public setData(data: table.TGuideDefine, rect: egret.Rectangle) {
			this._data = data;

			this.blendErase(rect);

			this.tipsGroup.visible = false;
			if (data.Desc != "") {
				this.tipsGroup.visible = true;
				this.tipsGroup.x = rect.x + rect.width / 2; //todo
				this.tipsGroup.y = rect.y - rect.height - 100;

				this.desLabel.text = data.Desc;
			}
			//手指位置
			this.promptImg.x = rect.x + (rect.width - this.promptImg.width) / 2;
			this.promptImg.y = rect.y + (rect.height - this.promptImg.height) / 2;
		}

		protected beforeShow() {
			this._changeTime = 0;
			TickUtil.addFrameInvoke(this.onFrame, this);
			this.guideGroup.addChild(this._bitmap);
			this._bitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBmpClick, this)

		}

		protected beforeRemove() {
			TickUtil.removeFrameInvoke(this.onFrame, this);
			this._container.removeChildren();
			if (this._bitmap.parent) {
				this.guideGroup.removeChild(this._bitmap);
			}
			this._bitmap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBmpClick, this)
		}

		private onFrame() {
			if (Date.now() - this._changeTime >= this._gap) {
				this._changeTime = Date.now();
				this.promptBtn.source = this.promptBtn.source == "guide_press_png" ? "guide_release_png" : "guide_press_png";
			}
		}

		/**
		 * 动态画遮罩
		 */
		private blendErase(rect: egret.Rectangle): void {
			let maskIcon: egret.Shape = new egret.Shape();
			maskIcon.graphics.beginFill(0x000000, 1);
			maskIcon.graphics.drawRoundRect(rect.x, rect.y, rect.width, rect.height, 20, 20);
			maskIcon.graphics.endFill();

			let bg: egret.Shape = new egret.Shape();
			bg.graphics.beginFill(0x000000, 0.5);
			bg.graphics.drawRect(0, 0, gamelayer.stage.stageWidth, gamelayer.stage.stageHeight);
			bg.graphics.endFill();

			this._container.addChild(bg);
			this._container.addChild(maskIcon);
			maskIcon.blendMode = egret.BlendMode.ERASE;
			let renderTexture: egret.RenderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(this._container);
			this._bitmap.texture = renderTexture;
		}

		private onBmpClick()
		{
			
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