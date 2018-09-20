var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 比赛消息处理
 */
var MatchNewsLogic = (function () {
    function MatchNewsLogic(target) {
        this._blindAddVc = undefined;
        this._alertTop = undefined;
        this._target = target;
    }
    MatchNewsLogic.prototype.initialize = function () {
        var isChangeRoom = false;
        this._isShow = undefined;
        var state = this._target.panelState;
        var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
        if (this._blindAddVc == undefined) {
            this._blindAddVc = blindComponent.blindAddAlertGroup.verticalCenter;
        }
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        if (blindComponent.blindAddAlertGroup.parent) {
            blindComponent.blindAddAlertGroup.parent.removeChild(blindComponent.blindAddAlertGroup);
        }
        blindComponent.championshipAlertGroup.touchEnabled = false;
        blindComponent.championshipAlertGroup.touchChildren = false;
        blindComponent.championshipAlertGroup.visible = false;
        this.clearAllAlert();
    };
    MatchNewsLogic.prototype.showTween = function (text) {
        var state = this._target.panelState;
        var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        blindComponent.championshipAlertGroup.visible = false;
        this._isShow = true;
        blindComponent.championshipAlertLabel.text = text;
        blindComponent.championshipAlertGroup.visible = true;
        if (this._alertTop == undefined) {
            this._alertTop = blindComponent.championshipAlertGroup.top;
        }
        var moveDis = this._alertTop - blindComponent.championshipAlertGroup.height;
        blindComponent.championshipAlertGroup.top = moveDis;
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        var tween = egret.Tween.get(blindComponent.championshipAlertGroup);
        tween.to({ top: this._alertTop }, 400).wait(4000).to({ top: moveDis }, 400).call(this.onMyTweenOver, this);
        tween.play();
    };
    MatchNewsLogic.prototype.onDisable = function () {
        var state = this._target.panelState;
        var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
        egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        this.clearAllAlert();
    };
    MatchNewsLogic.prototype.onMyTweenOver = function () {
        this._isShow = false;
        var text = this.checkShow();
        if (text) {
            this.showTween(text);
        }
        else {
            var state = this._target.panelState;
            var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
            blindComponent.championshipAlertGroup.visible = false;
        }
    };
    MatchNewsLogic.prototype.clearAllAlert = function (isHide) {
        if (isHide === void 0) { isHide = true; }
        qin.ArrayUtil.Clear(this._alertList);
        if (isHide) {
            var state = this._target.panelState;
            var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
            blindComponent.championshipAlertGroup.visible = false;
            egret.Tween.removeTweens(blindComponent.championshipAlertGroup);
            egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        }
    };
    MatchNewsLogic.prototype.showAlert = function (type, text) {
        if (text === void 0) { text = undefined; }
        if (!type) {
            return;
        }
        if (!this._isShow) {
            var text_1 = this.getNewsText(type);
            if (!text_1) {
                return;
            }
            this.showTween(text_1);
        }
        else {
            if (!this._alertList) {
                this._alertList = new Array();
            }
            this._alertList.push(type);
            this._alertList.sort(this.sortAlert);
        }
    };
    MatchNewsLogic.prototype.checkShow = function () {
        if (this._alertList) {
            var num = this._alertList.length;
            for (var i = 0; i < num; i++) {
                if (this._alertList.length <= 0) {
                    return null;
                }
                var type = this._alertList[0];
                this._alertList.splice(0, 1);
                var text = this.getNewsText(type);
                if (text) {
                    return text;
                }
            }
        }
        return null;
    };
    MatchNewsLogic.prototype.getNewsText = function (type) {
        switch (type) {
            case ChampionshipRoomUIAlertType.InAward:
                return "恭喜您进入奖励圈";
            case ChampionshipRoomUIAlertType.InFinals:
                return "恭喜您进入比赛最终桌,继续加油哦";
            case ChampionshipRoomUIAlertType.LeftNumChange:
                if (GamblingManager.matchRoomInfo && GamblingManager.matchRoomInfo.leftJoin) {
                    var time = Math.round((TimeManager.GetServerUtcTimestamp() - GamblingManager.matchRoomInfo.startTime) / 60);
                    return qin.StringUtil.format("比赛进行{0}分钟,剩余比赛人数:{1}", time, GamblingManager.matchRoomInfo.leftJoin);
                }
            case ChampionshipRoomUIAlertType.ChangeRoom:
                return "为了公平起见,已为您重新配桌";
        }
        return null;
    };
    MatchNewsLogic.prototype.sortAlert = function (a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };
    MatchNewsLogic.prototype.showAddBlind = function (text) {
        var state = this._target.panelState;
        var blindComponent = state.getCompoent(GamblingMatchBlindComponent);
        blindComponent.blindAddLabel.text = text;
        egret.Tween.removeTweens(blindComponent.blindAddAlertGroup);
        var tween = egret.Tween.get(blindComponent.blindAddAlertGroup);
        blindComponent.blindAddAlertGroup.verticalCenter = this._blindAddVc;
        blindComponent.blindAddAlertGroup.alpha = 1;
        blindComponent.blindAddAlertImage.width = blindComponent.blindAddLabel.width + 30;
        blindComponent.addChild(blindComponent.blindAddAlertGroup);
        tween.wait(1700).to({ verticalCenter: this._blindAddVc - 70, alpha: 0 }, 1300).call(function () {
            if (blindComponent.blindAddAlertGroup.parent) {
                blindComponent.blindAddAlertGroup.parent.removeChild(blindComponent.blindAddAlertGroup);
            }
        });
    };
    return MatchNewsLogic;
}());
__reflect(MatchNewsLogic.prototype, "MatchNewsLogic");
//# sourceMappingURL=MatchNewsLogic.js.map