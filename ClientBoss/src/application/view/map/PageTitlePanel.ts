module game {
    export class PageTitlePanel extends eui.Component {
        private return_btn: eui.Button;
        private top_bg: eui.Rect;

        private bName_txt: eui.Label;
        private diamond_txt: eui.Label;
        private gold_txt: eui.Label;
        private energy_txt: eui.Label;
        private addEnergy_txt: eui.Label;
        private addNum_txt: eui.Label;
        private dec_txt: eui.Label;

        private addEnergyGroup: eui.Group;

        private userInfo: IUserInfo;
        private isTime: boolean = false;

        private returnFun: Function;
        private returnBody: any;


        public constructor() {
            super();
            if (DEBUG) {
                this.skinName = "resource/skins/PageTitlePanelSkin.exml";
            }
            else {
                this.skinName = PageTitlePanelSkin;
            }
        }
        public init(backFun: Function = null, backBody: any = null) {
            this.bName_txt.text = "";
            this.returnFun = backFun;
            this.returnBody = backBody;
            this.return_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);

            this.updateUserInfo(DataManager.playerModel.getUserInfo());
        }
        public updateTitleStr(name: string = "") {
            this.bName_txt.text = name;
        }
        private return_begin() {
            if (this.returnFun && this.returnBody) {
                this.returnFun.call(this.returnBody);
            }
        }
        public returnBtnShow(flag: boolean) {
            this.return_btn.visible = flag;
        }
        public updateUserInfo(uInfo: IUserInfo) {
            this.userInfo = uInfo;
            this.gold_txt.text = String(this.userInfo.gold);
            this.diamond_txt.text = String(this.userInfo.diamond);
            this.energy_txt.text = this.userInfo.robcount + "/" + 20;
            if (this.userInfo.robcount < 20) {
                this.addEnergyGroup.visible = true;
                this.isTime = true;
                this.showTime();
                this.energy_txt.x = 490;
            }
            else {
                this.addEnergyGroup.visible = false;
                this.removeTimer();
                this.isTime = false;
                this.energy_txt.x = 540;
            }
        }
        private endTime: number;
        private showTime() {
            this.addEnergyGroup.visible = true;
            this.endTime = this.userInfo.tmaddrobcount;
            if (this.isTime) {
                SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
            }
            this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);

        }

        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.addEnergy_txt.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, true)+" +5";
            } else {
                if (body.userInfo.robcount >= 20) {
                    body.removeTimer();
                    body.addEnergyGroup.visible = false;
                    body.isTime = false;
                    this.energy_txt.x = 540;
                }
            }
        }
        private removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }

        public removePanel() {
            this.removeTimer();
            //this.return_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.return_begin, this);
        }
    }
}