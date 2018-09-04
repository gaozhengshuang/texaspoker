module game {
	/**
	 * 交易的ICON
	 */
	export class TradeIcon extends BaseUIComponent<TradeIconInfo>{
		iconImg: eui.Image;
		itemBorderImg: eui.Image;
		nameTxt: eui.Label;
		tradeStar: TradeStar;
		protected getSkinName() {
			return TradeIconSkin;
		}
		protected beforeShow() {
			this.itemBorderImg.visible = this.nameTxt.visible = this.tradeStar.visible = false;
			this.iconImg.width = this.iconImg.height = 120;
			switch (this.data.type) {
				case TradeIconType.House:
					this.nameTxt.visible = this.tradeStar.visible = true;
					this.iconImg.source = "huxing_" + this.data.icon + "_s_png";
					break;
				case TradeIconType.Car:
					this.nameTxt.visible = this.tradeStar.visible = true;
					this.iconImg.source = this.data.icon;
					break;
				case TradeIconType.Item:
					this.itemBorderImg.visible = true;
					this.itemBorderImg.source = ''; //todo边框
					this.iconImg.source = this.data.icon;// + "_png";
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