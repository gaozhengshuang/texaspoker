/**
 * 键盘面板
 */
class KeyBoardPanel extends BasePanel
{
    /**
     * 数字键盘按钮
    */
    public numBtn0: eui.Button;
    public numBtn1: eui.Button;
    public numBtn2: eui.Button;
    public numBtn3: eui.Button;
    public numBtn4: eui.Button;
    public numBtn5: eui.Button;
    public numBtn6: eui.Button;
    public numBtn7: eui.Button;
    public numBtn8: eui.Button;
    public numBtn9: eui.Button;
    public resetBtn: eui.Button;
    public delBtn: eui.Button;
    private _btnList: Array<eui.Button>;
    private keyboardGroup: eui.Group;
    private anmGroup: eui.Group;
    public panelBottom: eui.Group;
    private bgImg: eui.Image;
    /**
     * 遮罩是不是不可以点击  默认可点击 false
    */
    private isbgNotCanClick: boolean;
    /**
     * 遮罩是不是不显示  默认显示 false
    */
    private isNotHasMask: boolean;
    /**
     * 键盘类型  数字键按下 type 1   删除 type 2  重输 type 3  关闭 type 4
    */
    private type: KeyBoardKeyType;
    /**
     * 输入框标记
    */
    private searchLabelFlag: any;
    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.KeyBoardPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0.1;
        this._btnList = new Array<eui.Button>();
        for (let i: number = 0; i <= 9; i++)
        {
            this._btnList.push(this["numBtn" + i.toString()]);
        }
        UIManager.pushResizeGroup(this.panelBottom);
    }
    public init(appendData: any)
    {
        super.init(appendData);
        if (this.panelData && this.panelData.target)
        {
            UIManager.dispatchEvent(UIModuleName.KeyBoardPanel, UIModuleEvent.OnCallTargetInit, this.panelData.target);
        }
        this.isbgNotCanClick = false;
        this.isNotHasMask = false;
        this.searchLabelFlag = "";
        if (this.panelData.isbgNotCanClick == true)
        {
            this.isbgNotCanClick = true;
        }
        if (this.panelData.isNotHasMask == true)
        {
            this.isNotHasMask = true;
        }
        if (this.isNotHasMask)
        {
            this.setGrayMask(false);
        } else
        {
            this.maskAlpha = 0;
        }
        if (this.panelData.searchLabelFlag)
        {
            this.searchLabelFlag = this.panelData.searchLabelFlag;
        }
        this.anmGroup.bottom = -502;
        egret.Tween.removeTweens(this.anmGroup);
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);

        enter.to({ bottom: 0 }, 200);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.addListener(this.immediatelyClose, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.keyboardClickHandler, this);
        PlayingFieldManager.onCloseKeyboardEvent.removeListener(this.immediatelyClose, this);
    }
    /**
     * 直接关闭
    */
    public immediatelyClose()
    {
        this.anmGroup.bottom = -502;
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    }
    /**
     * 退场动画
    */
    private outAnime()
    {
        let enter: egret.Tween = egret.Tween.get(this.anmGroup);
        this.anmGroup.bottom = 0;
        enter.to({ bottom: -502 }, 200).call(this.onCloseAnmComplete, this);
    }
    private onCloseAnmComplete()
    {
        PlayingFieldManager.onKeyBoardCloseEvent.dispatch();
        UIManager.closePanel(UIModuleName.KeyBoardPanel);
    }
    /**
     * 数字键盘按钮事件处理
    */
    private keyboardClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        this.type = undefined;
        let index: number = this._btnList.indexOf(event.target);
        if (index >= 0)
        {
            this.type = KeyBoardKeyType.Number;  //数字键按下
            if (this.panelData.callback)
            {
                if (this.panelData.target)
                {
                    if (!this.searchLabelFlag)
                    {
                        (this.panelData.callback as Function).call(this.panelData.target, this.type, index.toString());
                    } else
                    {
                        (this.panelData.callback as Function).call(this.panelData.target, this.type, this.searchLabelFlag, index.toString());
                    }
                }
                else
                {
                    if (!this.searchLabelFlag)
                    {
                        this.panelData.callback(this.type, index.toString());
                    } else
                    {
                        this.panelData.callback(this.type, this.searchLabelFlag, index.toString());
                    }
                }
            }
        }
        else
        {
            switch (event.target)
            {
                case this.resetBtn:
                    this.type = KeyBoardKeyType.Reset;  //清除键按下
                    break;
                case this.delBtn:
                    this.type = KeyBoardKeyType.Del;  //删除键按下
                    break;
                case this.anmGroup:
                    break;
                case this.bgImg:
                    break;
                default:
                    this.type = KeyBoardKeyType.Close;  //点击遮罩
                    if (!this.isbgNotCanClick)
                    {
                        this.outAnime();
                    }
                    break;
            }
            if (this.panelData.callback)
            {
                if (this.panelData.target)
                {
                    if (!this.searchLabelFlag)
                    {
                        (this.panelData.callback as Function).call(this.panelData.target, this.type);
                    } else
                    {
                        (this.panelData.callback as Function).call(this.panelData.target, this.type, this.searchLabelFlag);
                    }
                }
                else
                {
                    if (!this.searchLabelFlag)
                    {
                        this.panelData.callback(this.type);
                    } else
                    {
                        this.panelData.callback(this.type, this.searchLabelFlag);
                    }
                }
            }
        }
    }
}
/**
 * 键盘按下类型
*/
enum KeyBoardKeyType
{
    /**
     * 数字键
    */
    Number = 1,
    /**
     * 删除
    */
    Del = 2,
    /**
     * 重输
    */
    Reset = 3,
    /**
     * 关闭
    */
    Close = 4,
}