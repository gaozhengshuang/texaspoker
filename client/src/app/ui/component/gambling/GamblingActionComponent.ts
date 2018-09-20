/**
 * 操作组件
 */
class GamblingActionComponent extends BaseComponent<PlayerState>
{
	public brightCardBtn: eui.ToggleButton;
	public immediatelyBrightCardBtn: GameButton;
	public checkOrDropBtn: eui.ToggleButton;
	public callAnyBtn: eui.ToggleButton;
	public autoCheckBtn: eui.ToggleButton;  //自动跟注
	public preCallBtn: eui.ToggleButton;  //预跟注

	public preActionGroup: eui.Group;


	public raiseGroup: eui.Group;
	public oneOfThreeBtn: GameButton;
	public oneOfTwoBtn: GameButton;
	public twoOfThreeBtn: GameButton;
	public oneBtn: GameButton;

	public actionGroup: eui.Group;
	public raiseBtn: GameButton;
	public foldBtn: GameButton;
	public callBtn: GameButton;  //过牌
	public checkBtn: GameButton;  //跟注

	public centerPointComponent: eui.ToggleButton;

	private _initPosMap: qin.Dictionary<egret.DisplayObject, egret.Point>;
	private _centerPoint: egret.Point;

	protected onAwake(event: eui.UIEvent)
	{
		super.onAwake(event);
		this._initPosMap = new qin.Dictionary<egret.DisplayObject, egret.Point>();
		this._appearMap = new qin.Dictionary<egret.DisplayObject, BaseAnimation<egret.DisplayObject>>();
		this._disappearMap = new qin.Dictionary<egret.DisplayObject, BaseAnimation<egret.DisplayObject>>();

		let btnSize: number = 102;
		this.moveAnchorOffset(this.brightCardBtn, btnSize, btnSize);
		this.moveAnchorOffset(this.immediatelyBrightCardBtn, btnSize, btnSize);
		this._initPosMap.add(this.brightCardBtn, new egret.Point(this.brightCardBtn.x, this.brightCardBtn.y));
		this._initPosMap.add(this.immediatelyBrightCardBtn, new egret.Point(this.immediatelyBrightCardBtn.x, this.immediatelyBrightCardBtn.y));

		this.moveAnchorOffset(this.centerPointComponent, btnSize, btnSize);


		this.addGroupChilrenPos(this.preActionGroup, btnSize, btnSize);
		this.addGroupChilrenPos(this.raiseGroup, 88, 90);
		this.addGroupChilrenPos(this.actionGroup, btnSize, btnSize);

		this._centerPoint = new egret.Point();
		this._centerPoint.x = this.centerPointComponent.x;
		this._centerPoint.y = this.centerPointComponent.y;
	}

	public init(data: PlayerState)
	{
		super.init(data);
		this._disappearMap.foreach(this.resetDisapperaRunOver, this);
		this._appearMap.foreach(this.resetApperaRunOver, this);
	}
	private resetDisapperaRunOver(target: egret.DisplayObject, value: BaseAnimation<egret.DisplayObject>)
	{
		if (value instanceof ActionButtonDisappear)
		{
			value.isRunOver = true;
		}
		else if (value instanceof OneKeyButtonDisappear)
		{
			value.isRunOver = true;
		}
	}
	private resetApperaRunOver(target: egret.DisplayObject, value: BaseAnimation<egret.DisplayObject>)
	{
		if (value instanceof ActionButtonAppear)
		{
			value.isRunOver = true;
		}
	}
	protected rendererStart(event: egret.Event)
	{
		super.rendererStart(event);
		let child: egret.DisplayObject;
		let initPoint: egret.Point;
		for (let i: number = 0; i < this.raiseGroup.numChildren; i++)
		{
			child = this.raiseGroup.getChildAt(i);
			initPoint = this._initPosMap.getValue(child);
			child.x = initPoint.x;
			child.y = initPoint.y;
		}
	}
	private addGroupChilrenPos(group: eui.Group, width: number, height: number)
	{
		let child: egret.DisplayObject;
		let tmpHeight: number;

		for (let i: number = 0; i < group.numChildren; i++)
		{
			child = group.getChildAt(i);
			tmpHeight = height;
			if (child === this.raiseBtn)
			{
				tmpHeight = 111;
			}
			this.moveAnchorOffset(child, width, tmpHeight);
			this._initPosMap.add(child, new egret.Point(child.x, child.y));
		}
	}
	private moveAnchorOffset(target: egret.DisplayObject, width: number, height: number)
	{
		target.anchorOffsetX = width / 2;
		target.anchorOffsetY = height / 2;

		target.x += width / 2;
		target.y += height / 2;
	}
	public hideAll(isTween: boolean)
	{
		if (isTween)
		{
			this.showRaiseGroup(false);
			this.showActionGroup(false);
		}
		else
		{
			this.raiseGroup.visible = false;
			this.actionGroup.visible = false;
		}
	}
	public hidePreActionGroup(isTween: boolean)
	{
		if (isTween)
		{
			this.showPreActionGroup(false);
		}
		else
		{
			this.preActionGroup.visible = false;
		}
	}
	/**
	 * 显示快捷加注
	 */
	public showRaiseGroup(flag: boolean)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag)
		{
			return;
		}
		if (flag && this.raiseGroup.visible)
		{
			return;
		}
		if (!flag && !this.raiseGroup.visible)
		{
			return;
		}
		if (flag)
		{
			this.raiseGroup.visible = flag;
		}

		let child: egret.DisplayObject;
		let delay: number = 50;
		for (let i: number = 0; i < this.raiseGroup.numChildren; i++)
		{
			child = this.raiseGroup.getChildAt(i);
			if (flag)
			{
				let appearAnimation: OneKeyButtonAppear = this.getAnimation(child, flag, OneKeyButtonAppear) as OneKeyButtonAppear;
				appearAnimation.run(i * delay);
			}
			else
			{
				let disAnimation: OneKeyButtonDisappear = this.getAnimation(child, flag, OneKeyButtonDisappear) as OneKeyButtonDisappear;
				if (i == this.raiseGroup.numChildren - 1)
				{
					disAnimation.run(i * delay, this.raiseGroup);
				}
				else
				{
					disAnimation.run(i * delay, null);
				}
			}
		}
	}
	/**
	 * 显示亮牌
	 */
	public showBrightButton(flag: boolean)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag)
		{
			return;
		}
		this.runActionChild(this.brightCardBtn, flag);
	}
	/**
	 * 显示立即亮牌
	 */
	public showImmediatelyBrightCardBtn(flag: boolean)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag)
		{
			return;
		}
		this.runActionChild(this.immediatelyBrightCardBtn, flag);
	}
	/**
	 * 显示预操作按钮
	 */
	public showPreActionGroup(flag: boolean)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag)
		{
			return;
		}
		this.runActionGroup(this.preActionGroup, flag);
		if (flag)
		{
			this.preCallBtn.visible = false;
			this.autoCheckBtn.visible = false;
			if (GamblingUtil.isCanCheck) //是否可以自动过牌
			{
				this.autoCheckBtn.visible = true;
			} else if (GamblingUtil.isNeedAllIn) //是否需要allin
			{
				this.preCallBtn.visible = true;
				this.preCallBtn.label = qin.MathUtil.formatNum(GamblingManager.self.bankRoll);
			}
			else if (GamblingUtil.callNum > 0) //需要跟注
			{
				this.preCallBtn.visible = true;
				this.preCallBtn.label = qin.MathUtil.formatNum(GamblingUtil.callNum);
			}
		}
	}
	/**
	 * 显示操作按钮
	 */
	public showActionGroup(flag: boolean)
	{
		if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.isTrusteeship && flag)
		{
			return;
		}
		this.runActionGroup(this.actionGroup, flag);
	}
	/**
	 * 跑一组动画
	 */
	private runActionGroup(group: eui.Group, flag: boolean)
	{
		if (flag && group.visible)
		{
			return;
		}
		if (!flag && !group.visible)
		{
			return;
		}
		if (flag)
		{
			group.visible = flag;
		}
		let targetPoint: egret.Point;

		let child: egret.DisplayObject;
		for (let i: number = 0; i < group.numChildren; i++)
		{
			child = group.getChildAt(i);
			this.runActionChild(child, flag, group);
		}
	}
	/**
	 * 跑动画
	 */
	public runActionChild(child: egret.DisplayObject, flag: boolean, parent?: eui.Group)
	{
		let disAnimation: ActionButtonDisappear;
		let appearAnimation: ActionButtonAppear;
		if (flag)
		{
			appearAnimation = this.getAnimation(child, flag, ActionButtonAppear) as ActionButtonAppear;
			appearAnimation.run(this._centerPoint, this._initPosMap.getValue(child));

			disAnimation = this.getAnimation(child, false, ActionButtonDisappear) as ActionButtonDisappear;
			disAnimation.isRunOver = true;
		}
		else
		{

			disAnimation = this.getAnimation(child, flag, ActionButtonDisappear) as ActionButtonDisappear;
			disAnimation.run(this._initPosMap.getValue(child), this._centerPoint, parent);

			appearAnimation = this.getAnimation(child, true, ActionButtonAppear) as ActionButtonAppear;
			appearAnimation.isRunOver = true;
		}
	}

	private _appearMap: qin.Dictionary<egret.DisplayObject, BaseAnimation<egret.DisplayObject>>;
	private _disappearMap: qin.Dictionary<egret.DisplayObject, BaseAnimation<egret.DisplayObject>>;
	private getAnimation(target: egret.DisplayObject, flag: boolean, cls: any): BaseAnimation<egret.DisplayObject>
	{
		let animation: BaseAnimation<egret.DisplayObject>;
		if (flag)
		{
			animation = this._appearMap.getValue(target);
			if (!animation)
			{
				animation = new cls();
				animation.target = target;
				this._appearMap.add(target, animation);
			}
		}
		else
		{
			animation = this._disappearMap.getValue(target);
			if (!animation)
			{
				animation = new cls();
				animation.target = target;
				this._disappearMap.add(target, animation);
			}
		}
		return animation;
	}
}