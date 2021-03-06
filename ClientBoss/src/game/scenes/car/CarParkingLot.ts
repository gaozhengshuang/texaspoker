module game {
    export class CarParkingLot extends eui.Component  {
        
        center            : eui.Group;
        parkingCarIcon    : eui.Image;
        stateBgTicket     : eui.Image;
        stateBgPark       : eui.Image;

        infoTxt           : eui.Label;
        timeTxt           : eui.Label;

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
            this.center.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnSelect,this);
            
            this.itemData = data;
            this.parkingCarIcon.visible = data.parkingcar!=0;
            this.stateBgPark.visible    = data.parkingcar==0;
            //this.stateBgTicket.visible  = data.parkingcar!=0 && data.ownerid == DataManager.playerModel.getUserId();
            this.stateBgTicket.visible = false;
            //console.log("车位信息------->",data.parkingcar," ",data.parkingtime);
            if(data.parkingcar==0)
            {
                this.infoTxt.text = "";
                this.timeTxt.text = "";
                this.removeTimer();
            }
            else
            {
                let _parkingCarData = table.TCarById[data.parkingcartid];

                if(_parkingCarData)
                {
                    this.carData = _parkingCarData;
                    //Icon
                    let txtr:egret.Texture = RES.getRes(_parkingCarData.bigpath);
                    let factor = 1;
                    if(txtr)
                    {
                        this.parkingCarIcon.source    = txtr;
                        //this.parkingCarIcon.width     = txtr.textureWidth * factor;
                        //this.parkingCarIcon.height    = txtr.textureHeight * factor;
                    }

                }

                //信息
/*                 console.log('计时器时间------->',SysTimeEventManager.getInstance().systimeNum);
                console.log('当前时间------->',new Date().getTime());
                console.log('停车开始时间------->',<number>data.parkingtime);
                let dateTime = new Date(Math.max(new Date().getTime() - <number>data.parkingtime - SysTimeEventManager.getInstance().systimeoffset,0));
                //let timeStr =  String(dateTime.getHours()+":"+dateTime.getMinutes());
                //let timeStr = sDh(dateTime.getTime()/1000);
                //let timeStr= formatTime(dateTime,"hh:mm:ss");
                let timeStr = sDhFilter(dateTime.getTime()/1000);
                console.log("累计时间---->",dateTime.getTime());
                this.timeTxt.textFlow = [
                    { text: timeStr,style: {"textColor":0xFFFFFF,"stroke":2,"strokeColor":0x5f6163}},   
                ] */
                this.infoTxt.textFlow = [
                    { text: data.parkingcarownername+"："+getCarName(_parkingCarData.Id), style: { size : 20,"textColor":0x5f6163,bold:true} },
                    //{ text: "\n", style: { size : 18} },                    
                    //{ text: "\n"+ timeStr,style: { size : 24,"textColor":0xFFFFFF,"stroke":2,"strokeColor":0x5f6163}},
                ]
                //SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
            }

        }

        private OnSelect()
        {
            //console.log("选择车位----------->",this.itemData.ownerid,"---",DataManager.playerModel.getUserId());
            this._select = !this._select;

            if(this.itemData.ownerid == DataManager.playerModel.getUserId()) {
/*                 //自己的车位被占用，贴条
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
                } */

                //console.log("车位操作----------->",this.itemData.parkingcar,DataManager.playerModel.userInfo.cardatas.length);
                if(this.itemData.parkingcar==0){
                    let _canPark = false;
                    if(CarDetailView.getInstance().Inited())
                    {
                        if(CarDetailView.getInstance().carData){
                            let carData = CarDetailView.getInstance().carData;
                            if(carData.state==msg.CarState.Ready && (!carData.reward || (carData.reward && carData.reward.money==0))){
                                _canPark = true;
                                CarManager.getInstance().parking(carData.id,this.itemData,function(result:number){
                                    if(result==0){
                                        showTips("停车成功！");
                                        CarManager.getInstance().ReqMyCarInfo(
                                            function(){ ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_PARKINGLOT_UPDATE);}
                                        );
                                    }
                                });
                            }
                        }
                    }
                    else
                    {
                        //从车库背包中选择一个空闲的车停放
                        for(let carData of DataManager.playerModel.userInfo.cardatas)
                        {
                            if(carData.state == msg.CarState.Ready){
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
            else
            {               
            }
        }

        private runningTimer(dt:number,body:any)
        {
            let dateTime = new Date(Math.max(0,new Date().getTime() - <number>body.itemData.parkingtime - SysTimeEventManager.getInstance().systimeoffset));

           
            //let dateTime = new Date(dt - <number>body.itemData.parkingtime);
            //let timeStr = sDh(dateTime.getTime()/1000);
            let timeStr = sDhFilter(dateTime.getTime()/1000);
            
            //let timeStr = formatTime(dateTime,"hh:mm:ss");            
            //getHourMinutesTime();
/*             body.infoTxt.textFlow = [
                { text: body.itemData.parkingcarownername+"："+body.carData.Brand+body.carData.Model, style: { size : 18,"textColor":0x5f6163} },
                { text: "\n"+timeStr,style: { size : 24,"textColor":0xFFFFFF,"stroke":2,"strokeColor":0x5f6163}},
            ] */

            body.timeTxt.textFlow = [
                { text: timeStr,style: {"textColor":0xFFFFFF,"stroke":2,"strokeColor":0x5f6163}},   
            ]
            body.infoTxt.textFlow = [
                { text: body.itemData.parkingcarownername+"："+body.carData.Brand+body.carData.Model, style: { size : 20,"textColor":0x5f6163,bold:true} },
                //{ text: "\n", style: { size : 18} },                    
                //{ text: "\n"+ timeStr,style: { size : 24,"textColor":0xFFFFFF,"stroke":2,"strokeColor":0x5f6163}},
            ]


        }

        public removeTimer(): void {
            //SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }

        
    }
}