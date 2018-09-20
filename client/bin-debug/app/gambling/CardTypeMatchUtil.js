var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 牌型匹配
 */
var CardTypeMatchUtil = (function () {
    function CardTypeMatchUtil() {
    }
    // public static testBoardList: Array<CardInfo> = new Array<CardInfo>();
    CardTypeMatchUtil.startTest = function () {
        // CardTypeMatchUtil.testBoardList.length = 0;
        // let testCardInfo: CardInfo = new CardInfo();
        // testCardInfo.card = new Array<number>();
        // testCardInfo.card.push(1, 1);
        // CardTypeMatchUtil.testBoardList.push(testCardInfo);
        // testCardInfo = new CardInfo();
        // testCardInfo.card = new Array<number>();
        // testCardInfo.card.push(2, 1);
        // CardTypeMatchUtil.testBoardList.push(testCardInfo);
        // testCardInfo = new CardInfo();
        // testCardInfo.card = new Array<number>();
        // testCardInfo.card.push(1, 10);
        // CardTypeMatchUtil.testBoardList.push(testCardInfo);
        // testCardInfo = new CardInfo();
        // testCardInfo.card = new Array<number>();
        // testCardInfo.card.push(4, 9);
        // CardTypeMatchUtil.testBoardList.push(testCardInfo);
        // testCardInfo = new CardInfo();
        // testCardInfo.card = new Array<number>();
        // testCardInfo.card.push(4, 2);
        // CardTypeMatchUtil.testBoardList.push(testCardInfo);
    };
    CardTypeMatchUtil.initialize = function () {
        CardTypeMatchUtil.resultList = new Array();
        CardTypeMatchUtil._matchList = new Array();
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchRoyalFlush);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchStraightFlush);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchFourOfAKind);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchFullhouse);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchFlush);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchStraight);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchThreeOfAKind);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchTwoPairs);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchOnePair);
        CardTypeMatchUtil._matchList.push(CardTypeMatchUtil.matchHighCard);
    };
    CardTypeMatchUtil.clear = function () {
        CardTypeMatchUtil.cardType = CardType.None;
        CardTypeMatchUtil.resultList.length = 0;
    };
    /**
     * 奥马哈房间中匹配牌型
    */
    CardTypeMatchUtil.OmahaMatchCardInRoom = function (handCardList) {
        var maxResultList;
        var maxResultCardType;
        var result = false;
        for (var i = 0; i < handCardList.length - 1; i++) {
            var newCardList = new Array();
            newCardList.push(handCardList[i]);
            for (var j = i + 1; j < handCardList.length; j++) {
                newCardList.push(handCardList[j]); //2张手牌
                if (GamblingManager.roomInfo.publicCard) {
                    if (GamblingManager.roomInfo.publicCard.length > 3) {
                        if (GamblingManager.roomInfo.publicCard.length == 4) {
                            for (var m = 0; m < GamblingManager.roomInfo.publicCard.length; m++) {
                                var list = GamblingManager.roomInfo.publicCard.concat();
                                var userList = void 0;
                                list.splice(m, 1); //3张公共牌
                                userList = newCardList.concat(list);
                                result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
                                if (result) {
                                    var obj = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
                                    if (obj) {
                                        maxResultList = obj["maxResultList"];
                                        maxResultCardType = obj["maxResultCardType"];
                                    }
                                }
                                else {
                                    return result;
                                }
                            }
                        }
                        else if (GamblingManager.roomInfo.publicCard.length == 5) {
                            for (var a = 0; a < GamblingManager.roomInfo.publicCard.length - 1; a++) {
                                for (var b = a + 1; b < GamblingManager.roomInfo.publicCard.length; b++) {
                                    var list = GamblingManager.roomInfo.publicCard.concat();
                                    var userList = void 0;
                                    list.splice(a, 1);
                                    list.splice(b - 1, 1); //3张公共牌
                                    userList = newCardList.concat(list);
                                    result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
                                    if (result) {
                                        var obj = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
                                        if (obj) {
                                            maxResultList = obj["maxResultList"];
                                            maxResultCardType = obj["maxResultCardType"];
                                        }
                                    }
                                    else {
                                        return result;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var userList = GamblingManager.roomInfo.publicCard.concat(newCardList);
                        result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
                        if (result) {
                            var obj = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
                            if (obj) {
                                maxResultList = obj["maxResultList"];
                                maxResultCardType = obj["maxResultCardType"];
                            }
                        }
                        else {
                            return result;
                        }
                    }
                }
                newCardList.pop();
            }
        }
        CardTypeMatchUtil.resultList = maxResultList;
        CardTypeMatchUtil.cardType = maxResultCardType;
        if (CardTypeMatchUtil.resultList && CardTypeMatchUtil.resultList.length > 0) {
            CardTypeMatchUtil.matchOver();
        }
        return result;
    };
    /**
     * 获得较大的结果
    */
    CardTypeMatchUtil.getMaxResult = function (maxResultList, maxResultCardType) {
        if (CardTypeMatchUtil.resultList && CardTypeMatchUtil.resultList.length > 0) {
            if (!maxResultList) {
                maxResultList = CardTypeMatchUtil.resultList.concat();
                maxResultCardType = CardTypeMatchUtil.cardType;
            }
            else {
                if (CardTypeMatchUtil.cardType > maxResultCardType) {
                    maxResultList = CardTypeMatchUtil.resultList.concat();
                    maxResultCardType = CardTypeMatchUtil.cardType;
                }
                else if (CardTypeMatchUtil.cardType == maxResultCardType) {
                    var result1Num = "";
                    var result2Num = "";
                    for (var k = 0; k < maxResultList.length; k++) {
                        result1Num += maxResultList[k].card[1];
                        result2Num += CardTypeMatchUtil.resultList[k].card[1];
                    }
                    var num1 = parseInt(result1Num);
                    var num2 = parseInt(result2Num);
                    if (num2 > num1) {
                        maxResultList = CardTypeMatchUtil.resultList.concat();
                        maxResultCardType = CardTypeMatchUtil.cardType;
                    }
                }
            }
            var obj = new Object;
            obj["maxResultList"] = maxResultList;
            obj["maxResultCardType"] = maxResultCardType;
            return obj;
        }
        return null;
    };
    /**
     * 奥马哈房间中匹配牌型
     * @param handCardList
     */
    CardTypeMatchUtil.omahaMatchCardInRoom = function (cardList) {
        if (GamblingManager.roomInfo) {
            return CardTypeMatchUtil.matchCardType(cardList);
        }
        return false;
    };
    /**
     * 房间中匹配牌型
     * @param handCardList
     */
    CardTypeMatchUtil.matchCardInRoom = function (handCardList) {
        if (GamblingManager.roomInfo) {
            var allList = void 0;
            if (GamblingManager.roomInfo.publicCard && handCardList) {
                allList = GamblingManager.roomInfo.publicCard.concat(handCardList);
                // allList = CardTypeMatchUtil.testBoardList.concat(handCardList);
            }
            else if (handCardList) {
                allList = handCardList.concat();
            }
            else if (GamblingManager.roomInfo.publicCard) {
                allList = GamblingManager.roomInfo.publicCard.concat();
            }
            return CardTypeMatchUtil.matchCardType(allList);
        }
        return false;
    };
    /**
     * 匹配牌型
     */
    CardTypeMatchUtil.matchCardType = function (allList) {
        if (!CardTypeMatchUtil._matchList) {
            CardTypeMatchUtil.initialize();
        }
        CardTypeMatchUtil.clear();
        if (allList && allList.length > 0) {
            var allListClone = new Array();
            var allLen = allList.length;
            var cardInfo = void 0;
            for (var i = 0; i < allLen; i++) {
                allListClone.push(allList[i].clone());
                cardInfo = allListClone[i];
                if (cardInfo.card[1] == CardTypeMatchUtil.minIndex) {
                    cardInfo.card[1] = CardTypeMatchUtil.maxIndex;
                }
            }
            for (var _i = 0, allListClone_1 = allListClone; _i < allListClone_1.length; _i++) {
                var cardArr = allListClone_1[_i];
                cardArr.card[2] = 0;
            }
            allListClone.sort(CardTypeMatchUtil.sortByIndex);
            var func = void 0;
            for (var i = 0; i < CardTypeMatchUtil._matchList.length; i++) {
                func = CardTypeMatchUtil._matchList[i];
                if (func == CardTypeMatchUtil.matchStraight || func == CardTypeMatchUtil.matchStraightFlush) {
                    if (CardTypeMatchUtil.containAOper(func, allListClone)) {
                        if (!GamblingUtil.isOmaha) {
                            CardTypeMatchUtil.matchOver();
                        }
                        allListClone = null;
                        return true;
                    }
                }
                else if (func(allListClone)) {
                    if (!GamblingUtil.isOmaha) {
                        CardTypeMatchUtil.matchOver();
                    }
                    allListClone = null;
                    return true;
                }
            }
            return false;
        }
    };
    CardTypeMatchUtil.matchOver = function () {
        var cardInfo;
        var len = CardTypeMatchUtil.resultList.length;
        for (var i = 0; i < len; i++) {
            cardInfo = CardTypeMatchUtil.resultList[i];
            if (cardInfo.card[1] == CardTypeMatchUtil.maxIndex) {
                cardInfo.card[1] = CardTypeMatchUtil.minIndex;
            }
        }
        var firstIndex = -1; //最大牌的牌型张显示效果处理
        switch (CardTypeMatchUtil.cardType) {
            case CardType.RoyalFlush:
            case CardType.StraightFlush:
            case CardType.Flush:
            case CardType.Fullhouse:
            case CardType.Straight:
                for (var i = 0; i < len; i++) {
                    cardInfo = CardTypeMatchUtil.resultList[i];
                    cardInfo.card[3] = 1;
                }
                break;
            case CardType.FourOfAKind:
            case CardType.TwoPairs:
                for (var i = 0; i < 4; i++) {
                    cardInfo = CardTypeMatchUtil.resultList[i];
                    cardInfo.card[3] = 1;
                }
                break;
            case CardType.ThreeOfAKind:
                for (var i = 0; i < 3; i++) {
                    cardInfo = CardTypeMatchUtil.resultList[i];
                    cardInfo.card[3] = 1;
                }
                break;
            case CardType.OnePair:
                for (var i = 0; i < 2; i++) {
                    cardInfo = CardTypeMatchUtil.resultList[i];
                    cardInfo.card[3] = 1;
                }
                break;
            case CardType.HighCard:
                CardTypeMatchUtil.resultList.sort(CardTypeMatchUtil.sortByIndex);
                cardInfo = CardTypeMatchUtil.resultList[CardTypeMatchUtil.resultList.length - 1];
                if (cardInfo.card[1] == 1) {
                    cardInfo.card[3] = 1;
                }
                else {
                    cardInfo = CardTypeMatchUtil.resultList[0];
                    cardInfo.card[3] = 1;
                }
                break;
        }
    };
    /**
     * 包含A，算顺子，同花顺
     */
    CardTypeMatchUtil.containAOper = function (func, allList) {
        if (func(allList)) {
            return true;
        }
        else {
            var isContainA = false;
            for (var j = 0; j < allList.length; j++) {
                if (allList[j].card[1] == CardTypeMatchUtil.maxIndex) {
                    isContainA = true;
                    break;
                }
            }
            if (isContainA) {
                for (var j = 0; j < allList.length; j++) {
                    if (allList[j].card[1] == CardTypeMatchUtil.maxIndex) {
                        allList[j].card[1] = CardTypeMatchUtil.minIndex;
                    }
                }
                allList.sort(CardTypeMatchUtil.sortByIndex);
                var result = func(allList);
                for (var j = 0; j < allList.length; j++) {
                    if (allList[j].card[1] == CardTypeMatchUtil.minIndex) {
                        allList[j].card[1] = CardTypeMatchUtil.maxIndex;
                    }
                }
                allList.sort(CardTypeMatchUtil.sortByIndex);
                return result;
            }
        }
        return false;
    };
    /**
     * 匹配皇家同花顺
     */
    CardTypeMatchUtil.matchRoyalFlush = function (list) {
        var result = CardTypeMatchUtil.matchStraightFlush(list);
        if (result && CardTypeMatchUtil.resultList[0].card[1] == CardTypeMatchUtil.maxIndex) {
            CardTypeMatchUtil.toFillUnMaskFlag();
            CardTypeMatchUtil.cardType = CardType.RoyalFlush;
            return true;
        }
        return false;
    };
    /**
     * 匹配同花顺
     */
    CardTypeMatchUtil.matchStraightFlush = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - 5;
            var startInfo = void 0;
            var nextInfo = void 0;
            var count = 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                count = 0;
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                var matchedList = new Array();
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (matchedList.indexOf(nextInfo.card[1]) == -1) {
                        count++;
                        if (startInfo.card[0] == nextInfo.card[0] && startInfo.card[1] - nextInfo.card[1] == count) {
                            matchedList.push(nextInfo.card[1]);
                            fitNum++;
                            tmpList.push(nextInfo);
                        }
                        else {
                            count--;
                        }
                    }
                    if (fitNum == 4) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.cardType = CardType.StraightFlush;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配4条
     */
    CardTypeMatchUtil.matchFourOfAKind = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 4 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo.card[1] == nextInfo.card[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 3) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.toFillHighCard(list, tmpList[0].card[1], len);
                        CardTypeMatchUtil.cardType = CardType.FourOfAKind;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配葫芦
     */
    CardTypeMatchUtil.matchFullhouse = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 3 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo.card[1] == nextInfo.card[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 2) {
                        var resetTmpList = CardTypeMatchUtil.toFillPair(list, tmpList, len);
                        if (resetTmpList) {
                            CardTypeMatchUtil.resultList = resetTmpList;
                            CardTypeMatchUtil.toFillUnMaskFlag();
                            CardTypeMatchUtil.cardType = CardType.Fullhouse;
                            return true;
                        }
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配同花
     */
    CardTypeMatchUtil.matchFlush = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - 5;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo.card[0] == nextInfo.card[0]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 4) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.cardType = CardType.Flush;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配顺子
     */
    CardTypeMatchUtil.matchStraight = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = GamblingManager.MaxCardNum - 5;
            var startInfo = void 0;
            var nextInfo = void 0;
            var count = 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                count = 0;
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                var matchedList = new Array();
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (matchedList.indexOf(nextInfo.card[1]) == -1) {
                        count++;
                        if (startInfo.card[1] - nextInfo.card[1] == count) {
                            matchedList.push(nextInfo.card[1]);
                            fitNum++;
                            tmpList.push(nextInfo);
                        }
                        else {
                            count--;
                        }
                    }
                    if (fitNum == 4) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.cardType = CardType.Straight;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配3条
     */
    CardTypeMatchUtil.matchThreeOfAKind = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var round = len - 3 + 1;
            var startInfo = void 0;
            var nextInfo = void 0;
            var fitNum = 0;
            var tmpList = new Array();
            for (var i = 0; i <= round; i++) {
                startInfo = list[i];
                fitNum = 0;
                tmpList.length = 0;
                tmpList.push(startInfo);
                for (var j = i + 1; j < len; j++) {
                    nextInfo = list[j];
                    if (startInfo.card[1] == nextInfo.card[1]) {
                        fitNum++;
                        tmpList.push(nextInfo);
                    }
                    if (fitNum == 2) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.toFillHighCard(list, tmpList[0].card[1], len);
                        CardTypeMatchUtil.cardType = CardType.ThreeOfAKind;
                        return true;
                    }
                }
            }
            tmpList = null;
        }
        return false;
    };
    /**
     * 匹配两队
     */
    CardTypeMatchUtil.matchTwoPairs = function (list) {
        var len = list.length;
        if (len >= GamblingManager.MaxBoardNum) {
            var tmpList = new Array();
            var fitNum = 0;
            var numList = new Array();
            var cardInfo = void 0;
            var pairsIndexList = new Array();
            for (var i = 0; i < len; i++) {
                cardInfo = list[i];
                CardTypeMatchUtil.sameCardOper(list, cardInfo.card[1]);
                if (CardTypeMatchUtil._sameCardList.length == 2 && pairsIndexList.indexOf(cardInfo.card[1]) == -1) {
                    pairsIndexList.push(cardInfo.card[1]);
                    tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
                    fitNum++;
                    numList.push(cardInfo.card[1]);
                    if (fitNum == 2) {
                        CardTypeMatchUtil.resultList = tmpList;
                        CardTypeMatchUtil.toFillUnMaskFlag();
                        CardTypeMatchUtil.toFillHighCard(list, numList, len);
                        CardTypeMatchUtil.cardType = CardType.TwoPairs;
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * 匹配一对
     */
    CardTypeMatchUtil.matchOnePair = function (list) {
        var len = list.length;
        var tmpList = new Array();
        var fitNum = 0;
        var cardInfo;
        for (var i = 0; i < len; i++) {
            cardInfo = list[i];
            CardTypeMatchUtil.sameCardOper(list, cardInfo.card[1]);
            if (CardTypeMatchUtil._sameCardList.length == 2) {
                tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
                fitNum++;
                if (fitNum == 1) {
                    CardTypeMatchUtil.resultList = tmpList;
                    CardTypeMatchUtil.toFillUnMaskFlag();
                    CardTypeMatchUtil.toFillHighCard(list, cardInfo.card[1], len);
                    CardTypeMatchUtil.cardType = CardType.OnePair;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 匹配高牌
     */
    CardTypeMatchUtil.matchHighCard = function (list) {
        CardTypeMatchUtil.toFillHighCard(list, -1, list.length);
        CardTypeMatchUtil.toFillUnMaskFlag();
        // if (GamblingCardTypeMatch.resultList.length > 0)
        // {
        // 	GamblingCardTypeMatch.resultList[0].push(1); //最大牌
        // }
        CardTypeMatchUtil.cardType = CardType.HighCard;
        return true;
    };
    /**
     * 填充对子
     */
    CardTypeMatchUtil.toFillPair = function (list, tmpList, len) {
        var info;
        var count;
        var tmpInfo = tmpList[0];
        for (var i = 0; i < len; i++) {
            info = list[i];
            if (info.card[1] != tmpInfo.card[1]) {
                CardTypeMatchUtil.sameCardOper(list, info.card[1]);
                if (CardTypeMatchUtil._sameCardList.length >= 2) {
                    tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
                    return tmpList;
                }
            }
        }
        return null;
    };
    /**
     * 填充高牌
     */
    CardTypeMatchUtil.toFillHighCard = function (list, excludeIndex, len) {
        var info;
        for (var i = 0; i < len; i++) {
            info = list[i];
            if (CardTypeMatchUtil.resultList.length < GamblingManager.MaxBoardNum) {
                if (typeof excludeIndex == "number" && info.card[1] != excludeIndex) {
                    info.card[2] = 1;
                    CardTypeMatchUtil.resultList.push(info);
                }
                else if (excludeIndex instanceof Array && excludeIndex.indexOf(info.card[1]) == -1) {
                    info.card[2] = 1;
                    CardTypeMatchUtil.resultList.push(info);
                }
                if (CardTypeMatchUtil.resultList.length == GamblingManager.MaxBoardNum) {
                    break;
                }
            }
        }
    };
    /**
     * 获取卡牌的数量
     */
    CardTypeMatchUtil.sameCardOper = function (list, index) {
        if (!CardTypeMatchUtil._sameCardList) {
            CardTypeMatchUtil._sameCardList = new Array();
        }
        CardTypeMatchUtil._sameCardList.length = 0;
        var len = list.length;
        var count = 0;
        for (var i = 0; i < len; i++) {
            if (list[i].card[1] == index && index > 0) {
                CardTypeMatchUtil._sameCardList.push(list[i]);
            }
        }
    };
    /**
     * 降序排列牌列表
     */
    CardTypeMatchUtil.sortByIndex = function (a, b) {
        if (a.card[1] > b.card[1]) {
            return -1;
        }
        if (a.card[1] < b.card[1]) {
            return 1;
        }
        return 0;
    };
    CardTypeMatchUtil.toFillUnMaskFlag = function () {
        var len = CardTypeMatchUtil.resultList.length;
        for (var i = 0; i < len; i++) {
            CardTypeMatchUtil.resultList[i].card[2] = 1; //添加最大牌标记
        }
    };
    /**
    * 获取卡牌描述
    */
    CardTypeMatchUtil.getCardDes = function (type) {
        switch (type) {
            case CardType.RoyalFlush:
                return "皇家同花顺";
            case CardType.StraightFlush:
                return "同花顺";
            case CardType.FourOfAKind:
                return "四条";
            case CardType.Fullhouse:
                return "葫芦";
            case CardType.Flush:
                return "同花";
            case CardType.Straight:
                return "顺子";
            case CardType.ThreeOfAKind:
                return "三条";
            case CardType.TwoPairs:
                return "两对";
            case CardType.OnePair:
                return "一对";
            case CardType.HighCard:
                return "高牌";
            default:
                return qin.StringConstants.Empty;
        }
    };
    CardTypeMatchUtil.minIndex = 1;
    CardTypeMatchUtil.maxIndex = 14;
    return CardTypeMatchUtil;
}());
__reflect(CardTypeMatchUtil.prototype, "CardTypeMatchUtil");
//# sourceMappingURL=CardTypeMatchUtil.js.map