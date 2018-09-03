module game {
	export abstract class BaseTradeVst {
		protected context: TradePanel;
		constructor(ctx: TradePanel) {
			this.context = ctx;
		}
		public init() {

		}
		public beforeShow() {
		}
		public beforeRemove() {

		}
		public onClickHandler(event:egret.TouchEvent)
		{
			
		}
	}
}