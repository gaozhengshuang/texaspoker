/**
 * 筹码组件相关缓存处理
 */
class ChipsPot
{
	private static _componentList: Array<ChipsShowComponent> = new Array<ChipsShowComponent>();

	private static _imgList: Array<eui.Image> = new Array<eui.Image>();
	/**
	 * 存入一个筹码图片
	 */
	public static pushImg(img: eui.Image)
	{
		if (img)
		{
			if (ChipsPot._imgList.indexOf(img) == -1)
			{
				img.x = img.y = 0;
				img.alpha = 1;
				ChipsPot._imgList.push(img);
			}
		}
	}
	/**
	 * 抛出一个筹码图片
	 */
	public static popImg(source?: string): eui.Image
	{
		if (source == undefined)
		{
			return new eui.Image();
		}
		let img: eui.Image;
		for (let i: number = 0; i < ChipsPot._imgList.length; i++)
		{
			img = ChipsPot._imgList[i];
			if (img.source == source)
			{
				ChipsPot._imgList.splice(i, 1);
				return img;
			}
		}
		return new eui.Image(source);
	}
	/**
	 * 存入一个筹码显示组件
	 */
	public static pushComponent(component: ChipsShowComponent)
	{
		if (component)
		{
			if (ChipsPot._componentList.indexOf(component) == -1)
			{
				ChipsPot._componentList.push(component);
			}
		}
	}
	/**
	 * 抛出一个筹码显示组件
	 */
	public static popComponent()
	{
		let component: ChipsShowComponent = ChipsPot._componentList.pop();
		if (!component)
		{
			component = new ChipsShowComponent(UIComponentSkinName.ChipsShowComponent);
		}
		return component;
	}
}