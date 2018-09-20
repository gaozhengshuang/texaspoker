/**
 * 牌局百人大战面板
 */
class HundredWarRoomPanel extends BasePanel
{
    /**
	 * 头像组件
	 */
    public pit0: HWHeadComponent;
    public pit1: HWHeadComponent;
    public pit2: HWHeadComponent;
    public pit3: HWHeadComponent;
    public pit4: HWHeadComponent;
    public pit5: HWHeadComponent;
    public pit6: HWHeadComponent;
    public pit7: HWHeadComponent;
    public pit8: HWHeadComponent;

    /**
     * 坑位数组
    */
    public pitList: Array<HWPitInfo>;
    public poolList: Array<HundredWarPoolInfo>;
    public cardsList: Array<HundredWarCardsInfo>;

    //-----------功能信息----------------
    public leftGroup: eui.Group;
    public funcGroup: eui.Group;
    public backToHallBtn: eui.Button;
    public chargeBtn: eui.Button;
    public standUpBtn: eui.Button;

    //-----------牌局桌面信息------------
    public dragGroup: eui.Group;
    public gameGroup: eui.Group;
    public currencyGroup: eui.Group;
    public betGroup: eui.Group;

    /**
     * 注池
    */
    public betPotComponent1: HWBetPotComponent;
    public betPotComponent2: HWBetPotComponent;
    public betPotComponent3: HWBetPotComponent;
    public betPotComponent4: HWBetPotComponent;
    public betPotList: Array<HWBetPotComponent>;

    /**
     * 结果
    */
    public cardsComponentGroup: eui.Group;
    public cardsComponent0: HWCardsComponent;
    public cardsComponent1: HWCardsComponent;
    public cardsComponent2: HWCardsComponent;
    public cardsComponent3: HWCardsComponent;
    public cardsComponent4: HWCardsComponent;
    public cardsComponentList: Array<HWCardsComponent>;

    /**
     * 普通按钮
    */
    public ordinaryRoomGroup: eui.Group;
    public optionsBtn: eui.Button;
    public buyBtn: eui.Button;
    public chatBtn: eui.Button;
    public trendBtn: eui.Button;
    public playersBtn: eui.Button;
    public achieveBtn: eui.Button;
    public helpBtn: eui.Button;
    /**
     * 按钮背景
     */
    public playersBtnBg: eui.Image;

    /**
     * 上/下庄按钮
    */
    public goBankerBtn: eui.Button;
    public outBankerBtn: eui.Button;
    /**
     * 奖池信息按钮
     */
    public potGroup: eui.Group;
    public potBg: eui.Image;
    /**
     * 庄家背景
     */
    public bankerBg: eui.Image;
    /**
     * 注数
    */
    public chooseBetGroup: eui.Group;
    public betList: eui.List;
    public betScroller: eui.Scroller;
    /**
     * 重复下注
    */
    public repetBtn: eui.Button;
    /**
     * 双倍
    */
    public doubleBtn: eui.Button;

    /**
     * 金币动画区域
    */
    public coinActionGroup: eui.Group;
    /**
     * 发牌区域
    */
    public dealGroup: eui.Group;

    /**
     * 自己坐下时的信息
    */
    public selfGroup: eui.Group;
    public selfInfoLabel: eui.Label;
    /**
     * 坐下特效
    */
    private _downEffect: DownEfffectComponent;
    /**
     * 庄家昵称
    */
    public bankerNameLabel: eui.Label;
    /**
     * 奖池筹码
    */
    public potLabel: eui.Label;
    /**
     * 爆奖池时显示
    */
    public poolDesGroup: eui.Group;

    /**
     * 百人大战状态提示
    */
    public alertGroup: eui.Group;
    public alertLabel: eui.Label;

    /**
     * 配置表下注信息
    */
    private _betListInfo: Array<HWBetInfo>;

    /**
     * 上一轮下注信息 (退出房间是清空)
    */
    public preBetList: Array<HWBetPotInfo>;

    /**
	 * 左边移动效果
	 */
    private _moveSpt: HWPanelMoveSupport;
    /**
	 * 坑位操作信息
	 */
    private _pitDataSupport: HWPanelPitDataSupport;
    public roundOverSupport: HWPanelRoundOverSupport;
    public sitDownAndAddCoin: HWPanelSitDownAndChooseCoinSupport;
    public betPotSupport: HWPanelBetPotSupport;
    public stateSupport: HWStateSupport;
    /**
	 * 通用支持列表
	 */
    private _supportNomalList: Array<BaseHWPanelSupport>;
    public get supportNomalList(): Array<BaseHWPanelSupport>
    {
        return this._supportNomalList;
    }
    public coinsGroup: eui.Group;
    public cardsGroup: eui.Group;
    public hwAnim: HundredWarAnime;
    public cardsAnim: HundredWarCardAnime;
    public dragImg: eui.Image;
    public dragImg0: eui.Image;

    public constructor()
    {
        super();
        this.isTween = false;
        this.setSkinName(UIModuleName.HundredWarRoomPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        this._betListInfo = new Array<HWBetInfo>();
        this.preBetList = new Array<HWBetPotInfo>();

        this.pitList = new Array<HWPitInfo>();  //坑位
        let pitInfo: HWPitInfo;
        for (let i: number = 0; i < 9; i++)
        {
            pitInfo = new HWPitInfo();
            pitInfo.pos = i;
            pitInfo.headComponent = this["pit" + i.toString()];
            pitInfo.headComponent.parentPanel = this;
            pitInfo.headComponent.pos = i;
            this.pitList.push(pitInfo);
        }
        this.poolList = new Array<HundredWarPoolInfo>();
        let poolInfo: HundredWarPoolInfo;
        for (let i: number = 1; i <= 4; i++)
        {
            poolInfo = new HundredWarPoolInfo();
            poolInfo.pos = i;
            poolInfo.betPotComponent = this["betPotComponent" + i];
            this.poolList.push(poolInfo);
        }
        this.cardsList = new Array<HundredWarCardsInfo>();
        let cardsInfo: HundredWarCardsInfo;
        for (let i: number = 0; i < 5; i++)
        {
            cardsInfo = new HundredWarCardsInfo();
            cardsInfo.pos = i;
            cardsInfo.cardsComponent = this["cardsComponent" + i];
            this.cardsList.push(cardsInfo);
        }

        this.betPotList = new Array<HWBetPotComponent>();  //注池
        for (let i: number = 1; i <= 4; i++)
        {
            this["betPotComponent" + i].init();
            this["betPotComponent" + i].setBg(i);
            this.betPotList.push(this["betPotComponent" + i]);
        }

        this.cardsComponentList = new Array<HWCardsComponent>();  //注池对应的牌
        for (let i: number = 0; i < 5; i++)
        {
            this["cardsComponent" + i].init();
            this.cardsComponentList.push(this["cardsComponent" + i]);
        }

        UIUtil.bindRender(this.betList, HWBetItemRenderer, null);
        this.betList.useVirtualLayout = false;
        this.betScroller.viewport = this.chooseBetGroup;
        this.betScroller.scrollPolicyH = eui.ScrollPolicy.AUTO;

        this._supportNomalList = new Array<BaseHWPanelSupport>();
        this.supportsConstructor();
        this.hwAnim = new HundredWarAnime(this.coinsGroup, this.betPotList, new egret.Point(115, 90), 0, 38);
        this.cardsAnim = new HundredWarCardAnime(this.cardsGroup, this.cardsComponentList, 63, 43);

        this.currencyGroup.touchEnabled = this.ordinaryRoomGroup.touchEnabled = this.betGroup.touchEnabled = false;
        this.cardsComponentGroup.touchEnabled = this.alertGroup.touchEnabled = this.chooseBetGroup.touchEnabled = false;
        this.coinActionGroup.touchEnabled = this.coinsGroup.touchEnabled = this.cardsGroup.touchEnabled = false;

        let len: number = this.supportNomalList.length;
        let spt: BaseHWPanelSupport;
        for (let i: number = 0; i < len; i++)
        {
            spt = this.supportNomalList[i];
            if (this.panelData && spt instanceof HWPanelMoveSupport)
            {
                spt.toRight(false);
            }
        }

        this._downEffect = new DownEfffectComponent(UIComponentSkinName.DownEfffectComponent);
        this._downEffect.init();
        this.addRedPoint();
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.goldChange();
        this.setBetInfo();
        qin.ArrayUtil.Clear(this._betListInfo);
        this.showBetItem();

        this.initPanel();
    }
    private initPanel()
    {
        this._downEffect.init();
        this.onSupportInitialize();
        ChannelManager.checkUnFinishedPayList();
    }

    private addRedPoint()
    {
        UIUtil.addSingleNotify(this.chatBtn, NotifyType.HundredWar_Chat, 8, 2);
    }
    /**
     * 支持组件实例化
    */
    private supportsConstructor()
    {
        this._pitDataSupport = new HWPanelPitDataSupport(this);
        this._moveSpt = new HWPanelMoveSupport(this);
        this.roundOverSupport = new HWPanelRoundOverSupport(this);
        this.sitDownAndAddCoin = new HWPanelSitDownAndChooseCoinSupport(this);
        this.betPotSupport = new HWPanelBetPotSupport(this);
        this.stateSupport = new HWStateSupport(this);


        let funcSupport: HWFuncSupport = new HWFuncSupport(this);
        let pitSpt: HWPanelPitSupport = new HWPanelPitSupport(this);
        let actionSpt: HWPanelActionSupport = new HWPanelActionSupport(this);

        //添加是有顺序的
        this._supportNomalList.push(actionSpt, this._moveSpt, pitSpt, this._pitDataSupport, this.sitDownAndAddCoin, this.betPotSupport, funcSupport, this.stateSupport, this.roundOverSupport);
    }

    protected onRender(event: egret.Event)
    {
        super.onRender(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.onSupportEnable();
        HundredWarManager.addPushListener();
        HundredWarManager.onLeaveEvent.addListener(this.leaveClear, this);
        HundredWarManager.onBetEvent.addListener(this.goldChange, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.showOverPanel, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.goldChange, this);
        HundredWarManager.onPosChangeEvent.addListener(this.goldChange, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.onSupportDisable();
        HundredWarManager.removePushListener();
        HundredWarManager.onLeaveEvent.removeListener(this.leaveClear, this);
        HundredWarManager.onBetEvent.removeListener(this.goldChange, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.showOverPanel, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.goldChange, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.goldChange, this);
    }

    /**
     * 弹出结算面板
     */
    private showOverPanel()
    {
        if ((HundredWarManager.getPlayerBetTotalNum() > 0 && HundredWarManager.isBanker(UserManager.userInfo.roleId)) || HundredWarManager.getThisBetGold() > 0)
        {
            JumpUtil.JumpToHundredWarOver();
        }
    }
    public goldChange()
    {
        if (UserManager.userInfo)
        {
            this.selfInfoLabel.textFlow = qin.TextUtil.parse(
                UserManager.userInfo.name + "  " +
                '<font color="#E6C21D" size="24">' + qin.MathUtil.formatNum(UserManager.userInfo.gold) + '</font>'
            );
        }
    }
    public onSupportInitialize()
    {
        let len: number = this.supportNomalList.length;
        let spt: BaseHWPanelSupport;
        for (let i: number = 0; i < len; i++)
        {
            spt = this.supportNomalList[i];
            spt.initialize();
        }
    }
    public onSupportEnable()
    {
        let len: number = this.supportNomalList.length;
        let spt: BaseHWPanelSupport;
        for (let i: number = 0; i < len; i++)
        {
            spt = this.supportNomalList[i];
            spt.onEnable();
        }
    }
    public onSupportDisable()
    {
        let len: number = this.supportNomalList.length;
        let spt: BaseHWPanelSupport;
        for (let i: number = 0; i < len; i++)
        {
            spt = this.supportNomalList[i];
            spt.onDisable();
        }
    }

    /**
     * 离开房间清空数据
    */
    public leaveClear()
    {
        this.betPotSupport.leaveClear();
        this.roundOverSupport.leaveClear();
        qin.ArrayUtil.Clear(this.preBetList);
    }
    /**
     * 设置下注数据
    */
    private setBetInfo()
    {
        let hwDef: HundredWarDefinition = HundredWarManager.roomInfo.definition;
        if (hwDef && hwDef.bet)
        {
            let hwBetInfo: HWBetInfo;
            for (let i: number = 0; i < hwDef.bet.length; i++)
            {
                hwBetInfo = new HWBetInfo();
                hwBetInfo.bet = hwDef.bet[i];
                hwBetInfo.id = i;
                this._betListInfo[i] = hwBetInfo;
            }
        }
    }
    /**
     * 显示下注选项
    */
    private showBetItem()
    {
        this.setBetInfo();
        if (this._betListInfo && this._betListInfo.length > 0)
        {
            UIUtil.writeListInfo(this.betList, this._betListInfo, "id", true);
        }
    }
    /**
	 * 移动牌局
	 */
    public gameGroupMove()
    {
        this._moveSpt.move();
    }
    public moveTouchEnd(event: egret.TouchEvent)
    {
        if (this.gameGroup.x > 0)
        {
            this._moveSpt.onTouchBegin(event);
            this._moveSpt.onTouchEnd(event, true);
            return true;
        }
        return false;
    }
    /**
     * 关闭面板
    */
    public onClose()
    {
        super.onCloseBtnClickHandler(null);
    }
    /**
     * 更新上一轮下注数据
    */
    public refreshPreBetList()
    {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList)
        {
            for (let betInfo of HundredWarManager.roomInfo.betList)
            {
                let addFlag: boolean = true;
                let info: HWBetPotInfo;
                for (let i: number = 0; i < this.preBetList.length; i++)
                {
                    let preBetInfo: HWBetPotInfo = this.preBetList[i];
                    if (betInfo.pos != 0 && preBetInfo.pos == betInfo.pos)
                    {
                        if (betInfo.myBet)
                        {
                            preBetInfo.myBet = betInfo.myBet;  //更新     
                        } else
                        {
                            this.preBetList.splice(i, 1);  //删除
                        }
                        addFlag = false;
                        break;
                    }
                }
                if (addFlag && betInfo.pos != 0)
                {
                    info = new HWBetPotInfo();
                    info.pos = betInfo.pos;
                    info.myBet = betInfo.myBet;
                    this.preBetList.push(info);  //增加
                }
            }
        }
    }
    /**
     * 获得自己上一轮下注的总金币数
    */
    public getPreBetGold(): number
    {
        if (this.preBetList && this.preBetList.length > 0)
        {
            let total: number = 0;
            for (let info of this.preBetList)
            {
                total += info.myBet;
            }
            return total;
        }
        return 0;
    }
    /**
	 * 获取头像组件，根据玩家位置
	 */
    public getHeadComponent(playerPos: number): HWHeadComponent
    {
        return this._pitDataSupport.getHeadComponent(playerPos);
    }
    /**
	 * 根据索引获取坑位信息
	 */
    public getPitInfoByIndex(index: number): HWPitInfo
    {
        if (index != undefined)
        {
            for (let info of this.pitList)
            {
                if (info.pos == index)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 根据索引获取注池位信息
    */
    public getPoolInfoByIndex(index: number): HundredWarPoolInfo
    {
        if (index != undefined)
        {
            for (let info of this.poolList)
            {
                if (info.pos == index)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
     * 根据索引获取牌组件位信息
    */
    public getCardsInfoByIndex(index: number): HundredWarCardsInfo
    {
        if (index != undefined)
        {
            for (let info of this.cardsList)
            {
                if (info.pos == index)
                {
                    return info;
                }
            }
        }
        return null;
    }
    /**
	 * 根据角色信息获取角色所在的头像组件
	 */
    public getHeadComponentByRole(role: number | HWHundredWarRoomPlayerInfo): HWHeadComponent
    {
        if (role instanceof HWHundredWarRoomPlayerInfo)
        {
            return this._pitDataSupport.getHeadComponent(role.pos);
        }
        else
        {
            let pInfo: HWHundredWarRoomPlayerInfo = HundredWarManager.getPlayerInfo(role);
            if (pInfo)
            {
                return this._pitDataSupport.getHeadComponent(pInfo.pos);
            }
        }
        return null;
    }
    /**
     * 显示坐下特效
    */
    public showDownEffect(parent: eui.Group)
    {
        this._downEffect.run(parent);
    }
    /**
     * 隐藏坐下特效
    */
    public hideDownEffect()
    {
        this._downEffect.init();
    }


}