module game {
    export class SceneAssetsItemPanel extends eui.ItemRenderer {
        private build_img: eui.Image;

        private name_txt: eui.Label;
        private weizhi_txt: eui.Label;
        private huxing_txt: eui.Label;
        private junjia_txt: eui.Label;
        private channeng_txt: eui.Label;

        private chushou_icon: eui.Image;
        private jiaoBiaoIcon: eui.Image;
        private bg_mc:eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = "resource/skins/SceneAssetsItemSkin.exml";
            //this.adaptive();
            this.chushou_icon.visible=false;
            this.jiaoBiaoIcon.visible=false;
            this.bg_mc.alpha=0;
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onclick_begin, this);
            this.bg_mc.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onclick_begin, this);

        }
        private onclick_begin(eve:egret.TouchEvent){
            if(eve.type==egret.TouchEvent.TOUCH_BEGIN){
                this.bg_mc.alpha=1;
            }else{
                this.bg_mc.alpha=0;
            }

        }
        private adaptive(){
            this.scaleX=GameConfig.innerScaleW;
            this.scaleY=GameConfig.innerScaleW;
        }

        private itemDate:HouseVO;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                console.log(this.itemDate);
                if(this.itemDate.bId<=0){
                    this.name_txt.text = this.itemDate.rId+"号房间(租)";
                }else{
                    this.name_txt.text = this.itemDate.rId+"号房间";
                }
                let houseType:any=table.THouseById[this.itemDate.tId];
                if(houseType){
                    this.huxing_txt.text="户型："+houseType.Des;
                    this.build_img.source=RES.getRes("huxing_"+houseType.ImageId+"_s_png");
                }
                if(this.itemDate.isHave){
                    this.jiaoBiaoIcon.visible=true;
                }else{
                    this.jiaoBiaoIcon.visible=false;
                }
                
                /*let weizhiTxt = this.weizhi_txt;
                GameConfig.getCityNameFun(this.itemDate.bLatLng[0],
                    this.itemDate.bLatLng[1], function (txt: string) {
                        weizhiTxt.text = txt;
                    });
                let roomType:RoomTypeVO=GameConfig.getRoomType(this.itemDate.tId)
                if(roomType){
                    this.huxing_txt.text=roomType.tName+roomType.area+"平米";
                }
                this.junjia_txt.text="当前均价"+this.itemDate.price+"元/平米";

                this.build_img.source='resource/assets/'+this.itemDate.bImage+'.png';

                if(this.itemDate.status==2){
                    this.chushou_icon.visible=true;
                }*/
            }
        }
    }
}