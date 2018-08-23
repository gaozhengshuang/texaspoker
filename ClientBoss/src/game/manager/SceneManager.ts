module game {
    export class SceneManager {
        private static _curSceneType: SceneType;
        private static _curScene: SceneComponent;
        private static _lastSceneType: SceneType;

        private static _resLoadStateMap: game.Map<SceneType, boolean> = new game.Map<SceneType, boolean>();

        public static changeScene(sceneType: SceneType, force: boolean = false, userdata: any = null) {
            if (this._curSceneType == sceneType && !force) {
                return;
            }

            if (this._curScene) {
                this._lastSceneType = this._curSceneType;
                this._curScene.remove();
                this._curScene = null;
            }

            this._curSceneType = sceneType;

            let resIsLoaded = SceneManager._resLoadStateMap.getValue(sceneType);
            if (resIsLoaded) {
                this.showScene(sceneType);
            }
            else {
                this.loadSceneRes(sceneType);
            }
        }

        private static showScene(sceneType: SceneType) {
            switch (sceneType) {
                case SceneType.battle:
                    this._curScene = BattleScene.getInstance();
                    // BattleScene.getInstance().setData(userdata);
                    break;
                case SceneType.main:
                    this._curScene = MainScene.getInstance();
                    break;
                case SceneType.login:
                    this._curScene = LoginScene.getInstance();
                    break;
                case SceneType.hall:
                    this._curScene = HallScene.getInstance();
                    break;
            }
            if (this._curScene) {
                this._curScene.show();
            }
        }
        /**
         * 加载场景资源
         */
        private static async loadSceneRes(sceneType: SceneType) {
            openPanel(PanelType.LoadingScenePanel);
            let resList = SceneManager.getResList(sceneType);
            if (resList) {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, SceneManager.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, SceneManager.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, SceneManager.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, SceneManager.onItemLoadError, this);
                for (let i: number = 0; i < resList.length; i++) {
                    await RES.loadGroup(resList[i]);
                }

                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, SceneManager.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, SceneManager.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, SceneManager.onResourceProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, SceneManager.onItemLoadError, this);

                SceneManager._resLoadStateMap.add(sceneType, true);
                if (panelIsShow(PanelType.LoadingScenePanel)) {
                    LoadingScenePanel.getInstance().remove();
                }
                SceneManager.showScene(sceneType);
            }
        }
        private static onResourceLoadComplete(event: RES.ResourceEvent) {
            Console.log("场景资源组加载成功：" + event.groupName);
        }
        protected static onResourceProgress(event: RES.ResourceEvent) {
            LoadingScenePanel.getInstance().updateProgress(event.itemsLoaded / event.itemsTotal)
        }
        private static onResourceLoadError(event: RES.ResourceEvent): void {
            Console.log("资源组:" + event.groupName + "加载出错");
        }
        private static onItemLoadError(event: RES.ResourceEvent): void {
            Console.log("资源项:" + event.resItem.url + "加载出错");
        }
        public static backLastScene() {
            if (this._lastSceneType) {
                this.changeScene(this._lastSceneType);
            }
        }

        /**
         * 资源获取
         */
        private static _resMap: game.Map<SceneType, Array<string>> = new game.Map<SceneType, Array<string>>();
        private static getResList(type: SceneType): Array<string> {
            if (type != undefined) {
                let resList = SceneManager._resMap.getValue(type);
                if (!resList) {
                    resList = [];
                    switch (type) {
                        case SceneType.login:
                            resList.push(gameConfig.ResGroupEnum.Login);
                            break;
                        case SceneType.battle:
                            resList.push(gameConfig.ResGroupEnum.Game1);
                            break;
                        case SceneType.hall:
                            resList.push(gameConfig.ResGroupEnum.Hall); //, gameConfig.ResGroupEnum.Common
                            break;
                        case SceneType.main:
                            // resList.push(gameConfig.ResGroupEnum.Game1);
                            break;
                    }
                    SceneManager._resMap.add(type, resList);
                }
                return resList;
            }
        }
    }

    export const enum SceneType {
        battle,
        main, //弃用
        login,
        hall
    }
}