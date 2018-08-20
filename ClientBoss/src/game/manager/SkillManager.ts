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
        public num  :   number;
    }    

    export class SkillManager {

        private _equipSkills : SkillData[];

        constructor(){
            this.resetEquipSKill();
        }
        public resetEquipSKill()
        {
            this._equipSkills = [{Type:SkillType.Penetration,num:0},{Type:SkillType.DoubleScore,num:0},{Type:SkillType.BigBoom,num:0},{Type:SkillType.BreakGoldGet,num:0},{Type:SkillType.BadBuffDeltaTime,num:0}];          
        }
        //装备
        public checkEquipSkill(ItemSoltSkill:SkillType,num:number,numPer:number)
        {
            let data :SkillData =  new SkillData();
            data.Type =  ItemSoltSkill; data.num = num || (numPer*0.01);
            //console.log("装备技能数值----->",ItemSoltSkill,data.num);
            let haveEquipKSill = false;
            this._equipSkills.forEach(
                (item,index,array) =>
                {
                    if(item.Type===data.Type)
                    {
                        haveEquipKSill = true;
                        if(item.num!=data.num)
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
            switch(type)
            {
                case SkillType.Penetration      :  return 1 + data.num;
                case SkillType.DoubleScore      :  return     data.num; //积分固定加成数值
                case SkillType.BreakGoldGet     :  return 1 + data.num; 
                case SkillType.BigBoom          :  return 1 - data.num; 
                case SkillType.BadBuffDeltaTime :  return 1 + data.num;      
            }
        }

        //技能加成数值
        public getSkillAdditionNum(type:SkillType)
        {        
            let data  = this._equipSkills.filter(item=>{return item && item.Type===type;})[0];
            return data.num;
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