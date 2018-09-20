var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景管理
 */
var SceneManager = (function () {
    function SceneManager() {
    }
    /**
     * 显示切换面板
     */
    SceneManager.showSwitchPanel = function () {
        if (!UIManager.isShowPanelObj(SceneManager._switchPanel)) {
            UIManager.showPanel(UIModuleName.LoadingSwitchPanel);
        }
        if (!SceneManager._switchPanel) {
            SceneManager._switchPanel = UIManager.getPanel(UIModuleName.LoadingSwitchPanel);
        }
    };
    /**
     * 关闭切换面板
     */
    SceneManager.closeSwitchPanel = function () {
        UIManager.closePanel(UIModuleName.LoadingSwitchPanel);
    };
    SceneManager.initialize = function () {
        SceneManager.addSwitchDontClosePanel(UIModuleName.GamblingPanel, UIModuleName.HundredWarRoomPanel, UIModuleName.GameHallPanel, UIModuleName.LoginSceneBgPanel);
    };
    /**
     * 更新切换面板进度条
     */
    SceneManager.updateSwitchProgress = function (progress) {
        // if (SceneManager._switchPanel)
        // {
        // 	SceneManager._switchPanel.updateProgress(progress, "正在加载场景资源.....");
        // }
    };
    Object.defineProperty(SceneManager, "sceneType", {
        /**
         * 当前场景类型
         */
        get: function () {
            if (SceneManager._currentScene) {
                return SceneManager._currentScene.sceneInfo.type;
            }
            return SceneType.None;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 切换场景
     */
    SceneManager.switcScene = function (type, extendData) {
        if (SceneManager._currentScene && SceneManager._currentScene.sceneInfo.type == type) {
            return;
        }
        if (!SceneManager._currentScene || (SceneManager._currentScene && SceneManager._currentScene.isResLoaded)) {
            if (!SceneManager.cacheSceneList) {
                SceneManager.cacheSceneList = new qin.Dictionary();
            }
            if (SceneManager._currentScene) {
                SceneManager._currentScene.LoadCompleteEvent.removeListener(SceneManager.switchComplete, this);
                SceneManager._lastScene = SceneManager._currentScene;
            }
            var scene = SceneManager.cacheSceneList.getValue(type);
            var isFirstCreate = false;
            if (!scene) {
                isFirstCreate = true;
                switch (type) {
                    case SceneType.Login:
                        scene = new LoginScene();
                        break;
                    case SceneType.Hall:
                        scene = new HallScene();
                        break;
                    case SceneType.Game:
                        scene = new GameScene();
                        break;
                    case SceneType.HundredWar:
                        scene = new HundredWarScene();
                        break;
                    default:
                        qin.Console.logError("切换场景失败！未知的场景类型：" + type);
                        break;
                }
                if (scene) {
                    SceneManager.cacheSceneList.add(type, scene);
                }
            }
            if (scene) {
                SceneManager._currentScene = scene;
                scene.LoadCompleteEvent.addListener(SceneManager.switchComplete, this);
                SceneManager.showSwitchPanel();
                if (!scene.sceneInfo) {
                    scene.sceneInfo = new SceneInfo(type, extendData);
                }
                else {
                    scene.sceneInfo.type = type;
                    scene.sceneInfo.extendData = extendData;
                }
                if (isFirstCreate) {
                    qin.Tick.AddTimeoutInvoke(SceneManager.delaySwitch, SceneManager.delayNum, this, scene);
                }
                else {
                    scene.initialize();
                }
            }
        }
        else {
            SceneManager._isLogout = (type == SceneType.Login);
        }
    };
    Object.defineProperty(SceneManager, "delayNum", {
        get: function () {
            if (SceneManager._delayNum == undefined) {
                SceneManager._delayNum = Math.ceil(1000 / GameManager.stage.frameRate * 5);
            }
            return SceneManager._delayNum;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.delaySwitch = function (scene) {
        scene.initialize();
    };
    /**
     * 场景切换完毕
     */
    SceneManager.switchComplete = function (scene) {
        if (SceneManager._lastScene) {
            SceneManager._lastScene.clear();
        }
        scene.LoadCompleteEvent.removeListener(SceneManager.switchComplete, this);
        SoundManager.playBgMusic();
        if (SceneManager._isLogout) {
            SceneManager._isLogout = false;
            GameManager.reload();
        }
        SceneManager.closeSwitchPanel();
        SceneManager.onSwitchCompleteEvent.dispatch();
    };
    /**
     * 获取场景
     */
    SceneManager.getScene = function (type) {
        if (SceneManager.cacheSceneList) {
            return SceneManager.cacheSceneList.getValue(type);
        }
        return null;
    };
    SceneManager.switchClosePanels = function () {
        UIManager.panelDict.foreach(SceneManager.closeChildPanel, this);
    };
    SceneManager.closeChildPanel = function (name, panel) {
        if (SceneManager._switchDontClosePanelList.indexOf(name) == -1) {
            UIManager.closePanel(name);
        }
    };
    SceneManager.addSwitchDontClosePanel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args) {
            SceneManager._switchDontClosePanelList = SceneManager._switchDontClosePanelList.concat(args);
        }
        else {
            qin.Console.log("添加切场景不关闭面板异常！面板信息为空！");
        }
    };
    SceneManager.removeSwitchDontClosePanel = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args) {
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var panel = args_1[_a];
                qin.ArrayUtil.RemoveItem(panel, SceneManager._switchDontClosePanelList);
            }
        }
        else {
            qin.Console.log("移除切场景不关闭面板异常！面板信息为空！");
        }
    };
    SceneManager._switchDontClosePanelList = new Array();
    SceneManager._isLogout = false;
    /**
     * 场景切换完成广播
    */
    SceneManager.onSwitchCompleteEvent = new qin.DelegateDispatcher();
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map