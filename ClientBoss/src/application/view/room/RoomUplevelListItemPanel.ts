module game {
	export class RoomUplevelListItemPanel extends eui.ItemRenderer  {
		private level_txt:eui.Label;
        private chanliang_txt:eui.Label;
        private quyuImg:eui.Image;
        private btnGruop:eui.Group;
        private spend_txt:eui.Label;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/RoomUplevelListUI.exml";            
		}
        private itemDate:any;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                
            }
        }
	}
}