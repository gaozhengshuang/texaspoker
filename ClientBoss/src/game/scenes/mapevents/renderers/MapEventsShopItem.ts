module game {
	/**
	 * 地图商店事件渲染项
	 */
	export class MapEventsShopItem extends BaseItemRenderer<msg.StoreProductData> {
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
			NotificationCenter.removeObserver(this, MapEventsManager.OnMapStoreUpdate);
		}
		public outUpdate() {
			this.update();
		}
		protected update() {
			let mapStoreDef = table.TMapStoreById[this.bindData.pid];
			let itemDef = table.ItemBaseDataById[this.bindData.pid];

			if (mapStoreDef && itemDef) {
				this.priceLabel.text = mapStoreDef.Price.toString();
				this.nameLabel.text = itemDef.Name;
				this.desLabel.text = itemDef.Desc;
				this.icon.forceRefresh({ id: this.bindData.pid, isShowNum: false });

				this.buyBtn.label = "购买";
				this.buyBtn.enabled = true;
				if (this.bindData.sell <= 0) {
					this.buyBtn.label = '已售罄';
					this.buyBtn.enabled = false;
				}
				else if (!DataManager.isAssetsEnough(mapStoreDef.MoneyType, mapStoreDef.Price, 0, false)) {
					{
						this.buyBtn.enabled = false;
						switch (mapStoreDef.MoneyType) {
							case msg.MoneyType._Diamond:
								this.buyBtn.label = '钻石不足';
								break;
							case msg.MoneyType._Gold:
								this.buyBtn.label = '金币不足';
								break;
						}
					}
				}
			}
		}
		private onBuyClick() {
			if (this.isCanBuy(true)) {
				let data = new msg.C2GW_BuyFromMapStore();
				data.num = 1;
				data.pid = this.bindData.pid;
				data.shopid = this.bindData.shopid;
				sendMessage("msg.C2GW_BuyFromMapStore", msg.C2GW_BuyFromMapStore.encode(data));
			}
		}
		private isCanBuy(isShowAlert: boolean): boolean {
			if (this.bindData.sell > 0) {
				let mapStoreDef = table.TMapStoreById[this.bindData.pid];
				if (mapStoreDef && DataManager.isAssetsEnough(mapStoreDef.MoneyType, mapStoreDef.Price, 0, isShowAlert)) {
					return true;
				}
			}
			return false;
		}
	}
}