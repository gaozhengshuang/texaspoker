module game {
    export class CarExpeditionManager {
    
        private static _instance: CarExpeditionManager;
        public static getInstance(): CarExpeditionManager {
            if (!CarExpeditionManager._instance) {
                CarExpeditionManager._instance = new CarExpeditionManager();
            }
            return CarExpeditionManager._instance;
        }
        
        private carDatas : msg.ICarData[] = [];
        private curT: number = 0;


        //手动刷新车辆位置状态
        public refreshAllCar()
        {
            console.log("刷新车辆位置状态");
            this.showExpeditionListInfo(true);
            this.CloseCarMarkerUpdate();
            this.OpenCarMarkerUpdate();
        }

        //车辆到达点图标标注
        public showArrivalCarMarkerPos(isShow:boolean)
        {
            CarManager.getInstance().ReqMyCarInfo(function(){
                DataManager.playerModel.getUserInfo().cardatas.forEach(data=>{
                    if(data.state==msg.CarState.Arrival||data.state==msg.CarState.Robbing){
                        removeExpeditionCarMarkerById(data.id);
                        if(isShow){
                            addExpeditionCarMarker({id:data.id,imageUrl:'resource/others/images/small_1.png',lat:data.expedition.latitude,lng:data.expedition.longitude});                
                        }
                    }
                });
            });

        }

        public OpenCarMarkerUpdate()
        {
            let self =  this;   
            self.CloseCarMarkerUpdate();
            CarManager.getInstance().ReqMyCarInfo(function(){
                self.carDatas = DataManager.playerModel.getUserInfo().cardatas.filter(data=>{return data.state==msg.CarState.Exped || data.state==msg.CarState.Robbing});
                self.curT = 0;
                self.updateCarMarkerPos(self);
                if(self.carDatas.length >0){
                    SysTimeEventManager.getInstance().addFunction(self.runningTimer, self);                    
                }
            });
        }

        public CloseCarMarkerUpdate()
        {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
            this.carDatas   = [];
        }


        private runningTimer(dt:number,body:any)
        {
            //if(body.curT < 30)
            {
                //body.curT += 1;
                //if(body.curT>=30)
                {
                    body.curT = 0;
                    console.log("刷新车辆位置");
                    body.updateCarMarkerPos(body);
                }              
            }
        }


        //客户端模拟车辆位置
        private updateCarMarkerPos(body:any)
        {   
            let indexes : number[] = [];
            let carDatas : msg.ICarData[] = body.carDatas;
            for (let index = 0; index < carDatas.length; index++){
                const data = carDatas[index];
                if(data.state == msg.CarState.Exped){//出征中状态
                    let nowTime  = new Date().getTime() - SysTimeEventManager.getInstance().systimeoffset;                    
                    let dateTime = new Date(Math.max(0,nowTime- <number>data.starttime));

                    let SelfPoint = DataManager.playerModel.getSelfPoint();
    
                    let deltaLat = SelfPoint.lat - data.expedition.latitude;
                    let delatLng = SelfPoint.lng - data.expedition.longitude;
        
                    let costTime    = dateTime.getTime();
                    let leftTime    = new Date(Math.max(0,<number>data.endtime-nowTime));
                    let totalTime   = Number(data.endtime) - Number(data.starttime);
                    let ratio       = costTime / totalTime;

                    let offsetLat   = ratio * deltaLat;
                    let offsetLng   = ratio * delatLng;
    
                    let targetLat   = SelfPoint.lat - offsetLat;
                    let targetLng   = SelfPoint.lng - offsetLng;
    
                    console.log("ratio--------------->",ratio);
                    Console.log("目标点位置---->",targetLat," ",targetLng);
    
                    if(ratio>=1){//有车辆到达终点
                        indexes.push(index);
                        removePolylineByCar(data.id);//移除单个车的路线
                    }
                    else{//客户端继续模拟位置,并刷新出征车辆信息列表
                        removeExpeditionCarMarkerById(data.id);
                        addExpeditionCarMarker({id:data.id,imageUrl:'resource/others/images/small_1.png',lat:targetLat,lng:targetLng});
                        CarExpeditionInfoPanel.getInstance().refreshData(data,sDhFilter(leftTime.getTime()/1000,":"));
                    }
                }
                else if(data.state==msg.CarState.Robbing) //停靠状态
                {
                    let nowTime  = new Date().getTime() - SysTimeEventManager.getInstance().systimeoffset;
                    let dateTime = new Date(Math.max(0,<number>data.endtime-nowTime));
                    if(dateTime.getTime() == 0){ //有车辆已经撤回到仓库
                        indexes.push(index);
                        removeExpeditionCarMarkerById(data.id);//移除单个车的标注
                    }
                    else{
                        CarExpeditionInfoPanel.getInstance().refreshData(data,sDhFilter(dateTime.getTime()/1000,":"));                        
                    }
                }
                else if(data.state==msg.CarState.Arrival) //到达状态
                {
/*                     removeExpeditionCarMarkerById(data.id);
                    addExpeditionCarMarker({id:data.id,imageUrl:'resource/others/images/small_1.png',lat:data.expedition.latitude,lng:data.expedition.longitude});
 */                }

            }
            indexes.forEach(iindex=>{carDatas.splice(iindex,1);});
            body.cardatas = carDatas;
            console.log("出征车辆数量------------------>",carDatas.length);

            //有车辆到达终点或者已经撤回完毕，获取车辆信息并刷新状态
            if(indexes.length>0){
                //ApplicationFacade.getInstance().sendNotification(CommandName.MAP_SHOW_EXPEDITION_INFO);
	            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_MAP_UI, { isShow: true });			                
            }
            if(carDatas.length==0) {
                body.CloseCarMarkerUpdate();
            }

        }
        //-----------------------------------------------车子出征列表------------------------------//
        public showExpeditionListInfo(show:boolean)
        {
            if(!show) {
                //CarExpeditionInfoPanel.getInstance().OnCloseHandle();
                showExpeditionState(show,[],[]);
                showExpeditionInfoTxt(show,"");
                return;
            }
            let self = this;
            //重新请求玩家车辆数据 
            CarManager.getInstance().ReqMyCarInfo(function(){
                //self.showArrivalCarMarkerPos(show);
                CarExpeditionInfoPanel.getInstance().updateView();
            });

        }

    }
}