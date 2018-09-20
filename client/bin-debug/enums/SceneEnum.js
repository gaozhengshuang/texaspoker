/**
 * 场景层枚举
 * */
var SceneLayer;
(function (SceneLayer) {
    /*无*/
    SceneLayer[SceneLayer["None"] = 0] = "None";
    /*地图层*/
    SceneLayer[SceneLayer["Map"] = 1] = "Map";
    /*模型层*/
    SceneLayer[SceneLayer["Model"] = 2] = "Model";
    /*特效层*/
    SceneLayer[SceneLayer["Effect"] = 3] = "Effect";
    /*数字层*/
    SceneLayer[SceneLayer["Text"] = 4] = "Text";
})(SceneLayer || (SceneLayer = {}));
/**
 * 场景类型枚举
 * */
var SceneType;
(function (SceneType) {
    SceneType[SceneType["None"] = 0] = "None";
    /**
     * 登录场景
     */
    SceneType[SceneType["Login"] = 1] = "Login";
    /**
     * 大厅
     */
    SceneType[SceneType["Hall"] = 2] = "Hall";
    /**
     * 游戏场景
     */
    SceneType[SceneType["Game"] = 3] = "Game";
    /**
     * 百人大战
     */
    SceneType[SceneType["HundredWar"] = 4] = "HundredWar";
})(SceneType || (SceneType = {}));
/**
 * 场景切换行为
 */
var SceneSwitchAction;
(function (SceneSwitchAction) {
    SceneSwitchAction[SceneSwitchAction["None"] = 0] = "None";
    /**
     * 基于场景面板 打开面板
     */
    SceneSwitchAction[SceneSwitchAction["OpenPanel"] = 1] = "OpenPanel";
    /**
     * 替换场景面板显示
     */
    SceneSwitchAction[SceneSwitchAction["RepleacePanel"] = 2] = "RepleacePanel";
})(SceneSwitchAction || (SceneSwitchAction = {}));
//# sourceMappingURL=SceneEnum.js.map