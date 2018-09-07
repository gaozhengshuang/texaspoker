module game {
    export class CarExpeditionInfoItem extends eui.Component {

        stateBg  : eui.Image;
        stateTxt : eui.Label;
        stateBtn : IconButton;
        private carData : msg.ICarData;
        constructor()
        {
            super();
            this.skinName = CarExpeditionInfoItemSkin;
            this.stateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnStateHandle,this)
        }

        public setData(carData:msg.ICarData,timeStr:string)
        {
            this.carData = carData;
            switch (carData.state) {
                case msg.CarState.Exped:
                    this.stateBg.source  = "uiCarAltas_json.speedUp"; 
                    this.stateBtn.icon   = "uiCarAltas_json.speedUp"; 
                    this.stateTxt.text   = "出征:"+ timeStr;
                break;
                case msg.CarState.Arrival:
                    this.stateBg.source  = "uiCarAltas_json.arive"; 
                    this.stateBtn.icon   = "uiCarAltas_json.arive"; 
                    this.stateTxt.text   = "到达:"+ "00:00:00";
                break;
                case msg.CarState.Robbing:
                    this.stateBg.source  = "uiCarAltas_json.retract"; 
                    this.stateBtn.icon   = "uiCarAltas_json.retract";                     
                    this.stateTxt.text   = "撤回:"+ timeStr;
                break;
            }
            
        }

        private OnStateHandle()
        {
            let self = this;
            switch (this.carData.state) {
                case msg.CarState.Exped:  //加速
                    CarManager.getInstance().ReqCarSpeedUp(this.carData.id,function(result:number,carData:msg.ICarData){
                        if(result==0){
                            showTips("加速成功！");
                            if(carData.state!=msg.CarState.Arrival){
                                console.warn("车辆状态未置成到达------>",carData.id,getCarName(carData.tid,"-"));
                            }
                            self.setData(carData,"");
                        }
                    });
                    
                break;
                case msg.CarState.Arrival:  //激活
                    CarManager.getInstance().ReqCarActive(this.carData.id,function(result:number,carData:msg.ICarData){
                        if(result==0){
                            showTips("激活成功！");
                            if(carData.state!=msg.CarState.Robbing){
                                console.warn("车辆状态未置成Robbing------>",carData.id,getCarName(carData.tid,"-"));
                            }
                            CarExpeditionManager.getInstance().refreshAllCar();
                        }
                    });
                break;
                case msg.CarState.Robbing: //撤回
                    CarManager.getInstance().ReqCarRetract(this.carData.id,function(result:number,carData:msg.ICarData){
                        if(result==0){
                            showTips("撤回成功！");
                            if(carData.state!=msg.CarState.Ready){
                                console.warn("车辆状态未置成Ready------>",carData.id,getCarName(carData.tid,"-"));
                            }
                            CarExpeditionManager.getInstance().refreshAllCar();
                        }
                    });
                break;
            }
        }
    }
    export class CarExpeditionInfoPanel extends PanelComponent  {
    
        center              : eui.Group;
        InfoGroup           : eui.Group;
        infoTxt             : eui.Label;

        private static _instance: CarExpeditionInfoPanel = null;
        public static getInstance(): CarExpeditionInfoPanel {
            if (!CarExpeditionInfoPanel._instance) {
                CarExpeditionInfoPanel._instance = new CarExpeditionInfoPanel();
            }
            return CarExpeditionInfoPanel._instance;
        }
      
        private CarDatas            : msg.ICarData[] = [];
        private carExpeiditonInfos  : any[]          = [];
        private _inited             : Boolean = false;

        constructor()
        {
            super();
            this.skinName = CarExpeditionListSkin;
            this._layerType = PanelLayerType.Diy;
            this._isShowDark = this._isShowEffect = false;
        }

        protected beforeShow() {
            this._inited   = true;
        }

        public refreshData(carData:msg.ICarData,timeStr:string){
            let self = this;
            for(let info of this.carExpeiditonInfos)
            {
                if(info.id==carData.id)
                {   
                    info.infoItem.setData(carData,timeStr);
                    break;
                }
            }
        }
        public updateView() {
            this.CarDatas = DataManager.playerModel.getUserInfo().cardatas.filter(data=>{
                return data.state!=msg.CarState.Ready && data.state!=msg.CarState.Parking && data.state!=msg.CarState.Back
            });

            let expedCount  = this.CarDatas.filter(data=>{return data.state == msg.CarState.Exped;}).length;
            let arriveCount = this.CarDatas.filter(data=>{return data.state == msg.CarState.Arrival;}).length;
            let emptyCount  = this.CarDatas.length - expedCount - arriveCount;

            let content     = "出征x"+expedCount + " "+"停靠x" + arriveCount+" "+"空闲x" + emptyCount;
            this.infoTxt.textFlow = [
                {text:"车辆：",style:{bold:true,size:20}},
                {text:content,style:{bold:false,size:18}},
            ];

            //信息列表
            for (let index = 0; index < this.CarDatas.length; index++) {
                const data = this.CarDatas[index];
                let _CarExpeditionInfoItem = new CarExpeditionInfoItem();
                this.InfoGroup.addChild(_CarExpeditionInfoItem);
                let dateTime = new Date(Math.max(0,new Date().getTime() - <number>data.starttime - SysTimeEventManager.getInstance().systimeoffset));
                _CarExpeditionInfoItem.setData(data,sDhFilter(dateTime.getTime()/1000,":"));
                this.carExpeiditonInfos.push({id:this.CarDatas[index].id,infoItem:_CarExpeditionInfoItem});
            }

            

        }
        public OnCloseHandle() {
            if(!this.Inited()) return;
            this.remove();
            console.log("出征车辆列表关闭");

            this._inited  = false;
            this.CarDatas = [];
            this.carExpeiditonInfos = [];
 /*            //显示主页个人信息界面
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true});
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: true });
			//显示下方菜单栏
            GameConfig.showDownBtnFun(true); 
            //显示地图关闭event
            GameConfig.setEventsReply(false); */
            delete CarExpeditionInfoPanel._instance;
            CarExpeditionInfoPanel._instance = null;
        }


        //-----------------------------------------------------------------------------//
        public Inited(){
            return this._inited;
        }

    }
}