declare function getDistance(start: any, end: any);
module game {
    export class WelcomeNewPlayersPanel extends PanelComponent {
        public static GOIN_NEW_ROOM: string = "goin_new_room";
        public static CLOSE: string = "close";
        public username_txt: eui.Label;
        public word_txt: eui.Label;
        public name_txt: eui.Label;
        public weizhi_txt: eui.Label;
        public huxing_txt: eui.Label;
        public goinRoom_btn: eui.Button;
        public buildingImage: eui.Image;

        private buildInfo: BuildingVO;
        private roomInfo: HouseVO;
        private userInfo: UserVO;
        constructor()
        {
            super();
            this._isShowDark = this._isShowEffect = false;
        }
        protected getSkinName() {
            return WelcomePanelSkin;
        }
        protected beforeShow() {
            this.goinRoom_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goinRoom_begin, this);
        }
        protected beforeRemove() {
            this.goinRoom_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goinRoom_begin, this);
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
        }
        // private adaptive() {
            //this.scaleX = this.scaleY = GameConfig.innerScale;
            // this.anchorOffsetX = this.width / 2;
            // this.anchorOffsetY = this.height / 2;
        // }

        public initInfo(room: HouseVO) {
            this.roomInfo = room;

            if (this.roomInfo) {
                this.username_txt.text = "尊敬的：" + this.roomInfo.ownername;
                // let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId);
                // if (roomType) {
                this.word_txt.text = "欢迎入驻《财富人生》，这是一个充满梦想的世界。\n为了更快了解这个世界，为您准备了一处租房。\n房间号："
                    + this.roomInfo.rId + "\n快来创造属于自己的财富吧！"
                //this.buildingImage.source = 'resource/assets/' + this.buildInfo.bImage1 + '.png';
                //}
            }
        }

        private distance(start, end): number {
            return getDistance(start, end)
        }

        private goinRoom_begin() {
            this.dispatchEvent(new BasicEvent(WelcomeNewPlayersPanel.GOIN_NEW_ROOM,
                { houseid: this.roomInfo.rId }));
            this.onclick_begin();
        }
        private onclick_begin() {
            this.dispatchEvent(new BasicEvent(WelcomeNewPlayersPanel.CLOSE));
        }
        private static _instance: WelcomeNewPlayersPanel = null;
        public static getInstance(): WelcomeNewPlayersPanel {
            if (!WelcomeNewPlayersPanel._instance) {
                WelcomeNewPlayersPanel._instance = new WelcomeNewPlayersPanel();
            }
            return WelcomeNewPlayersPanel._instance;
        }
    }
}