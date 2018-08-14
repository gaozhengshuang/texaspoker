module game {
	export class NeighborListItemPanel extends eui.ItemRenderer  {
		private name_txt:eui.Label;
        private roomNum_txt:eui.Label;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/NeighborItemPanel.exml";            
		}
        private itemDate:RoomVO;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                this.name_txt.text=this.itemDate.rUserName;
                this.roomNum_txt.text='房间 : '+this.itemDate.houseNum+"室";
            }
        }
	}
}