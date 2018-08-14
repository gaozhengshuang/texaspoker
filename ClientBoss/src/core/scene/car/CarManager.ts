module game {
    export class CarManager {

        private static _instance: CarManager;
        public static getInstance(): CarManager {
            if (!CarManager._instance) {
                CarManager._instance = new CarManager();
            }
            return CarManager._instance;
        }

        public constructor()
        {
            NotificationCenter.addObserver(this, this.OnGW2C_ParkCarResult, "msg.GW2C_ParkCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TakeBackCarResult, "msg.GW2C_TakeBackCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TicketCarResult, "msg.GW2C_TicketCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_ResParkingInfo, "msg.GW2C_ResParkingInfo");
        }
                
        public buyParkingLot(){}

 
        //停车 
        public parking(cid:number|Long,pid:number|Long)
        {
            sendMessage("msg.C2GW_ParkCar", msg.C2GW_ParkCar.encode({
                carid: cid,
                parkingid: pid,
            }));
        }

        //贴条
        public giveTicket(pid:number|Long)
        {
            sendMessage("msg.C2GW_TicketCar", msg.C2GW_TicketCar.encode({
                parkingid: pid,
            }));
        }

        //收回
        public driveAway(cid:number|Long)
        {   
            let _parkingData = DataManager.playerModel.getMyCarPakingInfo(cid);
            if(!_parkingData) return;
            CommonDialog.getInstance().updateView("uiCarAltas_json.dialogBg","uiCarAltas_json.normalBtn","uiCarAltas_json.closeBtn");
            showDialog("是否收回在"+_parkingData.id+"的车?", "收回", function(){
                sendMessage("msg.C2GW_TakeBackCar", msg.C2GW_TakeBackCar.encode({
                    carid: cid,
                }));
            },null);
        }
         //请求我的车辆信息
        public ReqMyCarInfo()
        {
            console.log("ReqMyCarInfo");
            sendMessage("msg.C2GW_ReqCarInfo",msg.C2GW_ReqCarInfo.encode({}));
        }

        //请求我的停车位
        public ReqMyParkingInfo()
        {
            sendMessage("msg.C2GW_ReqCarInfo",msg.C2GW_ReqMyParkingInfo.encode({}));

        }

        //请求符合条件的车位列表
        public ReqParkingInfoByType(data:msg.C2GW_ReqParkingInfoByType)
        {
            sendMessage("msg.C2GW_ReqParkingInfoByType", msg.C2GW_ReqParkingInfoByType.encode({
               type : data.type,
            }));
        }

        //收到符合条件的车位列表
        private OnGW2C_ResParkingInfo(msgs:msg.GW2C_ResParkingInfo)
        {
            console.log("OnGW2C_ResParkingInfo",msgs.parkingdatas.length);
            msgs.parkingdatas.forEach((parkingData,index,array)=>{
                console.log(index+" "+parkingData);
            });
        }

        //停车结果
        private OnGW2C_ParkCarResult(msg:msg.GW2C_ParkCarResult)
        {
            
        }

        //收回结果
        private OnGW2C_TakeBackCarResult(msg:msg.GW2C_TakeBackCarResult)
        {

        }
        
        //贴条结果
        private OnGW2C_TicketCarResult(msg:msg.GW2C_TicketCarResult)
        {

        }

        private OnGW2C_ResCarInfo(msgs:msg.GW2C_ResCarInfo)
        {
            console.log("OnGW2C_ResCarInfo"+msgs.parkingdatas.length+" "+msgs.cardatas.length);
            
        }

    }
}