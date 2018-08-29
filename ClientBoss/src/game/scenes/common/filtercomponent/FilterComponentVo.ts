module game {
	/**
	 * 过滤器数据
	 */
	export class FilterComponentVo {
		/**
		 * 是否是单 仅有一排
		 */
		public isSingle: boolean = false;
		/**
		 * 过滤器项数据
		 */
		public dataList: FilterComponentItemVo[];
		/**
		 * 一级选择回调
		 */
		public callback1: CallBackHandler;
		/**
		 * 二级选择回调
		 */
		public callback2: CallBackHandler;
	}
}