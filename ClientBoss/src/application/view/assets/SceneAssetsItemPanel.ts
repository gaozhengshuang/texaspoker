module game {
    export class SceneAssetsItemPanel extends eui.ItemRenderer {
        private build_img: eui.Image;

        private name_txt: eui.Label;
        private weizhi_txt: eui.Label;
        private huxing_txt: eui.Label;
        private junjia_txt: eui.Label;

        private hCoin_icon: eui.Image;
        private hQuan_icon: eui.Image;
        private chushou_icon: eui.Image;

        public constructor(data: any = null) {
            super();
            this.skinName = "resource/skins/SceneAssetsItemSkin.exml";
            this.adaptive();
            this.hCoin_icon.visible=false;
            this.hQuan_icon.visible=false;
            this.chushou_icon.visible=false;

        }
        private adaptive(){
            this.scaleX=GameConfig.innerScaleW;
            this.scaleY=GameConfig.innerScaleW;
        }
        private itemDate: RoomVO;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.name_txt.text = this.itemDate.bName;
                let weizhiTxt = this.weizhi_txt;
                GameConfig.getCityNameFun(this.itemDate.bLatLng[0],
                    this.itemDate.bLatLng[1], function (txt: string) {
                        weizhiTxt.text = txt;
                    });
                /*let roomType:RoomTypeVO=GameConfig.getRoomType(this.itemDate.tId)
                if(roomType){
                    this.huxing_txt.text=roomType.tName+roomType.area+"平米";
                }*/
                this.junjia_txt.text="当前均价"+this.itemDate.price+"元/平米";

                this.build_img.source='resource/assets/'+this.itemDate.bImage+'.png';

                if(this.itemDate.status==2){
                    this.chushou_icon.visible=true;
                }
            }
        }
    }
}