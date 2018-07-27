var egret = window.egret;
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"Coins":"resource/eui_skins/Coins.exml","game.Choose":"resource/eui_skins/Choose.exml"};generateEUI.paths['resource/eui_skins/component/NormalLabelButtonSkin.exml'] = window.NormalLabelButtonSkin = (function (_super) {
	__extends(NormalLabelButtonSkin, _super);
	function NormalLabelButtonSkin() {
		_super.call(this);
		this.skinParts = ["bgDisplay","labelDisplay"];
		
		this.height = 60;
		this.width = 130;
		this.elementsContent = [this.bgDisplay_i(),this.labelDisplay_i()];
	}
	var _proto = NormalLabelButtonSkin.prototype;

	_proto.bgDisplay_i = function () {
		var t = new eui.Image();
		this.bgDisplay = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(22,19,26,7);
		t.source = "cube_json.1_1";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.size = 25;
		t.stroke = 2;
		t.strokeColor = 0xd6a518;
		t.text = "一二三四五";
		t.verticalCenter = 0;
		return t;
	};
	return NormalLabelButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/IconButtonSkin.exml'] = window.IconButtonSkin = (function (_super) {
	__extends(IconButtonSkin, _super);
	function IconButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.elementsContent = [this.iconDisplay_i()];
	}
	var _proto = IconButtonSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "ui_json.sp";
		t.verticalCenter = 0;
		return t;
	};
	return IconButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CommonDialogSkin.exml'] = window.CommonDialogSkin = (function (_super) {
	__extends(CommonDialogSkin, _super);
	function CommonDialogSkin() {
		_super.call(this);
		this.skinParts = ["open_tip","image","txt_content","btn_goPay","btn_close","group"];
		
		this.height = 1100;
		this.width = 720;
		this.open_tip_i();
		this.elementsContent = [this.group_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [320],[],this._Object1,"x");
		eui.Binding.$bindProperties(this, [572],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"y");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [58],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [119],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"y");
	}
	var _proto = CommonDialogSkin.prototype;

	_proto.open_tip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.open_tip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 300;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this.image_i(),this.txt_content_i(),this.btn_goPay_i(),this.btn_close_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 463;
		t.horizontalCenter = -3;
		t.source = "user_json.addressBg";
		t.verticalCenter = -61.5;
		t.width = 720;
		return t;
	};
	_proto.txt_content_i = function () {
		var t = new eui.Label();
		this.txt_content = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 211.66;
		t.horizontalCenter = 7;
		t.lineSpacing = 10;
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0x206d99;
		t.text = "��������";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = -108;
		t.width = 584.34;
		return t;
	};
	_proto.btn_goPay_i = function () {
		var t = new game.LabelButton();
		this.btn_goPay = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "NormalLabelButtonSkin";
		t.verticalCenter = 74;
		t.width = 174;
		t.x = 233;
		t.y = 637;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new game.IconButton();
		this.btn_close = t;
		t.horizontalCenter = 311.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = -266.5;
		return t;
	};
	return CommonDialogSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LoadingSkin.exml'] = window.LoadingSkin = (function (_super) {
	__extends(LoadingSkin, _super);
	function LoadingSkin() {
		_super.call(this);
		this.skinParts = ["lodingImg","lodingGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this.lodingGroup_i()];
	}
	var _proto = LoadingSkin.prototype;

	_proto.lodingGroup_i = function () {
		var t = new eui.Group();
		this.lodingGroup = t;
		t.percentHeight = 100;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.lodingImg_i(),this._Image1_i()];
		return t;
	};
	_proto.lodingImg_i = function () {
		var t = new eui.Image();
		this.lodingImg = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(72,137,579,787);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "loadingMain_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "loadingMainYs_png";
		t.verticalCenter = -117.5;
		t.x = 0;
		t.y = 120;
		return t;
	};
	return LoadingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/NetFailedSkin.exml'] = window.NetFailedSkin = (function (_super) {
	__extends(NetFailedSkin, _super);
	function NetFailedSkin() {
		_super.call(this);
		this.skinParts = ["image","reasonLabel","reconnectButton"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = NetFailedSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.4;
		t.fillColor = 0x000000;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 720;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 709;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.verticalCenter = 0;
		t.width = 526;
		t.elementsContent = [this.image_i(),this._Image1_i(),this.reasonLabel_i(),this.reconnectButton_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 709;
		t.source = "ui_json.dialogBg";
		t.width = 526;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "ui_json.duanxian";
		t.y = 96.36;
		return t;
	};
	_proto.reasonLabel_i = function () {
		var t = new eui.Label();
		this.reasonLabel = t;
		t.horizontalCenter = 0;
		t.size = 30;
		t.stroke = 2;
		t.strokeColor = 0xff0000;
		t.text = "重复登陆";
		t.y = 482.66;
		return t;
	};
	_proto.reconnectButton_i = function () {
		var t = new game.LabelButton();
		this.reconnectButton = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 86.66;
		t.horizontalCenter = 0.5;
		t.skinName = "NormalLabelButtonSkin";
		t.verticalCenter = 238;
		t.width = 228.67;
		return t;
	};
	return NetFailedSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBagItemSkin.exml'] = window.BattleBagItemSkin = (function (_super) {
	__extends(BattleBagItemSkin, _super);
	function BattleBagItemSkin() {
		_super.call(this);
		this.skinParts = ["itemImg","itemMask","shoplight","itemName","itemDesc","itemMoney","getButton","itemNumBg","itemNum"];
		
		this.height = 160;
		this.width = 646;
		this.elementsContent = [this._Image1_i(),this.itemImg_i(),this.itemMask_i(),this.shoplight_i(),this.itemName_i(),this.itemDesc_i(),this.itemMoney_i(),this.getButton_i(),this.itemNumBg_i(),this.itemNum_i()];
	}
	var _proto = BattleBagItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "lucky_json.bagshopbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.itemImg_i = function () {
		var t = new eui.Image();
		this.itemImg = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.horizontalCenter = -240;
		t.mask = this.itemMask;
		t.source = "item_json.6003";
		t.verticalCenter = 4;
		t.width = 126;
		return t;
	};
	_proto.itemMask_i = function () {
		var t = new eui.Image();
		this.itemMask = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.horizontalCenter = -240;
		t.source = "lucky_json.shopbg";
		t.verticalCenter = 4;
		if(this.itemImg)
		{
			this.itemImg.mask = this.itemMask;
		}
		return t;
	};
	_proto.shoplight_i = function () {
		var t = new eui.Image();
		this.shoplight = t;
		t.anchorOffsetX = 82;
		t.anchorOffsetY = 82;
		t.horizontalCenter = -240;
		t.source = "lucky_json.shoplight";
		t.verticalCenter = 4;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.left = 160;
		t.size = 26;
		t.strokeColor = 0xdcadff;
		t.text = "道具名";
		t.textAlign = "left";
		t.textColor = 0x8c5eda;
		t.verticalCenter = -43;
		return t;
	};
	_proto.itemDesc_i = function () {
		var t = new eui.Label();
		this.itemDesc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 52;
		t.left = 160;
		t.size = 18;
		t.strokeColor = 0xDCADFF;
		t.text = "商品描述：巴拉巴拉";
		t.textAlign = "left";
		t.textColor = 0x4d4d4d;
		t.verticalCenter = 11;
		t.width = 350;
		return t;
	};
	_proto.itemMoney_i = function () {
		var t = new eui.Label();
		this.itemMoney = t;
		t.bold = true;
		t.size = 20;
		t.text = "价值：100RMB";
		t.textAlign = "left";
		t.textColor = 0x47b3fc;
		t.verticalCenter = 56;
		t.x = 160;
		return t;
	};
	_proto.getButton_i = function () {
		var t = new game.IconButton();
		this.getButton = t;
		t.horizontalCenter = 227;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 46.5;
		return t;
	};
	_proto.itemNumBg_i = function () {
		var t = new eui.Image();
		this.itemNumBg = t;
		t.horizontalCenter = 97.5;
		t.source = "lucky_json.shopnumbg";
		t.touchEnabled = false;
		t.verticalCenter = -42;
		return t;
	};
	_proto.itemNum_i = function () {
		var t = new eui.Label();
		this.itemNum = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 98;
		t.size = 18;
		t.text = "X50";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.verticalCenter = -43;
		return t;
	};
	return BattleBagItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBagSkin.exml'] = window.BattleBagSkin = (function (_super) {
	__extends(BattleBagSkin, _super);
	function BattleBagSkin() {
		_super.call(this);
		this.skinParts = ["luckyButton","deliveryButton","historyMoneyButton","nogiftTips","closeButton","bagList","bagScr","luckyGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.luckyGroup_i()];
	}
	var _proto = BattleBagSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto.luckyGroup_i = function () {
		var t = new eui.Group();
		this.luckyGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this.luckyButton_i(),this.deliveryButton_i(),this.historyMoneyButton_i(),this._Label1_i(),this.nogiftTips_i(),this.closeButton_i(),this.bagScr_i(),this._Image2_i(),this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.luckyButton_i = function () {
		var t = new game.IconButton();
		this.luckyButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 454.5;
		return t;
	};
	_proto.deliveryButton_i = function () {
		var t = new game.IconButton();
		this.deliveryButton = t;
		t.horizontalCenter = -241.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 454.5;
		return t;
	};
	_proto.historyMoneyButton_i = function () {
		var t = new game.IconButton();
		this.historyMoneyButton = t;
		t.horizontalCenter = 242.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 454.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "返回抽奖";
		t.touchEnabled = false;
		t.x = 301;
		t.y = 985;
		return t;
	};
	_proto.nogiftTips_i = function () {
		var t = new eui.Label();
		this.nogiftTips = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "您还没有获得战利品!";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 638;
		t.y = 23;
		return t;
	};
	_proto.bagScr_i = function () {
		var t = new eui.Scroller();
		this.bagScr = t;
		t.anchorOffsetY = 0;
		t.height = 821.21;
		t.horizontalCenter = -1.5;
		t.verticalCenter = -26.5;
		t.width = 646;
		t.viewport = this.bagList_i();
		return t;
	};
	_proto.bagList_i = function () {
		var t = new eui.List();
		this.bagList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 556;
		t.itemRendererSkinName = BattleBagItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.useVirtualLayout = true;
		t.x = 141;
		t.y = 188;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 6;
		t.verticalGap = 22;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagline";
		t.x = 65;
		t.y = 933.07;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagline";
		t.x = 65;
		t.y = 107.62;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagtitle";
		t.x = 222;
		t.y = -10;
		return t;
	};
	return BattleBagSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBallSkin.exml'] = window.BattleBallSkin = (function (_super) {
	__extends(BattleBallSkin, _super);
	function BattleBallSkin() {
		_super.call(this);
		this.skinParts = ["ballImage"];
		
		this.height = 34;
		this.width = 34;
		this.elementsContent = [this.ballImage_i()];
	}
	var _proto = BattleBallSkin.prototype;

	_proto.ballImage_i = function () {
		var t = new eui.Image();
		this.ballImage = t;
		t.anchorOffsetX = 17;
		t.anchorOffsetY = 17;
		t.source = "ball_json.3";
		t.x = 17;
		t.y = 17;
		return t;
	};
	return BattleBallSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBlackHoleSkin.exml'] = window.BattleBlackHoleSkin = (function (_super) {
	__extends(BattleBlackHoleSkin, _super);
	function BattleBlackHoleSkin() {
		_super.call(this);
		this.skinParts = ["showAnim","holeImage"];
		
		this.height = 36;
		this.width = 72;
		this.showAnim_i();
		this.elementsContent = [this.holeImage_i()];
		
		eui.Binding.$bindProperties(this, ["holeImage"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0.5],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [0.5],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleY");
	}
	var _proto = BattleBlackHoleSkin.prototype;

	_proto.showAnim_i = function () {
		var t = new egret.tween.TweenGroup();
		this.showAnim = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.holeImage_i = function () {
		var t = new eui.Image();
		this.holeImage = t;
		t.horizontalCenter = 4;
		t.source = "cube_json.blackHole_00000";
		t.verticalCenter = 0;
		return t;
	};
	return BattleBlackHoleSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBoomSkin.exml'] = window.BattleBoomSkin = (function (_super) {
	__extends(BattleBoomSkin, _super);
	function BattleBoomSkin() {
		_super.call(this);
		this.skinParts = ["boomImage"];
		
		this.height = 36;
		this.width = 72;
		this.elementsContent = [this.boomImage_i()];
	}
	var _proto = BattleBoomSkin.prototype;

	_proto.boomImage_i = function () {
		var t = new eui.Image();
		this.boomImage = t;
		t.horizontalCenter = 0;
		t.scaleY = 1;
		t.source = "cube_json.boom_00002";
		t.verticalCenter = 0;
		return t;
	};
	return BattleBoomSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBrickBreakSkin.exml'] = window.BattleBrickBreakSkin = (function (_super) {
	__extends(BattleBrickBreakSkin, _super);
	function BattleBrickBreakSkin() {
		_super.call(this);
		this.skinParts = ["breakGroup"];
		
		this.height = 35;
		this.width = 72;
		this.elementsContent = [this.breakGroup_i()];
	}
	var _proto = BattleBrickBreakSkin.prototype;

	_proto.breakGroup_i = function () {
		var t = new eui.Group();
		this.breakGroup = t;
		t.x = 36;
		t.y = 18;
		return t;
	};
	return BattleBrickBreakSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBrickInfoSkin.exml'] = window.BattleBrickInfoSkin = (function (_super) {
	__extends(BattleBrickInfoSkin, _super);
	function BattleBrickInfoSkin() {
		_super.call(this);
		this.skinParts = ["brickImage","priceLabel"];
		
		this.height = 28;
		this.width = 175;
		this.elementsContent = [this.brickImage_i(),this.priceLabel_i(),this._Label1_i(),this._Label2_i()];
	}
	var _proto = BattleBrickInfoSkin.prototype;

	_proto.brickImage_i = function () {
		var t = new eui.Image();
		this.brickImage = t;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "cube_json.1_1";
		return t;
	};
	_proto.priceLabel_i = function () {
		var t = new eui.Label();
		this.priceLabel = t;
		t.anchorOffsetX = 0;
		t.size = 20;
		t.strokeColor = 0xffffff;
		t.text = "1000";
		t.textAlign = "center";
		t.textColor = 0x504d61;
		t.verticalAlign = "middle";
		t.width = 50.4;
		t.x = 74.4;
		t.y = 4;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 20;
		t.strokeColor = 0xFFFFFF;
		t.text = "炮弹";
		t.textAlign = "left";
		t.textColor = 0x504D61;
		t.verticalAlign = "middle";
		t.width = 130;
		t.x = 123;
		t.y = 3;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 20;
		t.strokeColor = 0xFFFFFF;
		t.text = "=";
		t.textAlign = "left";
		t.textColor = 0x504D61;
		t.verticalAlign = "middle";
		t.width = 130;
		t.x = 62;
		t.y = 4;
		return t;
	};
	return BattleBrickInfoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBrickSkin.exml'] = window.BattleBrickSkin = (function (_super) {
	__extends(BattleBrickSkin, _super);
	function BattleBrickSkin() {
		_super.call(this);
		this.skinParts = ["shakeAnim","showAnim","brickImage","countdownLabel","crackImage","group"];
		
		this.height = 36;
		this.width = 72;
		this.shakeAnim_i();
		this.showAnim_i();
		this.elementsContent = [this.group_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0.9],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [0.9],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleY");
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [1.2],[],this._Object4,"scaleX");
		eui.Binding.$bindProperties(this, [1.2],[],this._Object4,"scaleY");
		eui.Binding.$bindProperties(this, [1],[],this._Object5,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object5,"scaleY");
	}
	var _proto = BattleBrickSkin.prototype;

	_proto.shakeAnim_i = function () {
		var t = new egret.tween.TweenGroup();
		this.shakeAnim = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 100;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 100;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.showAnim_i = function () {
		var t = new egret.tween.TweenGroup();
		this.showAnim = t;
		t.items = [this._TweenItem2_i()];
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To3_i(),this._To4_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 250;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 100;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 36;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 72;
		t.elementsContent = [this.brickImage_i(),this.countdownLabel_i(),this.crackImage_i()];
		return t;
	};
	_proto.brickImage_i = function () {
		var t = new eui.Image();
		this.brickImage = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cube_json.5";
		t.verticalCenter = -0.5;
		return t;
	};
	_proto.countdownLabel_i = function () {
		var t = new eui.Label();
		this.countdownLabel = t;
		t.fontFamily = "DynoBold";
		t.size = 18;
		t.text = "99";
		t.textAlign = "center";
		t.textColor = 0xff0000;
		t.verticalCenter = -1;
		t.width = 72;
		t.x = -2;
		return t;
	};
	_proto.crackImage_i = function () {
		var t = new eui.Image();
		this.crackImage = t;
		t.height = 36;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cube_json.crack1";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	return BattleBrickSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleBuffSkin.exml'] = window.BattleBuffSkin = (function (_super) {
	__extends(BattleBuffSkin, _super);
	function BattleBuffSkin() {
		_super.call(this);
		this.skinParts = ["buffImage","goldLabel"];
		
		this.elementsContent = [this.buffImage_i(),this.goldLabel_i()];
	}
	var _proto = BattleBuffSkin.prototype;

	_proto.buffImage_i = function () {
		var t = new eui.Image();
		this.buffImage = t;
		t.source = "buff_json.3";
		return t;
	};
	_proto.goldLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.goldLabel = t;
		t.font = "font/goldGame_fnt";
		t.horizontalCenter = -2.5;
		t.text = "1";
		t.verticalCenter = 0;
		return t;
	};
	return BattleBuffSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleFirewallSkin.exml'] = window.BattleFirewallSkin = (function (_super) {
	__extends(BattleFirewallSkin, _super);
	function BattleFirewallSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 144;
		this.width = 22;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = BattleFirewallSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 144;
		t.scale9Grid = new egret.Rectangle(2,29,18,5);
		t.source = "cube_json.fire";
		t.width = 22;
		t.x = 0;
		return t;
	};
	return BattleFirewallSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleIceSkin.exml'] = window.BattleIceSkin = (function (_super) {
	__extends(BattleIceSkin, _super);
	function BattleIceSkin() {
		_super.call(this);
		this.skinParts = ["boomImage"];
		
		this.height = 36;
		this.width = 72;
		this.elementsContent = [this.boomImage_i()];
	}
	var _proto = BattleIceSkin.prototype;

	_proto.boomImage_i = function () {
		var t = new eui.Image();
		this.boomImage = t;
		t.horizontalCenter = 0;
		t.scaleX = 4;
		t.scaleY = 4;
		t.source = "cube_json.blueBoom_00000";
		t.verticalCenter = 0;
		return t;
	};
	return BattleIceSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/LuckyItemSkin.exml'] = window.LuckyItemSkin = (function (_super) {
	__extends(LuckyItemSkin, _super);
	function LuckyItemSkin() {
		_super.call(this);
		this.skinParts = ["itembg","itemImg","itemName"];
		
		this.height = 126;
		this.width = 126;
		this.elementsContent = [this.itembg_i(),this.itemImg_i(),this._Image1_i(),this.itemName_i()];
	}
	var _proto = LuckyItemSkin.prototype;

	_proto.itembg_i = function () {
		var t = new eui.Image();
		this.itembg = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.horizontalCenter = 0;
		t.source = "lucky_json.luckyItemBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.itemImg_i = function () {
		var t = new eui.Image();
		this.itemImg = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 80;
		t.horizontalCenter = 0;
		t.source = "item_json.6";
		t.verticalCenter = -9;
		t.width = 80;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "lucky_json.itemNameBg";
		t.x = 0;
		t.y = 97;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "道具名";
		t.textAlign = "center";
		t.textColor = 0x5e5e5e;
		t.verticalCenter = 49;
		return t;
	};
	return LuckyItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleLuckySkin.exml'] = window.BattleLuckySkin = (function (_super) {
	__extends(BattleLuckySkin, _super);
	function BattleLuckySkin() {
		_super.call(this);
		this.skinParts = ["gift_1","gift_2","gift_3","gift_4","gift_5","gift_6","gift_7","gift_8","gift_9","gift_10","gift_11","gift_12","gift_13","gift_14","gift_15","gift_16","gift_17","gift_18","luckyLight","closeButton","startButton","bagButton","luckyGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.luckyGroup_i()];
	}
	var _proto = BattleLuckySkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.width = 720;
		t.y = 0;
		return t;
	};
	_proto.luckyGroup_i = function () {
		var t = new eui.Group();
		this.luckyGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.gift_1_i(),this.gift_2_i(),this.gift_3_i(),this.gift_4_i(),this.gift_5_i(),this.gift_6_i(),this.gift_7_i(),this.gift_8_i(),this.gift_9_i(),this.gift_10_i(),this.gift_11_i(),this.gift_12_i(),this.gift_13_i(),this.gift_14_i(),this.gift_15_i(),this.gift_16_i(),this.gift_17_i(),this.gift_18_i(),this.luckyLight_i(),this.closeButton_i(),this.startButton_i(),this.bagButton_i(),this._Label1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.luckyTitle";
		t.y = -9;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 519;
		t.horizontalCenter = 0;
		t.source = "lucky_json.luckyIMG";
		t.verticalCenter = 0;
		t.width = 408;
		return t;
	};
	_proto.gift_1_i = function () {
		var t = new game.LuckyItem();
		this.gift_1 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 224.41;
		return t;
	};
	_proto.gift_2_i = function () {
		var t = new game.LuckyItem();
		this.gift_2 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 230;
		t.y = 225;
		return t;
	};
	_proto.gift_3_i = function () {
		var t = new game.LuckyItem();
		this.gift_3 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 360;
		t.y = 225;
		return t;
	};
	_proto.gift_4_i = function () {
		var t = new game.LuckyItem();
		this.gift_4 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 490;
		t.y = 225;
		return t;
	};
	_proto.gift_5_i = function () {
		var t = new game.LuckyItem();
		this.gift_5 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 225;
		return t;
	};
	_proto.gift_6_i = function () {
		var t = new game.LuckyItem();
		this.gift_6 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 355;
		return t;
	};
	_proto.gift_7_i = function () {
		var t = new game.LuckyItem();
		this.gift_7 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 485;
		return t;
	};
	_proto.gift_8_i = function () {
		var t = new game.LuckyItem();
		this.gift_8 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 615;
		return t;
	};
	_proto.gift_9_i = function () {
		var t = new game.LuckyItem();
		this.gift_9 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 745;
		return t;
	};
	_proto.gift_10_i = function () {
		var t = new game.LuckyItem();
		this.gift_10 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 620;
		t.y = 875;
		return t;
	};
	_proto.gift_11_i = function () {
		var t = new game.LuckyItem();
		this.gift_11 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 490;
		t.y = 875;
		return t;
	};
	_proto.gift_12_i = function () {
		var t = new game.LuckyItem();
		this.gift_12 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 360;
		t.y = 875;
		return t;
	};
	_proto.gift_13_i = function () {
		var t = new game.LuckyItem();
		this.gift_13 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 230;
		t.y = 875;
		return t;
	};
	_proto.gift_14_i = function () {
		var t = new game.LuckyItem();
		this.gift_14 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 875;
		return t;
	};
	_proto.gift_15_i = function () {
		var t = new game.LuckyItem();
		this.gift_15 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 745;
		return t;
	};
	_proto.gift_16_i = function () {
		var t = new game.LuckyItem();
		this.gift_16 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 615;
		return t;
	};
	_proto.gift_17_i = function () {
		var t = new game.LuckyItem();
		this.gift_17 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 485;
		return t;
	};
	_proto.gift_18_i = function () {
		var t = new game.LuckyItem();
		this.gift_18 = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.skinName = "LuckyItemSkin";
		t.width = 126;
		t.x = 100;
		t.y = 355;
		return t;
	};
	_proto.luckyLight_i = function () {
		var t = new eui.Image();
		this.luckyLight = t;
		t.anchorOffsetX = 82;
		t.anchorOffsetY = 82;
		t.source = "lucky_json.luckyLight";
		t.x = 100;
		t.y = 225;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 638.68;
		t.y = 23.67;
		return t;
	};
	_proto.startButton_i = function () {
		var t = new game.IconButton();
		this.startButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 472.5;
		return t;
	};
	_proto.bagButton_i = function () {
		var t = new game.IconButton();
		this.bagButton = t;
		t.horizontalCenter = 208.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 472.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0.5;
		t.text = "抽  奖";
		t.touchEnabled = false;
		t.y = 1003.24;
		return t;
	};
	return BattleLuckySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattlePaddleSkin.exml'] = window.BattlePaddleSkin = (function (_super) {
	__extends(BattlePaddleSkin, _super);
	function BattlePaddleSkin() {
		_super.call(this);
		this.skinParts = ["shotAnim","bg","cannonImage","ball1","ball2","ball3","group","paddleGroup","waveMask","waveImage","spLabel","costLabel","spImage","boomImage"];
		
		this.height = 251;
		this.width = 197;
		this.shotAnim_i();
		this.elementsContent = [this.bg_i(),this.paddleGroup_i(),this._Image1_i(),this._Image2_i(),this.waveMask_i(),this.waveImage_i(),this.spLabel_i(),this.costLabel_i(),this.spImage_i(),this.boomImage_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [5],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"y");
	}
	var _proto = BattlePaddleSkin.prototype;

	_proto.shotAnim_i = function () {
		var t = new egret.tween.TweenGroup();
		this.shotAnim = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 98.5;
		t.anchorOffsetY = 98.5;
		t.source = "paddle_json.bg";
		t.x = 98.5;
		t.y = 150;
		return t;
	};
	_proto.paddleGroup_i = function () {
		var t = new eui.Group();
		this.paddleGroup = t;
		t.anchorOffsetX = 65.5;
		t.anchorOffsetY = 153;
		t.height = 217;
		t.width = 131;
		t.x = 98.5;
		t.y = 153;
		t.elementsContent = [this.group_i()];
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 217;
		t.width = 131;
		t.y = -4;
		t.elementsContent = [this.cannonImage_i(),this.ball1_i(),this.ball2_i(),this.ball3_i()];
		return t;
	};
	_proto.cannonImage_i = function () {
		var t = new eui.Image();
		this.cannonImage = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle_json.pao";
		t.y = -4;
		return t;
	};
	_proto.ball1_i = function () {
		var t = new eui.Image();
		this.ball1 = t;
		t.source = "paddle_json.guanchuan";
		t.x = 50.67;
		t.y = 61.83;
		return t;
	};
	_proto.ball2_i = function () {
		var t = new eui.Image();
		this.ball2 = t;
		t.source = "paddle_json.guanchuan";
		t.x = 50.67;
		t.y = 50.16;
		return t;
	};
	_proto.ball3_i = function () {
		var t = new eui.Image();
		this.ball3 = t;
		t.source = "paddle_json.guanchuan";
		t.x = 50.67;
		t.y = 38.5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "paddle_json.paota";
		t.x = 24.5;
		t.y = 76;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "paddle_json.di";
		t.touchEnabled = false;
		t.x = 42;
		t.y = 93;
		return t;
	};
	_proto.waveMask_i = function () {
		var t = new eui.Image();
		this.waveMask = t;
		t.source = "paddle_json.di";
		t.touchEnabled = false;
		t.x = 42;
		t.y = 93;
		return t;
	};
	_proto.waveImage_i = function () {
		var t = new eui.Image();
		this.waveImage = t;
		t.source = "paddle_json.wave_00000";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 173;
		return t;
	};
	_proto.spLabel_i = function () {
		var t = new eui.Label();
		this.spLabel = t;
		t.horizontalCenter = 1.5;
		t.size = 18;
		t.text = "能量";
		t.touchEnabled = false;
		t.y = 170.99;
		return t;
	};
	_proto.costLabel_i = function () {
		var t = new eui.Label();
		this.costLabel = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "DynoBold";
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "5";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.width = 227;
		t.y = 134.5;
		return t;
	};
	_proto.spImage_i = function () {
		var t = new eui.Image();
		this.spImage = t;
		t.horizontalCenter = 1.5;
		t.scaleX = 1.5;
		t.scaleY = 1.5;
		t.source = "paddle_json.sp_00000";
		t.touchEnabled = false;
		t.verticalCenter = 11.5;
		t.visible = false;
		return t;
	};
	_proto.boomImage_i = function () {
		var t = new eui.Image();
		this.boomImage = t;
		t.bottom = -91;
		t.horizontalCenter = 0;
		t.scaleX = 2;
		t.scaleY = 2;
		t.source = "cube_json.redBoom_00000";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	return BattlePaddleSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/PayItemSkin.exml'] = window.PayItemSkin = (function (_super) {
	__extends(PayItemSkin, _super);
	var PayItemSkin$Skin1 = 	(function (_super) {
		__extends(PayItemSkin$Skin1, _super);
		function PayItemSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PayItemSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "ui_json.chkPayBg";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PayItemSkin$Skin1;
	})(eui.Skin);

	function PayItemSkin() {
		_super.call(this);
		this.skinParts = ["itembg","itemGold","itemRmb","itemImg"];
		
		this.height = 210;
		this.width = 226;
		this.elementsContent = [this.itembg_i(),this.itemGold_i(),this.itemRmb_i(),this.itemImg_i()];
	}
	var _proto = PayItemSkin.prototype;

	_proto.itembg_i = function () {
		var t = new eui.Button();
		this.itembg = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = PayItemSkin$Skin1;
		return t;
	};
	_proto.itemGold_i = function () {
		var t = new eui.Label();
		this.itemGold = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = -2;
		t.size = 24;
		t.text = "12345678钻石";
		t.textAlign = "center";
		t.textColor = 0xff9f3b;
		t.touchEnabled = false;
		t.verticalCenter = 20;
		return t;
	};
	_proto.itemRmb_i = function () {
		var t = new eui.Label();
		this.itemRmb = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 36;
		t.text = "6元";
		t.textAlign = "center";
		t.textColor = 0xff9f3b;
		t.touchEnabled = false;
		t.verticalCenter = -20;
		return t;
	};
	_proto.itemImg_i = function () {
		var t = new eui.Image();
		this.itemImg = t;
		t.anchorOffsetX = 40;
		t.anchorOffsetY = 40;
		t.height = 206;
		t.horizontalCenter = -2.5;
		t.source = "ui_json.chkPay";
		t.touchEnabled = false;
		t.verticalCenter = -2;
		t.width = 221;
		return t;
	};
	return PayItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattlePaySkin.exml'] = window.BattlePaySkin = (function (_super) {
	__extends(BattlePaySkin, _super);
	function BattlePaySkin() {
		_super.call(this);
		this.skinParts = ["gift_1","gift_2","gift_3","gift_4","gift_5","gift_6","closeButton","startButton","goldCnt","allChangeButton","curDiamond_txt","luckyGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.luckyGroup_i()];
	}
	var _proto = BattlePaySkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.width = 720;
		t.y = 0;
		return t;
	};
	_proto.luckyGroup_i = function () {
		var t = new eui.Group();
		this.luckyGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.gift_1_i(),this.gift_2_i(),this.gift_3_i(),this.gift_4_i(),this.gift_5_i(),this.gift_6_i(),this.closeButton_i(),this.startButton_i(),this.goldCnt_i(),this._Label1_i(),this._Label2_i(),this._Image5_i(),this.allChangeButton_i(),this.curDiamond_txt_i(),this._Label3_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.luckyBtn";
		t.y = 6;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "ui_json.historyMoneyTitleBg";
		t.x = -3;
		t.y = 88;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "ui_json.historyMoneyTitleBg";
		t.x = -3;
		t.y = 88;
		return t;
	};
	_proto.gift_1_i = function () {
		var t = new game.PayItem();
		this.gift_1 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchChildren = true;
		t.touchEnabled = true;
		t.width = 226;
		t.x = 134;
		t.y = 468;
		return t;
	};
	_proto.gift_2_i = function () {
		var t = new game.PayItem();
		this.gift_2 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchChildren = true;
		t.touchEnabled = true;
		t.width = 226;
		t.x = 359;
		t.y = 468;
		return t;
	};
	_proto.gift_3_i = function () {
		var t = new game.PayItem();
		this.gift_3 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchChildren = true;
		t.touchEnabled = true;
		t.width = 226;
		t.x = 579;
		t.y = 468;
		return t;
	};
	_proto.gift_4_i = function () {
		var t = new game.PayItem();
		this.gift_4 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchEnabled = true;
		t.width = 226;
		t.x = 134;
		t.y = 678;
		return t;
	};
	_proto.gift_5_i = function () {
		var t = new game.PayItem();
		this.gift_5 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchEnabled = true;
		t.width = 226;
		t.x = 359;
		t.y = 678;
		return t;
	};
	_proto.gift_6_i = function () {
		var t = new game.PayItem();
		this.gift_6 = t;
		t.anchorOffsetX = 113;
		t.anchorOffsetY = 105;
		t.height = 210;
		t.skinName = "PayItemSkin";
		t.touchEnabled = true;
		t.width = 226;
		t.x = 579;
		t.y = 678;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 638.68;
		t.y = 23.67;
		return t;
	};
	_proto.startButton_i = function () {
		var t = new game.IconButton();
		this.startButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 352.5;
		return t;
	};
	_proto.goldCnt_i = function () {
		var t = new eui.Label();
		this.goldCnt = t;
		t.anchorOffsetX = 134;
		t.anchorOffsetY = 24;
		t.bold = true;
		t.horizontalCenter = -0.5;
		t.size = 48;
		t.text = "1234567890";
		t.textAlign = "center";
		t.textColor = 0xff9f3b;
		t.verticalAlign = "middle";
		t.verticalCenter = -312;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 89;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.horizontalCenter = 5.5;
		t.size = 36;
		t.text = "拥 有 金 币";
		t.textColor = 0xff9f3b;
		t.touchEnabled = false;
		t.verticalCenter = -382;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 36;
		t.text = "充 值";
		t.x = 317;
		t.y = 32.17;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "ui_json.diamondChangeBg";
		t.y = 983;
		return t;
	};
	_proto.allChangeButton_i = function () {
		var t = new game.IconButton();
		this.allChangeButton = t;
		t.horizontalCenter = 147.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 455.5;
		return t;
	};
	_proto.curDiamond_txt_i = function () {
		var t = new eui.Label();
		this.curDiamond_txt = t;
		t.bold = true;
		t.left = 168;
		t.size = 24;
		t.text = "拥有：3000钻石";
		t.textAlign = "left";
		t.verticalCenter = 458;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "钻石兑换金币比例(1:1)";
		t.textColor = 0xdb4c55;
		t.touchEnabled = false;
		t.y = 1041;
		return t;
	};
	return BattlePaySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleRewardBallSkin.exml'] = window.BattleRewardBallSkin = (function (_super) {
	__extends(BattleRewardBallSkin, _super);
	function BattleRewardBallSkin() {
		_super.call(this);
		this.skinParts = ["rewardLabel"];
		
		this.height = 22;
		this.elementsContent = [this._Image1_i(),this.rewardLabel_i()];
	}
	var _proto = BattleRewardBallSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 34;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "ui_json.gold";
		t.width = 34;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rewardLabel_i = function () {
		var t = new eui.Label();
		this.rewardLabel = t;
		t.size = 22;
		t.text = "Label";
		t.textColor = 0xffa530;
		t.x = 28;
		t.y = 0;
		return t;
	};
	return BattleRewardBallSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/BadBuffProgressBar.exml'] = window.BadBuffProgressBar = (function (_super) {
	__extends(BadBuffProgressBar, _super);
	function BadBuffProgressBar() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = BadBuffProgressBar.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "ui_json.badBuffProgressBg";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(3,77,20,464);
		t.source = "ui_json.badBuffProgress";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return BadBuffProgressBar;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/BadBuffSkin.exml'] = window.BadBuffSkin = (function (_super) {
	__extends(BadBuffSkin, _super);
	function BadBuffSkin() {
		_super.call(this);
		this.skinParts = ["boxshake","boxBuffImg","badBuffProgressBar"];
		
		this.height = 200;
		this.width = 200;
		this.boxshake_i();
		this.elementsContent = [this._Image1_i(),this.boxBuffImg_i(),this.badBuffProgressBar_i(),this._Label1_i()];
		
		eui.Binding.$bindProperties(this, ["boxBuffImg"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [349],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"rotation");
		eui.Binding.$bindProperties(this, [11],[],this._Object3,"rotation");
		eui.Binding.$bindProperties(this, [360],[],this._Object4,"rotation");
	}
	var _proto = BadBuffSkin.prototype;

	_proto.boxshake_i = function () {
		var t = new egret.tween.TweenGroup();
		this.boxshake = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Wait1_i(),this._Set1_i(),this._Wait2_i(),this._Set2_i(),this._Wait3_i(),this._Set3_i(),this._Wait4_i(),this._Set4_i()];
		return t;
	};
	_proto._Wait1_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 150;
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._Wait2_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 150;
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._Wait3_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 150;
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._Wait4_i = function () {
		var t = new egret.tween.Wait();
		t.duration = 150;
		return t;
	};
	_proto._Set4_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.boxBuffBg";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.boxBuffImg_i = function () {
		var t = new eui.Image();
		this.boxBuffImg = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 100;
		t.height = 200;
		t.horizontalCenter = 3;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.boxBuff1";
		t.touchEnabled = true;
		t.verticalCenter = -5;
		return t;
	};
	_proto.badBuffProgressBar_i = function () {
		var t = new eui.ProgressBar();
		this.badBuffProgressBar = t;
		t.height = 25;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BadBuffProgressBar";
		t.touchEnabled = false;
		t.verticalCenter = 65;
		t.width = 94;
		t.x = -246;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.italic = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "拆弹奖励";
		t.textColor = 0xB14DDC;
		t.touchEnabled = false;
		t.verticalCenter = 85.5;
		return t;
	};
	return BadBuffSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleSceneSkin.exml'] = window.BattleSceneSkin = (function (_super) {
	__extends(BattleSceneSkin, _super);
	function BattleSceneSkin() {
		_super.call(this);
		this.skinParts = ["doubleAnim","brickInfoGroup","light1","light2","light3","doubleGroup","topBg","touchGroup","luckyButton","userButton","rechargeButton","bagButton","bottomGroup","buffGroup","showGroup","moreFireImg","paddleGroup","debugGroup","mainGroup","penetrationBallImage","penetrationLabel","penetrationGroup","ballButton1","ballButton2","ball1Price","ball2Price","ballGroup","backButton","scoreLabel","hitLabel","noticeLabel","guideGroup","badbuffPanel","badBuffGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.doubleAnim_i();
		this.elementsContent = [this._Image1_i(),this.brickInfoGroup_i(),this.doubleGroup_i(),this.topBg_i(),this.touchGroup_i(),this.bottomGroup_i(),this.mainGroup_i(),this.penetrationGroup_i(),this.ballGroup_i(),this.backButton_i(),this.scoreLabel_i(),this.hitLabel_i(),this.noticeLabel_i(),this.guideGroup_i(),this.badBuffGroup_i()];
		
		eui.Binding.$bindProperties(this, ["doubleGroup"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object3,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object5,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object6,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object7,"alpha");
	}
	var _proto = BattleSceneSkin.prototype;

	_proto.doubleAnim_i = function () {
		var t = new egret.tween.TweenGroup();
		this.doubleAnim = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i(),this._To4_i(),this._To5_i(),this._To6_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._To5_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._To6_i = function () {
		var t = new egret.tween.To();
		t.duration = 500;
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(90,102,540,601);
		t.source = "ui_json.bg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.brickInfoGroup_i = function () {
		var t = new eui.Group();
		this.brickInfoGroup = t;
		t.bottom = 30;
		t.left = 5;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.doubleGroup_i = function () {
		var t = new eui.Group();
		this.doubleGroup = t;
		t.percentHeight = 100;
		t.scrollEnabled = true;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.y = 87.81;
		t.elementsContent = [this.light1_i(),this.light2_i(),this.light3_i()];
		return t;
	};
	_proto.light1_i = function () {
		var t = new eui.Image();
		this.light1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle_json.light";
		t.width = 720;
		t.y = 0;
		return t;
	};
	_proto.light2_i = function () {
		var t = new eui.Image();
		this.light2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle_json.light";
		t.width = 720;
		t.y = 775;
		return t;
	};
	_proto.light3_i = function () {
		var t = new eui.Image();
		this.light3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle_json.light";
		t.width = 720;
		t.y = 1550;
		return t;
	};
	_proto.topBg_i = function () {
		var t = new eui.Image();
		this.topBg = t;
		t.scale9Grid = new egret.Rectangle(90,10,540,45);
		t.source = "ui_json.topBg";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.touchGroup_i = function () {
		var t = new eui.Group();
		this.touchGroup = t;
		t.percentHeight = 100;
		t.width = 720;
		return t;
	};
	_proto.bottomGroup_i = function () {
		var t = new eui.Group();
		this.bottomGroup = t;
		t.bottom = 0;
		t.height = 210;
		t.horizontalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image2_i(),this.luckyButton_i(),this.userButton_i(),this.rechargeButton_i(),this.bagButton_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_json.gameBtnBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.luckyButton_i = function () {
		var t = new game.IconButton();
		this.luckyButton = t;
		t.horizontalCenter = 181.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 39.5;
		return t;
	};
	_proto.userButton_i = function () {
		var t = new game.IconButton();
		this.userButton = t;
		t.horizontalCenter = -300.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 39.5;
		return t;
	};
	_proto.rechargeButton_i = function () {
		var t = new game.IconButton();
		this.rechargeButton = t;
		t.horizontalCenter = -174.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 39.5;
		return t;
	};
	_proto.bagButton_i = function () {
		var t = new game.IconButton();
		this.bagButton = t;
		t.horizontalCenter = 303.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 39.5;
		return t;
	};
	_proto.mainGroup_i = function () {
		var t = new eui.Group();
		this.mainGroup = t;
		t.percentHeight = 100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this.buffGroup_i(),this.showGroup_i(),this.paddleGroup_i(),this.debugGroup_i()];
		return t;
	};
	_proto.buffGroup_i = function () {
		var t = new eui.Group();
		this.buffGroup = t;
		t.anchorOffsetX = 0;
		t.height = 876;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 88;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		return t;
	};
	_proto.showGroup_i = function () {
		var t = new eui.Group();
		this.showGroup = t;
		t.anchorOffsetX = 0;
		t.height = 876;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 88;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		return t;
	};
	_proto.paddleGroup_i = function () {
		var t = new eui.Group();
		this.paddleGroup = t;
		t.anchorOffsetX = 0;
		t.height = 876;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 88;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 720;
		t.x = 0;
		t.elementsContent = [this._Component1_i(),this.moreFireImg_i()];
		return t;
	};
	_proto._Component1_i = function () {
		var t = new eui.Component();
		t.anchorOffsetX = 98.5;
		t.anchorOffsetY = 153;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BattlePaddleSkin";
		t.visible = false;
		t.x = 360.5;
		t.y = 900;
		return t;
	};
	_proto.moreFireImg_i = function () {
		var t = new eui.Image();
		this.moreFireImg = t;
		t.horizontalCenter = 0;
		t.source = "ui_json.moreFire";
		t.touchEnabled = false;
		t.verticalCenter = -39;
		t.visible = false;
		return t;
	};
	_proto.debugGroup_i = function () {
		var t = new eui.Group();
		this.debugGroup = t;
		t.anchorOffsetX = 0;
		t.height = 876;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 88;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 720;
		t.x = 0;
		return t;
	};
	_proto.penetrationGroup_i = function () {
		var t = new eui.Group();
		this.penetrationGroup = t;
		t.bottom = 30;
		t.height = 100;
		t.left = 5;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 100;
		t.elementsContent = [this.penetrationBallImage_i(),this.penetrationLabel_i()];
		return t;
	};
	_proto.penetrationBallImage_i = function () {
		var t = new eui.Image();
		this.penetrationBallImage = t;
		t.source = "ball_json.3";
		t.x = 190;
		t.y = 61;
		return t;
	};
	_proto.penetrationLabel_i = function () {
		var t = new eui.Label();
		this.penetrationLabel = t;
		t.fontFamily = "DynoBold";
		t.horizontalCenter = 225;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 25;
		t.text = "x5";
		t.textColor = 0x514e5f;
		t.width = 100;
		t.y = 71.99;
		return t;
	};
	_proto.ballGroup_i = function () {
		var t = new eui.Group();
		this.ballGroup = t;
		t.percentHeight = 100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 720;
		t.elementsContent = [this._Rect1_i(),this.ballButton1_i(),this.ballButton2_i(),this.ball1Price_i(),this.ball2Price_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.percentHeight = 100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		return t;
	};
	_proto.ballButton1_i = function () {
		var t = new game.IconButton();
		this.ballButton1 = t;
		t.horizontalCenter = -151;
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = -76;
		t.visible = false;
		return t;
	};
	_proto.ballButton2_i = function () {
		var t = new game.IconButton();
		this.ballButton2 = t;
		t.horizontalCenter = 0;
		t.scaleX = 2;
		t.scaleY = 2;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 44;
		return t;
	};
	_proto.ball1Price_i = function () {
		var t = new eui.Label();
		this.ball1Price = t;
		t.horizontalCenter = -151;
		t.size = 20;
		t.text = "Label";
		t.visible = false;
		t.y = 541;
		return t;
	};
	_proto.ball2Price_i = function () {
		var t = new eui.Label();
		this.ball2Price = t;
		t.horizontalCenter = 0.5;
		t.size = 20;
		t.text = "Label";
		t.verticalCenter = 121;
		return t;
	};
	_proto.backButton_i = function () {
		var t = new game.IconButton();
		this.backButton = t;
		t.horizontalCenter = -319.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.y = 10;
		return t;
	};
	_proto.scoreLabel_i = function () {
		var t = new eui.Label();
		this.scoreLabel = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.size = 34;
		t.strokeColor = 0xFFFFFF;
		t.text = "分数:0";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.width = 344;
		t.y = 26;
		return t;
	};
	_proto.hitLabel_i = function () {
		var t = new eui.Label();
		this.hitLabel = t;
		t.right = 20;
		t.stroke = 2;
		t.strokeColor = 0xFFFFFF;
		t.text = "";
		t.textColor = 0x898989;
		t.top = 20;
		t.visible = false;
		return t;
	};
	_proto.noticeLabel_i = function () {
		var t = new eui.Label();
		this.noticeLabel = t;
		t.horizontalCenter = 0;
		t.text = "";
		t.textColor = 0xff678e;
		t.y = 92;
		return t;
	};
	_proto.guideGroup_i = function () {
		var t = new eui.Group();
		this.guideGroup = t;
		t.percentHeight = 100;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 720;
		t.elementsContent = [this._Image3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.yindao";
		t.verticalCenter = -220.5;
		return t;
	};
	_proto.badBuffGroup_i = function () {
		var t = new eui.Group();
		this.badBuffGroup = t;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.horizontalCenter = 282;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.verticalCenter = 309;
		t.width = 150;
		t.elementsContent = [this.badbuffPanel_i()];
		return t;
	};
	_proto.badbuffPanel_i = function () {
		var t = new game.BadBuff();
		this.badbuffPanel = t;
		t.height = 20;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BadBuffSkin";
		t.verticalCenter = 0;
		t.width = 20;
		return t;
	};
	return BattleSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleSpBarSkin.exml'] = window.BattleSpBarSkin = (function (_super) {
	__extends(BattleSpBarSkin, _super);
	function BattleSpBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.height = 60;
		this.width = 21;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = BattleSpBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(43,3,75,14);
		t.source = "ui_json.spBg";
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.scale9Grid = new egret.Rectangle(43,3,64,14);
		t.source = "ui_json.spBar";
		return t;
	};
	return BattleSpBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/battle/BattleTimeBoomSkin.exml'] = window.BattleTimeBoomSkin = (function (_super) {
	__extends(BattleTimeBoomSkin, _super);
	function BattleTimeBoomSkin() {
		_super.call(this);
		this.skinParts = ["boomImage"];
		
		this.height = 150;
		this.width = 200;
		this.elementsContent = [this.boomImage_i()];
	}
	var _proto = BattleTimeBoomSkin.prototype;

	_proto.boomImage_i = function () {
		var t = new eui.Image();
		this.boomImage = t;
		t.source = "cube_json.timeBoom_00001";
		return t;
	};
	return BattleTimeBoomSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/common/AvatarSkin.exml'] = window.AvatarSkin = (function (_super) {
	__extends(AvatarSkin, _super);
	function AvatarSkin() {
		_super.call(this);
		this.skinParts = ["selectImage","avatarImage"];
		
		this.height = 116;
		this.width = 116;
		this.elementsContent = [this.selectImage_i(),this.avatarImage_i()];
	}
	var _proto = AvatarSkin.prototype;

	_proto.selectImage_i = function () {
		var t = new eui.Image();
		this.selectImage = t;
		t.horizontalCenter = 0;
		t.source = "win_json.touxiangkuang";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.avatarImage_i = function () {
		var t = new eui.Image();
		this.avatarImage = t;
		t.height = 116;
		t.source = "win_json.again";
		t.width = 116;
		return t;
	};
	return AvatarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/CloseButtonSkin.exml'] = window.CloseButtonSkin = (function (_super) {
	__extends(CloseButtonSkin, _super);
	function CloseButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.height = 75;
		this.width = 75;
		this.elementsContent = [this.iconDisplay_i()];
	}
	var _proto = CloseButtonSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.source = "ui_json.ca";
		return t;
	};
	return CloseButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/ImageButtonSkin.exml'] = window.ImageButtonSkin = (function (_super) {
	__extends(ImageButtonSkin, _super);
	function ImageButtonSkin() {
		_super.call(this);
		this.skinParts = ["bgDisplay","imageDisplay"];
		
		this.elementsContent = [this.bgDisplay_i(),this.imageDisplay_i()];
	}
	var _proto = ImageButtonSkin.prototype;

	_proto.bgDisplay_i = function () {
		var t = new eui.Image();
		this.bgDisplay = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(43,19,39,11);
		t.source = "ui_json.an4";
		t.percentWidth = 100;
		return t;
	};
	_proto.imageDisplay_i = function () {
		var t = new eui.Image();
		this.imageDisplay = t;
		t.horizontalCenter = 0;
		t.source = "ui_json.tijiao";
		t.verticalCenter = -0.5;
		return t;
	};
	return ImageButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/LoadProgressBar.exml'] = window.LoadProgressBar = (function (_super) {
	__extends(LoadProgressBar, _super);
	function LoadProgressBar() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = LoadProgressBar.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "ui_json.loadProgressBg";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(3,77,20,464);
		t.source = "ui_json.loadProgress";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return LoadProgressBar;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/ToggleButtonSkin.exml'] = window.ToggleButtonSkin = (function (_super) {
	__extends(ToggleButtonSkin, _super);
	function ToggleButtonSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay"];
		
		this.elementsContent = [this.iconDisplay_i()];
	}
	var _proto = ToggleButtonSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "ui_json.kaishi";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/LoginRewardSkin.exml'] = window.LoginRewardSkin = (function (_super) {
	__extends(LoginRewardSkin, _super);
	function LoginRewardSkin() {
		_super.call(this);
		this.skinParts = ["open_tip","image","btn_ok","group"];
		
		this.height = 1100;
		this.width = 720;
		this.open_tip_i();
		this.elementsContent = [this.group_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [320],[],this._Object1,"x");
		eui.Binding.$bindProperties(this, [572],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"y");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [58],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [119],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"y");
	}
	var _proto = LoginRewardSkin.prototype;

	_proto.open_tip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.open_tip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 300;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this.image_i(),this.btn_ok_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 530;
		t.horizontalCenter = -3;
		t.source = "ui_json.loginRewardGold";
		t.verticalCenter = -61.5;
		t.width = 720;
		return t;
	};
	_proto.btn_ok_i = function () {
		var t = new game.IconButton();
		this.btn_ok = t;
		t.horizontalCenter = -2.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = -55.5;
		return t;
	};
	return LoginRewardSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/LoginSceneSkin.exml'] = window.LoginSceneSkin = (function (_super) {
	__extends(LoginSceneSkin, _super);
	function LoginSceneSkin() {
		_super.call(this);
		this.skinParts = ["titleImage","btn_register","loginButton","nameLabel","username","passwordLabel","passwd","registGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this.registGroup_i()];
	}
	var _proto = LoginSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "login_json.loginbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.registGroup_i = function () {
		var t = new eui.Group();
		this.registGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this.titleImage_i(),this.btn_register_i(),this.loginButton_i(),this.username_i(),this.passwd_i()];
		return t;
	};
	_proto.titleImage_i = function () {
		var t = new eui.Image();
		this.titleImage = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.tantanle";
		t.touchEnabled = false;
		t.y = 54;
		return t;
	};
	_proto.btn_register_i = function () {
		var t = new eui.Label();
		this.btn_register = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "注册账号>>";
		t.textColor = 0x8C5EDA;
		t.touchEnabled = true;
		t.verticalCenter = 485;
		return t;
	};
	_proto.loginButton_i = function () {
		var t = new game.IconButton();
		this.loginButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 263.5;
		return t;
	};
	_proto.username_i = function () {
		var t = new eui.Group();
		this.username = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 428.97;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.nameLabel_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -211;
		t.source = "login_json.phoneicon";
		t.verticalCenter = 0;
		return t;
	};
	_proto.nameLabel_i = function () {
		var t = new eui.EditableText();
		this.nameLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入手机号";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 360.61;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.passwd_i = function () {
		var t = new eui.Group();
		this.passwd = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 535.03;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.passwordLabel_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_json.passwdicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.passwordLabel_i = function () {
		var t = new eui.EditableText();
		this.passwordLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入密码";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 356.06;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	return LoginSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/login/RegisterPanelSkin.exml'] = window.RegisterPanelSkin = (function (_super) {
	__extends(RegisterPanelSkin, _super);
	function RegisterPanelSkin() {
		_super.call(this);
		this.skinParts = ["titleImage","btn_login","registerButton","phoneLabel","phone","btn_authCode","yzmbtnLabel","authCodeLabel","authCode","nameLabel","username","passwordLabel","password","passwordokLabel","passwordok","comeonLabel","comeon","registGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this.registGroup_i()];
	}
	var _proto = RegisterPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "login_json.loginbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.registGroup_i = function () {
		var t = new eui.Group();
		this.registGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.width = 720;
		t.y = 0;
		t.elementsContent = [this.titleImage_i(),this.btn_login_i(),this.registerButton_i(),this.phone_i(),this.authCode_i(),this.username_i(),this.password_i(),this.passwordok_i(),this.comeon_i()];
		return t;
	};
	_proto.titleImage_i = function () {
		var t = new eui.Image();
		this.titleImage = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.tantanle";
		t.touchEnabled = false;
		t.y = 54;
		return t;
	};
	_proto.btn_login_i = function () {
		var t = new eui.Label();
		this.btn_login = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "<<登录账号";
		t.textColor = 0x8c5eda;
		t.touchEnabled = true;
		t.verticalCenter = 501;
		return t;
	};
	_proto.registerButton_i = function () {
		var t = new game.IconButton();
		this.registerButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 422.5;
		return t;
	};
	_proto.phone_i = function () {
		var t = new eui.Group();
		this.phone = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = -1.5;
		t.width = 517;
		t.y = 315.32;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.phoneLabel_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login_json.phoneicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.phoneLabel_i = function () {
		var t = new eui.EditableText();
		this.phoneLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入手机号";
		t.promptColor = 0x9a9a9a;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 376;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.authCode_i = function () {
		var t = new eui.Group();
		this.authCode = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 415.32;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this.btn_authCode_i(),this.yzmbtnLabel_i(),this.authCodeLabel_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login_json.yzmicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.btn_authCode_i = function () {
		var t = new game.IconButton();
		this.btn_authCode = t;
		t.horizontalCenter = 150;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 0;
		return t;
	};
	_proto.yzmbtnLabel_i = function () {
		var t = new eui.Label();
		this.yzmbtnLabel = t;
		t.bold = true;
		t.horizontalCenter = 149;
		t.size = 24;
		t.text = "获取验证码";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalCenter = -1.5;
		return t;
	};
	_proto.authCodeLabel_i = function () {
		var t = new eui.EditableText();
		this.authCodeLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入验证码";
		t.promptColor = 0x9a9a9a;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 168;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.username_i = function () {
		var t = new eui.Group();
		this.username = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 515.32;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this.nameLabel_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login_json.nicknameImg";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.nameLabel_i = function () {
		var t = new eui.EditableText();
		this.nameLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入昵称";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 376;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.password_i = function () {
		var t = new eui.Group();
		this.password = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 615.32;
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this.passwordLabel_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "login_json.passwdicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.passwordLabel_i = function () {
		var t = new eui.EditableText();
		this.passwordLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入密码";
		t.promptColor = 0x9a9a9a;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 368;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.passwordok_i = function () {
		var t = new eui.Group();
		this.passwordok = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 715.32;
		t.elementsContent = [this._Image10_i(),this._Image11_i(),this.passwordokLabel_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "login_json.passwdicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.passwordokLabel_i = function () {
		var t = new eui.EditableText();
		this.passwordokLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请确认密码";
		t.promptColor = 0x9a9a9a;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 366;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.comeon_i = function () {
		var t = new eui.Group();
		this.comeon = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.width = 517;
		t.y = 815.32;
		t.elementsContent = [this._Image12_i(),this._Image13_i(),this.comeonLabel_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.source = "login_json.yqmicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.comeonLabel_i = function () {
		var t = new eui.EditableText();
		this.comeonLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入邀请码 没有可不填写";
		t.promptColor = 0x9a9a9a;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 366;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	return RegisterPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/DeliveryItemSkin.exml'] = window.DeliveryItemSkin = (function (_super) {
	__extends(DeliveryItemSkin, _super);
	function DeliveryItemSkin() {
		_super.call(this);
		this.skinParts = ["itemImg","itemMask","shoplight","itemName","itemInfo","itemNum"];
		
		this.height = 160;
		this.width = 646;
		this.elementsContent = [this._Image1_i(),this.itemImg_i(),this.itemMask_i(),this.shoplight_i(),this.itemName_i(),this.itemInfo_i(),this._Label1_i(),this.itemNum_i()];
	}
	var _proto = DeliveryItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "lucky_json.bagshopbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.itemImg_i = function () {
		var t = new eui.Image();
		this.itemImg = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.height = 126;
		t.horizontalCenter = -240;
		t.mask = this.itemMask;
		t.source = "item_json.6003";
		t.verticalCenter = 4;
		t.width = 126;
		return t;
	};
	_proto.itemMask_i = function () {
		var t = new eui.Image();
		this.itemMask = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 63;
		t.horizontalCenter = -240;
		t.source = "lucky_json.shopbg";
		t.verticalCenter = 4;
		if(this.itemImg)
		{
			this.itemImg.mask = this.itemMask;
		}
		return t;
	};
	_proto.shoplight_i = function () {
		var t = new eui.Image();
		this.shoplight = t;
		t.anchorOffsetX = 82;
		t.anchorOffsetY = 82;
		t.horizontalCenter = -240;
		t.source = "lucky_json.shoplight";
		t.verticalCenter = 4;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.left = 204;
		t.size = 26;
		t.strokeColor = 0xdcadff;
		t.text = "道具名";
		t.textAlign = "left";
		t.textColor = 0x8c5eda;
		t.verticalCenter = -43;
		return t;
	};
	_proto.itemInfo_i = function () {
		var t = new eui.Label();
		this.itemInfo = t;
		t.left = 204;
		t.size = 22;
		t.text = "下单时间: 2018/7/12";
		t.textAlign = "left";
		t.textColor = 0x747982;
		t.verticalCenter = 56;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.horizontalCenter = -83;
		t.size = 22;
		t.text = "数量：";
		t.textColor = 0x747982;
		t.touchEnabled = false;
		t.verticalCenter = -2;
		return t;
	};
	_proto.itemNum_i = function () {
		var t = new eui.Label();
		this.itemNum = t;
		t.anchorOffsetX = 0;
		t.left = 277;
		t.size = 22;
		t.text = "50";
		t.textColor = 0x747982;
		t.touchEnabled = false;
		t.verticalCenter = -1;
		return t;
	};
	return DeliveryItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/DeliveryPanelSkin.exml'] = window.DeliveryPanelSkin = (function (_super) {
	__extends(DeliveryPanelSkin, _super);
	function DeliveryPanelSkin() {
		_super.call(this);
		this.skinParts = ["deliveryTitle","bagButton","closeButton","deliveryList","deliveryScr","selOkImg","selNoImg","selOkTxt","selNoTxt","luckyGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.luckyGroup_i()];
	}
	var _proto = DeliveryPanelSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto.luckyGroup_i = function () {
		var t = new eui.Group();
		this.luckyGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.deliveryTitle_i(),this.bagButton_i(),this.closeButton_i(),this.deliveryScr_i(),this._Image3_i(),this.selOkImg_i(),this.selNoImg_i(),this.selOkTxt_i(),this.selNoTxt_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.deliveryTitle";
		t.x = 222;
		t.y = -10;
		return t;
	};
	_proto.deliveryTitle_i = function () {
		var t = new eui.Image();
		this.deliveryTitle = t;
		t.horizontalCenter = 0;
		t.source = "ui_json.deliveryNoTxt";
		t.verticalCenter = -511.5;
		return t;
	};
	_proto.bagButton_i = function () {
		var t = new game.IconButton();
		this.bagButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 454.5;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 638;
		t.y = 23;
		return t;
	};
	_proto.deliveryScr_i = function () {
		var t = new eui.Scroller();
		this.deliveryScr = t;
		t.anchorOffsetY = 0;
		t.height = 689.21;
		t.horizontalCenter = -1;
		t.verticalCenter = -92.5;
		t.width = 646;
		t.viewport = this.deliveryList_i();
		return t;
	};
	_proto.deliveryList_i = function () {
		var t = new eui.List();
		this.deliveryList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 556;
		t.itemRendererSkinName = BattleBagItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.useVirtualLayout = true;
		t.x = 141;
		t.y = 188;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 6;
		t.verticalGap = 22;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_json.deliverybtnBg";
		t.verticalCenter = 346;
		return t;
	};
	_proto.selOkImg_i = function () {
		var t = new eui.Image();
		this.selOkImg = t;
		t.horizontalCenter = -136.5;
		t.source = "ui_json.deliverySel";
		t.touchEnabled = true;
		t.verticalCenter = 345;
		return t;
	};
	_proto.selNoImg_i = function () {
		var t = new eui.Image();
		this.selNoImg = t;
		t.horizontalCenter = 138.5;
		t.source = "ui_json.deliverySel";
		t.touchEnabled = true;
		t.verticalCenter = 345;
		return t;
	};
	_proto.selOkTxt_i = function () {
		var t = new eui.Label();
		this.selOkTxt = t;
		t.bold = true;
		t.size = 25;
		t.text = "已发货";
		t.touchEnabled = false;
		t.x = 175;
		t.y = 885;
		return t;
	};
	_proto.selNoTxt_i = function () {
		var t = new eui.Label();
		this.selNoTxt = t;
		t.bold = true;
		t.size = 25;
		t.text = "未发货";
		t.touchEnabled = false;
		t.x = 455;
		t.y = 885;
		return t;
	};
	return DeliveryPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/DeliverySettingSkin.exml'] = window.DeliverySettingSkin = (function (_super) {
	__extends(DeliverySettingSkin, _super);
	function DeliverySettingSkin() {
		_super.call(this);
		this.skinParts = ["open_tip","image","btn_close","btn_setting","group","nameLabel","name","phoneLabel","phone","addressLabel","address"];
		
		this.height = 1100;
		this.width = 720;
		this.open_tip_i();
		this.elementsContent = [this.group_i(),this.name_i(),this.phone_i(),this.address_i()];
		
		eui.Binding.$bindProperties(this, ["group"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleX");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"scaleY");
		eui.Binding.$bindProperties(this, [320],[],this._Object1,"x");
		eui.Binding.$bindProperties(this, [572],[],this._Object1,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object2,"y");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleX");
		eui.Binding.$bindProperties(this, [0.95],[],this._Object3,"scaleY");
		eui.Binding.$bindProperties(this, [58],[],this._Object3,"x");
		eui.Binding.$bindProperties(this, [119],[],this._Object3,"y");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleX");
		eui.Binding.$bindProperties(this, [1],[],this._Object4,"scaleY");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"x");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"y");
	}
	var _proto = DeliverySettingSkin.prototype;

	_proto.open_tip_i = function () {
		var t = new egret.tween.TweenGroup();
		this.open_tip = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 300;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 150;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this.image_i(),this.btn_close_i(),this.btn_setting_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 463;
		t.horizontalCenter = 0;
		t.source = "user_json.addressBg";
		t.verticalCenter = 0;
		t.width = 720;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new game.IconButton();
		this.btn_close = t;
		t.horizontalCenter = 310.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = -200.5;
		return t;
	};
	_proto.btn_setting_i = function () {
		var t = new game.IconButton();
		this.btn_setting = t;
		t.horizontalCenter = 0;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 205.5;
		return t;
	};
	_proto.name_i = function () {
		var t = new eui.Group();
		this.name = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.verticalCenter = -132.5;
		t.width = 517;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.nameLabel_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "login_json.nicknameImg";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.nameLabel_i = function () {
		var t = new eui.EditableText();
		this.nameLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "收货人姓名";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 376;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.phone_i = function () {
		var t = new eui.Group();
		this.phone = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0;
		t.verticalCenter = -12.5;
		t.width = 517;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.phoneLabel_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "login_json.phoneicon";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.phoneLabel_i = function () {
		var t = new eui.EditableText();
		this.phoneLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "收货人手机号";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 376;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	_proto.address_i = function () {
		var t = new eui.Group();
		this.address = t;
		t.anchorOffsetX = 0;
		t.height = 75;
		t.horizontalCenter = 0.5;
		t.verticalCenter = 107.5;
		t.width = 517;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this.addressLabel_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "user_json.addressImg";
		t.verticalCenter = 0;
		t.x = 24;
		return t;
	};
	_proto.addressLabel_i = function () {
		var t = new eui.EditableText();
		this.addressLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51.51;
		t.prompt = "请输入收货地址";
		t.promptColor = 0x9A9A9A;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.textAlign = "left";
		t.textColor = 0x595959;
		t.verticalAlign = "middle";
		t.width = 376;
		t.x = 93;
		t.y = 9.75;
		return t;
	};
	return DeliverySettingSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/HistoryMoneyItemSkin.exml'] = window.HistoryMoneyItemSkin = (function (_super) {
	__extends(HistoryMoneyItemSkin, _super);
	function HistoryMoneyItemSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 30;
		this.width = 580;
	}
	var _proto = HistoryMoneyItemSkin.prototype;

	return HistoryMoneyItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/HistoryMoneySkin.exml'] = window.HistoryMoneySkin = (function (_super) {
	__extends(HistoryMoneySkin, _super);
	function HistoryMoneySkin() {
		_super.call(this);
		this.skinParts = ["bagButton","closeButton","moneyTxt","historyList","historyScr","luckyGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.luckyGroup_i()];
	}
	var _proto = HistoryMoneySkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xffffff;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto.luckyGroup_i = function () {
		var t = new eui.Group();
		this.luckyGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this.bagButton_i(),this.closeButton_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.moneyTxt_i(),this._Label1_i(),this._Label2_i(),this.historyScr_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.bagButton_i = function () {
		var t = new game.IconButton();
		this.bagButton = t;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 454.5;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 638;
		t.y = 23;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 472;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(80,71,486,40);
		t.source = "lucky_json.bagshopbg";
		t.verticalCenter = 122;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui_json.historyMoneyTitleBg";
		t.verticalCenter = -314.5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.historyMoneyTitle";
		t.x = 222;
		t.y = -10;
		return t;
	};
	_proto.moneyTxt_i = function () {
		var t = new eui.Label();
		this.moneyTxt = t;
		t.horizontalCenter = 1;
		t.size = 100;
		t.text = "¥123456";
		t.textAlign = "center";
		t.textColor = 0xff9f3b;
		t.verticalCenter = -328;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.text = "累计获得商品价值";
		t.textAlign = "center";
		t.textColor = 0x808080;
		t.verticalCenter = -253;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.text = "历史记录";
		t.textAlign = "center";
		t.textColor = 0x808080;
		t.verticalCenter = -71;
		return t;
	};
	_proto.historyScr_i = function () {
		var t = new eui.Scroller();
		this.historyScr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 353.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 140.5;
		t.width = 594.49;
		t.viewport = this.historyList_i();
		return t;
	};
	_proto.historyList_i = function () {
		var t = new eui.List();
		this.historyList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 556;
		t.itemRendererSkinName = BattleBagItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.useVirtualLayout = true;
		t.x = 141;
		t.y = 188;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 6;
		t.verticalGap = 22;
		return t;
	};
	return HistoryMoneySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/MainSceneSkin.exml'] = window.MainSceneSkin = (function (_super) {
	__extends(MainSceneSkin, _super);
	function MainSceneSkin() {
		_super.call(this);
		this.skinParts = ["titleImage","lightImage","playButton","luckyButton","userButton","rankButton","rankLabel","btn_dress","costLabel"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this.costLabel_i()];
	}
	var _proto = MainSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "login_json.loginbg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this.titleImage_i()];
		return t;
	};
	_proto.titleImage_i = function () {
		var t = new eui.Image();
		this.titleImage = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.tantanle";
		t.touchEnabled = false;
		t.x = 122;
		t.y = 85;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.height = 1100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this.lightImage_i(),this._Image2_i(),this._Image3_i(),this.playButton_i(),this.luckyButton_i(),this.userButton_i(),this._Label1_i(),this._Label2_i(),this._Image4_i(),this.rankButton_i(),this.rankLabel_i(),this.btn_dress_i()];
		return t;
	};
	_proto.lightImage_i = function () {
		var t = new eui.Image();
		this.lightImage = t;
		t.anchorOffsetX = 205;
		t.anchorOffsetY = 204.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.guangquan";
		t.touchEnabled = false;
		t.x = 360;
		t.y = 745.75;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 172;
		t.source = "ui_json.common_luckyBtnBg";
		t.verticalCenter = 188;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -172;
		t.source = "ui_json.common_userBtnBg";
		t.verticalCenter = 188;
		return t;
	};
	_proto.playButton_i = function () {
		var t = new game.IconButton();
		this.playButton = t;
		t.horizontalCenter = 0.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 187.5;
		t.x = 220.00000000000003;
		t.y = 410.00000000000006;
		return t;
	};
	_proto.luckyButton_i = function () {
		var t = new game.IconButton();
		this.luckyButton = t;
		t.horizontalCenter = 256.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 187.5;
		return t;
	};
	_proto.userButton_i = function () {
		var t = new game.IconButton();
		this.userButton = t;
		t.horizontalCenter = -255.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 187.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = -255;
		t.size = 24;
		t.text = "个人信息";
		t.textAlign = "center";
		t.textColor = 0xb453fd;
		t.verticalCenter = 277;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 257;
		t.size = 24;
		t.text = "抽奖";
		t.textAlign = "center";
		t.textColor = 0x31b7f5;
		t.verticalCenter = 277;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -189;
		t.source = "user_json.getMoneyImg";
		t.verticalCenter = 145;
		return t;
	};
	_proto.rankButton_i = function () {
		var t = new game.IconButton();
		this.rankButton = t;
		t.horizontalCenter = 0;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 388;
		t.visible = false;
		t.y = 430.00000000000006;
		return t;
	};
	_proto.rankLabel_i = function () {
		var t = new eui.Label();
		this.rankLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 58;
		t.horizontalCenter = -148;
		t.text = "排行榜>>";
		t.textAlign = "center";
		t.textColor = 0x504D5E;
		t.touchEnabled = true;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 224;
		t.y = 971;
		return t;
	};
	_proto.btn_dress_i = function () {
		var t = new game.IconButton();
		this.btn_dress = t;
		t.height = 20;
		t.skinName = "IconButtonSkin";
		t.width = 20;
		t.x = 351;
		t.y = 974;
		return t;
	};
	_proto.costLabel_i = function () {
		var t = new eui.Label();
		this.costLabel = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "DynoBold";
		t.horizontalCenter = 0;
		t.size = 35;
		t.text = "5";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.visible = false;
		t.width = 227;
		t.y = 134.5;
		return t;
	};
	return MainSceneSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/main/UserPanelSkin.exml'] = window.UserPanelSkin = (function (_super) {
	__extends(UserPanelSkin, _super);
	function UserPanelSkin() {
		_super.call(this);
		this.skinParts = ["closeButton","labelName","labelId","addressButton","inviteFriendButton","img_userhead","img_mask","userGroup","curMoneyTxt","taskGroup1","img_gameTask","img_nogameTask","taskGroup2","img_becomeonTask","img_nobecomeonTask","taskGroup3"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.userGroup_i(),this.taskGroup1_i(),this.taskGroup2_i(),this.taskGroup3_i(),this._Image8_i()];
	}
	var _proto = UserPanelSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.strokeColor = 0xFFFFFF;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto.userGroup_i = function () {
		var t = new eui.Group();
		this.userGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.closeButton_i(),this.labelName_i(),this.labelId_i(),this.addressButton_i(),this.inviteFriendButton_i(),this._Image3_i(),this._Label1_i(),this._Label2_i(),this.img_userhead_i(),this.img_mask_i(),this._Image4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user_json.userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "user_json.userTitle";
		t.y = -9;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new game.IconButton();
		this.closeButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 652.5;
		t.y = 26;
		return t;
	};
	_proto.labelName_i = function () {
		var t = new eui.Label();
		this.labelName = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 36;
		t.strokeColor = 0x8c5eda;
		t.text = "未设置用户名";
		t.textAlign = "center";
		t.textColor = 0x8C5EDA;
		t.y = 283;
		return t;
	};
	_proto.labelId_i = function () {
		var t = new eui.Label();
		this.labelId = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.strokeColor = 0xce8ffe;
		t.text = "ID:123456";
		t.textAlign = "center";
		t.textColor = 0x8C5EDA;
		t.y = 341;
		return t;
	};
	_proto.addressButton_i = function () {
		var t = new game.IconButton();
		this.addressButton = t;
		t.horizontalCenter = -111.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = -116.5;
		return t;
	};
	_proto.inviteFriendButton_i = function () {
		var t = new game.IconButton();
		this.inviteFriendButton = t;
		t.horizontalCenter = 112.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = -116.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "user_json.taskRewardImg";
		t.verticalCenter = 75;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "任  务";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 75;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "成功邀请好友注册后获得1元现金,现金直接转入微信账号。";
		t.textAlign = "center";
		t.textColor = 0xff0000;
		t.verticalCenter = -19;
		return t;
	};
	_proto.img_userhead_i = function () {
		var t = new eui.Image();
		this.img_userhead = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 160;
		t.width = 160;
		t.x = 280.5;
		t.y = 103;
		return t;
	};
	_proto.img_mask_i = function () {
		var t = new eui.Image();
		this.img_mask = t;
		t.horizontalCenter = 0;
		t.source = "user_json.headBg";
		t.verticalCenter = -366.5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "user_json.headBorder";
		t.x = 284;
		t.y = 106;
		return t;
	};
	_proto.taskGroup1_i = function () {
		var t = new eui.Group();
		this.taskGroup1 = t;
		t.anchorOffsetY = 0;
		t.height = 109.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 187.5;
		t.width = 720;
		t.elementsContent = [this._Image5_i(),this._Label3_i(),this._Label4_i(),this._Label5_i(),this.curMoneyTxt_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.left = 58;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "任务：邀请好友成功注册，将获得现金奖励";
		t.textAlign = "left";
		t.textColor = 0x808080;
		t.verticalCenter = -16.545;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "累计获得现金：";
		t.textAlign = "left";
		t.textColor = 0xff0000;
		t.x = 445;
		t.y = 68;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "奖励：立刻获得1元现金";
		t.textAlign = "left";
		t.textColor = 0xff8b26;
		t.verticalCenter = 23.455;
		t.x = 58;
		return t;
	};
	_proto.curMoneyTxt_i = function () {
		var t = new eui.Label();
		this.curMoneyTxt = t;
		t.text = "0元";
		t.textColor = 0xff0000;
		t.x = 603;
		t.y = 64;
		return t;
	};
	_proto.taskGroup2_i = function () {
		var t = new eui.Group();
		this.taskGroup2 = t;
		t.anchorOffsetY = 0;
		t.height = 109.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 297.5;
		t.width = 720;
		t.elementsContent = [this._Image6_i(),this._Label6_i(),this._Label7_i(),this.img_gameTask_i(),this.img_nogameTask_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.left = 58;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "任务：玩游戏得现金，单局游戏内最高金币数达到1万";
		t.textAlign = "left";
		t.textColor = 0x808080;
		t.verticalCenter = -16.545;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "奖励：立刻获得1元现金";
		t.textAlign = "left";
		t.textColor = 0xFF8B26;
		t.verticalCenter = 23.455;
		t.x = 58;
		return t;
	};
	_proto.img_gameTask_i = function () {
		var t = new eui.Image();
		this.img_gameTask = t;
		t.horizontalCenter = 260;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "user_json.userOk";
		t.verticalCenter = 0;
		t.x = 581;
		return t;
	};
	_proto.img_nogameTask_i = function () {
		var t = new eui.Image();
		this.img_nogameTask = t;
		t.horizontalCenter = 260;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.notreachImg";
		t.verticalCenter = -0.045000000000001705;
		t.x = 581;
		t.y = -338;
		return t;
	};
	_proto.taskGroup3_i = function () {
		var t = new eui.Group();
		this.taskGroup3 = t;
		t.anchorOffsetY = 0;
		t.height = 109.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 407.5;
		t.width = 720;
		t.elementsContent = [this._Image7_i(),this._Label8_i(),this._Label9_i(),this.img_becomeonTask_i(),this.img_nobecomeonTask_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky_json.bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.left = 58;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "任务：被邀请的人单局游戏内最高金币数达到1万";
		t.textAlign = "left";
		t.textColor = 0x808080;
		t.verticalCenter = -16.545;
		return t;
	};
	_proto._Label9_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "奖励：立刻获得1元现金";
		t.textAlign = "left";
		t.textColor = 0xFF8B26;
		t.verticalCenter = 23.455;
		t.x = 58;
		return t;
	};
	_proto.img_becomeonTask_i = function () {
		var t = new eui.Image();
		this.img_becomeonTask = t;
		t.horizontalCenter = 260;
		t.source = "user_json.userOk";
		t.verticalCenter = 0;
		return t;
	};
	_proto.img_nobecomeonTask_i = function () {
		var t = new eui.Image();
		this.img_nobecomeonTask = t;
		t.horizontalCenter = 260;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.notreachImg";
		t.verticalCenter = -0.045000000000001705;
		t.x = 581;
		t.y = -448;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 221;
		t.source = "user_json.getMoneyImg";
		t.verticalCenter = -154;
		return t;
	};
	return UserPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/rank/RankItemSkin.exml'] = window.RankItemSkin = (function (_super) {
	__extends(RankItemSkin, _super);
	function RankItemSkin() {
		_super.call(this);
		this.skinParts = ["itemBg","avatar","rankLabel","nameLabel","scoreLabel"];
		
		this.height = 92;
		this.width = 518;
		this.elementsContent = [this.itemBg_i(),this.avatar_i(),this.rankLabel_i(),this.nameLabel_i(),this.scoreLabel_i()];
	}
	var _proto = RankItemSkin.prototype;

	_proto.itemBg_i = function () {
		var t = new eui.Image();
		this.itemBg = t;
		t.height = 92;
		t.horizontalCenter = 0;
		t.source = "win_json.rankitembg";
		t.width = 486;
		t.y = 0;
		return t;
	};
	_proto.avatar_i = function () {
		var t = new game.Avatar();
		this.avatar = t;
		t.anchorOffsetX = 58;
		t.anchorOffsetY = 58;
		t.height = 116;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.skinName = "AvatarSkin";
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 116;
		t.x = 92;
		t.y = 44;
		return t;
	};
	_proto.rankLabel_i = function () {
		var t = new eui.Label();
		this.rankLabel = t;
		t.horizontalCenter = -235;
		t.size = 24;
		t.text = "1";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.nameLabel_i = function () {
		var t = new eui.Label();
		this.nameLabel = t;
		t.size = 24;
		t.text = "玩家名";
		t.textColor = 0x514e5f;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 180;
		t.x = 156.66;
		return t;
	};
	_proto.scoreLabel_i = function () {
		var t = new eui.Label();
		this.scoreLabel = t;
		t.horizontalCenter = 160.5;
		t.size = 24;
		t.text = "123456789";
		t.textAlign = "right";
		t.textColor = 0x5c8bf7;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return RankItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/rank/RankPanelSkin.exml'] = window.RankPanelSkin = (function (_super) {
	__extends(RankPanelSkin, _super);
	function RankPanelSkin() {
		_super.call(this);
		this.skinParts = ["rankbg","backButton","rankNameLabel","friendButton","worldButton","titleGroup","selfWorldGroup","rankList","rankScroller","rankWorld","worldGroup","friendGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.titleGroup_i(),this.worldGroup_i(),this.friendGroup_i()];
	}
	var _proto = RankPanelSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.8;
		t.fillColor = 0xEEEEEE;
		t.percentHeight = 100;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto.titleGroup_i = function () {
		var t = new eui.Group();
		this.titleGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this.rankbg_i(),this.backButton_i(),this._Image1_i(),this.rankNameLabel_i(),this.friendButton_i(),this.worldButton_i(),this._Label1_i()];
		return t;
	};
	_proto.rankbg_i = function () {
		var t = new eui.Image();
		this.rankbg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.rankBg";
		t.y = 129;
		return t;
	};
	_proto.backButton_i = function () {
		var t = new game.IconButton();
		this.backButton = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.skinName = "IconButtonSkin";
		t.y = 951;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.rank_bg";
		t.x = 129;
		t.y = 98.35999999999999;
		return t;
	};
	_proto.rankNameLabel_i = function () {
		var t = new eui.Label();
		this.rankNameLabel = t;
		t.horizontalCenter = -132;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "好友排行榜";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.verticalCenter = -417;
		t.x = 153;
		t.y = 118;
		return t;
	};
	_proto.friendButton_i = function () {
		var t = new game.IconButton();
		this.friendButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.visible = false;
		t.x = 403;
		t.y = 99.02;
		return t;
	};
	_proto.worldButton_i = function () {
		var t = new game.IconButton();
		this.worldButton = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.x = 509.64;
		t.y = 99.02;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "每周一凌晨刷新";
		t.textColor = 0xa25daa;
		t.x = 450.69;
		t.y = 924.03;
		return t;
	};
	_proto.worldGroup_i = function () {
		var t = new eui.Group();
		this.worldGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 720;
		t.elementsContent = [this.selfWorldGroup_i(),this.rankWorld_i()];
		return t;
	};
	_proto.selfWorldGroup_i = function () {
		var t = new eui.Group();
		this.selfWorldGroup = t;
		t.height = 92.8;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 518;
		t.x = 100;
		t.y = 815.88;
		return t;
	};
	_proto.rankWorld_i = function () {
		var t = new eui.Group();
		this.rankWorld = t;
		t.height = 595;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 518;
		t.y = 182.67;
		t.elementsContent = [this.rankScroller_i()];
		return t;
	};
	_proto.rankScroller_i = function () {
		var t = new eui.Scroller();
		this.rankScroller = t;
		t.anchorOffsetY = 0;
		t.height = 595;
		t.horizontalCenter = 0;
		t.width = 518;
		t.y = 0;
		t.viewport = this.rankList_i();
		return t;
	};
	_proto.rankList_i = function () {
		var t = new eui.List();
		this.rankList = t;
		t.useVirtualLayout = true;
		t.y = -17.33;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto.friendGroup_i = function () {
		var t = new eui.Group();
		this.friendGroup = t;
		t.height = 1100;
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 720;
		return t;
	};
	return RankPanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/ChooseIconSkin.exml'] = window.ChooseIconSkin = (function (_super) {
	__extends(ChooseIconSkin, _super);
	function ChooseIconSkin() {
		_super.call(this);
		this.skinParts = ["bg","chose","icon"];
		
		this.height = 86;
		this.width = 104;
		this.elementsContent = [this.bg_i(),this.chose_i(),this.icon_i()];
	}
	var _proto = ChooseIconSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.chose_i = function () {
		var t = new eui.Image();
		this.chose = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "dress_01_json.dress_01_24";
		t.top = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.height = 55;
		t.horizontalCenter = 0.5;
		t.source = "dress_01_json.dress_01_01";
		t.verticalCenter = -6.5;
		t.width = 55;
		return t;
	};
	return ChooseIconSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/CoinsSkin.exml'] = window.CoinsSkin = (function (_super) {
	__extends(CoinsSkin, _super);
	function CoinsSkin() {
		_super.call(this);
		this.skinParts = ["txt_num","img_cointype"];
		
		this.height = 59;
		this.width = 184;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.txt_num_i(),this.img_cointype_i()];
	}
	var _proto = CoinsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 59;
		t.source = "dress_01_json.dress_01_30";
		t.width = 184;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "dress_01_json.dress_01_32";
		t.x = 0;
		t.y = 0.5;
		return t;
	};
	_proto.txt_num_i = function () {
		var t = new eui.Label();
		this.txt_num = t;
		t.text = "0000000";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.x = 58.25;
		t.y = 14.5;
		return t;
	};
	_proto.img_cointype_i = function () {
		var t = new eui.Image();
		this.img_cointype = t;
		t.source = "dress_01_json.dress_gold";
		t.x = 1.4;
		t.y = 3.3;
		return t;
	};
	return CoinsSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/EquipInfoSkin.exml'] = window.EquipInfoSkin = (function (_super) {
	__extends(EquipInfoSkin, _super);
	function EquipInfoSkin() {
		_super.call(this);
		this.skinParts = ["img_star1","img_star2","img_star3","img_star4","img_star5","stars","txt_name","totalAddition"];
		
		this.height = 280;
		this.width = 220;
		this.elementsContent = [this._Image1_i(),this.stars_i(),this.txt_name_i(),this._Label1_i(),this.totalAddition_i()];
	}
	var _proto = EquipInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.8;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.fillMode = "scale";
		t.left = 0;
		t.right = -1;
		t.source = "dress_01_json.dress_01_35";
		t.top = 0;
		return t;
	};
	_proto.stars_i = function () {
		var t = new eui.Group();
		this.stars = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26;
		t.visible = false;
		t.width = 151;
		t.x = 47;
		t.y = 15;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.img_star1_i(),this.img_star2_i(),this.img_star3_i(),this.img_star4_i(),this.img_star5_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.img_star1_i = function () {
		var t = new eui.Image();
		this.img_star1 = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 20;
		t.x = 61;
		t.y = 17;
		return t;
	};
	_proto.img_star2_i = function () {
		var t = new eui.Image();
		this.img_star2 = t;
		t.height = 20;
		t.visible = false;
		t.width = 20;
		t.x = 111;
		t.y = 18;
		return t;
	};
	_proto.img_star3_i = function () {
		var t = new eui.Image();
		this.img_star3 = t;
		t.height = 20;
		t.visible = false;
		t.width = 20;
		t.x = 147;
		t.y = 18;
		return t;
	};
	_proto.img_star4_i = function () {
		var t = new eui.Image();
		this.img_star4 = t;
		t.height = 20;
		t.visible = false;
		t.width = 20;
		t.x = 19;
		t.y = 21;
		return t;
	};
	_proto.img_star5_i = function () {
		var t = new eui.Image();
		this.img_star5 = t;
		t.height = 20;
		t.visible = false;
		t.width = 20;
		t.x = 122;
		t.y = 3;
		return t;
	};
	_proto.txt_name_i = function () {
		var t = new eui.Label();
		this.txt_name = t;
		t.bold = true;
		t.horizontalCenter = 2;
		t.text = "翡翠青衫";
		t.textColor = 0x9e7cd8;
		t.y = 19;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "总加成";
		t.visible = false;
		t.y = 42;
		return t;
	};
	_proto.totalAddition_i = function () {
		var t = new eui.Label();
		this.totalAddition = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Arial";
		t.height = 199;
		t.size = 25;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "top";
		t.width = 217;
		t.x = 0;
		t.y = 97;
		return t;
	};
	return EquipInfoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/ItemPriceSkin.exml'] = window.ItemPriceSkin = (function (_super) {
	__extends(ItemPriceSkin, _super);
	function ItemPriceSkin() {
		_super.call(this);
		this.skinParts = ["img_checkedbg","img_equip","img_infomask","txt_desc1","txt_desc2","grp_mask","img_checked","txt_obtained","img_price","txt_price","grp_price","img_mask"];
		
		this.height = 189;
		this.width = 151;
		this.elementsContent = [this._Image1_i(),this.img_checkedbg_i(),this.img_equip_i(),this.grp_mask_i(),this.img_checked_i(),this.txt_obtained_i(),this.grp_price_i(),this.img_mask_i()];
	}
	var _proto = ItemPriceSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "dress_01_json.dress_01_31";
		t.top = 0;
		return t;
	};
	_proto.img_checkedbg_i = function () {
		var t = new eui.Image();
		this.img_checkedbg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "dress_01_json.dress_01_23";
		t.top = 0;
		return t;
	};
	_proto.img_equip_i = function () {
		var t = new eui.Image();
		this.img_equip = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 50;
		t.height = 100;
		t.horizontalCenter = -0.5;
		t.source = "dress_01_json.dress_01_17";
		t.verticalCenter = -15.5;
		t.width = 100;
		return t;
	};
	_proto.grp_mask_i = function () {
		var t = new eui.Group();
		this.grp_mask = t;
		t.height = 140;
		t.width = 140;
		t.x = 5.2;
		t.y = 7.8;
		t.elementsContent = [this.img_infomask_i(),this.txt_desc1_i(),this.txt_desc2_i()];
		return t;
	};
	_proto.img_infomask_i = function () {
		var t = new eui.Image();
		this.img_infomask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 137.8;
		t.scale9Grid = new egret.Rectangle(16,17,100,103);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dress_01_json.dress_01_37";
		t.width = 130.4;
		t.x = 4.2;
		t.y = 1.5999999999999996;
		return t;
	};
	_proto.txt_desc1_i = function () {
		var t = new eui.Label();
		this.txt_desc1 = t;
		t.size = 18;
		t.stroke = 2;
		t.strokeColor = 0x617abc;
		t.text = "效果描述";
		t.textColor = 0xffffff;
		t.x = 35;
		t.y = 35;
		return t;
	};
	_proto.txt_desc2_i = function () {
		var t = new eui.Label();
		this.txt_desc2 = t;
		t.stroke = 2;
		t.strokeColor = 0x617abc;
		t.text = "效果数值";
		t.textColor = 0xfcf505;
		t.x = 11;
		t.y = 79;
		return t;
	};
	_proto.img_checked_i = function () {
		var t = new eui.Image();
		this.img_checked = t;
		t.source = "dress_01_json.dress_01_22";
		t.x = 83;
		t.y = -3;
		return t;
	};
	_proto.txt_obtained_i = function () {
		var t = new eui.Label();
		this.txt_obtained = t;
		t.bold = true;
		t.size = 26;
		t.stroke = 2;
		t.strokeColor = 0x7085eb;
		t.text = "已获得";
		t.x = 33;
		t.y = 152;
		return t;
	};
	_proto.grp_price_i = function () {
		var t = new eui.Group();
		this.grp_price = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33.2;
		t.horizontalCenter = 0;
		t.verticalCenter = 72;
		t.width = 146.53;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.img_price_i(),this.txt_price_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.img_price_i = function () {
		var t = new eui.Image();
		this.img_price = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 58;
		t.horizontalCenter = -25.599999999999994;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "dress_01_json.dress_01_19";
		t.verticalCenter = -4.100000000000001;
		t.width = 58;
		return t;
	};
	_proto.txt_price_i = function () {
		var t = new eui.Label();
		this.txt_price = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.left = 60;
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0x7085eb;
		t.text = "10000";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.verticalCenter = -4.600000000000001;
		return t;
	};
	_proto.img_mask_i = function () {
		var t = new eui.Image();
		this.img_mask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = true;
		return t;
	};
	return ItemPriceSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/RoleDressSkin.exml'] = window.RoleDressSkin = (function (_super) {
	__extends(RoleDressSkin, _super);
	var RoleDressSkin$Skin2 = 	(function (_super) {
		__extends(RoleDressSkin$Skin2, _super);
		function RoleDressSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoleDressSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "cube_json.1_2";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RoleDressSkin$Skin2;
	})(eui.Skin);

	var RoleDressSkin$Skin3 = 	(function (_super) {
		__extends(RoleDressSkin$Skin3, _super);
		function RoleDressSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RoleDressSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "cube_json.1_4";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RoleDressSkin$Skin3;
	})(eui.Skin);

	function RoleDressSkin() {
		_super.call(this);
		this.skinParts = ["img_girlbg","img_boybg","dress_info","grp_dressinfo","btn_cart","grp_role","icon_boy","icon_girl","img_iconmask","grp_misc","btn_test","btn_test2","roleGroup","coin_money","coin_gold","grp_coins","btn_close","topGroup","ls_items","sr_item","listGroup","img_moreR","img_moreL","part_back","part_head","part_body","part_leg","part_foot","part_waist","part_hand","btnGroup","bmGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this.img_girlbg_i(),this.img_boybg_i(),this.roleGroup_i(),this.topGroup_i(),this.bmGroup_i()];
	}
	var _proto = RoleDressSkin.prototype;

	_proto.img_girlbg_i = function () {
		var t = new eui.Image();
		this.img_girlbg = t;
		t.anchorOffsetY = 0;
		t.height = 1559;
		t.horizontalCenter = 0;
		t.source = "grilbg_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 720;
		return t;
	};
	_proto.img_boybg_i = function () {
		var t = new eui.Image();
		this.img_boybg = t;
		t.anchorOffsetY = 0;
		t.height = 1559;
		t.horizontalCenter = 0;
		t.source = "boybg_png";
		t.verticalCenter = 0;
		t.width = 720;
		return t;
	};
	_proto.roleGroup_i = function () {
		var t = new eui.Group();
		this.roleGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 53;
		t.horizontalCenter = 0.5;
		t.top = 0;
		t.width = 721.21;
		t.elementsContent = [this.grp_dressinfo_i(),this.btn_cart_i(),this.grp_role_i(),this.grp_misc_i(),this.btn_test_i(),this.btn_test2_i()];
		return t;
	};
	_proto.grp_dressinfo_i = function () {
		var t = new eui.Group();
		this.grp_dressinfo = t;
		t.height = 280;
		t.horizontalCenter = 247.39499999999998;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = -20.5;
		t.width = 220;
		t.elementsContent = [this.dress_info_i()];
		return t;
	};
	_proto.dress_info_i = function () {
		var t = new game.EquipInfo();
		this.dress_info = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 280;
		t.skinName = "EquipInfoSkin";
		t.width = 220;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_cart_i = function () {
		var t = new game.IconButton();
		this.btn_cart = t;
		t.bottom = 20;
		t.height = 69;
		t.horizontalCenter = 262.895;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.width = 183;
		return t;
	};
	_proto.grp_role_i = function () {
		var t = new eui.Group();
		this.grp_role = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 75;
		t.height = 278;
		t.horizontalCenter = -3.105000000000018;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 311;
		return t;
	};
	_proto.grp_misc_i = function () {
		var t = new eui.Group();
		this.grp_misc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 20;
		t.height = 69;
		t.horizontalCenter = -262.105;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 131;
		t.elementsContent = [this._Image1_i(),this.icon_boy_i(),this.icon_girl_i(),this.img_iconmask_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 69;
		t.source = "dress_01_json.dress_01_26";
		t.width = 131;
		t.x = -4;
		t.y = 3;
		return t;
	};
	_proto.icon_boy_i = function () {
		var t = new eui.Image();
		this.icon_boy = t;
		t.source = "dress_01_json.dress_01_15";
		t.x = 64;
		t.y = 9;
		return t;
	};
	_proto.icon_girl_i = function () {
		var t = new eui.Image();
		this.icon_girl = t;
		t.source = "dress_01_json.dress_01_20";
		t.x = 0.5;
		t.y = 9;
		return t;
	};
	_proto.img_iconmask_i = function () {
		var t = new eui.Image();
		this.img_iconmask = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "shopItemButtonBg_png";
		t.top = 0;
		t.touchEnabled = true;
		return t;
	};
	_proto.btn_test_i = function () {
		var t = new eui.Button();
		this.btn_test = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.label = "换";
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 130;
		t.x = 30;
		t.y = 243;
		t.skinName = RoleDressSkin$Skin2;
		return t;
	};
	_proto.btn_test2_i = function () {
		var t = new eui.Button();
		this.btn_test2 = t;
		t.height = 60;
		t.label = "重设";
		t.scaleX = 1;
		t.scaleY = 1;
		t.visible = false;
		t.width = 130;
		t.x = 30;
		t.y = 320;
		t.skinName = RoleDressSkin$Skin3;
		return t;
	};
	_proto.topGroup_i = function () {
		var t = new eui.Group();
		this.topGroup = t;
		t.height = 100;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 720;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.grp_coins_i(),this.btn_close_i()];
		return t;
	};
	_proto.grp_coins_i = function () {
		var t = new eui.Group();
		this.grp_coins = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 58;
		t.horizontalCenter = 53.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 593;
		t.x = 80;
		t.y = 11;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.coin_money_i(),this.coin_gold_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 30;
		return t;
	};
	_proto.coin_money_i = function () {
		var t = new game.Coins();
		this.coin_money = t;
		t.height = 55;
		t.skinName = "CoinsSkin";
		t.width = 195;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.coin_gold_i = function () {
		var t = new game.Coins();
		this.coin_gold = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 55;
		t.skinName = "CoinsSkin";
		t.width = 195;
		t.x = 237;
		t.y = -14.5;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new game.IconButton();
		this.btn_close = t;
		t.height = 20;
		t.horizontalCenter = -324;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.width = 20;
		t.x = 28;
		t.y = 28.5;
		return t;
	};
	_proto.bmGroup_i = function () {
		var t = new eui.Group();
		this.bmGroup = t;
		t.bottom = 0;
		t.percentHeight = 47;
		t.horizontalCenter = 0;
		t.width = 720;
		t.elementsContent = [this._Image2_i(),this.listGroup_i(),this.btnGroup_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.percentHeight = 90;
		t.horizontalCenter = 0;
		t.source = "dress_01_json.taboard-bg2";
		return t;
	};
	_proto.listGroup_i = function () {
		var t = new eui.Group();
		this.listGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.percentHeight = 100;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.elementsContent = [this.sr_item_i()];
		return t;
	};
	_proto.sr_item_i = function () {
		var t = new eui.Scroller();
		this.sr_item = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.percentHeight = 85;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 720;
		t.viewport = this.ls_items_i();
		return t;
	};
	_proto.ls_items_i = function () {
		var t = new eui.List();
		this.ls_items = t;
		t.anchorOffsetY = 0;
		t.height = 356;
		t.itemRendererSkinName = ItemPriceSkin;
		t.x = 0;
		t.y = -32;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 18;
		t.paddingBottom = 0;
		t.paddingLeft = 30;
		t.paddingRight = 30;
		t.paddingTop = 10;
		t.verticalGap = 22;
		return t;
	};
	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 15;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.width = 718.18;
		t.elementsContent = [this._Image3_i(),this.img_moreR_i(),this.img_moreL_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "dress_01_json.taboard-bg1";
		t.verticalCenter = 0;
		t.width = 721;
		return t;
	};
	_proto.img_moreR_i = function () {
		var t = new eui.Image();
		this.img_moreR = t;
		t.horizontalCenter = 343.41;
		t.source = "dress_01_json.dress_01_33";
		t.verticalCenter = 0;
		return t;
	};
	_proto.img_moreL_i = function () {
		var t = new eui.Image();
		this.img_moreL = t;
		t.anchorOffsetX = 24;
		t.anchorOffsetY = 39;
		t.horizontalCenter = -345.59;
		t.rotation = 180;
		t.source = "dress_01_json.dress_01_33";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 94.24;
		t.horizontalCenter = -12.089999999999975;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 4.5;
		t.width = 650.18;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.width = 709.18;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.part_back_i(),this.part_head_i(),this.part_body_i(),this.part_leg_i(),this.part_foot_i(),this.part_waist_i(),this.part_hand_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		t.horizontalAlign = "left";
		t.paddingLeft = 10;
		t.paddingRight = 10;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.part_back_i = function () {
		var t = new game.ChooseIcon();
		this.part_back = t;
		t.enabled = true;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.width = 104;
		t.x = 43;
		t.y = 31;
		return t;
	};
	_proto.part_head_i = function () {
		var t = new game.ChooseIcon();
		this.part_head = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.width = 104;
		t.x = 68;
		t.y = 6;
		return t;
	};
	_proto.part_body_i = function () {
		var t = new game.ChooseIcon();
		this.part_body = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.width = 104;
		t.x = 115;
		t.y = 6;
		return t;
	};
	_proto.part_leg_i = function () {
		var t = new game.ChooseIcon();
		this.part_leg = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.width = 104;
		t.x = 201;
		t.y = 19;
		return t;
	};
	_proto.part_foot_i = function () {
		var t = new game.ChooseIcon();
		this.part_foot = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.width = 104;
		t.x = 245;
		t.y = 21;
		return t;
	};
	_proto.part_waist_i = function () {
		var t = new game.ChooseIcon();
		this.part_waist = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.visible = false;
		t.width = 104;
		t.x = 279;
		t.y = 24;
		return t;
	};
	_proto.part_hand_i = function () {
		var t = new game.ChooseIcon();
		this.part_hand = t;
		t.height = 86;
		t.skinName = "ChooseIconSkin";
		t.touchEnabled = true;
		t.visible = false;
		t.width = 104;
		t.x = 334;
		t.y = 18;
		return t;
	};
	return RoleDressSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/ShopItemSkin.exml'] = window.ShopItemSkin = (function (_super) {
	__extends(ShopItemSkin, _super);
	function ShopItemSkin() {
		_super.call(this);
		this.skinParts = ["img_shopItemBg","img_shopItemIcon","img_shopItemSelect","shopItemName","shopItemAddtion","img_price","img_gold","img_diamond","txt_price","grp_price","img_star_0","img_star_1","img_star_2","img_star_3","img_star_4","star","btn_select","btn_select0"];
		
		this.height = 143;
		this.width = 680;
		this.elementsContent = [this.img_shopItemBg_i(),this.img_shopItemIcon_i(),this.img_shopItemSelect_i(),this.shopItemName_i(),this.shopItemAddtion_i(),this.grp_price_i(),this.star_i(),this.btn_select_i(),this.btn_select0_i()];
	}
	var _proto = ShopItemSkin.prototype;

	_proto.img_shopItemBg_i = function () {
		var t = new eui.Image();
		this.img_shopItemBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 135;
		t.source = "dress_01_json.dress_01_27";
		t.width = 653;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_shopItemIcon_i = function () {
		var t = new eui.Image();
		this.img_shopItemIcon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 93;
		t.source = "";
		t.width = 85;
		t.x = 101;
		t.y = 20;
		return t;
	};
	_proto.img_shopItemSelect_i = function () {
		var t = new eui.Image();
		this.img_shopItemSelect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 37;
		t.source = "dress_01_json.dress_01_25";
		t.visible = false;
		t.width = 52;
		t.x = 25;
		t.y = 53;
		return t;
	};
	_proto.shopItemName_i = function () {
		var t = new eui.Label();
		this.shopItemName = t;
		t.bold = true;
		t.text = "宫廷大头";
		t.textAlign = "center";
		t.textColor = 0x727272;
		t.x = 218;
		t.y = 52.2;
		return t;
	};
	_proto.shopItemAddtion_i = function () {
		var t = new eui.Label();
		this.shopItemAddtion = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 129.18;
		t.size = 22;
		t.text = "双倍积分时间增加1秒双倍积分时间增加1秒";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 192.91;
		t.x = 332;
		t.y = 3.24;
		return t;
	};
	_proto.grp_price_i = function () {
		var t = new eui.Group();
		this.grp_price = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 0;
		t.width = 0;
		t.x = 526.8;
		t.y = 53.2;
		t.elementsContent = [this.img_price_i(),this.img_gold_i(),this.img_diamond_i(),this.txt_price_i()];
		return t;
	};
	_proto.img_price_i = function () {
		var t = new eui.Image();
		this.img_price = t;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "dress_01_json.dress_01_30";
		t.visible = false;
		t.x = 4.2;
		t.y = -1;
		return t;
	};
	_proto.img_gold_i = function () {
		var t = new eui.Image();
		this.img_gold = t;
		t.height = 57;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "ui_json.gold";
		t.width = 57;
		t.x = 3.5;
		t.y = -2;
		return t;
	};
	_proto.img_diamond_i = function () {
		var t = new eui.Image();
		this.img_diamond = t;
		t.height = 58;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "dress_01_json.dress_01_19";
		t.width = 58;
		t.x = 4;
		t.y = -1;
		return t;
	};
	_proto.txt_price_i = function () {
		var t = new eui.Label();
		this.txt_price = t;
		t.anchorOffsetX = 0;
		t.size = 24;
		t.text = "10000";
		t.textAlign = "center";
		t.textColor = 0x246ea5;
		t.verticalAlign = "middle";
		t.width = 81;
		t.x = 38.8;
		t.y = 7;
		return t;
	};
	_proto.star_i = function () {
		var t = new eui.Group();
		this.star = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 0;
		t.width = 0;
		t.x = 191;
		t.y = 28;
		t.elementsContent = [this.img_star_0_i(),this.img_star_1_i(),this.img_star_2_i(),this.img_star_3_i(),this.img_star_4_i()];
		return t;
	};
	_proto.img_star_0_i = function () {
		var t = new eui.Image();
		this.img_star_0 = t;
		t.height = 50;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.visible = false;
		t.width = 48;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_star_1_i = function () {
		var t = new eui.Image();
		this.img_star_1 = t;
		t.height = 50;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.visible = false;
		t.width = 48;
		t.x = 26;
		t.y = 0;
		return t;
	};
	_proto.img_star_2_i = function () {
		var t = new eui.Image();
		this.img_star_2 = t;
		t.height = 50;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.visible = false;
		t.width = 48;
		t.x = 52;
		t.y = 0;
		return t;
	};
	_proto.img_star_3_i = function () {
		var t = new eui.Image();
		this.img_star_3 = t;
		t.height = 50;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.visible = false;
		t.width = 48;
		t.x = 78;
		t.y = 0;
		return t;
	};
	_proto.img_star_4_i = function () {
		var t = new eui.Image();
		this.img_star_4 = t;
		t.height = 50;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.visible = false;
		t.width = 48;
		t.x = 104;
		t.y = 0;
		return t;
	};
	_proto.btn_select_i = function () {
		var t = new game.IconButton();
		this.btn_select = t;
		t.enabled = true;
		t.height = 143;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.visible = false;
		t.width = 680;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_select0_i = function () {
		var t = new game.IconButton();
		this.btn_select0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 115.73;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.width = 86.06;
		t.x = 0;
		t.y = 9.13;
		return t;
	};
	return ShopItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/role/ShoppingCartSkin.exml'] = window.ShoppingCartSkin = (function (_super) {
	__extends(ShoppingCartSkin, _super);
	function ShoppingCartSkin() {
		_super.call(this);
		this.skinParts = ["BG","BG2","BG3","listGroup","ShopItemViewScroller","goldNumTxt","userCoin","diamondNumTxt","userDiamond","coinGoldImage","coinDiamondImage","totalCost_gold","totalCost_diamond","btn_close","btn_buy","shopNumBg","shopNum","other"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this.BG_i(),this.BG2_i(),this.BG3_i(),this._Group1_i(),this.other_i()];
	}
	var _proto = ShoppingCartSkin.prototype;

	_proto.BG_i = function () {
		var t = new eui.Image();
		this.BG = t;
		t.bottom = 0;
		t.height = 1127;
		t.left = 0;
		t.right = 0;
		t.source = "dress_01_json.buy-bg";
		t.top = 0;
		t.width = 734;
		return t;
	};
	_proto.BG2_i = function () {
		var t = new eui.Image();
		this.BG2 = t;
		t.anchorOffsetY = 0;
		t.height = 111;
		t.source = "dress_01_json.dress_01_28";
		t.width = 666;
		t.x = 26.5;
		t.y = 1133;
		return t;
	};
	_proto.BG3_i = function () {
		var t = new eui.Image();
		this.BG3 = t;
		t.anchorOffsetY = 0;
		t.height = 130;
		t.source = "dress_01_json.shoppingcart-txt";
		t.width = 302;
		t.x = 209;
		t.y = 22;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 900;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 680;
		t.x = 33;
		t.y = 221;
		t.elementsContent = [this.ShopItemViewScroller_i()];
		return t;
	};
	_proto.ShopItemViewScroller_i = function () {
		var t = new eui.Scroller();
		this.ShopItemViewScroller = t;
		t.anchorOffsetY = 0;
		t.height = 925.49;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 680;
		t.x = 0;
		t.y = 0;
		t.viewport = this.listGroup_i();
		return t;
	};
	_proto.listGroup_i = function () {
		var t = new eui.Group();
		this.listGroup = t;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.other_i = function () {
		var t = new eui.Group();
		this.other = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 0;
		t.width = 0;
		t.y = -2;
		t.elementsContent = [this.userCoin_i(),this.userDiamond_i(),this.coinGoldImage_i(),this.coinDiamondImage_i(),this.totalCost_gold_i(),this.totalCost_diamond_i(),this.btn_close_i(),this._Group2_i()];
		return t;
	};
	_proto.userCoin_i = function () {
		var t = new eui.Group();
		this.userCoin = t;
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 34;
		t.y = 158;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.goldNumTxt_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 59;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dress_01_json.dress_01_30";
		t.width = 184;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = -5;
		t.horizontalCenter = -72.5;
		t.left = 0;
		t.right = 145;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui_json.gold";
		t.top = 0;
		t.verticalCenter = 2.5;
		return t;
	};
	_proto.goldNumTxt_i = function () {
		var t = new eui.Label();
		this.goldNumTxt = t;
		t.fontFamily = "Arial";
		t.size = 27;
		t.text = "0";
		t.textAlign = "center";
		t.width = 115;
		t.x = 52;
		t.y = 15;
		return t;
	};
	_proto.userDiamond_i = function () {
		var t = new eui.Group();
		this.userDiamond = t;
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 252;
		t.y = 158;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.diamondNumTxt_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 59;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dress_01_json.dress_01_30";
		t.width = 184;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = -5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dress_01_json.dress_01_19";
		t.top = 0;
		t.verticalCenter = 2.5;
		t.x = 1;
		return t;
	};
	_proto.diamondNumTxt_i = function () {
		var t = new eui.Label();
		this.diamondNumTxt = t;
		t.fontFamily = "Arial";
		t.size = 27;
		t.text = "0";
		t.textAlign = "center";
		t.width = 115;
		t.x = 52;
		t.y = 15;
		return t;
	};
	_proto.coinGoldImage_i = function () {
		var t = new eui.Image();
		this.coinGoldImage = t;
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "ui_json.gold";
		t.width = 41;
		t.x = 73;
		t.y = 1152;
		return t;
	};
	_proto.coinDiamondImage_i = function () {
		var t = new eui.Image();
		this.coinDiamondImage = t;
		t.anchorOffsetY = 0;
		t.height = 41;
		t.source = "dress_01_json.dress_01_19";
		t.width = 41;
		t.x = 217;
		t.y = 1152;
		return t;
	};
	_proto.totalCost_gold_i = function () {
		var t = new eui.Label();
		this.totalCost_gold = t;
		t.fontFamily = "Arial";
		t.size = 27;
		t.text = "0";
		t.textAlign = "center";
		t.width = 115;
		t.x = 36;
		t.y = 1207;
		return t;
	};
	_proto.totalCost_diamond_i = function () {
		var t = new eui.Label();
		this.totalCost_diamond = t;
		t.fontFamily = "Arial";
		t.size = 27;
		t.text = "0";
		t.textAlign = "center";
		t.width = 115;
		t.x = 180;
		t.y = 1207;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new game.IconButton();
		this.btn_close = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.width = 20;
		t.x = 25;
		t.y = 30;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 0;
		t.x = 560;
		t.y = 959;
		t.elementsContent = [this.btn_buy_i(),this.shopNumBg_i(),this.shopNum_i()];
		return t;
	};
	_proto.btn_buy_i = function () {
		var t = new game.IconButton();
		this.btn_buy = t;
		t.height = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.width = 20;
		t.x = -6;
		t.y = 221;
		return t;
	};
	_proto.shopNumBg_i = function () {
		var t = new eui.Image();
		this.shopNumBg = t;
		t.anchorOffsetY = 0;
		t.height = 51;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "dress_01_json.numBg";
		t.width = 51;
		t.x = 69;
		t.y = 181;
		return t;
	};
	_proto.shopNum_i = function () {
		var t = new eui.Label();
		this.shopNum = t;
		t.fontFamily = "Arial";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 27;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "justify";
		t.width = 38;
		t.x = 75;
		t.y = 191;
		return t;
	};
	return ShoppingCartSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/win/WinRankItemSkin.exml'] = window.WinRankItemSkin = (function (_super) {
	__extends(WinRankItemSkin, _super);
	function WinRankItemSkin() {
		_super.call(this);
		this.skinParts = ["avatar","rankLabel","nameLabel","scoreLabel"];
		
		this.height = 214;
		this.width = 116;
		this.elementsContent = [this.avatar_i(),this.rankLabel_i(),this.nameLabel_i(),this.scoreLabel_i()];
	}
	var _proto = WinRankItemSkin.prototype;

	_proto.avatar_i = function () {
		var t = new game.Avatar();
		this.avatar = t;
		t.skinName = "AvatarSkin";
		t.y = 44;
		return t;
	};
	_proto.rankLabel_i = function () {
		var t = new eui.Label();
		this.rankLabel = t;
		t.horizontalCenter = 0;
		t.size = 36;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x9d5df6;
		t.width = 116;
		return t;
	};
	_proto.nameLabel_i = function () {
		var t = new eui.Label();
		this.nameLabel = t;
		t.anchorOffsetX = 0;
		t.height = 24;
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "玩家名";
		t.textAlign = "center";
		t.textColor = 0x514e5f;
		t.width = 123;
		t.y = 161;
		return t;
	};
	_proto.scoreLabel_i = function () {
		var t = new eui.Label();
		this.scoreLabel = t;
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "10000";
		t.textColor = 0x514E5F;
		t.y = 189.69;
		return t;
	};
	return WinRankItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/win/WinSceneSkin.exml'] = window.WinSceneSkin = (function (_super) {
	__extends(WinSceneSkin, _super);
	function WinSceneSkin() {
		_super.call(this);
		this.skinParts = ["recordLabel","newRecordGroup","scoreLabel","rankGroup","normalGroup","rankLabel","backButton","againButton","shareButton"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = WinSceneSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.8;
		t.fillColor = 0xeeeeee;
		t.percentHeight = 100;
		t.width = 720;
		t.y = -1;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1100;
		t.width = 720;
		t.elementsContent = [this.newRecordGroup_i(),this.normalGroup_i(),this.rankLabel_i()];
		return t;
	};
	_proto.newRecordGroup_i = function () {
		var t = new eui.Group();
		this.newRecordGroup = t;
		t.height = 1100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.recordLabel_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.xinjilu";
		t.x = -13;
		t.y = 164.03;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 48;
		t.text = "新纪录";
		t.textAlign = "center";
		t.textColor = 0xffa530;
		t.width = 247;
		t.y = 312.15;
		return t;
	};
	_proto.recordLabel_i = function () {
		var t = new eui.Label();
		this.recordLabel = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 100;
		t.text = "100000";
		t.textAlign = "center";
		t.textColor = 0x5e93ed;
		t.width = 518.21;
		t.y = 403.05;
		return t;
	};
	_proto.normalGroup_i = function () {
		var t = new eui.Group();
		this.normalGroup = t;
		t.height = 1100;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this._Image2_i(),this._Label2_i(),this.scoreLabel_i(),this.rankGroup_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.jiesuan";
		t.y = 194;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 48;
		t.text = "本次得分";
		t.textAlign = "center";
		t.textColor = 0xFFA530;
		t.width = 247;
		t.y = 245.59;
		return t;
	};
	_proto.scoreLabel_i = function () {
		var t = new eui.Label();
		this.scoreLabel = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 48;
		t.text = "100000";
		t.textAlign = "center";
		t.textColor = 0x5E93ED;
		t.width = 518.21;
		t.y = 303.05;
		return t;
	};
	_proto.rankGroup_i = function () {
		var t = new eui.Group();
		this.rankGroup = t;
		t.height = 214;
		t.horizontalCenter = 0;
		t.y = 386.01;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 40;
		return t;
	};
	_proto.rankLabel_i = function () {
		var t = new eui.Label();
		this.rankLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60.67;
		t.horizontalCenter = -0.5;
		t.text = "查看排行榜";
		t.textAlign = "center";
		t.textColor = 0x514e5f;
		t.verticalAlign = "middle";
		t.width = 449.33;
		t.y = 634;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.height = 1100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this._Image3_i(),this.backButton_i(),this.againButton_i(),this.shareButton_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.anniudi";
		t.touchEnabled = false;
		t.y = 815.88;
		return t;
	};
	_proto.backButton_i = function () {
		var t = new game.IconButton();
		this.backButton = t;
		t.horizontalCenter = -194.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 304.5;
		return t;
	};
	_proto.againButton_i = function () {
		var t = new game.IconButton();
		this.againButton = t;
		t.horizontalCenter = -1.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 304.5;
		return t;
	};
	_proto.shareButton_i = function () {
		var t = new game.IconButton();
		this.shareButton = t;
		t.horizontalCenter = 194.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = 304.5;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60.67;
		t.horizontalCenter = -194.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "回到首页";
		t.textAlign = "center";
		t.textColor = 0x514E5F;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.x = 135;
		t.y = 931.27;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60.67;
		t.horizontalCenter = -1.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "再玩一局";
		t.textAlign = "center";
		t.textColor = 0x514E5F;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.x = 145;
		t.y = 931.27;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60.67;
		t.horizontalCenter = 194.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "发起挑战";
		t.textAlign = "center";
		t.textColor = 0x514E5F;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.x = 155;
		t.y = 931.27;
		return t;
	};
	return WinSceneSkin;
})(eui.Skin);