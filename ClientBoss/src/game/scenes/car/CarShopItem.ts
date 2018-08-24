module game {
	export class CarShopItem extends eui.ItemRenderer  {
        btnDetail   : eui.Group;

        img_Icon    : eui.Image;
        btnBg       : eui.Image;

        ItemName    : eui.Label;
        priceTxt    : eui.Label;
        percentTxt  : eui.Label;
        stateTxt    : eui.Label;
        lackNumTxt  : eui.Label;


		public constructor(data:any=null) {
			super();
            this.skinName = "resource/skins/car/CarShopItemSkin.exml";
            this.btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickBuy,this);
            
		}

        private itemData: msg.CarProductData;
        protected dataChanged():void{
            this.itemData=this.data;
            if(this.itemData){
             
                console.log("内容--------------->",this.itemData);
                let tCarShopData = table.TCarShopById[this.itemData.pid];
                if(!tCarShopData) return;
                
                //价格
                this.priceTxt.textFlow = [
                    {text:tCarShopData.Price+"金币"}
                ]
                //剩余
                this.lackNumTxt.text = "剩余"+(this.itemData.sell - this.itemData.sold)+"辆";
                //按钮状态提示字
                let stateStr = "";
                if(this.itemData.sell>this.itemData.sold){
                    if(DataManager.playerModel.getScore() < tCarShopData.Price){
                        stateStr = "金币不足";
                        this.btnBg.source = "uiCarAltas_json.buyBtn2";
                    }
                    else{
                        stateStr = "详情";
                        this.btnBg.source = "uiCarAltas_json.buyBtn1";
                    }
                }
                else{
                    stateStr = "已售完";
                    this.btnBg.source = "uiCarAltas_json.buyBtn2";
                }
            
                this.stateTxt.text = stateStr;
                
                let tCarItemData = table.TCarById[tCarShopData.Carid];
                if(!tCarItemData) return;
                //名字
                this.ItemName.textFlow = [
                    {text:""+tCarItemData.Brand+"-"+tCarItemData.Model}
                ]
                //收益
                this.percentTxt.textFlow = [
                    {text:tCarItemData.RewardPerH+"金币"},
                    {text:"\n"+"每分钟"}
                ]
                //Icon
                let txtr:egret.Texture = RES.getRes(tCarItemData.path);
                let factor = 1;
                if(txtr)
                {
                    this.img_Icon.source    = txtr;
                    this.img_Icon.width     = txtr.textureWidth * factor;
                    this.img_Icon.height    = txtr.textureHeight * factor;
                }
      
            }
        }
        private OnClickBuy(){
            CarShop.getInstance().OpenBuyInfoPanel(this.itemData);
        }
	}
}