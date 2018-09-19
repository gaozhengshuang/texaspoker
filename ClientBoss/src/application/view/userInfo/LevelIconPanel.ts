module game {
    export class LevelIconPanel extends eui.Component {

        private num1: eui.Image;
        private num2: eui.Image;
        private levelNum: number = 0;

        public constructor() {
            super();
            this.skinName = LevelIconSkin;

        }
        public update(num: number) {
            this.levelNum = num;
            if (this.levelNum > 0) {
                let numStr:string=String(this.levelNum);
                if(numStr.length>=2){
                    this.num1.source = RES.getRes("rLevel" + numStr.substr(0,1)+ "_png");
                    this.num2.source = RES.getRes("rLevel" + numStr.substr(1,1)+ "_png");
                    this.num2.visible=true;
                }else{
                    this.num2.visible=false;
                    this.num1.source = RES.getRes("rLevel" + numStr + "_png");
                }
                
                
            }
        }
    }
}