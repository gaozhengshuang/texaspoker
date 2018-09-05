module game {
	/**
	 * 物品获得提示
	 */
	export class ItemGetTips {
		/**
		 * 是否开启收集
		 */
		private _isOpenCollect: boolean = true;
		public set isOpenCollect(value: boolean) {
			this._isOpenCollect = value;
		}
		public get isOpenCollect(): boolean {
			return this._isOpenCollect;
		}
		/**
		 * 收集之前的map
		 */
		private _preMap: Map<number, number> = new Map<number, number>();
		/**
		 * 提示间隔500MS
		 */
		private _gap: number = 500;

		/**
		 * 开始收集
		 */
		public startCollect() {
			if (this._isOpenCollect) {
				let userInfo = DataManager.playerModel.userInfo;
				this._preMap.add(msg.MoneyType._Gold, userInfo.gold);
				this._preMap.add(msg.MoneyType._Diamond, userInfo.diamond);
				this._preMap.add(msg.MoneyType._Strength, userInfo.robcount);
			}
		}
		/**
		 * 显示获得提示
		 */
		public show() {
			if (this._isOpenCollect) {
				let idx: number = 0;
				let userInfo = DataManager.playerModel.userInfo;
				this._preMap.foreach((type: number, preNum: number) => {
					let offsetNum = 0;
					let itemName = "";
					switch (type) {
						case msg.MoneyType._Gold:
							offsetNum = userInfo.gold - preNum;
							itemName = "金币";
							break;
						case msg.MoneyType._Diamond:
							offsetNum = userInfo.diamond - preNum;
							itemName = "钻石";
							break;
						case msg.MoneyType._Strength:
							offsetNum = userInfo.robcount - preNum;
							itemName = "体力";
							break;
					}
					if (offsetNum > 0) {
						TickUtil.AddTimeoutInvoke(() => {
							showTips("获得" + itemName + "*" + numAddSpace(offsetNum));
						}, this._gap * idx, this);
						idx++;
					}
				}, this);
				this._preMap.clear();
			}
		}

		private static _instance: ItemGetTips = null;
		public static getInstance(): ItemGetTips {
			if (!ItemGetTips._instance) {
				ItemGetTips._instance = new ItemGetTips();
			}
			return ItemGetTips._instance;
		}
	}
}