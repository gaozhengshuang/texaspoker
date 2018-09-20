var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BundleManager = (function () {
    function BundleManager() {
    }
    /**
     * 获取当前包配置
     */
    BundleManager.getBundleDefinition = function () {
        if (BundleManager._definition == null) {
            if (qin.System.isWeb) {
                var bid = URLOption.getNumber(URLOption.Bid);
                if (!bid) {
                    bid = BundleDefined.DefaultID;
                }
                BundleManager._definition = BundleDefined.GetInstance().getDefinitionByWebBid(bid);
            }
            else {
                BundleManager._definition = BundleDefined.GetInstance().getDefinitionByBundleId(ChannelManager.bundleId);
            }
            if (BundleManager._definition == null) {
                AlertManager.showAlertByString('没有配置包ID');
                throw new Error('没有配置包ID');
            }
            if (qin.StringUtil.isNullOrEmpty(BundleManager._definition.bundleId) == false && qin.StringUtil.isNullOrEmpty(BundleManager._definition.url)) {
                AlertManager.showAlertByString('安装包必须要配置包url');
                throw new Error('安装包必须要配置包url');
            }
        }
        return BundleManager._definition;
    };
    /**
     * 获取数字包ID，每个包唯一的数字标识
     */
    BundleManager.getBid = function () {
        var def = BundleManager.getBundleDefinition();
        if (def) {
            return def.id;
        }
        return BundleDefined.DefaultID;
    };
    /**
     * 获取支付状态
     */
    BundleManager.getPayState = function () {
        var def = BundleManager.getBundleDefinition();
        if (def) {
            return def.pay;
        }
        return PayState.Normal;
    };
    /**
     * 获取安装包下载地址
     */
    BundleManager.getUrl = function () {
        var def = BundleManager.getBundleDefinition();
        if (def) {
            return def.url;
        }
        return qin.StringConstants.Empty;
    };
    /**
     * 根据操作系统获取下载地址
     */
    BundleManager.getUrlByOS = function () {
        var def = BundleManager.getBundleDefinition();
        if (def) {
            var os = qin.RuntimeTypeName.getOSName();
            var bundleDef = void 0;
            if (os == qin.RuntimeTypeName.Android) {
                bundleDef = BundleDefined.GetInstance().getDefinition(def.android);
            }
            else if (os == qin.RuntimeTypeName.Ios) {
                bundleDef = BundleDefined.GetInstance().getDefinition(def.ios);
            }
            if (bundleDef) {
                return bundleDef.url;
            }
        }
        return qin.StringConstants.Empty;
    };
    /**
     * 根据原始资源名获取包对应的资源名
     */
    BundleManager.getResNameByBundle = function (name) {
        return ResPrefixPathName.Bundle + BundleManager.getBid() + "/" + name;
    };
    /**
     * 应用icon
     */
    BundleManager.getAppIconPng = function () {
        return PathName.ResourceDirectory + 'icons/' + BundleManager.getBid() + '.png';
    };
    return BundleManager;
}());
__reflect(BundleManager.prototype, "BundleManager");
//# sourceMappingURL=BundleManager.js.map