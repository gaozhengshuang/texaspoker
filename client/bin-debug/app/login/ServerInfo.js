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
/// <summary>
/// 服务器信息
/// </summary>
var ServerInfo = (function (_super) {
    __extends(ServerInfo, _super);
    function ServerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// 当前服务器角色id，没有为0
        /// </summary>
        _this.roleId = 0;
        return _this;
    }
    Object.defineProperty(ServerInfo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInfo.prototype, "isCrowded", {
        /// <summary>
        /// 是否是拥挤
        /// </summary>
        get: function () {
            return this._count > ProjectDefined.GetInstance().getValue(ProjectDefined.serverCrowded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerInfo.prototype, "count", {
        set: function (value) {
            this._count = value;
        },
        enumerable: true,
        configurable: true
    });
    ServerInfo.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return ServerInfo;
}(BaseServerValueInfo));
__reflect(ServerInfo.prototype, "ServerInfo");
//# sourceMappingURL=ServerInfo.js.map