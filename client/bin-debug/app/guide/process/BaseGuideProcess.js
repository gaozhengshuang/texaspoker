var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 引导步骤处理器
 */
var BaseGuideProcess = (function () {
    function BaseGuideProcess() {
        this.comleteEvent = new qin.DelegateDispatcher();
    }
    BaseGuideProcess.prototype.init = function (definition, par) {
        this.definition = definition;
        this.parent = par;
        if (!this.definition) {
            qin.Console.logError("新手引导步骤处理数据配置异常！类：" + egret.getQualifiedClassName(this));
        }
    };
    BaseGuideProcess.prototype.complete = function () {
        this.comleteEvent.dispatch(this);
    };
    return BaseGuideProcess;
}());
__reflect(BaseGuideProcess.prototype, "BaseGuideProcess");
//# sourceMappingURL=BaseGuideProcess.js.map