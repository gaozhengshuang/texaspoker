module game {
	/**
	 * 房屋，车辆星级组件
	 */
	export class TradeStar extends BaseUIComponent<number> {
		private static maxStarNum: number = 5;
		protected getSkinName()
		{
			return TradeStarSkin;
		}
		protected beforeShow() {
			for (let i: number = 0; i < TradeStar.maxStarNum; i++) {
				this['star' + i.toString()].visible = false;
			}
			if (this.data != undefined) {
				for (let i: number = 0; i < this.data; i++) {
					this['star' + i.toString()].visible = true;
				}
			}
		}
	}
}