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
                generateEUI.skins = undefined;generateEUI.paths['resource/eui_skins/component/NormalLabelButtonSkin.exml'] = window.NormalLabelButtonSkin = (function (_super) {
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
		t.source = "cube/1/1";
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
		t.source = "ui/sp";
		t.verticalCenter = 0;
		return t;
	};
	return IconButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CommonDialogSkin.exml'] = window.CommonDialogSkin = (function (_super) {
	__extends(CommonDialogSkin, _super);
	function CommonDialogSkin() {
		_super.call(this);
		this.skinParts = ["open_tip","image","txt_content","btn_goPay","btn_close","group"];
		
		this.height = 1136;
		this.width = 640;
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
		t.height = 1136;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 640;
		t.elementsContent = [this.image_i(),this.txt_content_i(),this.btn_goPay_i(),this.btn_close_i()];
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 295;
		t.horizontalCenter = -3;
		t.source = "ui/dialogMBg";
		t.verticalCenter = -61.5;
		t.width = 526;
		return t;
	};
	_proto.txt_content_i = function () {
		var t = new eui.Label();
		this.txt_content = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 126.33;
		t.horizontalCenter = -8.5;
		t.lineSpacing = 10;
		t.size = 24;
		t.stroke = 2;
		t.strokeColor = 0x206d99;
		t.text = "我是内容";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = -102;
		t.width = 467;
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
		t.verticalCenter = 25;
		t.width = 174;
		t.x = 233;
		t.y = 637;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new game.IconButton();
		this.btn_close = t;
		t.horizontalCenter = 234.5;
		t.skinName = "IconButtonSkin";
		t.verticalCenter = -190.5;
		return t;
	};
	return CommonDialogSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LoadingSkin.exml'] = window.LoadingSkin = (function (_super) {
	__extends(LoadingSkin, _super);
	function LoadingSkin() {
		_super.call(this);
		this.skinParts = ["loadText"];
		
		this.height = 512;
		this.width = 288;
		this.elementsContent = [this._Image1_i(),this.loadText_i()];
	}
	var _proto = LoadingSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "bg_day";
		t.percentWidth = 100;
		return t;
	};
	_proto.loadText_i = function () {
		var t = new eui.Label();
		this.loadText = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "";
		t.top = 150;
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
		t.percentHeight = 100;
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
		t.source = "ui/dialogBg";
		t.width = 526;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "ui/duanxian";
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
		t.source = "ui/win/touxiangkuang";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.avatarImage_i = function () {
		var t = new eui.Image();
		this.avatarImage = t;
		t.height = 116;
		t.source = "ui/win/again";
		t.width = 116;
		return t;
	};
	return AvatarSkin;
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
		t.source = "lucky/bagshopbg";
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
		t.source = "item/6003";
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
		t.source = "lucky/shopbg";
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
		t.source = "lucky/shoplight";
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
		t.source = "lucky/shopnumbg";
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
		t.source = "user/userBg";
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
		t.source = "lucky/bagline";
		t.x = 65;
		t.y = 933.07;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/bagline";
		t.x = 65;
		t.y = 107.62;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/bagtitle";
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
		t.source = "ball/3";
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
		t.source = "cube/blackHole/00000";
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
		t.source = "cube/boom/00002";
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
		t.source = "cube/1/1";
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
		t.source = "cube/5";
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
		t.source = "cube/crack1";
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
		t.source = "buff/3";
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
		t.source = "cube/fire";
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
		t.source = "cube/blueBoom/00000";
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
		t.source = "lucky/luckyItemBg";
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
		t.source = "item/6";
		t.verticalCenter = -9;
		t.width = 80;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "lucky/itemNameBg";
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
		t.source = "user/userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/luckyTitle";
		t.y = -9;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 519;
		t.horizontalCenter = 0;
		t.source = "lucky/luckyIMG";
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
		t.source = "lucky/luckyLight";
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
		t.source = "paddle/bg";
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
		t.source = "paddle/pao";
		t.y = -4;
		return t;
	};
	_proto.ball1_i = function () {
		var t = new eui.Image();
		this.ball1 = t;
		t.source = "paddle/guanchuan";
		t.x = 50.67;
		t.y = 61.83;
		return t;
	};
	_proto.ball2_i = function () {
		var t = new eui.Image();
		this.ball2 = t;
		t.source = "paddle/guanchuan";
		t.x = 50.67;
		t.y = 50.16;
		return t;
	};
	_proto.ball3_i = function () {
		var t = new eui.Image();
		this.ball3 = t;
		t.source = "paddle/guanchuan";
		t.x = 50.67;
		t.y = 38.5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "paddle/paota";
		t.x = 24.5;
		t.y = 76;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "paddle/di";
		t.touchEnabled = false;
		t.x = 42;
		t.y = 93;
		return t;
	};
	_proto.waveMask_i = function () {
		var t = new eui.Image();
		this.waveMask = t;
		t.source = "paddle/di";
		t.touchEnabled = false;
		t.x = 42;
		t.y = 93;
		return t;
	};
	_proto.waveImage_i = function () {
		var t = new eui.Image();
		this.waveImage = t;
		t.source = "paddle/wave/00000";
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
		t.source = "paddle/sp/00000";
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
		t.source = "cube/redBoom/00000";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	return BattlePaddleSkin;
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
		t.source = "ui/gold";
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
		t.source = "ui/badBuffProgressBg";
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
		t.source = "ui/badBuffProgress";
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
		t.source = "ui/boxBuffBg";
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
		t.source = "ui/boxBuff1";
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
		this.skinParts = ["doubleAnim","brickInfoGroup","light1","light2","light3","doubleGroup","topBg","touchGroup","buffGroup","showGroup","moreFireImg","paddleGroup","debugGroup","luckyButton","userButton","rechargeButton","bagButton","mainGroup","penetrationBallImage","penetrationLabel","penetrationGroup","ballButton1","ballButton2","ball1Price","ball2Price","ballGroup","scoreLabel","backButton","hitLabel","noticeLabel","guideGroup","badbuffPanel","badBuffGroup"];
		
		this.height = 1100;
		this.width = 720;
		this.doubleAnim_i();
		this.elementsContent = [this._Image1_i(),this.brickInfoGroup_i(),this.doubleGroup_i(),this.topBg_i(),this.touchGroup_i(),this.mainGroup_i(),this.penetrationGroup_i(),this.ballGroup_i(),this.scoreLabel_i(),this.backButton_i(),this.hitLabel_i(),this.noticeLabel_i(),this.guideGroup_i(),this.badBuffGroup_i()];
		
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
		t.source = "ui/bg";
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
		t.source = "paddle/light";
		t.width = 720;
		t.y = 0;
		return t;
	};
	_proto.light2_i = function () {
		var t = new eui.Image();
		this.light2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle/light";
		t.width = 720;
		t.y = 775;
		return t;
	};
	_proto.light3_i = function () {
		var t = new eui.Image();
		this.light3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "paddle/light";
		t.width = 720;
		t.y = 1550;
		return t;
	};
	_proto.topBg_i = function () {
		var t = new eui.Image();
		this.topBg = t;
		t.scale9Grid = new egret.Rectangle(90,10,540,45);
		t.source = "ui/topBg";
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
	_proto.mainGroup_i = function () {
		var t = new eui.Group();
		this.mainGroup = t;
		t.percentHeight = 100;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 720;
		t.elementsContent = [this._Image2_i(),this.buffGroup_i(),this.showGroup_i(),this.paddleGroup_i(),this.debugGroup_i(),this.luckyButton_i(),this.userButton_i(),this.rechargeButton_i(),this.bagButton_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui/gameBtnBg";
		t.verticalCenter = 445.5;
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
		t.source = "ui/moreFire";
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
	_proto.luckyButton_i = function () {
		var t = new game.IconButton();
		this.luckyButton = t;
		t.horizontalCenter = 181.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 493.5;
		t.x = 547;
		t.y = 1005;
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
		t.verticalCenter = 493.5;
		t.x = 557;
		t.y = 1015;
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
		t.verticalCenter = 493.5;
		t.x = 567;
		t.y = 1025;
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
		t.verticalCenter = 495.5;
		t.x = 577;
		t.y = 1035;
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
		t.source = "ball/3";
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
	_proto.backButton_i = function () {
		var t = new game.IconButton();
		this.backButton = t;
		t.horizontalCenter = -319.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = -507.5;
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
		t.source = "ui/yindao";
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
		t.source = "ui/spBg";
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.scale9Grid = new egret.Rectangle(43,3,64,14);
		t.source = "ui/spBar";
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
		t.source = "cube/timeBoom/00001";
		return t;
	};
	return BattleTimeBoomSkin;
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
		t.source = "ui/ca";
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
		t.source = "ui/an4";
		t.percentWidth = 100;
		return t;
	};
	_proto.imageDisplay_i = function () {
		var t = new eui.Image();
		this.imageDisplay = t;
		t.horizontalCenter = 0;
		t.source = "ui/bag/tijiao";
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
		t.source = "ui/loadProgressBg";
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
		t.source = "ui/loadProgress";
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
		t.source = "ui/kaishi";
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
		t.source = "ui/loginRewardGold";
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
		t.source = "login/loginbg";
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
		t.source = "ui/main/tantanle";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -211;
		t.source = "login/phoneicon";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login/passwdicon";
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
		t.source = "login/loginbg";
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
		t.source = "ui/main/tantanle";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "login/phoneicon";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "login/yzmicon";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "login/nicknameImg";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "login/passwdicon";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "login/passwdicon";
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
		t.source = "login/loginInput";
		t.width = 517;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.source = "login/yqmicon";
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
		t.source = "user/userBg";
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
		t.source = "lucky/bagshopbg";
		t.verticalCenter = 122;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "ui/historyMoneyTitleBg";
		t.verticalCenter = -314.5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui/historyMoneyTitle";
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
		this.skinParts = ["titleImage","lightImage","playButton","luckyButton","userButton","rankButton","rankLabel","costLabel"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this.costLabel_i()];
	}
	var _proto = MainSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.source = "login/loginbg";
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
		t.source = "ui/main/tantanle";
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
		t.elementsContent = [this.lightImage_i(),this._Image2_i(),this._Image3_i(),this.playButton_i(),this.luckyButton_i(),this.userButton_i(),this._Label1_i(),this._Label2_i(),this._Image4_i(),this.rankButton_i(),this.rankLabel_i()];
		return t;
	};
	_proto.lightImage_i = function () {
		var t = new eui.Image();
		this.lightImage = t;
		t.anchorOffsetX = 205;
		t.anchorOffsetY = 204.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ui/main/guangquan";
		t.touchEnabled = false;
		t.x = 360;
		t.y = 745.75;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 172;
		t.source = "ui/main/common_luckyBtnBg";
		t.verticalCenter = 188;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -172;
		t.source = "ui/main/common_userBtnBg";
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
		t.source = "user/getMoneyImg";
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
		this.skinParts = ["closeButton","labelName","labelId","labelInvitationcode","btn_copy","wxButton","img_wxybd","userGroup","img_comeTask","img_nocomeTask","taskGroup1","img_gameTask","img_nogameTask","taskGroup2","img_becomeonTask","img_nobecomeonTask","taskGroup3"];
		
		this.height = 1100;
		this.width = 720;
		this.elementsContent = [this._Rect1_i(),this.userGroup_i(),this.taskGroup1_i(),this.taskGroup2_i(),this.taskGroup3_i()];
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
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.closeButton_i(),this.labelName_i(),this.labelId_i(),this._Label1_i(),this._Label2_i(),this.labelInvitationcode_i(),this.btn_copy_i(),this.wxButton_i(),this.img_wxybd_i(),this._Image4_i(),this._Label3_i(),this._Image5_i(),this._Label4_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user/userBg";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "user/userTitle";
		t.y = -9;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "user/comeonBg";
		t.y = 310;
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
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 36;
		t.strokeColor = 0x8c5eda;
		t.text = "未设置用户名";
		t.textAlign = "center";
		t.textColor = 0x8C5EDA;
		t.y = 179;
		return t;
	};
	_proto.labelId_i = function () {
		var t = new eui.Label();
		this.labelId = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.strokeColor = 0xce8ffe;
		t.text = "ID:123456";
		t.textAlign = "center";
		t.textColor = 0x8C5EDA;
		t.y = 237;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = -103;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "邀请码";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalCenter = -218;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "暂无二维码";
		t.textAlign = "center";
		t.textColor = 0xff0000;
		t.verticalCenter = -88;
		return t;
	};
	_proto.labelInvitationcode_i = function () {
		var t = new eui.Label();
		this.labelInvitationcode = t;
		t.bold = true;
		t.left = 318;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "TJ1234";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.y = 318;
		return t;
	};
	_proto.btn_copy_i = function () {
		var t = new game.IconButton();
		this.btn_copy = t;
		t.right = 206;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = -217.5;
		return t;
	};
	_proto.wxButton_i = function () {
		var t = new game.IconButton();
		this.wxButton = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "IconButtonSkin";
		t.touchEnabled = true;
		t.verticalCenter = 36.5;
		return t;
	};
	_proto.img_wxybd_i = function () {
		var t = new eui.Image();
		this.img_wxybd = t;
		t.horizontalCenter = 0;
		t.source = "login/wxyjbd";
		t.verticalCenter = 43;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 116;
		t.source = "user/getMoneyImg";
		t.verticalCenter = 29;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "绑定微信立刻获得1元现金,现金直接转入微信账号。";
		t.textColor = 0x4d4d4d;
		t.verticalCenter = 91;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "user/taskRewardImg";
		t.verticalCenter = 146;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 28;
		t.text = "任  务";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 146;
		return t;
	};
	_proto.taskGroup1_i = function () {
		var t = new eui.Group();
		this.taskGroup1 = t;
		t.anchorOffsetY = 0;
		t.height = 109.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 244.5;
		t.width = 720;
		t.elementsContent = [this._Image6_i(),this._Label5_i(),this._Label6_i(),this.img_comeTask_i(),this.img_nocomeTask_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.left = 58;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 22;
		t.text = "任务：邀请好友得现金，用邀请码邀请好友注册";
		t.textAlign = "left";
		t.textColor = 0x808080;
		t.verticalCenter = -16.545;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "奖励：注册成功立刻获得1元现金";
		t.textAlign = "left";
		t.textColor = 0xff8b26;
		t.verticalCenter = 23.455;
		t.x = 58;
		return t;
	};
	_proto.img_comeTask_i = function () {
		var t = new eui.Image();
		this.img_comeTask = t;
		t.horizontalCenter = 260;
		t.source = "user/userOk";
		t.verticalCenter = -0.045000000000001705;
		return t;
	};
	_proto.img_nocomeTask_i = function () {
		var t = new eui.Image();
		this.img_nocomeTask = t;
		t.horizontalCenter = 260;
		t.source = "login/notreachImg";
		t.verticalCenter = -0.045000000000001705;
		return t;
	};
	_proto.taskGroup2_i = function () {
		var t = new eui.Group();
		this.taskGroup2 = t;
		t.anchorOffsetY = 0;
		t.height = 109.09;
		t.horizontalCenter = 0;
		t.verticalCenter = 354.5;
		t.width = 720;
		t.elementsContent = [this._Image7_i(),this._Label7_i(),this._Label8_i(),this.img_gameTask_i(),this.img_nogameTask_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label7_i = function () {
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
	_proto._Label8_i = function () {
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
		t.source = "user/userOk";
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
		t.source = "login/notreachImg";
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
		t.verticalCenter = 464.5;
		t.width = 720;
		t.elementsContent = [this._Image8_i(),this._Label9_i(),this._Label10_i(),this.img_becomeonTask_i(),this.img_nobecomeonTask_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "lucky/bagline";
		t.x = 65;
		t.y = -0.4699999999999136;
		return t;
	};
	_proto._Label9_i = function () {
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
	_proto._Label10_i = function () {
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
		t.source = "user/userOk";
		t.verticalCenter = 0;
		return t;
	};
	_proto.img_nobecomeonTask_i = function () {
		var t = new eui.Image();
		this.img_nobecomeonTask = t;
		t.horizontalCenter = 260;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login/notreachImg";
		t.verticalCenter = -0.045000000000001705;
		t.x = 581;
		t.y = -448;
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
		t.source = "ui/rank/rankitembg";
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
		t.source = "ui/win/rankBg";
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
		t.source = "ui/rank/bg";
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
		t.source = "ui/win/xinjilu";
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
		t.source = "ui/win/jiesuan";
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
		t.source = "ui/win/anniudi";
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