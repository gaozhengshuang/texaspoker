var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全屏面板的入场动画
 */
var PanelAnime = (function () {
    function PanelAnime(panel) {
        this.panel = panel;
        this.anmGroup = this.panel["anmGroup"];
        this.anmGroup1 = this.panel["anmGroup1"];
        this.titleGroup = this.panel["titleGroup"];
        //this.isCloseButtonTween = true;
    }
    PanelAnime.prototype.onEnable = function () {
        this.setEnterAnime();
    };
    PanelAnime.prototype.onDisable = function () {
        this.isEnterOver = false;
    };
    PanelAnime.prototype.setEnterAnime = function () {
        this.isEnterOver = false;
        this.removeAllAnime();
        // if (this.panel.grayMask)
        // {
        // 	egret.Tween.removeTweens(this.panel.grayMask);
        // }
        this.resetPos();
        egret.Tween.get(this.anmGroup).set({ top: -100 }).to({ top: 0 }, 260);
        egret.Tween.get(this.anmGroup1).set({ y: this.panel.height }).to({ y: 100 }, 260);
        egret.Tween.get(this.titleGroup).set({ top: -100 }).wait(300).to({ top: 0 }, 200).call(this.onEnterAnmComplete.bind(this));
    };
    PanelAnime.prototype.onEnterAnmComplete = function () {
        this.isEnterOver = true;
    };
    PanelAnime.prototype.onCloseBtnClickHandler = function (event) {
        if (event) {
            if (event.target instanceof eui.Button) {
                SoundManager.playEffect(MusicAction.close);
            }
        }
        if (!this.panel.prevPanelName || this.panel.prevPanelName == UIModuleName.GameHallPanel) {
            this.showPrePanelName();
        }
        this.removeAllAnime();
        for (var i = 0; i < this.panel.numChildren; i++) {
            var displayObj = this.panel.getChildAt(i);
            var enter = egret.Tween.get(displayObj);
            displayObj.x = 0;
            if (displayObj === this.anmGroup1) {
                enter.to({ x: -720 }, 200, egret.Ease.circOut).call(this.onCloseAnmComplete.bind(this));
            }
            else {
                enter.to({ x: -720 }, 200, egret.Ease.circOut);
            }
        }
    };
    PanelAnime.prototype.resetPos = function () {
        for (var i = 0; i < this.panel.numChildren; i++) {
            var displayObj = this.panel.getChildAt(i);
            displayObj.x = 0;
        }
    };
    PanelAnime.prototype.removeAllAnime = function () {
        egret.Tween.removeTweens(this.anmGroup);
        egret.Tween.removeTweens(this.anmGroup1);
        egret.Tween.removeTweens(this.titleGroup);
    };
    PanelAnime.prototype.showPrePanelName = function () {
        if (!this.panel.prevPanelName) {
            UIManager.showPanel(UIModuleName.GameHallPanel);
        }
        if (this.panel.prevPanelName != UIModuleName.None) {
            UIManager.showPanel(this.panel.prevPanelName);
        }
    };
    PanelAnime.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(this.panel);
    };
    return PanelAnime;
}());
__reflect(PanelAnime.prototype, "PanelAnime");
//# sourceMappingURL=PanelAnime.js.map