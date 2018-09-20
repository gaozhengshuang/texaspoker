/**
 * 创建私人房密码面板
*/
class CreateRoomPwdPanel extends EnterRoomPwdPanel
{
    /**
     * 创建房间按钮
    */
    private createBtn: eui.Button;
    /**
     * 密码框
    */
    public labelGroup: eui.Group;
    /**
     * 前注
    */
    public ante1ToggleSwitch: eui.ToggleSwitch;
    public ante2ToggleSwitch: eui.ToggleSwitch;
    public ante3ToggleSwitch: eui.ToggleSwitch;
    public ante4ToggleSwitch: eui.ToggleSwitch;
    /**
     * 选择盲注滑动条
    */
    public blindHS: eui.HSlider;
    /**
     * 身上现有资产
    */
    public goldLabel: eui.Label;
    /**
     * 盲注信息
    */
    public blindLabel: eui.Label;
    /**
     * 最小买入
    */
    public sBuyLabel: eui.Label;

    public selectedAnte: eui.ToggleSwitch;
    private _ante: number;
    /**
     * 选中最大携带的id
    */
    private _selectedId: number;
    /**
     * 最大携带数据列表 
    */
    private _maxCarryList: Array<RoomDefinition>;

    public constructor()
    {
        super(true);
        this.setSkinName(UIModuleName.CreateRoomPwdPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this.setAlignInfo(PanelAlignType.Center_Center);
        this.isShowKeyBoardPanel = false;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.goldLabel.text = game.MathUtil.formatNum(UserManager.userInfo.gold);
        this.getMaxCarrayInfo();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onKeyBoardCloseEvent.addListener(this.restoreY, this);
        this.blindHS.addEventListener(egret.Event.CHANGE, this.chooseBlind, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.createBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.createRoom, this);
        this.labelGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeIndex, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        PlayingFieldManager.onKeyBoardCloseEvent.removeListener(this.restoreY, this);
        this.blindHS.removeEventListener(egret.Event.CHANGE, this.chooseBlind, this);
        this.restoreY();
    }
    protected enterPwd(type: number, num?: string)
    {
        if (num)
        {
            let label: NumComponent = this.getUnWriteLabel();
            if (label)
            {
                label.refresh(parseInt(num));
            }
        }
        //键盘删除键按下
        if (type == 2)
        {
            let delLabel: NumComponent = this.getWirteLabel();
            if (delLabel)
            {
                delLabel.refresh();
            }
        } else if (type == 3)  //键盘清除键按下
        {
            this.resetLabel();
        }
    }
    /**
     * 选择盲注
    */
    private chooseBlind()
    {
        let roomInfo: RoomDefinition = this._maxCarryList[this.blindHS.value];
        this.blindLabel.text = game.MathUtil.formatNum(roomInfo.sBlind) + "/" + game.MathUtil.formatNum(roomInfo.bBlind);
        this.sBuyLabel.text = game.MathUtil.formatNum(roomInfo.sBuyin);
        this.setAnte(roomInfo.id);
    }
    /**
     * 设置前注数据
    */
    private setAnte(id: number)
    {
        let roomDef: RoomDefinition = RoomDefined.GetInstance().getDefinition(id);
        if (roomDef)
        {
            this.ante1ToggleSwitch.label = game.MathUtil.formatNum(roomDef.ante[0]);
            this.ante2ToggleSwitch.label = game.MathUtil.formatNum(roomDef.ante[1]);
            this.ante3ToggleSwitch.label = game.MathUtil.formatNum(roomDef.ante[2]);
            this.ante4ToggleSwitch.label = game.MathUtil.formatNum(roomDef.ante[3]);
        }
        this._ante = 0;
        if (this.selectedAnte)
        {
            this.selectedAnte.selected = false;
            this.ante1ToggleSwitch.selected = true;
            this.selectedAnte = this.ante1ToggleSwitch;
        }
        this._selectedId = id;
    }
    /**
     * 重置
    */
    private reset()
    {
        if (this._maxCarryList)
        {
            this._selectedId = this._maxCarryList[0].id;
            this.ante1ToggleSwitch.label = game.MathUtil.formatNum(this._maxCarryList[0].ante[0]);
            this.ante2ToggleSwitch.label = game.MathUtil.formatNum(this._maxCarryList[0].ante[1]);
            this.ante3ToggleSwitch.label = game.MathUtil.formatNum(this._maxCarryList[0].ante[2]);
            this.ante4ToggleSwitch.label = game.MathUtil.formatNum(this._maxCarryList[0].ante[3]);
        }
        if (this.selectedAnte)
        {
            this.selectedAnte.selected = false;
        }
        this._ante = 0;
        this.ante1ToggleSwitch.selected = true;
        this.selectedAnte = this.ante1ToggleSwitch;
    }
    /**
     * 点击事件处理
    */
    private onClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        switch (event.target)
        {
            case this.ante1ToggleSwitch:
                this._ante = this.changeToNum(this.ante1ToggleSwitch.label);
                this.changSelectAnte(this.ante1ToggleSwitch);
                break;
            case this.ante2ToggleSwitch:
                this._ante = this.changeToNum(this.ante2ToggleSwitch.label);
                this.changSelectAnte(this.ante2ToggleSwitch);
                break;
            case this.ante3ToggleSwitch:
                this._ante = this.changeToNum(this.ante3ToggleSwitch.label);
                this.changSelectAnte(this.ante3ToggleSwitch);
                break;
            case this.ante4ToggleSwitch:
                this._ante = this.changeToNum(this.ante4ToggleSwitch.label);
                this.changSelectAnte(this.ante4ToggleSwitch);
                break;
        }
    }
    /**
     * 更改前注选中项
    */
    private changSelectAnte(selectAnte: eui.ToggleSwitch)
    {
        if (!this.selectedAnte)
        {
            selectAnte.selected = true;
            this.selectedAnte = selectAnte;
        } else
        {
            if (selectAnte != this.selectedAnte)
            {
                this.selectedAnte.selected = false;
                selectAnte.selected = true;
                this.selectedAnte = selectAnte;
            } else
            {
                this.selectedAnte.selected = !this.selectedAnte.selected;
            }

        }
    }
    /**
     * 去掉万  亿
    */
    private changeToNum(str: string): number
    {
        let w: number = str.indexOf("万");
        let y: number = str.indexOf("亿");
        if (w == -1 && y == -1)
        {
            return parseInt(str);
        } else
        {
            if (w != -1)
            {
                return parseInt(str) * 10000;
            }
            if (y != -1)
            {
                return parseInt(str) * 100000000;
            }
            return null;
        }
    }
    /**
     * 输入密码框点击事件
    */
    private changeIndex()
    {
        UIManager.showPanel(UIModuleName.KeyBoardPanel, { callback: this.callback, target: this, isbgNotCanClick: false });
        this.verticalCenter = -300;
    }
    /**
     * 获取最大携带数数据和前注数据
    */
    private getMaxCarrayInfo()
    {
        if (this.panelData)
        {
            if (this.panelData.playWay == PlayWayType.Omaha)
            {
                this._maxCarryList = RoomDefined.GetInstance().getInfoByType(PlayingFieldType.OmahaPersonal);
            } else if (this.panelData.playWay == PlayWayType.PlayField)
            {
                this._maxCarryList = RoomDefined.GetInstance().getInfoByType(PlayingFieldType.PlayFieldPersonal);
            }
        }
        if (this._maxCarryList)
        {
            this.reset();
            this.blindHS.maximum = this._maxCarryList.length - 1;
            this.blindHS.value = 0;
            let roomInfo: RoomDefinition = new RoomDefinition();
            roomInfo = this._maxCarryList[0];
            this.setAnte(this._maxCarryList[0].id);
            this.blindLabel.text = game.MathUtil.formatNum(roomInfo.sBlind) + "/" + game.MathUtil.formatNum(roomInfo.bBlind);
            this.sBuyLabel.text = game.MathUtil.formatNum(roomInfo.sBuyin);
        }
    }
    /**
     * 创建私人房
    */
    private createRoom(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        let str: string = this.getRoomPwd();
        if (str == "")
        {
            AlertManager.showAlert("请先输入6位数的密码再创建房间！");
            return;
        }
        if (str && str.length < 6)
        {
            AlertManager.showAlert("请先输入6位数的密码再创建房间！");
            return;
        } else if (this._selectedId != undefined)
        {
            let roomInfo: RoomDefinition = RoomDefined.GetInstance().getDefinition(this._selectedId);
            if (roomInfo)
            {
                if (UserManager.userInfo.gold < roomInfo.sBuyin)
                {
                    AlertManager.showAlert("您的金币不足" + game.MathUtil.formatNum(roomInfo.sBuyin) + ",请补充金币或者选择较低场次。");
                    return;
                }
            }
            PlayingFieldManager.reqCreatePersonalRoom(this._selectedId, str, this._ante);
        } else
        {
            AlertManager.showAlert("请选择盲注级别！");
        }
    }
    /**
     * 还原y轴位置
    */
    private restoreY()
    {
        this.verticalCenter = 0;
    }
}