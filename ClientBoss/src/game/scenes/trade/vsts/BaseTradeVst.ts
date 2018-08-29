module game {
	export abstract class BaseTradeVst {
		protected context: TradePanel;
		constructor(ctx: TradePanel) {
			this.context = ctx;
		}
		public beforeShow() {

		}
		public beforeRemove() {

		}
	}
}