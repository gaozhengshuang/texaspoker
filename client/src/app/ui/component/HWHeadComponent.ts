/**
 * 百人大战牌局玩家头像组件
 */
class HWHeadComponent extends BaseComponent<HWHundredWarRoomPlayerInfo>{

	/**
	 * 空组
	 */
    public emptyGroup: eui.Group;
    public canSitDownLabel: eui.Label;
	/**
	 * 玩家组
	 */
    public playerGroup: eui.Group;
    public headIcon: CircleHeadComponent;
    public borderImg: eui.Image;


    public vipGroup: eui.Group;
    public vipLabel: eui.Label;
    public chipsLabel: eui.Label;
    public cardTypeBg: eui.Image;

    public parentPanel: HundredWarRoomPanel;

	/**
	 * 灰色遮罩图片
	 */
    public maskImg: eui.Image;

	/**
	 * 位置索引
	 */
    public pos: number;
	/**
	 * 最后赋值的角色ID，处理结算时候，玩家站起找不到结算的目标头像的问题
	 */
    public lastRoleId: number;
    /**
     * 表情
    */
    public emojiImg: eui.Image;

    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maxWidth = 96;
        this.maxHeight = 150;
        this.maskImg.touchEnabled = false;
        this.maskImg.visible = false;
        game.FilterUtil.setColorFilters(this.cardTypeBg, 0x000000);
    }
	/**
	 * 默认初始化
	 */
    public init(data: HWHundredWarRoomPlayerInfo)
    {
        this.realInit(data)
    }
    protected rendererStart(event: egret.Event)
    {
        super.rendererStart(event);
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        ChatManager.onNewMessageCome.addListener(this.showOtherMsg, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        ChatManager.onNewMessageCome.removeListener(this.showOtherMsg, this);
        egret.Tween.removeTweens(this.emojiImg);
        game.Tick.RemoveTimeoutInvoke(this.hideWinEffect, this);
    }

	/**
	 * 坐下初始化
	 */
    public sitDownInit(data: HWHundredWarRoomPlayerInfo)
    {
        this.realInit(data);
    }
	/**
	 * 执行初始化
	 */
    private realInit(data: HWHundredWarRoomPlayerInfo)
    {
        super.init(data);
        this.emojiImg.visible = false;
        if (data)
        {
            this.playerGroup.visible = true;
            this.emptyGroup.visible = false;
            this.lastRoleId = data.roleId;
        }
        else
        {
            this.setEmpty();
        }
        this.showHead();
        this.showBankRoll();
        this.refreshVip();
    }

    /**
	 * 显示他人信息
	*/
    private showOtherMsg(msg: ChatInfo)
    {
        if (this.bindData && this.bindData.roleId == msg.roleId && msg.type == ChatMessageType.InRoom)
        {
            //根据message里的内容格式判断是文本还是表情             
            this.emojiOrContext(msg);
        }
    }
    /**
     * 表情 文字分支
    */
    private emojiOrContext(msg: any)
    {
        if (msg.subType == ChatSubType.Emoji)
        {
            //表情
            this.showEmoji(msg);
        }
    }
    /**
     * 设置表情显示
    */
    private async showEmoji(msg: any)
    {
        let info: ChatInfo = msg as ChatInfo;
        if (info.param && info.param.length > 0)
        {
            let data = await RES.getResAsync(ResPrefixPathName.Emoji + info.param[0] + ResSuffixName.PNG);
            this.emojiImg.visible = true;
            this.emojiImg.texture = data;
            egret.Tween.removeTweens(this.emojiImg);
            this.emojiAnimate();
        }
    }
    
    /**
     * 表情显示动画
    */
    private emojiAnimate()
    {
        this.emojiImg.scaleX = 0.5;
        this.emojiImg.scaleY = 0.5;
        egret.Tween.get(this.emojiImg).to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.bounceOut).wait(1500).call(this.closeEmojiAnimate, this);
    }
    /**
     * 关闭表情显示动画
    */
    private closeEmojiAnimate()
    {
        egret.Tween.removeTweens(this.emojiImg);
        this.emojiImg.visible = false;
    }
    /**
     * 空座位
    */
    public setEmpty()
    {
        this.emptyGroup.visible = true;
        this.playerGroup.visible = false;
    }

    //头像信息
    public showHead()
    {
        if (this.bindData)
        {
            this.headIcon.init(this.bindData, 90);
            this.headIcon.visible = true;
            this.borderImg.visible = true;
            this.refreshVip();
        }
        else
        {
            this.headIcon.visible = false;
            this.borderImg.visible = false;
        }
    }
	/**
	 * 显示基本的元素
	 */
    public showBase()
    {
        this.setEmpty();
    }

	/**
	 * 显示筹码
	 */
    public showBankRoll()
    {
        if (this.bindData)
        {
            this.chipsLabel.text = game.MathUtil.formatNum(this.bindData.gold);
        }
    }

	/**
	 * 赢牌特效
	 */
    private _winEffect: particle.GravityParticleSystem;
	/**
	 * 显示赢牌特效
	 */
    public showWinEffect()
    {
        AnimationFactory.getParticleEffect(AnimationType.WinCard, this, (ptc) =>
        {
            this._winEffect = ptc;
        });
    }
	/**
	 * 隐藏赢牌特效
	 */
    private hideWinEffect()
    {
        if (this._winEffect && this._winEffect.parent)
        {
            this._winEffect.stop();
            this._winEffect.parent.removeChild(this._winEffect);
        }
    }
	/**
	 * 刷新vip
	 */
    private refreshVip()
    {
        this.vipGroup.visible = false;
        if (this.bindData && this.bindData.vipLevel > 0)
        {
            this.vipGroup.visible = true;
            this.vipLabel.text = "VIP" + this.bindData.vipLevel.toString();
        }
    }
}
