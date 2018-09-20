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
 * 锦标赛最近赛况项面板
*/
var OutsItemRenderer = (function (_super) {
    __extends(OutsItemRenderer, _super);
    function OutsItemRenderer() {
        var _this = _super.call(this) || this;
        /**
         * 子列表
        */
        _this.list = new eui.List();
        _this.skinName = UIRendererSkinName.OutsItemRenderer;
        return _this;
    }
    OutsItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.bindData) {
            this.dirBtn.touchEnabled = false;
            var date = new Date(this.bindData.time * 1000);
            var today = new Date();
            var todayLastTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59).getTime();
            if (this.bindData.time <= Math.floor(todayLastTime / 1000)) {
                this.dateLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
            }
            else {
                this.dateLabel.text = "今天";
            }
            this.timeLabel.text = qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
            this.nameLabel.text = this.bindData.name;
            this.rankLabel.text = "冠军";
            this.userNameLabel.text = this.bindData.rankList[0].name;
            this.awardLabel.text = this.bindData.rankList[0].award;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getOutsRankInfo, this);
        }
    };
    OutsItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getOutsRankInfo, this);
    };
    /**
     * 设置最近赛况点击触发的操作事件
     * 获取被点击的最近赛况的排名信息
    */
    OutsItemRenderer.prototype.getOutsRankInfo = function (event) {
        SoundManager.playEffect(MusicAction.buttonClick);
        ChampionshipManager.recentMTTId = this.bindData.id;
        if (this.bindData.rankList.length < 2) {
            ChampionshipManager.reqGetRankList(this.bindData.recordId);
        }
        else {
            ChampionshipManager.OnGetRankListEvent.dispatch(this.bindData.recordId);
        }
    };
    return OutsItemRenderer;
}(BaseItemRenderer));
__reflect(OutsItemRenderer.prototype, "OutsItemRenderer");
//# sourceMappingURL=OutsItemRenderer.js.map