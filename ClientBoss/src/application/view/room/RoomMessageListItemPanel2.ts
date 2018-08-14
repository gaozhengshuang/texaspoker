module game {
	export class RoomMessageListItemPanel2 extends eui.ItemRenderer  {
		private time_txt:eui.Label;
        private content_txt:eui.Label;
        private huifang_btn:eui.Button;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/RoomMessageItemSkin2.exml";
            
		}
        private itemDate:MessageVO;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                let dateTime:Date=new Date(this.itemDate.createTime*1000);
                this.time_txt.text=String(dateTime.getHours()+":"+dateTime.getMinutes());
                this.content_txt.text=this.itemDate.template;
            }
        }
        private onclick_jingru(){

        }
	}
}