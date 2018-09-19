module game {
	export class BuildingHuxingItemPanel extends eui.Component  {
		private img:eui.Image;
		public constructor() {
			super();
			this.skinName=HuxingItemSkin;
			this.img.visible=false;
		}
		public itemDate:any;
        public dataChanged(data:any):void{
            this.itemDate=data;
            if(this.itemDate){
				this.img.visible=true;
                this.img.source=RES.getRes("huxing_"+this.itemDate.data.ImageId+"_s_png");
                
            }
        }
        public suofang(scale:number){
            this.img.scaleX=this.img.scaleY=scale;
        }
	}
}