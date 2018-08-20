module game {
	export class NeighborCarItem extends eui.ItemRenderer  {

        imageEmpty      : eui.Image;
        imageFull       : eui.Image
        imageMy         : eui.Image;
        
        infoTxt         : eui.Label;
        name_txt        : eui.Label;
        roomNum_txt     : eui.Label;

		public constructor(data:any=null) {
			super();
			this.skinName = "resource/skins/car/NeighborCarItem.exml"; 
		}

        private itemData:HouseVO;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){
                this.name_txt.text=this.itemData.ownername;
                this.roomNum_txt.text='房间 : '+this.itemData.rId+"室";
                //console.log(this.itemData.ownername+"-----设置车位空满-----", this.data.empty);
                this.imageEmpty.visible = this.data.empty && true;
                this.imageFull.visible  = ! (this.data.empty && true);
                this.imageMy.visible    = this.itemData.myCarPark && true;
            }
        }
	}
}