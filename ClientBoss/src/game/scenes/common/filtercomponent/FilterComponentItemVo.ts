module game {
	/**
	 * 过滤组件项数据
	 */
	export class FilterComponentItemVo {
		/**
 		* 标识
 		*/
		public id: number;
		/**
		 * 过滤器类型
		 */
		public type: FilterComponentType;
		/**
		 * 描述
		 */
		public des: string;
		/**
		 * 子列表
		 */
		public subList: FilterComponentItemVo[];
	}
	/**
 	* 过滤器组件类型
 	*/
	export enum FilterComponentType {
		None = 0,
		/**
		 * 一级
		 */
		First = 1,
		/**
		 * 二级类型
		 */
		Second = 2,
	}
}