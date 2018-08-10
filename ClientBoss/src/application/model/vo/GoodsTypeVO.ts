/**
 * Created by sunboy on 2015/3/27.
 *
 * 物品信息
 */
module game {
    export class GoodsTypeVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.iId != null) {
                this.iId = obj.iId;
            }

            if (obj.iName != null) {
                this.iName = obj.iName;
            }

            if (obj.iImage1 != null) {
                this.iImage1 = obj.iImage1;
            }

            if (obj.iImage2 != null) {
                this.iImage2 = obj.iImage2;
            }

            if (obj.iType != null) {
                this.iType = obj.iType;
            }

            if (obj.iRobType != null) {
                this.iRobType = obj.iRobType;
            }

            if (obj.quality != null) {
                this.quality = obj.quality;
            }

            if (obj.iCaption != null) {
                this.iCaption = obj.iCaption;
            }

            if (obj.iNeed != null) {
                this.iNeed = obj.iNeed;
            }

            if (obj.iUrl != null) {
                this.iUrl = obj.iUrl;
            }

            if (obj.iItemId != null) {
                this.iItemId = obj.iItemId;
            }

            if (obj.iItemCd != null) {
                this.iItemCd = obj.iItemCd;
            }
            if (obj.output != null) {
                this.output = obj.output;
            }
        }

        public iId: number = 1;

        public iName: string = '';

        public iImage1: string = '';

        public iImage2: string = '';
        
        public iType: number = 3;

        public iRobType: number = 3;

        public quality: number = 4;

        public iCaption:string = '';

        public iItemCd:number = 0;

        public iNeed: number = 0;

        public iUrl: string = '';

        public iItemId: number[] = null;

        public output: number = 0;

    }
}