module game {

    let dressItems = [
        { img: "dress_02_01", price: 2000, priceUnit: 1 },
        { img: "dress_02_02", price: 2000, priceUnit: 1 },
        { img: "dress_02_03", price: 2000, priceUnit: 1 },
        { img: "dress_02_04", price: 2000, priceUnit: 1 },
        { img: "dress_02_05", price: 2000, priceUnit: 1 },
        { img: "dress_02_06", price: 2000, priceUnit: 1 },
        { img: "dress_02_07", price: 2000, priceUnit: 1 },
        { img: "dress_02_08", price: 2000, priceUnit: 1 },
        { img: "dress_02_09", price: 2000, priceUnit: 1 },
        { img: "dress_02_10", price: 2000, priceUnit: 1 },
        { img: "dress_02_11", price: 2000, priceUnit: 1 },
        { img: "dress_02_12", price: 2000, priceUnit: 1 },
        { img: "dress_02_13", price: 2000, priceUnit: 1 },
        { img: "dress_02_14", price: 2000, priceUnit: 1 },
        { img: "dress_02_15", price: 2000, priceUnit: 1 },
        { img: "dress_02_16", price: 2000, priceUnit: 1 },
        { img: "dress_02_17", price: 2000, priceUnit: 1 },
        { img: "dress_02_18", price: 2000, priceUnit: 1 },
        { img: "dress_02_19", price: 2000, priceUnit: 1 },
        { img: "dress_02_20", price: 2000, priceUnit: 1 },
        { img: "dress_02_21", price: 2000, priceUnit: 1 },
        { img: "dress_02_22", price: 2000, priceUnit: 1 },
        { img: "dress_02_23", price: 2000, priceUnit: 1 },
        { img: "dress_02_24", price: 2000, priceUnit: 1 },
        { img: "dress_02_25", price: 2000, priceUnit: 1 },
        { img: "dress_02_26", price: 2000, priceUnit: 1 },
    ]


    export class RoleDress extends PanelComponent {
        img_girlbg: eui.Image;
        img_boybg: eui.Image;
        grp_coins: eui.Group;
        coin_money: game.Coins;
        coin_gold: game.Coins;
        grp_dressinfo: eui.Group;
        grp_role: eui.Group;
        grp_misc: eui.Group;
        icon_boy: eui.Image;
        icon_gril: eui.Image;

        btn_cart: game.IconButton;
        btn_close: game.IconButton;
        part_back: game.ChooseIcon;
        part_head: game.ChooseIcon;
        part_body: game.ChooseIcon;
        part_leg: game.ChooseIcon;
        part_foot: game.ChooseIcon;
        part_waist: game.ChooseIcon;
        part_hand: game.ChooseIcon;
        sr_item: eui.Scroller;
        ls_items: eui.List;
        test_itemprice: game.ItemPrice;

        private _dataProv: eui.ArrayCollection;


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
            this.initItemList();
            this.switchToGril();

            this.partHandle_body();
        }

        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = game.ItemPrice;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        }
        //TODO: 改变选择项
        private onChange() {

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
            this.coin_gold.coins = DataManager.playerModel.getScore();
            this.coin_money.coins = <number>DataManager.playerModel.getTotalMoney();
        }
        //TODO: 更新货币
        private updateCoins() { }

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
            // if (DataManager.boyDbones.isReady){
                DataManager.boyDbones.adjust(this.grp_role);
                this.grp_role.addChild(DataManager.boyDbones.display);
            // }
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
        private setShelf(s: number, e: number) {
            this._dataProv.removeAll();
            for (let i = s; i < e; ++i) {
                this._dataProv.addItem(dressItems[i]);
            }
        }


        // 显示装备列表
        public showShelf_back() {
            this.setShelf(23, 25);

        }
        public showShelf_head() {
            this.setShelf(0, 3);
        }
        public showShelf_body() {
            this.setShelf(3, 9);

        }
        public showShelf_leg() {
            this.setShelf(6, 10);
        }
        public showShelf_foot() {
            this.setShelf(10, 14);
        }
        public showShelf_waist() {
            this.setShelf(14, 19);
        }
        public showShelf_hand() {
            this.setShelf(19, 23);
        }

    }
}