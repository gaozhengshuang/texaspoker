module game {
    export class BattleManager {
        isRetStartGame: boolean = true;
        roomId: number | Long = 0;
        bulletCount: number;

        public init() {
            //添加系统消息监听
            NotificationCenter.addObserver(this, this.OnGW2C_RetStartGame, "msg.GW2C_RetStartGame");
            NotificationCenter.addObserver(this, this.OnBT_GameInit, "msg.BT_GameInit");
            NotificationCenter.addObserver(this, this.OnBT_GameStart, "msg.BT_GameStart");
        }

        private OnGW2C_RetStartGame(data: msg.GW2C_RetStartGame) {
            this.isRetStartGame = true;
            this.roomId = data.roomid;
            if (data.errcode == "") {
                sendMessage("msg.BT_ReqEnterRoom", msg.BT_ReqEnterRoom.encode({
                    roomid: data.roomid,
                    userid: DataManager.playerModel.getUserId()
                }));
            } else {
                showTips(data.errcode, true);
            }
        }

        private OnBT_GameInit(data: msg.BT_GameInit) {
            this.bulletCount = data.freebullet;
            DataManager.playerModel.setScore(data.gold);
            DataManager.playerModel.setDiamond(data.diamond)
        }

        private OnBT_GameStart(data: msg.BT_GameStart) {
            DataManager.playerModel.battleStart();
            SoundManager.playEffect("play");
            SceneManager.changeScene(SceneType.battle);
            // openPanel(PanelType.battle);
        }

        public getRoomId() {
            return this.roomId;
        }

        public reqStartGame(eventUid: number|Long   = 0, gamekind:number = 0) {
            let data = new msg.C2GW_ReqStartGame();
            data.eventuid = eventUid
            data.gamekind = gamekind
            sendMessage("msg.C2GW_ReqStartGame", msg.C2GW_ReqStartGame.encode(data));
        }
        private static _instance: BattleManager;

        public static getInstance(): BattleManager {
            if (!BattleManager._instance) {
                BattleManager._instance = new BattleManager();
            }
            return BattleManager._instance;
        }
    }

}