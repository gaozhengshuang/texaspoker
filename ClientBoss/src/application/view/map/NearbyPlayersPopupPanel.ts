module game {
    export class NearbyPlayersPopupPanel extends PanelComponent {

        public static CLOSE: string = "close";
        public static LOOK_ASSES: string = "look_asses";

        private topImg: eui.Image;
        private headImg: eui.Image;
        private sexImg: eui.Image;
        private xingzuoIcon: eui.Image;

        private pointGroup: eui.Group;

        private bPoint_txt: eui.Label;
        private name_txt: eui.Label;
        private level_txt: eui.Label;
        private age_txt: eui.Label;
        private xingzuo_txt: eui.Label;
        private juli_txt: eui.Label;
        private qianming_txt: eui.Label;

        private lookAsses_btn: eui.Button;
        private close_btn: IconButton;


        public constructor() {
            super();
        }
        protected getSkinName() {
            return NearbyPlayersViewUI;
        }
        private static _instance: NearbyPlayersPopupPanel = null;
        public static getInstance(): NearbyPlayersPopupPanel {
            if (!NearbyPlayersPopupPanel._instance) {
                NearbyPlayersPopupPanel._instance = new NearbyPlayersPopupPanel();
            }
            return NearbyPlayersPopupPanel._instance;
        }
        protected beforeShow() {

            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
            this.lookAsses_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lookAsses, this);
        }
        protected beforeRemove() {

            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon = "lucky_json.leftBack";


        }
        private onclick_close() {
            this.dispatchEvent(new BasicEvent(NearbyPlayersPopupPanel.CLOSE));
        }
        private onclick_lookAsses() {
            this.dispatchEvent(new BasicEvent(NearbyPlayersPopupPanel.LOOK_ASSES, { players: this.playersInfo }));
        }

        private playersInfo: msg.IPersonSocialInfo;
        private selfPoint:PointVO=null;
        public updateInfo(info: msg.IPersonSocialInfo,selfPt:PointVO) {
            this.playersInfo = info;
            this.selfPoint=selfPt;
            this.name_txt.text = this.playersInfo.name;
            this.level_txt.text = "Lv." + this.playersInfo.level;
            this.age_txt.text = "" + this.playersInfo.age;
            if (this.playersInfo.sign && this.playersInfo.sign != "") {
                this.qianming_txt.text = this.playersInfo.sign;
            }
            if (this.playersInfo.province != 0 && this.playersInfo.city != 0) {
                this.pointGroup.visible = true;
                this.bPoint_txt.text = table.TCitysById[this.playersInfo.province].Name +
                    "." + table.TCitysById[this.playersInfo.city].Name;
            } else {
                this.bPoint_txt.text = "";
                this.pointGroup.visible = false;
            }
            if(this.selfPoint && this.playersInfo.lat!=0 && this.playersInfo.lng!=0){
                this.juli_txt.text=String(GameConfig.distance({ lat: this.selfPoint.lat, lng: this.selfPoint.lng },
                            { lat: this.playersInfo.lat, lng: this.playersInfo.lng }))+"km";
            }else{
                this.juli_txt.text="0km";
            }
        }
    }
}