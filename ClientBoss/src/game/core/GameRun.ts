declare var platform;

module game {
    let inited = false;
    export let gamelayer: GameLayer;

    export function run(stage: egret.Stage) {
        // gameConfig.curStage().once(egret.TouchEvent.TOUCH_BEGIN, () => {
        //     initWebAudio();
        // }, this);

        window.onerror = function (message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void {
            let msg = `${message} @${filename} line: ${lineno} col:${colno}`;
            if (error)
                msg += `\n${error.stack}`;
            //todo 客户端错误上传
        };
        Console.enabled = true;
        gamelayer = new GameLayer();
        stage.addChild(gamelayer);
        //配置表加载
        DataManager.init();
        SoundManager.init();

        //通讯初始化
        ClientNet.getInstance().init();
        //弹幕界面初始化
        BarrageManager.getInstance().init();
        //战斗数据初始化
        BattleManager.getInstance().init();
        SysTimeEventManager.getInstance().delAllFunction();
        SysTimeEventManager.getInstance().stopTimer();
        //打开登录
        Login();
    }
    export function createGameScene() {

        //进入大厅场景 由mvc来完成
        ApplicationFacade.getInstance().startUp(gamelayer);
        SceneManager.changeScene(SceneType.hall);

        let mapProxy = <MapProxy>ApplicationFacade.getInstance().retrieveProxy(MapProxy.NAME);
        mapProxy.LoginBtnClick();

        // SceneManager.changeScene(SceneType.main);

        //登录完成关闭loading界面
        NotificationCenter.postNotification("closeLoadingSkin");
        NotificationCenter.once(this, connectFailed, ClientNet.SOCKET_CONNECT_CLOSE);
        startHeart();
        window.onbeforeunload = () => {
            stopHeart();
            ClientNet.getInstance().onConnectClose();
            return;
        }
    }

    export function connectFailed() {
        stopHeart();
        NetFailed.getInstance().show();
    }

    export var heartTimeout: number;

    export function stopHeart() {
        if (heartTimeout) {
            clearTimeout(heartTimeout);
            heartTimeout = null;
        }
    }

    export function startHeart() {
        if (heartTimeout) return;
        if (leaveTime) {
            let now = new Date().getTime();
            if ((now - leaveTime) >= 300000) {
                stopHeart();
                return;
            }
        }

        sendMessage("msg.C2GW_HeartBeat", msg.C2GW_HeartBeat.encode({}), false); //心跳频繁，不显示loading
        heartTimeout = setTimeout(() => {
            // showTips("测试心跳", true);
            heartTimeout = null;
            startHeart();
        }, 3000);
    }
}

window["game"] = game;