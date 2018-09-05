module game {
	/**
	 * 地图商店事件渲染项
	 */
	export class MapEventsShopItem extends BaseItemRenderer<any> {
		buyBtn: eui.Button;
		priceLabel: eui.Label;
		nameLabel: eui.Label;
		desLabel: eui.Label;
		icon: ItemIcon;

		protected getSkinName() {
			return MapEventsShopItemSkin;
		}
		protected beforeShow() {
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
		}
		protected beforeRemove() {
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
		}
		protected update()
		{
			this.priceLabel.text = "";
			this.nameLabel.text = "";
			this.desLabel.text = "";
			this.icon.forceRefresh({});
		}
		private onBuyClick() {
			//请求购买todo
		}
	}
}