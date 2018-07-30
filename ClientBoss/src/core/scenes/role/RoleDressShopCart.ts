module game {
/*     export class ShopItem {
        public id       : number;
        public lv       : number;
        public price    : number;
        public name     : string;
        public icon     : string;
        public des      : string;

        public init(id, lv, price = 0, name = "", icon = "", des = "") {
            this.id = id; this.lv = lv; this.price = price;
            this.name = name; this.icon = icon; this.des = des;
        }
    } */

    export class RoleDressShopCart extends PanelComponent {

        //coin_money: game.Coins;
        ShopItemViewScroller: eui.Scroller;
        ShopItemList        : eui.List;
        listGroup           : eui.Group;
        
        btn_close                       :IconButton;
        btn_buy                         :IconButton;
        btn_all                         :IconButton;
        allSelectTip                    :eui.Image;                         
        goldNumTxt                      :eui.Label;
        diamondNumTxt                   :eui.Label;
        shopNum                         :eui.Label;
        totalCost_gold2                 :eui.Label;
        totalCost_diamond2              :eui.Label;
        
        _dataProvider       : eui.ArrayCollection;

        totalCosts          : number[];             //选中合计花费
        _allShopItemIds     : number[];             //购物车内所有商品ID
        _ShopItemInfos      : ShopItemInfo[];      
        _shopItemCarts      : table.IEquipDefine[]; //当前选择商品
        
        _selectAll = false;
        
        protected getSkinName() {
            return ShoppingCartSkin;
        }

        private static _instance: RoleDressShopCart;

        public static getInstance(): RoleDressShopCart {
            if (!RoleDressShopCart._instance) {
                RoleDressShopCart._instance = new RoleDressShopCart();
            }
            return RoleDressShopCart._instance;
        }

        public init() {

            if (gameConfig.isIphoneX()) {
                this.btn_close.y += 50;
            }

            this._shopItemCarts = [];
            this.totalCosts = [0,0,0];
            this.btn_close.icon = "lucky_json.luckycloseBtn"
            this.btn_buy.icon = "dress_01_json.dress_01_21";
            this.btn_all.icon = "shopItemButtonBg_png";
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.btn_close, callBackFunc: this.OnCloseHandle },
                { target: this.btn_buy, callBackFunc: this.OnConfirmBuy },
                { target: this.btn_all, callBackFunc: this.OnSeletAll },
            ];
        }
        //更新购物车商品列表
        public UpdateData(ids:number[])
        {
            this._allShopItemIds = ids.map(id=>{return id});
            this.refreshShopCarts();
        }

        public refreshShopCarts()
        {
            let goldNum = DataManager.playerModel.getScore();
            let moneyNum = DataManager.playerModel.getDiamond();
            
            this.goldNumTxt.text = goldNum.toString();
            this.diamondNumTxt.text = moneyNum.toString();

            this._shopItemCarts = [];
            this._ShopItemInfos = [];
            this.totalCosts = [0,0,0];

            this.shopNum.text = "0";
            this.totalCost_gold2.text = "0";
            this.totalCost_diamond2.text = "0";

            this._selectAll = false;
            this.allSelectTip.visible  = this._selectAll;
            this.UpdateList();
        }

        private UpdateList()
        {
            this.listGroup.removeChildren();
            if(!this._allShopItemIds || this._allShopItemIds.length==0) return;
          
            this._dataProvider = new eui.ArrayCollection();
            
            for (let i = 0; i < this._allShopItemIds.length; i++) {
                let data: table.IEquipDefine = table.EquipById[this._allShopItemIds[i]];
                let item: ShopItemInfo = new ShopItemInfo();
                this._ShopItemInfos.push(item);

                item.x = 0;
                item.y = 150 * i;
                item.setData(data);
                this.listGroup.addChild(item);
            }
           
            this.ShopItemViewScroller.viewport = this.listGroup;
            this.ShopItemViewScroller.stopAnimation();
            this.ShopItemViewScroller.viewport.scrollV = 0;
        }

        public OnChooseItem(choose: boolean, data: table.IEquipDefine) {
            if (choose) {
                this._selectShopItem(data);
            }
            else {
                this._quitShopItem(data);
            }
            this.shopNum.text = this._shopItemCarts.length.toString();

            let curgold = DataManager.playerModel.getScore();
            let textColor = curgold < this.totalCosts[0] ? 0xFF0026 : 0xFFFFFF;
            this.totalCost_gold2.textFlow = [
                {text:this.totalCosts[0].toString(), style:{"textColor": textColor,"bold": true}}]

            curgold = DataManager.playerModel.getDiamond();
            textColor = curgold < this.totalCosts[1] ? 0xFF0026 : 0xFFFFFF;
            this.totalCost_diamond2.textFlow = [
                {text:this.totalCosts[1].toString(), style:{"textColor": textColor,"bold": true}}]
                
        }

        private _selectShopItem(data: table.IEquipDefine) {
            if (this._shopItemCarts.some(item => { return item.Id == data.Id})) {
                console.log("购物车中有同样的物品");
            }
            else {
                this._shopItemCarts.push(data);
                switch (data.CoinType) {
                    case 1: this.totalCosts[0] += data.Price; break;
                    case 2: this.totalCosts[1] += data.Price; break;
                }
            }
        }

        private _quitShopItem(data: table.IEquipDefine) {
            let _carts = this._shopItemCarts.filter(item => { return item.Id == data.Id});
            if (_carts.length == 0) {
                console.log("上次购物车中没有这个物品");
            }
            else {
                if (_carts.length > 1) {
                    console.warn("上次购物车中这个物品有" + _carts.length + "个");
                }
                let index = this._shopItemCarts.indexOf(_carts[0]);
                this._shopItemCarts.splice(index, 1);
                switch (data.CoinType) {
                    case 1: this.totalCosts[0] -= _carts[0].Price; break;
                    case 2: this.totalCosts[1] -= _carts[0].Price;; break;
                }
                
            }
        }

        private moveScroller(): void {
            //点击按钮后改变滚动的位置
            var sc = this.ShopItemViewScroller;
            sc.viewport.scrollV += 10;
            if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
                console.log("滚动到底部了");
                this._ShopItemInfos[0].alpha = 0.5;
            }
        }

        //确认购买
        private OnConfirmBuy() {
            console.log("购物车中有"+this._shopItemCarts.length+"个商品");
            if(this._shopItemCarts.length==0) return;
            let list: number[]  = this._shopItemCarts.map(item =>{return item.Id;});
            sendMessage("msg.C2GW_BuyClothes", msg.C2GW_BuyClothes.encode({itemList:list}));
        }

        //选择全部
        private OnSeletAll(){
            this._selectAll = !this._selectAll;
            this.allSelectTip.visible  = this._selectAll;
            this._ShopItemInfos.forEach(item=>{item.chooseAll(this._selectAll);});
        }

        private OnCloseHandle() {
            this.remove();
        }

    }
}