module game {
	/**
 	 * 地图事件逻辑处理器
 	 */
	export class MapEventsProcessHandler {
		protected _data: msg.MapEvent;
		protected _definition: table.TMapEventDefine;
		/**
		 * 事件类型
		 */
		protected _type: MapEventsRunType;
		/**
		 * 事件参数
		 */
		protected _param: any[];
		/**
		 * 事件执行器集合
		 */
		private _runHandlerMap: game.Map<MapEventsRunType, BaseMapEventsRunHandler>;
		public init() {
			this._runHandlerMap = new game.Map<MapEventsRunType, BaseMapEventsRunHandler>();
		}
		/**
		 * 处理事件
		 */
		public process(data: msg.MapEvent) {
			this._data = data;
			this._definition = <table.TMapEventDefine>table.TMapEventById[data.tid];
			if (this._definition) {
				let paramsArr = this._definition.Params.split('-');

				if (paramsArr && paramsArr.length > 1) {
					this._type = parseInt(paramsArr[0]);
					this._param = paramsArr[1].split(',');
				}
			}
			this.startRun();
		}
		protected startRun() {
			let runHandler: BaseMapEventsRunHandler = this._runHandlerMap.getValue(this._type);
			if (!runHandler) {
				switch (this._type) {
					case MapEventsRunType.EnterGame:
						runHandler = new MapEventsEnterGameRunHandler();
						break;
					case MapEventsRunType.OpenShop:
						runHandler = new MapEventsOpenShopRunHandler();
						break;
				}
				this._runHandlerMap.add(this._type, runHandler);
			}
			if (runHandler) {
				runHandler.run(this._data, this._param);
			}
			else
			{
				Console.log("未找到对应的事件执行器！type：", this._type);
			}
		}

		/**
		 * 发送事件消息
		 */
		public sendMsg() {
			MapEventsManager.getInstance().reqEnterEvent(this._data.id);
		}
	}
	/**
	 * 事件执行类型
	 */
	export enum MapEventsRunType {
		None = 0,
		/**
		 * 进入小游戏
		 */
		EnterGame = 1,
		/**
		 * 打开商店
		 */
		OpenShop = 2,
	}
}