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
var BaseFriendInfo = (function (_super) {
    __extends(BaseFriendInfo, _super);
    function BaseFriendInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 头像宽高
        */
        _this.width = 100;
        _this.height = 100;
        return _this;
    }
    BaseFriendInfo.prototype.copyValueFrom = function (data) {
        this.reset();
        _super.prototype.copyValueFrom.call(this, data);
        if (!data["head"]) {
            this.head = SheetSubName.getdefaultHead(this.sex);
        }
    };
    Object.defineProperty(BaseFriendInfo.prototype, "head", {
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
    BaseFriendInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return BaseFriendInfo;
}(BaseServerValueInfo));
__reflect(BaseFriendInfo.prototype, "BaseFriendInfo", ["IBaseHead"]);
//# sourceMappingURL=BaseFriendInfo.js.map