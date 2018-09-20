/**
 * 进入私人房输入密码面板
*/
class EnterRoomPwdPanel extends BasePanel
{
    /**
    * 输入密码显示组
   */
    protected labelGroup: eui.Group;

    protected label1: NumComponent;
    protected label2: NumComponent;
    protected label3: NumComponent;
    protected label4: NumComponent;
    protected label5: NumComponent;
    protected label6: NumComponent;

    protected _labelList: Array<NumComponent>;

    protected callback: Function;
    private _isShowKeyBoardPanel: boolean = true;

    public constructor(flag: boolean)
    {
        super();
        for (let i: number = 1; i <= 6; i++)
        {
            this["label" + i.toString()] = new NumComponent(UIComponentSkinName.NumComponent);
        }
        if (!flag)
        {
            this.setSkinName(UIModuleName.EnterRoomPwdPanel);
        }
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this._labelList = new Array<NumComponent>();
        for (let i: number = 1; i <= 6; i++)
        {
            this._labelList.push(this["label" + i.toString()]);
            this.labelGroup.addChild(this["label" + i.toString()]);
        }
        this.setAlignInfo(PanelAlignType.Center_Center, 0, -100);
        this.callback = this.enterPwd;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        //重置
        this.resetLabel();
        if (this._isShowKeyBoardPanel)
        {
            UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: true, isNotHasMask: true });
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        GamblingManager.OnGetRoomInfoEvent.addListener(this.onCloseBtnClickHandler, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        GamblingManager.OnGetRoomInfoEvent.removeListener(this.onCloseBtnClickHandler, this);
    }
    /**
     * 设置是否默认打开键盘面板
    */
    protected set isShowKeyBoardPanel(value: boolean)
    {
        this._isShowKeyBoardPanel = value;
    }
    /**
     * 关闭面板
    */
    protected onCloseBtnClickHandler(event: egret.TouchEvent): void
    {
        PlayingFieldManager.onCloseKeyboardEvent.dispatch();
        this.resetLabel();
        super.onCloseBtnClickHandler(event);
    }
    /**
     * 重置密码框内容
    */
    protected resetLabel()
    {
        for (let childLabel of this._labelList)
        {
            childLabel.refresh();
        }
    }
    /**
     * 输入密码
    */
    protected enterPwd(type: KeyBoardKeyType, num?: string)
    {
        if (num)
        {
            let label: NumComponent = this.getUnWriteLabel();
            if (label)
            {
                label.refresh(parseInt(num));
            }
        }
        if (type == KeyBoardKeyType.Number)  //键盘数字键按下
        {
            let str: string = this.getRoomPwd();
            if (str.length > 5)
            {
                GamblingManager.reqEnterRoom(parseInt(this.panelData), str);
            }
        } else if (type == KeyBoardKeyType.Del)  //键盘删除键按下
        {
            let delLabel: NumComponent = this.getWirteLabel();
            if (delLabel)
            {
                delLabel.refresh();
            }
        } else if (type == KeyBoardKeyType.Reset)  //键盘清除键按下
        {
            this.resetLabel();
        }
    }
    protected getUnWriteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = 0; i < this._labelList.length; i++)
        {
            label = this._labelList[i];
            if (label.label1 && !label.label1.text)
            {
                return label;
            }
        }
        return null;
    }
    protected getWirteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = this._labelList.length - 1; i >= 0; i--)
        {
            label = this._labelList[i];
            if (label.label1 && label.label1.text)
            {
                return label;
            }
        }
        return null;
    }
    /**
     * 获得密码
    */
    protected getRoomPwd()
    {
        let str: string = qin.StringConstants.Empty;
        for (let i: number = 0; i < this._labelList.length; i++)
        {
            str += this._labelList[i].label1.text;
        }
        return str;
    }
}