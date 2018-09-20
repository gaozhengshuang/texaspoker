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
 * 获得道具面板(appendData传Array<ItemGetInfo>类型)
 */
var GetItemTipsPanel = (function (_super) {
    __extends(GetItemTipsPanel, _super);
    function GetItemTipsPanel() {
        var _this = _super.call(this) || this;
        _this.itemGetList = new Array();
        _this._cellTime = 1200;
        _this.layer = UILayerType.Tips;
        _this.setTouchChildren(false);
        _this.setTouchEnable(false);
        _this.setSkinName(UIModuleName.GetItemTipsPanel);
        return _this;
    }
    GetItemTipsPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    GetItemTipsPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        egret.Tween.removeTweens(this.group);
        if (appendData && appendData.length > 0) {
            this.itemGetList = appendData;
            SoundManager.playEffect(MusicAction.item_fall);
            this.startPlay();
        }
        else {
            this.onCloseBtnClickHandler(null);
        }
    };
    GetItemTipsPanel.prototype.startPlay = function () {
        if (!this.getItemRender) {
            this.getItemRender = new GetItemComponent(UIComponentSkinName.GetItemComponent);
            this.group.addChild(this.getItemRender);
        }
        this.nextPlay();
    };
    GetItemTipsPanel.prototype.nextPlay = function () {
        if (this.itemGetList.length > 0) {
            var itemInfo = this.itemGetList.shift();
            this.getItemRender.initInfo(itemInfo);
            egret.Tween.get(this.group).set({ scaleX: 0, scaleY: 0 }).to({ scaleX: 1, scaleY: 1 }, 200).wait(800).to({ scaleX: 0, scaleY: 0 }, 200).call(this.nextPlay, this);
        }
        else {
            egret.Tween.removeTweens(this.group);
            this.onCloseBtnClickHandler(null);
        }
    };
    return GetItemTipsPanel;
}(BasePanel));
__reflect(GetItemTipsPanel.prototype, "GetItemTipsPanel");
//# sourceMappingURL=GetItemTipsPanel.js.map