/**
 * 牌局插槽组件
 */
class BaseGamblingSlotComponent extends BaseComponent<SlotLayerType>
{
	public layerType: SlotLayerType;
	public constructor(skinName: string, type: SlotLayerType)
	{
		super(skinName);
		this.layerType = type;
	}
}