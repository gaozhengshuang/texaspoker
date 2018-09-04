module game {
    export class SuperMartPanel extends PanelComponent {
        backButton: IconButton;

        protected getSkinName() {
            return SuperMartPanelSkin;
        }

        protected init() {
            if (gameConfig.isIphoneX()) {
                this.backButton.y = 80;
            }
            this.backButton.icon = "ui_json.gameBack";
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.backButton, callBackFunc: this.backHandle },
            ];
            this.registerEvent();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            // NotificationCenter.addObserver(this, this.updateList, PlayerModel.BAG_UPDATE);
        }

        private removeEvent() {
            // NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
        }

        private backHandle() {
            this.remove();
            SceneManager.changeScene(SceneType.hall);
        }

        private static _instance: SuperMartPanel;

        public static getInstance(): SuperMartPanel {
            if (!SuperMartPanel._instance) {
                SuperMartPanel._instance = new SuperMartPanel();
            }
            return SuperMartPanel._instance;
        }
    }
}