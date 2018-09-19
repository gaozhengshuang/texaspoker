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

            if(obj.roommember!=null){
                this.roommember = obj.roommember;
            }
            if(obj.ownersex!=null){
                this.ownersex = obj.ownersex;
            }
            if(obj.ownerlevel!=null){
                this.ownerlevel = obj.ownerlevel;
            }
            if(obj.ownerface!=null){
                this.ownerface = obj.ownerface;
            }
            if(obj.issell!=null){
                this.issell = obj.issell;
            }
        }
        public rId:number=0;

        public tId:number=0;

        public bId:number = 0; //所在楼房的id  新手所租房为虚拟的所在楼房id为0

        public ownerid:number=0;

        public ownername:string = ""; //主人的名字

        public level:number = 0; //房屋等级

        public empty : number = 0;  

        public housecells:any[] = []; //每个房间信息 

        public visitinfo:any[] = []; //操作记录 要限定条数 
	
        public robcheckflag : number = 0;  //标记是否被抢过钱 有人抢置1 客户端查看过之后置0

        public isHave:boolean=false;

        public myCarPark : number = 0;//是否有我的车停
    
        public parkings : msg.IParkingData[] = [];//房间的车位信息列表

        public roommember:number=0;//房间号

        public ownersex: number = 20; //主人性别

        public ownerlevel: number = 21; //主人等级

        public ownerface: string = "22"; //主人头像

        public issell: boolean=false;//是否出售中
        
    }
}

	