module game {
	/**
	 * 房屋交易逻辑处理
	 */
	export class TradeHouseVst extends BaseTradeVst {
		/**
		 * 区域筛选数据
		 */
		private _filterAreaVo: FilterComponentVo;
		/**
		 * 类型筛选数据
		 */
		private _filterTypeVo: FilterComponentVo;

		/**
		 * 选择的省会或直辖市
		 */
		public selectProvince: number;
		/**
		 * 选择的城市
		 */
		public selectCity: number;
		/**
		 * 户型 1房2房
		 */
		public type: number;

		public houseFilter: FilterComponent;
		public typeFilter: FilterComponent;
		private _tradeDp: eui.ArrayCollection;

		// private _houseScroller:utils.VScrollerPanel;


		public init() {
			this.context.houseAreaBtn.label = '地域';
			this.context.houseTypeBtn.label = '房型';
			this.context.housePriceBtn.label = '价格';

			this._filterAreaVo = new FilterComponentVo();
			this._filterAreaVo.dataList = [this.context.getDefaultFilteItemVo("全国")];
			this._filterAreaVo.callback1 = new CallBackHandler(this, this.onAreaClick1);
			this._filterAreaVo.callback2 = new CallBackHandler(this, this.onAreaClick2);

			table.TCitys.forEach((item: table.ITCitysDefine) => { //处理下拉数据
				if (item.Superior == 0) {
					let itemVo = new FilterComponentItemVo();
					itemVo.des = item.Name;
					itemVo.id = item.Id;
					itemVo.type = FilterComponentType.First;
					this._filterAreaVo.dataList.push(itemVo);

					itemVo.subList = [];//this.getDefaultFilteItemVo()

					table.TCitys.forEach((subItem: table.ITCitysDefine) => {
						if (subItem.Superior == item.Id) {
							let subItemVo = new FilterComponentItemVo();
							subItemVo.des = subItem.Name;
							subItemVo.id = subItem.Id;
							subItemVo.type = FilterComponentType.Second;
							itemVo.subList.push(subItemVo);
						}
					});
				}
			});

			this._filterTypeVo = new FilterComponentVo();
			this._filterTypeVo.isSingle = true;
			this._filterTypeVo.dataList = [this.context.getDefaultFilteItemVo()];
			this._filterTypeVo.callback1 = new CallBackHandler(this, this.onTypeClick1);

			let desList = [];
			table.THouse.forEach((item: table.ITHouseDefine) => {
				if (desList.indexOf(item.Des) == -1) {
					let itemVo = new FilterComponentItemVo();
					itemVo.des = item.Des;
					itemVo.id = item.Type;
					itemVo.type = FilterComponentType.First;

					this._filterTypeVo.dataList.push(itemVo);
					desList.push(item.Des);
				}
			});
			desList = null;

			//下拉选择
			this.houseFilter = new FilterComponent();
			this.houseFilter.y = 100;
			this.context.houseGroup.addChild(this.houseFilter);

			this.typeFilter = new FilterComponent();
			this.typeFilter.y = 100;
			this.typeFilter.x = 145;
			this.context.houseGroup.addChild(this.typeFilter);

			//初始化滚动条
			// this._houseScroller = new utils.VScrollerPanel();
			// this._houseScroller.height = 775;
			// this._houseScroller.width = 720;
			// this._houseScroller.y = 101;
			// this._houseScroller.x = 0;
			// this._houseScroller.dataList.useVirtualLayout = true;
			// this._houseScroller.initItemRenderer(TradeHouseItem);
			// this.context.houseGroup.addChild(this._houseScroller);

			this.context.houseScroller.dataList.useVirtualLayout = true;
			this.context.houseScroller.initItemRenderer(TradeHouseItem);
			this.context.houseScroller.setViewPort();
			this._tradeDp = new eui.ArrayCollection();
		}
		public beforeShow() {
			super.beforeShow();
			this.houseFilter.visible = false;
			this.typeFilter.visible = false;

			this.context.carPriceBtn.onShow();
			this.context.carIncomeBtn.onShow();
			
			NotificationCenter.addObserver(this, this.onTradeList, 'msg.GW2C_RetHouseTradeList');
			NotificationCenter.addObserver(this, this.refreshList, PlayerModel.HOUSE_UPDATE);
		}
		public beforeRemove() {
			super.beforeRemove();
			NotificationCenter.removeObserver(this, 'msg.GW2C_RetHouseTradeList');
			NotificationCenter.removeObserver(this, PlayerModel.HOUSE_UPDATE);
		}
		public onClickHandler(event: egret.TouchEvent) {
			switch (event.target) {
				case this.context.houseAreaBtn: //地域点击
					this.context.houseAreaBtn.changeArrowState();
					if (!this.context.houseAreaBtn.isHide) {
						this.houseFilter.visible = true;
						this.houseFilter.setData(this._filterAreaVo, this.houseFilter.ls_items_brand.selectedIndex);
						this.hideTypeFilter();
					}
					else {
						this.houseFilter.visible = false;
					}
					break;
				case this.context.houseTypeBtn: //房型点击
					this.context.houseTypeBtn.changeArrowState();
					if (!this.context.houseTypeBtn.isHide) {
						this.typeFilter.visible = true;
						this.typeFilter.setData(this._filterTypeVo);
						this.hideHouseFilter();
					}
					else {
						this.typeFilter.visible = false;
					}
					break;
				case this.context.housePriceBtn: //价格排序
					this.context.housePriceBtn.changeState();
					break;
				case this.context.sellBtn:
					if (this.context.panelFlag == TradePanelFlag.House) { //出售房产
						openPanel(PanelType.TradeMyAssetsPanel);
						TradeMyAssetsPanel.getInstance().setData(TradePanelFlag.House);
					}
					break;
			}
		}
		/**
		 * 区域点击1级回调
		 */
		private onAreaClick1(data: FilterComponentItemVo) {
			this.selectProvince = data.id;
			if (data.id == 0) //选择了全国
			{
				this.hideHouseFilter();
				this.startReqTradeList();
			}
			this.context.houseAreaBtn.label = data.des;
		}
		/**
		 * 区域点击2级回调
		 */
		private onAreaClick2(data: FilterComponentItemVo) {
			this.selectCity = data.id;
			this.context.houseAreaBtn.label = data.des;
			this.hideHouseFilter();
			this.startReqTradeList();
		}
		/**
		 * 类型点击
		 */
		private onTypeClick1(data: FilterComponentItemVo) {
			this.type = data.id;
			this.context.houseTypeBtn.label = data.des;
			this.hideTypeFilter();
			this.startReqTradeList();
		}
		private hideHouseFilter() {
			if (this.houseFilter.visible) {
				this.houseFilter.visible = false;
				this.context.houseAreaBtn.changeArrowState();
			}
		}
		private hideTypeFilter() {
			if (this.typeFilter.visible) {
				this.typeFilter.visible = false;
				this.context.houseTypeBtn.changeArrowState();
			}
		}
		/**
		 * 请求数据
		 */
		public startReqTradeList(isClear: boolean = true, isRefresh: boolean = false) {
			let data: msg.C2GW_ReqHouseTradeList = new msg.C2GW_ReqHouseTradeList();
			// let data: any = {};
			let pro = this.selectProvince;
			if (pro == undefined) {
				pro = 0;
			}
			data.location = pro;

			let city = this.selectCity;
			if (city == undefined) {
				city = 0;
			}
			data.sublocation = city;

			let type = this.type;
			if (type == undefined) {
				type = 0;
			}
			data.housetype = type;
			data.pricemin = 0;
			data.pricemax = 0;
			data.houselevel = 0;
			data.name = this.context.searchTxt.text;

			data.pricedec = this.context.housePriceBtn.state == SortBtnState.Down;

			if (TradeManager.getInstance().tradeHouseInfo && TradeManager.getInstance().tradeHouseInfo.list) {
				if (isRefresh) {
					data.startnum = TradeManager.getInstance().tradeHouseInfo.list.length - 10;
					if (data.startnum < 0) {
						data.startnum = 0;
					}
				}
				else {
					if (isClear) {
						data.startnum = 0;
					}
					else {
						data.startnum = TradeManager.getInstance().tradeHouseInfo.list.length;
					}
				}
			}
			else {
				data.startnum = 0;
			}
			//请求交易列表
			sendMessage('msg.C2GW_ReqHouseTradeList', msg.C2GW_ReqHouseTradeList.encode(data));
		}
		/**
		 * 交易列表返回
		 */
		private onTradeList(data: msg.GW2C_RetHouseTradeList) {
			TradeManager.getInstance().tradeHouseInfo = data;
			this._tradeDp.source = data.list;
			this.context.houseScroller.refreshData(this._tradeDp);
		}
		private refreshList() {
			this.startReqTradeList(false, true);
		}
	}
}