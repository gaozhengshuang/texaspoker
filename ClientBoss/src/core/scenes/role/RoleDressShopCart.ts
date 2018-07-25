module game {
    export class ShopItem {
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
    }

    export class RoleDressShopCart extends PanelComponent {

        //coin_money: game.Coins;
        coin_gold           : Coins;
        ShopItemViewScroller: eui.Scroller;
        ShopItemList        : eui.List;
        listGroup           : eui.Group;
        
        btn_close           : IconButton;
        btn_buy             : IconButton;
        shopNum             : eui.Label;
        totalCost           : eui.Label;
        _dataProvider       : eui.ArrayCollection;

        _shopItemCarts      : ShopItem[];
        totalCosts          : number[];

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
            this._shopItemCarts = [];
            this.totalCosts = [0,0,0];
            this.btn_close.icon = "dress_01_json.dress_01_16"
            this.btn_buy.icon = "dress_01_json.dress_01_21";
            this.coin_gold.coins = DataManager.playerModel.getScore();
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.btn_close, callBackFunc: this.OnCloseHandle },
                { target: this.btn_buy, callBackFunc: this.OnConfirmBuy },
            ];

            this._shopItemCarts = [];
            this.totalCosts = [0,0,0];

            this.shopNum.text = "0";
            this.totalCost.text = "0";
            this.UpdateList();
        }

        private UpdateList()
        {
            this.listGroup.removeChildren();

            //let ShopItems = [];
            this._dataProvider = new eui.ArrayCollection();

            for (let i = 0; i < 70; i++) {
                let data: ShopItem = new ShopItem();
                let item: ShopItemInfo = new ShopItemInfo();

                item.x = 0;
                item.y = 150 * i;
                item.width = 680;
                item.height = 141;

                data.init(i, Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 400 + 100), "item" + i, "", "双倍积分时间增加1秒");
                item.setData(data);
                this.listGroup.addChild(item);
               //ShopItems.push({ id: i, lv: Math.floor(Math.random() * 4 + 1), name: "item" + i });
            }
           
            this.ShopItemViewScroller.viewport = this.listGroup;
            this.ShopItemViewScroller.stopAnimation();
            this.ShopItemViewScroller.viewport.scrollV = 0;
        }

        public OnChooseItem(choose: boolean, data: ShopItem) {
            if (choose) {
                this._selectShopItem(data);
            }
            else {
                this._quitShopItem(data);
            }
            this.shopNum.text = this._shopItemCarts.length.toString();
            this.totalCost.text = this.totalCosts[0].toString();
        }

        private _selectShopItem(data: ShopItem) {
            if (this._shopItemCarts.some(item => { return item.id == data.id && item.lv == item.lv })) {
                console.log("购物车中有同样的物品");
            }
            else {
                this._shopItemCarts.push(data);
                this.totalCosts[0] += data.price;
            }
        }

        private _quitShopItem(data: ShopItem) {
            let _carts = this._shopItemCarts.filter(item => { return item.id == data.id && item.lv == item.lv });
            if (_carts.length == 0) {
                console.log("上次购物车中没有这个物品");
            }
            else {
                if (_carts.length > 1) {
                    console.warn("上次购物车中这个物品有" + _carts.length + "个");
                }
                let index = this._shopItemCarts.indexOf(_carts[0]);
                this._shopItemCarts.splice(index, 1);
                this.totalCosts[0] -= _carts[0].price;
            }
        }

        private moveScroller(): void {
            //点击按钮后改变滚动的位置
            var sc = this.ShopItemViewScroller;
            sc.viewport.scrollV += 10;
            if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
                console.log("滚动到底部了");
            }
        }

        //确认购买
        private OnConfirmBuy() {
            console.log("购物车中有"+this._shopItemCarts.length+"个商品");
            let list: number[]  = this._shopItemCarts.map(item =>{return item.id;});
            sendMessage("msg.C2GW_BuyClothes", msg.C2GW_BuyClothes.encode({itemList:list}));
        }

        private OnCloseHandle() {
            this.remove();
        }

    }
}