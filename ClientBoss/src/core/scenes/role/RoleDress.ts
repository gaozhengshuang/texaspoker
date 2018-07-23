module game {

    class ItemInfo {
        constructor(imgPath, price, priceUnit = 1) {
            this.imgPath = imgPath;
            this.price = price;
            this.priceUnit = priceUnit;
            this.isObtained = false;
        }
        public imgPath: string;
        public price: number;
        public priceUnit: number; // 1表示现金流，2 表示金币，3 表示元宝等等
        public isObtained: boolean;
    }

    export class RoleDress extends PanelComponent {
        public img_girlbg: eui.Image;
        public img_boybg: eui.Image;
        public grp_coins: eui.Group;
        public coin_money: game.Coins;
        public coin_gold: game.Coins;
        public grp_dressinfo: eui.Group;
        public grp_role: eui.Group;
        public grp_misc: eui.Group;
        public icon_boy: eui.Image;
        public icon_gril: eui.Image;

        public btn_cart: game.IconButton;
        public btn_close: game.IconButton;
        public part_back: game.ChooseIcon;
        public part_head: game.ChooseIcon;
        public part_body: game.ChooseIcon;
        public part_leg: game.ChooseIcon;
        public part_foot: game.ChooseIcon;
        public part_waist: game.ChooseIcon;
        public part_hand: game.ChooseIcon;
        public ls_dress: game.ItemList;


        protected getSkinName() {
            return RoleDressSkin;
        }

        private static _instance: RoleDress;

        public static getInstance(): RoleDress {
            if (!RoleDress._instance) {
                RoleDress._instance = new RoleDress();
            }
            return RoleDress._instance;
        }


        public init() {
            this.btn_cart.icon = "dress_01_json.dress_01_29";
            this.btn_close.icon = "dress_01_json.dress_01_16"

            this.initTouchEvent();
            this.initCoins();
            this.ls_dress.init_list();
            this.switchToGril();

            this.partHandle_body();
            // this.ls_dress. = new eui.ArrayCollection();
        }

        private initTypeIcons() {
            this.useGrilTypeIcons(true);

        }
        private useGrilTypeIcons(b: boolean) {
            let girlIcons = [
                "dress_01_08", "dress_01_09", "dress_01_10", "dress_01_11", "dress_01_12", "dress_01_13", "dress_01_14"
            ]
            let boyIcons = [
                "dress_01_01", "dress_01_02", "dress_01_03", "dress_01_04", "dress_01_05", "dress_01_06", "dress_01_07"
            ]
            let prefix = "dress_01_json.";
            if (b) {
                this.part_back.setIcon(prefix + girlIcons[0])
                this.part_head.setIcon(prefix + girlIcons[1])
                this.part_body.setIcon(prefix + girlIcons[2])
                this.part_leg.setIcon(prefix + girlIcons[3])
                this.part_foot.setIcon(prefix + girlIcons[4])
                this.part_waist.setIcon(prefix + girlIcons[5])
                this.part_hand.setIcon(prefix + girlIcons[6])

            } else {
                this.part_back.setIcon(prefix + boyIcons[0])
                this.part_head.setIcon(prefix + boyIcons[1])
                this.part_body.setIcon(prefix + boyIcons[2])
                this.part_leg.setIcon(prefix + boyIcons[3])
                this.part_foot.setIcon(prefix + boyIcons[4])
                this.part_waist.setIcon(prefix + boyIcons[5])
                this.part_hand.setIcon(prefix + boyIcons[6])
            }
        }

        private initCoins() {
            this.coin_gold.coins = DataManager.playerModel.getGold();
            this.coin_money.coins = <number>DataManager.playerModel.getTotalMoney();
        }
        //TODO: 更新货币
        private updateCoins(){}

        private initTouchEvent() {
            this.icon_boy.addEventListener("touchBegin", this.switchToGril, this);
            this.icon_gril.addEventListener("touchBegin", this.switchToBoy, this);

            this.part_back.addEventListener("touchBegin", this.partHandle_back, this);
            this.part_head.addEventListener("touchBegin", this.partHandle_head, this);
            this.part_body.addEventListener("touchBegin", this.partHandle_body, this);
            this.part_leg.addEventListener("touchBegin", this.partHandle_leg, this);
            this.part_foot.addEventListener("touchBegin", this.partHandle_foot, this);
            this.part_waist.addEventListener("touchBegin", this.partHandle_waist, this);
            this.part_hand.addEventListener("touchBegin", this.partHandle_hand, this);

            this.btn_cart.addEventListener("touchEnd", this.cartHandle, this);
            this.btn_close.addEventListener("touchEnd", this.closeHandle, this);
        }

        private closeHandle() {
            this.remove();
        }
        private cartHandle() {
            console.warn("购物车界面尚未实现");
        }

        private switchToGril() {
            this.useGirlSpine(true);
            this.useGrilBg(true);
            this.useGrilIcon(true);
            this.useGrilShelf(true);
            this.useGrilTypeIcons(true);
        }

        private switchToBoy() {
            this.useGirlSpine(false);
            this.useGrilBg(false);
            this.useGrilIcon(false);
            this.useGrilShelf(false);
            this.useGrilTypeIcons(false);
        }

        private partHandle_back() { this.unchoseAllIcons(); this.part_back.checked = true; this.showShelf_back(); }
        private partHandle_head() { this.unchoseAllIcons(); this.part_head.checked = true; this.showShelf_head(); }
        private partHandle_body() { this.unchoseAllIcons(); this.part_body.checked = true; this.showShelf_body(); }
        private partHandle_leg() { this.unchoseAllIcons(); this.part_leg.checked = true; this.showShelf_leg(); }
        private partHandle_foot() { this.unchoseAllIcons(); this.part_foot.checked = true; this.showShelf_foot(); }
        private partHandle_waist() { this.unchoseAllIcons(); this.part_waist.checked = true; this.showShelf_waist(); }
        private partHandle_hand() { this.unchoseAllIcons(); this.part_hand.checked = true; this.showShelf_hand(); }
        //===============================================================//
        private unchoseAllIcons() {
            this.part_back.checked = false;
            this.part_head.checked = false;
            this.part_body.checked = false;
            this.part_leg.checked = false;
            this.part_foot.checked = false;
            this.part_waist.checked = false;
            this.part_hand.checked = false;
        }

        //======================================================
        // 性别切换
        //======================================================
        public useGrilBg(b: boolean) {
            this.img_boybg.visible = !b;
            this.img_girlbg.visible = b;
        }

        public useGrilIcon(b: boolean) {
            this.icon_boy.visible = !b;
        }

        //TODO: 切换模型骨骼
        public useGirlSpine(b: boolean) {

        }

        //TODO: 显示默认的装备
        public useGrilShelf(b: boolean) {

        }



        //=======================================
        //TODO: 设置装备信息
        public setDressInfo(dressInfo: { star, scoreAdd, scoreAddExt, goldAdd, goldAddExt }) {

        }

        //TODO: 加载装备配置表
        private loadShelfByType() {
        }

        // 设置装备列表
        private setShelf(items: ItemInfo[]) {
            this.ls_dress.rm_items();
            for (let i = 0; i < items.length; ++i) {
                let dressItem = new game.ItemPrice();
                this.setShelfItem(dressItem, items[i]);
                this.ls_dress.add_item(dressItem);

            }
        }

        private setShelfItem(item: game.ItemPrice, itemInfo: ItemInfo) {
            let info = {
                icon: itemInfo.imgPath,
                price: (itemInfo.isObtained ? 0 : itemInfo.price),
                priceUnit: itemInfo.priceUnit,
            }
            item.setup(info);
        }


        // 显示装备列表
        public showShelf_back() {
            let items = [];

            items.push(new ItemInfo("dress_02_json.dress_02_01", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_02", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_03", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_04", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_05", 2000));


            this.setShelf(items);

        }
        public showShelf_head() {
            let items = [];
            items.push(new ItemInfo("dress_02_json.dress_02_05", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_06", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_07", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_08", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_09", 2000));


            this.setShelf(items);
        }
        public showShelf_body() {
            let items = []
            items.push(new ItemInfo("dress_02_json.dress_02_10", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_11", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_12", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_13", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_14", 2000));


            this.setShelf(items);

        }
        public showShelf_leg() {

            let items = [];
            items.push(new ItemInfo("dress_02_json.dress_02_15", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_16", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_17", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_18", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_19", 2000));

            this.setShelf(items);
        }
        public showShelf_foot() {

            let items = [];
            items.push(new ItemInfo("dress_02_json.dress_02_20", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_21", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_22", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_23", 2000));

            this.setShelf(items);
        }
        public showShelf_waist() {
            let items = [];
            items.push(new ItemInfo("dress_02_json.dress_02_26", 2000));


            this.setShelf(items);
        }
        public showShelf_hand() {
            let items = []
            items.push(new ItemInfo("dress_02_json.dress_02_24", 2000));
            items.push(new ItemInfo("dress_02_json.dress_02_25", 2000));


            this.setShelf(items);
        }





    }
}