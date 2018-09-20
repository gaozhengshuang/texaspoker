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
 * 测试面板
 */
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        var _this = _super.call(this) || this;
        _this._payIndex = 0;
        _this.gamblingPanelIndex = 0;
        _this.roomId = 1;
        _this.x = 150;
        _this.y = 0;
        _this.creatComponent();
        return _this;
    }
    TestPanel.prototype.creatComponent = function () {
        if (!this._testBtn) {
            this._testBtn = new eui.Button();
            this._testBtn.label = "测试";
            this._testBtn.horizontalCenter = 0;
            this._testBtn.verticalCenter = 0;
            this._testBtn.skinName = "gambling_chat_btn";
            this._testBtn.alpha = 0.3;
            this.addChild(this._testBtn);
        }
        this.addEvents();
    };
    TestPanel.prototype.addEvents = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this, true);
    };
    TestPanel.prototype.clickHandler = function (event) {
        var target = event.target;
        switch (target) {
            case this._testBtn:
                // this.testCardType();
                // this.testBrightCard();
                // this.testArray();
                // this.testInviteFriends();
                // this.testWaitNextPanel();
                // this.testPanelName();
                // this.testChat();
                // this.testCharCode();
                // this.testOs();
                // this.testldhexchange();
                // this.test0undefined();
                // this.testEnterRoom();
                //this.testConsole();
                // TestPanel.prototype["myproperty"] = 3;
                // console.log(this["myproperty"]);
                // console.log(this.stacktrace());
                // this.testDragonBones();
                // this.testReg();
                // this.testDelete();
                // this.testJing();
                // ChannelUtil.wxAuthorize(LoginManager.loginInfo.userid.toString());
                // this.testGuide();
                // this.testPayMaskPanel();
                // this.testGuideaward();
                // this.testAnswerPanel();
                // this.testQuestionPanel();
                // this.testGuideChoosePanel();
                // this.testGamblingPanel();
                // this.testI();
                // UIManager.showPanel(UIModuleName.LoadingSwitchPanel, false);
                // this.testTime();
                // let reg: RegExp = /\#/g; //过滤#
                // let msg = "###aaaa##aaa";
                // msg = msg.replace(reg, qin.StringConstants.Empty);
                // console.log(msg);
                // VersionManager.gotoLoadNewVersion();
                // console.log(300 % 100, 300 % 200, 100 % 300, 300 % 300);
                // SocketManager.Reconnect();
                // // create an ArrayBuffer with a size in bytes
                // var buffer = new ArrayBuffer(16);
                // // Create a couple of views
                // var view1 = new DataView(buffer);
                // var view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes
                // view1.setInt8(13, 42); // put 42 in slot 12
                // console.log(view2.getInt8(1));
                // // expected output: 42
                // AlertManager.showAlert("哈哈蛤");
                // console.log("语言：" + qin.I18n.lang);
                break;
        }
    };
    TestPanel.prototype.testTime = function () {
        var str = qin.DateTimeUtil.formatTimestamp(TimeManager.GetServerUtcTimestamp());
        str = str.substring(5);
    };
    TestPanel.prototype.testPayMaskPanel = function () {
        if (this._payIndex % 2 == 0) {
            UIManager.showPanel(UIModuleName.PayMaskPanel);
        }
        else {
            UIManager.closePanel(UIModuleName.PayMaskPanel);
        }
        this._payIndex++;
    };
    TestPanel.prototype.testI = function () {
        var _loop_1 = function (i_1) {
            var callBack = function () {
                console.log(i_1);
            };
            setTimeout(function () { console.log(i_1); }, 100 * i_1);
            // qin.Tick.AddTimeoutInvoke(callBack, 10 * (i + 1), this);
        };
        for (var i_1 = 0; i_1 < 5; i_1++) {
            _loop_1(i_1);
        }
        for (var i = 0; i < 10; i++) {
            setTimeout(function () { console.log(i); }, 100 * i);
            // setTimeout(function () { callBack(); }, 100 * i);
        }
    };
    TestPanel.prototype.testGamblingPanel = function () {
        if (this.gamblingPanelIndex % 2 == 0) {
            UIManager.showPanel(UIModuleName.GamblingPanel);
        }
        else {
            UIManager.closePanel(UIModuleName.GamblingPanel);
        }
        this.gamblingPanelIndex++;
    };
    TestPanel.prototype.testGuideChoosePanel = function () {
        UIManager.showPanel(UIModuleName.GuideChoosePanel, { type: 2 });
    };
    TestPanel.prototype.testQuestionPanel = function () {
        var obj = {
            "question": 2,
            "self": 23,
            "gap": -10,
            "scale": 1,
            "cardList1": [
                2,
                1,
                2,
                11,
                3,
                1,
                2,
                5,
                1,
                11,
                2,
                10,
                2,
                9
            ],
            "cardList2": [
                2,
                1,
                2,
                11,
                2,
                10,
                2,
                9,
                2,
                5,
                3,
                1,
                1,
                11
            ],
            "mask2": [
                3,
                1,
                1,
                11
            ]
        };
        UIManager.showPanel(UIModuleName.GuideQuestionPanel, obj);
    };
    TestPanel.prototype.testAnswerPanel = function () {
        var obj = {
            "cardList1": [
                3,
                1,
                5,
                2,
                1,
                11,
                2,
                1,
                2,
                11
            ],
            "cardList2": [
                3,
                1,
                2,
                1,
                1,
                11,
                2,
                11,
                2,
                5
            ]
        };
        UIManager.showPanel(UIModuleName.GuideAnswerErrorPanel, obj);
    };
    TestPanel.prototype.testGuideaward = function () {
        UIManager.showPanel(UIModuleName.GuideBringGoldPanel, { self: 34 });
    };
    TestPanel.prototype.testGuide = function () {
        var def = GuideDefined.GetInstance().getDefinition(0);
        GuideManager.reqSetGuideStep(def);
    };
    TestPanel.prototype.testJing = function () {
        var targetStr = "333#1#333#2###1#111111222";
        var str = targetStr.replace(/#[12]{1}#/g, qin.StringConstants.Empty);
        console.log(str);
    };
    TestPanel.prototype.testDelete = function () {
        this.callBack = qin.Delegate.getOut(this.testDelete1, this);
        qin.Delegate.putIn(this.callBack);
        this.callBack = null;
        this.callBack = qin.Delegate.getOut(this.testDelete1, this);
    };
    TestPanel.prototype.testDelete1 = function () {
        console.log("testdelte1");
    };
    TestPanel.prototype.testProperty = function () {
        // Object.prototype["myProperty"] = 10;
        // String.prototype
    };
    TestPanel.prototype.testReg = function () {
        var matchStr = "a";
        var reg1 = /a/g;
        var reg = new RegExp(matchStr, 'g');
        var str = "sasdfadfasdf";
        str = str.replace(reg, "喔");
        console.log(str);
    };
    TestPanel.prototype.testDragonBones = function () {
        var _this = this;
        RES.getResAsync("test01_ske_dbmv", function () {
            RES.getResAsync("test01_tex_png", function () {
                dragonBones.addMovieGroup(RES.getRes("test01_ske_dbmv"), RES.getRes("test01_tex_png")); // 添加动画数据和贴图
                var movie = dragonBones.buildMovie("Sprite"); // 创建 白鹭极速格式 的动画
                movie.play(); // 播放动画
                movie.x = GameManager.stage.stageWidth * Math.random();
                movie.y = GameManager.stage.stageHeight * Math.random();
                movie.timeScale = Math.random();
                GameManager.stage.addChild(movie); // 添加 Movie 到显示列表
            }, _this);
        }, this);
    };
    TestPanel.prototype.stacktrace = function () {
        function st2(f) {
            if (f && f.caller && f.arguments) {
                var str = qin.StringConstants.Empty;
                for (var i = 0; i < f.arguments.length; i++) {
                    if (i == f.arguments.lenght - 1) {
                        str += f.arguments[i].toString();
                    }
                    else {
                        str += f.arguments[i] + ",";
                    }
                }
                return st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + str + ')']);
                ;
            }
            else {
                return [];
            }
        }
        return st2(arguments.callee.caller);
    };
    TestPanel.prototype.testConsole = function () {
        qin.Console.logError("sss");
    };
    TestPanel.prototype.testEnterRoom = function () {
        GamblingManager.OnGetRoomInfoEvent.addListener(function () {
            var panel = UIManager.getPanel(UIModuleName.GamblingPanel);
            panel.switchToGameSceneInRoom();
        }, this);
        this.roomId = 500001;
        GamblingManager.reqEnterRoom(this.roomId);
        // this.roomId++;
        // if (this.roomId >= 24)
        // {
        // 	this.roomId = 1;
        // }
    };
    TestPanel.prototype.test0undefined = function () {
        qin.Console.log(0 == undefined);
    };
    TestPanel.prototype.testPringUnicode = function () {
        var decToHex = function (str) {
            var res = [];
            for (var i = 0; i < str.length; i++)
                res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
            return "\\u" + res.join("\\u");
        };
        var str = decToHex("decToHex unicode 编码转换");
        alert("编码后：" + str);
    };
    TestPanel.prototype.testldhexchange = function () {
        var v = qin.Crypt.ldhexchange("<¢`û");
        // v = "\b×Ë\f";
        //	v = "sss1";
        qin.Console.log(v);
        // v = Crypt.lb64encode(v);
        var arr = [];
        for (var i = 0; i < 4; i++) {
            arr[i] = v.charCodeAt(i);
        }
        var buf = array2arraybuffer(arr);
        v = egret.Base64Util.encode(buf);
        qin.Console.log(v);
    };
    TestPanel.prototype.testCharCode = function () {
        var arr = [];
        for (var i = 0; i < 300; i++) {
            if (String.fromCharCode(i) == "") {
                arr.push(i);
            }
            qin.Console.log(String.fromCharCode(i) + i);
        }
        qin.Console.log(arr);
    };
    TestPanel.prototype.testOs = function () {
        AlertManager.showAlert(egret.Capabilities.os);
    };
    TestPanel.prototype.testChat = function () {
        ChatManager.SendChatMessage("http://wx.qlogo.cn/mmopen/SR2sN954tXxHE6ICV3n09ibMEtSPtrrgT8NO7Zqrmbj0HKeI9ZsLKRlVd8mMwnz7NdIQgNwmiaPFE9MiaFXwkCOMXtPEYBzatQW/0", ChatMessageType.InRoom);
        // ChatManager.SendChatMessage("冲动是魔鬼，冷静", ChatMessageType.InRoom);
    };
    TestPanel.prototype.testPanelName = function () {
        qin.Console.log(egret.getQualifiedClassName(this));
    };
    TestPanel.prototype.testWaitNextPanel = function () {
        // UIManager.showPanel(UIModuleName.WaitNextRoundPanel);
    };
    TestPanel.prototype.testInviteFriends = function () {
        FriendManager.reqInviteFriend(1, [1, 2, 3, 4]);
    };
    TestPanel.prototype.testBrightCard = function () {
        var panel = UIManager.getPanel(UIModuleName.GamblingPanel);
        for (var _i = 0, _a = panel.pitList; _i < _a.length; _i++) {
            var pitInfo = _a[_i];
            if (pitInfo.headComponent.bindData) {
                // pitInfo.headComponent.runBrightCard();
                break;
            }
        }
    };
    TestPanel.prototype.testArray = function () {
        qin.Console.log((Array(5).join('0') + "1").slice(-5));
    };
    TestPanel.prototype.testCardType = function () {
        var list = new Array();
        var cardInfo = new CardInfo([1, 14]);
        list.push(cardInfo);
        cardInfo = new CardInfo([2, 14]);
        list.push(cardInfo);
        cardInfo = new CardInfo([3, 14]);
        list.push(cardInfo);
        cardInfo = new CardInfo([1, 3]);
        list.push(cardInfo);
        cardInfo = new CardInfo([2, 3]);
        list.push(cardInfo);
        cardInfo = new CardInfo([3, 3]);
        list.push(cardInfo);
        cardInfo = new CardInfo([1, 6]);
        list.push(cardInfo);
        GamblingManager.roomInfo = new RoomInfo();
        CardTypeMatchUtil.matchCardInRoom(list);
        qin.Console.log(CardTypeMatchUtil.getCardDes(CardTypeMatchUtil.cardType));
    };
    return TestPanel;
}(eui.Component));
__reflect(TestPanel.prototype, "TestPanel");
//# sourceMappingURL=TestPanel.js.map