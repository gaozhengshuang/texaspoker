var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtocolManager = (function () {
    function ProtocolManager() {
    }
    /**
     * 设置协议
     */
    ProtocolManager.SetProtocolData = function (zipList) {
        for (var _i = 0, zipList_1 = zipList; _i < zipList_1.length; _i++) {
            var item = zipList_1[_i];
            if (item.name == 'loginall.bin') {
                ProtocolManager.LoginBin = item.asArrayBuffer();
            }
            else if (item.name == 'c2s.bin') {
                ProtocolManager.Gamec2sBin = item.asArrayBuffer();
            }
            else if (item.name == 's2c.bin') {
                ProtocolManager.Games2cBin = item.asArrayBuffer();
            }
            else {
                qin.Console.log("未知的协议文件:", item.name);
            }
        }
    };
    /**
     * 登陆协议文件
     */
    ProtocolManager.LoginBin = null;
    /**
     * 游戏协议文件c2s
     */
    ProtocolManager.Gamec2sBin = null;
    /**
     * 游戏协议文件s2c
     */
    ProtocolManager.Games2cBin = null;
    return ProtocolManager;
}());
__reflect(ProtocolManager.prototype, "ProtocolManager");
//# sourceMappingURL=ProtocolManager.js.map