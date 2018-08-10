/**
 * Created by sunboy on 2015/3/27.
 *
 * 建筑信息
 */
module game {
    export class BuildingVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.bId != null) {
                this.bId = obj.bId;
            }

            if (obj.bName != null) {
                this.bName = obj.bName;
            }

            if (obj.ownerId != null) {
                this.ownerId = obj.ownerId;
            }

            if (obj.bImage1 != null) {
                this.bImage1 = obj.bImage1;
            }

            if (obj.bImage2 != null) {
                this.bImage2 = obj.bImage2;
            }

            if (obj.level != null) {
                this.level = obj.level;
            }

            if (obj.unitPrice != null) {
                this.unitPrice = obj.unitPrice;
            }

            if (obj.roomType != null && obj.roomType != '') {
                this.roomType=[];
                let roomTypeArr:string[]=obj.roomType.split('$');
                if(roomTypeArr){
                    for(let i:number=0;i<roomTypeArr.length;i++){
                        let itemArr:string[]=roomTypeArr[i].split(',')
                        if(itemArr && itemArr.length>=2){
                            let typeObj:any={
                                tId:Number(itemArr[0]),
                                num:Number(itemArr[1])
                            }
                            this.roomType.push(typeObj);
                        }
                    }
                }
            }

            if (obj.memberId != null && obj.memberId!="") {
                this.memberId=[];
                let memberIdArr=obj.memberId.split('$');
                if(memberIdArr){
                    for(let i:number=0;i<memberIdArr.length;i++){
                        let itemArr:string[]=memberIdArr[i].split(',')
                        let roomItemArr:number[]=[];
                        if(itemArr && itemArr.length>0){
                            for(let k:number=0;k<itemArr.length;k++){
                                if(Number(itemArr[k])>0){
                                    roomItemArr.push(Number(itemArr[k]));
                                }
                            }
                        }
                        this.memberId.push(roomItemArr);
                    }
                }
            }
            if (obj.lat != null) {
                this.lat = obj.lat;
            }
            if (obj.lng != null) {
                this.lng = obj.lng;
            }

        }

        public bId: number = 1;

        public bName: string = "";
        
        public bImage1:number=0;

        public bImage2:number=0;

        public ownerId:number=0;

        public level:number=1;

        public unitPrice:number=0;

        public roomType:any[]=[];

        public memberId:any[]=[];

        public lat:number=null;

        public lng:number=null;

        public liveLimit:number=100;
    }
}