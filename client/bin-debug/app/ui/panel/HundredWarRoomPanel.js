var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 牌局百人大战面板
 */
var HundredWarRoomPanel = (function (_super) {
    __extends(HundredWarRoomPanel, _super);
    function HundredWarRoomPanel() {
        var _this = _super.call(this) || this;
        _this.isTween = false;
        _this.setSkinName(UIModuleName.HundredWarRoomPanel);
        return _this;
    }
    Object.defineProperty(HundredWarRoomPanel.prototype, "supportNomalList", {
        get: function () {
            return this._supportNomalList;
        },
        enumerable: true,
        configurable: true
    });
    HundredWarRoomPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this._betListInfo = new Array();
        this.preBetList = new Array();
        this.pitList = new Array(); //坑位
        var pitInfo;
        for (var i = 0; i < 9; i++) {
            pitInfo = new HWPitInfo();
            pitInfo.pos = i;
            pitInfo.headComponent = this["pit" + i.toString()];
            pitInfo.headComponent.parentPanel = this;
            pitInfo.headComponent.pos = i;
            this.pitList.push(pitInfo);
        }
        this.poolList = new Array();
        var poolInfo;
        for (var i = 1; i <= 4; i++) {
            poolInfo = new HundredWarPoolInfo();
            poolInfo.pos = i;
            poolInfo.betPotComponent = this["betPotComponent" + i];
            this.poolList.push(poolInfo);
        }
        this.cardsList = new Array();
        var cardsInfo;
        for (var i = 0; i < 5; i++) {
            cardsInfo = new HundredWarCardsInfo();
            cardsInfo.pos = i;
            cardsInfo.cardsComponent = this["cardsComponent" + i];
            this.cardsList.push(cardsInfo);
        }
        this.betPotList = new Array(); //注池
        for (var i = 1; i <= 4; i++) {
            this["betPotComponent" + i].init();
            this["betPotComponent" + i].setBg(i);
            this.betPotList.push(this["betPotComponent" + i]);
        }
        this.cardsComponentList = new Array(); //注池对应的牌
        for (var i = 0; i < 5; i++) {
            this["cardsComponent" + i].init();
            this.cardsComponentList.push(this["cardsComponent" + i]);
        }
        UIUtil.bindRender(this.betList, HWBetItemRenderer, null);
        this.betList.useVirtualLayout = false;
        this.betScroller.viewport = this.chooseBetGroup;
        this.betScroller.scrollPolicyH = eui.ScrollPolicy.AUTO;
        this._supportNomalList = new Array();
        this.supportsConstructor();
        this.hwAnim = new HundredWarAnime(this.coinsGroup, this.betPotList, new egret.Point(115, 90), 0, 38);
        this.cardsAnim = new HundredWarCardAnime(this.cardsGroup, this.cardsComponentList, 63, 43);
        this.currencyGroup.touchEnabled = this.ordinaryRoomGroup.touchEnabled = this.betGroup.touchEnabled = false;
        this.cardsComponentGroup.touchEnabled = this.alertGroup.touchEnabled = this.chooseBetGroup.touchEnabled = false;
        this.coinActionGroup.touchEnabled = this.coinsGroup.touchEnabled = this.cardsGroup.touchEnabled = false;
        var len = this.supportNomalList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportNomalList[i];
            if (this.panelData && spt instanceof HWPanelMoveSupport) {
                spt.toRight(false);
            }
        }
        this._downEffect = new DownEfffectComponent(UIComponentSkinName.DownEfffectComponent);
        this._downEffect.init();
        this.addRedPoint();
    };
    HundredWarRoomPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        this.goldChange();
        this.setBetInfo();
        qin.ArrayUtil.Clear(this._betListInfo);
        this.showBetItem();
        this.initPanel();
    };
    HundredWarRoomPanel.prototype.initPanel = function () {
        this._downEffect.init();
        this.onSupportInitialize();
        ChannelManager.checkUnFinishedPayList();
    };
    HundredWarRoomPanel.prototype.addRedPoint = function () {
        UIUtil.addSingleNotify(this.chatBtn, NotifyType.HundredWar_Chat, 8, 2);
    };
    /**
     * 支持组件实例化
    */
    HundredWarRoomPanel.prototype.supportsConstructor = function () {
        this._pitDataSupport = new HWPanelPitDataSupport(this);
        this._moveSpt = new HWPanelMoveSupport(this);
        this.roundOverSupport = new HWPanelRoundOverSupport(this);
        this.sitDownAndAddCoin = new HWPanelSitDownAndChooseCoinSupport(this);
        this.betPotSupport = new HWPanelBetPotSupport(this);
        this.stateSupport = new HWStateSupport(this);
        var funcSupport = new HWFuncSupport(this);
        var pitSpt = new HWPanelPitSupport(this);
        var actionSpt = new HWPanelActionSupport(this);
        //添加是有顺序的
        this._supportNomalList.push(actionSpt, this._moveSpt, pitSpt, this._pitDataSupport, this.sitDownAndAddCoin, this.betPotSupport, funcSupport, this.stateSupport, this.roundOverSupport);
    };
    HundredWarRoomPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    HundredWarRoomPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.onSupportEnable();
        HundredWarManager.addPushListener();
        HundredWarManager.onLeaveEvent.addListener(this.leaveClear, this);
        HundredWarManager.onBetEvent.addListener(this.goldChange, this);
        HundredWarManager.onShowCardsAnimOverEvent.addListener(this.showOverPanel, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.addListener(this.goldChange, this);
        HundredWarManager.onPosChangeEvent.addListener(this.goldChange, this);
    };
    HundredWarRoomPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.onSupportDisable();
        HundredWarManager.removePushListener();
        HundredWarManager.onLeaveEvent.removeListener(this.leaveClear, this);
        HundredWarManager.onBetEvent.removeListener(this.goldChange, this);
        HundredWarManager.onShowCardsAnimOverEvent.removeListener(this.showOverPanel, this);
        HundredWarManager.panelHandler.onUpDownBankerEvent.removeListener(this.goldChange, this);
        HundredWarManager.onPosChangeEvent.removeListener(this.goldChange, this);
    };
    /**
     * 弹出结算面板
     */
    HundredWarRoomPanel.prototype.showOverPanel = function () {
        if ((HundredWarManager.getPlayerBetTotalNum() > 0 && HundredWarManager.isBanker(UserManager.userInfo.roleId)) || HundredWarManager.getThisBetGold() > 0) {
            JumpUtil.JumpToHundredWarOver();
        }
    };
    HundredWarRoomPanel.prototype.goldChange = function () {
        if (UserManager.userInfo) {
            this.selfInfoLabel.textFlow = qin.TextUtil.parse(UserManager.userInfo.name + "  " +
                '<font color="#E6C21D" size="24">' + qin.MathUtil.formatNum(UserManager.userInfo.gold) + '</font>');
        }
    };
    HundredWarRoomPanel.prototype.onSupportInitialize = function () {
        var len = this.supportNomalList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportNomalList[i];
            spt.initialize();
        }
    };
    HundredWarRoomPanel.prototype.onSupportEnable = function () {
        var len = this.supportNomalList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportNomalList[i];
            spt.onEnable();
        }
    };
    HundredWarRoomPanel.prototype.onSupportDisable = function () {
        var len = this.supportNomalList.length;
        var spt;
        for (var i = 0; i < len; i++) {
            spt = this.supportNomalList[i];
            spt.onDisable();
        }
    };
    /**
     * 离开房间清空数据
    */
    HundredWarRoomPanel.prototype.leaveClear = function () {
        this.betPotSupport.leaveClear();
        this.roundOverSupport.leaveClear();
        qin.ArrayUtil.Clear(this.preBetList);
    };
    /**
     * 设置下注数据
    */
    HundredWarRoomPanel.prototype.setBetInfo = function () {
        var hwDef = HundredWarManager.roomInfo.definition;
        if (hwDef && hwDef.bet) {
            var hwBetInfo = void 0;
            for (var i = 0; i < hwDef.bet.length; i++) {
                hwBetInfo = new HWBetInfo();
                hwBetInfo.bet = hwDef.bet[i];
                hwBetInfo.id = i;
                this._betListInfo[i] = hwBetInfo;
            }
        }
    };
    /**
     * 显示下注选项
    */
    HundredWarRoomPanel.prototype.showBetItem = function () {
        this.setBetInfo();
        if (this._betListInfo && this._betListInfo.length > 0) {
            UIUtil.writeListInfo(this.betList, this._betListInfo, "id", true);
        }
    };
    /**
     * 移动牌局
     */
    HundredWarRoomPanel.prototype.gameGroupMove = function () {
        this._moveSpt.move();
    };
    HundredWarRoomPanel.prototype.moveTouchEnd = function (event) {
        if (this.gameGroup.x > 0) {
            this._moveSpt.onTouchBegin(event);
            this._moveSpt.onTouchEnd(event, true);
            return true;
        }
        return false;
    };
    /**
     * 关闭面板
    */
    HundredWarRoomPanel.prototype.onClose = function () {
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    /**
     * 更新上一轮下注数据
    */
    HundredWarRoomPanel.prototype.refreshPreBetList = function () {
        if (HundredWarManager.roomInfo && HundredWarManager.roomInfo.betList) {
            for (var _i = 0, _a = HundredWarManager.roomInfo.betList; _i < _a.length; _i++) {
                var betInfo = _a[_i];
                var addFlag = true;
                var info = void 0;
                for (var i = 0; i < this.preBetList.length; i++) {
                    var preBetInfo = this.preBetList[i];
                    if (betInfo.pos != 0 && preBetInfo.pos == betInfo.pos) {
                        if (betInfo.myBet) {
                            preBetInfo.myBet = betInfo.myBet; //更新     
                        }
                        else {
                            this.preBetList.splice(i, 1); //删除
                        }
                        addFlag = false;
                        break;
                    }
                }
                if (addFlag && betInfo.pos != 0) {
                    info = new HWBetPotInfo();
                    info.pos = betInfo.pos;
                    info.myBet = betInfo.myBet;
                    this.preBetList.push(info); //增加
                }
            }
        }
    };
    /**
     * 获得自己上一轮下注的总金币数
    */
    HundredWarRoomPanel.prototype.getPreBetGold = function () {
        if (this.preBetList && this.preBetList.length > 0) {
            var total = 0;
            for (var _i = 0, _a = this.preBetList; _i < _a.length; _i++) {
                var info = _a[_i];
                total += info.myBet;
            }
            return total;
        }
        return 0;
    };
    /**
     * 获取头像组件，根据玩家位置
     */
    HundredWarRoomPanel.prototype.getHeadComponent = function (playerPos) {
        return this._pitDataSupport.getHeadComponent(playerPos);
    };
    /**
     * 根据索引获取坑位信息
     */
    HundredWarRoomPanel.prototype.getPitInfoByIndex = function (index) {
        if (index != undefined) {
            for (var _i = 0, _a = this.pitList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos == index) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 根据索引获取注池位信息
    */
    HundredWarRoomPanel.prototype.getPoolInfoByIndex = function (index) {
        if (index != undefined) {
            for (var _i = 0, _a = this.poolList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos == index) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 根据索引获取牌组件位信息
    */
    HundredWarRoomPanel.prototype.getCardsInfoByIndex = function (index) {
        if (index != undefined) {
            for (var _i = 0, _a = this.cardsList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.pos == index) {
                    return info;
                }
            }
        }
        return null;
    };
    /**
     * 根据角色信息获取角色所在的头像组件
     */
    HundredWarRoomPanel.prototype.getHeadComponentByRole = function (role) {
        if (role instanceof HWHundredWarRoomPlayerInfo) {
            return this._pitDataSupport.getHeadComponent(role.pos);
        }
        else {
            var pInfo = HundredWarManager.getPlayerInfo(role);
            if (pInfo) {
                return this._pitDataSupport.getHeadComponent(pInfo.pos);
            }
        }
        return null;
    };
    /**
     * 显示坐下特效
    */
    HundredWarRoomPanel.prototype.showDownEffect = function (parent) {
        this._downEffect.run(parent);
    };
    /**
     * 隐藏坐下特效
    */
    HundredWarRoomPanel.prototype.hideDownEffect = function () {
        this._downEffect.init();
    };
    return HundredWarRoomPanel;
}(BasePanel));
__reflect(HundredWarRoomPanel.prototype, "HundredWarRoomPanel");
//# sourceMappingURL=HundredWarRoomPanel.js.map