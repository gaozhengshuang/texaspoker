/**
 * 密码组件(6位)/使用时注意:若传入{isNotMaskKeyPanel:true}时要时刻注意关闭UIModuleName.KeyBoardPanel
 * 本组件的可点击部件只能是this
 */
class PwdComponent extends BaseComponent<any>
{
    public pwdInput: qin.DelegateDispatcher = new qin.DelegateDispatcher();
    public numGroup: eui.Group;
    public inputSelectLabel: eui.Label;
    private _numComList: Array<NumComponent>
    private _isNotMaskKeyPanel: false;// =true时 要时刻注意关闭UIModuleName.KeyBoardPanel
    private _isOpenKeyPanel: boolean = false;
    private _isSelect: boolean = false;
    private _isInit: boolean = false;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this._numComList = new Array<NumComponent>();
        for (let i: number = 1; i <= 6; i++)
        {
            let com = new NumComponent(UIComponentSkinName.NumComponent);
            this._numComList.push(com);
            this.numGroup.addChild(com);
        }
        if (this._isInit)
        {
            this.refresh();
        }

        //一定要有,本组件的可点击部件只能是this,其余都不能设为可点击
        this.touchChildren = false;
    }

    public init(data: any)
    {
        super.init(data)
        this._isInit = true;
        this._isNotMaskKeyPanel = false;
        this._isSelect = false;
        if (data)
        {
            if (data.isNotMaskKeyPanel)
            {
                this._isNotMaskKeyPanel = data.isNotMaskKeyPanel;
            }
            if (data.isSelect)
            {
                this._isSelect = true;
            }
        }
        if (this.isLoadComplete)
        {
            this.refresh();
        }
    }
    private refresh()
    {
        if (this._numComList && this._numComList.length > 0)
        {
            this.inputSelectLabel.size = this._numComList[0].label1.size;
        }
        if (this._isOpenKeyPanel)
        {
            this.setInputSelectLabel();
        }
        else
        {
            this.inputSelectLabel.visible = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
        }
        if (this.bindData)
        {
            if (!this.bindData.numList)
            {
                this.resetLabel();
            }
        }
        else
        {
            this.resetLabel();
        }
        if (this._isSelect)
        {
            this.openPwdPanel();
        }
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPwdPanel, this);
        UIManager.onPanelCloseEvent.addListener(this.panelClose, this);
        UIManager.addEventListener(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.onKeyTargetInit, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openPwdPanel, this);
        UIManager.onPanelCloseEvent.removeListener(this.panelClose, this);
        UIManager.removeEventListener(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.onKeyTargetInit, this);
        egret.Tween.removeTweens(this.inputSelectLabel);
    }
    private panelClose(name: string)
    {
        if (name == UIModuleName.KeyBoardPanel)
        {
            this._isOpenKeyPanel = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
        }
    }
    private onKeyTargetInit(data: any)
    {
        if (data != this && this._isOpenKeyPanel)
        {
            this._isOpenKeyPanel = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
        }
    }
    private openPwdPanel()
    {
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.enterPwd, target: this, isNotHasMask: this._isNotMaskKeyPanel });
        this._isOpenKeyPanel = true;
        this.setInputSelectLabel();
    }
    /**-
     * 重置密码框内容
    */
    private resetLabel()
    {
        if (this._numComList)
        {
            for (let childLabel of this._numComList)
            {
                childLabel.refresh();
            }
        }
    }
    /**
     * 输入密码
    */
    private enterPwd(type: number, num?: string)
    {
        if (type == 1)  //键盘数字键按下
        {
            if (num)
            {
                let label: NumComponent = this.getUnWriteLabel();
                if (label)
                {
                    label.refresh(parseInt(num));
                }
                this.setInputSelectLabel();
            }
        }
        else if (type == 2)  //键盘删除键按下
        {
            let delLabel: NumComponent = this.getWirteLabel();
            if (delLabel)
            {
                delLabel.refresh();
            }
            this.setInputSelectLabel();
        }
        else if (type == 3)  //键盘清除键按下
        {
            this.resetLabel();
            this.setInputSelectLabel();
        }
        else if (type == 4) //关闭
        {
            egret.Tween.removeTweens(this.inputSelectLabel);
            this.inputSelectLabel.visible = false;
            this._isOpenKeyPanel = false;
        }
        this.pwdInput.dispatch();
    }
    /**
     * 设置交点效果
     */
    private setInputSelectLabel()
    {
        if (!this.inputSelectLabel)
        {
            return;
        }
        let index = this.getPwd().length;
        if (index < 0)
        {
            index = 0;
        }
        if (this._numComList && this._numComList.length > index)
        {
            let pos = this._numComList[index];
            this.inputSelectLabel.visible = true;
            pos.addChild(this.inputSelectLabel);
            egret.Tween.removeTweens(this.inputSelectLabel);
            let tween = egret.Tween.get(this.inputSelectLabel, { loop: true });
            this.inputSelectLabel.alpha = 1;
            this.inputSelectLabel.x = pos.width / 2 - this.inputSelectLabel.width / 2;
            this.inputSelectLabel.y = pos.height / 2 - this.inputSelectLabel.height / 2;
            tween.to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
            tween.play();
        }
        else
        {
            this.inputSelectLabel.visible = false;
            egret.Tween.removeTweens(this.inputSelectLabel);
        }
    }
    private getUnWriteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = 0; i < this._numComList.length; i++)
        {
            label = this._numComList[i];
            if (label.label1 && !label.label1.text)
            {
                return label;
            }
        }
        return null;
    }
    private getWirteLabel(): NumComponent
    {
        let label: NumComponent;
        for (let i: number = this._numComList.length - 1; i >= 0; i--)
        {
            label = this._numComList[i];
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
    public getPwd(): string
    {
        let str: string = qin.StringConstants.Empty;
        if (!this._numComList)
        {
            return str;
        }
        for (let i: number = 0; i < this._numComList.length; i++)
        {
            if (!qin.StringUtil.isNullOrEmpty(this._numComList[i].label1.text))
            {
                str += this._numComList[i].label1.text;
            }
            else
            {
                return str;
            }
        }
        return str;
    }
    public isTarget(target: any): boolean
    {
        if (target == this)
        {
            return true;
        }
        return false;
    }
}
