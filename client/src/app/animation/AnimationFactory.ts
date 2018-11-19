/**
 * 动画
 */
class AnimationFactory
{
	/**
	 * 获取卡牌动画
	 */
	public static getCardFaceAnimation(type: AnimationType): BaseAnimation<CardFaceComponent>
	{
		let animationHandler: BaseAnimation<CardFaceComponent>;
		switch (type)
		{
			case AnimationType.CardFaceBoardAppear:
				animationHandler = new CardFaceBoardAppear();
				break;
			case AnimationType.CardFaceBright:
				animationHandler = new CardFaceBright();
				break;
			case AnimationType.CardFaceMoveToPoint:
				animationHandler = new CardFaceMoveToPoint();
				break;
			case AnimationType.CardFaceTurnToFace:
				animationHandler = new CardFaceTurnToFace();
				break;
			case AnimationType.SelfCard1Appear:
				animationHandler = new SelfCard1Appear();
				break;
			case AnimationType.SelfCard2Appear:
				animationHandler = new SelfCard2Appear();
				break;
			case AnimationType.OmahaSelfCard1Appear:
				animationHandler = new OmahaSelfCard1Appear();
				break;
			case AnimationType.OmahaSelfCard2Appear:
				animationHandler = new OmahaSelfCard2Appear();
				break;
			case AnimationType.OmahaSelfCard3Appear:
				animationHandler = new OmahaSelfCard3Appear();
				break;
			case AnimationType.OmahaSelfCard4Appear:
				animationHandler = new OmahaSelfCard4Appear();
				break;
			default:
				break;
		}
		return animationHandler;
	}
	/**
	 * 获取显示对象动画
	 */
	public static getDisplayObjectContainerAnimation(type: AnimationType): BaseAnimation<egret.DisplayObject>
	{
		let animationHandler: BaseAnimation<egret.DisplayObject>;
		switch (type)
		{
			case AnimationType.FlopCard:
				animationHandler = new FlopCardAnimation();
				break;
			case AnimationType.GamblingGameGroupMove:
				animationHandler = new GamblingGameGroupMove();
				break;
			case AnimationType.CommonMoveToPointByNowPos:
				animationHandler = new CommonMoveToPointByNowPos();
				break;
			case AnimationType.CommonMoveToRelativelyPos:
				animationHandler = new CommonMoveToRelativelyPos();
				break;
			case AnimationType.WinChips:
				animationHandler = new WinChipsAnim();
				break;
			case AnimationType.FoldCard:
				animationHandler = new FoldCardAnimation();
				break;
			case AnimationType.Alpha:
				animationHandler = new AlphaChangeAnimation();
				break;
			default:
				break;
		}
		return animationHandler;
	}

	/**
	 * 粒子特效缓存列表
	 */
	// private static _particleList: game.Map<AnimationType, particle.GravityParticleSystem>;
	/**
	 * 粒子特效加载状态表
	 */
	// private static _particleStateList: game.Map<AnimationType, boolean>;
	/**
	 * 获取粒子特效
	 */
	public static getParticleEffect(type: AnimationType, parent: any, onComplete: Function)
	{
		// if (!AnimationFactory._particleList)
		// {
		// 	AnimationFactory._particleList = new game.Map<AnimationType, particle.GravityParticleSystem>();
		// }
		// if (!AnimationFactory._particleStateList)
		// {
		// 	AnimationFactory._particleStateList = new game.Map<AnimationType, boolean>();
		// }
		// if (AnimationFactory._particleStateList.containsKey(type) && !AnimationFactory._particleStateList.getValue(type))
		// {
		// 	return;
		// }
		// let effect: particle.GravityParticleSystem = AnimationFactory._particleList.getValue(type);
		switch (type)
		{
			case AnimationType.GetCoin:
				AnimationFactory.resParticle(ResFixedFileName.GetCoin_Json, ResFixedFileName.GetCoin_Img, 1000, parent, 0, 0, type, onComplete);
				break;
			case AnimationType.WinCard:
				AnimationFactory.resParticle(ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 3000, parent, 25, -20, type, onComplete);
				break;
			case AnimationType.Allin0:
				AnimationFactory.resParticle(ResFixedFileName.Allin_Json, ResFixedFileName.Win_Img, 400, parent, 43, 30, type, onComplete);
				break;
			case AnimationType.Allin1:
				AnimationFactory.resParticle(ResFixedFileName.Allin_Json, ResFixedFileName.Win_Img, 400, parent, 136, 30, type, onComplete);
				break;
			case AnimationType.HundredWarPlayer:
				AnimationFactory.resParticle(ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 2000, parent, 0, -100, type, onComplete);
				break;
			case AnimationType.HundredWarBanker:
				AnimationFactory.resParticle(ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 1000, parent, 0, -70, type, onComplete);
				break;
			case AnimationType.HundredWarPool:
				AnimationFactory.resParticle(ResFixedFileName.Win_Json, ResFixedFileName.Win_Img, 2000, parent, 120, -100, type, onComplete);
				break;
			case AnimationType.HundredWarPoolDes:
				AnimationFactory.resParticle(ResFixedFileName.HundredWarPoolBoom_Json, ResFixedFileName.Win_Img, 400, parent, 150, 37, type, onComplete);
				break;
			case AnimationType.WinCard2:
				AnimationFactory.resParticle(ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 0, 0, type, onComplete);
				break;
			case AnimationType.WinCard3:
				AnimationFactory.resParticle(ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 100, 0, type, onComplete);
				break;
			case AnimationType.WinCard4:
				AnimationFactory.resParticle(ResFixedFileName.Win_2_Json, ResFixedFileName.Win_Img, 300, parent, 200, 0, type, onComplete);
				break;
		}
	}

	private static async resParticle(json: string, img: string, time: number, parent: any, posX: number, posY: number, type: AnimationType, onComplete: Function)
	{
		// if (effect)
		// {
		// 	if (parent.getChildIndex(effect) == -1)
		// 	{
		// 		parent.addChild(effect);
		// 	}
		// 	effect.start(time);
		// 	console.log("白鹭999", "effect", effect);
		// }
		// else
		// {
			// AnimationFactory._particleStateList.add(type, false);
			let config = await RES.getResAsync(ResPrefixPathName.Particle + json);
			let texture: egret.Texture = RES.getRes(img);
			let part: particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config);
			parent.addChild(part);
			part.x = posX;
			part.y = posY;
			part.start(time);
			onComplete(part);
			// AnimationFactory._particleList.add(type, part);
			// AnimationFactory._particleStateList.add(type, true);
		// }
	}
}
