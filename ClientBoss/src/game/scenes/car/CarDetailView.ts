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
        parkingNameTxt  : eui.Label;
        parkingEmptyTxt : eui.Label;

        btnDriveAway    : IconButton;
        btnClose        : IconButton;
        btnNeighbor     : IconButton;
        btnState        : IconButton;

        dongtai_btn     : eui.Button;
        lingju_btn      : eui.Button;
        hideList_btn    : eui.Button;

        private _inited : boolean;
        public carData  : msg.ICarData;

        protected getSkinName() {
            return CarDetailInfoSkin;
        }
        private static _instance: CarDetailView = null;

        public static getInstance(): CarDetailView {
            if (!CarDetailView._instance) {
                CarDetailView._instance = new CarDetailView();
            }
            return CarDetailView._instance;
        }

        constructor(){
            super();
            this.adaptive();
        }

        public init() 
        {
            this.btnDriveAway.icon = "shopItemButtonBg_png";
            this.btnClose.icon = "uiCarAltas_json.backBtn2";
            this.btnNeighbor.icon = "uiCarAltas_json.neighbor";
            this.btnState.icon = "uiCarAltas_json.stateBtn";
            this.btnDriveAwayBg.source = "uiCarAltas_json.driveBtn";
            this.hideList_btn.visible = false;
            this._inited   = false;
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
            this._inited   = true;
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
            //this.carInfoTxt.text = "汽车容量" + carItemData.Capacity + "\n"+"收益" + carItemData.RewardPerH + "/分钟";

            //停放状态
            let _parkingData = DataManager.playerModel.getMyCarPakingInfo(this.carData.id);
            let haveParked = _parkingData!=null || this.carData.parkingreward!=0;
            
            if(_parkingData){
                //this.parkingInfoTxt.text = "停在" + _parkingData.ownername + "车位" +"预计收益"+_parkingData.parkingreward+"金币";
                let dateTime = new Date(Math.max(new Date().getTime() - <number>_parkingData.parkingtime - SysTimeEventManager.getInstance().systimeoffset,0));
               
                let second = Math.round(dateTime.getTime() / 1000);
                let d = Math.floor(second / (3600 * 24));
                let h = Math.floor(second % (3600 * 24) / 3600);
                let m = Math.floor(second % (3600 * 24) % 3600 / 60);
                let s = Math.floor(second % (3600 * 24) % 3600 % 60);
                
                let timeStr = d + "天" + h + "时" + m + "分";
                
                this.parkingNameTxt.textFlow = [
                    { text: _parkingData.ownername +"", style: { bold: true,"textColor": 0xffee9f}},
                    { text: _parkingData.ownerid && " 家车位" || "" ,style: { bold: true,"textColor": 0xffffff}},
                ]
                this.parkingInfoTxt.textFlow = [
                    { text: "已停放 "},
                    { text: timeStr +"", style: { bold: true,"textColor": 0xFFFFFF,stroke:2,"strokeColor":0xFF573C}},
                    { text: "预计收益 "},
                    { text: _parkingData.parkingreward+"", style: { bold: true,"textColor": 0xFFFFFF,stroke:2,"strokeColor":0xFF573C}},
                    { text: " 金币"},
                ]
            }
            else{
                if(this.carData.parkingid!=0){console.warn("不在parkingdatas中",this.carData.parkingid);}
                if(this.carData.parkingreward!=0){
                    this.parkingInfoTxt.textFlow = [
                        { text: "在公共车位已获得 "},
                        { text: this.carData.parkingreward+"", style: { bold: true,"textColor": 0xFFFFFF,stroke:2,"strokeColor":0xFF573C}},
                        { text: " 金币的收益"},
                    ]
                }
            }
            
            this.btnDriveAway.visible = this.btnDriveAwayBg.visible  = this.parkingInfoTxt.visible = haveParked;
            this.infoBgImage.source = haveParked ? "uiCarAltas_json.infobg" : "uiCarAltas_json.emptybg";
            this.btnDriveAwayBg.source = this.carData.parkingreward==0 && "uiCarAltas_json.driveBtn" || "uiCarAltas_json.recieveBtn";
            this.parkingEmptyTxt.visible = !haveParked;
         }
        public OnCloseHandle() {
            if(!this.Inited()) return;
            this.remove();
            this._inited  = false;
            this.carData = null;
            GameConfig.showDownBtnFun(true); 
            delete CarDetailView._instance;
            CarDetailView._instance = null;
        }

        public OnEnableHandle(){
            this.visible = true;
            this._inited  = true;
            GameConfig.showDownBtnFun(false); 
            this.refrehLinJu();
        }
        public OnDisableHandle(){
            this.visible = false;
            this._inited  = false;
            this.removeDarkRect();
            GameConfig.showDownBtnFun(true); 
        }

        private OnDriveAwayHandle(){
            let _carDataId = this.carData.id;
            let self = this;
            if(this.carData.parkingreward==0){ //未满收益
                if(this.carData.parkingid==0) return;
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
            else{ //有值的话为公共车位收益满-自动回收
                CarManager.getInstance().ReqTakeCarReward(_carDataId,function(result:number,reward:number){
                    if(result==0){
                        CarManager.getInstance().ReqMyCarInfo(function(){
                            self.setData(DataManager.playerModel.userInfo.cardatas.filter(data=>{return data.id== _carDataId})[0]);});
/*                             if(reward!=0){
                                egret.setTimeout(() => {
                                showTips("领取"+reward+"金币！");   
                                }, this, 0.5);
                            }
                            else{
                                showTips("领取成功！");  
                            }   */   
                    }
                });
            }
        }
 
    //--------------邻居和动态列表----------------------------------//
        public refrehLinJu()
        {
            //刷新车辆信息
            let self = this;
            if(self.carData)
            {
                CarManager.getInstance().ReqMyCarInfo(function(){
                    self.setData(DataManager.playerModel.getUserInfo().cardatas.filter(data=>{
                        return data.id == self.carData.id;
                    })[0]);
                });
            }

            //刷新车位邻居列表
            if( this.listIndex==3){
                this.bindDataList(this.listIndex);
/*                 //清除之前的公共车位
                if(this.linjuList[0].ownerid==0){
                    this.linjuList.shift();
                }
                this.showLinjuList(this.linjuList); */
            }
        }

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
            //console.log("展示列表showlist----------->",index);
            if (this.goalY == -1) { this.goalY = gameConfig.curHeight() / 4 };
            if (this.goalH == -1) { this.goalH = gameConfig.curHeight() * 3 / 4 };
            if (this.btnGoalY == -1) {
            this.btnGoalY = gameConfig.curHeight() / 4 - this.downBtnGroup.height / 2 + 20;
/*             this.btnGoalY = this.goalY - (this.downBtnGroup.height * GameConfig.innerScale / 2)
                - 20 * GameConfig.innerScaleW;  */
            }
            this.listIndex = index;
            if (this.downBtnGroup.y != this.btnGoalY && this.down_bg.y != this.goalY) {
                egret.Tween.get(this.downBtnGroup).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, [this.listIndex]);
                egret.Tween.get(this.down_bg).to({ height: this.goalH, y: this.goalY }, 300)
                    
            }else{
                this.onComplete(this.listIndex);
            }
        }

        private onComplete(index: number): void {
            //console.log ("onComplete");
            this.hideList_btn.visible = true;
            this.showItemList(index);
            egret.Tween.removeTweens(this.downBtnGroup);
            egret.Tween.removeTweens(this.down_bg);
        }

        private itemList: utils.ScrollerPanel;
        private showItemList(index: number) {
            //console.log("showItemList---->",this.itemList == null);
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
            //console.log("绑定数据--------->",index);
            switch (index) {
                case 1:
                    this.showDongtaiList();
                    break;
                case 3:
                    ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_NEIGHBOR_LIST,{carflag:1});
                    break;
            }
        }
 
        private dongtaiList: string[];
        public showDongtaiList() {
            //console.log("总共记录条数--->", DataManager.playerModel.getCarRecords().length);
            this.dongtaiList =  DataManager.playerModel.getCarRecords().filter(data=>{
                return true;
            });
            if (this.itemList && this.listIndex == 1) {
                this.itemList.bindData(this.dongtaiList);
            }
        }

        private linjuList: HouseVO[] = [];
        public showLinjuList(list: HouseVO[]) {
            //console.log("showLinjuList--------------->",list.length+" "+JSON.stringify(list));
            this._showLinjuList(list);
        }

        private _showLinjuList(list: HouseVO[])
        {
            this.linjuList = [];
            CarManager.getInstance().clearBackFunc_ResParkingInfo();
            if (this.itemList && this.listIndex == 3) {
                let self = this; 
                //房屋和车位绑定后
                this.linjuList = list.map(houseData=>{
                    //空
                    let _empty:number = Number(houseData.parkings.some(data=>{return data.parkingcar==0;}));                                                          
                    //我车
                    let _mycarPark:number = Number(houseData.parkings.some(data=>{return data.parkingcarownerid==DataManager.playerModel.getUserId();}));                             
                    houseData.setObject({empty:_empty,myCarPark:_mycarPark});
                    return houseData;
                }); 

                let EmptyList = this.linjuList.filter(data=>{return data.empty;});                
                let notEmptyList = this.linjuList.filter(data=>{return !data.empty;});
                this.linjuList = notEmptyList.sort((a,b)=>{return b.myCarPark - a.myCarPark;}).concat(EmptyList);
                //第一栏显示公共车位
                 CarManager.getInstance().ReqParkingInfoByType(1,0,[],function(parkingDatas:msg.IParkingData[]){
                    let emptyLots  = parkingDatas.some(data=>{return data.parkingcar==0});
                    let _mycarPark = parkingDatas.some(data=>{return data.parkingcarownerid==DataManager.playerModel.getUserId();});                             
                    let obj = {rId:0,tId:0,ownerid:0,ownername:"公共车位",empty:Number(emptyLots),myCarPark:Number(_mycarPark),parkings:parkingDatas};
                    let houseVO : HouseVO = new HouseVO();
                    houseVO.setObject(obj);
                    self.linjuList.unshift(houseVO);
                    //请求并返回当前状态下的公共车位数据
                    self.itemList.bindData(self.linjuList);
                });
            }
        }
        private onItemTouch(eve: eui.ItemTapEvent) {
            //console.log("onItemTouch------------->",this.listIndex)
            let item :any = null;
            switch (this.listIndex) {
                case 1:
                    item = this.dongtaiList[eve.itemIndex];
                    let operatortype =  parseInt(item.split("_"[0])[1]);
                    let _houseId    =  parseInt(item.split("_"[0])[2]);
                    //console.log("前往玩家ID------>",_userId);
                    if (item) {
                        if(operatortype==msg.CarOperatorType.AutoBack){ //前往公共车位
                            let houseVO : HouseVO = new HouseVO();
                            if(this.linjuList.length==0){
                                CarManager.getInstance().ReqParkingInfoByType(1,0,[],function(parkingDatas:msg.IParkingData[]){
                                    let emptyLots  = parkingDatas.some(data=>{return data.parkingcar==0});
                                    let _mycarPark = parkingDatas.some(data=>{return data.parkingcarownerid==DataManager.playerModel.getUserId();});                             
                                    let obj = {rId:0,tId:0,ownerid:0,ownername:"公共车位",empty:Number(emptyLots),myCarPark:Number(_mycarPark),parkings:parkingDatas};
                                    houseVO.setObject(obj);
                                    openPanel(PanelType.carPublicLot);
                                    CarPublicParkingLotManager.getInstance().UpdateData(houseVO.parkings);
                                });
                            }
                            else{
                                houseVO = this.linjuList[0];
                                openPanel(PanelType.carPublicLot);
                                CarPublicParkingLotManager.getInstance().UpdateData(houseVO.parkings);
                            }
                        }
                        else{
                            ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,{houseid:_houseId}); 
                        }
                        this.OnDisableHandle();
                    }
                    break;
                case 3:
                    item = this.linjuList[eve.itemIndex];
                    if (item) {
                        if(item.ownerid==0){
                            openPanel(PanelType.carPublicLot);
                            //console.log(JSON.stringify(item.parkings));
                            CarPublicParkingLotManager.getInstance().UpdateData(item.parkings);
                            return;
                        }
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM,{houseid:item.rId});
                        this.OnDisableHandle();
                    }
                    break;
            }
        }
        public getSelectCarID(){
            return  this.carData ? this.carData.id : 0;
        }
        //-----------------------------------------------------------------------------//
        public isDongTaiPanelView()
        {
            return this.hideList_btn.visible;
        }

        public Inited(){
            return this._inited;
        }
    }
}