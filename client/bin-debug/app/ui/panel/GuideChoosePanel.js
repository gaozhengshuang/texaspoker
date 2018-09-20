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
 * 游戏引导选择面板
 */
var GuideChoosePanel = (function (_super) {
    __extends(GuideChoosePanel, _super);
    function GuideChoosePanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName(UIModuleName.GuideChoosePanel);
        return _this;
    }
    GuideChoosePanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
        this.dealerImg.source = BundleManager.getResNameByBundle(ResFixedFileName.Dealer_Png);
    };
    GuideChoosePanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (this.panelData) {
            if (this.panelData.type == GuideChooseType.IsEnterGuide) {
                this.chooseGroup2.visible = false;
                this.chooseGroup1.visible = true;
                this.titleLabel.text = "您熟悉德州扑克吗？";
                this.goldGroup.visible = false;
            }
            else if (this.panelData.type == GuideChooseType.IsEnterTrainingCamp) {
                this.chooseGroup2.visible = true;
                this.chooseGroup1.visible = false;
                this.titleLabel.text = "是否进入训练营？";
                this.goldGroup.visible = true;
                if (!this._guideTipsComponent) {
                    this._guideTipsComponent = new GuideTipsComponent(UIComponentSkinName.GuideTipsComponent);
                }
                this._guideTipsComponent.init({ parent: this.goldGroup, data: { orientation: GuideTipsOrientation.Down, delay: 10, ax: 75, xoffset: -35, yoffset: -35, data: "可获得额外金币奖励" } });
            }
        }
    };
    GuideChoosePanel.prototype.onRender = function (event) {
        _super.prototype.onRender.call(this, event);
    };
    GuideChoosePanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.passBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtnClick, this);
        this.enterBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnClick, this);
        this.passBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtn0Click, this);
        this.enterBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtn0Click, this);
        GuideManager.onSetGuideStepEvent.addListener(this.changGuideStepSuccess, this);
    };
    GuideChoosePanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.passBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtnClick, this);
        this.enterBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtnClick, this);
        this.passBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.passBtn0Click, this);
        this.enterBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterBtn0Click, this);
        GuideManager.onSetGuideStepEvent.removeListener(this.changGuideStepSuccess, this);
    };
    /**
     * 是否进入新手引导跳过按钮点击执行事件
    */
    GuideChoosePanel.prototype.passBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData) {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.skip);
        }
    };
    /**
     * 是否进入新手引导进入按钮点击执行事件
    */
    GuideChoosePanel.prototype.enterBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData) {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.next);
        }
    };
    /**
     * 是否进入训练营跳过按钮点击执行事件
    */
    GuideChoosePanel.prototype.passBtn0Click = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData) {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.skip);
        }
    };
    /**
     * 是否进入训练营进入按钮点击执行事件
    */
    GuideChoosePanel.prototype.enterBtn0Click = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this.panelData) {
            GuideExecutor.guideProcessComplete(this.panelData.self, this.panelData.next);
        }
    };
    /**
     * 收到改变引导步数成功广播后执行事件
    */
    GuideChoosePanel.prototype.changGuideStepSuccess = function (data) {
        if (this.panelData && data.uid == this.panelData.skip) {
            this.finishGuide();
        }
    };
    /**
    * 跳过按钮点击后触发广播成功执行事件
    */
    GuideChoosePanel.prototype.finishGuide = function () {
        this.onCloseBtnClickHandler(null);
    };
    return GuideChoosePanel;
}(BasePanel));
__reflect(GuideChoosePanel.prototype, "GuideChoosePanel");
//# sourceMappingURL=GuideChoosePanel.js.map