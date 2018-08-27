module game {
    export class CarShopBuy extends eui.Component  {
        
        allGroup            : eui.Group;
      
        carIcon             : eui.Image;
        buyBtnBg            : eui.Image;

        carNameTxt          : eui.Label;
        txt_info            : eui.Label;
        diamondNum          : eui.Label;
        goldNum             : eui.Label;
        percentNum          : eui.Label;

        btnClose            : IconButton;

        private itemData    : msg.CarProductData;
      
        public constructor() {
            super();
            this.skinName = "resource/skins/car/CarShopBuySkin.exml";
        }
        public setData(data:msg.CarProductData) {
            let userInfo = DataManager.playerModel.getUserInfo();
            this.goldNum.text    = userInfo.gold.toString();
            this.diamondNum.text = userInfo.diamond.toString();
            this.percentNum.text = userInfo.robcount + "/" + 20;

            this.btnClose.icon = "uiCarAltas_json.backBtn2";
            this.buyBtnBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickBuy,this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnCloseHandle,this);

            if(!data) return;
            this.itemData = data;
            
            let carShopData : table.ITCarShopDefine = table.TCarShopById[data.pid];
            let carItemData : table.ITCarDefine     = table.TCarById[carShopData.Carid];

            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.bigpath);
            let factor = 1;
            if(txtr)
            {
                this.carIcon.source    = txtr;
                this.carIcon.width     = txtr.textureWidth * factor;
                this.carIcon.height    = txtr.textureHeight * factor;
            }
            //名字
            this.carNameTxt.textFlow = [
                { text: carItemData.Brand+"-"+carItemData.Model, style: { bold: true } },
            ]
            //属性
            this.txt_info.text = "产能："+ carItemData.RewardPerH + "金币/小时" + "\n"+"价格："+ carItemData.Price+"金币";
        }

        private OnClickBuy(){
            CarShop.getInstance().BuyItem(1,this.itemData.pid);
        }

        private OnCloseHandle() {
            CarShop.getInstance().CloseBuyInfoPanel();
        }
    }
}