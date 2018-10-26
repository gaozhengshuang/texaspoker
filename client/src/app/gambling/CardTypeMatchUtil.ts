/**
 * 牌型匹配
 */
class CardTypeMatchUtil
{
	/**
	 * 匹配结果
	 */
	public static resultList: Array<CardInfo>;
	public static cardType: CardType;
	private static _matchList: Array<Function>;
	//转换 move todo
	public static readonly minIndex: number = 14;
	public static readonly maxIndex: number = 1;

	// public static testBoardList: Array<CardInfo> = new Array<CardInfo>();
	public static startTest()
	{
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
	}
	private static initialize(): void
	{
		CardTypeMatchUtil.resultList = new Array<CardInfo>();

		CardTypeMatchUtil._matchList = new Array<Function>();
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
	}
	public static clear()
	{
		CardTypeMatchUtil.cardType = CardType.None;
		CardTypeMatchUtil.resultList.length = 0;
	}
	/**
	 * 奥马哈房间中匹配牌型
	*/
	public static OmahaMatchCardInRoom(handCardList: Array<CardInfo>)
	{
		let maxResultList: Array<CardInfo>;
		let maxResultCardType: CardType;
		let result: boolean = false;
		for (let i: number = 0; i < handCardList.length - 1; i++)
		{
			let newCardList: Array<CardInfo> = new Array<CardInfo>();
			newCardList.push(handCardList[i]);
			for (let j: number = i + 1; j < handCardList.length; j++)
			{
				newCardList.push(handCardList[j]);  //2张手牌
				if (GamblingManager.roomInfo.publicCard)
				{
					if (GamblingManager.roomInfo.publicCard.length > 3)
					{
						if (GamblingManager.roomInfo.publicCard.length == 4)
						{
							for (let m: number = 0; m < GamblingManager.roomInfo.publicCard.length; m++)
							{
								let list: Array<CardInfo> = GamblingManager.roomInfo.publicCard.concat();
								let userList: Array<CardInfo>;
								list.splice(m, 1);  //3张公共牌
								userList = newCardList.concat(list);

								result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
								if (result)
								{
									let obj: any = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
									if (obj)
									{
										maxResultList = obj["maxResultList"];
										maxResultCardType = obj["maxResultCardType"];
									}
								} else
								{
									return result;
								}
							}
						} else if (GamblingManager.roomInfo.publicCard.length == 5)
						{
							for (let a: number = 0; a < GamblingManager.roomInfo.publicCard.length - 1; a++)
							{
								for (let b: number = a + 1; b < GamblingManager.roomInfo.publicCard.length; b++)
								{
									let list: Array<CardInfo> = GamblingManager.roomInfo.publicCard.concat();
									let userList: Array<CardInfo>;
									list.splice(a, 1);
									list.splice(b - 1, 1);  //3张公共牌
									userList = newCardList.concat(list);

									result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
									if (result)
									{
										let obj: any = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
										if (obj)
										{
											maxResultList = obj["maxResultList"];
											maxResultCardType = obj["maxResultCardType"];
										}
									} else
									{
										return result;
									}
								}
							}
						}
					} else
					{
						let userList: Array<CardInfo> = GamblingManager.roomInfo.publicCard.concat(newCardList);
						result = CardTypeMatchUtil.omahaMatchCardInRoom(userList);
						if (result)
						{
							let obj: any = CardTypeMatchUtil.getMaxResult(maxResultList, maxResultCardType);
							if (obj)
							{
								maxResultList = obj["maxResultList"];
								maxResultCardType = obj["maxResultCardType"];
							}
						} else
						{
							return result;
						}
					}
				}
				newCardList.pop();
			}
		}
		CardTypeMatchUtil.resultList = maxResultList;
		CardTypeMatchUtil.cardType = maxResultCardType;
		if (CardTypeMatchUtil.resultList && CardTypeMatchUtil.resultList.length > 0)
		{
			CardTypeMatchUtil.matchOver();
		}
		return result;
	}
	/**
	 * 获得较大的结果
	*/
	private static getMaxResult(maxResultList: Array<CardInfo>, maxResultCardType: CardType): Object
	{
		if (CardTypeMatchUtil.resultList && CardTypeMatchUtil.resultList.length > 0)
		{
			if (!maxResultList)
			{
				maxResultList = CardTypeMatchUtil.resultList.concat();
				maxResultCardType = CardTypeMatchUtil.cardType;
			} else
			{
				if (CardTypeMatchUtil.cardType > maxResultCardType)
				{
					maxResultList = CardTypeMatchUtil.resultList.concat();
					maxResultCardType = CardTypeMatchUtil.cardType;
				} else if (CardTypeMatchUtil.cardType == maxResultCardType)
				{
					let result1Num: string = "";
					let result2Num: string = "";
					for (let k: number = 0; k < maxResultList.length; k++)
					{
						result1Num += maxResultList[k].card[1];
						result2Num += CardTypeMatchUtil.resultList[k].card[1];
					}
					let num1: number = parseInt(result1Num);
					let num2: number = parseInt(result2Num);
					if (num2 > num1)
					{
						maxResultList = CardTypeMatchUtil.resultList.concat();
						maxResultCardType = CardTypeMatchUtil.cardType;
					}
				}
			}
			let obj: any = new Object;
			obj["maxResultList"] = maxResultList;
			obj["maxResultCardType"] = maxResultCardType;
			return obj;
		}
		return null;
	}
	/**
	 * 奥马哈房间中匹配牌型
	 * @param handCardList 
	 */
	public static omahaMatchCardInRoom(cardList: Array<CardInfo>): boolean
	{
		if (GamblingManager.roomInfo)
		{
			return CardTypeMatchUtil.matchCardType(cardList);
		}
		return false;
	}
	/**
	 * 房间中匹配牌型
	 * @param handCardList 
	 */
	public static matchCardInRoom(handCardList: Array<CardInfo>): boolean
	{
		if (GamblingManager.roomInfo)
		{
			let allList: Array<CardInfo>;
			if (GamblingManager.roomInfo.publicCard && handCardList)
			{
				allList = GamblingManager.roomInfo.publicCard.concat(handCardList);
				// allList = CardTypeMatchUtil.testBoardList.concat(handCardList);
			}
			else if (handCardList)
			{
				allList = handCardList.concat();
			}
			else if (GamblingManager.roomInfo.publicCard)
			{
				allList = GamblingManager.roomInfo.publicCard.concat();
			}
			return CardTypeMatchUtil.matchCardType(allList);
		}
		return false;
	}
	/**
	 * 匹配牌型
	 */
	public static matchCardType(allList: Array<CardInfo>): boolean
	{
		if (!CardTypeMatchUtil._matchList)
		{
			CardTypeMatchUtil.initialize();
		}
		CardTypeMatchUtil.clear();
		if (allList && allList.length > 0)
		{
			let allListClone: Array<CardInfo> = new Array<CardInfo>();
			let allLen: number = allList.length;
			let cardInfo: CardInfo;
			for (let i: number = 0; i < allLen; i++)
			{
				allListClone.push(allList[i].clone());
				cardInfo = allListClone[i];
				if (cardInfo.card[1] == CardTypeMatchUtil.minIndex)
				{
					cardInfo.card[1] = CardTypeMatchUtil.maxIndex;
				}
			}
			for (let cardArr of allListClone)
			{
				cardArr.card[2] = 0;
			}
			allListClone.sort(CardTypeMatchUtil.sortByIndex);
			let func: Function;
			for (let i: number = 0; i < CardTypeMatchUtil._matchList.length; i++)
			{
				func = CardTypeMatchUtil._matchList[i];
				if (func == CardTypeMatchUtil.matchStraight || func == CardTypeMatchUtil.matchStraightFlush || func == CardTypeMatchUtil.matchRoyalFlush)
				{
					if (CardTypeMatchUtil.containAOper(func, allListClone)) 
					{
						if (!GamblingUtil.isOmaha)
						{
							CardTypeMatchUtil.matchOver();
						}
						allListClone = null;
						return true;
					}
				}
				else if (func(allListClone))
				{
					if (!GamblingUtil.isOmaha)
					{
						CardTypeMatchUtil.matchOver();
					}
					allListClone = null;
					return true;
				}
			}
			return false;
		}
	}
	private static matchOver()
	{
		let cardInfo: CardInfo;
		let len: number = CardTypeMatchUtil.resultList.length;
		for (let i: number = 0; i < len; i++) //将A返回去
		{
			cardInfo = CardTypeMatchUtil.resultList[i];
			if (cardInfo.card[1] == CardTypeMatchUtil.maxIndex)
			{
				cardInfo.card[1] = CardTypeMatchUtil.minIndex;
			}
		}
		let firstIndex: number = -1; //最大牌的牌型张显示效果处理
		switch (CardTypeMatchUtil.cardType)
		{
			case CardType.RoyalFlush:
			case CardType.StraightFlush:
			case CardType.Flush:
			case CardType.Fullhouse:
			case CardType.Straight:
				for (let i: number = 0; i < len; i++) 
				{
					cardInfo = CardTypeMatchUtil.resultList[i];
					cardInfo.card[3] = 1;
				}
				break;
			case CardType.FourOfAKind:
			case CardType.TwoPairs:
				for (let i: number = 0; i < 4; i++) 
				{
					cardInfo = CardTypeMatchUtil.resultList[i];
					cardInfo.card[3] = 1;
				}
				break;
			case CardType.ThreeOfAKind:
				for (let i: number = 0; i < 3; i++) 
				{
					cardInfo = CardTypeMatchUtil.resultList[i];
					cardInfo.card[3] = 1;
				}
				break;
			case CardType.OnePair:
				for (let i: number = 0; i < 2; i++) 
				{
					cardInfo = CardTypeMatchUtil.resultList[i];
					cardInfo.card[3] = 1;
				}
				break;
			case CardType.HighCard:
				CardTypeMatchUtil.resultList.sort(CardTypeMatchUtil.sortByIndex);
				cardInfo = CardTypeMatchUtil.resultList[CardTypeMatchUtil.resultList.length - 1];
				if (cardInfo.card[1] == 1) //A特殊处理
				{
					cardInfo.card[3] = 1;
				}
				else
				{
					cardInfo = CardTypeMatchUtil.resultList[0];
					cardInfo.card[3] = 1;
				}
				break;
		}
	}
	/**
	 * 包含A，算顺子，同花顺
	 */
	private static containAOper(func: Function, allList: Array<CardInfo>): boolean
	{
		if (func(allList))
		{
			return true;
		}
		else
		{
			let isContainA: boolean = false;
			for (let j: number = 0; j < allList.length; j++)
			{
				if (allList[j].card[1] == CardTypeMatchUtil.maxIndex)
				{
					isContainA = true;
					break;
				}
			}
			if (isContainA)
			{
				for (let j: number = 0; j < allList.length; j++)
				{
					if (allList[j].card[1] == CardTypeMatchUtil.maxIndex) //把A从最大索引，换成最小索引
					{
						allList[j].card[1] = CardTypeMatchUtil.minIndex;
					}
				}
				allList.sort(CardTypeMatchUtil.sortByIndex);
				let result: boolean = func(allList);
				for (let j: number = 0; j < allList.length; j++) //在把A换回来
				{
					if (allList[j].card[1] == CardTypeMatchUtil.minIndex)
					{
						allList[j].card[1] = CardTypeMatchUtil.maxIndex;
					}
				}
				allList.sort(CardTypeMatchUtil.sortByIndex);
				return result;
			}
		}
		return false;
	}
	/**
	 * 匹配皇家同花顺
	 */
	private static matchRoyalFlush(list: Array<CardInfo>): boolean
	{
		let result: boolean = CardTypeMatchUtil.matchStraightFlush(list);
		if (result && CardTypeMatchUtil.resultList[0].card[1] == CardTypeMatchUtil.minIndex)
		{
			CardTypeMatchUtil.toFillUnMaskFlag();
			CardTypeMatchUtil.cardType = CardType.RoyalFlush;
			return true;
		}
		return false;
	}
	/**
	 * 匹配同花顺
	 */
	private static matchStraightFlush(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - 5;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let count: number = 0;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				count = 0;
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				let matchedList: Array<number> = new Array<number>();
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (matchedList.indexOf(nextInfo.card[1]) == -1)
					{
						count++;
						if (startInfo.card[0] == nextInfo.card[0] && startInfo.card[1] - nextInfo.card[1] == count)
						{
							matchedList.push(nextInfo.card[1]);
							fitNum++;
							tmpList.push(nextInfo);
						}
						else
						{
							count--;
						}
					}
					if (fitNum == 4)
					{
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
	}
	/**
	 * 匹配4条
	 */
	private static matchFourOfAKind(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 4 + 1;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo.card[1] == nextInfo.card[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 3)
					{
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
	}
	/**
	 * 匹配葫芦
	 */
	private static matchFullhouse(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 3 + 1;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo.card[1] == nextInfo.card[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 2)
					{
						let resetTmpList: Array<CardInfo> = CardTypeMatchUtil.toFillPair(list, tmpList, len);
						if (resetTmpList)
						{
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
	}
	/**
	 * 匹配同花
	 */
	private static matchFlush(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - 5;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo.card[0] == nextInfo.card[0])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 4)
					{
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
	}
	/**
	 * 匹配顺子
	 */
	private static matchStraight(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = GamblingManager.MaxCardNum - 5;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let count: number = 0;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				count = 0;
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				let matchedList: Array<number> = new Array<number>();
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (matchedList.indexOf(nextInfo.card[1]) == -1)
					{
						count++;
						if (startInfo.card[1] - nextInfo.card[1] == count)
						{
							matchedList.push(nextInfo.card[1]);
							fitNum++;
							tmpList.push(nextInfo);
						}
						else
						{
							count--;
						}
					}
					if (fitNum == 4)
					{
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
	}
	/**
	 * 匹配3条
	 */
	private static matchThreeOfAKind(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let round: number = len - 3 + 1;
			let startInfo: CardInfo;
			let nextInfo: CardInfo;
			let fitNum: number = 0;
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			for (let i: number = 0; i <= round; i++)
			{
				startInfo = list[i];
				fitNum = 0;
				tmpList.length = 0;
				tmpList.push(startInfo);
				for (let j: number = i + 1; j < len; j++)
				{
					nextInfo = list[j];
					if (startInfo.card[1] == nextInfo.card[1])
					{
						fitNum++;
						tmpList.push(nextInfo);
					}
					if (fitNum == 2)
					{
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
	}
	/**
	 * 匹配两队
	 */
	private static matchTwoPairs(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		if (len >= GamblingManager.MaxBoardNum)
		{
			let tmpList: Array<CardInfo> = new Array<CardInfo>();
			let fitNum: number = 0;
			let numList: Array<number> = new Array<number>();
			let cardInfo: CardInfo;
			let pairsIndexList: Array<number> = new Array<number>();
			for (let i: number = 0; i < len; i++)
			{
				cardInfo = list[i];
				CardTypeMatchUtil.sameCardOper(list, cardInfo.card[1]);
				if (CardTypeMatchUtil._sameCardList.length == 2 && pairsIndexList.indexOf(cardInfo.card[1]) == -1)
				{
					pairsIndexList.push(cardInfo.card[1]);
					tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
					fitNum++;
					numList.push(cardInfo.card[1]);
					if (fitNum == 2)
					{
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
	}
	/**
	 * 匹配一对
	 */
	private static matchOnePair(list: Array<CardInfo>): boolean
	{
		let len: number = list.length;
		let tmpList: Array<CardInfo> = new Array<CardInfo>();
		let fitNum: number = 0;
		let cardInfo: CardInfo;
		for (let i: number = 0; i < len; i++)
		{
			cardInfo = list[i];
			CardTypeMatchUtil.sameCardOper(list, cardInfo.card[1]);
			if (CardTypeMatchUtil._sameCardList.length == 2)
			{
				tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
				fitNum++;
				if (fitNum == 1)
				{
					CardTypeMatchUtil.resultList = tmpList;
					CardTypeMatchUtil.toFillUnMaskFlag();
					CardTypeMatchUtil.toFillHighCard(list, cardInfo.card[1], len);
					CardTypeMatchUtil.cardType = CardType.OnePair;
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 匹配高牌
	 */
	private static matchHighCard(list: Array<CardInfo>): boolean
	{
		CardTypeMatchUtil.toFillHighCard(list, -1, list.length);
		CardTypeMatchUtil.toFillUnMaskFlag();
		// if (GamblingCardTypeMatch.resultList.length > 0)
		// {
		// 	GamblingCardTypeMatch.resultList[0].push(1); //最大牌
		// }
		CardTypeMatchUtil.cardType = CardType.HighCard;
		return true;
	}
	/**
	 * 填充对子
	 */
	private static toFillPair(list: Array<CardInfo>, tmpList: Array<CardInfo>, len: number): Array<CardInfo>
	{
		let info: CardInfo;
		let count: number;
		let tmpInfo: CardInfo = tmpList[0];
		for (let i: number = 0; i < len; i++)
		{
			info = list[i];
			if (info.card[1] != tmpInfo.card[1])
			{
				CardTypeMatchUtil.sameCardOper(list, info.card[1]);
				if (CardTypeMatchUtil._sameCardList.length >= 2)
				{
					tmpList = tmpList.concat(CardTypeMatchUtil._sameCardList);
					return tmpList;
				}
			}
		}
		return null;
	}
	/**
	 * 填充高牌
	 */
	private static toFillHighCard(list: Array<CardInfo>, excludeIndex: number | Array<number>, len: number)
	{
		let info: CardInfo;
		for (let i: number = 0; i < len; i++)
		{
			info = list[i];
			if (CardTypeMatchUtil.resultList.length < GamblingManager.MaxBoardNum)
			{
				if (typeof excludeIndex == "number" && info.card[1] != excludeIndex)
				{
					info.card[2] = 1;
					CardTypeMatchUtil.resultList.push(info);
				}
				else if (excludeIndex instanceof Array && (excludeIndex as Array<number>).indexOf(info.card[1]) == -1)
				{
					info.card[2] = 1;
					CardTypeMatchUtil.resultList.push(info);
				}
				if (CardTypeMatchUtil.resultList.length == GamblingManager.MaxBoardNum)
				{
					break;
				}
			}
		}
	}
	private static _sameCardList: Array<CardInfo>;
	/**
	 * 获取卡牌的数量
	 */
	private static sameCardOper(list: Array<CardInfo>, index: number): void
	{
		if (!CardTypeMatchUtil._sameCardList)
		{
			CardTypeMatchUtil._sameCardList = new Array<CardInfo>();
		}
		CardTypeMatchUtil._sameCardList.length = 0;
		let len: number = list.length;
		let count: number = 0;
		for (let i: number = 0; i < len; i++)
		{
			if (list[i].card[1] == index && index > 0)
			{
				CardTypeMatchUtil._sameCardList.push(list[i]);
			}
		}
	}
	/**
	 * 降序排列牌列表
	 */
	private static sortByIndex(a: CardInfo, b: CardInfo)
	{
		if (a.card[1] > b.card[1])
		{
			return -1;
		}
		if (a.card[1] < b.card[1])
		{
			return 1;
		}
		return 0;
	}
	public static toFillUnMaskFlag()
	{
		let len: number = CardTypeMatchUtil.resultList.length;
		for (let i: number = 0; i < len; i++)
		{
			CardTypeMatchUtil.resultList[i].card[2] = 1; //添加最大牌标记
		}
	}
	/**
 	* 获取卡牌描述
 	*/
	public static getCardDes(type: CardType): string
	{
		switch (type)
		{
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
				return game.StringConstants.Empty;
		}
	}
}