/**
 * Created by sunboy on 2015/3/27.
 *
 * 房间信息
 */
module game {
    export class RoomVO extends BaseVO {
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
            if (obj.status != null) {
                this.status = obj.status;
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

            if (obj.bImage != null) {
                this.bImage = obj.bImage;
            }
            if (obj.price != null) {
                this.price = obj.price;
            }

            if (obj.isReward != null) {
                this.isReward = obj.isReward;
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

            if (obj.salePrice != null) {
                this.salePrice = obj.salePrice;
            }
            
            if (obj.itemId != null) {
                this.goodsList =[];
                let itemIdArr:string[]=obj.itemId.split(',');
                if(itemIdArr){
                    for(let i:number=0;i<itemIdArr.length;i++){
                        this.goodsList.push(Number(itemIdArr[i]));
                    }
                }
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
            if (obj.rlog != null) {
                this.logList = obj.rlog;
            }


            if (obj.bubble != null && obj.bubble!="") {
                this.bubble =[];
                let itemIdArr:string[]=obj.bubble.split('$');
                if(itemIdArr){
                    for(let i:number=0;i<itemIdArr.length;i++){
                        let bubbleVo:BubbleCoinVO=new BubbleCoinVO();
                        bubbleVo.setObject(JSON.parse(itemIdArr[i]));
                        this.bubble.push(bubbleVo);
                    }
                }
            }
        }
        public rId:number;

        public tId:number;

        public status:number;

        public bId:number;

        public bName:string;

        public bImage:number;

        public price:number;

        public houseNum:string;

        public rUserName:string;

        public rUserHead:string;

        public rUserId:number;

        public isReward:boolean=false;

        public salePrice:number;

        public bubble:BubbleCoinVO[];

        public goodsList:number[];

        public logList:string;

        public bLatLng:number[];
    }
}