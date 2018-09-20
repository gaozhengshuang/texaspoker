/**
 * 邀请活动面板
 */
class InvitePanel extends BasePanel
{
    public tabCom: TabComponent;
    /**
     * 绑定邀请码内容
    */
    public bindGroup: eui.Group;
    /**
     * 邀请内容
    */
    public inviteIdGroup: eui.Group;
    public shareScrollGroup: eui.Group;
    public shareScroller: eui.Scroller;
    public shareList: eui.List;
    public hasBindGroup: eui.Group;  //已绑定显示
    public bindDesLabel: eui.Label;  //已绑定描述
    public bindBtn: eui.Button;  //绑定按钮
    public inviteBtn: eui.Button;  //邀请按钮
    public inviteCodeLabel: eui.EditableText;
    public copyBtn: eui.Group;  //复制邀请码按钮
    public selfInviteCodeLabel: eui.Label;
    public scrollGroup: eui.Group;
    /**
     * 领取金豆内容
    */
    public imazamoxGroup: eui.Group;
    public hasGetImazamoxLabel: eui.Label;  //已获得金豆数量
    public canGetImazamoxLabel: eui.Label;  //还可以获得的金豆数量（可以获得的金豆数量的上限 - 已获得的）
    public canBringImazamoxLabel: eui.Label;  //可以领取的金豆数量
    public bringImazamoxBtn: eui.Button;  //领取
    public hasBindFriendGroup: eui.Group; // 有绑定好友显示
    public noBindFriendGroup: eui.Group;  //无绑定好友显示
    public totalBindNumLabel: eui.Label;  //绑定玩家总数
    public totalFinishNumLabel: eui.Label;  //完成新人礼总数
    public imazamoxScroller: eui.Scroller;
    public imazamoxList: eui.List;
    public bindReqscroller: ReqScroller;
    /**
     * 领取金币内容
    */
    public goldGroup: eui.Group;
    public hasGetGoldLabel: eui.Label; // 已获得金币数量
    public canBringGoldLabel: eui.Label; // 当前可领取金币数量
    public bringGoldBtn: eui.Button;  //领取
    public hasBuyGroup: eui.Group;  //有充值金额显示
    public noBuyGroup: eui.Group;  //无充值金额显示
    public totalBindNumLabel0: eui.Label;  //绑定玩家人数
    public goldScroller: eui.Scroller;
    public goldList: eui.List;
    public payReqscroller: ReqScroller;

    public constructor()
    {
        super();
        this.setSkinName(UIModuleName.InvitePanel);
    }
    protected onAwake(event: eui.UIEvent)
    {
        super.onAwake(event);
        this.maskAlpha = 0;
        let array: Array<eui.Group> = new Array<eui.Group>();
        this.bindGroup.visible = false;
        if (!UserManager.userInfo.bindRoleId && UserManager.userInfo.level < ProjectDefined.GetInstance().bindICodeLevelLimit)
        {
            array.push(this.bindGroup);
        }
        array.push(this.inviteIdGroup);
        array.push(this.imazamoxGroup);
        array.push(this.goldGroup);
        if (!UserManager.userInfo.bindRoleId && UserManager.userInfo.level < ProjectDefined.GetInstance().bindICodeLevelLimit)
        {
            this.tabCom.build(TabComponent.CreatData(["绑定邀请码", "邀请好友", "领取金豆", "领取金币"], array, TabButtonType.InviteSmallOf4));
        } else
        {
            this.tabCom.build(TabComponent.CreatData(["邀请好友", "领取金豆", "领取金币"], array, TabButtonType.InviteSmallOf3));
        }

        UIUtil.bindRender(this.shareList, InviteItemRenderer, null);
        this.shareList.useVirtualLayout = true;
        this.shareScroller.viewport = this.scrollGroup;
        this.shareScroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.shareScroller.scrollPolicyH = eui.ScrollPolicy.OFF;

        UIUtil.listRenderer(this.imazamoxList, this.imazamoxScroller, InviteImazamoxItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.bindReqscroller = new ReqScroller(this.imazamoxScroller, this.imazamoxList, 10, this.reqGetBindListInfo.bind(this));
        UIUtil.listRenderer(this.goldList, this.goldScroller, InviteGoldItemRenderer, ScrollViewDirection.Vertical_T_D, eui.ScrollPolicy.ON, null, true);
        this.payReqscroller = new ReqScroller(this.goldScroller, this.goldList, 10, this.reqGetPayListInfo.bind(this));
        this.imazamoxScroller.scrollPolicyH = this.goldScroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.tabCom.isTween = false;
        this.copyBtn.touchChildren = false;
        this.setAwardInfo();
        this.selfInviteCodeLabel.text = UserManager.userInfo.shareId;
    }
    public init(appendData: any)
    {
        super.init(appendData);
        this.tabCom.init(0);
        this.inviteCodeLabel.text = "";
        this.setIsBindShow();
    }
    protected onEnable(event: eui.UIEvent): void
    {
        super.onEnable(event);
        this.bindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtnClick, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInviteBtnClick, this);
        this.bringImazamoxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringImazamoxBtnClick, this);
        this.bringGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringGoldBtnClick, this);
        this.tabCom.tabChangeEvent.addListener(this.onTabClickHandler, this);
        InviteManager.OnBindListInfoEvent.addListener(this.setBringImazamoxInfo, this);
        InviteManager.OnPayListInfoEvent.addListener(this.setBringGoldInfo, this);
        InviteManager.OnBindInviteCodeEvent.addListener(this.bindInviteCodeSuccess, this);
        UserManager.OnGetSimpleUserInfoEvent.addListener(this.setBindInfo, this);
        InviteManager.OnBringBeanEvent.addListener(this.bringImazamoxSuccess, this);
        InviteManager.OnBringGoldEvent.addListener(this.bringGoldSuccess, this);
        InviteManager.OnInviteAwardEvent.addListener(this.setGetAwardInfo, this);
        this.copyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyInviteCode, this);
    }
    protected onDisable(event: eui.UIEvent): void
    {
        super.onDisable(event);
        this.bindBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtnClick, this);
        this.inviteBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onInviteBtnClick, this);
        this.bringImazamoxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringImazamoxBtnClick, this);
        this.bringGoldBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBringGoldBtnClick, this);
        this.tabCom.tabChangeEvent.removeListener(this.onTabClickHandler, this);
        InviteManager.OnBindListInfoEvent.removeListener(this.setBringImazamoxInfo, this);
        InviteManager.OnPayListInfoEvent.removeListener(this.setBringGoldInfo, this);
        InviteManager.OnBindInviteCodeEvent.removeListener(this.bindInviteCodeSuccess, this);
        UserManager.OnGetSimpleUserInfoEvent.removeListener(this.setBindInfo, this);
        InviteManager.OnBringBeanEvent.removeListener(this.bringImazamoxSuccess, this);
        InviteManager.OnBringGoldEvent.removeListener(this.bringGoldSuccess, this);
        InviteManager.OnInviteAwardEvent.removeListener(this.setGetAwardInfo, this);
        this.copyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.copyInviteCode, this);
    }

    /**
     * 设置导航栏
    */
    private setTab()
    {
        let array: Array<eui.Group> = new Array<eui.Group>();
        this.bindGroup.visible = false;
        if (!UserManager.userInfo.bindRoleId && UserManager.userInfo.level < ProjectDefined.GetInstance().bindICodeLevelLimit)
        {
            array.push(this.bindGroup);
        }
        array.push(this.inviteIdGroup);
        array.push(this.imazamoxGroup);
        array.push(this.goldGroup);
        if (!UserManager.userInfo.bindRoleId && UserManager.userInfo.level < ProjectDefined.GetInstance().bindICodeLevelLimit)
        {
            this.tabCom.update(TabComponent.CreatData(["绑定邀请码", "邀请好友", "领取金豆", "领取金币"], array, TabButtonType.InviteSmallOf4));
        } else
        {
            this.tabCom.update(TabComponent.CreatData(["邀请好友", "领取金豆", "领取金币"], array, TabButtonType.InviteSmallOf3));
        }
    }
    /**
     * 设置是否绑定过邀请码的显示
    */
    private setIsBindShow()
    {
        if (UserManager.userInfo.bindRoleId)  //判断是否绑定过邀请码  
        {
            this.hasBindGroup.visible = true;
            UserManager.reqSimpleUserInfo(UserManager.userInfo.bindRoleId);
        } else
        {
            this.hasBindGroup.visible = false;
            this.setNotBindAndMoreThreeShow();
        }
    }
    /**
     * 用户大于三级且没绑定 显示设置
    */
    private setNotBindAndMoreThreeShow()
    {
        this.shareScroller.y = 28;
    }
    /**
     * 正常的显示设置
    */
    private setNormalShow()
    {
        this.shareScroller.y = 57;
    }

    /**
     * 设置已绑定描述信息
    */
    private setBindInfo(data: any)
    {
        this.setNormalShow();
        if (data.roleId == UserManager.userInfo.bindRoleId)
        {
            this.bindDesLabel.text = "您已绑定" + data.name + "(ID:" + UserManager.userInfo.bindRoleId + ")的邀请码!";
        }
    }
    /**
     * 设置奖励数据
    */
    private setAwardInfo()
    {
        let inviteList: Array<InviteItemInfo> = new Array<InviteItemInfo>();
        let inviteDef: Object = ProjectDefined.GetInstance().invite;

        let def1: InviteItemInfo = new InviteItemInfo();
        def1.des = "好友绑定您的邀请码";
        def1.inviterAward = inviteDef["bindSelf"];
        def1.inviteesAward = inviteDef["bindFriend"];
        def1.rewardId = ItemFixedId.gold;

        let def2: InviteItemInfo = new InviteItemInfo();
        def2.des = "好友完成新人礼";
        def2.inviterAward = inviteDef["finishSelf"];
        def2.inviteesAward = inviteDef["finishFriend"];
        def2.rewardId = ItemFixedId.GoldenBean;

        inviteList.push(def1);
        inviteList.push(def2);
        if (inviteList)
        {
            UIUtil.writeListInfo(this.shareList, inviteList, null);
        }
    }
    /**
     * 设置奖励数据
    */
    private setGetAwardInfo()
    {
        //领取金豆奖励数据设置
        this.hasGetImazamoxLabel.text = qin.MathUtil.formatNum(InviteManager.inviteAwardInfo.gotBean) + ",";
        this.canGetImazamoxLabel.text = qin.MathUtil.formatNum(ProjectDefined.GetInstance().goldBeanLimit - InviteManager.inviteAwardInfo.gotBean);
        if ((InviteManager.inviteAwardInfo.getBean + InviteManager.inviteAwardInfo.gotBean) > ProjectDefined.GetInstance().goldBeanLimit)
        {
            this.canBringImazamoxLabel.text = qin.MathUtil.formatNum(ProjectDefined.GetInstance().goldBeanLimit - InviteManager.inviteAwardInfo.gotBean);
        } else
        {
            this.canBringImazamoxLabel.text = qin.MathUtil.formatNum(InviteManager.inviteAwardInfo.getBean);
        }
        this.totalBindNumLabel.text = "绑定好友：" + InviteManager.inviteAwardInfo.bind + "人";
        this.totalFinishNumLabel.text = "完成新人礼：" + InviteManager.inviteAwardInfo.finish + "人";
        this.setBringBeanBtnEnabled();

        //领取金币奖励数据设置
        this.hasGetGoldLabel.text = qin.MathUtil.formatNum(InviteManager.inviteAwardInfo.gotGold);
        this.canBringGoldLabel.text = qin.MathUtil.formatNum(InviteManager.inviteAwardInfo.getGold);
        this.totalBindNumLabel0.text = "绑定好友：" + InviteManager.inviteAwardInfo.bind + "人";
        this.setBringGoldBtnEnabled();
    }
    /**
     * 设置金豆领取按钮是否可点击
    */
    private setBringBeanBtnEnabled()
    {
        if (InviteManager.inviteAwardInfo && InviteManager.inviteAwardInfo.getBean) 
        {
            this.bringImazamoxBtn.enabled = true;
        } else
        {
            this.bringImazamoxBtn.enabled = false;
        }
    }
    /**
     * 设置金币领取按钮是否可点击
    */
    private setBringGoldBtnEnabled()
    {
        if (InviteManager.inviteAwardInfo && InviteManager.inviteAwardInfo.getGold) 
        {
            this.bringGoldBtn.enabled = true;
        } else
        {
            this.bringGoldBtn.enabled = false;
        }
    }
    /**
     * 设置领取金豆界面数据
    */
    private setBringImazamoxInfo(data: any)
    {
        if (data.bindList && !(data.isBottom && data.bindList.length <= 0 && this.bindReqscroller.index == 0))
        {
            this.hasBindFriendGroup.visible = true;
            this.noBindFriendGroup.visible = false;
            this.bindReqscroller.init(new eui.ArrayCollection(data.bindList), data.isBottom);
        } else
        {
            this.hasBindFriendGroup.visible = false;
            this.noBindFriendGroup.visible = true;
        }
    }
    /**
     * 设置领取金币界面数据
    */
    private setBringGoldInfo(data: any)
    {
        if (data.payList && !(data.isBottom && data.payList.length <= 0 && this.payReqscroller.index == 0))
        {
            this.hasBuyGroup.visible = true;
            this.noBuyGroup.visible = false;
            this.payReqscroller.init(new eui.ArrayCollection(data.payList), data.isBottom);
        } else
        {
            this.hasBuyGroup.visible = false;
            this.noBuyGroup.visible = true;
        }
    }
    /**
     * 领取金豆成功后刷新领取金豆页面数据
    */
    private bringImazamoxSuccess()
    {
        InviteManager.reqInviteAward();
    }
    /**
     * 领取金币成功后刷新领取金币页面数据
    */
    private bringGoldSuccess()
    {
        this.payReqscroller.Clear();  //领取完清掉充值列表内容
        this.hasBuyGroup.visible = false;
        this.noBuyGroup.visible = true;
        InviteManager.reqInviteAward();
    }
    /**
     * 判断邀请码是否合法
    */
    private inviteIdIsValid(): boolean
    {
        let shareId: string = this.inviteCodeLabel.text.trim();
        if (shareId)
        {
            if (shareId == UserManager.userInfo.shareId)  //判断是否是自己的邀请码 
            {
                AlertManager.showAlert("不可绑定您自己的邀请码！");
                return false;
            } else
            {
                return true;
            }
        } else
        {
            AlertManager.showAlert("邀请码为空");
            return false;
        }
    }
    /**
     * 绑定邀请码成功
    */
    private bindInviteCodeSuccess()
    {
        this.setTab();
        this.setIsBindShow();
        let inviteDef: Object = ProjectDefined.GetInstance().invite;
        if (inviteDef)
        {
            UIManager.showPanel(UIModuleName.BringAwardComPanel, { itemId: ItemFixedId.gold, itemCount: inviteDef["bindFriend"], des: "绑定邀请码成功，你获得：", thisObj: this });
        }
    }

    /**
     * 绑定好友按钮点击事件
    */
    private onBindBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.inviteIdIsValid())
        {
            let shareId: string = this.inviteCodeLabel.text.trim();
            InviteManager.reqBindInviteCode(shareId);
        }
    }
    /**
     * 复制邀请码按钮点击事件
    */
    private copyInviteCode()
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        ChannelManager.copyToPastboard(this.selfInviteCodeLabel.text);
    }
    /**
     * 邀请好友按钮点击事件
    */
    private onInviteBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (!(qin.System.isWeChat || qin.System.isMicro))
        {
            UIManager.showFloatTips('当前打开方式不支持分享，请在微信里打开或使用App版本');
            return;
        }
        if (qin.System.isMicro && ChannelManager.hasWeixin == false)
        {
            AlertManager.showAlert("您未安装微信，分享失败。");
            return;
        }
        UIManager.showPanel(UIModuleName.ChooseShareWayPanel, { wxMsgTitle: qin.StringUtil.format("送你一个[{0}]游戏大礼包，快来领取！", ChannelManager.appName), wxTimeLineTitle: qin.StringUtil.format("送你一个[{0}]游戏大礼包，快来领取！", ChannelManager.appName), msg: "这里有紧张刺激的锦标赛，多人参与的休闲活动。更有丰富的奖励等你来拿，快来和我一起玩吧！", isHasShareId: true });
    }
    /**
     * 领取金豆按钮点击事件
    */
    private onBringImazamoxBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        InviteManager.reqBringBean();
    }
    /**
     * 领取金币按钮点击事件
    */
    private onBringGoldBtnClick(event: egret.TouchEvent)
    {
        SoundManager.playEffect(MusicAction.buttonClick);
        InviteManager.reqBringGold();
    }
    /**
     * 选项卡按钮点击事件
    */
    private onTabClickHandler(index: number): void
    {
        if (!UserManager.userInfo.bindRoleId && UserManager.userInfo.level < ProjectDefined.GetInstance().bindICodeLevelLimit)
        {
            if (index == 2)
            {
                //请求领取金豆页面信息
                this.bringBeanClick();
            } else if (index == 3)
            {
                //请求领取金币页面信息    
                this.bringGoldClick();
            }
        } else
        {
            if (index == 1)
            {
                //请求领取金豆页面信息
                this.bringBeanClick();
            } else if (index == 2)
            {
                //请求领取金币页面信息    
                this.bringGoldClick();
            }
        }
    }
    /**
     * 领取金豆按钮点击事件处理
    */
    private bringBeanClick()
    {
        this.bindReqscroller.Clear();
        this.setBringBeanBtnEnabled();
        InviteManager.reqBindListInfo(this.bindReqscroller.startId, 10);
        InviteManager.reqInviteAward();
    }
    /**
     * 领取金币按钮点击事件
    */
    private bringGoldClick()
    {
        this.payReqscroller.Clear();
        this.setBringGoldBtnEnabled();
        InviteManager.reqPayListInfo(this.payReqscroller.startId, 10);
        InviteManager.reqInviteAward();
    }
    /**
     * 发送获取绑定数据信息
    */
    private reqGetBindListInfo()
    {
        InviteManager.reqBindListInfo(this.bindReqscroller.startId, this.bindReqscroller.reqNum);
    }
    /**
     * 发送获取充值数据信息
    */
    private reqGetPayListInfo()
    {
        InviteManager.reqPayListInfo(this.payReqscroller.startId, this.payReqscroller.reqNum);
    }
}
