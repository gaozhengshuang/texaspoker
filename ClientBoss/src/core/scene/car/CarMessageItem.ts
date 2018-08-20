module game {
	export class CarMessageItem extends eui.ItemRenderer  {
		time_txt    :eui.Label;
        content_txt :eui.Label;
        stateTxt    :eui.Label;

        huifang_btn :eui.Button;
        stateGroup  :eui.Group;
		public constructor(data:any=null) {
			super();
            this.skinName = "resource/skins/RoomMessageItemSkin2.exml";
            this.stateGroup.visible = true;
		}

        private itemData:string;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){

                //内容
                let _contentStr : egret.ITextElement[] = [{text:this.itemData.split("_"[0])[1]}];
                this.content_txt.textFlow = <Array<egret.ITextElement>>_contentStr;

                //玩家ID

                //时间
/*                 let dateTime:Date=new Date(Number(this.itemData.recordtime));
                //this.time_txt.text=String(dateTime.getHours()+":"+dateTime.getMinutes());
                this.time_txt.text= formatTime(dateTime,"hh:mm:ss");
                
                let _carData = table.TCarById[this.itemData.cartid];
                let  carName = _carData.Brand + ""+ _carData.Model; */

/*                 switch (this.itemData.operatortype) {
                    case msg.CarOperatorType.Park:
                        if(this.itemData.parkingownerid == DataManager.playerModel.getUserId()){
                            this.content_txt.text= this.itemData.carownername+"将他的"+carName+"停在了你的车位";
                            this.stateTxt.text= "贴条";
                        }
                        else{
                            console.warn("客户端筛选了错误的记录");
                        }
                        
                    break;
                    case msg.CarOperatorType.TakeBack:
                        if(this.itemData.parkingownerid == DataManager.playerModel.getUserId()){
                            this.content_txt.text= this.itemData.carownername+"开走了他的"+carName;
                            this.stateTxt.text= "拜访";                            
                        }
                        else{
                            console.warn("客户端筛选了错误的记录");
                        }
                    break;                    
                    case msg.CarOperatorType.Ticket:
                    if(this.itemData.carownerid == DataManager.playerModel.getUserId()){
                        this.content_txt.text= this.itemData.carownername+"对你的"+carName+"贴条";
                        this.stateTxt.text= "拜访";                                                    
                    }
                    else{
                        console.warn("客户端筛选了错误的记录");
                    }
                    break;
                }
 */
            }
        }
	}
}