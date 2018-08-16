module game {
	export class NeighborListItemPanel extends eui.ItemRenderer  {
		private name_txt:eui.Label;
        private roomNum_txt:eui.Label;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/NeighborItemPanel.exml";
            this.adaptive();             
		}
        private adaptive() {
			//this.scaleX=this.scaleY=GameConfig.innerScaleW;
		}
        private itemDate:HouseVO;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                this.name_txt.text=this.itemDate.ownername;
                this.roomNum_txt.text='房间 : '+this.itemDate.rId+"室";
            }
        }
	}
}