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
 * 无座玩家信息
 */
var HundredWarNoSeatInfo = (function (_super) {
    __extends(HundredWarNoSeatInfo, _super);
    function HundredWarNoSeatInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HundredWarNoSeatInfo.prototype, "head", {
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
    return HundredWarNoSeatInfo;
}(BaseServerValueInfo));
__reflect(HundredWarNoSeatInfo.prototype, "HundredWarNoSeatInfo", ["IBaseHead"]);
//# sourceMappingURL=HundredWarNoSeatInfo.js.map