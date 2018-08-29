module game {
	/**
	 * 交易的ICON
	 */
	export class TradeIcon extends BaseUIComponent<TradeIconInfo>{
		iconImg:eui.Image;
		nameTxt:eui.Label;
		tradeStar:TradeStar;
		protected getSkinName()
		{
			return TradeIconSkin;
		}
		protected beforeShow()
		{
			this.iconImg.source = this.data.icon;
			this.nameTxt.text = this.data.name;
			
			this.tradeStar.show(this.data.star);
		}
	}
	export interface TradeIconInfo {
		name: string;
		icon: string;
		star: number;
	}
}