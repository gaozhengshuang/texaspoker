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
 * 发牌支持
 */
var GamblingPanelFlopCardSupport = (function (_super) {
    __extends(GamblingPanelFlopCardSupport, _super);
    function GamblingPanelFlopCardSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelFlopCardSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.target.flopCardImg1.visible = false;
        this.target.flopCardImg2.visible = false;
        if (!this._animation1) {
            this._animation1 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
            this._animation1.setTarget(this.target.flopCardImg1);
            this._animation2 = AnimationFactory.getDisplayObjectContainerAnimation(AnimationType.FlopCard);
            this._animation2.setTarget(this.target.flopCardImg2);
            this.target.flopCardImg1.scaleX = this.target.flopCardImg1.scaleY = 0.2;
            this.target.flopCardImg2.scaleX = this.target.flopCardImg2.scaleY = 0.2;
        }
        if (!this._flopPosList) {
            this._flopPosList = new Array();
        }
        this._flopPosList.length = 0;
        this._isNextRoundStart = false;
    };
    GamblingPanelFlopCardSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.NextRoundStartEvent.addListener(this.nextRoundStartHandler, this);
        GamblingManager.ActionPosChangeEvent.addListener(this.actionPosChangeHandler, this);
        GamblingManager.RoundOverEvent.addListener(this.roundOverHandler, this);
    };
    GamblingPanelFlopCardSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.NextRoundStartEvent.removeListener(this.nextRoundStartHandler, this);
        GamblingManager.ActionPosChangeEvent.removeListener(this.actionPosChangeHandler, this);
        GamblingManager.RoundOverEvent.removeListener(this.roundOverHandler, this);
        this._cardList = undefined;
    };
    GamblingPanelFlopCardSupport.prototype.nextRoundStartHandler = function () {
        this._isNextRoundStart = true;
        this._isOnOver = false;
    };
    /**
     * 一局结束 处理小盲位置不足小盲allin，两家不发牌的问题。此时直接结算不会推送位置变更协议
     */
    GamblingPanelFlopCardSupport.prototype.roundOverHandler = function (data) {
        if (GamblingManager.roomInfo) {
            this.actionPosChangeHandler(data.handCard);
        }
        if (this._isOnFlop) {
            this.showSelfCard();
        }
        this._isOnOver = true;
    };
    GamblingPanelFlopCardSupport.prototype.actionPosChangeHandler = function (cardList) {
        if (!this._isNextRoundStart) {
            return;
        }
        this._isNextRoundStart = false;
        if (!cardList) {
            qin.Console.log("手牌推送过来是空！");
        }
        if (this.isDisabled) {
            return;
        }
        this._cardList = cardList;
        this.target.flopCardImg1.visible = false;
        this.target.flopCardImg2.visible = false;
        this._flopRound = 0;
        this._runPos = 0;
        this._runIndex = 0;
        this._animationIndex = 0;
        for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            pitInfo.headComponent.flopIndex = 0; //发牌计数清零
        }
        this._flopPosList.length = 0;
        if (InfoUtil.checkAvailable(GamblingManager.roomInfo) && GamblingManager.roomInfo.playerList) {
            var tmpPos = GamblingUtil.sBlindPos;
            var pInfo = void 0;
            for (var i = 0; i < GamblingManager.roomInfo.playerList.length; i++) {
                pInfo = GamblingManager.getPlayerInfoByPos(tmpPos);
                if (pInfo && pInfo.state != PlayerState.WaitNext) {
                    this._flopPosList.push(tmpPos);
                }
                pInfo = this.target.getNextPlayerInfo(tmpPos);
                if (pInfo) {
                    tmpPos = pInfo.pos;
                }
            }
            this._isOnFlop = true;
            qin.Console.log("开始发牌,玩家总数: " + this._flopPosList.length);
            this.runNext();
        }
        else {
            qin.Console.log("发牌时房间信息是空");
        }
    };
    GamblingPanelFlopCardSupport.prototype.runNext = function () {
        if (this._isOnOver) {
            return;
        }
        if (this.isDisabled) {
            qin.Console.log("发牌runNext：isDisabled" + this._flopRound);
            return;
        }
        if (GamblingManager.roomInfo) {
            var headComponent = void 0;
            var animation = void 0;
            if (this._runIndex == this._flopPosList.length) {
                qin.Console.log("发了一圈牌_flopRound: " + this._flopRound);
                this._flopRound++;
                this._runIndex = 0;
            }
            var totalHandCard = void 0;
            if (GamblingUtil.isOmaha) {
                totalHandCard = 4;
            }
            else {
                totalHandCard = 2;
            }
            if (this._flopRound < totalHandCard) {
                this._runPos = this._flopPosList[this._runIndex];
                headComponent = this.target.getHeadComponent(this._runPos);
                this._runIndex++;
                this._animationIndex++;
                if (headComponent) {
                    SoundManager.playEffect(MusicAction.fapai);
                    animation = this.getAnimation();
                    animation.run(new egret.Point(headComponent.x + headComponent.width / 2, headComponent.y + headComponent.height / 2), this.runOver, this, headComponent);
                }
                else {
                    AlertManager.showAlert("发牌出现异常!");
                    qin.Console.log("发牌异常！未找到发牌的头像组件 _runIndex： " + this._runIndex + " _animationIndex: " + this._animationIndex + " _runPos: " + this._runPos + " _flopPosList " + this._flopPosList);
                    this.flopOver();
                }
                qin.Console.log(" 给玩家发牌玩家位置: " + this._runPos);
            }
            else {
                this.flopOver();
            }
        }
    };
    GamblingPanelFlopCardSupport.prototype.flopOver = function () {
        this._isOnFlop = false;
        qin.Console.log("发牌结束");
        if (GamblingManager.roomInfo) {
            GamblingManager.roomInfo.isFlopCardOver = true;
        }
        // this.target.flopCardImg1.visible = false;
        // this.target.flopCardImg2.visible = false;
        this.showSelfCard();
        GamblingManager.FlopCardOverEvent.dispatch();
        //执行action
    };
    GamblingPanelFlopCardSupport.prototype.showSelfCard = function () {
        if (GamblingManager.self) {
            var headComponent = this.target.getHeadComponent(GamblingManager.self.pos);
            if (headComponent && headComponent.bindData.roleId == UserManager.userInfo.roleId && this._cardList && this._cardList.length > 1) {
                headComponent.showHaveCardImg(false); //显示自己的手牌
                headComponent.cardFace1.init(this._cardList[0]);
                headComponent.cardFace2.init(this._cardList[1]);
                headComponent.cardFace1.initElementsShow2();
                headComponent.cardFace2.initElementsShow2();
                if (GamblingUtil.isOmaha) {
                    headComponent.cardFace3.init(this._cardList[2]);
                    headComponent.cardFace4.init(this._cardList[3]);
                    headComponent.cardFace3.initElementsShow2();
                    headComponent.cardFace4.initElementsShow2();
                }
                headComponent.cardAnimationSpt.runSelfCard(this.showCardType, this);
            }
        }
    };
    GamblingPanelFlopCardSupport.prototype.runOver = function (params) {
        if (this.isDisabled) {
            qin.Console.log("发牌Disabled");
            return;
        }
        var name = qin.StringConstants.Empty;
        var pos = -1;
        if (params.bindData && params.bindData.userInfo) {
            name = params.bindData.userInfo.name;
            pos = params.bindData.pos;
        }
        qin.Console.log("发了一张牌玩家：" + name + " posIndex: " + params.posIndex + " pos: " + pos);
        params.flopIndex++;
        //是自己
        this.runNext();
    };
    GamblingPanelFlopCardSupport.prototype.showCardType = function () {
        //this.target.cardTypeGroup.visible = true;
    };
    /**
     * 获取动画
     */
    GamblingPanelFlopCardSupport.prototype.getAnimation = function () {
        if (this._animationIndex % 2 == 1) {
            this.target.flopCardImg1.visible = true;
            return this._animation1;
        }
        else {
            this.target.flopCardImg2.visible = true;
            return this._animation2;
        }
    };
    return GamblingPanelFlopCardSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelFlopCardSupport.prototype, "GamblingPanelFlopCardSupport");
//# sourceMappingURL=GamblingPanelFlopCardSupport.js.map