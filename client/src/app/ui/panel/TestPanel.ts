/**
 * 测试面板
 */
class TestPanel extends eui.Component
{
	private _testBtn: eui.Button;
	public constructor()
	{
		super();
		this.x = 150;
		this.y = 0;
		this.creatComponent();
	}
	private creatComponent()
	{
		if (!this._testBtn)
		{
			this._testBtn = new eui.Button();

			this._testBtn.label = "测试";
			this._testBtn.horizontalCenter = 0;
			this._testBtn.verticalCenter = 0;
			this._testBtn.skinName = "gambling_chat_btn";
			this._testBtn.alpha = 0.3;
			this.addChild(this._testBtn);
		}
		this.addEvents();
	}
	private addEvents()
	{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this, true);
	}
	private callBack: qin.Delegate;
	private clickHandler(event: egret.TouchEvent)
	{
		let target = event.target;
		switch (target)
		{
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
	}
	private testTime()
	{
		let str: string = qin.DateTimeUtil.formatTimestamp(TimeManager.GetServerUtcTimestamp());
		str = str.substring(5)
	}
	private _payIndex: number = 0;
	private testPayMaskPanel()
	{
		if (this._payIndex % 2 == 0)
		{
			UIManager.showPanel(UIModuleName.PayMaskPanel);
		}
		else
		{
			UIManager.closePanel(UIModuleName.PayMaskPanel);
		}
		this._payIndex++;
	}
	private testI()
	{
		for (let i: number = 0; i < 5; i++)
		{
			let callBack: Function = function ()
			{
				console.log(i);
			};
			setTimeout(function () { console.log(i); }, 100 * i);
			// qin.Tick.AddTimeoutInvoke(callBack, 10 * (i + 1), this);
		}
		for (var i = 0; i < 10; i++)
		{
			setTimeout(function () { console.log(i); }, 100 * i);
			// setTimeout(function () { callBack(); }, 100 * i);
		}
	}
	private gamblingPanelIndex: number = 0;
	private testGamblingPanel()
	{
		if (this.gamblingPanelIndex % 2 == 0)
		{
			UIManager.showPanel(UIModuleName.GamblingPanel);
		}
		else
		{
			UIManager.closePanel(UIModuleName.GamblingPanel);
		}
		this.gamblingPanelIndex++;
	}
	private testGuideChoosePanel()
	{
		UIManager.showPanel(UIModuleName.GuideChoosePanel, { type: 2 });
	}
	private testQuestionPanel()
	{
		let obj: any = {
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
		}
		UIManager.showPanel(UIModuleName.GuideQuestionPanel, obj);
	}
	private testAnswerPanel()
	{
		let obj: Object = {
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
	}
	private testGuideaward()
	{
		UIManager.showPanel(UIModuleName.GuideBringGoldPanel, { self: 34 });
	}
	private testGuide()
	{
		let def: GuideDefinition = GuideDefined.GetInstance().getDefinition(0);
		GuideManager.reqSetGuideStep(def);
	}
	private testJing()
	{
		let targetStr: string = "333#1#333#2###1#111111222"
		let str: string = targetStr.replace(/#[12]{1}#/g, qin.StringConstants.Empty);
		console.log(str);
	}
	private testDelete()
	{
		this.callBack = qin.Delegate.getOut(this.testDelete1, this);
		qin.Delegate.putIn(this.callBack);
		this.callBack = null;
		this.callBack = qin.Delegate.getOut(this.testDelete1, this);
	}
	private testDelete1()
	{
		console.log("testdelte1");
	}

	private testProperty()
	{
		// Object.prototype["myProperty"] = 10;
		// String.prototype
	}
	private testReg()
	{
		let matchStr: string = "a";
		let reg1: RegExp = /a/g;
		let reg: RegExp = new RegExp(matchStr, 'g');
		let str: string = "sasdfadfasdf"
		str = str.replace(reg, "喔");
		console.log(str);
	}
	private testDragonBones()
	{
		RES.getResAsync("test01_ske_dbmv", () =>
		{
			RES.getResAsync("test01_tex_png", () =>
			{
				dragonBones.addMovieGroup(RES.getRes("test01_ske_dbmv"), RES.getRes("test01_tex_png")); // 添加动画数据和贴图
				var movie: dragonBones.Movie = dragonBones.buildMovie("Sprite"); // 创建 白鹭极速格式 的动画
				movie.play(); // 播放动画
				movie.x = GameManager.stage.stageWidth * Math.random();
				movie.y = GameManager.stage.stageHeight * Math.random();
				movie.timeScale = Math.random();
				GameManager.stage.addChild(movie); // 添加 Movie 到显示列表
			}, this);
		}, this);
	}
	private stacktrace()
	{
		function st2(f)
		{
			if (f && f.caller && f.arguments)
			{
				let str: string = qin.StringConstants.Empty;
				for (let i: number = 0; i < f.arguments.length; i++)
				{
					if (i == f.arguments.lenght - 1)
					{
						str += f.arguments[i].toString();
					}
					else
					{
						str += f.arguments[i] + ",";
					}
				}
				return st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + str + ')']);;
			}
			else
			{
				return [];
			}
		}
		return st2(arguments.callee.caller);
	}
	private testConsole()
	{
		qin.Console.logError("sss");
	}
	private roomId: number = 1;
	private testEnterRoom()
	{
		GamblingManager.OnGetRoomInfoEvent.addListener(() =>
		{
			let panel: GamblingPanel = UIManager.getPanel(UIModuleName.GamblingPanel) as GamblingPanel;
			panel.switchToGameSceneInRoom();
		}, this);
		this.roomId = 500001;
		GamblingManager.reqEnterRoom(this.roomId);
		// this.roomId++;
		// if (this.roomId >= 24)
		// {
		// 	this.roomId = 1;
		// }
	}
	private test0undefined()
	{
		qin.Console.log(0 == undefined);
	}
	private testPringUnicode()
	{
		var decToHex = function (str)
		{
			var res = [];
			for (var i = 0; i < str.length; i++)
				res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
			return "\\u" + res.join("\\u");
		}
		var str = decToHex("decToHex unicode 编码转换");
		alert("编码后：" + str);
	}

	private testldhexchange()
	{
		
	}
	private testCharCode()
	{
		let arr: Array<number> = [];
		for (let i: number = 0; i < 300; i++)
		{
			if (String.fromCharCode(i) == "")
			{
				arr.push(i);
			}
			qin.Console.log(String.fromCharCode(i) + i);
		}
		qin.Console.log(arr);
	}
	private testOs()
	{
		AlertManager.showAlert(egret.Capabilities.os);
	}
	private testChat()
	{
		ChatManager.SendChatMessage("http://wx.qlogo.cn/mmopen/SR2sN954tXxHE6ICV3n09ibMEtSPtrrgT8NO7Zqrmbj0HKeI9ZsLKRlVd8mMwnz7NdIQgNwmiaPFE9MiaFXwkCOMXtPEYBzatQW/0", ChatMessageType.InRoom);
		// ChatManager.SendChatMessage("冲动是魔鬼，冷静", ChatMessageType.InRoom);
	}
	private testPanelName()
	{
		qin.Console.log(egret.getQualifiedClassName(this));
	}
	private testWaitNextPanel()
	{
		// UIManager.showPanel(UIModuleName.WaitNextRoundPanel);
	}
	private testInviteFriends()
	{
		FriendManager.reqInviteFriend(1, [1, 2, 3, 4]);
	}
	private testBrightCard()
	{
		let panel: GamblingPanel = UIManager.getPanel(UIModuleName.GamblingPanel) as GamblingPanel;
		for (let pitInfo of panel.pitList)
		{
			if (pitInfo.headComponent.bindData)
			{
				// pitInfo.headComponent.runBrightCard();
				break;
			}
		}
	}
	private testArray()
	{
		qin.Console.log((Array(5).join('0') + "1").slice(-5));
	}
	private testCardType()
	{
		let list: Array<CardInfo> = new Array<CardInfo>();
		let cardInfo: CardInfo = new CardInfo([1, 14]);
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
	}
}