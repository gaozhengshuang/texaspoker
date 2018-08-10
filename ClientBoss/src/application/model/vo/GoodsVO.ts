/**
 * Created by sunboy on 2015/3/27.
 *
 * 物品信息
 */
module game {
    export class GoodsVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.gId != null) {
                this.gId = obj.gId;
            }

            if (obj.gMode != null) {
                this.gMode = obj.gMode;
            }

            if (obj.status != null) {
                this.status = obj.status;
            }

            if (obj.ownerId != null) {
                this.ownerId = obj.ownerId;
            }

            if (obj.ownerType != null) {
                this.ownerType = obj.ownerType;
            }

            if (obj.startTime != null) {
                this.startTime = obj.startTime;
            }

            if (obj.endTime != null) {
                this.endTime = obj.endTime;
            }

            if (obj.complete != null) {
                this.complete = obj.complete;
            }

            if (obj.need != null) {
                this.need = obj.need;
            }

            if (obj.output != null) {
                this.output = obj.output;
            }

            if (obj.plunderList != null && obj.plunderList!="") {
                this.plunderList=[];
                let plunderArr=obj.plunderList.split(',');
                if(plunderArr){
                    for(let i:number=0;i<plunderArr.length;i++){
                        this.plunderList.push(Number(plunderArr[i]));
                    }
                }
            }

            if (obj.helpList != null && obj.helpList!="") {
                this.helpList=[];
                let helpArr=obj.helpList.split(',');
                if(helpArr){
                    for(let i:number=0;i<helpArr.length;i++){
                        this.helpList.push(Number(helpArr[i]));
                    }
                }
            }

        }

        public gId: number = 1;

        public gMode: number = 2;

        public status: number = 3;

        public ownerId: number = 4;

        public ownerType: number = 5;

        public startTime: number = 6;

        public endTime: number = 7;

        public complete: number = 8;
        
        public need: number = 9;

        public output:number=10;

        public plunderList:number[]=[];

        public helpList:number[]=[];

    }
}

