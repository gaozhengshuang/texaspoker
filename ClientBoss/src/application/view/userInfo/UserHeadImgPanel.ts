module game {
    export class UserHeadImgPanel extends eui.Component {

        private img: eui.Image;
        private faceIndex: number = 0;

        public constructor() {
            super();
            this.skinName = UserHeadSkin;

        }
        public update(index: number) {
            this.faceIndex = index;
            if (this.faceIndex > 0) {
                this.img.source = RES.getRes("headImg" + this.faceIndex + "_png");
                this.img.width = this.width;
                this.img.height = this.height;
            }
        }
    }
}