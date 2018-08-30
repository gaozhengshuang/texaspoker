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
		 * 交易记录
		 */
		public tradeRecordInfo: msg.GW2C_RetTradeHouseHistory;

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