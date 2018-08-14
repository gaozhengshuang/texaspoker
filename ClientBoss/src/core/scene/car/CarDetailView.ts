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

        private carData  : msg.CarData;

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
        public setData(carData:msg.CarData) {
            if(!carData) return;
            this.carData = carData;
            console.log("打开详情页面"+carData.id+" "+carData.tid+" "+carData.parkingid);
            this.updateView();
        }
        private updateView()
        {   
            if(!this.carData) return;
            let carItemData  = table.TCarById[this.carData.tid];
            if(!carItemData) return;
            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.big_path);
            let factor = 1;
            if(txtr)
            {
                this.carIcon.source    = txtr;
                this.carIcon.width     = txtr.textureWidth * factor;
                this.carIcon.height    = txtr.textureHeight * factor;
            }
            //名字
            this.carNameTxt.textFlow = [
                { text: carItemData.Brand+""+carItemData.Model, style: { bold: true,size: 60 } },
            ]
            //价格
            this.priceTxt.text = "价值"+carItemData.Price+"金币";
           
            //容量和收益
            this.carInfoTxt.textFlow = [
                { text: "汽车容量"+carItemData.Capacity, style: { bold: true,size: 60 }},
                { text: "\n"+"收益"+carItemData.RewardPerH+"/小时", style: { bold: true,size: 40 } },
            ]

            //停放状态
            let _parkingData = DataManager.playerModel.getMyCarPakingInfo(this.carData.id);
            if(_parkingData){
                this.parkingInfoTxt.textFlow = [
                    { text: "停在"+_parkingData.ownerid+"车位", style: { bold: true,size: 60 }},
                    { text: "预计收益"+_parkingData.parkingreward+"金币", style: { bold: true,size: 40 } },
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
            CarManager.getInstance().driveAway(this.carData.id);
        }

        private OnClickNeighbor(){

        }

        private OnClickState(){

        }
    }
}