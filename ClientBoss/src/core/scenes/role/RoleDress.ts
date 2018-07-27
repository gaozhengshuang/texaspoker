module game {

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
        icon_girl: eui.Image;

        img_iconmask: eui.Image;

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
        dress_info: game.EquipInfo;
        btn_test: eui.Button;
        btn_test2: eui.Button;

        topGroup: eui.Group;
        roleGroup: eui.Group;

        private _dataProv: eui.ArrayCollection;

        public gender: number; // 0 女 1 男
        private _girlBone: SkeletonBase;
        private _boyBone: SkeletonBase;
        private _typeIdx: msg.ItemPos;

        private _girlSelIdxs;   // 女性已选索引
        private _boySelIdxs;

        private _selItems: table.IEquipDefine[];

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
            if (gameConfig.isIphoneX()) {
                this.topGroup.y = this.topGroup.y + 50;
                // this.roleGroup.y = this.roleGroup.y + 150;
            }
            this.height = gameConfig.curHeight();

            this.btn_cart.icon = "dress_01_json.dress_01_29";
            this.btn_close.icon = "dress_01_json.dress_01_16"
            this.gender = DataManager.playerModel.sex;

            this.initTypeSelIdxs();

            this.initNetEvent();
            this.initTouchEvent();
            this.initCoins();
            this.initItemList();
            if (this.isGirl) {
                this.switchToGirl();
            } else {
                this.switchToBoy();
            }

            this.hideDressInfo();

            this.partHandle_body();
        }

        private initNetEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_AddPackageItem, "msg.GW2C_AddPackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_SendShowImage, "msg.GW2C_SendShowImage");
            NotificationCenter.addObserver(this, this.OnGW2C_RetChangeImageSex, "msg.GW2C_RetChangeImageSex");
        }

        // TODO: 添加包裹项
        private OnGW2C_AddPackageItem(data: msg.GW2C_AddPackageItem) {
            // console.log("添加包裹项：", data);
            RoleDressShopCart.getInstance().UpdateData(this._selItems.map(item => { return item.Id; }).filter(itemId => { return !DataManager.playerModel.IsHaveItem(itemId); }));

            this.updateShelf();
            this.updateCoins();
        }

        // TODO: 穿上装备
        private sendmsg_DressCloth(data: { pos, itemid }) {
            // console.log("发送穿上装备消息", data);
            sendMessage("msg.C2GW_DressClothes", msg.C2GW_DressClothes.encode({
                pos: data.pos,
                itemid: data.itemid
            }));
        }

        private OnGW2C_RetChangeImageSex(data: msg.GW2C_RetChangeImageSex) {
            // console.log("性别切换成功", data);
        }
        // TODO: 脱下装备
        private sendmsg_UnDressCloth(data: { pos }) {
            // console.log("发送脱下装备消息", data);
            sendMessage("msg.C2GW_UnDressClothes", msg.C2GW_UnDressClothes.encode({
                pos: data.pos,
            }));
        }
        //TODO: 发送切换性别消息
        private sendmsg_SwitchGender(data: { sex }) {
            sendMessage("msg.C2GW_ChangeImageSex", msg.C2GW_ChangeImageSex.encode({
                sex: data.sex
            }))
        }
        // TODO: 接收显示性别消息
        private OnGW2C_SendShowImage(data: msg.GW2C_SendShowImage) {
            // console.log("GW2C_SendShowImage", data);
        }


        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = game.ItemPrice;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
        }

        private initTypeSelIdxs() {
            this._girlSelIdxs = {};
            this._boySelIdxs = {};
            this._selItems = [];
        }

        private saveGrilSelIndex(typeIdx, itemIndex) {
            if (this._girlSelIdxs[typeIdx] != null && this._girlSelIdxs[typeIdx] == itemIndex) {
                return false;
            }

            this._girlSelIdxs[typeIdx] = itemIndex;
            return true;
        }
        private saveBoySelIndex(typeIdx, itemIdx) {
            if (this._boySelIdxs[typeIdx] != null && this._boySelIdxs[typeIdx] == itemIdx) {
                return false;
            }

            this._boySelIdxs[typeIdx] = itemIdx;
            return true;
        }
        private rmBoySelIndex(typeIdx) {
            this._boySelIdxs[this._typeIdx] = null;
            this.ls_items.selectedIndex = -1;
            this.ls_items.selectedItem = null;
        }

        private rmGirlSelIndex(typeIdx) {
            this._girlSelIdxs[this._typeIdx] = null;
            this.ls_items.selectedIndex = -1;
            this.ls_items.selectedItem = null;
        }

        private rmSelIndex() {
            if (this.isGirl) {
                this.rmGirlSelIndex(this._typeIdx);
            } else {
                this.rmBoySelIndex(this._typeIdx);
            }
        }

        // 选择项改变
        private onChange(e: eui.ItemTapEvent) {
            let item = this.ls_items.selectedItem;
            let idx = e.itemIndex;
            let itemRender = <game.ItemPrice>e.itemRenderer;
            if (ItemPrice.isComingSoon(item)) {
                this.unwear(item);
                this.rmSelIndex();
                return;
            }
            let canSave = false;

            if (this.isGirl) {
                canSave = this.saveGrilSelIndex(this._typeIdx, idx)
            } else {
                canSave = this.saveBoySelIndex(this._typeIdx, idx);
            }

            if (!canSave) {
                itemRender.selected = false;
                this.unwear(item);
                this.rmSelIndex();

                this._selItems = this._selItems.filter(data => { return (data.Sex != item.Sex || data.Pos != item.Pos) && data.Id != item.Id; })
            } else {
                this.changePart(item);
                let haveDressed = false;

                for (let i = 0; i < this._selItems.length; i++) {
                    let data = this._selItems[i];
                    if (data.Sex === item.Sex && data.Pos === item.Pos) {
                        haveDressed = true;
                        this._selItems[i] = item;
                        break;
                    }
                }

                if (!haveDressed) {
                    this._selItems.push(item);
                }
            }
            this.setDressInfo();
        }

        private initTypeIcons() {
            this.useGirlTypeIcons(true);

        }
        private useGirlTypeIcons(b: boolean) {
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
            this.coin_gold.setCoinType(msg.MoneyType._Gold);
            this.coin_money.setCoinType(msg.MoneyType._Diamond);

            this.updateCoins();
        }
        private updateCoins() {
            this.coin_gold.coins = DataManager.playerModel.getScore();
            this.coin_money.coins = <number>DataManager.playerModel.getDiamond();
        }


        private initTouchEvent() {

            this.img_iconmask.addEventListener("touchBegin", this.switchGender, this);

            this.part_back.addEventListener("touchBegin", this.partHandle_back, this);
            this.part_head.addEventListener("touchBegin", this.partHandle_head, this);
            this.part_body.addEventListener("touchBegin", this.partHandle_body, this);
            this.part_leg.addEventListener("touchBegin", this.partHandle_leg, this);
            this.part_foot.addEventListener("touchBegin", this.partHandle_foot, this);
            this.part_waist.addEventListener("touchBegin", this.partHandle_waist, this);
            this.part_hand.addEventListener("touchBegin", this.partHandle_hand, this);

            this.btn_cart.addEventListener("touchEnd", this.cartHandle, this);
            this.btn_close.addEventListener("touchEnd", this.closeHandle, this);

            this.btn_test.addEventListener("touchEnd", this.setSuitHandle, this);
            this.btn_test2.addEventListener("touchEnd", this.resetSuitHandle, this);
        }

        private closeHandle() {
            this.remove();
        }
        private cartHandle() {
            openPanel(PanelType.dressShopCarts);
            RoleDressShopCart.getInstance().UpdateData(this._selItems.map(item => { return item.Id; }).filter(itemId => { return !DataManager.playerModel.IsHaveItem(itemId); }));
        }

        private switchToGirl() {
            this.gender = 0;
            this.useGirlSpine(true);
            this.useGirlBg(true);
            this.useGirlIcon(true);
            this.useGirlShelf(true);
            this.useGirlTypeIcons(true);
            this.setDressInfo();
        }

        private switchGender() {
            if (this.gender == 0) {
                this.switchToBoy();
            } else {
                this.switchToGirl();
            }

            this.sendmsg_SwitchGender({
                sex: this.gender
            })
        }

        private switchToBoy() {
            this.gender = 1;
            this.useGirlSpine(false);
            this.useGirlBg(false);
            this.useGirlIcon(false);
            this.useGirlShelf(false);
            this.useGirlTypeIcons(false);
            this.setDressInfo();
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
        public useGirlBg(b: boolean) {
            this.img_boybg.visible = !b;
            this.img_girlbg.visible = b;
        }

        public useGirlIcon(b: boolean) {
            this.icon_boy.visible = !b;
            this.icon_girl.visible = b;
        }

        //TODO: 切换模型骨骼
        public async useGirlSpine(b: boolean) {
            hideAllChildren(this.grp_role);
            if (b) {
                if (!this._girlBone) {
                    this._girlBone = await game.getBone("girl");
                    this.grp_role.addChild(this._girlBone);
                    adjustBone(<egret.DisplayObject>(this._girlBone), this.grp_role);
                    let r = randRange(1, this._girlBone.animNum);
                    this._girlBone.play(`idle${r}`, 0);
                }
                this._boyBone && (this._boyBone.visible = false);
                this._girlBone && (this._girlBone.visible = true);
            } else {

                if (!this._boyBone) {
                    this._boyBone = await game.getBone("boy");
                    this.grp_role.addChild(this._boyBone);
                    adjustBone(<egret.DisplayObject>(this._boyBone), this.grp_role);
                    let r = randRange(1, this._boyBone.animNum);
                    this._boyBone.play(`idle${r}`, 0);
                }
                this._boyBone && (this._boyBone.visible = true);
                this._girlBone && (this._girlBone.visible = false);
            }

        }

        public useGirlShelf(b: boolean) {
            this.updateShelf();
        }



        //=======================================
        //TODO: 设置装备信息
        public setDressInfo() {
            let dressInfos: table.IEquipDefine[] = this._selItems.filter(item => { return item.Sex == this.gender; });
            this.dress_info.equip_name = dressInfos[dressInfos.length - 1] ? dressInfos[dressInfos.length - 1].Name : "";
            //技能加成
            let skillDes = "";
            dressInfos.forEach(info => {
                info.Skill.forEach(
                    (item, index, array) => {
                        let skillData: table.ITSkillDefine = table.TSkillById[parseInt(item)];
                        if (skillData) {
                            skillDes += (skillDes == "" ? skillData.Des : "\n" + skillData.Des);
                        }
                    }
                );
            })
            this.dress_info.skillAddition = skillDes;
            this.dress_info.visible = dressInfos.length > 0;
        }

        public hideDressInfo() {
            this.dress_info.visible = false;
        }
        public showDressInfo() {
            this.dress_info.visible = true;
        }
        public get isGirl() {
            return this.gender == 0;
        }

        public updateShelf() {
            switch (this._typeIdx) {
                case msg.ItemPos.Helmet: this.showShelf_head(); break;
                case msg.ItemPos.Clothes: this.showShelf_body(); break;
                case msg.ItemPos.Pants: this.showShelf_leg(); break;
                case msg.ItemPos.Shoe: this.showShelf_foot(); break;
                case msg.ItemPos.Hand: this.showShelf_hand(); break;
                case msg.ItemPos.Wing: this.showShelf_waist(); break;
                case msg.ItemPos.Suit: this.showShelf_back(); break;
            }
        }

        private isInBagList(e: table.IEquipDefine) {
            let bag = DataManager.playerModel.bagList
            let a = bag.filter((item) => item.id == e.Id);
            if (a.length > 0) {
                return true;
            }
            return false;
        }
        private setObtain(e: table.IEquipDefine) {
            e.Price = -1;
        }

        // 设置装备列表
        private setShelf(s: number) {
            this._dataProv.removeAll();

            let dressItem: table.IEquipDefine = null;
            while (!!(dressItem = table.EquipById[s++])) {
                if (dressItem.Sex == this.gender || dressItem.Sex == 2) {
                    if (this.isInBagList(dressItem)) {
                        this.setObtain(dressItem);
                    }

                    this._dataProv.addItem(dressItem);
                }
            }
            if (this.isGirl) {
                this.reselGirlIdx(this._typeIdx)
            } else {
                this.reselBoyIdx(this._typeIdx);
            }

        }
        private getGirlSelIdx(typeIndex) {
            if (!this._girlSelIdxs || this._girlSelIdxs[typeIndex] == null) return null;
            return this._girlSelIdxs[typeIndex];
        }
        private getBoySelIdx(typeIdx) {
            if (!this._boySelIdxs || this._boySelIdxs[typeIdx] == null) return null;
            return this._boySelIdxs[typeIdx];
        }

        private reselGirlIdx(typeIndex) {
            let selIndex = this.getGirlSelIdx(this._typeIdx);
            if (selIndex != null) {
                this.ls_items.selectedIndex = selIndex;
            }
        }
        private reselBoyIdx(typeIdx) {
            let selIndex = this.getBoySelIdx(this._typeIdx);
            if (selIndex != null) {
                this.ls_items.selectedIndex = selIndex;
            }
        }
        // 显示装备列表
        public showShelf_back() {
            this._typeIdx = msg.ItemPos.Suit;

            this.setShelf(701);

        }
        public showShelf_head() {
            this._typeIdx = msg.ItemPos.Helmet;
            this.setShelf(101);
        }
        public showShelf_body() {
            this._typeIdx = msg.ItemPos.Clothes;
            this.setShelf(201);

        }
        public showShelf_leg() {
            this._typeIdx = msg.ItemPos.Pants;
            this.setShelf(301);
        }
        public showShelf_foot() {
            this._typeIdx = msg.ItemPos.Shoe;
            this.setShelf(401);
        }
        public showShelf_waist() {
            this._typeIdx = msg.ItemPos.Wing;
            this.setShelf(501);
        }
        public showShelf_hand() {
            this._typeIdx = msg.ItemPos.Hand;
            this.setShelf(601);
        }


        public setSuitHandle() {
            if (this.gender == 0) {
                this.replaceParts(this._girlBone, "girl_suit2");
            } else {
                this.replaceParts(this._boyBone, "boy_suit2");
            }
        }

        private replaceParts(bone: SkeletonBase, suitName: string) {
            let slots = bone.armature.getSlots();

            let prefix = `${suitName}_json.`;

            slots.forEach((slot) => {
                let assetName = prefix + slot.name;
                bone.setNewSlot(slot.name, prefix + slot.name);
            })
        }
        public resetSuitHandle() {
            if (this.gender == 0) {
                this.resetParts(this._girlBone);
            } else {
                this.resetParts(this._boyBone);
            }
        }
        public resetParts(bone: SkeletonBase) {
            if (!bone) return;
            let slots = bone.armature.getSlots();
            slots.forEach((slot) => {
                bone.resetSlot(slot.name);
            })
        }

        private changeSlotsInSuit(bone: SkeletonBase, slotNames: string[], suitName: string) {
            slotNames.forEach((name) => {
                let assetName = `${suitName}_json.${name}`;
                // console.log("骨骼图集：", assetName);
                bone.setNewSlot(name, assetName);
            })
        }

        private changePart(e: table.IEquipDefine) {
            let pos = e.Pos;
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            let suit = e['Suit'];
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                suit = suit || "girl_suit2";
                this.changeSlotsInSuit(this._girlBone, slotNames, suit);
            } else {
                suit = suit || "boy_suit2";
                this.changeSlotsInSuit(this._boyBone, slotNames, suit);
            }
            if (this.isInBagList(e)) {
                this.sendmsg_DressCloth({
                    pos: e.Pos,
                    itemid: e.Id,
                })
            }

        }

        private resetSlots(bone: SkeletonBase, slotNames: string[]) {
            slotNames.forEach((name) => bone.resetSlot(name));
        }

        private unwear(e: table.IEquipDefine) {
            let sex = e.Sex;
            let slotNames = e.LoadPoint;
            if (slotNames.length <= 0) return;
            if (sex == 0) {
                this.resetSlots(this._girlBone, slotNames);
            } else {
                this.resetSlots(this._boyBone, slotNames);
            }

            if (this.isInBagList(e)) {
                this.sendmsg_UnDressCloth({
                    pos: e.Pos
                })
            }

        }



    }
}