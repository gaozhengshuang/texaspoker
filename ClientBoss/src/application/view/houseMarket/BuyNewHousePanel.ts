module game {
	export class BuyNewHousePanel extends eui.Component {

		public static CLOSE: string = "close";
		public static BUY: string = "buy";

		private huxingImg: eui.Image;

        private name_txt: eui.Label;
        private danjia_txt: eui.Label;
        private shouyi_txt: eui.Label;
        private zongjia_txt: eui.Label;

        private buy_btn: eui.Button;
		private close_btn: IconButton;
        private parentView:PageNewHouseHuxingView;
		public constructor(view:PageNewHouseHuxingView) {
			super();
			this.skinName = BuyNewHouseSkin;
            this.parentView=view;
			this.close_btn.icon="lucky_json.leftBack";
			this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
		}
		private onclick_close(){
            this.parentView.delBuyPanel();
		}
		private onclick_buy(){
            this.parentView.dispatchEvent(new BasicEvent(PageNewHouseHuxingView.BUY,
            {build:this.parentView.buildInfo.Id,index:this.houseInfo.index}));
			
		}
		private houseInfo: any;
        public dataChanged(data): void {
            this.houseInfo = data;
            if (this.houseInfo) {
                this.name_txt.text = this.houseInfo.data.Des+"("+this.houseInfo.area+"平)";
                this.danjia_txt.text=this.houseInfo.price+"金/平米";
                this.shouyi_txt.text=this.getTotalChanLiang()+"金";
                this.zongjia_txt.text=this.houseInfo.price*this.houseInfo.area+"金";
                this.huxingImg.source=RES.getRes("huxing_"+this.houseInfo.data.ImageId+"_s_png");
            }
        }

		private getTotalChanLiang(): number {
            let num: number = 0;
            if (this.houseInfo.data) {
                let listStr:string=this.houseInfo.data.Cells.split("-");
                if(listStr && listStr.length>0){
                    for (let i: number = 1; i <=listStr.length; i++) {
                    let type: any = table.THouseCellById[i*1000+1];
                    if (type) {
                        num += type.ProduceGold;
                    }
                }
                }
                
            }
            return num;
        }
		public delPanel(){
			if(this.parent){
				this.buy_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
				this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_buy, this);
				this.parent.removeChild(this);
			}
		}
	}
}