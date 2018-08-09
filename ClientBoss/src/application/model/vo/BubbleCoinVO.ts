/**
 * Created by sunboy on 2015/3/27.
 *
 * 物品信息
 */
module app {
    export class BubbleCoinVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.id != null) {
                this.id = obj.id;
            }
            if (obj.startCoin != null) {
                this.startCoin = obj.startCoin;
            }
            if (obj.endCoin != null) {
                this.endCoin = obj.endCoin;
            }
            if (obj.time != null) {
                this.time = obj.time;
            }
            if (obj.status != null) {
                this.status = obj.status;
            }
            if (obj.plunder != null) {
                this.plunder = obj.plunder;
            }
        }

        public id: number = 1;

        public startCoin: number = 0;
        
        public endCoin: number = 3;

        public time: number = 3;

        public status: number = 3;

        public plunder:number[] = [];
    }
}

/*[id:编号,startCoin:金币数,endCoin:剩下金币数
//time:可领取或可掠夺时间,status:状态(1:倒计时中,2:领取中,3:领完后),
//plunder:[掠夺人ID]]*/