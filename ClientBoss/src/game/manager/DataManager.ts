module game {
    export class DataManager {
        static playerModel: PlayerModel;
        
        public static init() {
            DataManager.playerModel = new PlayerModel();
            DataManager.playerModel.RegisterEvent();
            

            table.TBirckInfo = table.TBirckInfo.sort((s1: table.ITBirckInfoDefine, s2: table.ITBirckInfoDefine) => {
                let n1 = splitStringToNumberArray(s1.Info, "-");
                let n2 = splitStringToNumberArray(s2.Info, "-");
                return n1[2] - n2[2];
            })
        }

         /**
         * 资产是否足够
         */
        public static isAssetsEnough(type: msg.MoneyType, costs:number, id?:number, isShowAlert:boolean = true): boolean {
            if(costs == undefined)
            {
                Console.log("传入消耗数量不合法：", costs);
                return false;
            }
            switch (type) {
                case msg.MoneyType._Gold:
                    if(DataManager.playerModel.userInfo.gold >= costs)
                    {
                        return true;
                    }
                    if(isShowAlert)
                    {
                        showTips("金币不足！");
                    }
                    break;
                case msg.MoneyType._Diamond:
                    if(DataManager.playerModel.userInfo.diamond >= costs)
                    {
                        return true;
                    }
                    if(isShowAlert)
                    {
                        showTips("钻石不足！");
                    }
                    break;
                case msg.MoneyType._Strength:
                    if(DataManager.playerModel.userInfo.robcount >= costs)
                    {
                        return true;
                    }
                    if(isShowAlert)
                    {
                        showTips("体力不足！");
                    }
                    break;
                case msg.MoneyType._Item:
                     if(id > 0)
                     {
                       let num = DataManager.playerModel.getItemNum(id)
                       if(num >= costs)
                       {
                           return true;
                       }
                       if(isShowAlert)
                       {
                            let itemDef = table.ItemBaseDataById[id];
                            if(itemDef)
                            {
                              showTips(itemDef.Name + "不足！");
                            }
                            else
                            {
                              showTips("道具不足！");
                            }
                        }
                     }
                     else
                     {
                         Console.log("请传入合法的道具ID：", id);
                     }
                    break;
            }
            return false;
        }

    }
}