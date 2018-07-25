module game {

    //暂定数值
    var SkillDataAdd = {
        PenetrationAdd:1,
        DoubleScoreAdd:1,
        BigBoomPercent:0.05,
        BreakGoldGetPercent:0.1,
        BadBuffDeltaTimeGetPercent:0.1,        
    };
    export const enum SkillType {
        Penetration = 1,        // 头部---- 贯穿弹
        DoubleScore = 2,        // 身体---- 双倍积分
        BigBoom = 3,            // 脚 ----  大招累计
        BreakGoldGet =4,        // 下身---- 击碎砖块获得金币
        BadBuffDeltaTime = 5,   // 手持---- 减益事件出现间隔
    }
    export class SkillData {
        public Type :   SkillType;
        public Lv   :   number;
    }    

    export class SkillManager {

        private _equipSkills : SkillData[];

        public init() {
            egret.log("------SkillDataManager Init------");
            this._equipSkills = [{Type:SkillType.Penetration,Lv:0},{Type:SkillType.DoubleScore,Lv:0},{Type:SkillType.BigBoom,Lv:0},{Type:SkillType.BreakGoldGet,Lv:0},{Type:SkillType.BadBuffDeltaTime,Lv:0}];
        }

        //装备
        public checkEquipSkill(ItemSoltSkill:SkillType,lv:number)
        {
            let data :SkillData =  new SkillData();
            data.Type =  ItemSoltSkill; data.Lv = lv;

            let haveEquipKSill = false;
            this._equipSkills.forEach(
                (item,index,array) =>
                {
                    if(item.Type===data.Type)
                    {
                        haveEquipKSill = true;
                        if(item.Lv!=data.Lv)
                        {
                            array[index] = data;
                            return;
                        }
                    }
                }
            );
            if(haveEquipKSill) return;
            this._equipSkills.push(data);
        }

        //装备后返回技能加成后的数值
        public SkillAddition(type:SkillType) 
        {
            let data  = this._equipSkills.filter(item=>{return item && item.Type===type;})[0];
            let _skillAdditionNum = this.getSkillAdditionNum(type,data.Lv);
            switch(type)
            {
                case SkillType.Penetration      :  return 1 + _skillAdditionNum;
                case SkillType.DoubleScore      :  return     _skillAdditionNum;
                case SkillType.BreakGoldGet     :  return 1 + _skillAdditionNum;
                case SkillType.BigBoom          :  return 1 - _skillAdditionNum;
                case SkillType.BadBuffDeltaTime :  return 1 + _skillAdditionNum;   
            }
        }

        //技能加成数值
        public getSkillAdditionNum(type:SkillType,lv:number)
        {        
            switch(type)
            {
                case SkillType.Penetration      :  return lv * SkillDataAdd.PenetrationAdd;
                case SkillType.DoubleScore      :  return lv * SkillDataAdd.DoubleScoreAdd;
                case SkillType.BreakGoldGet     :  return lv * SkillDataAdd.BreakGoldGetPercent;
                case SkillType.BigBoom          :  return lv * SkillDataAdd.BigBoomPercent;
                case SkillType.BadBuffDeltaTime :  return lv * SkillDataAdd.BadBuffDeltaTimeGetPercent;
            }
        }

        private static _instance: SkillManager;

        public static getInstance(): SkillManager {
            if (!SkillManager._instance) {
                SkillManager._instance = new SkillManager();
            }
            return SkillManager._instance;
        }
    }

}