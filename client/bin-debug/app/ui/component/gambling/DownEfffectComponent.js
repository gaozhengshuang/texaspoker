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
 * 坐下效果
 */
var DownEfffectComponent = (function (_super) {
    __extends(DownEfffectComponent, _super);
    function DownEfffectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._times = 0;
        return _this;
    }
    DownEfffectComponent.prototype.init = function () {
        if (this.effectGroup) {
            this.effectGroup.visible = false;
        }
    };
    DownEfffectComponent.prototype.run = function (parent) {
        if (this.effectGroup && parent) {
            this.effectGroup.visible = true;
            parent.addChild(this);
            this.x = parent.parent.maxWidth / 2 - this.width / 2 - 3;
            this.y = parent.parent.maxHeight / 2 - this.height / 2 - 30;
            this.tweenGroup.scaleX = 1;
            this.tweenGroup.scaleY = 1;
            this.tweenGroup.alpha = 1;
            this.tweenCircle0.scaleX = 1;
            this.tweenCircle0.scaleY = 1;
            this.tweenCircle0.alpha = 0;
            this.tweenCircle1.scaleX = 1;
            this.tweenCircle1.scaleY = 1;
            this.tweenCircle1.alpha = 0;
            egret.Tween.removeTweens(this.tweenGroup);
            egret.Tween.removeTweens(this.tweenCircle0);
            egret.Tween.removeTweens(this.tweenCircle1);
            this._tween = egret.Tween.get(this.tweenGroup, { loop: true });
            this._times = 0;
            this._tween.to({ scaleX: 0.7, scaleY: 0.7 }, 400).call(this.onTweenOverFirst, this).to({ scaleX: 1, scaleY: 1 }, 400);
            this._tween.play();
            this._tween1 = egret.Tween.get(this.tweenCircle0, { loop: true });
            this._tween1.to({ alpha: 1 }, 0).to({ scaleX: 1.6, scaleY: 1.6, alpha: 0 }, 600).to({ scaleX: 1, scaleY: 1, alpha: 0 }, 200);
            this._tween1.play();
            this._tween2 = egret.Tween.get(this.tweenCircle1, { loop: true });
            this._tween2.to({ alpha: 0 }, 0).wait(200).to({ alpha: 1 }, 0).to({ scaleX: 1.3, scaleY: 1.3, alpha: 0 }, 400).to({ scaleX: 1, scaleY: 1, alpha: 0 }, 200);
            this._tween2.play();
        }
    };
    DownEfffectComponent.prototype.onTweenOverFirst = function () {
        this._times += 1;
        if (this._times >= 3) {
            egret.Tween.removeTweens(this.tweenGroup);
            this._tween = egret.Tween.get(this.tweenGroup);
            this._tween.to({ scaleX: 1, scaleY: 1, alpha: 0.1 }, 400).call(this.onTweenOver, this);
            this._tween.play();
        }
    };
    DownEfffectComponent.prototype.onTweenOver = function () {
        this.effectGroup.visible = false;
        egret.Tween.removeTweens(this.tweenGroup);
        egret.Tween.removeTweens(this.tweenCircle0);
        egret.Tween.removeTweens(this.tweenCircle1);
    };
    return DownEfffectComponent;
}(BaseComponent));
__reflect(DownEfffectComponent.prototype, "DownEfffectComponent");
//# sourceMappingURL=DownEfffectComponent.js.map