/**
 * Created by sunboy on 2015/3/27.
 *
 * 物品信息
 */
module app {
    export class MessageVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.mId != null) {
                this.mId = obj.mId;
            }
            if (obj.type != null) {
                this.type = obj.type;
            }
            if (obj.initiateId != null) {
                this.initiateId = obj.initiateId;
            }
            if (obj.receiveId != null) {
                this.receiveId = obj.receiveId;
            }
            if (obj.targetId != null) {
                this.targetId=[];
                let targetArr=obj.targetId.split(',');
                if(targetArr){
                    for(let i:number=0;i<targetArr.length;i++){
                        this.targetId.push(Number(targetArr[i]));
                    }
                }
            }
            if (obj.createTime != null) {
                this.createTime = obj.createTime;
            }
            if (obj.template != null) {
                this.template = obj.template;
            }
            if (obj.paramList != null && obj.paramList!="") {
                this.paramList=[];
                let paramArr=obj.paramList.split(',');
                if(paramArr){
                    for(let i:number=0;i<paramArr.length;i++){
                        this.paramList.push(String(paramArr[i]));
                    }
                }
            }

        }
        public mId: number = 1;

        public type: number = 2;

        public initiateId: number = 3;

        public receiveId: number = 4;

        public targetId: number[] = [];

        public createTime: number = 6;

        public template: string = '';

        public paramList: string[] = [];

    }
}