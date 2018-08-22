module game {
	export class GameSceneAssetsView extends PanelComponent {
		private static _instance: GameSceneAssetsView;
		public static getInstance(): GameSceneAssetsView {
			if (!this._instance) {
				this._instance = new GameSceneAssetsView();
			}
			return this._instance;
		}
		public static CLOSE: string = "close";
		public static GOIN_ROOM: string = "goin_room";
		public static IN_SALE: string = "in_sale";
		public static PAGE_SWITCH: string = "page_switch";

		private view_bg: eui.Rect;
		private topBar: eui.Image;

		private titleRadioGroup: eui.Group;
		private titleRadio1: eui.RadioButton;
		private titleRadio2: eui.RadioButton;
		private titleRadio3: eui.RadioButton;
		private radioGroup: eui.RadioButtonGroup;
		//private radioLine: eui.Rect;

		private contentStarck: eui.ViewStack;
		private stackGroup1: eui.Group;
		private stackGroup2: eui.Group;
		private stackGroup3: eui.Group;

		private undoneTips2: eui.Label;
		private undoneTips3: eui.Label;

		public currentGroupId: number = 1;

		public constructor() {
			super();
			this._isShowEffect = false;
			this._isShowDark = false;
		}
		protected getSkinName() {
			return SceneAssetsViewUI;
		}
		protected beforeShow() {
			this.radioGroup = this.titleRadio1.group;
			this.radioGroup.addEventListener(egret.Event.CHANGE, this.onChangeSex, this);
			this.radioGroup.selectedValue = this.titleRadio1.value;
			this.currentGroupId = this.radioGroup.selectedValue;
			this.contentStarck.selectedChild = this["stackGroup" + this.currentGroupId];

			this.view_bg.height = gameConfig.curHeight();

			NotificationCenter.addObserver(this, this.OnGW2C_ResCarInfo, "msg.GW2C_ResCarInfo");
		}

		protected resetSize() {
			super.resetSize();
			this.view_bg.height = gameConfig.curHeight();
		}
		private onChangeSex(e: egret.Event) {
			var rbGroup: eui.RadioButtonGroup = e.target;
			console.log(rbGroup.selectedValue);  //点击的RadioButton对象的value值
			this.currentGroupId = rbGroup.selectedValue;
			this.contentStarck.selectedChild = this["stackGroup" + this.currentGroupId];

			if (this.currentGroupId == 2) {
				CarManager.getInstance().ReqMyCarInfo();
			} else if (this.currentGroupId == 1) {
				this.dispatchEvent(new BasicEvent(GameSceneAssetsView.PAGE_SWITCH, { pageIndex: 1 }));
			}
		}
		private assetsItemList: utils.ScrollerPanel;
		private assetsList: any[] = [];
		private buildingId: number = 0;
		public updateAssetsList(list: any[]) {
			if (this.currentGroupId == 2) {
				this.stackGroup2.removeChildren();
				let assetsList = <msg.ICarData[]>list;
				{
					let _assetsItemList = new utils.VScrollerPanel();
					this.stackGroup2.addChild(_assetsItemList);
					_assetsItemList.y = 0;
					_assetsItemList.height = this.contentStarck.height;
					_assetsItemList.initItemRenderer(CarItem);
					_assetsItemList.bindData(assetsList);
				}
				return;
			}
			this.assetsList = <HouseVO[]>list;
			if (this.assetsItemList == null) {
				this.assetsItemList = new utils.VScrollerPanel();
				this.stackGroup1.addChild(this.assetsItemList);
				this.assetsItemList.y = 0;
				this.assetsItemList.height = this.contentStarck.height;
				this.assetsItemList.initItemRenderer(SceneAssetsItemPanel);
				this.assetsItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
			}
			this.assetsItemList.bindData(this.assetsList);
		}
		private onItemTouch(eve: eui.ItemTapEvent) {
			let item: HouseVO = this.assetsList[eve.itemIndex];
			if (item) {
				this.dispatchEvent(new BasicEvent(GameSceneAssetsView.GOIN_ROOM, { userid: item.ownerid }));
			}
		}
		private OnGW2C_ResCarInfo(msgs: msg.GW2C_ResCarInfo) {
			//console.log("OnGW2C_ResCarInfo---->"+msgs.parkingdatas.length+" "+msgs.cardatas.length);
			if (this.currentGroupId == 2) {
				this.updateAssetsList(DataManager.playerModel.userInfo.cardatas);
			}

		}
	}
}