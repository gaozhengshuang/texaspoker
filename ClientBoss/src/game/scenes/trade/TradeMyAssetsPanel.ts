module game {
	/**
	 * 出售我的资产面板
	 */
	export class TradeMyAssetsPanel extends PanelComponent {

		desLabel: eui.Label;
		scroller: utils.VScrollerPanel;
		titlePanel: PageTitlePanel;
		private _dp: eui.ArrayCollection;

		private _flag: TradePanelFlag;


		public constructor() {
			super();
			this._isShowEffect = false;
		}
		protected getSkinName() {
			return TradeMyAssetsPanelSkin;
		}
		protected init() {
			this._dp = new eui.ArrayCollection();
			this.scroller.setViewPort();
			this.titlePanel.init(this.remove, this);
		}
		protected beforeShow() {
			NotificationCenter.addObserver(this, this.onRefreshHouse, PlayerModel.HOUSE_UPDATE);
		}
		protected beforeRemove() {
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		public setData(flag: TradePanelFlag) {
			this._flag = flag;
			this.titlePanel.updateUserInfo(DataManager.playerModel.getUserInfo());
			switch (flag) {
				case TradePanelFlag.House:
					this.desLabel.text = '我的房产';
					this.scroller.initItemRenderer(TradeHouseSellItem);
					let list = this.getHouseList();
					this._dp.source = list;
					break;
				case TradePanelFlag.Car:
					this.desLabel.text = '我的车库';
					this.scroller.initItemRenderer(TradeCarSellItem);
					list = DataManager.playerModel.userInfo.cardatas;
					this._dp.source = this.getCarList();
					break;
			}
			this.scroller.refreshData(this._dp);
		}
		//刷新房屋显示
		private onRefreshHouse(data: msg.GW2C_UpdateHouseDataOne) {
			if (this._flag == TradePanelFlag.House) {
				this._dp.source = this.getHouseList();
				this.scroller.refreshData(this._dp);
			}
			else if (this._flag == TradePanelFlag.Car) {
				this._dp.source = this.getCarList();
				this.scroller.refreshData(this._dp);
			}
		}

		private getHouseList(): any[] {
			let list = [];
			let house: msg.HouseData[] = DataManager.playerModel.getHouse();
			for (let i: number = 0; i < house.length; i++) {
				let data = house[i];
				if (data.buildingid != 0) {
					list.push(data);
				}
			}
			return list;
		}
		private getCarList(): any[] {
			let list = [];
			let carData: msg.CarData[] = <msg.CarData[]>DataManager.playerModel.userInfo.cardatas;
			for (let i: number = 0; i < carData.length; i++) {
				let data = carData[i];
				if (data.state == msg.CarState.Ready) {
					list.push(data);
				}
			}
			return list;
		}

		private static _instance: TradeMyAssetsPanel = null;
		public static getInstance(): TradeMyAssetsPanel {
			if (!TradeMyAssetsPanel._instance) {
				TradeMyAssetsPanel._instance = new TradeMyAssetsPanel();
			}
			return TradeMyAssetsPanel._instance;
		}
	}
}