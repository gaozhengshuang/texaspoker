module game {
	export class RoomMessageListItemPanel2 extends eui.ItemRenderer  {
		private time_txt:eui.Label;
        private content_txt:eui.Label;
        private huifang_btn:eui.Button;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/RoomMessageItemSkin2.exml";
            this.adaptive();
		}
        private adaptive() {
			this.scaleX=this.scaleY=GameConfig.innerScaleW;
		}
        private itemDate:any;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                let dateTime:Date=new Date(this.itemDate.tmvisit*1000);
                this.time_txt.text=String(dateTime.getHours()+":"+dateTime.getMinutes());
                if(this.itemDate.opttype==1){
                    this.content_txt.text="你收取了"+this.itemDate.optparam+"金币";
                }else if(this.itemDate.opttype==2){
                    this.content_txt.text=this.itemDate.visitorname+"在你的房屋里掠夺了"+this.itemDate.optparam+"金币";
                }
            }
        }
        private onclick_jingru(){

        }
	}
}