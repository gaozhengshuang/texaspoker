module game {
	/**
	 * 交易的ICON
	 */
	export class TradeIcon extends BaseUIComponent<TradeIconInfo>{
		iconImg: eui.Image;
		nameTxt: eui.Label;
		tradeStar: TradeStar;
		protected getSkinName() {
			return TradeIconSkin;
		}
		protected beforeShow() {
			switch (this.data.type) {
				case TradeIconType.House:
					this.iconImg.source = "huxing_" + this.data.icon + "_s_png";
					break;
				case TradeIconType.Car:
					this.iconImg.source = this.data.icon;
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
	}
	export enum TradeIconType {
		None = 0,
		House = 1,
		Car = 2,
	}
}