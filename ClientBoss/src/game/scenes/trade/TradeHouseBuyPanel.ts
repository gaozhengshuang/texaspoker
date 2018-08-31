module game {
	/**
	 * 房子购买
	 */
	export class TradeHouseBuyPanel extends BaseSlidePanel {
		unitPrice: eui.Label; //单价
		baseInconmeTxt: eui.Label; //基础收益
		curTotalPriceTxt: eui.Label; //目前估值

		// guestRoom: eui.Label; //客房
		// kitchenTxt: eui.Label; //厨房
		// bathroomTxt: eui.Label;//卫生间
		// livingRoomTxt: eui.Label; //客厅
		// diningHallTxt: eui.Label; //餐厅
		// masterBedroomTxt: eui.Label; //主卧

		typeTxt: eui.Label; //房型
		nameLabel: eui.Label; //楼盘名称
		tradeStar: TradeStar; //星级（等级）
		buyBtn: eui.Button; //购买
		timeLabel: eui.Label; //交易结束时间
		posTxt: eui.Label; //位置
		priceLabel: eui.Label;

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

		private _data: msg.SimpleHouseTrade;

		public constructor() {
			super();
		}
		protected init() {
		}
		protected getSkinName() {
			return TradeHouseBuyPanelSkin;
		}
		public setData(data: msg.SimpleHouseTrade, houseDetailData: msg.GW2C_UpdateHouseDataOne) {

			this._data = data;

			let houseDef = TradeManager.getInstance().getHouseDefine(data.housebaseid);
			this.priceLabel.text = numAddSpace(data.price) + "金币";
			if (houseDef) {

				this.tradeStar.show(data.houselevel);

				// this.curTotalPriceTxt.text = ; numAddSpace(data.price) + "金币";
				this.curTotalPriceTxt.textFlow = TextUtil.parse(TradeManager.getInstance().getPriceStr(data.price));
				this.baseInconmeTxt.text = numAddSpace(data.income) + "金币";
				this.unitPrice.text = numAddSpace(Math.floor(data.price / data.area)) + "金币";
				this.typeTxt.text = houseDef.Des + "(" + data.area + "平)";
				this.nameLabel.text = data.name;

				let posName = TradeManager.getInstance().getHouseName(data.location, data.sublocation);
				this.posTxt.text = posName;
				// this.posTxt.textFlow = TextUtil.parse('<u>' + posName + '</u>');
			}

			// 	guestRoom: eui.Label; //客房
			// kitchenTxt: eui.Label; //厨房 4
			// kitchenTxt: eui.Label; //卧室 5
			// bathroomTxt: eui.Label;//卫生间 3
			// livingRoomTxt: eui.Label; //客厅 1
			// diningHallTxt: eui.Label; //餐厅
			// masterBedroomTxt: eui.Label; //主卧 2

			this.cellGroup.removeChildren();
			if (houseDetailData.data.housecells) {
				for (let i: number = 0; i < houseDetailData.data.housecells.length; i++) {
					let cell = houseDetailData.data.housecells[i];
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
			this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.AddSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.addObserver(this, this.onSellResult, PlayerModel.HOUSE_UPDATE);
		}
		protected beforeRemove() {
			super.beforeRemove();
			this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtnClick, this);
			TickUtil.RemoveSecondsInvoke(this.onTimeCd, this);
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		private onBuyBtnClick() {
			let userinfo = DataManager.playerModel.getUserInfo();
			if (userinfo.gold >= this._data.price) {
				let data: msg.C2GW_BuyTradeHouse = new msg.C2GW_BuyTradeHouse();
				data.tradeuid = this._data.tradeuid;
				data.houseuid = this._data.houseuid;
				sendMessage("msg.C2GW_BuyTradeHouse", msg.C2GW_BuyTradeHouse.encode(data));
			}
			else {
				//提示金币不足
				showTips('金币不足！')
			}
		}
		private onSellResult(data: msg.GW2C_RetBuyTradeHouse) { //刷新我的房产
			let houseList: msg.HouseData[] = DataManager.playerModel.getHouse(); //是否要添加一处房子数据
			this.remove();
			//提示购买成功
		}
		private onTimeCd() {
			let leftTime = this._data.endtime - SysTimeEventManager.getInstance().systimeNum;
			if (leftTime >= 0) {
				this.timeLabel.text = s2hms(leftTime);
			}
			else {
				this.timeLabel.text = s2hms(0);
				TickUtil.RemoveSecondsInvoke(this.onTimeCd, this);
			}
		}

		private static _instance: TradeHouseBuyPanel = null;
		public static getInstance(): TradeHouseBuyPanel {
			if (!TradeHouseBuyPanel._instance) {
				TradeHouseBuyPanel._instance = new TradeHouseBuyPanel();
			}
			return TradeHouseBuyPanel._instance;
		}
	}
}