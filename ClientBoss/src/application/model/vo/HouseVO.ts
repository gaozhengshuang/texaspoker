/**
 * Created by sunboy on 2015/3/27.
 *
 * 房屋信息
 */
module game {
    export class HouseVO extends BaseVO {
        public constructor(obj: any = null) {
            super(obj);
        }
        public setObject(obj: any): void {
            if (obj.id != null) {
                this.rId = obj.id;
            }
            if (obj.tid != null) {
                this.tId = obj.tid;
            }
            if (obj.buildingid != null) {
                this.bId = obj.buildingid;
            }
            if (obj.level != null) {
                this.level = obj.level;
            }
            if (obj.ownerid != null) {
                this.ownerid = obj.ownerid;
            }
            if (obj.ownername != null) {
                this.ownername = obj.ownername;
            }

            if (obj.housecells != null) {
                this.housecells = obj.housecells;
            }

            if (obj.visitinfo != null) {
                this.visitinfo = obj.visitinfo;
            }

            if (obj.empty != null) {
                this.empty = obj.empty;
            }

            if (obj.robcheckflag != null) {
                this.robcheckflag = obj.robcheckflag;
            }

            if (obj.myCarPark != null) {
                this.myCarPark = obj.myCarPark;
            }

            if(obj.parkings!=null){
                this.parkings = obj.parkings;
            }
            
        }
        public rId:number;

        public tId:number;

        public ownerid:number;

        public ownername:string = ""; //主人的名字

        public bId:number = 0; //所在楼房的id  新手所租房为虚拟的所在楼房id为0

        public level:number = 0; //房屋等级

        public empty : number = 0;  

        public housecells:any[] = []; //每个房间信息 

        public visitinfo:any[] = []; //操作记录 要限定条数 
	
        public robcheckflag : number = 0;  //标记是否被抢过钱 有人抢置1 客户端查看过之后置0

        public isHave:boolean=false;

        public myCarPark : number = 0;//是否有我的车停
    
        public parkings : msg.IParkingData[] = [];//房间的车位信息列表
        
    }
}

	