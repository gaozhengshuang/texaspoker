module game {

    export class RoleDress extends PanelComponent {

        grp_coins       : eui.Group;
        grp_dressinfo   : eui.Group;
        grp_role        : eui.Group;
        grp_misc        : eui.Group;

        topGroup        : eui.Group;
        roleGroup       : eui.Group;

        icon_boy        : eui.Image;
        icon_girl       : eui.Image;
        img_girlbg      : eui.Image;
        img_boybg       : eui.Image;
        img_iconmask    : eui.Image;
        shopNumBg       : eui.Image;

        shopNum         : eui.Label;

        btn_cart        : IconButton;
        btn_close       : IconButton;

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

        public get partRadioBtnGroup()
        {
            return this._partRadioBtnGroup;
        }

        public init() {
            if (gameConfig.isIphoneX()) {
                this.topGroup.y = this.topGroup.y + 80;
                // this.roleGroup.y = this.roleGroup.y + 150;
            }
            this.height = gameConfig.curHeight();

            this.btn_cart.icon = "dress_01_json.dress_01_29";
            this.btn_close.icon = "dress_01_json.dress_01_16"

            this.initItemList();

            this.gender = DataManager.playerModel.sex;
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
                { target: this.img_iconmask, callBackFunc: this.switchGender },
                { target: this.btn_cart, callBackFunc: this.OnCartHandle },
                { target: this.btn_close, callBackFunc: this.OnCloseHandle },
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
            // NotificationCenter.addObserver(this, this.OnGW2C_RetChangeImageSex, "msg.GW2C_RetChangeImageSex");

            //小人动画
            this._roleBone = this._roleBonePool.createObject();
            this.grp_role.addChild(this._roleBone);
            this.grp_role.setChildIndex(this._roleBone, 1);

            this.updateCoins();
            this.switchSex();
           
            // DataManager.playerModel.skillUpdate();
        }

        protected beforeRemove() {
            NotificationCenter.removeObserver(this, PlayerModel.BAG_UPDATE);
            // NotificationCenter.removeObserver(this, "msg.GW2C_RetChangeImageSex");

            this._roleBonePool.destroyAllObject();
        }


        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = game.ItemPrice;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelItem, this);
        }

        private updateCoins() {
            this.coin_gold.coins = DataManager.playerModel.getScore();
            this.coin_money.coins = <number>DataManager.playerModel.getDiamond();
        }

        //请求切换性别
        private switchGender() {
            // let sex = this.gender == 0 ? 1 : 0;
            // this.sendmsg_SwitchGender({ sex: sex })
        }

        //收到消息可以切换性别
        // private postSwitchGender(data: msg.GW2C_RetChangeImageSex) {
        //     this._selItems = [];
        //     this.gender = data.sex;
        //     this.switchSex();
        // }

        private switchSex()
        {
            this.icon_boy.visible = !this.isGirl;
            this.icon_girl.visible = this.isGirl;
            this.img_boybg.visible = !this.isGirl;
            this.img_girlbg.visible = this.isGirl;

            //穿戴已获得装扮
            this.initWears();

            //切换模型骨骼
            this._roleBone.useGirlSpine(this.gender, actionType.Idle);
            //切换部位Icon
            this.changePartIcons();
            //刷新对应装扮列表
            this.updateItemList(this._typeIdx);
            //更新已穿戴装扮属性
            this.setDressInfo();
        }

        private initWears() {
            let clothes = DataManager.playerModel.clothes;
            if (!clothes) return;
            clothes.forEach(imagedata=>{
                imagedata.clothes.forEach(
                    itemdata =>
                    {
                        //console.log("服务器记录穿戴",itemdata);
                        let _item = table.EquipById[itemdata.id];
                        if(_item) this._selItems.push(_item);
                    }
                )
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
        private updateItemList(posType:msg.ItemPos=null)
        {
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
        }

        private updateShelf(posType:msg.ItemPos =  msg.ItemPos.Helmet) {
            this._typeIdx = (this._typeIdx && posType  ) || posType;

            let  _partToggle = <ChooseIcon>this._partsToggles.filter(item=>{return item.type==this._typeIdx;})[0].target;
            _partToggle.radioButton.selected = true;

            let _orignDressId = 0;
            switch (this._typeIdx) {
                case msg.ItemPos.Helmet:    _orignDressId = 101; break;
                case msg.ItemPos.Clothes:   _orignDressId = 201; break;
                case msg.ItemPos.Pants:     _orignDressId = 301; break;
                case msg.ItemPos.Shoe:      _orignDressId = 401; break;
                case msg.ItemPos.Hand:      _orignDressId = 601; break;
                case msg.ItemPos.Wing:      _orignDressId = 501; break;
                case msg.ItemPos.Suit:      _orignDressId = 701; break;
            }

            this.setShelf(_orignDressId);
        }

        // 设置装备列表
        private setShelf(id: number) {
            this._dataProv.removeAll();

            let dressItem: table.IEquipDefine = null;
       
            while ((dressItem = table.EquipById[id++])) {
                if (dressItem.Sex == this.gender || dressItem.Sex == 2) {
                    this._dataProv.addItem(dressItem);
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
          
            // this.shopNumBg.visible = this.shopNum.visible = this.getCartItems().length > 0;
            // this.shopNum.text = this.getCartItems().length.toString();
        }

        // TODO: 穿上装备
        private sendmsg_DressCloth(data: { pos, itemid }) {
            sendMessage("msg.C2GW_DressClothes", msg.C2GW_DressClothes.encode({
                pos: data.pos,
                itemid: data.itemid
            }));
        }
        // private OnGW2C_RetChangeImageSex(data: msg.GW2C_RetChangeImageSex) {
        //     DataManager.playerModel.sex = data.sex;
        //     this.postSwitchGender(data);
        // }
        // TODO: 脱下装备
        private sendmsg_UnDressCloth(data: { pos }) {
            sendMessage("msg.C2GW_UnDressClothes", msg.C2GW_UnDressClothes.encode({
                pos: data.pos,
            }));
        }
        //TODO: 发送切换性别消息
        // private sendmsg_SwitchGender(data: { sex }) {
        //     sendMessage("msg.C2GW_ChangeImageSex", msg.C2GW_ChangeImageSex.encode({
        //         sex: data.sex
        //     }))
        // }

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
            this.setDressInfo();
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

            // this.shopNumBg.visible = this.shopNum.visible = this.getCartItems().length > 0;
            // this.shopNum.text = this.getCartItems().length.toString();
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
        private OnCartHandle() {
            openPanel(PanelType.dressShopCarts);
            RoleDressShopCart.getInstance().UpdateData(this.getCartItems());
        }

        private OnCloseHandle() {
            let _closeHandle: Function = function () {
                this.remove();
                RoleDress.destroyInstance();
            }.bind(this);

            if (this.getCartItems().length > 0) {
                showDialog("您还有未购买的商品，是否前往购买?", "前去购买", this.OnCartHandle.bind(this), function () {
                    this._selItems = [];
                    _closeHandle();
                }.bind(this));
            }
            else {
                _closeHandle();
            }
        } 

        private changePartWithNet(item: table.IEquipDefine) {
            this._roleBone.changePart(item);
            if (DataManager.playerModel.IsHaveItem(item.Id)) {
                this.sendmsg_DressCloth({
                    pos: item.Pos,
                    itemid: item.Id,
                })
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
                this.sendmsg_UnDressCloth({
                    pos: item.Pos
                })
            }
        }
    }
}