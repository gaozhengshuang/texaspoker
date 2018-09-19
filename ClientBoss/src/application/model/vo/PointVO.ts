/**
 * Created by sunboy on 2015/3/27.
 *
 * 坐标信息
 */
module game {
    export class PointVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
            //this.setObject(obj);
        }
        public setObject(obj: any): void {
            if (obj.lat != null) {
                this.lat = obj.lat;
            }

            if (obj.lng != null) {
                this.lng = obj.lng;
            }
        }

        public lat: number = 0;

        public lng: number = 0;
    
    }
}