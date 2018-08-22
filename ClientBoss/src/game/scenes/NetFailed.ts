module game {
    export class NetFailed extends GameComponent {
        reasonLabel: eui.Label;
        reconnectButton: LabelButton;

        private _isShow: boolean = false;

        protected getSkinName() {
            return NetFailedSkin;
        }

        protected init() {
            this.height = gameConfig.curHeight();
        }

        public show(reason: string = null) {
            setEgretEventsReply(true); //出现重登界面 将egret div 事件激活
            if (!this._isShow) {
                this._isShow = true;
                this._touchEvent = [
                    { target: this.reconnectButton, callBackFunc: this.reconnectHandle },
                ];
                this.addEventAndNotify();
                GameLayer.maskLayer.addChild(this);
            }
            this.reconnectButton.label = "点击重新登录";
            this.reasonLabel.visible = false;
            if (reason) {
                this.reasonLabel.visible = true;
                this.reasonLabel.text = `失败原因: ${reason}`;
                showTips(reason, true);
            }
        }
        private _isOnRelogin: boolean; //防止玩家重复点击
        private async reconnectHandle() {
            // Login();
            if (!this._isOnRelogin) {
                this._isOnRelogin = true;
                NotificationCenter.addObserver(this, this.onReLoginResult, LoginManager.LOGIN_STATE);
                LoginManager.getInstance().login();
            }
            // NotificationCenter.postNotification(CommandName.NET_CONNECTION_ERROR);
        }
        private onReLoginResult(state: boolean) {
            if (state) {
                this.close();
            }
            this._isOnRelogin = false;
        }
        private close() {
            this.removeEventAndNotify();
            this.removeFromParent();
            this._isShow = false;
        }

        private static _instance: NetFailed;

        public static getInstance(): NetFailed {
            if (!NetFailed._instance) {
                NetFailed._instance = new NetFailed();
            }
            return NetFailed._instance;
        }
    }
}