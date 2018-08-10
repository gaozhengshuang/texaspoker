declare function getDistance(start: any, end: any);
module game {
    export class WelcomeNewPlayersPanel extends eui.Component {
        public static GOIN_NEW_ROOM: string = "goin_new_room";
        public static CLOSE:string = "close";

        public word_txt: eui.Label;
        public name_txt: eui.Label;
        public weizhi_txt: eui.Label;
        public huxing_txt: eui.Label;
        public goinRoom_btn: eui.Button;
        public buildingImage: eui.Image;

        private buildInfo: BuildingVO;
        private roomInfo: RoomVO;
        private userInfo: UserVO;


        public constructor() {
            super();
            this.skinName = "resource/eui_skins/WelcomePanelSkin.exml";
            this.adaptive();
            this.goinRoom_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goinRoom_begin, this);
        }
        private adaptive() {
            this.scaleX = this.scaleY = GameConfig.innerScale;
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }

        public initInfo(player: UserVO, build: BuildingVO, room: RoomVO,selfPoint:PointVO) {
            this.userInfo = player;
            this.buildInfo = build;
            this.roomInfo = room;
            /*if (this.buildInfo && this.roomInfo) {
                let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId);
                if (roomType) {
                    this.word_txt.text = "尊敬的：" + this.userInfo.nickname + "\n" +
                        "         欢迎来到citystar，根据您的定位在距离您" +
                        String(this.distance({ lat: selfPoint.lat, lng: selfPoint.lng },
                            { lat: this.buildInfo.lat, lng: this.buildInfo.lng })) +
                        "公里的地方，赠送您一套" + roomType.tName + "的房子。"
                    this.buildingImage.source = 'resource/assets/' + this.buildInfo.bImage1 + '.png';
                    this.name_txt.text = this.buildInfo.bName;
                    let weizhi_txt = this.weizhi_txt;
                    GameConfig.getCityNameFun(this.buildInfo.lat, this.buildInfo.lng, function (txt: string) {
                        weizhi_txt.text = txt;
                    })
                    this.huxing_txt.text=roomType.tName+"( "+roomType.area+"平米 )";
                }
            }*/
        }

        private distance(start, end): number {
            return getDistance(start, end)
        }

        private goinRoom_begin() {
            this.dispatchEvent(new BasicEvent(WelcomeNewPlayersPanel.GOIN_NEW_ROOM,
            {build:this.buildInfo,room:this.roomInfo}));
            this.onclick_begin();
        }
        private onclick_begin(){
			this.dispatchEvent(new BasicEvent(WelcomeNewPlayersPanel.CLOSE));
		}
    }
}