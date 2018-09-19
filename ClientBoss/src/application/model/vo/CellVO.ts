/**
 * Created by sunboy on 2015/3/27.
 *
 * 房间信息
 */
module game {
    export class CellVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.id != null) {
                this.rId = obj.id;
            }
            if (obj.tId != null) {
                this.tId = obj.tId;
            }
            if (obj.buildingid != null) {
                this.bId = obj.buildingid;
            }
            if (obj.level != null) {
                this.level = obj.level;
            }
            if (obj.ownerid != null) {
                this.ownerid = obj.ownerid;
            }
            if (obj.wnername != null) {
                this.wnername = obj.wnername;
            }

            if (obj.housecells != null) {
                this.housecells = obj.housecells;
            }

            if (obj.visitinfo != null) {
                this.visitinfo = obj.visitinfo;
            }

        }
        public rId:number;

        public tId:number;

        public ownerid:number;

        public wnername = 8; //主人的名字

        public bId = 4; //所在楼房的id  新手所租房为虚拟的所在楼房id为0

        public level = 5; //房屋等级

        public housecells:any[] = []; //每个房间信息 

        public visitinfo:any[] = []; //操作记录 要限定条数 
	

        

        

        
    }
}

	