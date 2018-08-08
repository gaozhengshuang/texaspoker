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

        img_userhead: eui.Image;
        img_mask: eui.Image;

        protected getSkinName() {
            return UserPanelSkin;
        }

        protected init() {
            this.img_userhead.mask = this.img_mask;
            this.closeButton.icon = "lucky_json.leftBack";
            this.addressButton.icon = "user_json.deliveryAdressBtn";
            this.inviteFriendButton.icon = "login_json.inviteFriendsImg";
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.closeButton, callBackFunc: this.backHandle },
                { target: this.addressButton, callBackFunc: this.addressHandle },
                { target: this.inviteFriendButton, callBackFunc: this.inviteFriendHandle },
            ];

            this._notify = [
                {
                    source: DataManager.playerModel,
                    target: this,
                    callBackFunc: this.refreshTask,
                    notifyName: PlayerModel.TASK_UPDATE,
                    execute: true
                },
            ]

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
            this.initTask();
        }

        private backHandle() {
            this.remove();
        }

        private wxHandle() {
            let appid = "wx03789100061e5d6c";
            let redirect_uri = "http%3a%2f%2fjump.test.giantfun.cn%2ftantanle";
            let state = egret.localStorage.getItem("userName") + "-" + egret.localStorage.getItem("password");
            let wxUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_login&state=" + state;
            window.location.href = wxUrl;
        }

        private addressHandle() {
            openPanel(PanelType.deliverySetting);
        }

        private copyHandle() {
            TextCopy("TJ" + DataManager.playerModel.userInfo.userid);
        }

        private initTask() {
            sendMessage("msg.C2GW_ReqTaskList", msg.C2GW_ReqTaskList.encode({}))
        }

        private refreshTask() {
            for (let i = msg.TaskId.RegistAccount; i <= msg.TaskId.InviteRegist; ++i) {
                this.setTask(i);
            }
        }

        private setTask(id: number) {
            let task = DataManager.playerModel.getTask(id);
            if (!task) { return; }
            let isDone = task.completed;
            let progress = task.progress;

            switch (id) {
                case msg.TaskId.InviteRegist:
                    this.curMoneyTxt.text = `${progress}元`;
                    break;
                case msg.TaskId.RegisterTopScore:
                    this.img_gameTask.visible = isDone;
                    this.img_nogameTask.visible = !isDone;
                    break;
                case msg.TaskId.InviteeTopScore:
                    this.img_becomeonTask.visible = isDone;
                    this.img_nobecomeonTask.visible = !isDone;
                    break;
                default:
                    break;
            }
        }

        private inviteFriendHandle() {
            // showTips("功能暂未开放,敬请期待...", true);
            // showShareMenu();
            shareAppMsg();
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