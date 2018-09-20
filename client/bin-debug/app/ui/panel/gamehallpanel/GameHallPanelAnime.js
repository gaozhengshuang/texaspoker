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
var GameHallPanelAnime = (function (_super) {
    __extends(GameHallPanelAnime, _super);
    function GameHallPanelAnime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameHallPanelAnime.prototype.onEnable = function () {
        this.setEnterAnime();
    };
    GameHallPanelAnime.prototype.onDisable = function () {
        this.setOutAnime();
    };
    GameHallPanelAnime.prototype.setEnterAnime = function () {
        this.removeEnterAnime();
        this.target.userinfoGroup.top = -100;
        egret.Tween.get(this.target.userinfoGroup).to({ top: 0 }, 600, egret.Ease.backOut);
        this.target.rightMenu.right = -113;
        egret.Tween.get(this.target.rightMenu).to({ right: 0 }, 600, egret.Ease.backOut);
        this.target.ranking.left = -86;
        egret.Tween.get(this.target.ranking).to({ left: 0 }, 600, egret.Ease.backOut);
        this.target.gameButton.bottom = -250;
        egret.Tween.get(this.target.gameButton)
            .to({ bottom: 210 - (1295 - this.target.panelBottom.height) / 1280 * 210 }, 800, egret.Ease.backOut);
        this.target.bottomButton.bottom = -150;
        egret.Tween.get(this.target.bottomButton).to({ bottom: 0 }, 600, egret.Ease.backOut);
        this.target.dealerImg.alpha = 0;
        egret.Tween.get(this.target.dealerImg).to({ alpha: 1 }, 300).call(this.onEnterAnmComplete, this);
    };
    GameHallPanelAnime.prototype.setOutAnime = function () {
        this.removeEnterAnime();
        this.target.userinfoGroup.top = 0;
        egret.Tween.get(this.target.userinfoGroup).to({ top: -100 }, 600);
        this.target.rightMenu.right = 0;
        egret.Tween.get(this.target.rightMenu).to({ right: -113 }, 600);
        this.target.ranking.left = 0;
        egret.Tween.get(this.target.ranking).to({ left: -86 }, 600);
        this.target.gameButton.bottom = 210;
        egret.Tween.get(this.target.gameButton).to({ bottom: -250 }, 800);
        this.target.bottomButton.bottom = 0;
        egret.Tween.get(this.target.bottomButton).to({ bottom: -150 }, 600);
        this.target.dealerImg.alpha = 1;
        egret.Tween.get(this.target.dealerImg).to({ alpha: 0 }, 300).call(this.onCloseAnmComplete, this);
    };
    GameHallPanelAnime.prototype.removeEnterAnime = function () {
        egret.Tween.removeTweens(this.target.userinfoGroup);
        egret.Tween.removeTweens(this.target.rightMenu);
        egret.Tween.removeTweens(this.target.ranking);
        egret.Tween.removeTweens(this.target.gameButton);
        egret.Tween.removeTweens(this.target.bottomButton);
        egret.Tween.removeTweens(this.target.dealerImg);
    };
    GameHallPanelAnime.prototype.onEnterAnmComplete = function () {
    };
    GameHallPanelAnime.prototype.onCloseAnmComplete = function () {
        UIManager.closePanel(this.target);
    };
    GameHallPanelAnime.prototype.setMoreEnterAnime = function () {
        this.removeMoreAnime();
        this.target.moreGroup.visible = true;
        this.target.moreGroup.alpha = 0;
        this.target.moreGroup.bottom = 0;
        egret.Tween.get(this.target.moreGroup).to({ alpha: 1, bottom: 72 }, 200, egret.Ease.cubicOut);
    };
    GameHallPanelAnime.prototype.setMoreOutAnime = function () {
        var _this = this;
        this.removeMoreAnime();
        this.target.moreGroup.alpha = 1;
        this.target.moreGroup.bottom = 72;
        egret.Tween.get(this.target.moreGroup)
            .to({ alpha: 0, bottom: 0 }, 200, egret.Ease.cubicOut)
            .call(function () { _this.target.moreGroup.visible = false; });
    };
    GameHallPanelAnime.prototype.removeMoreAnime = function () {
        egret.Tween.removeTweens(this.target.moreGroup);
    };
    GameHallPanelAnime.prototype.setRankEnterAnime = function (panelName) {
        if (panelName == UIModuleName.RankPanel) {
            this.removeRankAnime();
            this.target.ranking.left = -86;
            egret.Tween.get(this.target.ranking).to({ left: 0 }, 300, egret.Ease.backOut);
        }
    };
    GameHallPanelAnime.prototype.setRankOutAnime = function () {
        this.removeRankAnime();
        this.target.ranking.left = 0;
        egret.Tween.get(this.target.ranking).to({ left: -86 }, 300, egret.Ease.backOut);
    };
    GameHallPanelAnime.prototype.removeRankAnime = function () {
        egret.Tween.removeTweens(this.target.ranking);
    };
    return GameHallPanelAnime;
}(BaseGameHallAnime));
__reflect(GameHallPanelAnime.prototype, "GameHallPanelAnime");
//# sourceMappingURL=GameHallPanelAnime.js.map