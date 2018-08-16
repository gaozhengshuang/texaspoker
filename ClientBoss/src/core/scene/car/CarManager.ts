module game {
    export class CarFunData
    {
        public uid     :number|Long;
        public func    :Function;
    }
    export class CarManager {
    
        private static _instance: CarManager;
        public static getInstance(): CarManager {
            if (!CarManager._instance) {
                CarManager._instance = new CarManager();
            }
            return CarManager._instance;
        }
        //回调后需要判断是否是对应的发起者
        private GW2C_ResCarInfo_BackCalls           : Function[];
        private GW2C_ParkCarResult_BackCalls        : Function[];
        private GW2C_TakeBackCarResult_BackCalls    : Function[];
        private GW2C_TicketCarResult_BackCalls      : Function[]; 

        private GW2C_ResParkingInfo_BackCalls       : CarFunData[];
        public constructor()
        {
            NotificationCenter.addObserver(this, this.OnGW2C_ResCarInfo, "msg.GW2C_ResCarInfo");
            
            NotificationCenter.addObserver(this, this.OnGW2C_ParkCarResult, "msg.GW2C_ParkCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TakeBackCarResult, "msg.GW2C_TakeBackCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TicketCarResult, "msg.GW2C_TicketCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_ResParkingInfo, "msg.GW2C_ResParkingInfo");
            
            this.GW2C_ResCarInfo_BackCalls          = [];
            this.GW2C_ResParkingInfo_BackCalls      = [];
            this.GW2C_ParkCarResult_BackCalls       = [];
            this.GW2C_TakeBackCarResult_BackCalls   = [];
            this.GW2C_TicketCarResult_BackCalls     = [];
        }
    

        public buyParkingLot(){}

         //请求我的车辆信息
        public ReqMyCarInfo(callFunc:Function=null)
        {
            //console.log("ReqMyCarInfo");
            if(callFunc && !this.GW2C_ResCarInfo_BackCalls.some(func=>{return func==callFunc;}))
            {
                this.GW2C_ResCarInfo_BackCalls.push(callFunc);
            }
            sendMessage("msg.C2GW_ReqCarInfo",msg.C2GW_ReqCarInfo.encode({}));
        }
        private OnGW2C_ResCarInfo(data: msg.GW2C_ResCarInfo){
            this.GW2C_ResCarInfo_BackCalls.forEach(func=>{if(func){func()};});
            this.GW2C_ResCarInfo_BackCalls = [];
        }
 
        //停车 
        public parking(cid:number|Long,_parkingData:msg.IParkingData,callFunc:Function=null)
        {
            //console.log("停车--->",cid," ",_parkingData.ownerid+" "+_parkingData.ownername);
            let self = this;
            CommonDialog.getInstance().updateView("uiCarAltas_json.dialogBg","uiCarAltas_json.normalBtn","uiCarAltas_json.closeBtn");
            showDialog("是否在"+_parkingData.ownername+"的车位停车?", "停车", function(){
                if(callFunc && !self.GW2C_ParkCarResult_BackCalls.some(func=>{return func==callFunc;}))
                {
                    self.GW2C_ParkCarResult_BackCalls.push(callFunc);
                }
                sendMessage("msg.C2GW_ParkCar", msg.C2GW_ParkCar.encode({
                    carid: cid,
                    parkingid: _parkingData.id,
                }));
            },null);
        }

        //贴条
        public giveTicket(_parkingData:msg.IParkingData,callFunc:Function=null)
        {
            //console.log("贴条--------");
            CommonDialog.getInstance().updateView("uiCarAltas_json.dialogBg","uiCarAltas_json.normalBtn","uiCarAltas_json.closeBtn");
            let self = this;
            showDialog("是否对"+_parkingData.parkingcarownername+"的车贴条?", "贴条", function(){
                if(callFunc && !self.GW2C_TicketCarResult_BackCalls.some(func=>{return func==callFunc;}))
                {
                    self.GW2C_TicketCarResult_BackCalls.push(callFunc);
                }
                sendMessage("msg.C2GW_TicketCar", msg.C2GW_TicketCar.encode({
                    parkingid: _parkingData.id,
                }));
            },null);
        }

        //收回
        public driveAway(cid:number|Long,parkingData:msg.IParkingData,callFunc:Function=null)
        {   
            //console.log("收回--------");
            let _parkingData :msg.IParkingData = parkingData;
            if(!parkingData) 
            {
                _parkingData = DataManager.playerModel.getMyCarPakingInfo(cid);
            }
            
            if(!_parkingData) return;
            let self = this;
            CommonDialog.getInstance().updateView("uiCarAltas_json.dialogBg","uiCarAltas_json.normalBtn","uiCarAltas_json.closeBtn");
            showDialog("是否收回在"+_parkingData.ownername+"的车?", "收回", function(){
                if(callFunc && !self.GW2C_TakeBackCarResult_BackCalls.some(func=>{return func==callFunc;}))
                {
                    self.GW2C_TakeBackCarResult_BackCalls.push(callFunc);
                }
                sendMessage("msg.C2GW_TakeBackCar", msg.C2GW_TakeBackCar.encode({
                    carid: cid,
                }));
            },null);
        }

        //请求我的停车位
        public ReqMyParkingInfo()
        {
            sendMessage("msg.C2GW_ReqCarInfo",msg.C2GW_ReqMyParkingInfo.encode({}));

        }

        //请求符合条件的车位列表 0 所有类型 1 公共车位 2 普通车位
        public ReqParkingInfoByType(infotype:number,uid:number|Long,callFunc:Function=null)
        {
            //console.log("ReqParkingInfoByType---->",infotype," ",uid);
            let callFuncData : CarFunData = new  CarFunData();
            callFuncData.uid   = uid;
            callFuncData.func  = callFunc;
            if(callFunc && !this.GW2C_ResParkingInfo_BackCalls.some(func=>{return func.uid==callFuncData.uid;}))
            {
                this.GW2C_ResParkingInfo_BackCalls.push(callFuncData);
            }
            sendMessage("msg.C2GW_ReqParkingInfoByType", msg.C2GW_ReqParkingInfoByType.encode({
               type : infotype,
               playerid : uid,
            }));
        }

        //收到符合条件的车位列表
        private OnGW2C_ResParkingInfo(msgs:msg.GW2C_ResParkingInfo)
        {
            //console.log("OnGW2C_ResParkingInfo----->",msgs.parkingdatas.length);
/*             msgs.parkingdatas.forEach(data=>{
                console.log("data-------------->",data.ownername,"   ",data.parkingcar);
            }) */
            let uid =  msgs.parkingdatas.length > 0 ? msgs.parkingdatas[0].ownerid : 0;

            for(let callFuncData of this.GW2C_ResParkingInfo_BackCalls)
            {
                if(callFuncData.uid==uid || uid==0)
                {
                   if( callFuncData.func){
                        callFuncData.func(msgs.parkingdatas);
                   }
                   this.GW2C_ResParkingInfo_BackCalls.splice(this.GW2C_ResParkingInfo_BackCalls.indexOf(callFuncData),1);
                   break;
                }
            }
            if(uid==0){
                console.warn("玩家没有停车位数据");
            }
        }

        //停车结果
        private OnGW2C_ParkCarResult(msgs:msg.GW2C_ParkCarResult)
        {
            //console.log("停车结果",msgs.result);
            this.GW2C_ParkCarResult_BackCalls.forEach(func=>{if(func){func(msgs.result)};});
            this.GW2C_ParkCarResult_BackCalls = [];
        }

        //收回结果
        private OnGW2C_TakeBackCarResult(msgs:msg.GW2C_TakeBackCarResult)
        {
            //console.log("收回结果",msgs.result+"  "+msgs.reward);
            this.GW2C_TakeBackCarResult_BackCalls.forEach(func=>{if(func){func(msgs.result,msgs.reward)};});
            this.GW2C_TakeBackCarResult_BackCalls = [];
        }
        
        //贴条结果
        private OnGW2C_TicketCarResult(msgs:msg.GW2C_TicketCarResult)
        {
            //console.log("贴条结果",msgs.result+"  "+msgs.reward);
            this.GW2C_TicketCarResult_BackCalls.forEach(func=>{if(func){func(msgs.result,msgs.reward)};});
            this.GW2C_TicketCarResult_BackCalls = [];
        }

        //---------
        public clearBackFunc_ResParkingInfo()
        {
            this.GW2C_ResParkingInfo_BackCalls = [];
        }
    }
}