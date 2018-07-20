module game {

    class ItemInfo {
        constructor(imgPath,price,priceUnit = 1) {
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
            
            this.ls_dress. = new eui.ArrayCollection();

        }

        private initTouchEvent() {
            this.icon_boy.addEventListener("touchBegin", this.boyIconHandle, this);
            this.icon_gril.addEventListener("touchBegin", this.grilIconHandle, this);

            this.part_back.addEventListener("touchBegin", this.partHandle_back, this);
            this.part_head.addEventListener("touchBegin", this.partHandle_head, this);
            this.part_body.addEventListener("touchBegin", this.partHandle_body, this);
            this.part_leg.addEventListener("touchBegin", this.partHandle_leg, this);
            this.part_foot.addEventListener("touchBegin", this.partHandle_foot, this);
            this.part_waist.addEventListener("touchBegin", this.partHandle_waist, this);
            this.part_hand.addEventListener("touchBegin", this.partHandle_hand, this);


        }

        private boyIconHandle() {
            this.useGirlSpine(false);
            this.useGrilBg(false);
            this.useGrilIcon(false);
            this.useGrilShelf(false);
        }

        private grilIconHandle() {
            this.useGirlSpine(true);
            this.useGrilBg(true);
            this.useGrilIcon(true);
            this.useGrilShelf(true);
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
        private setShelf(items:ItemInfo[]) {
            for (let i = 0; i < items.length; ++i) {
                let dressItem = new game.ItemPrice();
                this.ls_dress.add_item(dressItem);
                this.setShelfItem(dressItem,items[i]);
            }
        }

        private setShelfItem(item: game.ItemPrice, itemInfo:ItemInfo) {
            item.icon = itemInfo.imgPath;
            if (itemInfo.isObtained) {
                itemInfo.price = 0;
            }
            item.price = itemInfo.price;
        }



        // 显示装备列表
        public showShelf_back() {
            let items = [
                new ItemInfo("dress_02_json.dress_02_01",2000),
                new ItemInfo("dress_02_json.dress_02_02",2000),
                new ItemInfo("dress_02_json.dress_02_03",2000),
                new ItemInfo("dress_02_json.dress_02_04",2000),
                new ItemInfo("dress_02_json.dress_02_05",2000),
            ];
            
            this.setShelf(items);

        }
        public showShelf_head() {   
            let items = [
                new ItemInfo("dress_02_json.dress_02_05",2000),
                new ItemInfo("dress_02_json.dress_02_06",2000),
                new ItemInfo("dress_02_json.dress_02_07",2000),
                new ItemInfo("dress_02_json.dress_02_08",2000),
                new ItemInfo("dress_02_json.dress_02_09",2000),
            ];
            
            this.setShelf(items);}
        public showShelf_body() { 
              let items = [
                new ItemInfo("dress_02_json.dress_02_10",2000),
                new ItemInfo("dress_02_json.dress_02_11",2000),
                new ItemInfo("dress_02_json.dress_02_12",2000),
                new ItemInfo("dress_02_json.dress_02_13",2000),
                new ItemInfo("dress_02_json.dress_02_14",2000),
            ];
            
            this.setShelf(items);
        
        }
        public showShelf_leg() {

              let items = [
                new ItemInfo("dress_02_json.dress_02_15",2000),
                new ItemInfo("dress_02_json.dress_02_16",2000),
                new ItemInfo("dress_02_json.dress_02_17",2000),
                new ItemInfo("dress_02_json.dress_02_18",2000),
                new ItemInfo("dress_02_json.dress_02_19",2000),
            ];
            
            this.setShelf(items);
         }
        public showShelf_foot() { 

              let items = [
                new ItemInfo("dress_02_json.dress_02_20",2000),
                new ItemInfo("dress_02_json.dress_02_21",2000),
                new ItemInfo("dress_02_json.dress_02_22",2000),
                new ItemInfo("dress_02_json.dress_02_23",2000),
                
            ];
            
            this.setShelf(items);
        }
        public showShelf_waist() { 
              let items = [
                new ItemInfo("dress_02_json.dress_02_26",2000),
            ];
            
            this.setShelf(items);
        }
        public showShelf_hand() { 
            let items = [
                new ItemInfo("dress_02_json.dress_02_24",2000),
                new ItemInfo("dress_02_json.dress_02_25",2000),
            ];
            
            this.setShelf(items);
        }





    }
}