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
 * 领取奖励面板
 */
var BringAwardComPanel = (function (_super) {
    __extends(BringAwardComPanel, _super);
    function BringAwardComPanel() {
        var _this = _super.call(this) || this;
        _this._iconSize = 48;
        _this.setSkinName(UIModuleName.BringAwardComPanel);
        return _this;
    }
    BringAwardComPanel.prototype.onAwake = function (event) {
        _super.prototype.onAwake.call(this, event);
        this.maskAlpha = 0;
    };
    BringAwardComPanel.prototype.init = function (appendData) {
        _super.prototype.init.call(this, appendData);
        if (appendData) {
            if (appendData.awardId) {
                var awardDef = AwardDefined.GetInstance().getDefinition(appendData.awardId);
                this._awardDef = awardDef;
            }
            if (appendData.des) {
                this.titleLabel.text = appendData.des;
            }
            if (appendData.callback) {
                this._callback = appendData.callback;
            }
            if (appendData.thisObj) {
                this._thisObj = appendData.thisObj;
            }
            if (appendData.size) {
                this._iconSize = appendData.size;
            }
            if (appendData.itemId) {
                this._itemDef = ItemDefined.GetInstance().getDefinition(appendData.itemId);
            }
            if (appendData.itemCount) {
                this._itemCount = appendData.itemCount;
            }
        }
        if (this._awardDef && this._awardDef.rewardList.length > 0) {
            this.iconImg.init(this._awardDef, this._iconSize, null, false, true);
            this.goldNumLabel.text = this._awardDef.rewardList[0].count.toString();
        }
        if (this._itemDef && this._itemCount) {
            this.iconImg.init(this._itemDef.id, this._iconSize, null, false, true);
            this.goldNumLabel.text = this._itemCount.toString();
        }
    };
    BringAwardComPanel.prototype.onEnable = function (event) {
        _super.prototype.onEnable.call(this, event);
        this.clear();
        this.bringBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
    };
    BringAwardComPanel.prototype.onDisable = function (event) {
        _super.prototype.onDisable.call(this, event);
        this.bringBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bringBtnClick, this);
    };
    /**
     * 领取金币按钮点击执行事件
    */
    BringAwardComPanel.prototype.bringBtnClick = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        if (this._callback) {
            qin.FuncUtil.invoke(this._callback, this._thisObj);
        }
        _super.prototype.onCloseBtnClickHandler.call(this, null);
    };
    BringAwardComPanel.prototype.clear = function () {
        this._awardDef = null;
        this._callback = null;
        this._itemCount = null;
        this._itemDef = null;
        this._thisObj = null;
    };
    return BringAwardComPanel;
}(BasePanel));
__reflect(BringAwardComPanel.prototype, "BringAwardComPanel");
//# sourceMappingURL=BringAwardComPanel.js.map