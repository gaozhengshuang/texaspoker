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
 * 随机昵称
*/
var NameDefined = (function (_super) {
    __extends(NameDefined, _super);
    function NameDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NameDefined.GetInstance = function () {
        if (!NameDefined._instance) {
            NameDefined._instance = new NameDefined();
        }
        if (DefinedManager.IsParsed(NameDefined.nameConfig) == false) {
            NameDefined._instance.initialize();
        }
        return NameDefined._instance;
    };
    NameDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(NameDefined.nameConfig);
        if (this.dataList && this.dataList.length > 0) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (!this._lastNameRange) {
                    if (!def.name) {
                        this._lastNameRange = def.id - 1;
                    }
                }
                if (!this._boyFirstNameRange) {
                    if (!def.boy) {
                        this._boyFirstNameRange = def.id - 1;
                    }
                }
            }
            if (!(this._lastNameRange || this._boyFirstNameRange)) {
                qin.Console.log("获取姓名或男孩名范围失败");
            }
        }
    };
    /**
     * 获取随机昵称
    */
    NameDefined.prototype.getRandomNickName = function (sex) {
        sex = sex < Sex.Female ? Sex.Male : Sex.Female;
        //姓
        var firstNameIndex = qin.MathUtil.getRandom(0, this._lastNameRange - 1);
        var firstName = this.dataList[firstNameIndex].name;
        //名
        var lastName;
        if (sex == Sex.Male) {
            var index = qin.MathUtil.getRandom(0, this._boyFirstNameRange - 1);
            var def = this.dataList[index];
            lastName = def.boy;
        }
        else {
            var index = qin.MathUtil.getRandom(0, this.dataList.length - 1);
            var def = this.dataList[index];
            lastName = def.girl;
        }
        return firstName.trim() + lastName.trim();
    };
    NameDefined.nameConfig = "name";
    return NameDefined;
}(BaseDefined));
__reflect(NameDefined.prototype, "NameDefined");
/**
* 随机昵称的定义
*/
var NameDefinition = (function () {
    function NameDefinition() {
    }
    return NameDefinition;
}());
__reflect(NameDefinition.prototype, "NameDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=NameDefined.js.map