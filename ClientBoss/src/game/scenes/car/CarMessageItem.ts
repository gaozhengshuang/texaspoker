module game {
	export class CarMessageItem extends eui.ItemRenderer  {

        content_txt :eui.Label;
        stateTxt    :eui.Label;

		public constructor(data:any=null) {
			super();
            this.skinName = "resource/skins/car/CarMessageItemSkin.exml";
		}

        private itemData:string;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){
                //内容
                console.log("内容--------------->",this.itemData);
                let _contentStr : egret.ITextElement[] = [{text:this.itemData.split("_"[0])[3]}];
                this.content_txt.textFlow = <Array<egret.ITextElement>>_contentStr;

                //Type
                let operatortype =  parseInt(this.itemData.split("_"[0])[1]);
                switch (operatortype) {
                    case msg.CarOperatorType.Park:
                        this.stateTxt.text= "贴条";
                    break;
                    case msg.CarOperatorType.TakeBack:
                        this.stateTxt.text= "拜访";                            
                    break;                    
                    case msg.CarOperatorType.Ticket:
                        this.stateTxt.text= "拜访";                                                    
                    break;
                }        
            }
        }
	}
}