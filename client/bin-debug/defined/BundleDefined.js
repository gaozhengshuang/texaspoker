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
 * 安装包/web 定义
 * */
var BundleDefined = (function (_super) {
    __extends(BundleDefined, _super);
    function BundleDefined() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BundleDefined.GetInstance = function () {
        if (BundleDefined._instance == null) {
            BundleDefined._instance = new BundleDefined();
        }
        if (DefinedManager.IsParsed(BundleDefined.bundleConfig) == false) {
            BundleDefined._instance.initialize();
        }
        return BundleDefined._instance;
    };
    BundleDefined.prototype.initialize = function () {
        this.dataList = DefinedManager.GetData(BundleDefined.bundleConfig);
    };
    /**
     * 从web版url参数bid获取
     */
    BundleDefined.prototype.getDefinitionByWebBid = function (id) {
        if (this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                var item = this.dataList[i];
                if (item.id == id) {
                    return item;
                }
            }
        }
        return null;
    };
    BundleDefined.prototype.getDefinitionByBundleId = function (bundleId) {
        if (bundleId && this.dataList != null) {
            for (var i = 0; i < this.dataList.length; i++) {
                var item = this.dataList[i];
                if (item.bundleId == bundleId) {
                    return item;
                }
            }
        }
        return null;
    };
    /**
     * 默认的包ID
     */
    BundleDefined.DefaultID = 1;
    BundleDefined.bundleConfig = "bundle";
    return BundleDefined;
}(BaseDefined));
__reflect(BundleDefined.prototype, "BundleDefined");
var BundleDefinition = (function () {
    function BundleDefinition() {
    }
    return BundleDefinition;
}());
__reflect(BundleDefinition.prototype, "BundleDefinition", ["IBaseDefintion"]);
//# sourceMappingURL=BundleDefined.js.map