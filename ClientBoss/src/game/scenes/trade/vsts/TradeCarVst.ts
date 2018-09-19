module game {

	export class TradeCarVst extends BaseTradeVst {
		/**
 		* 品牌筛选数据
 		*/
		private _filterBrandVo: FilterComponentVo;

		/**
		 * 选择的品牌
		 */
		private _selectBrand: number;
		/**
		 * 选择的型号
		 */
		private _selectModel: number;

		public brandFilter: FilterComponent;
		private _tradeDp: eui.ArrayCollection;


		public init() {
			this.context.carBrandBtn.label = '品牌';
			this.context.carPriceBtn.label = '价格';
			this.context.carIncomeBtn.label = '收益';

			this._filterBrandVo = new FilterComponentVo();
			this._filterBrandVo.dataList = [this.context.getDefaultFilteItemVo()];
			this._filterBrandVo.callback1 = new CallBackHandler(this, this.onAreaClick1);
			this._filterBrandVo.callback2 = new CallBackHandler(this, this.onAreaClick2);

			this._filterBrandVo.isSingle = true;

			table.TCarBrand.forEach((item: table.TCarBrandDefine) => { //处理下拉数据
				let itemVo = new FilterComponentItemVo();
				itemVo.id = item.Id;
				itemVo.type = FilterComponentType.First;
				itemVo.des = item.Brand;
				this._filterBrandVo.dataList.push(itemVo);
			});

			//下拉选择
			this.brandFilter = new FilterComponent();
			this.brandFilter.y = 100;
			this.context.carGroup.addChild(this.brandFilter);

			this.context.carScroller.dataList.useVirtualLayout = true;
			this.context.carScroller.initItemRenderer(TradeCarItem);
			this.context.carScroller.setViewPort();
			this._tradeDp = new eui.ArrayCollection();
		}
		public beforeShow() {
			super.beforeShow();
			this.brandFilter.visible = false;

			this.context.carPriceBtn.onShow();
			this.context.carIncomeBtn.onShow();
			this.context.carIncomeBtn.visible = false; //todo 临时屏蔽

			NotificationCenter.addObserver(this, this.onTradeList, 'msg.GW2C_RetCarTradeList');
			NotificationCenter.addObserver(this, this.refreshList, PlayerModel.CAR_UPDATE);
		}
		public beforeRemove() {
			super.beforeRemove();
			NotificationCenter.removeObserver(this, 'msg.GW2C_RetCarTradeList');
			NotificationCenter.removeObserver(this, PlayerModel.CAR_UPDATE);
		}
		public onClickHandler(event: egret.TouchEvent) {
			switch (event.target) {
				case this.context.carBrandBtn:
					this.context.carBrandBtn.changeArrowState();
					if (!this.context.carBrandBtn.isHide) {
						this.brandFilter.visible = true;
						this.brandFilter.setData(this._filterBrandVo, this.brandFilter.ls_items_brand.selectedIndex);
					}
					else {
						this.hideBrandFilter();
					}
					break;
				case this.context.carPriceBtn:
					this.context.carPriceBtn.changeState();
					this.startReqTradeList(true);
					break;
				case this.context.carIncomeBtn:
					this.context.carIncomeBtn.changeState();
					break;
				case this.context.sellBtn:
					if (this.context.panelFlag == TradePanelFlag.Car) { //出售车辆
						openPanel(PanelType.TradeMyAssetsPanel);
						TradeMyAssetsPanel.getInstance().setData(TradePanelFlag.Car);
					}
					break;
			}
		}
		private onAreaClick1(data: FilterComponentItemVo) {
			this._selectBrand = data.id;
			// if (data.id == 0) //选择了全部 屏蔽
			// {
			// 	this.hideBrandFilter();
			// 	this.startReqTradeList();
			// }
			this.hideBrandFilter();
			this.startReqTradeList();
			this.context.carBrandBtn.label = data.des;
		}
		private onAreaClick2(data: FilterComponentItemVo) {
			this._selectModel = data.id;
			this.context.carBrandBtn.label = data.des;
			this.hideBrandFilter();
			this.startReqTradeList();
		}
		private hideBrandFilter() {
			if (this.brandFilter.visible) {
				this.brandFilter.visible = false;
				this.context.carBrandBtn.changeArrowState();
			}
		}
		/**
		 * 请求数据
		 */
		public startReqTradeList(isClear: boolean = true, isRefresh: boolean = false) {
			let data: msg.C2GW_ReqCarTradeList = new msg.C2GW_ReqCarTradeList();
			// let data: any = {};
			let brand = this._selectBrand;
			if (brand == undefined) {
				brand = 0;
			}
			data.cartype = brand;

			let model = this._selectModel;
			if (model == undefined) {
				model = 0;
			}
			// data.sublocation = model;

			// let type = this.type;
			// if (type == undefined) {
			// 	type = 0;
			// }
			// data.housetype = type;
			data.pricemin = 0;
			data.pricemax = 0;
			data.carlevel = 0;

			data.name = this.context.searchTxt.text;

			data.pricedec = this.context.carPriceBtn.state == SortBtnState.Down;
			//data.pricedec = this.context.carIncomeBtn.state == SortBtnState.Down;

			if (TradeManager.getInstance().tradeCarInfo && TradeManager.getInstance().tradeCarInfo.list) {
				if (isRefresh) {
					data.startnum = TradeManager.getInstance().tradeCarInfo.list.length - 10;
					if (data.startnum < 0) {
						data.startnum = 0;
					}
				}
				else {
					if (isClear) {
						data.startnum = 0;
					}
					else {
						data.startnum = TradeManager.getInstance().tradeCarInfo.list.length;
					}
				}
			}
			else {
				data.startnum = 0;
			}
			//请求交易列表
			if (isClear && TradeManager.getInstance().tradeCarInfo) {
				TradeManager.getInstance().tradeCarInfo.list.length = 0;
			}
			sendMessage('msg.C2GW_ReqCarTradeList', msg.C2GW_ReqCarTradeList.encode(data));
		}
		/**
 		 * 交易列表返回
		 */
		private onTradeList(data: msg.GW2C_RetHouseTradeList) {
			if (!TradeManager.getInstance().tradeCarInfo || TradeManager.getInstance().tradeCarInfo.list.length == 0) {
				TradeManager.getInstance().tradeCarInfo = data;
				this._tradeDp.source = data.list;
				this.context.carScroller.refreshData(this._tradeDp);
			}
			else {
				if (data.list.length > 0) {
					TradeManager.getInstance().tradeCarInfo.list = TradeManager.getInstance().tradeCarInfo.list.concat(data.list);
					for (let i: number = 0; i < data.list.length; i++) {
						this._tradeDp.addItem(data.list[i]);
					}
				}
			}
		}
		private refreshList() {
			this.startReqTradeList(true, true);
		}
	}
}