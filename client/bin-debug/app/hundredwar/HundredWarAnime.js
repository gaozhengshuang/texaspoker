var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 百人大战金币动画
 */
var HundredWarAnime = (function () {
    function HundredWarAnime(parent, betObjs, betOffset, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        /**
         * 缓存列表
         */
        this.coinList = new Array();
        //注池位置
        this.betPosList = new Array();
        //无座玩家位置
        this.noSeatPos = new egret.Point(59, 1092);
        this._parent = parent;
        for (var i = 0; i < betObjs.length; i++) {
            var displayObj = betObjs[i];
            this.betPosList.push(this.getGlobalCenter(displayObj, offsx, offsy));
        }
        this.betOffset = betOffset;
    }
    /**
     * 更新位置
    */
    HundredWarAnime.prototype.refreshPos = function (betObjs, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var changedy = 0;
        changedy = this.getGlobalCenter(betObjs[0], offsx, offsy).y - this.betPosList[0].y;
        if (this.coinList && this.coinList.length > 0) {
            for (var _i = 0, _a = this.coinList; _i < _a.length; _i++) {
                var coin = _a[_i];
                coin.image.y = coin.image.y + changedy;
            }
        }
        for (var i = 0; i < betObjs.length; i++) {
            var displayObj = betObjs[i];
            this.betPosList[i] = this.getGlobalCenter(displayObj, offsx, offsy);
        }
    };
    /**
     * 创建金币动画(新动画，有缓存)
     */
    HundredWarAnime.prototype.createCoinTween = function (startPos, endPos, bet, during, wait, onComplete) {
        if (this.coinList.length > 0) {
            for (var _i = 0, _a = this.coinList; _i < _a.length; _i++) {
                var coin_1 = _a[_i];
                if (!coin_1.image.visible) {
                    coin_1.image.visible = true;
                    coin_1.bet = bet;
                    this.setTween(coin_1.image, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
                    return coin_1;
                }
            }
        }
        var coin = new HundredWarCoinInfo(ResFixedFileName.ChipCoin_Img, 40, bet);
        this.setTween(coin.image, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
        this.coinList.push(coin);
        return coin;
    };
    /**
     * 设置金币动画(已显示的金币)
     */
    HundredWarAnime.prototype.setTween = function (coin, startPos, endPos, during, wait, ease, onComplete) {
        this._parent.addChild(coin);
        if (onComplete) {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease).call(onComplete);
        }
        else {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease);
        }
    };
    /**
     * 重置所有金币
     */
    HundredWarAnime.prototype.resetAllCoins = function () {
        for (var _i = 0, _a = this.coinList; _i < _a.length; _i++) {
            var coin = _a[_i];
            this.resetCoin(coin);
        }
    };
    /**
     * 重置一个金币
     */
    HundredWarAnime.prototype.resetCoin = function (coin) {
        coin.bet = undefined;
        coin.image.visible = false;
        if (coin.image.parent) {
            coin.image.parent.removeChild(coin.image);
        }
    };
    /**
     * 从某个地方向多个注池发一次金币
     */
    HundredWarAnime.prototype.setCoinToBets = function (startObj, posList, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        for (var i = 0; i < posList.length; i++) {
            var offsetX = qin.MathUtil.getRandom(0, this.betOffset.x);
            var offsetY = qin.MathUtil.getRandom(0, this.betOffset.y);
            var endPos = new egret.Point(this.betPosList[posList[i] - 1].x + offsetX, this.betPosList[posList[i] - 1].y + offsetY);
            this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, posList[i], 500, i * 100);
            if (offsetX < offsetY) {
                offsetX = qin.MathUtil.getRandom(0, this.betOffset.x);
                offsetY = qin.MathUtil.getRandom(0, this.betOffset.y);
                endPos = new egret.Point(this.betPosList[posList[i] - 1].x + offsetX, this.betPosList[posList[i] - 1].y + offsetY);
                this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, posList[i], 500, i * 100);
            }
        }
    };
    /**
     * 从某个地方向某个注池发几次金币
    */
    HundredWarAnime.prototype.setCoinToBet = function (startObj, pos, num, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var index = pos - 1;
        for (var i = 0; i < num; i++) {
            var offsetX = qin.MathUtil.getRandom(0, this.betOffset.x);
            var offsetY = qin.MathUtil.getRandom(0, this.betOffset.y);
            var endPos = new egret.Point(this.betPosList[index].x + offsetX, this.betPosList[index].y + offsetY);
            this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, i + 1, 500, i * 10);
            if (offsetX < offsetY) {
                offsetX = qin.MathUtil.getRandom(0, this.betOffset.x);
                offsetY = qin.MathUtil.getRandom(0, this.betOffset.y);
                endPos = new egret.Point(this.betPosList[index].x + offsetX, this.betPosList[index].y + offsetY);
                this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, i + 1, 500, i * 10);
            }
        }
    };
    /**
     * 通过数量创建金币(不设置注池)
     */
    HundredWarAnime.prototype.setCoinFromToByNum = function (startObj, targetObj, num, during, span, startOffsetX, startOffsetY, endOffsetX, endOffsetY) {
        if (startOffsetX === void 0) { startOffsetX = 0; }
        if (startOffsetY === void 0) { startOffsetY = 0; }
        if (endOffsetX === void 0) { endOffsetX = 0; }
        if (endOffsetY === void 0) { endOffsetY = 0; }
        var thisObj = this;
        var _loop_1 = function (i) {
            var callback = function () {
                thisObj.resetCoin(coin);
            };
            var coin = this_1.createCoinTween(this_1.getGlobalCenter(startObj, startOffsetX, startOffsetY), this_1.getGlobalCenter(targetObj, endOffsetX, endOffsetY), undefined, during, i * span, callback);
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    /**
     * 从四个注池回收所有金币到某个地方
     */
    HundredWarAnime.prototype.setAllCoinBack = function (targetObj, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var thisObj = this;
        var _loop_2 = function (i) {
            var coin = this_2.coinList[i];
            if (coin.bet) {
                var callback = function () {
                    thisObj.resetCoin(coin);
                };
                this_2.setTween(coin.image, coin.image.localToGlobal(), this_2.getGlobalCenter(targetObj, offsx, offsy), 200, i * 5, egret.Ease.quartIn, callback);
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.coinList.length; i++) {
            _loop_2(i);
        }
    };
    /**
     * 回收某个注池的金币到某个地方
     */
    HundredWarAnime.prototype.setCoinBackByBet = function (betIndex, targetObj, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var thisObj = this;
        var _loop_3 = function (i) {
            var coin = this_3.coinList[i];
            if (coin.bet == betIndex) {
                var callback = function () {
                    thisObj.resetCoin(coin);
                };
                this_3.setTween(coin.image, coin.image.localToGlobal(), this_3.getGlobalCenter(targetObj, offsx, offsy), 500, i * 5, egret.Ease.quartIn, callback);
            }
        };
        var this_3 = this;
        for (var i = 0; i < this.coinList.length; i++) {
            _loop_3(i);
        }
    };
    /**
     * 获取显示对象的全局中心点
     */
    HundredWarAnime.prototype.getGlobalCenter = function (obj, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        if (obj.horizontalCenter || obj.verticalCenter) {
            var centerPoint = new egret.Point(GameManager.stage.stageWidth / 2, GameManager.stage.stageHeight / 2);
            var globalPos = new egret.Point(centerPoint.x + obj.horizontalCenter, centerPoint.y + obj.verticalCenter);
            return new egret.Point(globalPos.x - obj.width / 2 + offsx, globalPos.y - obj.height / 2 + offsy);
        }
        else {
            var globalPos = obj.localToGlobal();
            return new egret.Point(globalPos.x + obj.width / 2 + offsx, globalPos.y + obj.height / 2 + offsx);
        }
    };
    /**
     * 清除缓存
    */
    HundredWarAnime.prototype.clear = function () {
        this.resetAllCoins();
        qin.ArrayUtil.Clear(this.coinList);
    };
    return HundredWarAnime;
}());
__reflect(HundredWarAnime.prototype, "HundredWarAnime");
/**
 * 金币信息
 */
var HundredWarCoinInfo = (function () {
    function HundredWarCoinInfo(source, size, bet) {
        /**
         * 显示对象
         */
        this.image = new eui.Image();
        this.image.source = source;
        this.image.touchEnabled = false;
        this.image.width = this.image.height = size;
        this.bet = bet;
    }
    return HundredWarCoinInfo;
}());
__reflect(HundredWarCoinInfo.prototype, "HundredWarCoinInfo");
/**
 * 牌动画
 */
var HundredWarCardAnime = (function () {
    function HundredWarCardAnime(parent, betObjs, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        this.cardList = new Array();
        this.betPosList = new Array();
        this._parent = parent;
        for (var i = 0; i < betObjs.length; i++) {
            var displayObj = betObjs[i];
            var pos = this.getGlobalCenter(displayObj, offsx, offsy);
            this.betPosList.push(new egret.Point(pos.x - 15, pos.y));
        }
    }
    /**
     * 更新位置
    */
    HundredWarCardAnime.prototype.refreshPos = function (betObjs, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var changedy = 0;
        if (this.cardList && this.cardList.length > 0) {
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var card = _a[_i];
                if (card.bet == 0) {
                    changedy = this.getGlobalCenter(betObjs[0], offsx, offsy).y - this.betPosList[0].y;
                }
                else {
                    changedy = this.getGlobalCenter(betObjs[1], offsx, offsy).y - this.betPosList[1].y;
                }
                card.cardFaceCom.y = card.cardFaceCom.y + changedy;
            }
        }
        for (var i = 0; i < betObjs.length; i++) {
            var displayObj = betObjs[i];
            this.betPosList[i] = this.getGlobalCenter(displayObj, offsx, offsy);
        }
    };
    /**
     * 创建一张牌
     */
    HundredWarCardAnime.prototype.createCard = function (cardInfo, startPos, endPos, bet, during, wait, onComplete) {
        if (this.cardList.length > 0) {
            var card1 = void 0;
            for (var i = 0; i < this.cardList.length; i++) {
                card1 = this.cardList[i];
                if (!card1.cardFaceCom.parent) {
                    card1.bet = bet;
                    card1.cardFaceCom.init(cardInfo);
                    this._parent.addChildAt(card1.cardFaceCom, 0);
                    this.setTween(card1.cardFaceCom, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
                    return card1;
                }
            }
        }
        var card = new HundredWarCardAnimeInfo(cardInfo, bet, 0.7);
        var run = this.getAnimation(AnimationType.CardFaceTurnToFace, card.cardFaceCom);
        run.reset();
        this._parent.addChildAt(card.cardFaceCom, 0);
        this.setTween(card.cardFaceCom, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
        this.cardList.push(card);
        return card;
    };
    /**
     * 创建一组牌
     */
    HundredWarCardAnime.prototype.createCardGroup = function (cardList, posObj, bet, wait, flag, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        var thisObj = this;
        var cards = new Array();
        for (var i = 0; i < cardList.length; i++) {
            var quotient = Math.floor((i + 1) / 5); //商
            var remainder = (i + 1) % 5; //余数
            var j = void 0;
            if (remainder == 0) {
                j = (quotient - 1) * 50; //等待时间
            }
            else {
                j = quotient * 50 + (5 - remainder) * 50; //等待时间
            }
            if (i == cardList.length - 1) {
                var callback = function () {
                    thisObj.onMoveOver(cards, bet, flag);
                };
                var card = this.createCard(cardList[i], this.getGlobalCenter(posObj, offsx, offsy), this.betPosList[bet], bet, 500, wait + j, callback);
                card.index = i;
                cards.push(card);
            }
            else {
                var card = this.createCard(cardList[i], this.getGlobalCenter(posObj, offsx, offsy), this.betPosList[bet], bet, 500, wait + j);
                card.index = i;
                cards.push(card);
            }
        }
    };
    HundredWarCardAnime.prototype.onMoveOver = function (cards, bet, flag) {
        var thisObj = this;
        var callback = function () {
            if (flag == true) {
                thisObj.onShowCardsOver();
            }
        };
        for (var i = 0; i < cards.length; i++) {
            this.changeIndex(cards[i].cardFaceCom);
            if (i == cards.length - 1) {
                this.setTween(cards[i].cardFaceCom, this.betPosList[bet], new egret.Point(this.betPosList[bet].x + cards[i].index * 22.6, this.betPosList[bet].y), 300, 0, egret.Ease.cubicIn, callback);
            }
            else {
                this.setTween(cards[i].cardFaceCom, this.betPosList[bet], new egret.Point(this.betPosList[bet].x + cards[i].index * 22.6, this.betPosList[bet].y), 300, 0, egret.Ease.cubicIn);
            }
        }
    };
    /**
     * 改变牌的层级
    */
    HundredWarCardAnime.prototype.changeIndex = function (disObj) {
        this._parent.addChildAt(disObj, this._parent.numChildren - 6);
    };
    /**
     * 横向铺开完成后
    */
    HundredWarCardAnime.prototype.onShowCardsOver = function () {
        this.ShowAllCard();
    };
    /**
     * 隐藏所有的牌
    */
    HundredWarCardAnime.prototype.hideAllCards = function () {
        if (this.cardList) {
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var card = _a[_i];
                this.resetCard(card);
            }
        }
    };
    HundredWarCardAnime.prototype.ShowAllCard = function () {
        for (var i = 0; i < this.betPosList.length; i++) {
            egret.setTimeout(this.ShowCardByBet, this, i * 500, i);
        }
    };
    /**
     * 显示一组牌
     */
    HundredWarCardAnime.prototype.ShowCardByBet = function (bet) {
        for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
            var cardinfo = _a[_i];
            if (cardinfo.bet == bet) {
                this.startRunThanTheCardAnim(new egret.Point(cardinfo.cardFaceCom.x, cardinfo.cardFaceCom.y), cardinfo.cardFaceCom, cardinfo.index + 1);
            }
        }
        HundredWarManager.onShowCardsEvent.dispatch(bet);
    };
    HundredWarCardAnime.prototype.startRunThanTheCardAnim = function (point, target, index) {
        var run = this.getAnimation(AnimationType.CardFaceMoveToPoint, target);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target);
        run.nextAnimation.scale = 0.7;
        var initX = 0;
        if (index == 1) {
            initX = point.x + 15;
        }
        else {
            initX = point.x - 15;
        }
        run.run(point, initX);
    };
    HundredWarCardAnime.prototype.getAnimation = function (type, target) {
        var run = AnimationFactory.getCardFaceAnimation(type);
        run.setTarget(target);
        return run;
    };
    HundredWarCardAnime.prototype.setTween = function (coin, startPos, endPos, during, wait, ease, onComplete) {
        if (onComplete) {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease).call(onComplete);
        }
        else {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease);
        }
    };
    /**
     * 获取显示对象的全局中心点
     */
    HundredWarCardAnime.prototype.getGlobalCenter = function (obj, offsx, offsy) {
        if (offsx === void 0) { offsx = 0; }
        if (offsy === void 0) { offsy = 0; }
        if (obj) {
            if (obj.horizontalCenter != NaN || obj.verticalCenter != NaN) {
                var centerPoint = new egret.Point(GameManager.stage.stageWidth / 2, GameManager.stage.stageHeight / 2);
                var globalPos = void 0;
                if (obj.top) {
                    globalPos = new egret.Point(centerPoint.x + obj.horizontalCenter, obj.top + 57);
                }
                else {
                    globalPos = new egret.Point(centerPoint.x + obj.horizontalCenter, centerPoint.y + obj.verticalCenter);
                }
                return new egret.Point(globalPos.x - obj.width / 2 + offsx, globalPos.y - obj.height / 2 + offsy);
            }
            else {
                var globalPos = obj.localToGlobal();
                return new egret.Point(globalPos.x + obj.width / 2 + offsx, globalPos.y + obj.height / 2 + offsy);
            }
        }
    };
    /**
     * 重置一张牌
     */
    HundredWarCardAnime.prototype.resetCard = function (card) {
        card.bet = undefined;
        card.index = undefined;
        card.cardFaceCom.visible = false;
        var run = this.getAnimation(AnimationType.CardFaceTurnToFace, card.cardFaceCom);
        run.reset();
        egret.Tween.removeTweens(card.cardFaceCom);
        if (card.cardFaceCom.parent) {
            card.cardFaceCom.parent.removeChild(card.cardFaceCom);
        }
    };
    /**
     * 清除缓存
    */
    HundredWarCardAnime.prototype.clear = function () {
        this.hideAllCards();
        qin.ArrayUtil.Clear(this.cardList);
    };
    return HundredWarCardAnime;
}());
__reflect(HundredWarCardAnime.prototype, "HundredWarCardAnime");
/**
 * 牌信息
 */
var HundredWarCardAnimeInfo = (function () {
    function HundredWarCardAnimeInfo(cardInfo, bet, scale) {
        this.cardFaceCom = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
        this.cardFaceCom.scaleX = this.cardFaceCom.scaleY = scale;
        this.bet = bet;
        this.cardFaceCom.init(cardInfo);
    }
    return HundredWarCardAnimeInfo;
}());
__reflect(HundredWarCardAnimeInfo.prototype, "HundredWarCardAnimeInfo");
//# sourceMappingURL=HundredWarAnime.js.map