/**
 * 聊天面板
*/
class ChatPanel extends BasePanel
{
    public anmGroup: eui.Group;
    public scroller: eui.Scroller;
    public faceScroller: eui.Scroller;
    public fastScroller: eui.Scroller;
    public list: eui.List;
    public faceList: eui.List;
    public fastList: eui.List;
    public faceGroup: eui.Group;
    public fastGroup: eui.Group;
    public keyBoradGroup: eui.Group;
    public fastChatFlag: boolean;
    public writeGroup: eui.Group;

    /**
     * 没入座时表情group的遮罩
    */
    public disGroup: eui.Group;
    /**
     * 输入框
    */
    public writeLabel: eui.EditableText;
    /**
     * 表情按钮
    */
    public faceTB: eui.ToggleButton;
    /**
     * 快捷输入按钮
    */
    public fastEnterTB: eui.ToggleButton;
    /**
     * 发送按钮
    */
    public sendTB: eui.ToggleButton;
    /**
     * 喇叭喊话按钮
    */
    public hornTB: eui.ToggleButton;
    public actionGroup: eui.Group;

    private _scrollerHeight: number;
    private readonly _listItemHeight: number = 63;
    private _rows: number;
    private readonly _hornItemId: number = 401;
    private readonly _hornAwardId: number = 6;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.ChatPanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        UIUtil.listRenderer(this.list, this.scroller, ChatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.faceList, this.faceScroller, FaceItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        UIUtil.listRenderer(this.fastList, this.fastScroller, FastChatItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.scroller.scrollPolicyH = this.faceScroller.scrollPolicyH = this.fastScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.disGroup.visible = this.fastGroup.visible = false;
        this.faceGroup.visible = true;
        this.fastChatFlag = true;
        this.faceTB.selected = true;
        this.fastEnterTB.selected = false;
        UIManager.pushResizeGroup(this.actionGroup);
        UIManager.pushResizeScroller(this.scroller, 680);
        this.faceList.dataProvider = new eui.ArrayCollection(ChatManager.emojiList);
        VersionManager.setComponentVisibleBySafe(this.hornTB);
        if (VersionManager.isSafe)
        {
            this.writeGroup.x = 50;
        } else
        {
            this.writeGroup.x = 83.73;
        }
    }
    public init(appendData: any)
    {
        super.init(appendData);
        ChatManager.clearNewMsg();
        this.setHornNum();
    }
    protected onRender(event: egret.Event)
    {
        super.onRender(event);
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar && HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId)))
        {
            this.disGroup.visible = false;
        } else
        {
            this.disGroup.visible = true;
        }
        this.onResize();
        this.refreshUI();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeActive, this);
        this.writeLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWriteLabelClick, this);
        this.writeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.writeLabelFocueout, this);
        // this.writeLabel.addEventListener(egret.Event.CHANGE, this.checkForbid, this); //move todo
        this.scroller.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.onNewMessageCome.addListener(this.setChatInfo, this);
        ChatManager.OnMessageSend.addListener(this.closePanel, this);
        this.fastEnterTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
        this.sendTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
        this.scroller.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.hornTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setPromptInfo, this);
        ItemManager.ItemNumChangeEvent.addListener(this.setHornNum, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeActive, this);
        this.writeLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWriteLabelClick, this);
        this.writeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.writeLabelFocueout, this);
        // this.writeLabel.removeEventListener(egret.Event.CHANGE, this.checkForbid, this);
        this.scroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.onNewMessageCome.removeListener(this.setChatInfo, this);
        ChatManager.OnMessageSend.removeListener(this.closePanel, this);
        this.fastEnterTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
        this.sendTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
        this.scroller.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        this.hornTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setPromptInfo, this);
        ItemManager.ItemNumChangeEvent.removeListener(this.setHornNum, this);
    }

    /**
     * 设置小喇叭数目及相应状态
    */
    private setHornNum()
    {
        this.hornTB["desLabel"].text = this.getHornNum().toString();
        this.resetHorn();
    }
    /**
     * 获得小喇叭数目
    */
    private getHornNum(): number
    {
        let hornList: Array<ItemInfo>;
        hornList = ItemManager.getItemListByType(ItemType.Horn);
        let num: number = 0;
        if (hornList && hornList.length > 0)
        {
            num = hornList[0].count;
        }
        return num;
    }
    /**
     * 重置小喇叭信息
    */
    private resetHorn()
    {
        this.hornTB.selected = false;
        this.setPromptInfo();
    }
    /**
     *设置提醒信息
    */
    private setPromptInfo()
    {
        if (this.hornTB.selected == true)
        {
            this.writeLabel.prompt = "请在此输入小喇叭内容。";
        } else
        {
            this.writeLabel.prompt = "";
        }
    }
    /**
     * 输入框内容改变事件
    */
    private checkForbid()
    {
        if (this.writeLabel.text)
        {
            this.writeLabel.text = ForbiddenDefined.GetInstance().replaceView(this.writeLabel.text);
        }
    }
    /**
     * 点击快捷输入列表发送内容
    */
    private onFastChatClick(e: eui.ItemTapEvent)
    {
        //判断用户是否入座  未入座消息在哪都不显示(正常模式)   百人大战不用坐下就可以发消息
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar))
        {
            if (this.fastList.selectedItem)
            {
                //发送聊天的通知给服务器
                ChatManager.SendChatMessage(this.fastList.selectedItem.des, ChatMessageType.InRoom);
            }
        } else
        {
            this.closePanel();
        }
    }
    /**
     * 设置快捷输入内容
    */
    private setFastChatInfo()
    {
        this.faceTB.selected = false;
        this.resetHorn();
        this.fastEnterTB.selected = true;
        if (this.fastChatFlag)
        {
            this.fastList.dataProvider = new eui.ArrayCollection(FastChatDefined.GetInstance().dataList);
            this.fastChatFlag = false;
        }
    }
    /**
     * 发送聊天信息
    */
    private sendMsg(event: egret.TouchEvent)
    {
        //判断用户是否入座  未入座消息在哪都不显示  百人大战不用坐下就可以发消息 小喇叭不受是否入座影响
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar) || this.hornTB.selected)
        {
            let msg: string = this.writeLabel.text.trim();
            if (msg)
            {
                //发送聊天的通知给服务器
                if (this.hornTB.selected)
                {
                    this.userHorn();
                } else
                {
                    let reg: RegExp = /\#/g; //过滤#
                    msg = msg.replace(reg, game.StringConstants.Empty);
                    ChatManager.SendChatMessage(msg, ChatMessageType.InRoom);
                }
            }
        } else
        {
            this.closePanel();
        }
        this.writeLabel.text = "";
    }
    /**
     * 使用小喇叭喊话
    */
    private userHorn()
    {
        if (!AwardManager.IsToLimitClient(this._hornAwardId) || true)  //判断是否达到当天喇叭喊话次数上限   //move todo暂时不做限制
        {
            if (this.getHornNum() > 0 || true)  //判断是否有小喇叭道具
            {
                ChatManager.SendChatMessage(this.writeLabel.text.trim(), ChatMessageType.Maquee); //move todo 原来走的道具接口
                // ItemManager.reqUseItem(this._hornItemId, 1, this.writeLabel.text.trim());
            } else
            {
                UIManager.showFloatTips("您还没有小喇叭，不可进行发送！");
            }
        } else
        {
            UIManager.showFloatTips("您今天发送小喇叭次数已用完，请明天再试！");
        }
    }
    /**
     * 点击表情触发事件
    */
    private onFaceClick(e: eui.ItemTapEvent)
    {
        if (this.faceList.selectedItem)
        {
            ChatManager.SendChatMessage(ChatSpecialStrings.Emoji + this.faceList.selectedItem.id, ChatMessageType.InRoom);
            this.closePanel();
        }
    }
    /**
     * 输入框点击事件
    */
    private onWriteLabelClick()
    {
        if (game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.Android)
        {
            this.parent.y = -150;
        }
        this.writeLabel.setFocus();
    }
    /**
     * 输入框失去焦点
    */
    private writeLabelFocueout()
    {
        if (game.RuntimeTypeName.getCurrentName() == game.RuntimeTypeName.Android)
        {
            this.parent.y = 0;
        }
    }
    /**
     * 表情按钮点击事件
    */
    private changeActive()
    {
        this.fastGroup.visible = false;
        this.faceGroup.visible = true;
        this.faceTB.selected = true;
        this.fastEnterTB.selected = false;
        this.resetHorn();
        //判断玩家是否处于坐下状态
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar && HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId))) 
        {
            this.disGroup.visible = false;
        } else
        {
            this.disGroup.visible = true;
        }
    }
    /**
     * 点击事件处理
    */
    private onClickHandler(event: egret.TouchEvent)
    {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.fastEnterTB)
        {
            this.fastGroup.visible = true;
            this.faceGroup.visible = false;
        }
        else if (event.target == this.keyBoradGroup)
        {
            this.closePanel();
        }
    }
    /**
     * 设置聊天信息列表数据
    */
    private setChatInfo()
    {
        if (ChatManager.chatList.length > 0)
        {
            this.refreshUI();
        }
    }
    /**
     * 添加显示聊天列表信息
    */
    private refreshUI()
    {
        UIUtil.writeListInfo(this.list, ChatManager.chatList);
        this.list.validateNow();
        this.setScrollV();
    }
    /**
     * 设置滚动距离
    */
    private setScrollV()
    {
        if (ChatManager.chatList.length >= this._rows)
        {
            this.scroller.viewport.scrollV = (ChatManager.chatList.length - this._rows + 1) * this._listItemHeight;
        }
    }
    /**
     * 大小改变时
    */
    private onResize()
    {
        this._scrollerHeight = this.scroller.height;
        this._rows = Math.ceil(this._scrollerHeight / this._listItemHeight);
    }
    /**
     * 关闭面板
    */
    private closePanel()
    {
        UIManager.closePanel(UIModuleName.ChatPanel);
    }
}