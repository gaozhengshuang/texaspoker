module game {
	export class GrayScaleFilter {
		private static instance: GrayScaleFilter;
		private filter: egret.ColorMatrixFilter;
		private matrix = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];

		public constructor() {
		}
		public static getInstance(): GrayScaleFilter {
			if (this.instance == null) {
				this.instance = new GrayScaleFilter();
			}
			return this.instance;
		}
		public setfilterFun(dis: egret.DisplayObject): void {
			this.deleteFilter(dis);
			this.filter = new egret.ColorMatrixFilter(this.matrix);
			dis.filters = [this.filter];
		}

		public delfiltersFun(dis: egret.DisplayObject): void {
			this.deleteFilter(dis);
		}
		private deleteFilter(dis: egret.DisplayObject): void {
			if (dis.filters != null) {
				dis.filters = [];
			}
		}
	}
}