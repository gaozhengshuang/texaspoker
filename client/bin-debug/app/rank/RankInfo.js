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
var RankInfo = (function (_super) {
    __extends(RankInfo, _super);
    function RankInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RankInfo.prototype.copyValueFrom = function (data) {
        _super.prototype.copyValueFrom.call(this, data);
        if (!data["head"]) {
            this.head = SheetSubName.getdefaultHead(this.sex);
        }
    };
    RankInfo.prototype.reset = function () {
        this.roleId = 0;
        this.name = qin.StringConstants.Empty;
        this.score = 0;
        this.rank = 0;
        this.sex = 0;
        this.head = SheetSubName.Default_Head_Male;
        this.change = RankChange.NoChange;
    };
    Object.defineProperty(RankInfo.prototype, "head", {
        get: function () {
            if (qin.StringUtil.isNullOrEmpty(this._head)) {
                return SheetSubName.getdefaultHead(this.sex);
            }
            else {
                return this._head;
            }
        },
        set: function (value) {
            if (qin.StringUtil.isNullOrEmpty(value) == false) {
                value = value.split(GameSetting.HeadUploadVerifySign)[0];
            }
            this._head = value;
        },
        enumerable: true,
        configurable: true
    });
    return RankInfo;
}(BaseServerValueInfo));
__reflect(RankInfo.prototype, "RankInfo", ["IBaseHead"]);
//# sourceMappingURL=RankInfo.js.map