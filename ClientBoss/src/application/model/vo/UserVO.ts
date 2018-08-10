/**
 * Created by sunboy on 2015/3/27.
 *
 * 用户信息
 */
module game {
    export class UserVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.gameId != null) {
                this.gameId = obj.gameId;
            }

            if (obj.nickname != null) {
                this.nickname = obj.nickname;
            }

            if (obj.sex != null) {
                this.sex = obj.sex;
            }

            if (obj.avatar != null) {
                this.avatar = obj.avatar;
            }

            if (obj.level != null) {
                this.level = obj.level;
            }

            if (obj.exp != null) {
                this.exp = obj.exp;
            }

            if (obj.gold1 != null) {
                this.gold1 = obj.gold1;
            }

            if (obj.gold2 != null) {
                this.gold2 = obj.gold2;
            }

            if (obj.gold3 != null) {
                this.gold3 = obj.gold3;
            }

            if (obj.lat != null) {
                this.lat = obj.lat;
            }

            if (obj.lng != null) {
                this.lng = obj.lng;
            }

            if (obj.vipLevel != null) {
                this.vipLevel = obj.vipLevel;
            }

            if (obj.vipExp != null) {
                this.vipExp = obj.vipExp;
            }

            if (obj.recharge != null) {
                this.recharge = obj.recharge;
            }

            if (obj.unionId != null) {
                this.unionId = obj.unionId;
            }

            if (obj.unionName != null) {
                this.unionName = obj.unionName;
            }

            if (obj.rId != null && obj.rId!="") {
                this.rId =[];
                let itemIdArr:string[]=obj.rId.split(',');
                if(itemIdArr){
                    for(let i:number=0;i<itemIdArr.length;i++){
                        this.rId.push(Number(itemIdArr[i]));
                    }
                }
            }

            if (obj.bId != null && obj.bId!="") {
                this.bId =[];
                let itemIdArr:string[]=obj.bId.split(',');
                if(itemIdArr){
                    for(let i:number=0;i<itemIdArr.length;i++){
                        this.bId.push(Number(itemIdArr[i]));
                    }
                }
            }

            if (obj.item != null) {
                this.item = obj.item;
            }

            if (obj.grabTime != null) {
                this.grabTime = obj.grabTime;
            }

            if (obj.grabLimit != null) {
                this.grabLimit = obj.grabLimit;
            }

            if (obj.helpTime != null) {
                this.item = obj.helpTime;
            }

            if (obj.helpLimit != null) {
                this.item = obj.helpLimit;
            }

        }

        public gameId: number = 1;

        public nickname: string = '';

        public sex: number = 3;

        public avatar: string = '';

        public level: number = 5;

        public exp: number = 6;

        public gold1: number = 7;

        public gold2: number = 8;

        public gold3: number = 9;

        public lat: number = 10;

        public lng: number = 11;

        public vipLevel: number = 12;

        public vipExp: number = 13;

        public recharge: number = 14;

        public unionId: number = 15;

        public unionName: string = '';

        public rId: number[] = [];

        public bId: number[] = [];

        public grabTime: number = 0;

        public grabLimit: number = 0;

        public helpTime: number = 0;

        public helpLimit: number = 0;

        public item: any = 18;


    }
}

