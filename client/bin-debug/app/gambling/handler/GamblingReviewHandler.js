var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *上局回顾管理器
*/
var GamblingReviewHandler = (function () {
    function GamblingReviewHandler() {
        /**
         * 请求牌局上局回顾信息成功广播
        */
        this.onReqReviewInfoEvent = new qin.DelegateDispatcher();
        /**
         * 所有用户信息请求完成广播
        */
        this.onGetAllPlayerInfoEvent = new qin.DelegateDispatcher();
    }
    /**
     * 发送获取上局回顾信息的请求
    */
    GamblingReviewHandler.prototype.reqReviewInfo = function (id) {
        var callback = function (result) {
            this.reset();
            if (result.data) {
                if (result.data.Array) {
                    for (var _i = 0, _a = result.data.Array; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.action) {
                            this.setInfoByActionType(info);
                        }
                        else {
                            this.setSelfCardsInfo(info); //设置自己的手牌
                        }
                        this.setSelfActionRecord(info); //设置自己的操作信息
                    }
                    if (this.reviewInfoList.length > 0) {
                        for (var i = 0; i < this.reviewInfoList.length; i++) {
                            var playerReviewInfo = this.reviewInfoList[i];
                            //设置输赢以及输赢的数目
                            this.setResultInfo(playerReviewInfo);
                            //获得牌型类型以及牌型描述
                            this.setCardsTypeDes(playerReviewInfo);
                        }
                    }
                }
                this.startReqRank();
                UserManager.OnGetSimpleUserInfoEvent.addListener(this.onReqComplete, this);
                this.onReqReviewInfoEvent.dispatch();
            }
        };
        if (this.isNewRound) {
            SocketManager.call(Command.ReviewInfo_Req_3707, null, callback, null, this);
        }
    };
    /**
     * 重置数据
    */
    GamblingReviewHandler.prototype.reset = function () {
        this.isNewRound = false;
        this.overActionStep = 0;
        if (!this.reviewInfoList) {
            this.reviewInfoList = new Array();
        }
        if (!this.dealActionRecord) {
            this.dealActionRecord = new Array();
        }
        if (!this.pubCardList) {
            this.pubCardList = new Array();
        }
        qin.ArrayUtil.Clear(this.reviewInfoList);
        qin.ArrayUtil.Clear(this.dealActionRecord);
        qin.ArrayUtil.Clear(this.pubCardList);
    };
    /**
     * 根据操作种类设置信息
    */
    GamblingReviewHandler.prototype.setInfoByActionType = function (info) {
        switch (info.action) {
            case PlayerState.PoolWon://设置结束操作的步数
                this.setOverRecordStep(info);
                break;
            case PlayerState.ThePos://写入玩家roleId和座位位置
                this.setPlayerRoleIdAndPos(info);
                break;
            case PlayerState.ButtonPos://写入庄家位信息
                this.setButtonPos(info);
                break;
            case PlayerState.Blind://写入盲注位信息
                this.setBlindPos(info);
                break;
            case PlayerState.PubCard://设置公共牌信息
                this.setPubCardsInfo(info);
                break;
            case PlayerState.ShowCard://设置是否亮牌
                this.setIsShowCard(info);
                break;
        }
    };
    /**
     * 写入玩家roleId和座位位置
    */
    GamblingReviewHandler.prototype.setPlayerRoleIdAndPos = function (info) {
        var playerReviewInfo = new PlayerReviewInfo();
        playerReviewInfo.roleId = info.roleId;
        playerReviewInfo.pos = info.num1;
        this.reviewInfoList.push(playerReviewInfo);
    };
    /**
     * 写入庄家位
    */
    GamblingReviewHandler.prototype.setButtonPos = function (info) {
        for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.pos == info.num1) {
                playerInfo.posType = PlayerPosType.Banker;
                break;
            }
        }
    };
    /**
     * 写入大小盲位
    */
    GamblingReviewHandler.prototype.setBlindPos = function (info) {
        var blind;
        if (GamblingManager.roomInfo.ante) {
            blind = info.num1 - GamblingManager.roomInfo.ante;
        }
        else {
            blind = info.num1;
        }
        for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.roleId == info.roleId && playerInfo.posType != PlayerPosType.Banker) {
                if (blind == GamblingManager.roomInfo.sBlind) {
                    playerInfo.posType = PlayerPosType.Sblind;
                }
                if (blind == GamblingManager.roomInfo.bBlind) {
                    playerInfo.posType = PlayerPosType.Bblind;
                }
                break;
            }
        }
    };
    /**
     * 设置结束操作的步数
    */
    GamblingReviewHandler.prototype.setOverRecordStep = function (info) {
        if (this.overActionStep) {
            if (this.overActionStep > info.step) {
                this.overActionStep = info.step;
            }
        }
        else {
            this.overActionStep = info.step;
        }
    };
    /**
    * 设置5张公共牌信息
   */
    GamblingReviewHandler.prototype.setPubCardsInfo = function (info) {
        this.dealActionRecord.push(info);
        var cardInfos = new Array();
        var cards = new Array();
        try {
            cards = JSON.parse(info.cards);
        }
        catch (e) {
            qin.Console.log(e);
        }
        if (cards) {
            GamblingUtil.cardArr2CardInfoList(cards, cardInfos);
        }
        this.pubCardList = this.pubCardList.concat(cardInfos);
    };
    /**
     * 设置自己的操作信息
    */
    GamblingReviewHandler.prototype.setSelfActionRecord = function (info) {
        if (this.reviewInfoList.length > 0) {
            for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
                var playerReviewInfo = _a[_i];
                if (info.roleId == playerReviewInfo.roleId) {
                    if (info.action != PlayerState.WaitAction) {
                        if (!playerReviewInfo.selfActionRecord) {
                            playerReviewInfo.selfActionRecord = new Array();
                        }
                        playerReviewInfo.selfActionRecord.push(info); //将用户自己的操作保存起来                        
                    }
                    break;
                }
            }
        }
    };
    /**
     * 设置手牌和自己的操作信息
    */
    GamblingReviewHandler.prototype.setSelfCardsInfo = function (info) {
        if (this.reviewInfoList.length > 0) {
            for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
                var playerReviewInfo = _a[_i];
                if (info.roleId == playerReviewInfo.roleId) {
                    if (info.cards) {
                        var cards = new Array();
                        try {
                            cards = JSON.parse(info.cards);
                        }
                        catch (e) {
                            qin.Console.log(e);
                        }
                        if (cards) {
                            playerReviewInfo.cardList = new Array();
                            GamblingUtil.cardArr2CardInfoList(cards, playerReviewInfo.cardList);
                        }
                    }
                    break;
                }
            }
        }
    };
    /**
     * 设置是否亮牌
    */
    GamblingReviewHandler.prototype.setIsShowCard = function (info) {
        if (this.reviewInfoList.length > 0) {
            for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
                var playerReviewInfo = _a[_i];
                if (info.roleId == playerReviewInfo.roleId) {
                    if (info.num1) {
                        playerReviewInfo.isShowCard = true;
                    }
                    else {
                        playerReviewInfo.isShowCard = false;
                    }
                    break;
                }
            }
        }
    };
    /**
     * 设置输赢信息
    */
    GamblingReviewHandler.prototype.setResultInfo = function (playerReviewInfo) {
        var isWinFlag = false;
        for (var _i = 0, _a = playerReviewInfo.selfActionRecord; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.action == PlayerState.PoolWon) {
                isWinFlag = true;
                if (playerReviewInfo.betNum) {
                    playerReviewInfo.betNum += info.num2;
                }
                else {
                    playerReviewInfo.betNum = info.num2;
                }
            }
        }
        var num = 0;
        for (var _b = 0, _c = playerReviewInfo.selfActionRecord; _b < _c.length; _b++) {
            var info = _c[_b];
            if (info.action == PlayerState.Blind || info.action == PlayerState.Raise || info.action == PlayerState.AllIn || info.action == PlayerState.Call) {
                num += info.num1;
            }
        }
        if (!isWinFlag) {
            playerReviewInfo.isWin = false;
            playerReviewInfo.betNum = num;
        }
        else {
            playerReviewInfo.betNum = playerReviewInfo.betNum - num;
            if (playerReviewInfo.betNum > 0) {
                playerReviewInfo.isWin = true;
            }
            else {
                playerReviewInfo.betNum = Math.abs(playerReviewInfo.betNum);
                playerReviewInfo.isWin = false;
            }
        }
    };
    /**
     * 设置牌型描述信息
    */
    GamblingReviewHandler.prototype.setCardsTypeDes = function (playerReviewInfo) {
        var allCards = playerReviewInfo.cardList.concat(this.pubCardList);
        CardTypeMatchUtil.matchCardType(allCards);
        playerReviewInfo.cardTypeDes = CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType);
    };
    /**
     * 牌局是否进行到最后一步的比牌
    */
    GamblingReviewHandler.prototype.isCompare = function () {
        if (this.pubCardList && this.pubCardList.length == 5) {
            var index = this.reviewInfoList.length;
            for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
                var reviewInfo = _a[_i];
                for (var _b = 0, _c = reviewInfo.selfActionRecord; _b < _c.length; _b++) {
                    var actionInfo = _c[_b];
                    if (actionInfo.action == PlayerState.Fold || actionInfo.action == PlayerState.StandUp) {
                        index--;
                        break;
                    }
                }
            }
            if (index > 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * 获取盲注
    */
    GamblingReviewHandler.prototype.getBlind = function (roleId) {
        for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
            var reviewInfo = _a[_i];
            if (reviewInfo.roleId == roleId) {
                for (var _b = 0, _c = reviewInfo.selfActionRecord; _b < _c.length; _b++) {
                    var actionInfo = _c[_b];
                    if (actionInfo.action == PlayerState.Blind) {
                        return actionInfo.num1;
                    }
                }
            }
        }
        return 0;
    };
    /**
     * 开始请求
     */
    GamblingReviewHandler.prototype.startReqRank = function () {
        this._index = 0;
        this.nextReq();
    };
    /**
     * 请求下一个
     */
    GamblingReviewHandler.prototype.nextReq = function () {
        if (this._index < this.reviewInfoList.length) {
            var info = this.reviewInfoList[this._index];
            UserManager.reqSimpleUserInfo(info.roleId);
        }
        else {
            this.onGetAllPlayerInfoEvent.dispatch();
            UserManager.OnGetSimpleUserInfoEvent.removeListener(this.onReqComplete, this);
        }
    };
    /**
     * 请求完成
     */
    GamblingReviewHandler.prototype.onReqComplete = function (data) {
        if (data) {
            for (var _i = 0, _a = this.reviewInfoList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.roleId == data.roleId) {
                    info.copyValueFrom(data);
                    break;
                }
            }
        }
        this._index++;
        this.nextReq();
    };
    return GamblingReviewHandler;
}());
__reflect(GamblingReviewHandler.prototype, "GamblingReviewHandler");
//# sourceMappingURL=GamblingReviewHandler.js.map