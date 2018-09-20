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
 * 音乐音效配置表
 */
var MusicDefined = (function (_super) {
    __extends(MusicDefined, _super);
    function MusicDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicDefined.GetInstance = function () {
        if (MusicDefined._instance == null) {
            MusicDefined._instance = new MusicDefined();
        }
        if (DefinedManager.IsParsed(MusicDefined.musicConfig) == false) {
            MusicDefined._instance.initialize();
        }
        return MusicDefined._instance;
    };
    MusicDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(MusicDefined.musicConfig);
        if (this.dataList) {
            for (var _i = 0, _a = this.dataList; _i < _a.length; _i++) {
                var def = _a[_i];
                if (def.boy) {
                    def.boy = def.boy.toString().split(qin.StringConstants.Semicolon);
                }
                if (def.girl) {
                    def.girl = def.girl.toString().split(qin.StringConstants.Semicolon);
                }
            }
        }
    };
    /**
     * 根据性别、行为、牌、获取一个音效，随机
     */
    MusicDefined.prototype.getSexMusicDefinition = function (sex, action, pai) {
        var def = this.getMusicDefinition(action, pai);
        if (def) {
            var index = 0;
            if (sex == Sex.Female && def.girl) {
                index = qin.MathUtil.getRandom(0, def.girl.length - 1);
                return def.girl[index];
            }
            else if (sex == Sex.Male && def.boy) {
                index = qin.MathUtil.getRandom(0, def.boy.length - 1);
                return def.boy[index];
            }
            else {
                if (def.boy) {
                    index = qin.MathUtil.getRandom(0, def.boy.length - 1);
                    return def.boy[index];
                }
            }
        }
        return qin.StringConstants.Empty;
    };
    /**
     * 获取音效定义
     */
    MusicDefined.prototype.getMusicDefinition = function (action, pai) {
        if (!this.dataList) {
            return null;
        }
        var len = this.dataList.length;
        var def;
        if (action == "any") {
            if (pai != undefined) {
                for (var i = 0; i < len; i++) {
                    def = this.dataList[i];
                    if (def.pai == pai) {
                        return def;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                def = this.dataList[i];
                if (def.action == action) {
                    return def;
                }
            }
        }
    };
    MusicDefined.musicConfig = "music";
    return MusicDefined;
}(BaseDefined));
__reflect(MusicDefined.prototype, "MusicDefined");
/**
 * 错误码定义
 */
var MusicDefinition = (function () {
    function MusicDefinition() {
    }
    return MusicDefinition;
}());
__reflect(MusicDefinition.prototype, "MusicDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=MusicDefined.js.map