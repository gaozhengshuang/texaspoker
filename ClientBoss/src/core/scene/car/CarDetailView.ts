module game {
    export class CarDetailView extends PanelComponent  {
        
        downBtnGroup    : eui.Group;
        down_bg         : eui.Group;

        carIcon         : eui.Image;
        btnDriveAwayBg  : eui.Image;
        goldbg          : eui.Image;
        infoBgImage     : eui.Image;

        btnDriveAwayTxt : eui.Label;
        priceTxt        : eui.Label;
        carInfoTxt      : eui.Label;
        carNameTxt      : eui.Label;
        parkingInfoTxt  : eui.Label;
        parkingEmptyTxt : eui.Label;

        btnDriveAway    : IconButton;
        btnClose        : IconButton;
        btnNeighbor     : IconButton;
        btnState        : IconButton;

        dongtai_btn     : eui.Button;
        lingju_btn      : eui.Button;

        hideList_btn: eui.Button;

        private carData  : msg.ICarData;

        protected getSkinName() {
            return CarDetailInfoSkin;
        }
        public static _instance: CarDetailView;

        public static getInstance(): CarDetailView {
            if (!CarDetailView._instance) {
                CarDetailView._instance = new CarDetailView();
            }
            return CarDetailView._instance;
        }

        constructor()
        {
            super();
            this.adaptive();
        }

        public init() 
        {
            this.btnDriveAway.icon = "shopItemButtonBg_png";
            this.btnClose.icon = "uiCarAltas_json.backBtn";
            this.btnNeighbor.icon = "uiCarAltas_json.neighbor";
            this.btnState.icon = "uiCarAltas_json.stateBtn";

            this.hideList_btn.visible = false;
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.btnClose, callBackFunc: this.OnCloseHandle },
                { target: this.btnDriveAway, callBackFunc: this.OnDriveAwayHandle },
                { target: this.btnNeighbor, callBackFunc: this.OnClickNeighbor },
                { target: this.btnState, callBackFunc: this.OnClickState },
                { target: this.lingju_btn, callBackFunc: this.OnClickNeighbor },
                { target: this.dongtai_btn, callBackFunc: this.OnClickState },
                { target: this.hideList_btn, callBackFunc: this.onclick_hideList },
                
            ];

            this.listIndex = 0;
            //this.addEventListener(CarDetailView.POPUP_ROOM_NEIGHBOR,this.showLinjuList,this);
        }

        private adaptive() {
            this.down_bg.y = gameConfig.curHeight()-this.down_bg.height;
            this.downBtnGroup.y=this.down_bg.y-this.downBtnGroup.height/2 + 20;
            this.hideList_btn.y = gameConfig.curHeight() - 30 - this.hideList_btn.height / 2;


            this.oldY = this.down_bg.y;
            this.oldH = this.down_bg.height;
            this.oldBtnY = this.downBtnGroup.y;
        }

        public setData(carData:msg.ICarData) {
            if(!carData) return;
            this.carData = carData;
            this.updateView();
        }
        private updateView()
        {   
            if(!this.carData) return;
            let carItemData  = table.TCarById[this.carData.tid];
            if(!carItemData) return;
            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.bigpath);
            let factor = 1;
            if(txtr)
            {
                this.carIcon.source    = txtr;
                this.carIcon.width     = txtr.textureWidth * factor;
                this.carIcon.height    = txtr.textureHeight * factor;
            }
            //名字+价格
            this.carNameTxt.text = carItemData.Brand+""+carItemData.Model + "  价值" + carItemData.Price;

            //容量和收益
            // this.carInfoTxt.textFlow = [
            //     { text: "汽车容量", style: { bold: true,size: 30 }},
            //     { text: carItemData.Capacity+"", style: { bold: true,size: 35,"textColor": 0xFF3207}},
            //     { text: "\n"+"收益", style: { bold: true,size: 30 } },
            //     { text: carItemData.RewardPerH+"", style: { bold: true,size: 35,"textColor": 0xFF3207}},
            //     { text: "/小时", style: { bold: true,size: 30}},
            // ]
            this.carInfoTxt.text = "汽车容量" + carItemData.Capacity + "\n"+"收益" + carItemData.RewardPerH + "/分钟";

            //停放状态
            let _parkingData = DataManager.playerModel.getMyCarPakingInfo(this.carData.id);
            if(_parkingData){
                //this.parkingInfoTxt.text = "停在" + _parkingData.ownername + "车位" +"预计收益"+_parkingData.parkingreward+"金币";
        
                this.parkingInfoTxt.textFlow = [
                    { text: "停在 "},
                    { text: _parkingData.ownername +"", style: { bold: true,"textColor": 0xFFFFFF,stroke:2,"strokeColor":0xFF573C}},
                    { text: " 家车位 预计收益 "},
                    { text: _parkingData.parkingreward+"", style: { bold: true,"textColor": 0xFFFFFF,stroke:2,"strokeColor":0xFF573C}},
                    { text: " 金币"},
                ]
            }
            else{
                if(this.carData.parkingid!=0){console.warn("不在parkingdatas中",this.carData.parkingid);}
               
            }
            this.btnDriveAway.visible = this.btnDriveAwayBg.visible  = this.parkingInfoTxt.visible = _parkingData && true;
            this.infoBgImage.source = (_parkingData && true) ? "uiCarAltas_json.infobg" : "uiCarAltas_json.emptybg";
            this.parkingEmptyTxt.visible = !(_parkingData && true);
         }
        public OnCloseHandle() {
            this.remove();
            GameConfig.showDownBtnFun(true); 
            delete CarDetailView._instance;
            CarDetailView._instance = null;
        }

        public OnEnableHandle(){
            this.visible = true;
            GameConfig.showDownBtnFun(false); 

            //刷新车辆信息
            let self = this;
            CarManager.getInstance().ReqMyCarInfo(function(){
                self.setData(DataManager.playerModel.getUserInfo().cardatas.filter(data=>{
                    return data.id == self.carData.id;
                })[0]);
            });
            //刷新车位邻居列表
            if( this.listIndex==3){
                this.showLinjuList(this.linjuList);
            }
        }
        public OnDisableHandle(){
            this.visible = false;
            this.removeDarkRect();
            GameConfig.showDownBtnFun(true); 
        }

        private OnDriveAwayHandle(){
            let _carDataId = this.carData.id;
            let self = this;
            CarManager.getInstance().driveAway(_carDataId,null,function(result:number,reward:number){
                if(result==0){

                    CarManager.getInstance().ReqMyCarInfo(function(){
                        self.setData(DataManager.playerModel.userInfo.cardatas.filter(data=>{return data.id== _carDataId})[0]);});
            
                    if(reward!=0){
                        egret.setTimeout(() => {
                        showTips("获得"+reward+"金币！");   
                        }, this, 0.5);
                    }
                    else{
                        showTips("收回成功！");  
                    }     
                }
            });
        }


    //--------------邻居和动态----------------------------------//
        private OnClickNeighbor(){
            this.showlist(3);
        }

        private OnClickState(){
            this.showlist(1);
        }
        

        private onclick_hideList() {
            this.hideItemList();
            this.hideList_btn.visible = false;
            this.listIndex = 0;
            egret.Tween.get(this.downBtnGroup).to({ y: this.oldBtnY }, 300);
            egret.Tween.get(this.down_bg).to({ height: this.oldH, y: this.oldY }, 300)

        }
        
        private oldY: number = 0;
        private oldH: number = 0;
        private oldBtnY: number = 0;
        private listIndex: number = 0;

        private goalY: number = -1;
        private goalH: number = -1;
        private btnGoalY: number = -1;

        public roomInfo: HouseVO;

        private showlist(index) {
            console.log("展示列表showlist----------->",index);
            //if (this.listIndex == index) return;
            if (this.goalY == -1) { this.goalY = GameConfig.innerHeight * 0.5 };
            if (this.goalH == -1) { this.goalH = GameConfig.innerHeight };
            if (this.btnGoalY == -1) {
                 this.btnGoalY = this.goalY - (this.downBtnGroup.height * GameConfig.innerScale / 2)
                    - 20 * GameConfig.innerScaleW; 
            }
            this.listIndex = index;
			console.log(this.goalH+"//"+this.goalY+"//"+GameConfig.innerHeight);

            if (this.downBtnGroup.y != this.btnGoalY && this.down_bg.y != this.goalY) {
                egret.Tween.get(this.downBtnGroup).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, [this.listIndex]);
                egret.Tween.get(this.down_bg).to({ height: this.goalH+GameConfig.innerHeight / 2, y: this.goalY }, 300)
                    
            }else{
                this.onComplete(this.listIndex);
            }
        }

        private onComplete(index: number): void {
            console.log ("onComplete");
            this.hideList_btn.visible = true;
            this.showItemList(index);
            egret.Tween.removeTweens(this.downBtnGroup);
            egret.Tween.removeTweens(this.down_bg);
        }

        private itemList: utils.ScrollerPanel;
        private showItemList(index: number) {
            console.log("showItemList---->",this.itemList == null);
            this.hideItemList();
            if (this.itemList == null) {
                this.itemList = new utils.VScrollerPanel();
                this.addChild(this.itemList);
                this.itemList.x = 0;
                this.itemList.y = this.downBtnGroup.y + this.downBtnGroup.height * GameConfig.innerScale+50;
                this.itemList.height = (this.hideList_btn.y - 10) -
                    (this.downBtnGroup.y + this.downBtnGroup.height * GameConfig.innerScale + 50);
                switch (index) {
                    case 1:
                        this.itemList.initItemRenderer(CarMessageItem);
                        break;
                    case 3:
                        this.itemList.initItemRenderer(NeighborCarItem);
                        break;
                }
                this.itemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            }
            this.bindDataList(index);

        }
        private hideItemList() {
            if (this.itemList != null) {
                this.itemList.parent.removeChild(this.itemList);
                this.itemList = null;
            }
        }
        private bindDataList(index: number) {
            console.log("绑定数据--------->",index);
            switch (index) {
                case 1:
   /*                  CarManager.getInstance().ReqMyCarInfo(function(){
                        DataManager.playerModel.getUserInfo().cardatas.forEach(data=>{
                            
                        });
                    }); */
                    this.showDongtaiList();
                    break;
                case 3:
                    ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_NEIGHBOR_LIST);
                    break;
            }
        }
 
        private dongtaiList: msg.IParkingRecordData[];
        public showDongtaiList() {
            console.log("总共记录条数--->", DataManager.playerModel.getCarRecords().length);
            this.dongtaiList =  DataManager.playerModel.getCarRecords().filter(data=>{
                console.log("记录类型-->",data.operatortype);
                //筛选出自己被操作的记录
                switch(data.operatortype) 
                {
                    case msg.CarOperatorType.Park:
                        return  data.parkingownerid == DataManager.playerModel.getUserId();
                    case msg.CarOperatorType.TakeBack:
                        return  data.parkingownerid == DataManager.playerModel.getUserId();
                    case msg.CarOperatorType.Ticket:
                        return  data.carownerid == DataManager.playerModel.getUserId();
                }
                return true;
            });
            console.log("dongtaiList.......",this.dongtaiList.length);
            if (this.itemList && this.listIndex == 1) {
                this.itemList.bindData(this.dongtaiList);
            }
        }

        private linjuList: HouseVO[];
        public showLinjuList(list: HouseVO[]) {
            console.log("showLinjuList--------------->",list.length);
        
/*             let self = this;
            CarManager.getInstance().ReqMyCarInfo(function(){
                DataManager.playerModel.getUserInfo().parkingdatas.forEach(data=>{
                    if(data.parkingcarownerid!=0 && data.ownerid== DataManager.playerModel.getUserId()){
                        CarManager.getInstance().ReqCarParkingHouseData(data.parkingcarownerid,function(houseDatas:msg.IHouseData[]){
                            //
                        });
                    }
                })
            }); */
            this._showLinjuList(list);
        }
        private _showLinjuList(list: HouseVO[])
        {
            this.linjuList = [];
            CarManager.getInstance().clearBackFunc_ResParkingInfo();
            if (this.itemList && this.listIndex == 3) {
                let self = this;    
                list.forEach((houseData,index,array)=>{
                    CarManager.getInstance().ReqParkingInfoByType(2,houseData.ownerid,function(parkingDatas:msg.IParkingData[]){
                        if(parkingDatas.length>0)
                        {
                            let isBelong :boolean = parkingDatas[0].ownerid == houseData.ownerid;
                            if(isBelong)
                            {
                                //空
                                let _empty:number = parkingDatas.some(data=>{return data.parkingcar==0;}) ? 1 : 0;
                                //console.log(houseData.ownername,"--空->"+_empty);                                                                
                                //我车
                                let _mycarPark:number = parkingDatas.some(data=>{return data.parkingcarownerid==DataManager.playerModel.getUserId();}) ? 1 : 0;
                                //console.log(houseData.ownername,"--有我车->"+_mycarPark);                                
                                houseData.setObject({empty:_empty,myCarPark:_mycarPark});
                                self.linjuList.push(houseData);  
                            }
                        }
                        //console.log("回调执行------>",index);

                        //if(index==self.linjuList.length-1){ //等待所有邻居停车位数据返回后在显示
                            self.linjuList.sort(function(a,b){
                                let empty_a  = a.empty;
                                let empty_b  = b.empty;
                                let myCar_a  = a.myCarPark;
                                let myCar_b  = b.myCarPark;

                                if(myCar_a && !myCar_b)
                                {
                                    return 0;
                                }
                                else if(!myCar_a && myCar_b)
                                {
                                    return 1;
                                }
                                else if(myCar_a && myCar_b)
                                {
                                   if(empty_a&&!empty_b){
                                       return 1;
                                   }
                                   else if(!empty_a&&empty_b){
                                       return 0;
                                   }
                                   else if(!empty_a&&!empty_b){
                                       return 0;
                                  }
                                }
                                else if(!myCar_a &&!myCar_b)
                                {
                                   if(empty_a&&!empty_b){
                                       return 1;
                                   }
                                   else if(!empty_a&&empty_b){
                                       return 0;
                                   }
                                   else if(!empty_a&&!empty_b){
                                       return 0;
                                  }
                                }
                            });
                            self.itemList.bindData(self.linjuList);
                        //} 
                       
                    }.bind(this));
                });
            }
        }
 
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: any = null;
            console.log("onItemTouch------------->",this.listIndex)
            switch (this.listIndex) {
                case 1:
                    item = this.dongtaiList[eve.itemIndex];
                    let _userId = item.operatortype==msg.CarOperatorType.Ticket ? item.carownerid : item.parkingownerid;
                    if (item) {
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,{userid:_userId});
                        this.OnDisableHandle();
                    }
                    break;
                case 3:
                    item = this.linjuList[eve.itemIndex];
                    if (item) {
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,{userid:item.ownerid});
                        this.OnDisableHandle();
                    }
                    break;
            }
        }
        //-----------------------------------------------------------------------------//
        public isDongTaiPanelView()
        {
            return this.hideList_btn.visible;
        }
    }
}