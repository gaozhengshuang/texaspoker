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
			this.skinName = NeighborCarItemSkin; 
		}

        private itemData:HouseVO;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){
                    //console.log(this.itemData.ownername+"-----设置车位空满-----", this.data.empty);
                //this.name_txt.text= this.itemData.ownerid==0 && "进入公共车位" || this.itemData.ownername;
                this.name_txt.text= this.itemData.ownername;

                this.imageEmpty.visible  = this.data.empty && true;
                this.imageFull.visible   = ! (this.data.empty && true);
                this.imageMy.visible     = this.itemData.myCarPark && true;
                this.roomNum_txt.visible = this.itemData.ownerid!=0;
                if(this.itemData.ownerid==0){ 
                    console.log(this.itemData.ownername+"-----公共车位-----", this.data.empty);
                    return;
                }

                this.roomNum_txt.text='房间 : '+this.itemData.rId+"室";

  
            }
        }
	}
}