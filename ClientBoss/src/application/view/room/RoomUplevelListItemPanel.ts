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
            this.adaptive();           
		}
        private adaptive() {
			//this.scaleX=this.scaleY=GameConfig.innerScaleW;
		}
        private itemDate:any;
        protected dataChanged():void{
            this.itemDate=this.data;
            if(this.itemDate){
                this.quyuImg.source="resource/assets2/roomLevelIcon"+(this.itemDate.index+1)+".png";
                this.level_txt.text=this.itemDate.name+"等级"+this.itemDate.data.level+"级——"
                +this.itemDate.name+"等级"+(this.itemDate.data.level+1)+"级";
                let type:any;
                console.log(this.itemDate.data);
                if(this.itemDate.index==0){
                    type=table.THouseById[this.itemDate.data.tId];
                    this.spend_txt.text=""+type.LevelUpCost;

                }else{
                    type=table.THouseCellById[this.itemDate.data.tid];
                    this.spend_txt.text=""+type.LevelUpCost;
                }
            }
        }
	}
}