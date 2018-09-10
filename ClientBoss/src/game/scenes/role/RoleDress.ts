module game {
    export class RoleDress extends PanelComponent {
        grp_coins       : eui.Group;
        grp_dressinfo   : eui.Group;
        grp_role        : eui.Group;
        grp_misc        : eui.Group;
        topGroup        : eui.Group;
        roleGroup       : eui.Group;
        composeGroup    : eui.Group;
        uncomposeGroup  : eui.Group;

        icon_boy        : eui.Image;
        icon_girl       : eui.Image;
        img_girlbg      : eui.Image;
        img_boybg       : eui.Image;
        img_iconmask    : eui.Image;

        btn_close       : IconButton;
        btn_compose     : IconButton;
        btn_level       : IconButton;

        sr_item         : eui.Scroller;
        ls_items        : eui.List;
        
        part_back       : ChooseIcon;
        part_head       : ChooseIcon;
        part_body       : ChooseIcon;
        part_leg        : ChooseIcon;
        part_foot       : ChooseIcon;
        part_waist      : ChooseIcon;
        part_hand       : ChooseIcon;
        
        coin_money      : game.Coins;
        coin_gold       : game.Coins;

        test_itemprice  : game.ItemPrice;
        dress_info      : game.EquipInfo;

        lvLabel         : eui.Label;
        produceGoldLabel: eui.Label;
        maxGoldLabel    : eui.Label;
        levelUpLabel    : eui.Label;

        private _dataProv: eui.ArrayCollection;

        //部位RadioButton列表
        private _partsToggles;
        //部位RadioButton组
        private _partRadioBtnGroup : eui.RadioButtonGroup;
        // 0 女 1 男
        public gender: number; 

        private _typeIdx: msg.ItemPos;
        private _selItems: table.IEquipDefine[];
        private _init: number;

        private _roleBonePool: ObjectPool<RoleBone>;
        private _roleBone: RoleBone;

        private _curEquipInfo: table.IEquipDefine;
//-------------------------------数据分割------------------------------------------------------------

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

        public static destroyInstance() {
            delete RoleDress._instance;
            RoleDress._instance = null;
        }

        public get partRadioBtnGroup() {
            return this._partRadioBtnGroup;
        }

        public init() {
            if (gameConfig.isIphoneX()) {
                this.topGroup.y = this.topGroup.y + 80;
            }
            this.height = gameConfig.curHeight();

            this.btn_close.icon = "dress_01_json.dress_01_16";
            this.btn_compose.icon = "dress_01_json.composeBtn";
            this.btn_level.icon = "dress_01_json.maidLevelUp"

            this.initItemList();

            // this.gender = DataManager.playerModel.sex;
            this.gender = 0;
            this._init = 0;

            this._selItems = [];

            this._typeIdx = msg.ItemPos.Clothes;

            this._partRadioBtnGroup = new eui.RadioButtonGroup();
            this._partRadioBtnGroup.addEventListener(eui.UIEvent.CHANGE, this.OnPartHandle, this);

            this.coin_gold.setCoinType(msg.MoneyType._Gold);
            this.coin_money.setCoinType(msg.MoneyType._Diamond);

            this._roleBonePool = new ObjectPool<RoleBone>(RoleBone);
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.btn_close, callBackFunc: this.OnCloseHandle },
                { target: this.btn_compose, callBackFunc: this.OnComposeHandle },
                { target: this.btn_level, callBackFunc: this.OnLevelUpHandle },
            ];

            this._partsToggles = [
                {type:msg.ItemPos.Helmet,target:this.part_head},
                {type:msg.ItemPos.Clothes,target:this.part_body},
                {type:msg.ItemPos.Pants,target:this.part_leg},
                {type:msg.ItemPos.Hand,target:this.part_hand},
                {type:msg.ItemPos.Shoe,target:this.part_foot},
                {type:msg.ItemPos.Wing,target:this.part_waist},
                {type:msg.ItemPos.Suit,target:this.part_back},
            ];

            NotificationCenter.addObserver(this, this.OnBagUpdate, PlayerModel.BAG_UPDATE);
            NotificationCenter.addObserver(this, this.updateLevelMaid, MaidManager.MAID_UPDATE);

            //小人动画
            this._roleBone = this._roleBonePool.createObject();
            this._roleBone.initRoleData(this.gender, MaidManager.getInstance().clothes);
            this.grp_role.addChild(this._roleBone);

            this.updateCoins();
            this.switchSex();
           
            //等级信息
            this.updateLevelMaid();
            // DataManager.playerModel.skillUpdate();
        }

        protected beforeRemove() {
            NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
            NotificationCenter.removeObserver(this, MaidManager.MAID_UPDATE);
            this._roleBonePool.destroyAllObject();
        }

        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = game.ItemPrice;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelItem, this);
        }

        private updateLevelMaid() {
            let levelInfo = table.TLevelMaidById[MaidManager.getInstance().getMaidInfo().level];
            if (levelInfo) {
                this.lvLabel.text = "Lv."+MaidManager.getInstance().getMaidInfo().level;
                this.produceGoldLabel.text = "产能：" + Math.floor(levelInfo.ProduceGold/(Number(levelInfo.ProduceTime)/60)) + "/分钟";
                this.maxGoldLabel.text = "上限：" + levelInfo.ProduceGold + "金币";
                this.levelUpLabel.text = DataManager.playerModel.getItemNum(levelInfo.UpgradeID) + "/" + levelInfo.Upgradenum;
            }
        }

        private updateCoins() {
            this.coin_gold.coins = DataManager.playerModel.getScore();
            this.coin_money.coins = <number>DataManager.playerModel.getDiamond();
        }

        private switchSex()
        {
            this.icon_boy.visible = !this.isGirl;
            this.icon_girl.visible = this.isGirl;
            this.img_boybg.visible = !this.isGirl;
            this.img_girlbg.visible = this.isGirl;

            //初始化勾选项
            this.initWears();
            //切换模型骨骼
            this._roleBone.useGirlSpine(actionType.Idle);
            //切换部位Icon
            this.changePartIcons();
            //刷新对应装扮列表
            this.updateItemList(this._typeIdx);
            //更新已穿戴装扮属性
            // this.setDressInfo();
        }

        private initWears() {
            let clothes = MaidManager.getInstance().clothes;
            if (!clothes) return;
            clothes.forEach(itemdata =>
            {
                //console.log("服务器记录穿戴",itemdata);
                let _item = table.EquipById[itemdata.id];
                if(_item) this._selItems.push(_item);
            });
        }

        private changePartIcons() {
            let girlIcons = ["dress_01_09", "dress_01_10", "dress_01_11", "dress_01_12", "dress_01_13", "dress_01_14","dress_01_08"]
            let boyIcons =  ["dress_01_02", "dress_01_03", "dress_01_04", "dress_01_05", "dress_01_06", "dress_01_07","dress_01_01"]

            this._partsToggles.forEach(item=>{
                let chooseIcon = <ChooseIcon>item.target;
                let iconStr = "dress_01_json." + (this.gender==0 ? girlIcons[item.type-1] : boyIcons[item.type-1]);
                chooseIcon.setData({Type:item.type,iconPath:iconStr});
            });

        }
        
        private updateItemList(posType:msg.ItemPos=null) {
            this._partsToggles.forEach(item=>{
                let chooseIcon = <ChooseIcon> item.target;
                if(!posType && chooseIcon.radioButton.selected)
                {
                    this.updateShelf(chooseIcon.posType);
                }
                else
                {
                    if(chooseIcon.posType==posType){
                        chooseIcon.radioButton.selected = true;
                        this.updateShelf(chooseIcon.posType);
                    }
                }
     
                chooseIcon.radioChangeHandler();
            });

            this.updateBtnState();
        }

        private updateShelf(posType:msg.ItemPos =  msg.ItemPos.Helmet) {
            this._typeIdx = (this._typeIdx && posType) || posType;

            let  _partToggle = <ChooseIcon>this._partsToggles.filter(item=>{return item.type==this._typeIdx;})[0].target;
            _partToggle.radioButton.selected = true;

            this.setShelf();
        }

        // 设置装备列表
        private setShelf() {
            this._dataProv.removeAll();

            for (let i = 0; i < table.Equip.length; i++) {
                if (this._typeIdx == table.Equip[i].Pos && (this.gender == table.Equip[i].Sex || table.Equip[i].Sex == 2)) {
                    this._dataProv.addItem(table.Equip[i]);
                }
            }

            //设置选中图标
            for(let item of this._selItems)
            {
                if((item.Sex==this.gender && item.Pos==this._typeIdx)|| this.checkLongClothes(item.Pos,this._typeIdx))
                {
                    let _selectIndex = this._dataProv.getItemIndex(item);
                    this.ls_items.selectedIndex = _selectIndex;
                }
            }
        }

        // TODO: 添加包裹项
        private OnBagUpdate() {
            RoleDressShopCart.getInstance().UpdateData(this.getCartItems());
            
            this.updateCoins();
            this.updateItemList(this._typeIdx);
        }

        // 选择项改变
        private onSelItem(e: eui.ItemTapEvent) {
            let item = <table.IEquipDefine>this.ls_items.selectedItem;
            let itemRender = <game.ItemPrice>e.itemRenderer;
            if (itemRender.isComingSoon()) {
                this.unwear(item);
                this._selItems = this._selItems.filter(data => { return data.Id != item.Id; })
                return;
            }

            if (this._selItems.some(data=>{return item.Id==data.Id;})) { // 选择相同的项
                this.ls_items.selectedIndex =  -1;
                this.unwear(item);
                this._selItems = this._selItems.filter(data => { return data.Id != item.Id; })
            } else {
                //TODO: 选择的是套装，先移除其他非套装部件；如果选择的是非套装，则先移除已选套装
                let _dressSuit = false;
                if (item.Pos==msg.ItemPos.Suit) {
                    _dressSuit = true;
                }
                // 已穿戴套装
                else if (this._selItems.some(item=>{return item.Sex==this.gender && item.Pos ==msg.ItemPos.Suit;})) {
                    _dressSuit = false;
                    this.unselSuit();
                }

                // 已穿戴连衣裙
                if(this._selItems.some(item=>{return item.Sex==this.gender && item.Pos==msg.ItemPos.LongClothes;}))
                {
                    if(item.Pos == msg.ItemPos.Clothes)     //选择上衣重置裤子
                    {
                        this._roleBone.resetSlots(["trousers1_1_00", "trousers1_1_01"]);
                    }
                    else if(item.Pos == msg.ItemPos.Pants)  //选择裤子重置上衣
                    {
                        this._roleBone.resetSlots(["body1_1_00"]);
                    }

                }

                this.changePartWithNet(item);

                //连衣裙和上衣裤子分开
                this._selItems = this._selItems.filter(data => {
                    if (item.Pos == msg.ItemPos.LongClothes) {
                        return item.Sex == data.Sex && data.Pos != msg.ItemPos.Clothes && data.Pos != msg.ItemPos.Pants && data.Id != item.Id;
                    }
                    if (item.Pos == msg.ItemPos.Clothes || item.Pos == msg.ItemPos.Pants) {
                        return item.Sex == data.Sex && data.Pos != msg.ItemPos.LongClothes && data.Id != item.Id;
                    }
                    return data.Id != item.Id;
                })

               //套装和其他所有分开
                if (_dressSuit) {
                    this._selItems = this._selItems.filter(data => { return data.Sex != item.Sex && data.Id != item.Id; })
                    this._selItems.push(item);
                }
                else {   
                    this._selItems = this._selItems.filter(data => { return (data.Sex != item.Sex || data.Pos != msg.ItemPos.Suit) && data.Id != item.Id; })
                    let haveDressed = false;

                    for (let i = 0; i < this._selItems.length; i++) {
                        let data = this._selItems[i];
                        if ((data.Sex == item.Sex && data.Pos == item.Pos) || this.checkLongClothes(item.Pos, data.Pos)) {
                            haveDressed = true;
                            this._selItems[i] = item;
                            break;
                        }
                    }

                    if (!haveDressed) {
                        this._selItems.push(item);
                    }

                }
            }
            // this.setDressInfo();
            this.updateBtnState();
        }

        //检测女连衣裙
        private checkLongClothes(itemPos, dataPos) {
            if (!this.isGirl) return false;
            return (itemPos == msg.ItemPos.Clothes && dataPos == msg.ItemPos.LongClothes) || (itemPos == msg.ItemPos.LongClothes && dataPos == msg.ItemPos.Clothes);
        }

        //移除套装
        private unselSuit() {
            this._roleBone.resetParts();
        }

        //=======================================
        //TODO: 设置装备信息
        public setDressInfo() {
            let dressInfos: table.IEquipDefine[] = this._selItems.filter(item => { return item.Sex == this.gender; });
            this.dress_info.equip_name = dressInfos[dressInfos.length - 1] ? dressInfos[dressInfos.length - 1].Name : "";
            //技能加成
            let skillDes: egret.ITextElement[] = [];
            dressInfos.forEach(info => {
                info.Skill.forEach(
                    (item, index, array) => {
                        let skillData: table.ITSkillDefine = table.TSkillById[parseInt(item)];
                        if (skillData) {
                            let txt_element_des: egret.ITextElement = { text: skillData.Des.split(";"[0])[0] + "  ", style: { "textColor": 0xffffff, "size": 18, "strokeColor": 0x7e97d9, "stroke": 2 } };
                            let txt_element_num: egret.ITextElement = { text: skillData.Des.split(";"[0])[1] + "\n", style: { "textColor": 0xfcf505, "size": 18, "strokeColor": 0x7e97d9, "stroke": 2 } };
                            skillDes.push(txt_element_des);
                            skillDes.push(txt_element_num);
                        }
                    }
                );
            })

            this.dress_info.skillAddition = skillDes;
            this.dress_info.visible = dressInfos.length > 0;
        }
        //获取可以加入购物车的商品列表
        private getCartItems() {
            let items = this._selItems.map(item => { return item.Id; }).filter(itemId => { return !DataManager.playerModel.IsHaveItem(itemId); });
            return items;
        }

        public get isGirl() {
            return this.gender == 0;
        }

        //切换并刷新部位背包
        private OnPartHandle(evt:eui.UIEvent)
        {       
            let radioGroup : eui.RadioButtonGroup = evt.target;
            this.updateItemList();
        }

        //打开并刷新购物车界面
        // private OnCartHandle() {
        //     openPanel(PanelType.dressShopCarts);
        //     RoleDressShopCart.getInstance().UpdateData(this.getCartItems());
        // }

        private OnComposeHandle() {
            sendMessage("msg.C2GW_MakeClothes", msg.C2GW_MakeClothes.encode({
                debris: this._curEquipInfo.DebrisId
            }));
        }

        private OnLevelUpHandle() {
            openPanel(PanelType.MaidLevelUp);
        }

        private OnCloseHandle() {
            this.remove();
            RoleDress.destroyInstance();
        } 

        private changePartWithNet(item: table.IEquipDefine) {
            this._roleBone.changePart(item);
            if (DataManager.playerModel.IsHaveItem(item.Id)) {
                sendMessage("msg.C2GW_DressClothes", msg.C2GW_DressClothes.encode({
                    id: MaidManager.getInstance().getMaidInfo().id,
                    pos: item.Pos,
                    itemid: item.Id,
                }));
            }
        }
        
        //脱下衣服并且重置为骨骼默认绑定图片
        private unwear(item: table.IEquipDefine) {
            if (item.LoadPoint.length <= 0) return;

            this._roleBone.resetSlots(item.LoadPoint);

            //强制重置替换左右手贴图
            let suitName = this.isGirl ? "girl_suit2" :"boy_suit2";
            this._roleBone.changeSlotsInSuit(["body1_1_02","body1_1_04"], suitName);
 
            if (DataManager.playerModel.IsHaveItem(item.Id)) {
                sendMessage("msg.C2GW_UnDressClothes", msg.C2GW_UnDressClothes.encode({
                    id: MaidManager.getInstance().getMaidInfo().id,
                    pos: item.Pos
                }));
            }
        }

        private updateBtnState() {
            this._curEquipInfo = null; 
            for (let i = 0; i < this._selItems.length; i++) {
                let selInfo = this._selItems[i];
                if (selInfo.Pos == this._typeIdx) {
                    this._curEquipInfo = selInfo;
                    break;
                }
            }

            if (this._curEquipInfo) {
                if (DataManager.playerModel.IsHaveItem(this._curEquipInfo.Id)) {
                    this.composeGroup.visible = false;
                    this.uncomposeGroup.visible = false;
                } else {
                    let itemInfo = DataManager.playerModel.getBagItem(this._curEquipInfo.DebrisId);
                    if (itemInfo) {
                        this.composeGroup.visible = itemInfo.num >= this._curEquipInfo.DebrisNum;
                        this.uncomposeGroup.visible = itemInfo.num < this._curEquipInfo.DebrisNum;
                    } else {
                        this.composeGroup.visible = false;
                        this.uncomposeGroup.visible = true;
                    }
                }
            } else {
                this.composeGroup.visible = false;
                this.uncomposeGroup.visible = false;
            }
        }

    }
}