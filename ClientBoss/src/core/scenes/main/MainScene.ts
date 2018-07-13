module game {
    export class MainScene extends SceneComponent {
        lightImage: eui.Image;
        playButton: IconButton;
        rankButton: IconButton;
        userButton: IconButton;
        luckyButton: IconButton;
        titleImage: eui.Image;
        rankLabel: eui.Label;

        protected init() {
                this.playButton.icon = "ui_json.play";
            this.rankButton.icon = "ui_json.paihang";
            this.userButton.icon = "ui_json.userMainBtn";
            this.luckyButton.icon = "ui_json.luckMainBtn";
        this.titleImage.y = gameConfig.curHeight() * 0.1;
        }

        protected getSkinName() {
            return MainSceneSkin;
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.playButton, callBackFunc: this.playHandle},
                {target: this.rankButton, callBackFunc: this.rankHandle},
                {target: this.rankLabel, callBackFunc: this.rankHandle},
                {target: this.userButton, callBackFunc: this.userHandle},
                {target: this.luckyButton, callBackFunc: this.luckyHandle},
            ];
            this.lightImage.rotation = 0;
            egret.Tween.get(this.lightImage, {loop: true}).to({rotation: 360}, 10000);
        }

        private playHandle() {
            if (BattleManager.getInstance().isRetStartGame) {
                BattleManager.getInstance().isRetStartGame = false;
                sendMessage("msg.C2GW_ReqStartGame", msg.C2GW_ReqStartGame.encode({
                    gamekind: 0,
                }));
            }
        }

        private rankHandle() {
            DataManager.playerModel.openRankPanel();
        }

        private userHandle() {
            openPanel(PanelType.user);
        }
        
        private luckyHandle() {
            openPanel(PanelType.lucky);
        }
        protected beforeRemove() {
            egret.Tween.removeTweens(this.lightImage);
        }

        private static _instance: MainScene;

        public static getInstance(): MainScene {
            if (!MainScene._instance) {
                MainScene._instance = new MainScene();
            }
            return MainScene._instance;
        }
    }
}