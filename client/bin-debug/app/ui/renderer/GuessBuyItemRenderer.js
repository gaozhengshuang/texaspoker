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
 * 手牌竞猜购买项面板
*/
var GuessBuyItemRenderer = (function (_super) {
    __extends(GuessBuyItemRenderer, _super);
    function GuessBuyItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.GuessBuyItemRenderer;
        return _this;
    }
    GuessBuyItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.reset();
            this.typeLabel.text = this.bindData.definition.des;
            this.oddsLabel.text = this.bindData.definition.odds.toString();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.ante1RB.addEventListener(eui.UIEvent.CHANGE, this.anteClick, this);
            this.ante2RB.addEventListener(egret.Event.CHANGE, this.anteClick, this);
            this.ante3RB.addEventListener(egret.Event.CHANGE, this.anteClick, this);
        }
    };
    GuessBuyItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.ante1RB.removeEventListener(eui.UIEvent.CHANGE, this.anteClick, this);
        this.ante2RB.removeEventListener(egret.Event.CHANGE, this.anteClick, this);
        this.ante3RB.removeEventListener(egret.Event.CHANGE, this.anteClick, this);
    };
    /**
     * 注数更改
    */
    GuessBuyItemRenderer.prototype.anteClick = function (event) {
        if (GamblingManager.guessHandler.buyInning) {
            AlertManager.showAlert("请先取消购买再选择");
            event.target.selected = !event.target.selected;
            return;
        }
        var ante = parseInt(event.target.label);
        if (this.preSelectedAnte != undefined) {
            if (this.preSelectedAnte == ante) {
                this.preSelectedAnte = 0;
                GamblingManager.guessHandler.totalAnte -= ante;
                GamblingManager.guessHandler.setBuyGuessAnteInfo(this.bindData.id, 0);
                GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
                return;
            }
            else {
                GamblingManager.guessHandler.totalAnte -= this.preSelectedAnte;
                GamblingManager.guessHandler.totalAnte += ante;
            }
        }
        else {
            GamblingManager.guessHandler.totalAnte += ante;
        }
        for (var i = 0; i < this.toggleBtns.length; i++) {
            var btn = this.toggleBtns[i];
            if (btn == event.target) {
                btn.selected = event.target.selected;
            }
            else {
                btn.selected = false;
            }
        }
        GamblingManager.guessHandler.setBuyGuessAnteInfo(this.bindData.id, ante);
        this.preSelectedAnte = ante;
        GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
    };
    /**
     * 重置数据
    */
    GuessBuyItemRenderer.prototype.reset = function () {
        this.preSelectedAnte = undefined;
        this.toggleBtns = new Array();
        for (var i = 1; i <= 3; i++) {
            this.toggleBtns.push(this["ante" + i + "RB"]);
        }
        if (GamblingManager.guessHandler.buyGuessAnteInfo) {
            for (var _i = 0, _a = GamblingManager.guessHandler.buyGuessAnteInfo; _i < _a.length; _i++) {
                var info = _a[_i];
                if (this.bindData.id == info.id) {
                    for (var i = 0; i < this.toggleBtns.length; i++) {
                        var tb = this.toggleBtns[i];
                        if (parseInt(tb.label) == info.num) {
                            tb.selected = true;
                            this.preSelectedAnte = info.num;
                        }
                        else {
                            tb.selected = false;
                        }
                    }
                }
            }
        }
    };
    /**
     * 注数更改
    */
    GuessBuyItemRenderer.prototype.radioChangeHandler = function (event) {
        var radioGroup = event.target;
        if (this.preSelectedAnte) {
            GamblingManager.guessHandler.totalAnte -= this.preSelectedAnte;
            GamblingManager.guessHandler.totalAnte += parseInt(radioGroup.selectedValue);
        }
        else {
            GamblingManager.guessHandler.totalAnte += parseInt(radioGroup.selectedValue);
        }
        this.preSelectedAnte = parseInt(radioGroup.selectedValue);
        GamblingManager.guessHandler.onChangeTotalAnteEvent.dispatch();
    };
    return GuessBuyItemRenderer;
}(BaseItemRenderer));
__reflect(GuessBuyItemRenderer.prototype, "GuessBuyItemRenderer");
//# sourceMappingURL=GuessBuyItemRenderer.js.map