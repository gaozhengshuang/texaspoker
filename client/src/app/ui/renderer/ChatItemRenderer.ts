/**
 * 聊天信息项面板
*/
class ChatItemRenderer extends BaseItemRenderer<ChatInfo>
{
    /**
     * 文字
    */
    public textLabel: eui.Label;
    /**
     * 用户名字
     */
    public nameLabel: eui.Label;
    /**
     * 声音组
     */
    public voiceGroup: eui.Group;
    /**
     * 文字组
     */
    public textGroup: eui.Group;
    /**
     * 声音时间
     */
    public voiceTimeLabel: eui.Label;
    /**
     * 声音图片
     */
    public voiceImgGroup: eui.Group;

    public playVoiceAnime: egret.tween.TweenGroup;

    public redPointImg: eui.Image;

    public constructor()
    {
        super();
        this.skinName = UIRendererSkinName.ChatItemRenderer;
    }
    protected dataChanged()
    {
        super.dataChanged();
        this.voiceImgGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
        RecordAudioManager.OnPlayRecordComplete.addListener(this.onVoicePlayOver, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.bindData)
        {
            switch (this.bindData.subType)
            {
                case ChatSubType.AudioRecordMessage:
                    if (game.System.isMicro)
                    {
                        this.setShow(this.voiceGroup);
                        this.nameLabel.text = this.bindData.name + "：";
                        this.voiceTimeLabel.text = Math.ceil(parseFloat(this.bindData.param[0])) + "\"";
                        this.redPointImg.visible = !this.bindData.isPlay;
                    }
                    else
                    {
                        this.setShow(this.textGroup);
                        this.textLabel.text = this.bindData.name + "：发了一条语音，当前打开方式不支持语音功能";
                        this.textLabel.textColor = ColorEnum.White;
                    }
                    break;
                case ChatSubType.Horn:
                    this.setShow(this.textGroup);
                    this.textLabel.text = this.bindData.message;
                    this.textLabel.textColor = ColorEnum.Golden;
                    break;
                default:
                    this.setShow(this.textGroup);
                    this.textLabel.text = this.bindData.name + "：" + this.bindData.message;
                    this.textLabel.textColor = ColorEnum.White;
                    break;
            }

            if (this.bindData.type == ChatMessageType.Maquee)
            {
                this.textLabel.textColor = ColorEnum.Golden;
            }
        }
    }

    private setShow(group: eui.Group)
    {
        this.voiceGroup.visible = false;
        this.textGroup.visible = false;
        group.visible = true;
    }

    private playVoice(event: egret.TouchEvent)
    {
        event.stopImmediatePropagation();
        if (this.bindData.subType == ChatSubType.AudioRecordMessage)
        {
            ChatManager.ClearAudioAutoPlayList();
            ChatManager.CheckAndPlay(this.bindData);
            this.playVoiceAnime.play();
            this.bindData.isPlay = true;
        }
    }

    private onVoicePlayOver(guid: string)
    {
        if (guid == this.bindData.param[1])
        {
            this.playVoiceAnime.stop();
        }
    }

    private onDisable(event: egret.Event)
    {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        if (this.voiceImgGroup)
        {
            this.voiceImgGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playVoice, this);
        }
        this.playVoiceAnime.stop();
        RecordAudioManager.OnPlayRecordComplete.removeListener(this.onVoicePlayOver, this);
    }
}