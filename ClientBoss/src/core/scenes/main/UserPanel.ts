module game {
    export class UserPanel extends PanelComponent {
        closeButton: IconButton;
        addressButton: IconButton;
        inviteFriendButton: IconButton;

        img_gameTask: eui.Image;
        img_becomeonTask: eui.Image;

        img_nogameTask: eui.Image;
        img_nobecomeonTask: eui.Image;

        labelName: eui.Label;
        labelId: eui.Label;
        curMoneyTxt: eui.Label;

        img_userhead:eui.Image;
        img_mask:eui.Image;

        protected getSkinName() {
            return UserPanelSkin;
        }

        protected init() {
            this.img_userhead.mask = this.img_mask;
            this.closeButton.icon = "lucky_json.luckycloseBtn";
        this.addressButton.icon = "user_json.deliveryAdressBtn";
        this.inviteFriendButton.icon = "login_json.inviteFriendsImg";
    }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.closeButton, callBackFunc: this.backHandle},
                {target: this.addressButton, callBackFunc: this.addressHandle},
                {target: this.inviteFriendButton, callBackFunc: this.inviteFriendHandle},
            ];

            this.initUser();
        }

        protected beforeRemove() {
        }

        private initUser() {
            let userInfo = DataManager.playerModel.userInfo;
            this.labelId.text = `ID  ${userInfo.userid}`;
            this.labelName.text = userInfo.name;
            
            this.img_gameTask.visible = false;
            this.img_becomeonTask.visible = false;

            this.img_userhead.source = userInfo.face;
        }

        private backHandle() {
            this.remove();
        }

        private wxHandle() {
            let appid = "wx03789100061e5d6c";
            let redirect_uri = "http%3a%2f%2fjump.test.giantfun.cn%2ftantanle";
            let state = egret.localStorage.getItem("userName")+"-"+egret.localStorage.getItem("password");
            let wxUrl = "https://open.weixin.qq.com/connect/qrconnect?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_login&state="+state;
            window.location.href = wxUrl;
        }

        private addressHandle() {
            openPanel(PanelType.deliverySetting);
        }

        private copyHandle() {
            TextCopy("TJ"+DataManager.playerModel.userInfo.userid);
        }

        private inviteFriendHandle() {
            // showTips("功能暂未开放,敬请期待...", true);
            showShareMenu();
        }

        private static _instance: UserPanel;

        public static getInstance(): UserPanel {
            if (!UserPanel._instance) {
                UserPanel._instance = new UserPanel();
            }
            return UserPanel._instance;
        }
    }
}