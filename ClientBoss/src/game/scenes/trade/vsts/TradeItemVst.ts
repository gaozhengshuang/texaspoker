module game {
	/**
	 * 道具交易处理
	 */
	export class TradeItemVst extends BaseTradeVst {
		/**
 		* 品牌筛选数据
 		*/
		private _filterTypeVo: FilterComponentVo;

		/**
		 * 选择的品牌
		 */
		private _selectType: number;
		public typeFilter: FilterComponent;
		private _tradeDp: eui.ArrayCollection;


		public init() {
			this.context.itemTypeBtn.label = '类型';
			this.context.itemPriceBtn.label = '价格';
			this.context.itemPartBtn.visible = false; // todo 临时屏蔽

			this._filterTypeVo = new FilterComponentVo();
			this._filterTypeVo.dataList = [this.context.getDefaultFilteItemVo()];
			this._filterTypeVo.callback1 = new CallBackHandler(this, this.onAreaClick1);
			this._filterTypeVo.isSingle = true;

			let typeExistList = [];
			table.ItemBaseData.forEach((item: table.IItemBaseDataDefine) => { //处理下拉数据
				if (typeExistList.indexOf(item.Type) == -1) {
					typeExistList.push(item.Type);
					let itemVo = new FilterComponentItemVo();
					itemVo.id = item.Type;
					itemVo.type = FilterComponentType.First;
					itemVo.des = item.TypeDes;
					this._filterTypeVo.dataList.push(itemVo);
				}
			});
			typeExistList = null;
			//下拉选择
			this.typeFilter = new FilterComponent();
			this.typeFilter.y = 100;
			this.context.itemGroup.addChild(this.typeFilter);

			this.context.itemScroller.dataList.useVirtualLayout = true;
			this.context.itemScroller.initItemRenderer(TradeItemItem);
			this.context.itemScroller.setViewPort();
			this._tradeDp = new eui.ArrayCollection();
		}
		public beforeShow() {
			super.beforeShow();
			this.typeFilter.visible = false;

			this.context.itemPriceBtn.onShow();

			NotificationCenter.addObserver(this, this.onTradeList, 'msg.GW2C_RetItemTradeList');
			NotificationCenter.addObserver(this, this.refreshList, "msg.GW2C_RetBuyTradeItem");
			// NotificationCenter.addObserver(this, this.refreshList, "msg.GW2C_RetTradeItem");
		}
		public beforeRemove() {
			super.beforeRemove();
			NotificationCenter.removeObserver(this, 'msg.GW2C_RetItemTradeList');
			NotificationCenter.removeObserver(this, "msg.GW2C_RetBuyTradeItem");
		}
		public onClickHandler(event: egret.TouchEvent) {
			switch (event.target) {
				case this.context.itemTypeBtn:
					this.context.itemTypeBtn.changeArrowState();
					if (!this.context.itemTypeBtn.isHide) {
						this.typeFilter.visible = true;
						this.typeFilter.setData(this._filterTypeVo, this.typeFilter.ls_items_brand.selectedIndex);
					}
					else {
						this.hideTypeFilter();
					}
					break;
				case this.context.itemPriceBtn:
					this.context.itemPriceBtn.changeState();
					this.startReqTradeList(0, true);
					break;
				case this.context.sellBtn:
					if (this.context.panelFlag == TradePanelFlag.Item) { //出售道具
						openPanel(PanelType.TradeMyItemPanel);
					}
					break;
			}
		}
		private onAreaClick1(data: FilterComponentItemVo) {
			this._selectType = data.id;
			// if (data.id == 0) //选择了全部 屏蔽
			// {
			// 	this.hideBrandFilter();
			// 	this.startReqTradeList();
			// }
			this.hideTypeFilter();
			this.startReqTradeList();
			this.context.itemTypeBtn.label = data.des;
		}
		private hideTypeFilter() {
			if (this.typeFilter.visible) {
				this.typeFilter.visible = false;
				this.context.itemTypeBtn.changeArrowState();
			}
		}
		/**
		 * 请求数据
		 */
		public startReqTradeList(userid: number | Long = 0, isClear: boolean = true, isRefresh: boolean = false) {
			let data: msg.C2GW_ReqItemTradeList = new msg.C2GW_ReqItemTradeList();
			// let data: any = {};
			let type = this._selectType;
			if (type == undefined) {
				type = 0;
			}
			data.itemtype = type;
			data.itemsubtype = 0;
			// data.sublocation = model;

			// let type = this.type;
			// if (type == undefined) {
			// 	type = 0;
			// }
			// data.housetype = type;
			data.pricemin = 0;
			data.pricemax = 0;

			data.name = this.context.searchTxt.text;

			data.pricedec = this.context.itemPriceBtn.state == SortBtnState.Down;
			data.userid = userid;

			if (TradeManager.getInstance().tradeItemInfo && TradeManager.getInstance().tradeItemInfo.list) {
				if (isRefresh) {
					data.startnum = TradeManager.getInstance().tradeItemInfo.list.length - 10;
					if (data.startnum < 0) {
						data.startnum = 0;
					}
				}
				else {
					if (isClear) {
						data.startnum = 0;
					}
					else {
						data.startnum = TradeManager.getInstance().tradeItemInfo.list.length;
					}
				}
			}
			else {
				data.startnum = 0;
			}
			//请求交易列表
			if (isClear && TradeManager.getInstance().tradeItemInfo) {
				TradeManager.getInstance().tradeItemInfo.list.length = 0;
			}
			sendMessage('msg.C2GW_ReqItemTradeList', msg.C2GW_ReqItemTradeList.encode(data));
		}
		/**
 		 * 交易列表返回
		 */
		private onTradeList(data: msg.GW2C_RetItemTradeList) {
			if (!panelIsShow(PanelType.TradeMyItemPanel)) { //我的道具
				if (!TradeManager.getInstance().tradeItemInfo || TradeManager.getInstance().tradeItemInfo.list.length == 0) {
					TradeManager.getInstance().tradeItemInfo = data;
					this._tradeDp.source = data.list;
					this.context.itemScroller.refreshData(this._tradeDp);
				}
				else {
					if (data.list.length > 0) {
						TradeManager.getInstance().tradeItemInfo.list = TradeManager.getInstance().tradeItemInfo.list.concat(data.list);
						for (let i: number = 0; i < data.list.length; i++) {
							this._tradeDp.addItem(data.list[i]);
						}
					}
				}
			}
		}
		private refreshList() {
			this.startReqTradeList(0, true, true);
		}
	}
}