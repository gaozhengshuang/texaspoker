module game {
    export function getCarName(carTid:number,str ="")
    {
        let cardef :table.ITCarDefine = table.TCarById[carTid];
        if(cardef){
            let brand =  table.TCarBrandById[cardef.Brand];
            let model =  table.TCarModelById[cardef.Model];
            if(brand && model){
                return brand.Brand+str+model.Model;
            }
        }
        return "";
    }
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
        private GW2C_ResCarInfo_BackCalls               : Function[];
        private GW2C_ParkCarResult_BackCalls            : Function[];
        private GW2C_TakeBackCarResult_BackCalls        : Function[];
        private GW2C_TicketCarResult_BackCalls          : Function[]; 
        private GW2C_SendCarShopInfo_BackCalls          : Function[]; 
        private GW2C_UpdateCarShopProduct_BackCalls     : Function[];
        private GW2C_RetTakeCarAutoBackReward_BackCalls : Function[];
        private GW2C_RetCarPartLevelup_BackCalls        : Function[];
        private GW2C_RetCarStarup_BackCalls        : Function[];

        private GW2C_ResParkingInfo_BackCalls           : CarFunData[];
        private GW2C_AckOtherUserHouseData_BackCalls    : CarFunData[];
        
        public constructor()
        {
            NotificationCenter.addObserver(this, this.OnGW2C_ResCarInfo, "msg.GW2C_ResCarInfo");
            
            NotificationCenter.addObserver(this, this.OnGW2C_ParkCarResult, "msg.GW2C_ParkCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TakeBackCarResult, "msg.GW2C_TakeBackCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_TicketCarResult, "msg.GW2C_TicketCarResult");
            NotificationCenter.addObserver(this, this.OnGW2C_ResParkingInfo, "msg.GW2C_ResParkingInfo");
            //NotificationCenter.addObserver(this, this.OnGW2C_AckOtherUserHouseData, "msg.GW2C_AckOtherUserHouseData");
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateCarShopProduct, "msg.GW2C_UpdateCarShopProduct");
            NotificationCenter.addObserver(this, this.OnGW2C_SendCarShopInfo, "msg.GW2C_SendCarShopInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_RetTakeCarAutoBackReward, "msg.GW2C_RetTakeCarAutoBackReward");
            NotificationCenter.addObserver(this, this.OnGW2C_RetCarPartLevelup, "msg.GW2C_RetCarPartLevelup");
            NotificationCenter.addObserver(this, this.OnGW2C_RetCarStarup, "msg.GW2C_RetCarStarup");
            

        
            this.GW2C_ResCarInfo_BackCalls               = [];
            this.GW2C_ResParkingInfo_BackCalls           = [];
            this.GW2C_ParkCarResult_BackCalls            = [];
            this.GW2C_TakeBackCarResult_BackCalls        = [];
            this.GW2C_TicketCarResult_BackCalls          = [];
            this.GW2C_SendCarShopInfo_BackCalls          = [];
            this.GW2C_UpdateCarShopProduct_BackCalls     = [];
            this.GW2C_RetTakeCarAutoBackReward_BackCalls = [];
            this.GW2C_RetCarPartLevelup_BackCalls        = [];
            this.GW2C_RetCarStarup_BackCalls             = [];
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
            showDialog("是否在"+ (_parkingData.ownerid&&_parkingData.ownername+"的车位"||"公共车位") +"停车?", "停车", function(){
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
        public ReqParkingInfoByType(infotype:number,uid:number|Long,houseIds:(number|Long)[]=[],callFunc:Function=null)
        {
            console.log("ReqParkingInfoByType---->",infotype," ",uid);
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
               houseids : houseIds
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
                console.warn("请求的是公共车位或者玩家没有停车位数据");
            }
        }

        //请求车停的房屋信息
        public ReqCarParkingHouseData (uid:number|Long,callFunc:Function)
        {
            let callFuncData : CarFunData = new  CarFunData();
            callFuncData.uid   = uid;
            callFuncData.func  = callFunc;
        
            if(callFunc && !this.GW2C_AckOtherUserHouseData_BackCalls.some(func=>{return func.uid==callFuncData.uid;}))
            {
                this.GW2C_AckOtherUserHouseData_BackCalls.push(callFuncData);
            }
            sendMessage("msg.C2GW_ReqOtherUserHouseData", msg.C2GW_ReqOtherUserHouseData.encode({
                userid : uid,
             }));
        }
        private OnGW2C_AckOtherUserHouseData(msgs:msg.GW2C_AckOtherUserHouseData)
        {
            console.log("OnGW2C_AckOtherUserHouseData----->",msgs.datas.length);
            let uid = msgs.datas.length > 0 ? msgs.datas[0].ownerid : 0;

            for(let callFuncData of this.GW2C_AckOtherUserHouseData_BackCalls)
            {
                if(callFuncData.uid==uid || uid==0)
                {
                   if( callFuncData.func){
                        callFuncData.func(msgs.datas);
                   }
                   this.GW2C_AckOtherUserHouseData_BackCalls.splice(this.GW2C_AckOtherUserHouseData_BackCalls.indexOf(callFuncData),1);
                   break;
                }
            }
            if(uid==0){
                console.warn("玩家没有对应的房屋数据");
            }
        }


        //请求商店列表
        public ReqCarShopInfo(shopId:number=1,callFunc:Function=null)
        {
            if(callFunc && !this.GW2C_SendCarShopInfo_BackCalls.some(func=>{return func==callFunc;}))
            {
                this.GW2C_SendCarShopInfo_BackCalls.push(callFunc);
            }
            sendMessage("msg.C2GW_ReqCarShopInfo", msg.C2GW_ReqCarShopInfo.encode({
                shopid : shopId,
             }));
        }

        private OnGW2C_SendCarShopInfo(msgs:msg.GW2C_SendCarShopInfo)
        {   
            console.log("OnGW2C_SendCarShopInfo--->",msgs.products.length+" "+JSON.stringify(msgs.products));
            this.GW2C_SendCarShopInfo_BackCalls.forEach(func=>{if(func){func(msgs.products)};});
            this.GW2C_SendCarShopInfo_BackCalls = [];

            if(CarShop._instance && CarShop.getInstance().visible &&CarShop.getInstance().Inited()){
                CarShop.getInstance().UpdateData(msgs.products);
            }
        }

        //请求购买汽车
        public ReqBuyCarShopItem(shopId:number=1,pid:number,callFunc:Function=null)
        {
            let carShopData = table.TCarShopById[pid];
            if(DataManager.playerModel.getUserInfo().gold < carShopData.Price){
                showTips("金币不足！");
                return;
            }
            if(callFunc && !this.GW2C_UpdateCarShopProduct_BackCalls.some(func=>{return func==callFunc;}))
            {
                this.GW2C_UpdateCarShopProduct_BackCalls.push(callFunc);
            }
            sendMessage("msg.C2GW_BuyCarFromShop", msg.C2GW_BuyCarFromShop.encode({
                shopid : shopId,
                pid    : pid,
             }));
        }

        //刷新单个车辆商品信息
        private OnGW2C_UpdateCarShopProduct(msgs:msg.GW2C_UpdateCarShopProduct)
        {
            console.log("OnGW2C_UpdateCarShopProduct--->",msgs.product+" "+JSON.stringify(msgs.product));
            this.GW2C_UpdateCarShopProduct_BackCalls.forEach(func=>{if(func){func(msgs.product)};});
            this.GW2C_UpdateCarShopProduct_BackCalls = [];

        }

        //请求领取公共车位收益
        public ReqTakeCarReward(carId:number|Long,callFunc:Function=null)
        {
            if(callFunc && !this.GW2C_RetTakeCarAutoBackReward_BackCalls.some(func=>{return func==callFunc;}))
            {
                this.GW2C_RetTakeCarAutoBackReward_BackCalls.push(callFunc);
            }
            sendMessage("msg.C2GW_ReqTakeCarAutoBackReward", msg.C2GW_ReqTakeCarAutoBackReward.encode({
                carid : carId,
             }));
        }

        public OnGW2C_RetTakeCarAutoBackReward(msgs:msg.GW2C_RetTakeCarAutoBackReward)
        {
            this.GW2C_RetTakeCarAutoBackReward_BackCalls.forEach(func=>{if(func){func(msgs.result,msgs.reward)};});
            this.GW2C_RetTakeCarAutoBackReward_BackCalls = [];
        }

        //请求升级部件
        public ReqCarPartLevelup(carId:number|Long,partType:msg.CarPartType,pieces:msg.ICarPartPiece[],callFunc:Function=null)
        {
            if(callFunc && !this.GW2C_RetCarPartLevelup_BackCalls.some(func=>{return func==callFunc;}))
            {
                this.GW2C_RetCarPartLevelup_BackCalls.push(callFunc);
            }
            sendMessage("msg.C2GW_CarPartLevelup", msg.C2GW_CarPartLevelup.encode({
               carid : carId,
               parttype:partType,
               pieces:pieces,
            }));
        }
        //部件升级结果
        private OnGW2C_RetCarPartLevelup(msgs:msg.GW2C_RetCarPartLevelup)
        {
            this.GW2C_RetCarPartLevelup_BackCalls.forEach(func=>{if(func){func(msgs.result,msgs.car)};});
            this.GW2C_RetCarPartLevelup_BackCalls = [];
        }

        //请求汽车升星
        public ReqCarStarUp(carId:number|Long,gold:number,callFunc:Function=null)
        {
            CommonDialog.getInstance().updateView("uiCarAltas_json.dialogBg","uiCarAltas_json.normalBtn","uiCarAltas_json.closeBtn");
            let self = this;
            showDialog("是否花费"+gold+"金币升星?", "确定", function(){
                if(DataManager.playerModel.getUserInfo().gold < gold){
                    showTips("金币不足！");
                }else{
                    if(callFunc && !self.GW2C_RetCarStarup_BackCalls.some(func=>{return func==callFunc;}))
                    {
                        self.GW2C_RetCarStarup_BackCalls.push(callFunc);
                    }
                    sendMessage("msg.C2GW_CarStarup", msg.C2GW_CarStarup.encode({
                        carid : carId,
                    }));
                }
            },null);
        }

        //车辆升星结果
        private OnGW2C_RetCarStarup(msgs:msg.GW2C_RetCarStarup){
            this.GW2C_RetCarStarup_BackCalls.forEach(func=>{if(func){func(msgs.result,msgs.car)};});
            this.GW2C_RetCarStarup_BackCalls = [];
        }

        //-------------------抢车位返回----------
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