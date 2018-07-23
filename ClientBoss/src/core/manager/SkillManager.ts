module game {
    
    export const enum SkillType {
        Penetration = 1,
        DoubleScore = 2,
        BigBoom = 3,
        BreakGoldGet =4,
        BadBuffDeltaTime = 5,
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

        public SkillAddition(type:SkillType) 
        {
            let data  = this._equipSkills.filter(item=>{return item && item.Type===type;})[0];
            switch(type)
            {
                case SkillType.Penetration      :  return 1 + data.Lv;
                case SkillType.DoubleScore      :  return data.Lv*100;
                case SkillType.BreakGoldGet     :  return 1 + data.Lv*0.1;
                case SkillType.BigBoom          :  return 1 - data.Lv*0.05;
                case SkillType.BadBuffDeltaTime :  return 1 + data.Lv*0.1;   
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