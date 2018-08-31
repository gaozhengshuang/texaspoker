module game {
    export class MaidManager {
        static MAID_UPDATE = "MAID_UPDATE";
        static HOUSEMAID_UPDATE = "HOUSEMAID_UPDATE";

        public _curSelHouse: number;
        public _startHouse: number;

        private _personalImage: msg.IItemData[];
        private _houseMaidInfo: msg.GW2C_SendHouseMaidInfo;
        private _userMaidInfo: msg.GW2C_SendUserMaidInfo;
        private _mainMaidInfo: msg.IHouseMaidData;

        public init() {
            //添加系统消息监听
            NotificationCenter.addObserver(this, this.OnGW2C_SendUserMaidInfo, "msg.GW2C_SendUserMaidInfo");
            NotificationCenter.addObserver(this, this.OnGW2C_SendHouseMaidInfo, "msg.GW2C_SendHouseMaidInfo");
        }

        private OnGW2C_SendUserMaidInfo(data: msg.GW2C_SendUserMaidInfo) {
            this._userMaidInfo = data;

            for (let i=0; i<data.maids.length; i++) {
                if (DataManager.playerModel.getUserId() == data.maids[i].ownerid) {
                    this._personalImage = data.maids[i].clothes;
                    this._mainMaidInfo = data.maids[i];
                    break;
                }
            }

            NotificationCenter.postNotification(MaidManager.MAID_UPDATE);
        }

        private OnGW2C_SendHouseMaidInfo(data: msg.GW2C_SendHouseMaidInfo) {
            this._houseMaidInfo = data;
            
            NotificationCenter.postNotification(MaidManager.HOUSEMAID_UPDATE);
        }
        
        public getMaidInfo() {
            return this._mainMaidInfo;
        }

        public getHouseMaidInfo () {
            return this._houseMaidInfo;
        }

        private static _instance: MaidManager;
        public static getInstance(): MaidManager {
            if (!MaidManager._instance) {
                MaidManager._instance = new MaidManager();
            }
            return MaidManager._instance;
        }
    }

}