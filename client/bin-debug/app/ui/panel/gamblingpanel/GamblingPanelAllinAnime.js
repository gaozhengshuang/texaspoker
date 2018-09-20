var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GamblingPanelAllinAnime = (function () {
    function GamblingPanelAllinAnime(panel) {
        this._ceilTime = 40;
        this.panel = panel;
    }
    GamblingPanelAllinAnime.prototype.playAllinAnime = function () {
        this.removeAllinAnime(this.panel.allInAnimeGroup);
        this.panel.ordinaryRoomGroup.addChild(this.panel.allInAnimeGroup);
        this.setAllinAnime(this.panel.img0, 0, 1, this.setAllinEffect0, this);
        this.setAllinAnime(this.panel.img1, 4, 0.85);
        this.setAllinAnime(this.panel.img2, 8, 0.7);
        this.setAllinAnime(this.panel.img3, 12, 0.55, this.setAllinEffect1, this);
        this.setAllinAnime(this.panel.img4, 16, 0.4, this.onEffectOver, this, 1000);
    };
    GamblingPanelAllinAnime.prototype.setAllinAnime = function (obj, wait, speed, call, thisObj, callwait) {
        if (callwait === void 0) { callwait = 0; }
        var tween = egret.Tween.get(obj);
        tween.set({ scaleX: 0, scaleY: 0, alpha: 0 })
            .wait(wait * this._ceilTime).to({ scaleX: 0.7, scaleY: 0.7, alpha: 0.33 }, speed * this._ceilTime)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 2 * speed * this._ceilTime)
            .to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 3 * speed * this._ceilTime)
            .to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, speed * this._ceilTime)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 2 * speed * this._ceilTime).wait(callwait).call(function () {
            if (call) {
                qin.FuncUtil.invoke(call, thisObj);
            }
        });
    };
    GamblingPanelAllinAnime.prototype.removeAllinAnime = function (group) {
        for (var i = 0; i < group.numChildren; i++) {
            if (group.getChildAt(i)) {
                egret.Tween.removeTweens(group.getChildAt(i));
            }
        }
    };
    GamblingPanelAllinAnime.prototype.setAllinEffect0 = function () {
        this.setAllinEffect(this._allinEffect0, AnimationType.Allin0, this.panel.allInAnimeGroup);
    };
    GamblingPanelAllinAnime.prototype.setAllinEffect1 = function () {
        this.setAllinEffect(this._allinEffect1, AnimationType.Allin1, this.panel.allInAnimeGroup);
    };
    GamblingPanelAllinAnime.prototype.onEffectOver = function () {
        this.hideWinEffect(this._allinEffect0);
        this.hideWinEffect(this._allinEffect1);
        if (this.panel.allInAnimeGroup.parent) {
            this.panel.allInAnimeGroup.parent.removeChild(this.panel.allInAnimeGroup);
        }
    };
    /**
     * 显示allin特效
     */
    GamblingPanelAllinAnime.prototype.setAllinEffect = function (effect, type, parent) {
        AnimationFactory.getParticleEffect(type, parent, function (ptc) {
            effect = ptc;
        });
    };
    /**
     * 隐藏allin特效
    */
    GamblingPanelAllinAnime.prototype.hideWinEffect = function (effect) {
        if (effect && effect.parent) {
            effect.stop();
            effect.parent.removeChild(effect);
        }
    };
    return GamblingPanelAllinAnime;
}());
__reflect(GamblingPanelAllinAnime.prototype, "GamblingPanelAllinAnime");
//# sourceMappingURL=GamblingPanelAllinAnime.js.map