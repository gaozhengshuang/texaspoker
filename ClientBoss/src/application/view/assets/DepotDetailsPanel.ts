module game {
	export class DepotDetailsPanel extends eui.Component {
		private itemImg: eui.Image;

		private name_txt: eui.Label;
		private num_txt: eui.Label;
		private info_txt: eui.Label;

		private use_btn: eui.Button;
		private item:any;
		private itemInfo:any;

		public constructor() {
			super();
			this.skinName = DepotDetailsPanelSkin;
		}

		public showPanel(info:any){
			this.item=info;
			if(this.item){
				this.itemInfo = table.ItemBaseDataById[this.item.id];
				if(this.itemInfo){
					this.itemImg.source=RES.getRes("item_"+this.itemInfo.ImageId+"_png");
					this.name_txt.text=this.itemInfo.Name;
					this.info_txt.text=this.itemInfo.Desc;
					this.num_txt.text="数量:"+this.item.num;
					if(this.itemInfo.Clothes>0){
						this.use_btn.visible=true;
					}else{
						this.use_btn.visible=false;
					}
				}
			}

		}
		public hidePanel(){
			
		}
	}
}