module game {
    export class GameUserInfoPanel extends eui.Component {
        public name_txt: eui.Label;
        public level_txt: eui.Label;
        public coin_txt: eui.Label;
        public gold_txt: eui.Label;
        public vip_txt: eui.Label;
        public qiang_txt: eui.Label;
        private userInfo: IUserInfo;
        public bName_txt: eui.Label;
        public bWeizhi_txt: eui.Label;
        public roomNum_txt: eui.Label;
        public roomWeizhiGroup: eui.Group;
        public roomNumGroup: eui.Group;
        public roomBg: eui.Image;
        public timeGroup: eui.Group;
        public time_txt: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/skins/UserInfoUISkin.exml";
            this.roomWeizhiGroup.visible = false;
            //this.adaptive();
            this.roomNumGroup.visible = false;
            this.roomBg.visible = false;
            this.timeGroup.visible=false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStageFun, this);
        }
        private addStageFun(eve: egret.Event) {
            GameConfig.goldGPoint = this.localToGlobal(this.coin_txt.x, this.coin_txt.y);
        }
        private adaptive() {
            let innerScaleH: number = GameConfig.innerHeight / 1280;
            let innerScaleW: number = GameConfig.innerWidth / 720;

            let expHeight: number = GameConfig.innerWidth * 1280 / 720;
            let innerScale: number = expHeight > GameConfig.innerHeight ? innerScaleH : innerScaleW;
            //this.scaleX = this.scaleY = innerScale;
        }
        private isTime:boolean=false;
        public updataInfo(info: IUserInfo) {
            this.userInfo = info;
            this.name_txt.text = this.userInfo.name;
            this.level_txt.text = "Lv. " + (this.userInfo.level);
            this.coin_txt.text = String(this.userInfo.gold);
            this.gold_txt.text = String(this.userInfo.diamond);
            this.vip_txt.text = "0";
            this.qiang_txt.text = this.userInfo.robcount+"/"+20;
            if (this.userInfo.robcount < 20) {
                this.timeGroup.visible=true;
                this.isTime=true;
                this.showTime();
                this.qiang_txt.y=13;
            }
            else{
                this.timeGroup.visible=false;
                this.removeTimer();
                this.isTime=false;
                this.qiang_txt.y=27;
            }
        }
        private endTime: number;
        private showTime() {
            this.timeGroup.visible = true;
            this.endTime=this.userInfo.tmaddrobcount;
            if(this.isTime){
                SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
            }
            this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);

        }
        
        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.time_txt.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, true);
            }else {
                if(body.userInfo.robcount >= 20){
                    body.removeTimer();
                    body.timeGroup.visible = false;
                    body.isTime=false;
                    this.qiang_txt.y=13;
                }
            }
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
        public showRoomWeizhi(isShow: boolean, roomvo: HouseVO = null) {
            if (isShow) {
                if (roomvo) {
                    this.roomWeizhiGroup.visible = true;
                    /*this.bName_txt.text = roomvo.bName;
                    let weizhiTxt = this.bWeizhi_txt;
                    GameConfig.getCityNameFun(roomvo.bLatLng[0],
                        roomvo.bLatLng[1], function (txt: string) {
                            weizhiTxt.text = txt;
                        });*/
                }
            } else {
                this.roomWeizhiGroup.visible = false;
            }
        }
        public showRoomNum(isShow: boolean, rId: number = 0) {
            if (isShow) {
                this.roomNumGroup.visible = true;
                this.roomNum_txt.text = "" + rId;
            } else {
                this.roomNumGroup.visible = false;
            }
        }
        public showRoomBg(isShow: boolean) {
            if (isShow) {
                this.roomBg.visible = true;
            } else {
                this.roomBg.visible = false;
            }
        }
        public removePanel(){
            this.removeTimer();
        }
    }
}