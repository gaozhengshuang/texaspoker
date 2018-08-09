/**
 * Created by sunboy on 2015/3/27.
 *
 * 出售房间信息
 */
module app {
    export class SellRoomVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.rId != null) {
                this.rId = obj.rId;
            }
            if (obj.tId != null) {
                this.tId = obj.tId;
            }
            if (obj.tType != null) {
                this.tType = obj.tType;
            }
            if (obj.bId != null) {
                this.bId = obj.bId;
            }
            if (obj.bName != null) {
                this.bName = obj.bName;
            }

            if (obj.houseNum != null) {
                this.houseNum = obj.houseNum;
            }

            if (obj.bArea != null) {
                this.bArea = obj.bArea;
            }

            if (obj.bImage != null) {
                this.bImage = obj.bImage;
            }
            

            if (obj.rUserId != null) {
                this.rUserId = obj.rUserId;
            }

            if (obj.rUserName != null) {
                this.rUserName = obj.rUserName;
            }

            if (obj.rUserHead != null) {
                this.rUserHead = obj.rUserHead;
            }

            if (obj.rUserNum != null) {
                this.rUserNum = obj.rUserNum;
            }

            if (obj.salePrice != null) {
                this.salePrice = obj.salePrice;
            }
            
            if (obj.bLatLng != null) {
                this.bLatLng =[];
                let latLngArr:string[]=obj.bLatLng.split('@');
                if(latLngArr){
                    for(let i:number=0;i<latLngArr.length;i++){
                        this.bLatLng.push(Number(latLngArr[i]));
                    }
                }
            }
            
        }
        public rId:number;

        public tId:number;

        public tType:number;

        public bId:number;

        public bName:string;

        public bImage:number;

        public houseNum:string;

        public bArea:string;

        public rUserName:string;

        public rUserHead:string;

        public rUserId:number;

        public rUserNum:number;

        public salePrice:number;

        public bLatLng:number[];
    }
}