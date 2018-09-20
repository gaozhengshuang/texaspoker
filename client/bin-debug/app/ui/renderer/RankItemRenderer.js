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
 * 排行榜渲染项
 */
var RankItemRenderer = (function (_super) {
    __extends(RankItemRenderer, _super);
    //public gotoImage: eui.Image;//查看详情
    function RankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.RankItemRenderer;
        return _this;
    }
    RankItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.refresh();
    };
    RankItemRenderer.prototype.refresh = function () {
        if (this.bindData) {
            this.head.init(this.bindData, 80);
            if (this.bindData.rank <= 3) {
                this.rankImg.visible = true;
                this.rankLabel.visible = false;
                this.rankImg.source = ResPrefixName.RankImage + this.bindData.rank + ResSuffixName.PNG;
            }
            else {
                this.rankImg.visible = false;
                this.rankLabel.visible = true;
                this.rankLabel.text = RankManager.getRankDes(this.bindData.rank);
            }
            this.nameLabel.text = this.bindData.name;
            if (this.bindData.score == undefined || this.bindData.score == 0) {
                this.numLabel.visible = false;
            }
            else {
                this.numLabel.visible = true;
                switch (this.bindData.type) {
                    case RankType.Gold:
                    case RankType.FriendGold:
                        this.numLabel.text = "$ " + qin.MathUtil.numAddSpace(this.bindData.score);
                        break;
                    case RankType.Level:
                    case RankType.FriendLevel:
                        this.numLabel.text = "等级：" + qin.MathUtil.formatNum(this.bindData.score);
                        break;
                    case RankType.Vip:
                        this.numLabel.text = "成长值：" + qin.MathUtil.formatNum(this.bindData.score);
                        break;
                }
            }
            this.showUpOrDown();
            if (this.bindData.change) {
                switch (this.bindData.change) {
                    case RankChange.Up:
                        this.showUpOrDown(this.upImage);
                        break;
                    case RankChange.Down:
                        this.showUpOrDown(this.downImage);
                        break;
                    case RankChange.NoChange:
                        this.showUpOrDown(this.noChangeImage);
                        break;
                }
            }
        }
    };
    RankItemRenderer.prototype.gotoUserInfo = function () {
        SoundManager.playEffect(MusicAction.buttonClick);
        UserManager.reqShowOtherUserInfoPanel(this.bindData.roleId);
    };
    RankItemRenderer.prototype.showUpOrDown = function (show) {
        this.upImage.visible = false;
        this.downImage.visible = false;
        this.noChangeImage.visible = false;
        if (show) {
            show.visible = true;
        }
    };
    RankItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUserInfo, this);
    };
    return RankItemRenderer;
}(BaseItemRenderer));
__reflect(RankItemRenderer.prototype, "RankItemRenderer");
//# sourceMappingURL=RankItemRenderer.js.map