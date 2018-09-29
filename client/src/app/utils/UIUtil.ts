/**
 * ui工具类
 */
class UIUtil
{
	/**
	 * 绑定列表数据源
	 */
	public static bindRender(group: eui.DataGroup, render: any, dataSource?: Array<any>): void
	{
		if (!group || !render)
		{
			return;
		}
		if (dataSource != undefined)
		{
			let bingData: eui.ArrayCollection = new eui.ArrayCollection(dataSource);
			group.dataProvider = bingData;
		}
		if (!group.itemRenderer)
		{
			if (render instanceof String)
			{
				group.itemRendererSkinName = render;
			}
			else if (render instanceof Function)
			{
				group.itemRenderer = render;
			}
		}
	}
	/**
	 * 列表项渲染
	 */
	public static listRenderer(list: eui.List, scroller: eui.Scroller, renderer: any, dir?: ScrollViewDirection, operation?: string, data?: Array<any>, useVirtualLayout: boolean = false)
	{
		if (!list || !scroller || !renderer)
		{
			game.Console.log("初始化失败！绑定的组件对象不能为空！");
			return;
		}
		if (dir != undefined && operation != undefined)
		{
			scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
			scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
			if (dir == ScrollViewDirection.Horizontal_L_R)
			{

				scroller.scrollPolicyH = operation;
			}
			else if (dir == ScrollViewDirection.Vertical_T_D)
			{
				scroller.scrollPolicyV = operation;
			}
		}
		else
		{
			scroller.scrollPolicyH = eui.ScrollPolicy.AUTO;
			scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
		}
		UIUtil.bindRender(list, renderer, data);
		list.useVirtualLayout = useVirtualLayout;
		scroller.viewport = list;
	}
	/**
	 * 滚动到指定的索引
	 */
	public static scrollToIndex(scroller: eui.Scroller, itemSize: number, selectIndex: number)
	{
		if (scroller && scroller.viewport)
		{
			let v: number = itemSize * selectIndex;
			if (scroller.scrollPolicyH != eui.ScrollPolicy.OFF)
			{
				scroller.viewport.scrollH = v;
			}
			if (scroller.scrollPolicyV != eui.ScrollPolicy.OFF)
			{
				scroller.viewport.scrollV = v;
			}
		}
	}
	/**
	 * 隐藏滚动条
	 */
	public static hideScrollerBar(scroller: eui.Scroller, h: boolean = true, v: boolean = true)
	{
		if (h && scroller && scroller.horizontalScrollBar)
		{
			scroller.horizontalScrollBar.autoVisibility = false;
			scroller.horizontalScrollBar.visible = false;
		}
		if (v && scroller && scroller.verticalScrollBar)
		{
			scroller.verticalScrollBar.autoVisibility = false;
			scroller.verticalScrollBar.visible = false;
		}
	}
	/**
	 * 获取水平布局
	 */
	public static getHTileLayout(hGap?: number, reqRc: number = 1, align: string = egret.HorizontalAlign.LEFT)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		ly.horizontalAlign = align;
		if (hGap != undefined)
		{
			ly.horizontalGap = hGap;
		}
		if (reqRc != undefined)
		{
			ly.requestedRowCount = reqRc;
		}
		return ly;
	}
	/**
	 * 获取垂直布局
	 */
	public static getVTileLayout(vGap?: number, reqCc: number = 1, align: string = egret.VerticalAlign.TOP)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		ly.verticalAlign = align;
		if (vGap != undefined)
		{
			ly.verticalGap = vGap;
		}
		if (reqCc != undefined)
		{
			ly.requestedColumnCount = reqCc;
		}
		return ly;
	}
	/**
	 * 获取网格布局
	 */
	public static getTileLayout(hGap?: number, vGap?: number, reqRc?: number, reqCc?: number, hAlign?: string, vAlign?: string)
	{
		let ly: eui.TileLayout = new eui.TileLayout();
		if (hGap != undefined)
		{
			ly.horizontalGap = hGap;
		}
		if (vGap != undefined)
		{
			ly.verticalGap = vGap;
		}
		if (reqRc != undefined)
		{
			ly.requestedRowCount = reqRc;
		}
		if (reqCc != undefined)
		{
			ly.requestedColumnCount = reqCc;
		}
		if (hAlign != undefined)
		{
			ly.horizontalAlign = hAlign;
		}
		if (vAlign != undefined)
		{
			ly.verticalAlign = vAlign;
		}
		return ly;
	}
	/**
	 * 获取性别图片资源
	 */
	public static getSexImgSource(sex: number): string
	{
		if (sex == Sex.Female)
		{
			return SheetSubName.FemaleImg;
		}
		else if (sex == Sex.Male)
		{
			return SheetSubName.MaleImg;
		}
		return game.StringConstants.Empty;
	}
	/**
	 * 对容器进行子项重排
	 */
	public static refreshSortContainer<T extends egret.DisplayObjectContainer, U extends egret.DisplayObjectContainer>(list: Array<T>, container: U)
	{
		if (container && list)
		{
			for (let i: number = 0; i < list.length; i++)
			{
				container.addChild(list[i]);
			}
		}
	}
	private static _imgList: Array<eui.Image> = new Array<eui.Image>();
	/**
	 * 图片缓存处理
	 */
	public static containerImgOper(container: egret.DisplayObjectContainer)
	{
		game.ArrayUtil.Clear(UIUtil._imgList);
		let numImg: eui.Image;
		for (let i: number = 0; i < container.numChildren; i++)
		{
			numImg = container.getChildAt(i) as eui.Image;
			if (numImg instanceof eui.Image)
			{
				numImg.source = "";
				UIUtil._imgList.push(numImg);
			}
		}
		container.removeChildren();
	}
	public static getExistImg(scaleX: number = 1, scaleY: number = 1): eui.Image
	{
		let img: eui.Image = UIUtil._imgList.pop();
		if (!img)
		{
			img = new eui.Image();
		}
		img.scaleX = scaleX;
		img.scaleY = scaleY;
		return img;
	}
	/**
	 * 获取数字颜色资源
	 */
	public static getNumImg(num: number, type: NumResType = NumResType.Red)
	{
		if (num >= 0 && num <= 9)
		{
			switch (type)
			{
				case NumResType.Red:
					return ResPrefixName.NumRed + num.toString() + ResSuffixName.PNG;
				case NumResType.Green:
					return ResPrefixName.NumGreen + num.toString() + ResSuffixName.PNG;
				case NumResType.Yellow:
					return ResPrefixName.NumYellow + num.toString() + ResSuffixName.PNG;
			}
		}
	}
	/**
	 * 显示头像
	 */
	public static ShowHead(img: eui.Image, source: string)
	{
		if (img)
		{
			if (source)
			{
				img.source = source;
			}
			else
			{
				img.source = SheetSubName.Default_Head_Male;
			}
		}
	}
	private static colorFilterList: Array<egret.ColorMatrixFilter>;
	private static colorFilter: egret.ColorMatrixFilter;
	public static setGlowerFilter(img: eui.UIComponent)
	{
		if (!UIUtil.colorFilterList)
		{
			UIUtil.colorFilterList = new Array<egret.ColorMatrixFilter>();
		}
		if (!UIUtil.colorFilter)
		{
			let colorMatrix = [
				1, 0, 0, 0, 10,
				0, 1, 0, 0, 10,
				0, 0, 1, 0, 10,
				0, 0, 0, 1, 0
			];
			UIUtil.colorFilter = new egret.ColorMatrixFilter(colorMatrix);
			UIUtil.colorFilterList[0] = UIUtil.colorFilter;
		}
		if (img)
		{
			img.filters = UIUtil.colorFilterList;
		}
	}
	private static emptyFilterList: Array<any> = [];
	public static clearFilters(img: eui.UIComponent)
	{
		if (img)
		{
			img.filters = UIUtil.emptyFilterList;
		}
	}
	/**
 	* 添加通知信息 该通知消息独占类型,类型不能重复,项目中仅能添加一次
	* target 附加红点的目标容器;
	* type 通知类型;
	*  top,right,红点相对位置，不填默认右上角
 	*/
	public static addSingleNotify(target: egret.DisplayObjectContainer, type: NotifyType, top?: number, right?: number, )
	{
		UIUtil.addNotify(target, type, undefined, top, right);
	}
	/**
	* 添加带参数的通知信息 通常该通知信息 同类型有多个红点，但是附加参数不一样 
	* target 附加红点的目标容器;
	* type 通知类型;
	* params 红点的附加参数;
	* top,right,红点相对位置，不填默认右上角
	 */
	public static addMultiNotify(target: egret.DisplayObjectContainer, type: NotifyType, params: any, top?: number, right?: number)
	{
		UIUtil.addNotify(target, type, params, top, right);
	}
	private static _notifyComponentMap: game.Map<string, NotifyComponent> = new game.Map<string, NotifyComponent>();
	private static addNotify(target: egret.DisplayObjectContainer, type: NotifyType, params?: any, top?: number, right?: number)
	{
		if (!type)
		{
			AlertManager.showAlert("添加红点类型不能为空！");
			return;
		}
		let info: NotifyInfo = new NotifyInfo();
		info.attachObject = target;
		info.top = top;
		info.right = right;
		info.type = type;
		info.params = params;

		let appendName: string = params ? type.toString() + "_" + params : type.toString();
		let searchName: string = "redPointComponent_unique" + appendName;
		let notifyComponent: NotifyComponent = UIUtil._notifyComponentMap.getValue(searchName);
		if (!notifyComponent)
		{
			notifyComponent = new NotifyComponent(UIComponentSkinName.NotifyComponent);
			UIUtil._notifyComponentMap.add(searchName, notifyComponent);
		}
		notifyComponent.init(info);
	}
	/**
	 * 设置有原形边框按钮 的边框变色
	 */
	public static setCircleBorderButtonFilter(target: eui.Button, color: number)
	{
		if (target["btnImg"])
		{
			game.FilterUtil.setColorFilters(target["btnImg"], color);
		}
	}
	/**
	 * 设置刷新列表项信息
	*/
	public static setListDpInfo(dp: eui.ArrayCollection, newSource: any[], propertyName: string, sort?: any)
	{
		if (newSource && newSource.length > 0)
		{
			for (let i: number = dp.source.length - 1; i >= 0; i--)
			{
				let flag: boolean = true;
				for (let j: number = newSource.length - 1; j >= 0; j--)
				{
					if (newSource[j][propertyName] == dp.source[i][propertyName])
					{
						dp.source[i] = newSource[j];  //更新旧数据在新数据中有的
						newSource.splice(j, 1);
						flag = false;
						break;
					}
				}
				if (flag)
				{
					dp.source.splice(i, 1);  //去除旧数据在新数据中没有的
				}
			}
			for (let i: number = 0; i < newSource.length; i++)
			{
				let flag: boolean = true;
				for (let j: number = 0; j < dp.source.length; j++)
				{
					if (dp.source[j][propertyName] == newSource[i][propertyName])
					{
						flag = false;
						break;
					}
				}
				if (flag)
				{
					dp.source.push(newSource[i]);  //写入新数据在旧数据中没有的
				}
			}
		} else
		{
			dp.source = [];
		}
		if (sort)
		{
			dp.source.sort(sort);  //排序
		}
		dp.refresh();
	}
	/**
	 * 写入列表项数据
	*/
	public static writeListInfo(list: eui.List, newSource: any[], propertyName?: string, isShareList: boolean = false, sort?: any)
	{
		if (!list.dataProvider)
		{
			if (sort)
			{
				list.dataProvider = new eui.ArrayCollection(newSource.sort(sort));
			} else
			{
				list.dataProvider = new eui.ArrayCollection(newSource);
			}
		}
		else
		{
			let listArray: eui.ArrayCollection = list.dataProvider as eui.ArrayCollection;
			if (!propertyName)
			{
				listArray.source = newSource;
				listArray.refresh();
				return;
			}
			if (isShareList)
			{
				listArray.source = [];
			}
			UIUtil.setListDpInfo(listArray, newSource, propertyName, sort);
		}
	}

	/**
	 * 播放龙骨动画
	 */
	public static playBoneAnime(name: string, parent: any, times: number = 0, timeScale: number = 1)
	{
		let info: BoneAnimeInfo = BoneAnimation.getFastAnimeByName(name);
		if (!info)
		{
			let oncomplete: Function = function (info: BoneAnimeInfo)
			{
				info.play(name, times, timeScale);
			}
			BoneAnimationCreater.CreateBoneAnimation(name, parent, times, timeScale, oncomplete);
		}
		else
		{
			info.state = BonePlayState.Play;
			info.play(name, times, timeScale);
		}
	}
	/**
	 * 停止龙骨动画
	 */
	public static stopBoneAnime(name: string)
	{
		let info: BoneAnimeInfo = BoneAnimation.getFastAnimeByName(name);
		if (info)
		{
			info.state = BonePlayState.Stop;
			info.stop();
		}
	}
	/**
	* 加载背景
	*/
	public static loadBg(url: string, img: eui.Image)
	{
		if (!url || !img)
		{
			game.Console.logError("加载背景异常！" + "url:" + url + "img:" + img);
			return;
		}
		url = ResPrefixPathName.Bg + url;
		let loadFunc: Function = async (url: string, img: eui.Image) =>
		{
			let data = await RES.getResAsync(url);
			img.source = data;
		};
		loadFunc(url, img);
	}
	/**
	 * 清理布局属性
	 */
	public static clearLayout(target: any)
	{
		target.top = NaN;
		target.bottom = NaN;
		target.left = NaN;
		target.right = NaN;
		target.horizontalCenter = NaN;
		target.verticalCenter = NaN;
	}
}
