module game {
	/**
	 * 房子出售
	 */
	export class TradeHouseSellPanel extends BaseSlidePanel {
		unitPrice: eui.Label; //单价
		baseInconmeTxt: eui.Label; //基础收益
		curTotalPriceTxt: eui.Label; //目前估值

		// guestRoom: eui.Label; //客房
		// kitchenTxt: eui.Label; //厨房
		// bathroomTxt: eui.Label;//卫生间
		// livingRoomTxt: eui.Label; //客厅
		// diningHallTxt: eui.Label; //餐厅
		// masterBedroomTxt: eui.Label; //主卧

		taxRateTxt: eui.Label; //扣税
		afterPriceLabel: eui.Label; //扣税后的价格
		typeTxt: eui.Label; //房型
		nameLabel: eui.Label; //楼盘名称
		tradeStar: TradeStar; //星级（等级）
		sellBtn: eui.Button; //出售
		totalTimeLabel: eui.Label; //保留72小时交易时间
		posTxt: eui.Label; //位置

		cellGroup: eui.Group;
		cell1: eui.Group;
		cell2: eui.Group;
		cell3: eui.Group;
		cell4: eui.Group;
		cell5: eui.Group;
		cell6: eui.Group;
		cell7: eui.Group;

		lvlTxt1: eui.Label;
		lvlTxt2: eui.Label;
		lvlTxt3: eui.Label;
		lvlTxt4: eui.Label;
		lvlTxt5: eui.Label;
		lvlTxt6: eui.Label;
		lvlTxt7: eui.Label;

		numController: NumController; //数字变更组件
		private _data: msg.HouseData;

		public constructor() {
			super();
		}
		protected init() {
			this.numController.setCallBack(new CallBackHandler(this, this.onNumChange));
		}
		protected getSkinName() {
			return TradeHouseSellPanelSkin;
		}
		public setData(data: msg.HouseData) {

			this._data = data;
			this.numController.show(data.sumvalue);
			this.onNumChange();
			let houseDef = TradeManager.getInstance().getHouseDefine(data.tid);
			if (houseDef) {

				this.tradeStar.show(data.level);

				this.curTotalPriceTxt.text = numAddSpace(data.sumvalue) + "金币";
				this.baseInconmeTxt.text = numAddSpace(data.income) + "金币";
				this.unitPrice.text = numAddSpace(Math.floor(data.sumvalue / data.area)) + "金币";
				this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
				this.taxRateTxt.text = "扣税（" + gameConfig.tradeTaxRate * 100 + "%）";

				let buildingDef = TradeManager.getInstance().getBuildingDefById(data.buildingid);
				if (buildingDef) {

					this.nameLabel.text = buildingDef.Community;
					
					let posName = TradeManager.getInstance().getHouseName(buildingDef.Province, buildingDef.City);
					this.posTxt.text = posName;
					// this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');
				}
			}
			this.totalTimeLabel.text = "保留" + gameConfig.tradeTime / 3600 + "小时交易时间";

			// 	guestRoom: eui.Label; //客房
			// kitchenTxt: eui.Label; //厨房 4
			// kitchenTxt: eui.Label; //卧室 5
			// bathroomTxt: eui.Label;//卫生间 3
			// livingRoomTxt: eui.Label; //客厅 1
			// diningHallTxt: eui.Label; //餐厅
			// masterBedroomTxt: eui.Label; //主卧 2
			this.cellGroup.removeChildren();
			if (data.housecells) {
				for (let i: number = 0; i < data.housecells.length; i++) {
					let cell = data.housecells[i];
					this.cellGroup.addChild(this["cell" + cell.index]);
					this['lvlTxt' + cell.index].text = "Lv" + cell.level.toString();

					let houseCellDef = TradeManager.getInstance().getHouseCellDefine(cell.tid);
					if (houseCellDef) {
						this['nameTxt' + cell.index].text = houseCellDef.Des + "：";
					}
				}
			}

			// this.guestRoom.text = data.housecells
		}
		protected beforeShow() {
			super.beforeShow();
			this.sellBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.addObserver(this, this.onSellResult, PlayerModel.HOUSE_UPDATE);
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.sellBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSellBtnClick, this);
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		private onNumChange() {
			this.afterPriceLabel.text = numAddSpace(this.numController.nowNum * (1 - gameConfig.tradeTaxRate)) + "金币";
		}
		private onSellBtnClick() {
			//出售
			let data: msg.C2GW_TradeHouse = new msg.C2GW_TradeHouse();
			data.houseuid = this._data.id;
			let price: number = this.numController.nowNum;
			if (price <= 0) {
				//价格不合法 提示
				showTips("未设置价格，无法出售!");
				return;
			}
			data.price = price;
			sendMessage("msg.C2GW_TradeHouse", msg.C2GW_TradeHouse.encode(data));
		}
		private onSellResult(data: msg.GW2C_UpdateHouseDataOne) { //刷新我的房产
			this.remove();
		}

		private static _instance: TradeHouseSellPanel = null;
		public static getInstance(): TradeHouseSellPanel {
			if (!TradeHouseSellPanel._instance) {
				TradeHouseSellPanel._instance = new TradeHouseSellPanel();
			}
			return TradeHouseSellPanel._instance;
		}
	}
}