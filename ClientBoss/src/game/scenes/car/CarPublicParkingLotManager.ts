module game {
    export class CarPublicParkingLotManager extends PanelComponent  {
        
        downBtnGroup    : eui.Group;
        down_bg         : eui.Group;

        carIcon         : eui.Image;

        carInfoTxt      : eui.Label;
        carNameTxt      : eui.Label;
        parkingInfoTxt  : eui.Label;

        btnClose        : IconButton;
     
        sr_item         : eui.Scroller;
        ls_items        : eui.List;

        private _inited         : boolean;
        public parkingDatas     : msg.IParkingData[];
        private _dataProv       : eui.ArrayCollection;

        private _runingTimers = [];

        private static _instance: CarPublicParkingLotManager = null;

        public static getInstance(): CarPublicParkingLotManager {
            if (!CarPublicParkingLotManager._instance) {
                CarPublicParkingLotManager._instance = new CarPublicParkingLotManager();
            }
            return CarPublicParkingLotManager._instance;
        }
        constructor()
        {
            super();
            this.skinName = CarPublicParkinglotSkin;
            this.initItemList();
        }
        public init() 
        {
            this._inited   = false;
        }

        protected beforeShow() {
            this.btnClose.icon = "uiCarAltas_json.backBtn";
            this._touchEvent = [
                { target: this.btnClose, callBackFunc: this.OnCloseHandle },
            ];

            this._inited   = true;
            //this.addEventListener(CarDetailView.POPUP_ROOM_NEIGHBOR,this.showLinjuList,this);
        }
        public initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = CarPulicParkinglot;
            //this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
        }
        public refreshData(){
            let self = this;
            CarManager.getInstance().ReqParkingInfoByType(1,0,function(parkingDatas:msg.IParkingData[]){
                self.UpdateData(parkingDatas);
            });
        }
        public UpdateData(parkingDatas:msg.IParkingData[]) {
            if(!parkingDatas) return;
            //设置并排序
            let userId = Number(DataManager.playerModel.getUserId());
            this.parkingDatas = parkingDatas.sort((a,b)=>{return Number(b.parkingcar)-Number(a.parkingcar);})
            .sort((a,b)=>{return (Number(b.parkingcarownerid)-userId)-(Number(a.parkingcarownerid)-userId)});
            this.updateView();
        }
        private updateView()
        {   
            if(!this.parkingDatas) return;
            console.log("updateView---->",this.parkingDatas.length);
            this._dataProv.removeAll();
            let self = this;
            this.parkingDatas.forEach(data=>{self._dataProv.addItem(data)});

            console.log("-------------->",this.ls_items.numChildren+" "+this.ls_items.numElements);
            SysTimeEventManager.getInstance().addFunction(this.runningTimer,this);
            
         }
  
        public OnCloseHandle() {
            if(!this.Inited()) return;
            this.remove();
            console.log("公共车位界面关闭");

            this.delAllFunction();
            SysTimeEventManager.getInstance().delFunction(this.runningTimer,this);
            
            this._inited  = false;
            delete CarPublicParkingLotManager._instance;
            CarPublicParkingLotManager._instance = null;
            //关闭后刷新邻居列表
            CarDetailView.getInstance().refrehLinJu();
        }

/*         private onItemTouch(eve: eui.ItemTapEvent) {
            console.log("onItemTouch------------->")
    
            let itemRender = <CarPulicParkinglot>eve.itemRenderer;
        
        } */


        //-----------------------------------------------------------------------------//
        public Inited(){
            return this._inited;
        }
        //所有车位共用一个计时器
        private runningTimer(dt:number,body:any)
        {
            body.runFunction(dt);
        }

        public addFunction(fun: Function, body: any) {
			var index: number = -1;
			var lengh: number = this._runingTimers.length;
			for (var i: number = 0; i < lengh; i++) {
				if (this._runingTimers[i].fun == fun && this._runingTimers[i].body == body) {
					index = i;
				}
			}
			if (index == -1) {
				this._runingTimers.push({ fun: fun, body: body });
			}
		}
		public delFunction(fun: Function, body: any) {
			var index: number = -1;
			if (this._runingTimers && this._runingTimers.length > 0) {
				var lengh: number = this._runingTimers.length;
				for (var i: number = 0; i < lengh; i++) {
					if (this._runingTimers[i].fun == fun && this._runingTimers[i].body == body) {
						index = i;
					}
				}
				if (index > -1) {
					this._runingTimers.splice(index, 1);
				}
			}
        }
        
		public delAllFunction(){
			if(this._runingTimers!=null){
				this._runingTimers.length = 0;
			}
        }
        
		private runFunction(time: Number){
			if (this._runingTimers && this._runingTimers.length > 0) {
				var lengh: number = this._runingTimers.length;
				for (var i: number = 0; i < lengh; i++) {
					if (this._runingTimers[i] != null) {
						var fun: Function = this._runingTimers[i].fun as Function;
						fun(time, this._runingTimers[i].body);
					}
				}
			}
		}
    }
}