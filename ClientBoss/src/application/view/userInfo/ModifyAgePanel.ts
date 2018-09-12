module game {
    export class ModifyAgePanel extends eui.Component {

        private cancel_btn: eui.Button;
        private ok_btn: eui.Button;

        private yearGroup1: DateScrollGroup;
        private moonGroup1: DateScrollGroup;
        private dateGroup1: DateScrollGroup;

        private pageView: PageUserInfoView;
        private currentYear: number = 0;
        private currentMoon: number = 0;
        private currentDate: number = 0;

        public constructor(view: PageUserInfoView) {
            super();
            this.pageView = view;
            this.skinName = ModifyAgeSkin;
            this.bottom=0;
            this.init();
            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_ok,this);
        }
        private onclick_cancel(){
            this.pageView.delPanelView();
        }
        
        public init() {
            this.yearGroup1 = new DateScrollGroup(140, 350, 70, this);
            this.yearGroup1.x = 112;
            this.yearGroup1.y = 22;
            this.addChild(this.yearGroup1);
            this.initYearList();
            this.moonGroup1 = new DateScrollGroup(140, 350, 70, this);
            this.moonGroup1.x = 340;
            this.moonGroup1.y = 22;
            this.addChild(this.moonGroup1);
            this.initMoonList();
            this.dateGroup1 = new DateScrollGroup(140, 350, 70, this);
            this.dateGroup1.x = 524;
            this.dateGroup1.y = 22;
            this.addChild(this.dateGroup1);
        }

        public update(year: number, moon: number, date: number) {
            this.currentYear = year;
            this.currentMoon = moon;
            this.currentDate = date;
            this.yearGroup1.assignIndex(this.currentYear);
            this.moonGroup1.assignIndex(this.currentMoon);
            this.updateDateList(this.currentDate);

        }
        private yearList: any[] = [];
        private initYearList() {
            this.yearList = [];
            for (let i: number = 1900; i <= 2049; i++) {
                let item: any = {
                    num: i,
                    type: 1,
                    color: 1
                }
                this.yearList.push(item);
            }
            this.yearGroup1.updateDateList(this.yearList);
        }
        private moonList: any[] = [];
        private initMoonList() {
            this.moonList = [];
            for (let i: number = 1; i <= 12; i++) {
                let item: any = {
                    num: i,
                    type: 2,
                    color: 1
                }
                this.moonList.push(item);
            }
            this.moonGroup1.updateDateList(this.moonList);
        }
        private dataList: any[] = [];
        private updateDateList(date: number) {
            this.dataList=[];
            let dataNum: number = 30;
            if (this.currentMoon == 2) {
                dataNum = this.currentYear % 4 == 0 ? 29 : 28;
            } else if (this.currentMoon < 8) {
                dataNum = this.currentMoon % 2 == 0 ? 30 : 31;
            } else {
                dataNum = this.currentMoon % 2 == 0 ? 31 : 30;
            }
            for (let i: number = 1; i <= dataNum; i++) {
                let item: any = {
                    num: i,
                    type: 3,
                    color: 1
                }
                this.dataList.push(item);
            }
            this.dateGroup1.updateDateList(this.dataList);
            this.currentDate = date > dataNum ? dataNum : date;
            this.dateGroup1.assignIndex(this.currentDate);

            console.log(this.getAstro(12,19));
            console.log(this.getAge(1980,10,11));
        }
        public selectCallBack(back: any) {
            if (back) {
                switch (back.type) {
                    case 1:
                        this.currentYear = back.num;
                        this.updateDateList(this.currentDate);
                        back;
                    case 2:
                        this.currentMoon = back.num;
                        this.updateDateList(this.currentDate);
                        back;
                    case 3:
                        this.currentDate = back.num;
                        back;
                }
            }
        }
        private onclick_ok(){
            let age:number=this.getAge(this.currentYear,this.currentMoon,this.currentDate);
            if(age==-1){
                showTips("你穿越了！");
                return;
            }
            let astro:number=this.getAstro(this.currentMoon,this.currentDate);
            sendMessage("msg.C2GW_ReqSetUserAge",msg.C2GW_ReqSetUserAge.encode({age:age}));
            sendMessage("msg.C2GW_ReqSetUserConstellation",msg.C2GW_ReqSetUserConstellation.
            encode({constellation:astro}));
            this.pageView.delPanelView();
        }
        public delPanel() {
            this.yearGroup1.delPanel();
            this.moonGroup1.delPanel();
            this.dateGroup1.delPanel();
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.ok_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_ok,this);
        }

        /*根据出生日期算出年龄魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手*/
        public getAstro(month: number, day: number) {
            var s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
            var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
            let index:number=((month * 2 - (day < arr[month - 1] ? 2 : 0))/2+1);
            if(index==13){index=1;}

            return index;   //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
        }

        /*根据出生日期算出年龄*/
        public getAge(birthYear: number, birthMonth: number, birthDay: number): number {
            let returnAge;
            let nowDate = new Date();
            var nowYear = nowDate.getFullYear();
            var nowMonth = nowDate.getMonth() + 1;
            var nowDay = nowDate.getDate();

            if (nowYear == birthYear) {
                returnAge = 0;//同年 则为0岁
            } else {
                var ageDiff = nowYear - birthYear; //年之差
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay;//日之差
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        }
                        else {
                            returnAge = ageDiff;
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth;//月之差
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        }
                        else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return returnAge;//返回周岁年龄

        }
    }
}