/**
 * 头像组件聊天
*/
class GamblingHeadChatSupport 
{
    public context: GamblingHeadComponent;

    public constructor(target: GamblingHeadComponent)
    {
        this.context = target;
    }
    public initialize()
    {
        this.setChatGroupPos();
    }
    public onEnable()
    {
        UIUtil.hideScrollerBar(this.context.chatScroller, true, true);
        ChatManager.onNewMessageCome.addListener(this.showOtherMsg, this);
    }
    public onDisable()
    {
        ChatManager.onNewMessageCome.removeListener(this.showOtherMsg, this);
        game.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        egret.Tween.removeTweens(this.context.emojiImg);
    }

    /**
	 * 显示他人信息
	*/
    private showOtherMsg(msg: ChatInfo)
    {
        if (this.context.bindData && this.context.bindData.roleId == msg.roleId && msg.type == ChatMessageType.InRoom)
        {
            //根据message里的内容格式判断是文本还是表情             
            this.emojiOrContext(msg);
        }
    }
    /**
     * 表情 文字分支
    */
    private emojiOrContext(msg: ChatInfo)
    {
        if (msg.subType == ChatSubType.Normal)
        {
            //文字
            this.setChatContext(msg);
        } else if (msg.subType == ChatSubType.Emoji)
        {
            //表情
            this.showEmoji(msg);
        }
        else if (msg.subType == ChatSubType.AudioRecordMessage)
        {
            //语音
            this.setVoiceInfo(msg);
        }
    }

    private setVoiceInfo(msg: ChatInfo)
    {
        if (game.System.isMicro)
        {
            this.context.voiceGroup.visible = true;
            this.context.voiceTimeLabel.text = Math.ceil(parseFloat(msg.param[0])) + "\"";
            game.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
            game.Tick.AddTimeoutInvoke(this.countDownToCloseChat, 4000, this);
        }
        else
        {
            this.setChatContext("发了一条语音，当前打开方式不支持语音功能");
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
            let data = await RES.getResAsync(info.param[0] + ResSuffixName.PNG);
            this.context.emojiImg.visible = true;
            this.context.emojiImg.texture = data;
            egret.Tween.removeTweens(this.context.emojiImg);
            this.emojiAnimate();
        }
    }
   
    /**
     * 设置聊天内容
    */
    private setChatContext(msg: any)
    {
        this.context.chatGroup.visible = true;
        this.context.chatLabel.text = msg.message;

        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        game.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);

        if (this.context.chatLabel.width < 6 * this.context.chatLabel.size)
        {
            this.context.chatScroller.viewport.scrollH = 0;
            game.Tick.AddTimeoutInvoke(this.countDownToCloseChat, 4000, this);
        } else
        {
            this.context.chatScroller.viewport.scrollH = (this.context.chatScroller.viewport.width - this.context.chatLabel.width) / 2 - 2;
            this.scrollerAnimate();
        }
    }
	/**
	 * 倒计时关闭聊天显示框
	*/
    private countDownToCloseChat()
    {
        game.Tick.RemoveTimeoutInvoke(this.countDownToCloseChat, this);
        this.clear();
    }
    /**
     * 聊天内容过长滚动动画
    */
    private scrollerAnimate()
    {
        let targetPos: number = (this.context.chatLabel.width - this.context.chatScroller.viewport.width) / 2 + 2;
        let duration: number = this.context.chatLabel.width * 15;


        egret.Tween.get(this.context.chatScroller.viewport).wait(500).to({ scrollH: targetPos }, duration).wait(1000).call(this.closeAnimate, this);
    }
    /**
     * 表情显示动画
    */
    private emojiAnimate()
    {
        this.context.emojiImg.scaleX = 0.5;
        this.context.emojiImg.scaleY = 0.5;
        egret.Tween.get(this.context.emojiImg).to({ scaleX: 1.3, scaleY: 1.3 }, 500, egret.Ease.bounceOut).wait(1500).call(this.closeEmojiAnimate, this);
    }
    /**
     * 关闭动画
    */
    private closeAnimate()
    {
        egret.Tween.removeTweens(this.context.chatScroller.viewport);
        this.clear();
    }
    private clear()
    {
        this.context.chatGroup.visible = false;
        this.context.chatLabel.text = "";
        this.context.voiceGroup.visible = false;
        this.context.voiceTimeLabel.text = "";
    }
    /**
     * 关闭表情显示动画
    */
    private closeEmojiAnimate()
    {
        egret.Tween.removeTweens(this.context.emojiImg);
        this.context.emojiImg.visible = false;
    }
    /**
	 * 设置聊天框的位置
	*/
    public setChatGroupPos()
    {
        if (this.context.posIndex == 1)
        {
            this.turnChatGroup(false);
        }
        else
        {
            if (GamblingManager.maxSeats == SeatMode.Three)
            {
                if (this.context.posIndex <= 2)
                {
                    this.turnChatGroup(false);
                }
                else
                {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Five)
            {
                if (this.context.posIndex <= 3)
                {
                    this.turnChatGroup(false);
                }
                else
                {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Six)
            {
                if (this.context.posIndex <= 4)
                {
                    this.turnChatGroup(false);
                }
                else
                {
                    this.turnChatGroup(true);
                }
            }
            else if (GamblingManager.maxSeats == SeatMode.Nine)
            {
                if (this.context.posIndex <= 5)
                {
                    this.turnChatGroup(false);
                }
                else
                {
                    this.turnChatGroup(true);
                }
            }
        }
    }
    /**
     * 显示聊天组
     */
    private turnChatGroup(flag: boolean)
    {
        if (flag)
        {
            this.context.chatScroller.viewport.scaleX = this.context.chatGroup.scaleX = this.context.voiceGroup.scaleX = this.context.voiceShow.scaleX = -1;
            this.context.chatGroup.x = this.context.voiceGroup.x = -2.5;
            this.context.voiceShow.x = 80;
        }
        else
        {
            this.context.chatScroller.viewport.scaleX = this.context.chatGroup.scaleX = this.context.voiceGroup.scaleX = this.context.voiceShow.scaleX = 1;
            this.context.chatGroup.x = this.context.voiceGroup.x = 94.5;
            this.context.voiceShow.x = 22;
        }
    }
}