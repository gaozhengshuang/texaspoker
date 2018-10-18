/**
 * 带有选项组件
 */
class TabComponent extends BaseComponent<any>
{
    public tabGroup: eui.Group;
    private _tabInfoList: Array<TabInfo> = new Array<TabInfo>();
    private tabSkinName: string;
    private _stackY: number;

    public _radioButtonGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
    /**
     * 当前选项
     */
    public selectIndex: number;
    /**
     * 上次选项
     */
    public lastSelectIndex: number;
    /**
     * 是否开启缓动
     */
    public isTween: boolean = true;

    // private static readonly defaultColor: number = 0x53bae4;
    // private static readonly selectColor: number = 0xffffff;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
    }
    /**
     * onAwake方法里调用
     */
    public build(data: TabComponentData)
    {
        this.bindData = data;
        if (data.groupList == null || data.nameList == null)
        {
            game.Console.log("传入数据为空");
            return;
        }
        if (data.groupList[0])
        {
            this._stackY = data.groupList[0].y;
        }
        if (data.tabSkinName)
        {
            switch (data.tabSkinName)
            {
                case TabButtonType.SmallOf2:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton2;
                    break;
                case TabButtonType.SmallOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton3;
                    break;
                case TabButtonType.SmallOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton4;
                    break;
                case TabButtonType.SmallOf5:
                    this.tabSkinName = UIComponentSkinName.TabComponentButton5;
                    break;
                case TabButtonType.XSmallOf5:
                    this.tabSkinName = UIComponentSkinName.TabComponentButtonSm5;
                    break;
                case TabButtonType.BigOf2:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig2;
                    break;
                case TabButtonType.BigOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig3;
                    break;
                case TabButtonType.BigOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig4;
                    break;
                case TabButtonType.SubOf2:
                    this.tabSkinName = UIComponentSkinName.rankTabComponentButton2;
                    break;
                case TabButtonType.SubOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentSubBtn3;
                    break;
                case TabButtonType.SubOf4:
                    this.tabSkinName = UIComponentSkinName.laBaRankTabComponentBtn4;
                    break;
                case TabButtonType.HappyGiftOf4:
                    this.tabSkinName = UIComponentSkinName.happyGiftTabtButton4;
                    break;
                case TabButtonType.HappyGiftOf2:
                    this.tabSkinName = UIComponentSkinName.happyGiftTabtButton2;
                    break;
                case TabButtonType.LaBa2:
                    this.tabSkinName = UIComponentSkinName.laBaTabCompontBtn2;
                    break;
                case TabButtonType.InviteSmallOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentInviteBtn3;
                    break;
                case TabButtonType.InviteSmallOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentInviteBtn4;
                    break;
            }
            for (let i: number = 0; i < data.nameList.length; i++)
            {
                let info: TabInfo = new TabInfo();
                info.group = data.groupList[i];
                info.group.visible = false;
                info.tabButton = new eui.RadioButton();
                info.tabButton.skinName = this.tabSkinName;
                info.tabButton.label = data.nameList[i];
                info.tabButton.selected = false;
                let label: eui.Label = info.tabButton.labelDisplay as eui.Label;
                //label.textColor = TabComponent.defaultColor;
                info.tabButton.group = this._radioButtonGroup;
                this._tabInfoList.push(info);
                this.tabGroup.addChild(info.tabButton);
            }
        }
        this.y++;
    }
    /**
     * 更新
    */
    public update(data: TabComponentData, index: number = 0)
    {
        this.clear();
        this.build(data);
        this.init(index);
    }
    /**
     * 清除
    */
    public clear()
    {
        game.ArrayUtil.Clear(this._tabInfoList);
        if (this.tabGroup.numChildren > 0)
        {
            this.tabGroup.removeChildren();
        }
    }
    /**
     * init方法里调用
     * {enterTabindex: number, tabIndex ?: number[], flag ?:boolean}
     */
    public init(param: any)
    {
        super.init(param);
        if (typeof param == "number")
        {
            this.setSelectIndex(param);
        }
        else
        {
            this.setSelectIndex(param.enterTabindex);
            if (param.tabIndex && param.flag)
            {
                this.setEnableTabIndex(param.enableTabIndex, param.flag);
            }
        }
        this.setEnterAnime(this._tabInfoList[this.selectIndex].group);
    }

    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBarItemTap, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBarItemTap, this);
        egret.Tween.removeTweens(this.tabGroup);
        for (let info of this._tabInfoList)
        {
            egret.Tween.removeTweens(info.group);
        }
    }

    private onBarItemTap(e: egret.TouchEvent)
    {
        if (this.tabGroup.getChildIndex(e.target) == this.selectIndex || this.tabGroup.getChildIndex(e.target) == -1)
        {
            return;
        }
        SoundManager.playEffect(MusicAction.buttonClick);
        this.setSelectIndex(this.tabGroup.getChildIndex(e.target));
    }
    /**
     * 设置选中某个选项
     */
    public setSelectIndex(idx: number)
    {
        if (idx == undefined)
        {
            idx = 0;
        }
        if (this.selectIndex != undefined)
        {
            this._tabInfoList[this.selectIndex].group.visible = false;
            this._tabInfoList[this.selectIndex].tabButton.selected = false;
            let label: eui.Label = this._tabInfoList[this.selectIndex].tabButton.labelDisplay as eui.Label;
            //label.textColor = TabComponent.defaultColor;
        }
        this._tabInfoList[idx].group.visible = true;
        this._tabInfoList[idx].tabButton.selected = true;
        let label: eui.Label = this._tabInfoList[idx].tabButton.labelDisplay as eui.Label;
        //label.textColor = TabComponent.selectColor;
        this.lastSelectIndex = this.selectIndex;
        this.selectIndex = idx;
        this.tabChangeEvent.dispatch(idx);
    }
    /**
     * 禁用/启用某个选项卡
     */
    public setEnableTabIndex(indexList: number[], flag: boolean)
    {
        for (let num of indexList)
        {
            let button: eui.ToggleButton = this._tabInfoList[num].tabButton;
            if (flag)
            {
                // game.FilterUtil.setDefault(button);
            }
            else
            {
                // game.FilterUtil.setGray(button);
            }
            button.touchEnabled = flag;
        }
    }

    /**
     * 通过group设置选中选项
     */
    public setEnterTabGroup(item: eui.Group)
    {
        if (!this.bindData)
        {
            game.Console.log("传入数据为空");
            return;
        }
        for (let i = 0; i < this.bindData.groupList.length; i++)
        {
            if (this.bindData[i] == item)
            {
                this.selectIndex = i;
                break;
            }
        }
        this.setSelectIndex(this.selectIndex);
    }
    private setEnterAnime(targetStack: eui.Group)
    {
        if (this.isTween)
        {
            this.tabGroup.scaleX = 0;
            this.tabGroup.scaleY = 0;
            egret.Tween.get(this.tabGroup).wait(100).to({ scaleX: 1, scaleY: 1 }, 200);
            targetStack.y = GameManager.stage.stageHeight;
            egret.Tween.get(targetStack).wait(200).to({ y: this._stackY }, 200);
        }
    }

    public static CreatData(nameList: Array<string>, groupList: Array<eui.Group>, skinName: TabButtonType, disableTabDes?: string): TabComponentData
    {
        let resultData: TabComponentData = new TabComponentData();
        resultData.nameList = nameList;
        resultData.groupList = groupList;
        resultData.tabSkinName = skinName;
        resultData.disableTabDes = disableTabDes;
        return resultData;
    }
    public getBtnByLabel(label: string): eui.RadioButton
    {
        if (this._tabInfoList)
        {
            for (let info of this._tabInfoList)
            {
                if (info.tabButton && info.tabButton.label == label)
                {
                    return info.tabButton;
                }
            }
        }
        return null;
    }
    public getBtnByIndex(index: number): eui.RadioButton
    {
        if (this._tabInfoList)
        {
            return this._tabInfoList[index].tabButton;
        }
        return null;
    }
    /**
     * 选项卡改变事件
     */
    public tabChangeEvent: game.DelegateDispatcher = new game.DelegateDispatcher();
}

class TabComponentData
{
    /**
    * 数据列表
    */
    public nameList: Array<string>;
    public groupList: Array<eui.Group>;
    /**
     * 皮肤名
     */
    public tabSkinName: TabButtonType;
    /**
     * 禁用提示
     */
    public disableTabDes: string;
}
class TabInfo
{
    /**
     * 关联的group
     */
    public group: eui.Group;
    /**
     * 选项卡按钮
     */
    public tabButton: eui.RadioButton;
}