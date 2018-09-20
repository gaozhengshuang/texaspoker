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
 * 坐下位置转动
 */
var GamblingPanelPitTurnSupport = (function (_super) {
    __extends(GamblingPanelPitTurnSupport, _super);
    function GamblingPanelPitTurnSupport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamblingPanelPitTurnSupport.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        if (!this._absolutePosList) {
            this._absolutePosList = new Array();
            for (var i = 0; i < 10; i++) {
                this._absolutePosList.push(new egret.Point());
            }
        }
        var pos;
        var pInfo;
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pInfo = GamblingManager.getPlayerInfoByPos(i);
            pitInfo = this.target.getPitInfoByIndex(i);
            pitInfo.headComponent.init(pInfo);
            pitInfo.headComponent.visible = true;
        }
        pitInfo = null;
        if (GamblingManager.self) {
            var virtualPitIndex = void 0;
            pitInfo = this.target.getPitInfo(GamblingManager.self.pos);
            this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
            if (this._isClockwise) {
                this._offset = Math.abs(GamblingManager.maxSeats - pitInfo.index) + 1;
            }
            else {
                this._offset = Math.abs(GamblingPanelSetting.MinPitIndex - pitInfo.index);
            }
            var list = GamblingPanelSetting.getHeadPosList();
            for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
                pitInfo = this.target.pitList[i - 1];
                if (this._isClockwise) {
                    virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
                }
                else {
                    virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._offset);
                }
                pitInfo.index = virtualPitIndex;
                pitInfo.headComponent.refreshChipsShow(pitInfo.index, GamblingManager.maxSeats);
                pitInfo.headComponent.posIndex = virtualPitIndex;
                pitInfo.headComponent.showGroupAuto(true);
                this.setPos(pitInfo);
            }
        }
        else {
            var list = GamblingPanelSetting.getHeadPosList();
            if (list) {
                for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
                    pitInfo = this.target.getPitInfo(i);
                    this.setPos(pitInfo);
                    pitInfo.headComponent.refreshChipsShow(i, GamblingManager.maxSeats);
                }
            }
        }
    };
    /**
     * 根据索引设置位置
     */
    GamblingPanelPitTurnSupport.prototype.setPos = function (pitInfo) {
        this.clearHeadCptReleative(pitInfo.headComponent);
        var list = GamblingPanelSetting.getHeadPosList();
        var p = list[pitInfo.index];
        if (pitInfo.index == 1) {
            pitInfo.headComponent.horizontalCenter = p.x;
            pitInfo.headComponent.bottom = p.y;
        }
        else {
            pitInfo.headComponent.horizontalCenter = p.x;
            switch (GamblingManager.maxSeats) {
                case SeatMode.Three:
                    this.adaptivePit(pitInfo.headComponent, 1);
                    break;
                case SeatMode.Five:
                    if (pitInfo.index == 3 || pitInfo.index == 4) {
                        // pitInfo.headComponent.verticalCenter = p.y;
                        this.adaptivePit(pitInfo.headComponent, 0);
                    }
                    else {
                        this.adaptivePit(pitInfo.headComponent, 2);
                        // pitInfo.headComponent.bottom = p.y;
                    }
                    break;
                case SeatMode.Six:
                    if (pitInfo.index == 4) {
                        pitInfo.headComponent.top = p.y;
                    }
                    if (pitInfo.index == 3 || pitInfo.index == 5) {
                        // pitInfo.headComponent.verticalCenter = p.y;
                        this.adaptivePit(pitInfo.headComponent, 0);
                    }
                    else {
                        this.adaptivePit(pitInfo.headComponent, 2);
                        // pitInfo.headComponent.bottom = p.y;
                    }
                    break;
                case SeatMode.Nine:
                    if (pitInfo.index == 5 || pitInfo.index == 6) {
                        pitInfo.headComponent.top = p.y;
                    }
                    else if (pitInfo.index == 4 || pitInfo.index == 7) {
                        this.adaptivePit(pitInfo.headComponent, 0);
                    }
                    else if (pitInfo.index == 3 || pitInfo.index == 8) {
                        this.adaptivePit(pitInfo.headComponent, 1);
                    }
                    else if (pitInfo.index == 2 || pitInfo.index == 9) {
                        this.adaptivePit(pitInfo.headComponent, 2);
                    }
                    break;
            }
        }
    };
    GamblingPanelPitTurnSupport.prototype.adaptivePit = function (target, count) {
        var top = GamblingPanelSetting.headTopBottomReleativePoint.x;
        var bottom = GamblingPanelSetting.headTopBottomReleativePoint.y;
        var h = GameManager.stage.stageHeight;
        var fitH = h - top - bottom;
        h = fitH * (1 - 0.1);
        var step = Math.floor(h / 3);
        if (count == 1) {
            target.y = top + fitH * 0.11 + step * 0.7;
        }
        else {
            target.y = top + fitH * 0.11 + step * count;
        }
    };
    GamblingPanelPitTurnSupport.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        GamblingManager.SitOrStandEvent.addListener(this.onSitOrStand, this);
        GameManager.stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
    };
    GamblingPanelPitTurnSupport.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        GamblingManager.SitOrStandEvent.removeListener(this.onSitOrStand, this);
        GameManager.stage.removeEventListener(egret.Event.RESIZE, this.resizeHandler, this);
    };
    GamblingPanelPitTurnSupport.prototype.onSitOrStand = function (obj) {
        if (this.isDisabled) {
            qin.Console.log("异步不显示自己的手牌");
            return;
        }
        var pitInfo = this.target.getPitInfo(obj.pInfo.pos);
        if (obj.state == BuyInGameState.Sit && obj.pInfo.roleId == UserManager.userInfo.roleId) {
            this._isClockwise = pitInfo.index > GamblingPanelSetting.centerNum;
            if (this._isClockwise) {
                this._offset = Math.abs(GamblingManager.maxSeats - pitInfo.index) + 1;
            }
            else {
                this._offset = Math.abs(GamblingPanelSetting.MinPitIndex - pitInfo.index);
            }
            this._nowRunIndex = 0;
            if (this._offset > 0) {
                this.target.buttonPosFlagImg.visible = false;
                for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
                    var childPit = _a[_i];
                    childPit.headComponent.showStateGroup(false); //坐下的时候隐藏状态组，因为状态组分左右显示，转动的时候显示有点怪
                }
                var p = void 0;
                for (var i = 1; i <= GamblingManager.maxSeats; i++) {
                    p = this._absolutePosList[i];
                    pitInfo = this.target.getPitInfoByIndex(i);
                    p.x = pitInfo.headComponent.x;
                    p.y = pitInfo.headComponent.y;
                    // qin.QinLog.log("点：" + p.x, p.y, pitInfo.headComponent.hashCode);
                }
                this.runNext();
            }
            else {
                var com = this.target.getHeadComponentByRole(UserManager.userInfo.roleId);
                if (com) {
                    this.target.showDownEffect(com.playerGroup);
                }
            }
        }
    };
    /**
     * 重置舞台大小
     */
    GamblingPanelPitTurnSupport.prototype.resizeHandler = function (event) {
        var pitInfo;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = this.target.pitList[i - 1];
            this.setPos(pitInfo);
        }
        this.target.refreshButtonPos();
    };
    GamblingPanelPitTurnSupport.prototype.runNext = function () {
        if (this.isDisabled) {
            return;
        }
        var point;
        var virtualPitIndex;
        var pitInfo;
        this._nowRunIndex++;
        for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
            pitInfo = this.target.pitList[i - 1];
            if (this._isClockwise) {
                virtualPitIndex = GamblingPanelSetting.getNextIndex(pitInfo.index, this._nowRunIndex);
            }
            else {
                virtualPitIndex = GamblingPanelSetting.getPreIndex(pitInfo.index, this._nowRunIndex);
            }
            point = this._absolutePosList[virtualPitIndex];
            /**
             * 将相对布局属性 清空 做动画旋转用
             */
            this.clearHeadCptReleative(pitInfo.headComponent);
            if (i == GamblingManager.maxSeats) {
                pitInfo.headComponent.turnAnim.run(point.x, point.y, this.tryRunNext, this);
            }
            else {
                pitInfo.headComponent.turnAnim.run(point.x, point.y, null, null);
            }
            pitInfo.headComponent.posIndex = virtualPitIndex;
        }
    };
    GamblingPanelPitTurnSupport.prototype.tryRunNext = function () {
        if (this.isDisabled) {
            return;
        }
        if (this._nowRunIndex >= this._offset) {
            var pitInfo = void 0;
            for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
                pitInfo = this.target.pitList[i - 1];
                //移动完毕改变坑位的索引 位置变了，最下面的坑位始终要在1号位
                if (this._isClockwise) {
                    pitInfo.index = GamblingPanelSetting.getNextIndex(pitInfo.index, this._offset);
                }
                else {
                    pitInfo.index = GamblingPanelSetting.getPreIndex(pitInfo.index, this._offset);
                }
                pitInfo.headComponent.refreshChipsShow(pitInfo.index, GamblingManager.maxSeats);
                pitInfo.headComponent.turnAnim.callBack = null;
            }
            this.target.setPit(); //重新设置坑位信息
            for (var i = GamblingPanelSetting.MinPitIndex; i <= GamblingManager.maxSeats; i++) {
                pitInfo = this.target.pitList[i - 1];
                this.setPos(pitInfo); //旋转完毕重新设置位置属性
            }
            var com = this.target.getHeadComponentByRole(UserManager.userInfo.roleId);
            if (com) {
                this.target.showDownEffect(com.playerGroup);
            }
            for (var _i = 0, _a = this.target.pitList; _i < _a.length; _i++) {
                var pitInfo_1 = _a[_i];
                pitInfo_1.headComponent.showGroupAuto(false); //转动完毕显示 聊天or状态气泡
            }
            this.target.refreshButtonPos(); //刷新按钮位置显示
        }
        else {
            this.runNext();
        }
    };
    GamblingPanelPitTurnSupport.prototype.clearHeadCptReleative = function (target) {
        target.top = target.bottom = target.horizontalCenter = target.verticalCenter = undefined;
    };
    return GamblingPanelPitTurnSupport;
}(BaseGamblingPanelSupport));
__reflect(GamblingPanelPitTurnSupport.prototype, "GamblingPanelPitTurnSupport");
//# sourceMappingURL=GamblingPanelPitTurnSupport.js.map