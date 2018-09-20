var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 界面显示管理
 */
var UIManager = (function () {
    function UIManager() {
    }
    Object.defineProperty(UIManager, "panelDict", {
        get: function () {
            return UIManager._panelDict;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.initialize = function (stage) {
        UIManager._gameLayer = new eui.Group();
        UIManager._mainUiLayer = new eui.Group();
        UIManager._moduleLayer = new eui.Group();
        UIManager._tipsLayer = new eui.Group();
        UIManager._guideLayer = new eui.Group();
        UIManager._warnLayer = new eui.Group();
        stage.addChild(UIManager._gameLayer);
        stage.addChild(UIManager._mainUiLayer);
        stage.addChild(UIManager._moduleLayer);
        stage.addChild(UIManager._tipsLayer);
        stage.addChild(UIManager._guideLayer);
        stage.addChild(UIManager._warnLayer);
        UIManager._panelDict = new qin.Dictionary();
        UIManager._layerDict = new qin.Dictionary();
        UIManager._layerDict.add(UILayerType.GameContent, UIManager._gameLayer);
        UIManager._layerDict.add(UILayerType.MainUI, UIManager._mainUiLayer);
        UIManager._layerDict.add(UILayerType.Module, UIManager._moduleLayer);
        UIManager._layerDict.add(UILayerType.Tips, UIManager._tipsLayer);
        UIManager._layerDict.add(UILayerType.Guide, UIManager._guideLayer);
        UIManager._layerDict.add(UILayerType.Warn, UIManager._warnLayer);
        this._layers = UIManager._layerDict.getValues();
        var layer;
        for (var i = 0; i < this._layers.length; i++) {
            layer = this._layers[i];
            layer.touchEnabled = false;
            layer.width = GameSetting.StageWidth;
        }
        if (true && egret.Capabilities.isMobile == false) {
            stage.addChild(new TestPanel());
        }
        UIManager._resizeMap = new Array();
        UIManager._resizeScrollerMap = new Array();
        UIManager._resizeDomMap = new Array();
        stage.addEventListener(egret.Event.RESIZE, UIManager.resizeHandler, this);
        UIManager.resizeHandler(null);
    };
    UIManager.showPanel = function (panelName, data) {
        var targetPanel;
        targetPanel = UIManager._panelDict.getValue(panelName);
        if (!targetPanel) {
            var PanelClass = egret.getDefinitionByName(panelName);
            if (PanelClass) {
                targetPanel = new PanelClass();
                UIManager._panelDict.add(panelName, targetPanel);
            }
        }
        if (targetPanel) {
            var con = UIManager.getLayerContainer(targetPanel.layer);
            UIManager.setAlignInfo(targetPanel);
            if (con) {
                if (!targetPanel.isIgnoreAdaptation) {
                    targetPanel.height = GameManager.stage.stageHeight;
                }
                con.addChild(targetPanel);
            }
            targetPanel.init(data);
            UIManager.onPanelOpenEvent.dispatch(panelName);
        }
    };
    UIManager.closePanel = function (panel) {
        var targetPanel;
        var panelName;
        if (typeof panel == "string") {
            targetPanel = UIManager.getPanel(panel);
            panelName = panel;
        }
        else if (panel instanceof BasePanel) {
            targetPanel = panel;
            panelName = egret.getQualifiedClassName(panel);
        }
        if (targetPanel && targetPanel.parent) {
            targetPanel.parent.removeChild(targetPanel);
            UIManager.onPanelCloseEvent.dispatch(panelName);
        }
    };
    UIManager.getPanel = function (panelName) {
        if (panelName) {
            var panel = UIManager._panelDict.getValue(panelName);
            return panel;
        }
        qin.Console.logError("面板名为空！");
    };
    UIManager.getLayerContainer = function (layer) {
        if (layer != UILayerType.None) {
            return UIManager._layerDict.getValue(layer);
        }
        return null;
    };
    UIManager.showFloatTips = function (tips) {
        UIManager.showPanel(UIModuleName.TextTipsPanel, tips);
    };
    /**
     * 对面板的visible属性设置，不触发面板的初始化流程
     */
    UIManager.showPanelByVisible = function (name, flag) {
        var panel = UIManager.getPanel(name);
        if (panel) {
            panel.visible = flag;
        }
    };
    UIManager.takeToTopLayer = function (panel) {
        var targetPanel;
        var con;
        if (typeof panel == "string") {
            targetPanel = UIManager.getPanel(panel);
            con = UIManager.getLayerContainer(targetPanel.layer);
        }
        else if (panel instanceof BasePanel) {
            targetPanel = panel;
            con = UIManager.getLayerContainer(panel.layer);
        }
        if (con && targetPanel) {
            targetPanel.parent.addChild(targetPanel);
        }
    };
    /**
     * 面板是否显示 根据面板名
     */
    UIManager.isShowPanel = function (panelName) {
        var panel = UIManager.getPanel(panelName);
        return UIManager.isShowPanelObj(panel);
    };
    /**
     * 面板是否显示
     */
    UIManager.isShowPanelObj = function (panel) {
        if (panel) {
            if (panel.parent && panel.visible) {
                return true;
            }
        }
        return false;
    };
    /*设置对齐方式*/
    UIManager.setAlignInfo = function (target) {
        UIUtil.clearLayout(target);
        if (target.tweenGroup) {
            if (isNaN(target.tweenGroup.horizontalCenter)) {
                target.tweenGroup.horizontalCenter = 0;
            }
            if (isNaN(target.tweenGroup.verticalCenter)) {
                target.tweenGroup.verticalCenter = 0;
            }
        }
        switch (target.panelAlignType) {
            case PanelAlignType.Center_Top:
                target.horizontalCenter = target.offsetH;
                target.top = target.offsetV;
                break;
            case PanelAlignType.Center_Center:
                target.horizontalCenter = target.offsetH;
                target.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Center_Bottom:
                target.horizontalCenter = target.offsetH;
                target.bottom = target.offsetV;
                break;
            case PanelAlignType.Left_Top:
                target.left = target.offsetH;
                target.top = target.offsetV;
                break;
            case PanelAlignType.Left_Bottom:
                target.left = target.offsetH;
                target.bottom = target.offsetV;
                break;
            case PanelAlignType.Left_Center:
                target.left = target.offsetH;
                target.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Right_Top:
                target.right = target.offsetH;
                target.top = target.offsetV;
                break;
            case PanelAlignType.Right_Center:
                target.right = target.offsetH;
                target.verticalCenter = target.offsetV;
                break;
            case PanelAlignType.Right_Bottom:
                target.right = target.offsetH;
                target.bottom = target.offsetV;
                break;
        }
    };
    /**
     * 舞台宽高改变
     */
    UIManager.resizeHandler = function (event) {
        //面板容器
        var layer;
        for (var i = 0; i < this._layers.length; i++) {
            layer = this._layers[i];
            layer.height = GameManager.stage.stageHeight;
        }
        //所有面板 后续如果有需要可以加个忽略自适应属性
        UIManager._panelDict.foreach(UIManager.resizePanel, this);
        //特殊group
        for (var _i = 0, _a = UIManager._resizeMap; _i < _a.length; _i++) {
            var gruop = _a[_i];
            gruop.height = GameManager.stage.stageHeight;
        }
        //滚动视图
        if (GameManager.stage.stageHeight < GameSetting.StageHeight) {
            for (var _b = 0, _c = UIManager._resizeScrollerMap; _b < _c.length; _b++) {
                var scroller = _c[_b];
                scroller["target"].height = GameManager.stage.stageHeight - (GameSetting.StageHeight - scroller["height"]);
                ;
            }
        }
        else {
            for (var _d = 0, _e = UIManager._resizeScrollerMap; _d < _e.length; _d++) {
                var scroller = _e[_d];
                scroller["target"].height = scroller["height"];
            }
        }
        for (var _f = 0, _g = UIManager._resizeDomMap; _f < _g.length; _f++) {
            var obj = _g[_f];
            UIManager.reSizeDom(obj["target"], obj["offsetX"], obj["offsetY"], obj["canvasWidth"], obj["leftByStage"]);
        }
    };
    UIManager.resizePanel = function (name, panel) {
        if (!panel.isIgnoreAdaptation) {
            panel.height = GameManager.stage.stageHeight;
        }
    };
    /**
     * 加入一个要动态改变尺寸的显示对象(传入的显示对象touchEnabled默认为false)
     */
    UIManager.pushResizeGroup = function (target, isImmediatelyChange) {
        if (isImmediatelyChange === void 0) { isImmediatelyChange = true; }
        if (target) {
            if (isImmediatelyChange) {
                target.height = GameManager.stage.stageHeight;
            }
            if (UIManager._resizeMap.indexOf(target) == -1) {
                UIManager._resizeMap.push(target);
            }
            target.touchEnabled = false;
        }
    };
    /**
     * 加入一个要动态改变尺寸的dom对象
     */
    UIManager.pushResizeDom = function (target, offsetX, offsetY, isImmediatelyChange) {
        if (isImmediatelyChange === void 0) { isImmediatelyChange = true; }
        if (target) {
            var canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
            var cvWidth = canvas.width;
            var scale = canvas.width / GameManager.stage.width;
            var cvTop = void 0;
            if (canvas.top > 0) {
                cvTop = 0;
            }
            else {
                cvTop = canvas.top * scale;
            }
            if (isImmediatelyChange) {
                UIManager.reSizeDom(target, (offsetX + canvas.left) * scale, offsetY * scale + cvTop, cvWidth, offsetX * scale);
            }
            var flag = true;
            for (var _i = 0, _a = UIManager._resizeDomMap; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info["target"] == target) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var obj = new Object();
                obj["target"] = target;
                obj["offsetX"] = (offsetX + canvas.left) * scale;
                obj["offsetY"] = offsetY * scale + cvTop;
                obj["canvasWidth"] = cvWidth;
                obj["leftByStage"] = offsetX * scale;
                UIManager._resizeDomMap.push(obj);
            }
        }
    };
    UIManager.reSizeDom = function (target, offsetX, offsetY, canvasWidth, leftByStage) {
        var canvas = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
        var cvWidth = canvas.width;
        var cvLeft = canvas.left;
        var scaleX;
        var scaleY;
        if (cvWidth == canvasWidth) {
            if (cvLeft > 0) {
                scaleX = (cvLeft + leftByStage) / offsetX;
            }
            else {
                scaleX = (leftByStage / offsetX) * (cvWidth / canvasWidth);
            }
            scaleY = offsetY / offsetY;
        }
        else {
            scaleX = (cvLeft + leftByStage * (cvWidth / canvasWidth)) / offsetX;
            scaleY = cvWidth / canvasWidth;
        }
        target.x = offsetX * scaleX;
        target.y = offsetY * scaleY + canvas.top;
    };
    /**
     * 加入一个要动态改变尺寸的scroller显示对象
    */
    UIManager.pushResizeScroller = function (target, height, isImmediatelyChange) {
        if (isImmediatelyChange === void 0) { isImmediatelyChange = true; }
        if (target) {
            if (isImmediatelyChange) {
                if (GameManager.stage.stageHeight < GameSetting.StageHeight) {
                    target.height = GameManager.stage.stageHeight - (GameSetting.StageHeight - height);
                }
                else {
                    target.height = height;
                }
            }
            var flag = true;
            for (var _i = 0, _a = UIManager._resizeScrollerMap; _i < _a.length; _i++) {
                var info = _a[_i];
                if (info["target"] == target) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                var obj = new Object();
                obj["target"] = target;
                obj["height"] = height;
                UIManager._resizeScrollerMap.push(obj);
            }
            target.touchEnabled = false;
        }
    };
    /**
     * 添加事件
     */
    UIManager.addEventListener = function (moduleName, eventName, listener, thisObject) {
        UIManager._eventDispatcher.addListener(moduleName + eventName, listener, thisObject);
    };
    /**
     * 移除事件
     */
    UIManager.removeEventListener = function (moduleName, eventName, listener, thisObject) {
        UIManager._eventDispatcher.removeListener(moduleName + eventName, listener, thisObject);
    };
    /**
     * 广播事件
     */
    UIManager.dispatchEvent = function (moduleName, eventName, data) {
        UIManager._eventDispatcher.dispatch(moduleName + eventName, data);
    };
    /**
     * 清除所有事件
     */
    UIManager.removeAllEvent = function () {
        UIManager._eventDispatcher.clear();
    };
    UIManager._eventDispatcher = new qin.CallDispatcher();
    /**
     * 面板打开事件
     */
    UIManager.onPanelOpenEvent = new qin.DelegateDispatcher();
    /**
     * 面板关闭事件
     */
    UIManager.onPanelCloseEvent = new qin.DelegateDispatcher();
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map