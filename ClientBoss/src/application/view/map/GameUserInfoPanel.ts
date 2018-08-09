module app {
    export class GameUserInfoPanel extends eui.Component {
        public name_txt: eui.Label;
        public level_txt: eui.Label;
        public coin_txt: eui.Label;
        public gold_txt: eui.Label;
        public vip_txt: eui.Label;
        public qiang_txt: eui.Label;
        private userInfo: any;
        public bName_txt: eui.Label;
        public bWeizhi_txt: eui.Label;
        public roomWeizhiGroup: eui.Group;


        public constructor() {
            super();
            this.skinName = "resource/skins/UserInfoUISkin.exml";
            this.roomWeizhiGroup.visible = false;
            this.adaptive();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStageFun,this);
        }
        private addStageFun(eve:egret.Event){
            GameConfig.goldGPoint=this.localToGlobal(this.coin_txt.x,this.coin_txt.y);
        }
        private adaptive() {
            this.scaleX = this.scaleY = GameConfig.innerScale;
        }
        public updataInfo(info: any) {
            this.userInfo = info;
            this.name_txt.text = this.userInfo.name;
            this.level_txt.text = "Lv. "+(this.userInfo.level);
            this.coin_txt.text = String(this.userInfo.gold);
            this.gold_txt.text = String(this.userInfo.diamond);
            this.vip_txt.text = "0";
            this.qiang_txt.text = "0";
        }
        public showRoomWeizhi(isShow: boolean, roomvo: RoomVO = null) {
            if (isShow) {
                if (roomvo) {
                    this.roomWeizhiGroup.visible = true;
                    this.bName_txt.text = roomvo.bName;
                    let weizhiTxt = this.bWeizhi_txt;
                    GameConfig.getCityNameFun(roomvo.bLatLng[0],
                        roomvo.bLatLng[1], function (txt: string) {
                            weizhiTxt.text = txt;
                        });
                }
            } else {
                this.roomWeizhiGroup.visible = false;
            }
        }
    }
}