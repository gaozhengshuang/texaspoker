module game {
    export class ModifyHeadImgPanel extends eui.Component {

        private headImg1: eui.Image;
        private headImg2: eui.Image;
        private headImg3: eui.Image;
        private headImg4: eui.Image;
        private headImg5: eui.Image;
        private headImg6: eui.Image;

        private faceIndex: number = 0;

        private pageView:PageUserInfoView;

        public constructor(view:PageUserInfoView) {
            super();
            this.pageView=view;
            this.skinName = ModifyHeadImgSkin;
            for(let i:number=1;i<6;i++){
                this["headImg"+i].name="headImg"+i;
                this["headImg"+i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.select_begin, this);
            }

        }
        public update(index: number) {
            this.faceIndex = index;
            this.cancelAllImg();
            if (this.faceIndex > 0) {
                this["headImg"+index].filters=[];
            }
        }
        private select_begin(eve:egret.TouchEvent){
            this.cancelAllImg();
            let nameStr:string=(eve.target.name);
            let index:number=Number(nameStr.substring(7));
            this["headImg"+index].filters=[];
            if(index!=this.faceIndex){
                sendMessage("msg.C2GW_ReqSetFace",msg.C2GW_ReqSetFace.encode({face:String(index)}));
            }
            this.pageView.delPanelView();
        }

        private cancelAllImg(){
            for(let i:number=1;i<=6;i++){
               GrayScaleFilter.getInstance().setfilterFun(this["headImg"+i]); 
            }
        }
        public delPanel(){
            for(let i:number=1;i<=6;i++){
                this["headImg"+i].name="headImg"+i;
                this["headImg"+i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.select_begin, this);
            }
        }

    }
}