/**
 * Created by sunboy on 2015/3/27.
 *
 * 物品信息
 */
module game {
    export class RoomTypeVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.tId != null) {
                this.tId = obj.tId;
            }
            if (obj.tName != null) {
                this.tName = obj.tName;
            }
            if (obj.tType != null) {
                this.tType = obj.tType;
            }
            if (obj.area != null) {
                this.area = obj.area;
            }
            if (obj.exRange != null) {
                this.exRange = obj.exRange;
            }
            if (obj.rImage != null) {
                this.rImage = obj.rImage;
            }
            if (obj.grabBuff != null) {
                this.grabBuff = obj.grabBuff;
            }
        }

        public tId: number = 1;

        public tName: string = '';
        
        public tType: number = 3;

        public area: number = 3;

        public exRange: number = 3;

        public rImage: string = "";

        public grabBuff: number = 3;
    }
}