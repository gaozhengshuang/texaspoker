declare var platform;

module game {
    export function run() {
        // gameConfig.curStage().once(egret.TouchEvent.TOUCH_BEGIN, () => {
        //     initWebAudio();
        // }, this);

        window.onerror = function (message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void {
            let msg = `${message} @${filename} line: ${lineno} col:${colno}`;
            if (error)
                msg += `\n${error.stack}`;
            //todo 客户端错误上传
        };
        //配置表加载
        DataManager.init();
        SoundManager.init();

        //通讯初始化
        ClientNet.getInstance().init();

        Login();
    }

    let inited = false;

    export function createGameScene() {
        SceneManager.changeScene(SceneType.login, false);

        //登录完成关闭loading界面
        NotificationCenter.postNotification("closeLoadingSkin");
        NotificationCenter.once(this, connectFailed, ClientNet.SOCKET_CONNECT_CLOSE);
        this.startHeart();
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

    export async function startHeart() {
        if (heartTimeout) return;
        if (game.leaveTime) {
            let now = new Date().getTime();
            if ((now - game.leaveTime) >= 300000) {
                stopHeart();
                return;
            }
        }

        sendMessage("msg.C2GW_HeartBeat", msg.C2GW_HeartBeat.encode({}));
        heartTimeout = setTimeout(() => {
            // showTips("测试心跳", true);
            heartTimeout = null;
            startHeart();
        }, 3000);
    }
}

window["game"] = game;