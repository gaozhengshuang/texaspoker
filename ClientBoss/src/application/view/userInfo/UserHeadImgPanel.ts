module game {
    export class UserHeadImgPanel extends eui.Component {

        private img: eui.Image;
        private faceIndex: number = 0;

        public constructor() {
            super();
            this.skinName = UserHeadSkin;

        }
        public update(index: number, w: number = 130, h: number = 130) {
            this.faceIndex = index;
            this.img.width = this.width;
            this.img.height = this.height;
            if (this.faceIndex > 0) {
                this.img.source = RES.getRes("headImg" + this.faceIndex + "_png");

            }else{
                this.img.source ="";
            }
        }
    }
}