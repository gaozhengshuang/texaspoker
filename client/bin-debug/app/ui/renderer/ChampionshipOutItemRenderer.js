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
 * 锦标赛已结束赛事列表项面板
*/
var ChampionshipOutItemRenderer = (function (_super) {
    __extends(ChampionshipOutItemRenderer, _super);
    function ChampionshipOutItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = UIRendererSkinName.ChampionshipOutItemRenderer;
        return _this;
    }
    ChampionshipOutItemRenderer.prototype.updateData = function () {
        this.dataChanged();
    };
    ChampionshipOutItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (InfoUtil.checkAvailable(this.bindData)) {
            this.itemComp.init(this.bindData.definition.icon + ResSuffixName.PNG, 100);
            this.nameLabel.text = this.bindData.definition.name;
            this.numLabel.text = this.bindData.join.toString();
            this.getTimeDesAndTime();
            this.setRankImg();
            this.setAwardInfo();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
        }
    };
    ChampionshipOutItemRenderer.prototype.onDisable = function (event) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onDisable, this);
    };
    /**
     * 初始化排名图片
    */
    ChampionshipOutItemRenderer.prototype.initRankImg = function () {
        for (var i = 0; i < 4; i++) {
            this["rankImg" + i].source = "";
        }
    };
    /**
     * 写入排名图片
    */
    ChampionshipOutItemRenderer.prototype.setRankImg = function () {
        this.initRankImg();
        var str = this.bindData.rank.toString();
        if (str.length <= 4) {
            for (var i = 0; i < str.length; i++) {
                this["rankImg" + i].source = ResPrefixName.MTTListRankImage + str[i] + ResSuffixName.PNG;
            }
        }
    };
    /**
     * 获得比赛时间描述
    */
    ChampionshipOutItemRenderer.prototype.getTimeDesAndTime = function () {
        var date = new Date(this.bindData.startTime * 1000);
        var today = new Date(TimeManager.GetServerUtcTimestamp() * 1000);
        var todayLastTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
        if (this.bindData.startTime > Math.floor(todayLastTime / 1000) || this.bindData.startTime < (Math.floor(todayLastTime / 1000) - 86400)) {
            this.timeDesLabel.text = (date.getMonth() + 1) + "-" + date.getDate();
        }
        else {
            this.timeDesLabel.text = "今日";
        }
        this.timeLabel.text = qin.DateTimeUtil.formatDate(date, qin.DateTimeUtil.Format_Standard_NoSecond).split(qin.StringConstants.Blank)[1];
    };
    /**
     * 设置奖励信息
    */
    ChampionshipOutItemRenderer.prototype.setAwardInfo = function () {
        var prizeListInfo = ChampionshipManager.getAwardList(this.bindData.id);
        var des = "淘汰";
        if (prizeListInfo && prizeListInfo.length > 0) {
            for (var _i = 0, prizeListInfo_1 = prizeListInfo; _i < prizeListInfo_1.length; _i++) {
                var def = prizeListInfo_1[_i];
                if (def.start == this.bindData.rank) {
                    var name_1 = AwardDefined.GetInstance().getAwardNameById(def.awardId);
                    if (name_1) {
                        des = name_1;
                    }
                    break;
                }
            }
        }
        this.awardLabel.text = des;
    };
    return ChampionshipOutItemRenderer;
}(BaseItemRenderer));
__reflect(ChampionshipOutItemRenderer.prototype, "ChampionshipOutItemRenderer");
//# sourceMappingURL=ChampionshipOutItemRenderer.js.map