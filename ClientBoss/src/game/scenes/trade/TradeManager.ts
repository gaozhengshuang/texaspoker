declare function returnTradeBtnClose(bool: boolean);
declare function showEgretDiv(bool: boolean);
module game {
	/**
	 * 交易管理
	 */
	export class TradeManager {
		/**
		 * 交易列表数据
		 */
		public tradeHouseInfo: msg.GW2C_RetHouseTradeList;
		/**
		 * 交易车辆的列表数据
		 */
		public tradeCarInfo: msg.GW2C_RetHouseTradeList;
		/**
		 * 交易的道具信息
		 */
		public tradeItemInfo: msg.GW2C_RetItemTradeList;
		/**
		 * 交易房屋记录
		 */
		public tradeHouseRecordInfo: msg.GW2C_RetTradeHouseHistory;
		/**
		 * 交易车记录
		 */
		public tradeCarRecordInfo: msg.GW2C_RetTradeHouseHistory;
		/**
		 * 道具的交易记录
		 */
		public tradeItemRecordInfo: msg.GW2C_RetTradeItemHistory;
		/**
		 * 根据交易ID，获取交易信息
		 */
		public getTradeInfo(uid: number): msg.SimpleHouseTrade {
			if (this.tradeHouseInfo && this.tradeHouseInfo.list) {
				for (let info of this.tradeHouseInfo.list) {
					if (info.tradeuid == uid) {
						return <msg.SimpleHouseTrade>info;
					}
				}
			}
			return null;
		}
		/**
		 * 返回到交易
		 */
		public returnToTrade() {
			returnTradeBtnClose(false);
			showEgretDiv(true);
			GameConfig.exploreUIFun(true);
			GameConfig.setEventsReply(true);
		}
		/**
		 * 到地图
		 */
		public returnToMap() {
			returnTradeBtnClose(true);
			showEgretDiv(false);
			GameConfig.exploreUIFun(false);
			GameConfig.setEventsReply(false);
		}
		/**
		 * 获取房屋数据
		 */
		public getHouseData(id: number): msg.HouseData {
			let house = DataManager.playerModel.getHouse();
			for (let info of house) {
				if (info.id == id) {
					return info;
				}
			}
			return null;
		}
		/**
		 * 获取房屋配置信息
		 */
		public getHouseDefine(id: number): table.THouseDefine {
			for (let info of table.THouse) {
				if (info.Id == id) {
					return <table.THouseDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取建筑配置
		 */
		public getBuildingDefine(location: number, subLoaction: number): table.TBuildingsDefine {
			for (let info of table.TBuildings) {
				if (info.Province == location && info.City == subLoaction) {
					return <table.TBuildingsDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取楼盘建筑信息 根据ID
		 */
		public getBuildingDefById(id: number): table.TBuildingsDefine {
			for (let info of table.TBuildings) {
				if (info.Id == id) {
					return <table.TBuildingsDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取城市信息
		 */
		public getCityDefine(id: number): table.TCitysDefine {
			for (let info of table.TCitys) {
				if (info.Id == id) {
					return <table.TCitysDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取房间信息
		 */
		public getHouseCellDefine(id: number): table.THouseCellDefine {
			for (let info of table.THouseCell) {
				if (info.Id == id) {
					return <table.THouseCellDefine>info;
				}
			}
			return null;
		}
		/**
		 * 根据ID获取车辆配置信息
		 */
		public getCarDefine(id: number): table.TCarDefine  //todo
		{
			for (let info of table.TCar) {
				if (info.Id == id) {
					return <table.TCarDefine>info;
				}
			}
			return null;
		}
		/**
		 * 车辆品牌表
		 */
		public getCarBrandDefine(id: number): table.TCarBrandDefine {
			for (let info of table.TCarBrand) {
				if (info.Id == id) {
					return <table.TCarBrandDefine>info;
				}
			}
			return null;
		}
		/**
		 * 车辆模型表
		 */
		public getCarModelDefine(id: number): table.TCarModelDefine {
			for (let info of table.TCarModel) {
				if (info.Id == id) {
					return <table.TCarModelDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取车辆名字
		 */
		public getCarName(id: number): string {
			let carDef = TradeManager.getInstance().getCarDefine(id);
			let name = '';
			if (carDef) {
				let brandDef = TradeManager.getInstance().getCarBrandDefine(carDef.Brand);
				let modelDef = TradeManager.getInstance().getCarModelDefine(carDef.Model);
				if (brandDef && modelDef) {
					name = brandDef.Brand + '-' + modelDef.Model;
				}
			}
			return name;
		}
		/**
		 * 获取房产名字
		 */
		public getHouseName(location: number, sublocation: number) {
			let posName = '';
			let province = TradeManager.getInstance().getCityDefine(location);
			if (province) {
				posName = province.Name;
			}
			let city = TradeManager.getInstance().getCityDefine(sublocation);
			if (city) {
				posName += city.Name;
			}
			return posName;
		}
		/**
		 * 获取道具配置
		 */
		public getItemDefine(id: number): table.ItemBaseDataDefine {
			for (let info of table.ItemBaseData) {
				if (info.Id == id) {
					return <table.ItemBaseDataDefine>info;
				}
			}
			return null;
		}
		/**
		 * 获取道具信息
		 */
		public getItemData(id: number): msg.ItemData {
			let list = DataManager.playerModel.getBag();
			if (list) {
				for (let info of list) {
					if (info.id == id) {
						return <msg.ItemData>info;
					}
				}
			}
			return null;
		}

		public switchToBuilding(data: msg.HouseData | msg.SimpleHouseTrade) {
			let bid: number = 0;
			let obj: any = {};
			if (data instanceof msg.HouseData) {
				obj.Id = data.id;
				bid = data.buildingid;
			}
			else {
				bid = 1; //todo
				obj.ID = bid;
			}
			if (bid > 0) {
				let buildingDef = TradeManager.getInstance().getBuildingDefById(bid);
				obj.bName = this.getHouseName(buildingDef.Province, buildingDef.City);
				obj.imageUrl = 'resource/others/images/build_' + buildingDef.CommunityId + '_m.png';
				obj.position = [buildingDef.PosX, buildingDef.PosY];
				moveMap(buildingDef.PosX, buildingDef.PosY);
				this.returnToMap();
				addBuilding(obj); //定位
			}
			else {
				Console.log("建筑定位失败,bid：", bid);
			}
		}
		/**
		 * 获取价格颜色
		 */
		public getPriceColor(price: number): string {
			let userInfo = DataManager.playerModel.getUserInfo();
			if (price > userInfo.gold) {
				return '#f85959';
			}
			return '#000000';
		}
		/**
		 * 获取价格字符串
		 */
		public getPriceStr(price: number): string {
			let priceColor = TradeManager.getInstance().getPriceColor(price);
			return '<font color="' + priceColor + '">' + numAddSpace(price) + '</font>' + '<font color="#00000">金币</font>';
		}

		private _panels = [PanelType.TradePanel,
		PanelType.TradeRecordPanel,
		PanelType.TradeMyAssetsPanel,
		PanelType.TradeHouseBuyPanel,
		PanelType.TradeHouseSellPanel,
		PanelType.TradeCarBuyPanel,
		PanelType.TradeCarSellPanel,
		PanelType.TradeItemBackPanel,
		]
		public hidePanel() {
			for (let panel of this._panels) {
				if (panelIsShow(panel)) {
					switch (panel) {
						case PanelType.TradePanel:
							TradePanel.getInstance().remove();
							break;
						case PanelType.TradeRecordPanel:
							TradeRecordPanel.getInstance().remove();
							break;
						case PanelType.TradeMyAssetsPanel:
							TradeMyAssetsPanel.getInstance().remove();
							break;
						case PanelType.TradeHouseBuyPanel:
							TradeHouseBuyPanel.getInstance().remove();
							break;
						case PanelType.TradeHouseSellPanel:
							TradeHouseSellPanel.getInstance().remove();
							break;
						case PanelType.TradeCarSellPanel:
							TradeCarSellPanel.getInstance().remove();
							break;
						case PanelType.TradeCarBuyPanel:
							TradeCarBuyPanel.getInstance().remove();
							break;
						case PanelType.TradeItemBuyPanel:
							TradeItemBuyPanel.getInstance().remove();
							break;
						case PanelType.TradeMyItemPanel:
							TradeMyItemPanel.getInstance().remove();
							break;
						case PanelType.TradeItemSellPanel:
							TradeItemSellPanel.getInstance().remove();
							break;
						case PanelType.TradeItemBackPanel:
							TradeItemBackPanel.getInstance().remove();
							break;
					}
				}
			}
		}

		private static _instance: TradeManager = null;
		public static getInstance(): TradeManager {
			if (!TradeManager._instance) {
				TradeManager._instance = new TradeManager();
			}
			return TradeManager._instance;
		}
	}
	/**
	 * 交易状态
	 */
	export enum TradeState {
		None = 0,
		/**
		 * 交易中
		 */
		Tradeing = 1,
		/**
		 * 交易完成能领金币
		 */
		CanReward = 2,
		/**
		 * 买成功
		 */
		SellOk = 3,
		/**
		 * 卖成功
		 */
		BuyOk = 4,
		/**
		 * 交易取消 
		 */
		TradeCancel = 5,
	}
}