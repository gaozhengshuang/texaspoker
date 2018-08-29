module game {
    export class PlayerModel extends BaseModel {
        static MUSIC_CHANGE = "PlayerModel_MUSIC_CHANGE";
        static SOUND_CHANGE = "PlayerModel_SOUND_CHANGE";
        static SCORE_UPDATE = "PlayerModel_SCORE_UPDATE";
        static DIAMOND_UPDATE = "PlayerModel_DIAMOND_UPDATE";
        static ADD_OR_USE_GOLD = "PlayerModel_ADD_OR_USE_GOLD";
        static GOLD_NOT_ENOUGH = "PlayerModel_GOLD_NOT_ENOUGH";
        static PENETRATION_UPDATE = "PlayerModel_PENETRATION_UPDATE";
        static TOP_UPDATE = "PlayerModel_TOP_UPDATE";
        static BAG_UPDATE = "PlayerModel_BAG_UPDATE";
        static TASK_UPDATE = "PlayerModel_TASK_UPDATE";
        static SKILL_UPDATE = "PlayerModel_SKILL_UPDATE";
        static PLAYERMODEL_UPDATE = "PlayerModel_UPDATE"

        public penetration: number = 0;
        public userInfo: IUserInfo = { 
            face: "1", 
            name: "", 
            userid: 0, 
            rank: 0, 
            gold: 0, 
            diamond: 0, 
            openid: "", 
            addrlist: [], 
            level:1,
            newplayerstep:0,
            cardatas : [],
            parkingdatas : [],
            robcount:0,
            tmaddrobcount:0
        };
        public sex: number = 0;
        public bagList: Array<msg.IItemData> = [];
        public historyMoneyList: Array<msg.ILuckyDrawItem> = [];
        public totalMoney: number | Long = 0;
        private _tasks;
        private _houses;
        private _carRecords: string[] = [];
        private _personalImage: msg.IItemData[];
        private _houseMaidInfo: msg.GW2C_SendHouseMaidInfo;
        private _userMaidInfo: msg.GW2C_SendUserMaidInfo;
        private _mainMaidInfo: msg.IHouseMaidData;

        public RegisterEvent() {
            NotificationCenter.addObserver(this, this.OnGW2C_RetUserInfo, "msg.GW2C_SendUserInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_SendWechatInfo, "msg.GW2C_SendWechatInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateGold, "msg.GW2C_UpdateGold");
            NotificationCenter.addObserver(this, this.OnGW2C_UpdateDiamond, "msg.GW2C_UpdateDiamond");
            NotificationCenter.addObserver(this, this.OnGW2C_AddPackageItem, "msg.GW2C_AddPackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_RemovePackageItem, "msg.GW2C_RemovePackageItem");
            NotificationCenter.addObserver(this, this.OnGW2C_FreePresentNotify, "msg.GW2C_FreePresentNotify");
            NotificationCenter.addObserver(this, this.OnGW2C_SendLuckyDrawRecord, "msg.GW2C_SendLuckyDrawRecord");
            NotificationCenter.addObserver(this, this.OnGW2C_SendDeliveryAddressList, "msg.GW2C_SendDeliveryAddressList");
            NotificationCenter.addObserver(this, this.OnGW2C_SendTaskList, "msg.GW2C_SendTaskList");
            NotificationCenter.addObserver(this, this.OnGW2C_RetGoldExchange, "msg.GW2C_RetGoldExchange");
            NotificationCenter.addObserver(this, this.OnGW2C_ResCarInfo, "msg.GW2C_ResCarInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_SynParkingRecord, "msg.GW2C_SynParkingRecord");
            NotificationCenter.addObserver(this, this.OnGW2C_CarAutoBack, "msg.GW2C_CarAutoBack");
            NotificationCenter.addObserver(this, this.OnGW2C_SendUserMaidInfo, "msg.GW2C_SendUserMaidInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_SendHouseMaidInfo, "msg.GW2C_SendHouseMaidInfo");
        }

        private OnGW2C_RetUserInfo(data: msg.IGW2C_SendUserInfo) {
            this.userInfo.gold = data.base.gold;
            this.userInfo.diamond = data.base.diamond;
            this.userInfo.name = data.entity.name;
            this.userInfo.userid = data.entity.id;
            this.userInfo.openid = data.base.wechat.openid;
            this.userInfo.addrlist = data.base.addrlist;
            this.userInfo.level=data.base.level;
            this.userInfo.newplayerstep=data.base.newplayerstep;
            this.userInfo.robcount=data.base.robcount;
            this.userInfo.tmaddrobcount=Number(data.base.tmaddrobcount);

            GameConfig.newPlayerStep=this.userInfo.newplayerstep;
            this.sex = data.entity.sex;
            this.bagList = data.item.items;
            this.historyMoneyList = data.base.luckydraw.drawlist;
            this.totalMoney = data.base.luckydraw.totalvalue;
            this._tasks = data.base.task.tasks;
        }

        private OnGW2C_SendUserMaidInfo(data: msg.GW2C_SendUserMaidInfo) {
            this._userMaidInfo = data;

            for (let i=0; i<data.maids.length; i++) {
                if (this.userInfo.userid == data.maids[i].ownerid) {
                    this._personalImage = data.maids[i].clothes;
                    this._mainMaidInfo = data.maids[i];
                    break;
                }
            }
        }

        private OnGW2C_SendHouseMaidInfo(data: msg.GW2C_SendHouseMaidInfo) {
            this._houseMaidInfo = data;
        }

        private OnGW2C_ResCarInfo(data: msg.GW2C_ResCarInfo){
            this.userInfo.cardatas = data.cardatas;
            this.userInfo.parkingdatas = data.parkingdatas;
        }

        private OnGW2C_SynParkingRecord(msgs:msg.GW2C_SynParkingRecord)
        {
            this.setCarRecords(msgs.records);

            if (GameConfig.sceneType == 3) //资产主界面打开
             {  
                //车辆信息界面
                if( CarDetailView.getInstance())
                {
                    if( CarDetailView.getInstance().visible && CarDetailView.getInstance().Inited())
                    {   
                        //车辆信息界面刷新
                        if(msgs.records.some(str=>{return str.split("_"[0])[1] == msg.CarOperatorType.Ticket.toString();}))
                        {
                            CarManager.getInstance().ReqMyCarInfo(function(){
                                CarDetailView.getInstance().setData(DataManager.playerModel.getUserInfo().cardatas.filter(data=>{
                                    return data.id == CarDetailView.getInstance().carData.id;
                                })[0]);
                            });
                        }
                        //刷新动态列表
                        if(CarDetailView.getInstance().isDongTaiPanelView())
                        {
                            CarDetailView.getInstance().showDongtaiList();
                        }
                    }
                }
                //房屋信息界面
                if(GameRoomView.getInstance()) 
                {
                    //房屋信息界面刷新
                    if(GameRoomView.getInstance().visible && GameRoomView.getInstance().IsInMyRoom())
                    {
                        //if(msgs.records.some(str=>{return str.split("_"[0])[1] == msg.CarOperatorType.Ticket.toString();}))
                        {
                            ApplicationFacade.getInstance().sendNotification(CommandName.ROOM_PARKINGLOT_UPDATE);
                        }                        
                    }
                }

            }
         }
        private OnGW2C_CarAutoBack(msgs:msg.GW2C_CarAutoBack){
            console.log("公共车位收益满自动回收");
            if (GameConfig.sceneType == 3) //资产主界面打开
            {  
               //车辆信息界面
               if( CarDetailView.getInstance())
               {
                   if( CarDetailView.getInstance().visible && CarDetailView.getInstance().Inited())
                   {   
                       //车辆信息界面刷新
                       if(msgs.carid==CarDetailView.getInstance().getSelectCarID())
                       {
                           CarManager.getInstance().ReqMyCarInfo(function(){
                               CarDetailView.getInstance().setData(DataManager.playerModel.getUserInfo().cardatas.filter(data=>{
                                   return data.id == CarDetailView.getInstance().carData.id;
                               })[0]);
                           });
                       }
                   }
               }
               //刷新公共车位界面
               if(CarPublicParkingLotManager.getInstance().Inited())
               {
                    CarManager.getInstance().ReqMyCarInfo(
                        function(){
                            CarPublicParkingLotManager.getInstance().refreshData();
                            showTips("公共车位收益满已自动回收！");
                        }
                    );
               }
            }

        }
        private OnGW2C_SendTaskList(data: msg.IGW2C_SendTaskList) {
            this._tasks = data.tasks;
            this.postNotification(PlayerModel.TASK_UPDATE);
        }

        private OnGW2C_SendWechatInfo(data: msg.GW2C_SendWechatInfo) {
            this.userInfo.openid = data.openid;
        }

        private OnGW2C_UpdateGold(data: msg.GW2C_UpdateGold) {
            this.setScore(data.num);
        }

        private OnGW2C_UpdateDiamond(data: msg.GW2C_UpdateDiamond) {
            this.setDiamond(data.num);
        }

        private OnGW2C_AddPackageItem(data: msg.GW2C_AddPackageItem) {
            this.addBag(data.itemid, data.num);
            NotificationCenter.postNotification(PlayerModel.BAG_UPDATE);
        }

        private OnGW2C_RemovePackageItem(data: msg.GW2C_RemovePackageItem) {
            this.deleteBag(data.itemid, data.num);
            NotificationCenter.postNotification(PlayerModel.BAG_UPDATE);
        }

        private OnGW2C_FreePresentNotify(data: msg.GW2C_FreePresentNotify) {
            // LoginReward.getInstance().show();
        }

        private OnGW2C_SendLuckyDrawRecord(data: msg.GW2C_SendLuckyDrawRecord) {
            this.historyMoneyList = data.luckydraw.drawlist;
            this.totalMoney = data.luckydraw.totalvalue;
        }

        private OnGW2C_SendDeliveryAddressList(data: msg.GW2C_SendDeliveryAddressList) {
            this.userInfo.addrlist = data.list;
        }

        private OnGW2C_RetGoldExchange(data: msg.GW2C_RetGoldExchange) {
            this.addScore(data.gold);
        }
        
        public get clothes() {
            return this._personalImage;
        }

        public setScore(count: number) {
            this.userInfo.gold = count;
            NotificationCenter.postNotification(PlayerModel.SCORE_UPDATE);
            NotificationCenter.postNotification(PlayerModel.PLAYERMODEL_UPDATE);
        }

        public getScore() {
            return this.userInfo.gold;
        }

        public useScore(count: number) {
            this.userInfo.gold -= count;
            if (this.userInfo.gold < 0) {
                this.userInfo.gold = 0;
            }
            NotificationCenter.postNotification(PlayerModel.SCORE_UPDATE);
            NotificationCenter.postNotification(PlayerModel.PLAYERMODEL_UPDATE);
        }

        public addScore(count: number) {
            this.userInfo.gold += count;
            NotificationCenter.postNotification(PlayerModel.SCORE_UPDATE);
            NotificationCenter.postNotification(PlayerModel.PLAYERMODEL_UPDATE);
        }

        public setDiamond(count: number) {
            this.userInfo.diamond = count;
            NotificationCenter.postNotification(PlayerModel.DIAMOND_UPDATE);
            NotificationCenter.postNotification(PlayerModel.PLAYERMODEL_UPDATE);
        }

        public getDiamond() {
            return this.userInfo.diamond;
        }

        public addBag(itemId: number, itemNum: number) {
            let isPush = true;
            for (let i = 0; i < this.bagList.length; i++) {
                if (this.bagList[i].id == itemId) {
                    this.bagList[i].num += itemNum;
                    isPush = false;
                    break;
                }
            }

            if (isPush) {
                this.bagList.push({ id: itemId, num: itemNum });
            }
        }

        public deleteBag(itemId: number, itemNum: number) {
            for (let i = 0; i < this.bagList.length; i++) {
                if (this.bagList[i].id == itemId) {
                    this.bagList[i].num -= itemNum;

                    if (this.bagList[i].num <= 0) {
                        this.bagList.splice(i, 1);
                    }
                    break;
                }
            }
        }

        public getBag() {
            return this.bagList;
        }

        //获取背包中的物品
        public getBagItem(itemId: number) {
            this.bagList.forEach(item => {
                if (item.id === itemId) {
                    return item;
                }
            });
            return null;
        }
        
        //背包是否有这个物品
        public IsHaveItem(itemId: number) {
            return this.bagList.some(item => { return item.id === itemId; });
        }

        get musicState() {
            let r = egret.localStorage.getItem("music");
            if (!r) {
                egret.localStorage.setItem("music", "on");
                r = "on"
            }
            return r;
        }

        changeMusicState() {
            let r = egret.localStorage.getItem("music");
            if (r == "on") {
                r = "off";
                showTips(Lang.guanbiyinyue);
            } else {
                r = "on";
                showTips(Lang.dakaiyinyue);
            }
            egret.localStorage.setItem("music", r);
            this.postNotification(PlayerModel.MUSIC_CHANGE);
        }

        get soundState() {
            let r = egret.localStorage.getItem("sound");
            if (!r) {
                egret.localStorage.setItem("sound", "on");
                r = "on"
            }
            return r;
        }

        changeSoundState() {
            let r = egret.localStorage.getItem("sound");
            if (r != "on") {
                r = "on";
                showTips(Lang.dakaiyinxiao);
            } else {
                r = "off";
                showTips(Lang.guanbiyinxiao);
            }
            egret.localStorage.setItem("sound", r);
            this.postNotification(PlayerModel.SOUND_CHANGE);
        }

        public battleStart() {
            this.penetration = 0;
        }

        public async battleEnd(type: number = 1) {
            SoundManager.playEffect("jiesuan");
            let sendInfo: IUpdateScore = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid + "",
                score: this.getScore(),
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($uploadScore, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                let isTop = r.msg.userInfo.score == this.getScore();
                let winPanel = WinScene.getInstance();
                winPanel.setScore(isTop, this.getScore(), r.msg.ranklist);
                openPanel(PanelType.win);
            }
        }



        //-----------------------------------
        public skillUpdate() {
            let clothes = this.clothes;
            if (!clothes) return;
            SkillManager.getInstance().resetEquipSKill();
            clothes.forEach(
                itemData => {
                    let equipData = table.EquipById[itemData.id];
                    equipData.Skill.forEach(
                        skillId => {
                            let skillData = table.TSkillById[parseInt(skillId)];
                            SkillManager.getInstance().checkEquipSkill(skillData.Type, skillData.Num, skillData.NumPer);
                        }
                    );
                }
            );
        }
        public addPenetration(num: number) {
            this.penetration = num;
            this.postNotification(PlayerModel.PENETRATION_UPDATE);
        }

        public usePenetration(num: number) {
            this.penetration -= num;
            this.postNotification(PlayerModel.PENETRATION_UPDATE);
        }

        public async openRankPanel() {
            let sendInfo: IGetRankList = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid + "",
                start: 0,
                stop: 1,
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($getRankList, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                openPanel(PanelType.rank);
            }
        }

        public async requireRank(begin: number) {
            let sendInfo: IGetRankList = {
                face: this.userInfo.face,
                name: this.userInfo.name,
                openid: this.userInfo.userid + "",
                start: begin,
                stop: begin + 50,
                token: ""
            };
            let r: IHttpRetInfo = await SendHttp($getRankList, sendInfo);
            if (r) {
                this.updateUserInfo(r.msg.userInfo);
                NotificationCenter.postNotification("msg.GW2C_RetSort", r.msg.ranklist);
            }
        }

        private updateUserInfo(info: IRankInfo) {
            this.userInfo.userid = info.userid;
            this.userInfo.name = info.name;
            this.userInfo.face = info.face;
            this.userInfo.rank = info.rank;
            this.userInfo.gold = info.score;
            this.postNotification(PlayerModel.TOP_UPDATE);
        }

        public async getPlayerGoods() {
            let r = <string>await ajax(`${$goodsIp}${$goodsPath}`, { uid: this.getUserId(), state: 0, gameid: 10002 });
            let json = JSON.parse(r);
            if (json.code == 0 || json.msg == "操作成功") {
                return json.data;
            }
            return [];
        }

        public guideFinish() {
            if (egret.localStorage.getItem("guide")) {
                return true;
            } else {
                return false;
            }
        }

        public getUserInfo() {
            return this.userInfo;
        }

        public getUserId() {
            return this.userInfo.userid;
        }

        public setOpenId(openid: string) {
            this.userInfo.openid = openid;
        }

        public getOpenId() {
            return this.userInfo.openid;
        }
        
        public getHistoryMoney() {
            return this.historyMoneyList;
        }

        public getTotalMoney() {
            return this.totalMoney;
        }

        public getTask(taskId: number) {
            for (let t of this._tasks) {
                if (t.id == taskId) {
                    return t;
                }
            }
            return null;
        }

        public setHouse(house: msg.IHouseData[]) {
            this._houses = house;
        }

        public getHouse() {
            return this._houses;
        }

        public setCarRecords(datas: string[]) {
             datas.forEach(data=>{this._carRecords.push(data);});
        }

        public getCarRecords() {
            return this._carRecords;
        }

        //我的车辆是否停靠
        public getMyCarPakingInfo(id:number|Long)
        {
           let _parkingdatas = this.userInfo.parkingdatas.filter(data=>{return data.parkingcarownerid===this.userInfo.userid && data.parkingcar==id;});
           if(_parkingdatas.length==0) return null;
           if(_parkingdatas.length > 1) 
           {
               _parkingdatas.forEach(data=>{
                console.warn("相同的车辆ID",this.userInfo.userid,data.id,data.tid);
               }); 
           }
           return _parkingdatas[0]; 
        }

        public getMaidInfo() {
            return this._mainMaidInfo;
        }
    }
}