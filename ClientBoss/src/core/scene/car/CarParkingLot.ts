module game {
    export class CarParkingLot extends eui.Component  {
        

        parkingCarIcon    : eui.Image;

        infoTxt           : eui.Label;

        btn_select          : IconButton;
    
        private itemData    : msg.IParkingData;
        private carData     : table.ITCarDefine;
        private _select = false;

        public constructor() {
            super();
            this._select = false;
            this.skinName = CarParkingLotSkin;
        }

        public setData(data:msg.IParkingData) {
            if(!data) return;
            this.btn_select.icon = "shopItemButtonBg_png";
            this.btn_select.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnSelect,this);
            
            this.itemData = data;
            this.parkingCarIcon.visible = data.parkingcar!=0;
            //console.log("车位信息------->",data.parkingcar," ",data.parkingtime);
            if(data.parkingcar==0)
            {
                this.infoTxt.text = "空";
                this.removeTimer();
            }
            else
            {
                let _parkingCarData = table.TCarById[data.parkingcartid];

                if(_parkingCarData)
                {
                    this.carData = _parkingCarData;
                    //Icon
                    let txtr:egret.Texture = RES.getRes(_parkingCarData.path);
                    let factor = 1;
                    if(txtr)
                    {
                        this.parkingCarIcon.source    = txtr;
                        this.parkingCarIcon.width     = txtr.textureWidth * factor;
                        this.parkingCarIcon.height    = txtr.textureHeight * factor;
                    }
                }

                //信息
                console.log('计时器时间------->',SysTimeEventManager.getInstance().systimeNum);
                console.log('当前时间------->',new Date().getTime());
                console.log('停车开始时间------->',<number>data.parkingtime);
                let dateTime = new Date(Math.max(new Date().getTime() - <number>data.parkingtime - SysTimeEventManager.getInstance().systimeoffset,0));
                let timeStr =  String(dateTime.getHours()+":"+dateTime.getMinutes());
                timeStr = sDh(dateTime.getTime()/1000);
                console.log("累计时间---->",dateTime.getTime());
                this.infoTxt.textFlow = [
                    { text: data.parkingcarownername+"："+_parkingCarData.Brand+_parkingCarData.Model, style: { size : 20} },
                    { text: "\n"+timeStr,style: { size : 20}},
                ]
                SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
                //this.runningTimer(SysTimeEventManager.getInstance().systimeNum);
            }

        }

        private OnSelect()
        {
            //console.log("选择车位----------->",this.itemData.ownerid,"---",DataManager.playerModel.getUserId());
            this._select = !this._select;

            if(this.itemData.ownerid == DataManager.playerModel.getUserId()) {
                //自己的车位被占用，贴条
                if(this.itemData.parkingcar!=0)
                {
                    CarManager.getInstance().giveTicket(this.itemData,function(result:number,reward:number){
                        if(result==0){ 
                            CarManager.getInstance().ReqMyCarInfo(
                                function(){ ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_PARKINGLOT_UPDATE);}
                            );
                            
                            if(reward!=0){
                                egret.setTimeout(() => {
                                showTips("获得"+reward+"金币！");   
                                }, this, 0.5);
                            }
                            else{
                                showTips("贴条成功！");  
                            }  
                    }                     
                    });
                }
                else
                {
                    showTips("不能停靠自己的车位！");
                }
            }
            else
            {               
                //console.log("车位操作----------->",this.itemData.parkingcar,DataManager.playerModel.userInfo.cardatas.length);
                if(this.itemData.parkingcar==0){
                    let _canPark = false;
                   
                    for(let carData of DataManager.playerModel.userInfo.cardatas)
                    {
                        if(carData.parkingid==0){
                            _canPark = true;
                            CarManager.getInstance().parking(carData.id,this.itemData,function(result:number){
                                if(result==0){
                                    showTips("停车成功！");
                                    CarManager.getInstance().ReqMyCarInfo(
                                        function(){ ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_PARKINGLOT_UPDATE);}
                                    );
                                }
                            });
                            break;
                        }
                    }

                    if(!_canPark) {showTips("没有可以停的车辆");}
                }
                else{   
                    if(DataManager.playerModel.userInfo.cardatas.some(item=>{return item.ownerid==this.itemData.parkingcarownerid;})){
                        //停的是自己的车
                        CarManager.getInstance().driveAway(this.itemData.parkingcar,this.itemData,function(result:number,reward:number){
                            if(result==0)
                            {; 
                                CarManager.getInstance().ReqMyCarInfo(function(){ ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_PARKINGLOT_UPDATE);});
                            
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
                }
            }
        }

        private runningTimer(dt:number,body:any)
        {
            let dateTime = new Date(Math.max(0,new Date().getTime() - <number>body.itemData.parkingtime - SysTimeEventManager.getInstance().systimeoffset));

           
            //let dateTime = new Date(dt - <number>body.itemData.parkingtime);
            let timeStr = sDh(dateTime.getTime()/1000);
            //getHourMinutesTime();
            body.infoTxt.textFlow = [
                { text: body.itemData.parkingcarownername+"："+body.carData.Brand+body.carData.Model, style: { size : 20} },
                { text: "\n"+timeStr,style: { size : 20}},
            ]
        }

        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }

        
    }
}