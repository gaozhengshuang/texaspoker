module game {
	/**
	 * 交易的ICON
	 */
	export class TradeIcon extends BaseUIComponent<TradeIconInfo>{
		itemIcon: eui.Image;
		otherIcon: eui.Image;
		itemBorderImg: eui.Image;
		nameTxt: eui.Label;
		tradeStar: TradeStar;
		protected getSkinName() {
			return TradeIconSkin;
		}
		protected beforeShow() {
			this.itemIcon.visible = this.otherIcon.visible = this.itemBorderImg.visible = this.nameTxt.visible = this.tradeStar.visible = false;
			// this.iconImg.width = this.iconImg.height = 120;
			// this.itemBorderImg.width = this.itemBorderImg.height = 130;
			switch (this.data.type) {
				case TradeIconType.House:
					this.nameTxt.visible = this.tradeStar.visible = true;
					this.otherIcon.source = "huxing_" + this.data.icon + "_s_png";
					this.otherIcon.visible = true;
					break;
				case TradeIconType.Car:
					this.nameTxt.visible = this.tradeStar.visible = true;
					this.otherIcon.source = this.data.icon;
					this.otherIcon.visible = true;
					break;
				case TradeIconType.Item:
					this.itemBorderImg.visible = true;
					this.itemBorderImg.source = 'frame' + this.data.star + "_png"; //todo边框
					this.itemIcon.source = this.data.icon;// + "_png";
					this.itemIcon.visible = true;
					break;
			}
			this.nameTxt.text = this.data.name;
			this.tradeStar.show(this.data.star);
		}
	}
	export interface TradeIconInfo {
		name: string;
		icon: string;
		star: number;
		type: TradeIconType;
		imgId?: string;
	}
	export enum TradeIconType {
		None = 0,
		House = 1,
		Car = 2,
		Item = 3,
	}
}