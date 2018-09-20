/**
 * 引导文字说明组件
 */
class GuideTipsComponent extends BaseComponent<any>
{
    private static cacheList: Array<GuideTipsComponent> = new Array<GuideTipsComponent>();

    public numGroup: eui.Group;
    public numLabel: eui.Label;
    public circleBg:eui.Image;

    public arrowImg: eui.Image;
    public textLabel: eui.Label;
    public bg: eui.Image;
    private readonly _arrowGap: number = 15;
    private readonly _textGap: number = 30;
    private readonly _bgGap: number = 66;

    private readonly _roUp: number = 180;
    private readonly _roDown: number = 0;
    private readonly _roLeft: number = 90;
    private readonly _roRight: number = 270;

    private readonly _aw: number = 31;
    private readonly _ah: number = 23;

    private readonly _defaultBh: number = 66;
    public static get(): GuideTipsComponent
    {
        let component: GuideTipsComponent;
        if (GuideTipsComponent.cacheList.length > 0)
        {
            component = GuideTipsComponent.cacheList.pop();
        }
        else
        {
            component = new GuideTipsComponent(UIComponentSkinName.GuideTipsComponent);
        }
        component.alpha = 0;
        return component;
    }
    public constructor(skinName: string)
    {
        super(skinName);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        // qin.FilterUtil.setColorFilters(this.circleBg, 0xffffff);
    }
    public init(data: any)
    {
        super.init(data);
        let def: GuideStepDefinition = data.data as GuideStepDefinition;
        if (!def)
        {
            qin.Console.log("引导组件提示初始化异常！" + data);
            return;
        }

        this.alpha = 0;
        egret.Tween.removeTweens(this);

        if (def.delay > 0)
        {
            qin.Tick.AddTimeoutInvoke(this.show, def.delay, this);
        }
        else
        {
            this.show();
        }

        this.textLabel.text = def.data;
        this.bg.width = this.textLabel.width + this._textGap;
        let bh: number = this.textLabel.height + this._textGap;
        if (bh < this._defaultBh)
        {
            bh = this._defaultBh;
        }
        this.bg.height = bh;

        this.width = this.bg.width + this._bgGap;
        this.height = this.bg.height + this._bgGap;

        this.arrowImg.horizontalCenter = this.arrowImg.verticalCenter = this.arrowImg.top = this.arrowImg.bottom = this.arrowImg.left = this.arrowImg.right = undefined;
        this.arrowImg.x = this.arrowImg.y = 0;
        switch (def.orientation)
        {
            case GuideTipsOrientation.Up:
                this.arrowImg.rotation = this._roUp;
                this.arrowImg.top = this._ah - 6.5;
                break;
            case GuideTipsOrientation.Down:
                this.arrowImg.rotation = this._roDown;
                this.arrowImg.bottom = this._ah - 4;
                break;
            case GuideTipsOrientation.Left:
                this.arrowImg.rotation = this._roLeft;
                this.arrowImg.left = this._aw / 2 + 1.7;
                this.arrowImg.verticalCenter = 0;
                break;
            case GuideTipsOrientation.Right:
                this.arrowImg.rotation = this._roRight;
                this.arrowImg.right = this._aw / 2 + 2;
                this.arrowImg.verticalCenter = 0;
                break;
        }
        if (def.xoffset != undefined)
        {
            this.x = def.xoffset;
        }
        if (def.yoffset != undefined)
        {
            this.y = def.yoffset;
        }
        //设置箭头位置
        if (def.ax != undefined)
        {
            this.arrowImg.x = def.ax;
        }
        if (def.ay != undefined)
        {
            this.arrowImg.y = def.ay;
        }
        if (data.parent)
        {
            data.parent.addChild(this);
        }
        this.showNum();
    }
    /**
     * 显示序号
     */
    private showNum()
    {
        let def: GuideStepDefinition = this.bindData.data as GuideStepDefinition;
        if (def.num != undefined)
        {
            this.numGroup.visible = true;
            this.numLabel.text = def.num.toString();
            this.addChild(this.numGroup);
        }
        else
        {
            if (this.numGroup.parent)
            {
                this.numGroup.parent.removeChild(this.numGroup);
            }
        }
    }
    private show()
    {
        let tween: egret.Tween = egret.Tween.get(this);
        tween.to({ alpha: 1 }, 500).call(() =>
        {
            let def: GuideStepDefinition = this.bindData.data as GuideStepDefinition;
            if (def && def.showTime > 0)
            {
                qin.Tick.AddTimeoutInvoke(this.disappear, def.showTime, this);
            }
        }, this);
    }
    private disappear()
    {
        let tween: egret.Tween = egret.Tween.get(this);
        tween.to({ alpha: 0 }, 500);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
    }
	/**
	 * 如果没有必要，面板的所有事件移除需写在此方法内
	 */
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        qin.Tick.RemoveTimeoutInvoke(this.show, this);
        qin.Tick.RemoveTimeoutInvoke(this.disappear, this);
        egret.Tween.removeTweens(this);
    }
    public destroy()
    {
        super.destroy();
        if (this.parent)
        {
            this.parent.removeChild(this);
        }
        this.alpha = 1;
        this.bindData = undefined;
        GuideTipsComponent.cacheList.push(this);
    }
    public static clear()
    {
        GuideTipsComponent.cacheList.length = 0;
    }
}
