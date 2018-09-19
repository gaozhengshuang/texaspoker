/**
 * Created by sunboy on 2015/3/27.
 *
 * 小游戏信息
 */
module game {
    export class SmallGameVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.sgId != null) {
                this.sgId = obj.sgId;
            }
            if (obj.sgName != null) {
                this.sgName = obj.sgName;
            }

            if (obj.sgType != null) {
                this.sgType = obj.sgType;
            }

            if (obj.sgIcon != null) {
                this.sgIcon = obj.sgIcon;
            }

            if (obj.sgUrl != null) {
                this.sgUrl = obj.sgUrl;
            }

        }

        public sgId: number = 1;

        public sgName: string = "2";

        public sgType: number = 2;

        public sgIcon: string = "3";

        public sgUrl: string = "4";

    }
}

