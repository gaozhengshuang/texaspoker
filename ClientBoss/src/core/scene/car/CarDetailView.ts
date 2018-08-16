module game {
    export class CarDetailView extends PanelComponent  {
        
        carIcon         : eui.Image;
        btnDriveAwayBg  : eui.Image;
        goldbg          : eui.Image;

        btnDriveAwayTxt : eui.Label;
        priceTxt        : eui.Label;
        carInfoTxt      : eui.Label;
        carNameTxt      : eui.Label;
        parkingInfoTxt  : eui.Label;

        btnDriveAway    : IconButton;
        btnClose        : IconButton;
        btnNeighbor     : IconButton;
        btnState        : IconButton;

        private carData  : msg.ICarData;

        protected getSkinName() {
            return CarDetailInfoSkin;
        }
        private static _instance: CarDetailView;

        public static getInstance(): CarDetailView {
            if (!CarDetailView._instance) {
                CarDetailView._instance = new CarDetailView();
            }
            return CarDetailView._instance;
        }


        public init() 
        {
            this.btnDriveAway.icon = "shopItemButtonBg_png";
            this.btnClose.icon = "uiCarAltas_json.backBtn";
            this.btnNeighbor.icon = "uiCarAltas_json.neighbor";
            this.btnState.icon = "uiCarAltas_json.stateBtn";
        }

        protected beforeShow() {
            this._touchEvent = [
                { target: this.btnClose, callBackFunc: this.OnCloseHandle },
                { target: this.btnDriveAway, callBackFunc: this.OnDriveAwayHandle },
                { target: this.btnNeighbor, callBackFunc: this.OnClickNeighbor },
                { target: this.btnState, callBackFunc: this.OnClickState },
            ];

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
            //名字
            this.carNameTxt.textFlow = [
                { text: carItemData.Brand+""+carItemData.Model, style: { bold: true,size: 30 } },
            ]
            //价格
            this.priceTxt.text = "价值"+carItemData.Price+"金币";
           
            //容量和收益
            this.carInfoTxt.textFlow = [
                { text: "汽车容量"+carItemData.Capacity, style: { bold: true,size: 35 }},
                { text: "\n"+"收益"+carItemData.RewardPerH+"/小时", style: { bold: true,size: 30 } },
            ]

            //停放状态
            let _parkingData = DataManager.playerModel.getMyCarPakingInfo(this.carData.id);
            if(_parkingData){
                this.parkingInfoTxt.textFlow = [
                    { text: "停在"+_parkingData.ownername+"车位", style: { bold: true,size: 30 }},
                    { text: "预计收益"+_parkingData.parkingreward+"金币", style: { bold: true,size: 30 } },
                ]
            }
            else{
                if(this.carData.parkingid!=0){console.warn("不在parkingdatas中",this.carData.parkingid);}
                this.parkingInfoTxt.text = "空闲";
            }
            this.btnDriveAwayBg.visible = this.btnDriveAwayTxt.visible = _parkingData && true;
        }
        public OnCloseHandle() {
            this.remove();
        }

        private OnDriveAwayHandle(){
            let _carDataId = this.carData.id;
            let self = this;
            CarManager.getInstance().driveAway(_carDataId,null,function(result:number,reward:number){
                if(result==0){
                    showTips("收回成功！");  
                    CarManager.getInstance().ReqMyCarInfo(function(){
                        self.setData(DataManager.playerModel.userInfo.cardatas.filter(data=>{return data.id== _carDataId})[0]);});
                }
                if(reward!=0){showTips("获得"+reward+"金币！");}  
            });
        }

        private OnClickNeighbor(){

        }

        private OnClickState(){

        }
    }
}