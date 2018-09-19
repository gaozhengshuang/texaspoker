module game {
    export class PointCityItemPanel extends eui.Component {

        private kuang: eui.Rect;
        private txt: eui.Label;

        public itemData:table.ITCitysDefine;
        private isOpen:boolean=false;
        private isSelect:boolean=false;
        public indexNum:number=0;

        public parentView:ModifyPointViewPanel;

        public constructor(view:ModifyPointViewPanel,data:table.ITCitysDefine,index:number) {
            super();
            this.skinName = PointCityItemSkin;
            this.touchChildren=false;
            this.parentView=view;
            this.indexNum=index;
            this.itemData=data;
            this.init(this.itemData);

        }
        public init(data:table.ITCitysDefine) {
            this.isOpen=false;
            if(data){
                this.txt.text=data.Name;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
        }
        public updataSelect(bool:boolean){
            this.isSelect=bool;
            if(this.isSelect){
                this.kuang.strokeColor=0xff6772;
            }else{
                this.kuang.strokeColor=0xDCDCE6;
            }
        }
        private onclick_tap(eve:egret.TouchEvent){
            this.parentView.selectCity(this.indexNum);
        }

        public delPanel(){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
            if(this.parent!=null)
            {
                this.parent.removeChild(this);
            }
        }
    }
}