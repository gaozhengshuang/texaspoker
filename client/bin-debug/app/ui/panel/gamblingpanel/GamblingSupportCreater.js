var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 为牌局创建spt
 */
var GamblingSupportCreater = (function () {
    function GamblingSupportCreater(context) {
        this._context = context;
    }
    Object.defineProperty(GamblingSupportCreater.prototype, "pitDataSupport", {
        get: function () {
            return this._pitDataSupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "moveSpt", {
        get: function () {
            return this._moveSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "buttonPosSpt", {
        get: function () {
            return this._buttonPosSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "actionSpt", {
        get: function () {
            return this._actionSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "flopCardSpt", {
        get: function () {
            return this._flopCardSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "infoRefreshSpt", {
        get: function () {
            return this._infoRefreshSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "oneLoopOverSpt", {
        get: function () {
            return this._oneLoopOverSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "pitTurnSpt", {
        get: function () {
            return this._pitTurnSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "sitDownAndAddCoin", {
        get: function () {
            return this._sitDownAndAddCoin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "funcSupport", {
        get: function () {
            return this._funcSupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "roundOverSpt", {
        get: function () {
            return this._roundOverSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "championshipWaitSpt", {
        get: function () {
            return this._championshipWaitSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "championshipSupport", {
        get: function () {
            return this._championshipSupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "guidePlayWaySupport", {
        get: function () {
            return this._guidePlayWaySupport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "guideSpt", {
        get: function () {
            return this._guideSpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportNormalList", {
        get: function () {
            return this._supportNomalList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportGuideList", {
        get: function () {
            return this._supportGuideList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportGuidePlayWayList", {
        get: function () {
            return this._supportGuidePlayWayList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportMatchWaitList", {
        get: function () {
            return this._supportMatchWaitList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportMatchList", {
        get: function () {
            return this._supportMatchList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportSngWaitList", {
        get: function () {
            return this._supportSngWaitList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportSngList", {
        get: function () {
            return this._supportSngList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamblingSupportCreater.prototype, "supportOmahaList", {
        get: function () {
            return this._supportOmahaList;
        },
        enumerable: true,
        configurable: true
    });
    GamblingSupportCreater.prototype.createNormal = function () {
        if (!this._supportNomalList) {
            this.createMoveFunc();
            this._pitDataSupport = new GamblingPanelPitDataSupport(this._context);
            this._buttonPosSpt = new GamblingPanelButtonPosSupport(this._context);
            this._actionSpt = new GamblingPanelActionSupport(this._context);
            this._flopCardSpt = new GamblingPanelFlopCardSupport(this._context);
            this._infoRefreshSpt = new GamblingPanelInfoRefreshSupport(this._context);
            this._oneLoopOverSpt = new GamblingPanelOneLoopOverSupport(this._context);
            this._pitTurnSpt = new GamblingPanelPitTurnSupport(this._context);
            this._sitDownAndAddCoin = new GamblingPanelSitDownAndAddCoinSupport(this._context);
            this._roundOverSpt = new GamblingPanelRoundOverSupport(this._context);
            this._oneLoopOverSpt.onLoopOverCallback = qin.Delegate.getOut(this._roundOverSpt.startRunRoundOverOper, this._roundOverSpt);
            this._oneLoopOverSpt.onBoardCardApearComplete = qin.Delegate.getOut(this._actionSpt.setBoardCardOverFlag, this._actionSpt);
            this._supportNomalList = new Array();
            this._supportNomalList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt, this._moveSpt, this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._sitDownAndAddCoin, this._funcSupport, this._buttonPosSpt, this._roundOverSpt);
        }
    };
    GamblingSupportCreater.prototype.createMttWait = function () {
        if (!this._supportMatchWaitList) {
            this._supportMatchWaitList = new Array();
            this.createMoveFunc();
            this._championshipWaitSpt = new ChampionshipWaitSupport(this._context);
            this._supportMatchWaitList.push(this._moveSpt, this._funcSupport, this._championshipWaitSpt);
        }
    };
    GamblingSupportCreater.prototype.createMoveFunc = function () {
        if (!this._moveSpt) {
            this._moveSpt = new GamblingPanelMoveSupport(this._context);
            this._funcSupport = new GamblingPanelFuncSupport(this._context);
        }
    };
    GamblingSupportCreater.prototype.createMtt = function () {
        if (!this._supportMatchList) {
            this.createNormal();
            this._supportMatchList = this._supportNomalList.concat();
            this._championshipSupport = new GamblingPanelMatchSupport(this._context);
            this._supportMatchList.push(this._championshipSupport);
        }
    };
    /**
     * 奥马哈
     */
    GamblingSupportCreater.prototype.createOmaha = function () {
        if (!this._supportOmahaList) {
            this.createNormal();
            this._supportOmahaList = this._supportNomalList.concat();
        }
    };
    GamblingSupportCreater.prototype.createGuide = function () {
        if (!this._supportGuideList) {
            this._supportGuideList = new Array();
            this.createNormal();
            this._guideSpt = new GamblingPanelGuideSupport(this._context);
            this._supportGuideList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt, this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._buttonPosSpt, this._roundOverSpt, this._guideSpt);
        }
    };
    GamblingSupportCreater.prototype.createGuidePlayWay = function () {
        if (!this._supportGuidePlayWayList) {
            this._supportGuidePlayWayList = new Array();
            this.createNormal();
            this._guidePlayWaySupport = new GamblingPanelGuidePlayWaySupport(this._context);
            this._supportGuidePlayWayList.push(this._actionSpt, this._flopCardSpt, this._infoRefreshSpt, this._oneLoopOverSpt, this._pitTurnSpt, this._pitDataSupport, this._buttonPosSpt, this._guidePlayWaySupport);
        }
    };
    return GamblingSupportCreater;
}());
__reflect(GamblingSupportCreater.prototype, "GamblingSupportCreater");
//# sourceMappingURL=GamblingSupportCreater.js.map