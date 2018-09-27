/**
 * 活动子表基类定义
 */
interface IBaseActivitySubDefnition
{
	/**
	 * 活动id
	 */
	Id?:(number|null);
	/**
	 * 子id
	 */
	SubId?:(number|null);
	/**
	 * 子表里面的活动ID
	 */
	ActivityId?:(number|null);
}