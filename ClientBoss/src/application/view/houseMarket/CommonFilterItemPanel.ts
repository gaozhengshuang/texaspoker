module game {
	export class CommonFilterItemPanel extends eui.Component {
		public static ITEM_TAP: string = "item_tap";

		private word_bg: eui.Rect;
		private word_txt: eui.Label;
		public itemDate: any;
		public itemType: number = 1;
		public itemIndex: number = 1;

		public constructor() {
			super();
			this.skinName = "resource/skins/CommonFilterListItemSkin.exml";
			this.word_bg.alpha = 0;
			this.touchChildren = false;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_begin, this);
		}
		public update(data: any, index: number, type: number = 1) {
			this.itemDate = data;
			this.itemIndex = index;
			this.itemType = type;

			switch (this.itemType) {
				case 1:
					this.word_txt.text = "全国";
					this.word_txt.textColor = 0xFF3434;
					break;
				case 2:
					this.word_txt.text = this.itemDate.Name;
					this.word_txt.textColor = 0x606060;

					break;
				case 3:
					this.word_txt.text = this.itemDate.Name;
					this.word_txt.textColor = 0x606060;

					break;
				case 4:
				this.word_txt.text = this.itemDate.Des;
					this.word_txt.textColor = 0x606060;

					break;
			}

		}
		private tap_begin() {
			this.dispatchEvent(new BasicEvent(CommonFilterItemPanel.ITEM_TAP, { index: this.itemIndex, data: this.itemDate }));
		}
		public showBg(isShow: boolean) {
			if (this.itemType == 2) {
				this.word_bg.alpha = isShow ? 1 : 0;
			}else{
				this.word_bg.alpha=0;
			}
		}
		public delPanel() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_begin, this);
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
		}
	}
}