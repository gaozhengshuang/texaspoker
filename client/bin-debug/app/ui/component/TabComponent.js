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
 * 带有选项组件
 */
var TabComponent = (function (_super) {
    __extends(TabComponent, _super);
    function TabComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tabInfoList = new Array();
        _this._radioButtonGroup = new eui.RadioButtonGroup();
        /**
         * 是否开启缓动
         */
        _this.isTween = true;
        /**
         * 选项卡改变事件
         */
        _this.tabChangeEvent = new qin.DelegateDispatcher();
        return _this;
    }
    // private static readonly defaultColor: number = 0x4bc6b7;
    // private static readonly selectColor: number = 0xffffff;
    TabComponent.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
    };
    /**
     * onAwake方法里调用
     */
    TabComponent.prototype.build = function (data) {
        this.bindData = data;
        if (data.groupList == null || data.nameList == null) {
            qin.Console.log("传入数据为空");
            return;
        }
        if (data.groupList[0]) {
            this._stackY = data.groupList[0].y;
        }
        if (data.tabSkinName) {
            switch (data.tabSkinName) {
                case TabButtonType.SmallOf2:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton2;
                    break;
                case TabButtonType.SmallOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton3;
                    break;
                case TabButtonType.SmallOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentButton4;
                    break;
                case TabButtonType.SmallOf5:
                    this.tabSkinName = UIComponentSkinName.TabComponentButton5;
                    break;
                case TabButtonType.XSmallOf5:
                    this.tabSkinName = UIComponentSkinName.TabComponentButtonSm5;
                    break;
                case TabButtonType.BigOf2:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig2;
                    break;
                case TabButtonType.BigOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig3;
                    break;
                case TabButtonType.BigOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentButtonBig4;
                    break;
                case TabButtonType.SubOf2:
                    this.tabSkinName = UIComponentSkinName.rankTabComponentButton2;
                    break;
                case TabButtonType.SubOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentSubBtn3;
                    break;
                case TabButtonType.SubOf4:
                    this.tabSkinName = UIComponentSkinName.laBaRankTabComponentBtn4;
                    break;
                case TabButtonType.HappyGiftOf4:
                    this.tabSkinName = UIComponentSkinName.happyGiftTabtButton4;
                    break;
                case TabButtonType.HappyGiftOf2:
                    this.tabSkinName = UIComponentSkinName.happyGiftTabtButton2;
                    break;
                case TabButtonType.LaBa2:
                    this.tabSkinName = UIComponentSkinName.laBaTabCompontBtn2;
                    break;
                case TabButtonType.InviteSmallOf3:
                    this.tabSkinName = UIComponentSkinName.tabComponentInviteBtn3;
                    break;
                case TabButtonType.InviteSmallOf4:
                    this.tabSkinName = UIComponentSkinName.tabComponentInviteBtn4;
                    break;
            }
            for (var i = 0; i < data.nameList.length; i++) {
                var info = new TabInfo();
                info.group = data.groupList[i];
                info.group.visible = false;
                info.tabButton = new eui.RadioButton();
                info.tabButton.skinName = this.tabSkinName;
                info.tabButton.label = data.nameList[i];
                info.tabButton.selected = false;
                var label = info.tabButton.labelDisplay;
                //label.textColor = TabComponent.defaultColor;
                info.tabButton.group = this._radioButtonGroup;
                this._tabInfoList.push(info);
                this.tabGroup.addChild(info.tabButton);
            }
        }
        this.y++;
    };
    /**
     * 更新
    */
    TabComponent.prototype.update = function (data, index) {
        if (index === void 0) { index = 0; }
        this.clear();
        this.build(data);
        this.init(index);
    };
    /**
     * 清除
    */
    TabComponent.prototype.clear = function () {
        qin.ArrayUtil.Clear(this._tabInfoList);
        if (this.tabGroup.numChildren > 0) {
            this.tabGroup.removeChildren();
        }
    };
    /**
     * init方法里调用
     * {enterTabindex: number, tabIndex ?: number[], flag ?:boolean}
     */
    TabComponent.prototype.init = function (param) {
        _super.prototype.init.call(this, param);
        if (typeof param == "number") {
            this.setSelectIndex(param);
        }
        else {
            this.setSelectIndex(param.enterTabindex);
            if (param.tabIndex && param.flag) {
                this.setEnableTabIndex(param.enableTabIndex, param.flag);
            }
        }
        this.setEnterAnime(this._tabInfoList[this.lastIndex].group);
    };
    TabComponent.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBarItemTap, this);
    };
    TabComponent.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBarItemTap, this);
        egret.Tween.removeTweens(this.tabGroup);
        for (var _i = 0, _a = this._tabInfoList; _i < _a.length; _i++) {
            var info = _a[_i];
            egret.Tween.removeTweens(info.group);
        }
    };
    TabComponent.prototype.onBarItemTap = function (e) {
        if (this.tabGroup.getChildIndex(e.target) == this.lastIndex || this.tabGroup.getChildIndex(e.target) == -1) {
            return;
        }
        SoundManager.playEffect(MusicAction.buttonClick);
        this.setSelectIndex(this.tabGroup.getChildIndex(e.target));
    };
    /**
     * 设置选中某个选项
     */
    TabComponent.prototype.setSelectIndex = function (index) {
        if (index == undefined) {
            index = 0;
        }
        if (this.lastIndex != undefined) {
            this._tabInfoList[this.lastIndex].group.visible = false;
            this._tabInfoList[this.lastIndex].tabButton.selected = false;
            var label_1 = this._tabInfoList[this.lastIndex].tabButton.labelDisplay;
            //label.textColor = TabComponent.defaultColor;
        }
        this._tabInfoList[index].group.visible = true;
        this._tabInfoList[index].tabButton.selected = true;
        var label = this._tabInfoList[index].tabButton.labelDisplay;
        //label.textColor = TabComponent.selectColor;
        this.lastIndex = index;
        this.tabChangeEvent.dispatch(this.lastIndex);
    };
    /**
     * 禁用/启用某个选项卡
     */
    TabComponent.prototype.setEnableTabIndex = function (indexList, flag) {
        for (var _i = 0, indexList_1 = indexList; _i < indexList_1.length; _i++) {
            var num = indexList_1[_i];
            var button = this._tabInfoList[num].tabButton;
            if (flag) {
                // qin.FilterUtil.setDefault(button);
            }
            else {
                // qin.FilterUtil.setGray(button);
            }
            button.touchEnabled = flag;
        }
    };
    /**
     * 通过group设置选中选项
     */
    TabComponent.prototype.setEnterTabGroup = function (item) {
        if (!this.bindData) {
            qin.Console.log("传入数据为空");
            return;
        }
        for (var i = 0; i < this.bindData.groupList.length; i++) {
            if (this.bindData[i] == item) {
                this.lastIndex = i;
                break;
            }
        }
        this.setSelectIndex(this.lastIndex);
    };
    TabComponent.prototype.setEnterAnime = function (targetStack) {
        if (this.isTween) {
            this.tabGroup.scaleX = 0;
            this.tabGroup.scaleY = 0;
            egret.Tween.get(this.tabGroup).wait(100).to({ scaleX: 1, scaleY: 1 }, 200);
            targetStack.y = GameManager.stage.stageHeight;
            egret.Tween.get(targetStack).wait(200).to({ y: this._stackY }, 200);
        }
    };
    TabComponent.CreatData = function (nameList, groupList, skinName, disableTabDes) {
        var resultData = new TabComponentData();
        resultData.nameList = nameList;
        resultData.groupList = groupList;
        resultData.tabSkinName = skinName;
        resultData.disableTabDes = disableTabDes;
        return resultData;
    };
    TabComponent.prototype.getBtnByLabel = function (label) {
        if (this._tabInfoList) {
            for (var _i = 0, _a = this._tabInfoList; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info.tabButton && info.tabButton.label == label) {
                    return info.tabButton;
                }
            }
        }
        return null;
    };
    TabComponent.prototype.getBtnByIndex = function (index) {
        if (this._tabInfoList) {
            return this._tabInfoList[index].tabButton;
        }
        return null;
    };
    return TabComponent;
}(BaseComponent));
__reflect(TabComponent.prototype, "TabComponent");
var TabComponentData = (function () {
    function TabComponentData() {
    }
    return TabComponentData;
}());
__reflect(TabComponentData.prototype, "TabComponentData");
var TabInfo = (function () {
    function TabInfo() {
    }
    return TabInfo;
}());
__reflect(TabInfo.prototype, "TabInfo");
//# sourceMappingURL=TabComponent.js.map