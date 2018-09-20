/**
 * 场景信息
 */
class SceneInfo
{
	constructor(type: SceneType, extendData: any)
	{
		this.type = type;
		this.extendData = extendData;
	}
	/**
 	* 当前场景类型
 	*/
	public type: SceneType;
	/**
	 * 附加数据
	 */
	public extendData: any;
}