/**
 * 百人大战金币动画
 */
class HundredWarAnime
{
    /**
     * 缓存列表
     */
    public coinList: Array<HundredWarCoinInfo> = new Array<HundredWarCoinInfo>();
    /**
     * 父对象
     */
    private _parent: egret.DisplayObjectContainer;

    public readonly betOffset: egret.Point;
    //注池位置
    public betPosList: Array<egret.Point> = new Array<egret.Point>();
    //无座玩家位置
    public readonly noSeatPos: egret.Point = new egret.Point(59, 1092);

    public constructor(parent: egret.DisplayObjectContainer, betObjs: egret.DisplayObject[], betOffset: egret.Point, offsx: number = 0, offsy: number = 0)
    {
        this._parent = parent;
        for (let i: number = 0; i < betObjs.length; i++)
        {
            let displayObj: egret.DisplayObject = betObjs[i];
            this.betPosList.push(this.getGlobalCenter(displayObj, offsx, offsy));
        }
        this.betOffset = betOffset;
    }
    /**
     * 更新位置
    */
    public refreshPos(betObjs: egret.DisplayObject[], offsx: number = 0, offsy: number = 0)
    {
        let changedy: number = 0;
        changedy = this.getGlobalCenter(betObjs[0], offsx, offsy).y - this.betPosList[0].y;
        if (this.coinList && this.coinList.length > 0)
        {
            for (let coin of this.coinList)
            {
                coin.image.y = coin.image.y + changedy;
            }
        }
        for (let i: number = 0; i < betObjs.length; i++)
        {
            let displayObj: egret.DisplayObject = betObjs[i];
            this.betPosList[i] = this.getGlobalCenter(displayObj, offsx, offsy);
        }
    }
    /**
     * 创建金币动画(新动画，有缓存)
     */
    private createCoinTween(startPos: egret.Point, endPos: egret.Point, bet: number, during: number, wait: number, onComplete?: Function): HundredWarCoinInfo
    {
        if (this.coinList.length > 0)
        {
            for (let coin of this.coinList)
            {
                if (!coin.image.visible)
                {
                    coin.image.visible = true;
                    coin.bet = bet;
                    this.setTween(coin.image, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
                    return coin;
                }
            }
        }
        let coin: HundredWarCoinInfo = new HundredWarCoinInfo(ResFixedFileName.ChipCoin_Img, 40, bet);
        this.setTween(coin.image, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
        this.coinList.push(coin);
        return coin;
    }
    /**
     * 设置金币动画(已显示的金币)
     */
    private setTween(coin: eui.Image, startPos: egret.Point, endPos: egret.Point, during: number, wait: number, ease: Function, onComplete?: Function)
    {
        this._parent.addChild(coin);
        if (onComplete)
        {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease).call(onComplete);
        }
        else
        {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease);
        }
    }
    /**
     * 重置所有金币
     */
    public resetAllCoins()
    {
        for (let coin of this.coinList)
        {
            this.resetCoin(coin);
        }
    }
    /**
     * 重置一个金币
     */
    public resetCoin(coin: HundredWarCoinInfo)
    {
        coin.bet = undefined;
        coin.image.visible = false;
        if (coin.image.parent)
        {
            coin.image.parent.removeChild(coin.image);
        }
    }
    /**
     * 从某个地方向多个注池发一次金币
     */
    public setCoinToBets(startObj: egret.DisplayObject, posList: number[], offsx: number = 0, offsy: number = 0)
    {
        for (let i: number = 0; i < posList.length; i++)
        {
            let offsetX: number = game.MathUtil.getRandom(0, this.betOffset.x);
            let offsetY: number = game.MathUtil.getRandom(0, this.betOffset.y);
            let endPos: egret.Point = new egret.Point(this.betPosList[posList[i] - 1].x + offsetX, this.betPosList[posList[i] - 1].y + offsetY);
            this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, posList[i], 500, i * 100);
            if (offsetX < offsetY)
            {
                offsetX = game.MathUtil.getRandom(0, this.betOffset.x);
                offsetY = game.MathUtil.getRandom(0, this.betOffset.y);
                endPos = new egret.Point(this.betPosList[posList[i] - 1].x + offsetX, this.betPosList[posList[i] - 1].y + offsetY);
                this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, posList[i], 500, i * 100);
            }
        }
    }
    /**
     * 从某个地方向某个注池发几次金币
    */
    public setCoinToBet(startObj: egret.DisplayObject, pos: number, num: number, offsx: number = 0, offsy: number = 0)
    {
        let index: number = pos - 1;
        for (let i: number = 0; i < num; i++)
        {
            let offsetX: number = game.MathUtil.getRandom(0, this.betOffset.x);
            let offsetY: number = game.MathUtil.getRandom(0, this.betOffset.y);
            let endPos: egret.Point = new egret.Point(this.betPosList[index].x + offsetX, this.betPosList[index].y + offsetY);
            this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, i + 1, 500, i * 10);
            if (offsetX < offsetY)
            {
                offsetX = game.MathUtil.getRandom(0, this.betOffset.x);
                offsetY = game.MathUtil.getRandom(0, this.betOffset.y);
                endPos = new egret.Point(this.betPosList[index].x + offsetX, this.betPosList[index].y + offsetY);
                this.createCoinTween(this.getGlobalCenter(startObj, offsx, offsy), endPos, i + 1, 500, i * 10);
            }
        }
    }
    /**
     * 通过数量创建金币(不设置注池)
     */
    public setCoinFromToByNum(startObj: egret.DisplayObject, targetObj: egret.DisplayObject, num: number, during: number, span?: number, startOffsetX: number = 0, startOffsetY: number = 0, endOffsetX = 0, endOffsetY = 0)
    {
        let thisObj = this;
        for (let i: number = 0; i < num; i++)
        {
            let callback: Function = function ()
            {
                thisObj.resetCoin(coin);
            }
            let coin = this.createCoinTween(this.getGlobalCenter(startObj, startOffsetX, startOffsetY), this.getGlobalCenter(targetObj, endOffsetX, endOffsetY), undefined, during, i * span, callback);
        }
    }
    /**
     * 从四个注池回收所有金币到某个地方
     */
    public setAllCoinBack(targetObj: egret.DisplayObject, offsx: number = 0, offsy: number = 0)
    {
        let thisObj = this;
        for (let i: number = 0; i < this.coinList.length; i++)
        {
            let coin = this.coinList[i];
            if (coin.bet)
            {
                let callback: Function = function ()
                {
                    thisObj.resetCoin(coin);
                }
                this.setTween(coin.image, coin.image.localToGlobal(), this.getGlobalCenter(targetObj, offsx, offsy), 200, i * 5, egret.Ease.quartIn, callback);
            }
        }
    }
    /**
     * 回收某个注池的金币到某个地方
     */
    public setCoinBackByBet(betIndex: number, targetObj: egret.DisplayObject, offsx: number = 0, offsy: number = 0)
    {
        let thisObj = this;
        for (let i: number = 0; i < this.coinList.length; i++)
        {
            let coin = this.coinList[i];
            if (coin.bet == betIndex)
            {
                let callback: Function = function ()
                {
                    thisObj.resetCoin(coin);
                }
                this.setTween(coin.image, coin.image.localToGlobal(), this.getGlobalCenter(targetObj, offsx, offsy), 500, i * 5, egret.Ease.quartIn, callback);
            }
        }
    }
    /**
     * 获取显示对象的全局中心点
     */
    public getGlobalCenter(obj: any, offsx: number = 0, offsy: number = 0): egret.Point
    {
        if (obj.horizontalCenter || obj.verticalCenter)
        {
            let centerPoint = new egret.Point(GameManager.stage.stageWidth / 2, GameManager.stage.stageHeight / 2);
            let globalPos: egret.Point = new egret.Point(centerPoint.x + obj.horizontalCenter, centerPoint.y + obj.verticalCenter);
            return new egret.Point(globalPos.x - obj.width / 2 + offsx, globalPos.y - obj.height / 2 + offsy);
        } else
        {
            let globalPos: egret.Point = obj.localToGlobal();
            return new egret.Point(globalPos.x + obj.width / 2 + offsx, globalPos.y + obj.height / 2 + offsx);
        }
    }
    /**
     * 清除缓存
    */
    public clear()
    {
        this.resetAllCoins();
        game.ArrayUtil.Clear(this.coinList);
    }
}
/**
 * 金币信息
 */
class HundredWarCoinInfo
{
    /**
    * 所属注池
    */
    public bet: number;
    /**
     * 显示对象
     */
    public image: eui.Image = new eui.Image();
    public constructor(source: string, size: number, bet: number)
    {
        this.image.source = source;
        this.image.touchEnabled = false;
        this.image.width = this.image.height = size;
        this.bet = bet;
    }

}

/**
 * 牌动画
 */
class HundredWarCardAnime
{
    public cardList: Array<HundredWarCardAnimeInfo> = new Array<HundredWarCardAnimeInfo>();
    /**
     * 父对象
     */
    private _parent: egret.DisplayObjectContainer;
    public betPosList: Array<egret.Point> = new Array<egret.Point>();

    public constructor(parent: egret.DisplayObjectContainer, betObjs: egret.DisplayObjectContainer[], offsx: number = 0, offsy: number = 0)
    {
        this._parent = parent;
        for (let i: number = 0; i < betObjs.length; i++)
        {
            let displayObj: egret.DisplayObjectContainer = betObjs[i];
            let pos = this.getGlobalCenter(displayObj, offsx, offsy);
            this.betPosList.push(new egret.Point(pos.x - 15, pos.y));
        }
    }
    /**
     * 更新位置
    */
    public refreshPos(betObjs: egret.DisplayObjectContainer[], offsx: number = 0, offsy: number = 0)
    {
        let changedy: number = 0;
        if (this.cardList && this.cardList.length > 0)
        {
            for (let card of this.cardList)
            {
                if (card.bet == 0)
                {
                    changedy = this.getGlobalCenter(betObjs[0], offsx, offsy).y - this.betPosList[0].y;
                } else
                {
                    changedy = this.getGlobalCenter(betObjs[1], offsx, offsy).y - this.betPosList[1].y;
                }
                card.cardFaceCom.y = card.cardFaceCom.y + changedy;
            }
        }
        for (let i: number = 0; i < betObjs.length; i++)
        {
            let displayObj: egret.DisplayObject = betObjs[i];
            this.betPosList[i] = this.getGlobalCenter(displayObj, offsx, offsy);
        }
    }
    /**
     * 创建一张牌
     */
    public createCard(cardInfo: CardInfo, startPos: egret.Point, endPos: egret.Point, bet: number, during: number, wait: number, onComplete?: Function): HundredWarCardAnimeInfo
    {
        if (this.cardList.length > 0)
        {
            let card1: HundredWarCardAnimeInfo;
            for (let i: number = 0; i < this.cardList.length; i++)
            {
                card1 = this.cardList[i];
                if (!card1.cardFaceCom.parent)
                {
                    card1.bet = bet;
                    card1.cardFaceCom.init(cardInfo);
                    this._parent.addChildAt(card1.cardFaceCom, 0);
                    this.setTween(card1.cardFaceCom, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
                    return card1;
                }
            }
        }
        let card: HundredWarCardAnimeInfo = new HundredWarCardAnimeInfo(cardInfo, bet, 0.7);
        let run: CardFaceTurnToFace = <CardFaceTurnToFace>this.getAnimation(AnimationType.CardFaceTurnToFace, card.cardFaceCom);
        run.reset();
        this._parent.addChildAt(card.cardFaceCom, 0);
        this.setTween(card.cardFaceCom, startPos, endPos, during, wait, egret.Ease.quartOut, onComplete);
        this.cardList.push(card);
        return card;
    }
    /**
     * 创建一组牌
     */
    public createCardGroup(cardList: Array<CardInfo>, posObj: egret.DisplayObjectContainer, bet: number, wait: number, flag: boolean, offsx: number = 0, offsy: number = 0)
    {
        let thisObj = this;
        let cards: HundredWarCardAnimeInfo[] = new Array<HundredWarCardAnimeInfo>();
        for (let i: number = 0; i < cardList.length; i++)
        {
            let quotient: number = Math.floor((i + 1) / 5);  //商
            let remainder: number = (i + 1) % 5;  //余数
            let j: number;
            if (remainder == 0)
            {
                j = (quotient - 1) * 50;  //等待时间
            } else
            {
                j = quotient * 50 + (5 - remainder) * 50;  //等待时间
            }
            if (i == cardList.length - 1)
            {
                let callback = function ()
                {
                    thisObj.onMoveOver(cards, bet, flag);
                }
                let card = this.createCard(cardList[i], this.getGlobalCenter(posObj, offsx, offsy), this.betPosList[bet], bet, 500, wait + j, callback);
                card.index = i;
                cards.push(card);
            }
            else
            {
                let card = this.createCard(cardList[i], this.getGlobalCenter(posObj, offsx, offsy), this.betPosList[bet], bet, 500, wait + j);
                card.index = i;
                cards.push(card);
            }

        }
    }

    public onMoveOver(cards: HundredWarCardAnimeInfo[], bet: number, flag: boolean)
    {
        let thisObj = this;
        let callback = function ()
        {
            if (flag == true)
            {
                thisObj.onShowCardsOver();
            }
        }
        for (let i: number = 0; i < cards.length; i++)
        {
            this.changeIndex(cards[i].cardFaceCom);
            if (i == cards.length - 1)
            {
                this.setTween(cards[i].cardFaceCom, this.betPosList[bet], new egret.Point(this.betPosList[bet].x + cards[i].index * 22.6, this.betPosList[bet].y), 300, 0, egret.Ease.cubicIn, callback);
            } else
            {
                this.setTween(cards[i].cardFaceCom, this.betPosList[bet], new egret.Point(this.betPosList[bet].x + cards[i].index * 22.6, this.betPosList[bet].y), 300, 0, egret.Ease.cubicIn);
            }
        }
    }
    /**
     * 改变牌的层级
    */
    private changeIndex(disObj: egret.DisplayObject)
    {
        this._parent.addChildAt(disObj, this._parent.numChildren - 6);
    }
    /**
     * 横向铺开完成后
    */
    public onShowCardsOver()
    {
        this.ShowAllCard();
    }
    /**
     * 隐藏所有的牌
    */
    public hideAllCards()
    {
        if (this.cardList)
        {
            for (let card of this.cardList)     
            {
                this.resetCard(card);
            }
        }
    }

    public ShowAllCard()
    {
        for (let i: number = 0; i < this.betPosList.length; i++)
        {
            egret.setTimeout(this.ShowCardByBet, this, i * 500, i);
        }
    }
    /**
     * 显示一组牌
     */
    public ShowCardByBet(bet: number)
    {
        for (let cardinfo of this.cardList)
        {
            if (cardinfo.bet == bet)
            {
                this.startRunThanTheCardAnim(new egret.Point(cardinfo.cardFaceCom.x, cardinfo.cardFaceCom.y), cardinfo.cardFaceCom, cardinfo.index + 1);
            }
        }
        HundredWarManager.onShowCardsEvent.dispatch(bet);
    }

    private startRunThanTheCardAnim(point: egret.Point, target: CardFaceComponent, index: number)
    {
        let run: CardFaceMoveToPoint = <CardFaceMoveToPoint>this.getAnimation(AnimationType.CardFaceMoveToPoint, target);
        run.nextAnimation = this.getAnimation(AnimationType.CardFaceTurnToFace, target);
        (run.nextAnimation as CardFaceTurnToFace).scale = 0.7;

        let initX: number = 0;
        if (index == 1)
        {
            initX = point.x + 15;
        }
        else
        {
            initX = point.x - 15;
        }
        run.run(point, initX);
    }
    private getAnimation(type: AnimationType, target: CardFaceComponent)
    {
        let run: BaseAnimation<CardFaceComponent> = AnimationFactory.getCardFaceAnimation(type);
        run.setTarget(target);
        return run;
    }

    private setTween(coin: egret.DisplayObject, startPos: egret.Point, endPos: egret.Point, during: number, wait: number, ease: Function, onComplete?: Function)
    {
        if (onComplete)
        {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease).call(onComplete);
        }
        else
        {
            egret.Tween.get(coin)
                .set({ x: startPos.x, y: startPos.y })
                .wait(wait)
                .to({ x: endPos.x, y: endPos.y }, during, ease);
        }
    }
    /**
     * 获取显示对象的全局中心点
     */
    public getGlobalCenter(obj: any, offsx: number = 0, offsy: number = 0): egret.Point
    {
        if (obj)
        {
            if (obj.horizontalCenter != NaN || obj.verticalCenter != NaN)
            {
                let centerPoint = new egret.Point(GameManager.stage.stageWidth / 2, GameManager.stage.stageHeight / 2);
                let globalPos: egret.Point;
                if (obj.top)
                {
                    globalPos = new egret.Point(centerPoint.x + obj.horizontalCenter, obj.top + 57);
                } else
                {
                    globalPos = new egret.Point(centerPoint.x + obj.horizontalCenter, centerPoint.y + obj.verticalCenter);
                }
                return new egret.Point(globalPos.x - obj.width / 2 + offsx, globalPos.y - obj.height / 2 + offsy);
            } else
            {
                let globalPos: egret.Point = obj.localToGlobal();
                return new egret.Point(globalPos.x + obj.width / 2 + offsx, globalPos.y + obj.height / 2 + offsy);
            }
        }
    }
    /**
     * 重置一张牌
     */
    public resetCard(card: HundredWarCardAnimeInfo)
    {
        card.bet = undefined;
        card.index = undefined;
        card.cardFaceCom.visible = false;
        let run: CardFaceTurnToFace = <CardFaceTurnToFace>this.getAnimation(AnimationType.CardFaceTurnToFace, card.cardFaceCom);
        run.reset();
        egret.Tween.removeTweens(card.cardFaceCom);
        if (card.cardFaceCom.parent)
        {
            card.cardFaceCom.parent.removeChild(card.cardFaceCom);
        }
    }
    /**
     * 清除缓存
    */
    public clear()
    {
        this.hideAllCards();
        game.ArrayUtil.Clear(this.cardList);
    }
}

/**
 * 牌信息
 */
class HundredWarCardAnimeInfo
{
    public bet: number;
    public index: number;
    public cardFaceCom: CardFaceComponent = new CardFaceComponent(UIComponentSkinName.CardFaceComponent);
    public constructor(cardInfo: CardInfo, bet: number, scale: number)
    {
        this.cardFaceCom.scaleX = this.cardFaceCom.scaleY = scale;
        this.bet = bet;
        this.cardFaceCom.init(cardInfo);
    }
}