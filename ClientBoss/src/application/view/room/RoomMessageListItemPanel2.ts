module game {
	export class RoomMessageListItemPanel2 extends eui.ItemRenderer  {
		private time_txt:eui.Label;
        private content_txt:eui.Label;
        private huifang_btn:eui.Button;
        private linghui_btn:eui.Button;
        private lingqu_btn:eui.Button;

		public constructor(data:any=null) {
			super();
			this.skinName = RoomMessageItemSkin2;
            this.adaptive();
		}
        private adaptive() {
			//this.scaleX=this.scaleY=GameConfig.innerScaleW;
		}
        private itemDate:any;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                let dateTime:Date=new Date(this.itemDate.tmvisit*1000);
                //msg.HouseVisitInfo
                this.time_txt.text=String(dateTime.getHours()+":"+dateTime.getMinutes());
                this.huifang_btn.visible=false;
                this.linghui_btn.visible=false;
                this.lingqu_btn.visible=false;
                if(this.itemDate.opttype==msg.HouseVisitType.TakeMoney){
                    this.content_txt.text="你收取了"+this.itemDate.optparam+"金币";
                }else if(this.itemDate.opttype==msg.HouseVisitType.RobMoney){
                    this.huifang_btn.visible=true;
                    this.content_txt.text=this.itemDate.visitorname+"在你的房屋里掠夺了"+this.itemDate.optparam+"金币";
                }
                else if(this.itemDate.opttype==msg.HouseVisitType.RobMaid){
                    this.linghui_btn.visible=true;
                    this.content_txt.text=this.itemDate.visitorname+"抢走您的女仆";
                }
                else if(this.itemDate.opttype==msg.HouseVisitType.TakeBackMaid){
                    if(this.itemDate.optparam>0){
                        this.lingqu_btn.visible=true;
                    }else{
                        this.huifang_btn.visible=true;
                    }
                    this.content_txt.text=this.itemDate.visitorname+"领回了他的女仆"+"领取产生的收益金币x"+this.itemDate.optparam;
                }
            }
        }
        private onclick_jingru(){

        }
	}
}