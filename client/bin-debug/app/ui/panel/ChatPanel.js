var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 聊天面板
*/
var ChatPanel = (function (_super) {
    __extends(ChatPanel, _super);
    function ChatPanel() {
        var _this = _super.call(this) || this;
        _this._listItemHeight = 63;
        _this._hornItemId = 401;
        _this._hornAwardId = 6;
        _this.setSkinName(UIModuleName.ChatPanel);
        return _this;
    }
    ChatPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
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
        if (VersionManager.isSafe) {
            this.writeGroup.x = 50;
        }
        else {
            this.writeGroup.x = 83.73;
        }
    };
    ChatPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        ChatManager.clearNewMsg();
        this.setHornNum();
    };
    ChatPanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar && HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId))) {
            this.disGroup.visible = false;
        }
        else {
            this.disGroup.visible = true;
        }
        this.onResize();
        this.refreshUI();
    };
    ChatPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeActive, this);
        this.writeLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWriteLabelClick, this);
        this.writeLabel.addEventListener(egret.FocusEvent.FOCUS_OUT, this.writeLabelFocueout, this);
        this.writeLabel.addEventListener(egret.Event.CHANGE, this.checkForbid, this);
        this.scroller.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.onNewMessageCome.addListener(this.setChatInfo, this);
        ChatManager.OnMessageSend.addListener(this.closePanel, this);
        this.fastEnterTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
        this.sendTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
        this.scroller.addEventListener(egret.Event.RESIZE, this.onResize, this);
        this.hornTB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setPromptInfo, this);
        ItemManager.itemReduceEvent.addListener(this.setHornNum, this);
    };
    ChatPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.faceTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeActive, this);
        this.writeLabel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWriteLabelClick, this);
        this.writeLabel.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.writeLabelFocueout, this);
        this.writeLabel.removeEventListener(egret.Event.CHANGE, this.checkForbid, this);
        this.scroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
        this.faceList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFaceClick, this);
        this.fastList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFastChatClick, this);
        ChatManager.onNewMessageCome.removeListener(this.setChatInfo, this);
        ChatManager.OnMessageSend.removeListener(this.closePanel, this);
        this.fastEnterTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setFastChatInfo, this);
        this.sendTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this);
        this.scroller.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        this.hornTB.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setPromptInfo, this);
        ItemManager.itemReduceEvent.removeListener(this.setHornNum, this);
    };
    /**
     * 设置小喇叭数目及相应状态
    */
    ChatPanel.prototype.setHornNum = function () {
        this.hornTB["desLabel"].text = this.getHornNum().toString();
        this.resetHorn();
    };
    /**
     * 获得小喇叭数目
    */
    ChatPanel.prototype.getHornNum = function () {
        var hornList;
        hornList = ItemManager.getItemListByType(ItemType.Horn);
        var num = 0;
        if (hornList && hornList.length > 0) {
            num = hornList[0].count;
        }
        return num;
    };
    /**
     * 重置小喇叭信息
    */
    ChatPanel.prototype.resetHorn = function () {
        this.hornTB.selected = false;
        this.setPromptInfo();
    };
    /**
     *设置提醒信息
    */
    ChatPanel.prototype.setPromptInfo = function () {
        if (this.hornTB.selected == true) {
            this.writeLabel.prompt = "请在此输入小喇叭内容。";
        }
        else {
            this.writeLabel.prompt = "";
        }
    };
    /**
     * 输入框内容改变事件
    */
    ChatPanel.prototype.checkForbid = function () {
        if (this.writeLabel.text) {
            this.writeLabel.text = ForbiddenDefined.GetInstance().replaceView(this.writeLabel.text);
        }
    };
    /**
     * 点击快捷输入列表发送内容
    */
    ChatPanel.prototype.onFastChatClick = function (e) {
        //判断用户是否入座  未入座消息在哪都不显示(正常模式)   百人大战不用坐下就可以发消息
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar)) {
            if (this.fastList.selectedItem) {
                //发送聊天的通知给服务器
                ChatManager.SendChatMessage(this.fastList.selectedItem.des, ChatMessageType.InRoom);
            }
        }
        else {
            this.closePanel();
        }
    };
    /**
     * 设置快捷输入内容
    */
    ChatPanel.prototype.setFastChatInfo = function () {
        this.faceTB.selected = false;
        this.resetHorn();
        this.fastEnterTB.selected = true;
        if (this.fastChatFlag) {
            this.fastList.dataProvider = new eui.ArrayCollection(FastChatDefined.GetInstance().dataList);
            this.fastChatFlag = false;
        }
    };
    /**
     * 发送聊天信息
    */
    ChatPanel.prototype.sendMsg = function (event) {
        //判断用户是否入座  未入座消息在哪都不显示  百人大战不用坐下就可以发消息 小喇叭不受是否入座影响
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar) || this.hornTB.selected) {
            var msg_1 = this.writeLabel.text.trim();
            if (msg_1) {
                //发送聊天的通知给服务器
                if (this.hornTB.selected) {
                    this.userHorn();
                }
                else {
                    var reg = /\#/g; //过滤#
                    msg_1 = msg_1.replace(reg, qin.StringConstants.Empty);
                    ChatManager.SendChatMessage(msg_1, ChatMessageType.InRoom);
                }
            }
        }
        else {
            this.closePanel();
        }
        this.writeLabel.text = "";
    };
    /**
     * 使用小喇叭喊话
    */
    ChatPanel.prototype.userHorn = function () {
        if (!AwardManager.IsToLimitClient(this._hornAwardId)) {
            if (this.getHornNum() > 0) {
                ItemManager.reqUseItem(this._hornItemId, 1, this.writeLabel.text.trim());
            }
            else {
                UIManager.showFloatTips("您还没有小喇叭，不可进行发送！");
            }
        }
        else {
            UIManager.showFloatTips("您今天发送小喇叭次数已用完，请明天再试！");
        }
    };
    /**
     * 点击表情触发事件
    */
    ChatPanel.prototype.onFaceClick = function (e) {
        if (this.faceList.selectedItem) {
            ChatManager.SendChatMessage(ChatSpecialStrings.Emoji + this.faceList.selectedItem.id, ChatMessageType.InRoom);
            this.closePanel();
        }
    };
    /**
     * 输入框点击事件
    */
    ChatPanel.prototype.onWriteLabelClick = function () {
        if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android) {
            this.parent.y = -150;
        }
        this.writeLabel.setFocus();
    };
    /**
     * 输入框失去焦点
    */
    ChatPanel.prototype.writeLabelFocueout = function () {
        if (qin.RuntimeTypeName.getCurrentName() == qin.RuntimeTypeName.Android) {
            this.parent.y = 0;
        }
    };
    /**
     * 表情按钮点击事件
    */
    ChatPanel.prototype.changeActive = function () {
        this.fastGroup.visible = false;
        this.faceGroup.visible = true;
        this.faceTB.selected = true;
        this.fastEnterTB.selected = false;
        this.resetHorn();
        //判断玩家是否处于坐下状态
        if ((SceneManager.sceneType == SceneType.Game && GamblingManager.self) || (SceneManager.sceneType == SceneType.HundredWar && HundredWarManager.getPlayerInfo(UserManager.userInfo.roleId))) {
            this.disGroup.visible = false;
        }
        else {
            this.disGroup.visible = true;
        }
    };
    /**
     * 点击事件处理
    */
    ChatPanel.prototype.onClickHandler = function (event) {
        SoundManager.playButtonEffect(event.target);
        if (event.target == this.fastEnterTB) {
            this.fastGroup.visible = true;
            this.faceGroup.visible = false;
        }
        else if (event.target == this.keyBoradGroup) {
            this.closePanel();
        }
    };
    /**
     * 设置聊天信息列表数据
    */
    ChatPanel.prototype.setChatInfo = function () {
        if (ChatManager.chatList.length > 0) {
            this.refreshUI();
        }
    };
    /**
     * 添加显示聊天列表信息
    */
    ChatPanel.prototype.refreshUI = function () {
        UIUtil.writeListInfo(this.list, ChatManager.chatList);
        this.list.validateNow();
        this.setScrollV();
    };
    /**
     * 设置滚动距离
    */
    ChatPanel.prototype.setScrollV = function () {
        if (ChatManager.chatList.length >= this._rows) {
            this.scroller.viewport.scrollV = (ChatManager.chatList.length - this._rows + 1) * this._listItemHeight;
        }
    };
    /**
     * 大小改变时
    */
    ChatPanel.prototype.onResize = function () {
        this._scrollerHeight = this.scroller.height;
        this._rows = Math.ceil(this._scrollerHeight / this._listItemHeight);
    };
    /**
     * 关闭面板
    */
    ChatPanel.prototype.closePanel = function () {
        UIManager.closePanel(UIModuleName.ChatPanel);
    };
    return ChatPanel;
}(BasePanel));
__reflect(ChatPanel.prototype, "ChatPanel");
//# sourceMappingURL=ChatPanel.js.map