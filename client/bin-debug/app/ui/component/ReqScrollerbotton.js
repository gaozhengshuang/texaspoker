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
 * 请求数据组件
 */
var ReqScrollerbotton = (function (_super) {
    __extends(ReqScrollerbotton, _super);
    function ReqScrollerbotton(width, skinName) {
        var _this = _super.call(this, skinName) || this;
        _this.groupWidth = width;
        return _this;
    }
    ReqScrollerbotton.prototype.init = function (isBotton) {
        this.itemGroup.width = this.groupWidth;
        if (isBotton) {
            this.itemLabel.text = "已到最底部";
        }
        else {
            this.itemLabel.text = "下拉以继续";
        }
    };
    ReqScrollerbotton.prototype.setAnime = function () {
        this.clearAnime();
        var callback = function () {
            this.visible = false;
        };
        this.visible = true;
        this.alpha = 1;
        egret.Tween.get(this).wait(1000).to({ alpha: 0 }, 200).call(callback);
    };
    ReqScrollerbotton.prototype.clearAnime = function () {
        egret.Tween.removeTweens(this);
    };
    return ReqScrollerbotton;
}(BaseComponent));
__reflect(ReqScrollerbotton.prototype, "ReqScrollerbotton");
//# sourceMappingURL=ReqScrollerbotton.js.map