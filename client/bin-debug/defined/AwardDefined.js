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
 * 兑换奖品的定义
 * */
var AwardDefined = (function (_super) {
    __extends(AwardDefined, _super);
    function AwardDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwardDefined.GetInstance = function () {
        if (!AwardDefined._instance) {
            AwardDefined._instance = new AwardDefined();
        }
        if (DefinedManager.IsParsed(AwardDefined.awardConfig) == false) {
            AwardDefined._instance.initialize();
        }
        return AwardDefined._instance;
    };
    AwardDefined.prototype.initialize = function () {
        this.awardDefinitionDic = new qin.Dictionary();
        this.dataList = DefinedManager.GetData(AwardDefined.awardConfig);
        for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
            var def = _a[_i];
            this.setAwardInfoDefinitionList(def);
            this.awardDefinitionDic.add(def.id, def);
        }
    };
    AwardDefined.prototype.setAwardInfoDefinitionList = function (awardDef) {
        if (awardDef["costType"]) {
            awardDef.costList = new Array();
            for (var i = 0; i < awardDef["costType"].length; i++) {
                var cost = new AwardInfoDefinition();
                cost.type = awardDef["costType"][i];
                if (awardDef["costId"]) {
                    cost.id = awardDef["costId"][i];
                }
                if (awardDef["costNum"]) {
                    cost.count = awardDef["costNum"][i];
                }
                awardDef.costList.push(cost);
            }
        }
        if (awardDef["rewardType"]) {
            awardDef.rewardList = new Array();
            for (var i = 0; i < awardDef["rewardType"].length; i++) {
                var reward = new AwardInfoDefinition();
                reward.type = awardDef["rewardType"][i];
                if (awardDef["rewardId"]) {
                    reward.id = awardDef["rewardId"][i];
                }
                if (awardDef["rewardNum"]) {
                    reward.count = awardDef["rewardNum"][i];
                }
                awardDef.rewardList.push(reward);
            }
        }
    };
    /**
     * 获取某一兑换ID前置ID列表是否空
     */
    AwardDefined.prototype.getPrevIdIsNull = function (id) {
        var def = this.getDefinition(id);
        if (def) {
            return def.preId == null;
        }
        return false;
    };
    /**
     * 根据awardid获得奖励名字
    */
    AwardDefined.prototype.getAwardNameById = function (id, isShowquantifier) {
        if (isShowquantifier === void 0) { isShowquantifier = false; }
        var award = AwardDefined.GetInstance().getDefinition(id);
        if (award && award.rewardList) {
            var len = award.rewardList.length;
            var str = "";
            for (var i = 0; i < len; i++) {
                var itemDef = ItemDefined.GetInstance().getDefinition(award.rewardList[i].id);
                var name_1 = void 0;
                if (itemDef) {
                    name_1 = itemDef.name;
                }
                var count = award.rewardList[i].count;
                if (name_1 && count) {
                    if (count < 100) {
                        if (isShowquantifier) {
                            str += name_1 + count + "个";
                        }
                        else {
                            str += name_1;
                        }
                    }
                    else {
                        str += qin.MathUtil.formatNum(count) + name_1;
                    }
                    if (award.rewardList && i < len - 1) {
                        str += "、";
                    }
                }
            }
            return str;
        }
        return null;
    };
    /**
     * 根据awardId获得奖励数量
    */
    AwardDefined.prototype.getAwardNumByAwardId = function (id) {
        var award = AwardDefined.GetInstance().getDefinition(id);
        var num = 0;
        if (award && award.rewardList) {
            for (var i = 0; i < award.rewardList.length; i++) {
                var count = award.rewardList[i].count;
                num += count;
            }
        }
        return num;
    };
    /**
     * 根据preId获得award信息
    */
    AwardDefined.prototype.getAwardInfoByPreId = function (preId) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].preId == preId) {
                    return this.dataList[i];
                }
            }
        }
        return null;
    };
    AwardDefined.awardConfig = "award";
    return AwardDefined;
}(BaseDefined));
__reflect(AwardDefined.prototype, "AwardDefined");
/**
 * 奖品的定义
 * */
var AwardDefinition = (function () {
    function AwardDefinition() {
    }
    return AwardDefinition;
}());
__reflect(AwardDefinition.prototype, "AwardDefinition", ["IBaseDefintion"]);
/**
 *  配表中奖励的结构体封装
 */
var AwardInfoDefinition = (function () {
    function AwardInfoDefinition() {
    }
    return AwardInfoDefinition;
}());
__reflect(AwardInfoDefinition.prototype, "AwardInfoDefinition");
//# sourceMappingURL=AwardDefined.js.map