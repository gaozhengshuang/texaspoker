module game {
    export class ModifyAgePanel extends eui.Component {

        private cancel_btn:eui.Button;
        private ok_btn:eui.Button;

        private yearGroup1: DateScrollGroup;
		private moonGroup1: DateScrollGroup;
        private dateGroup1: DateScrollGroup;

        private pageView:PageUserInfoView;

        public constructor(view:PageUserInfoView) {
            super();
            this.pageView=view;
            this.skinName = ModifyAgeSkin;
            this.init();
        }
        public init(){
            this.yearGroup1=new DateScrollGroup(140,350,70,this);
            this.yearGroup1.x=112;
            this.yearGroup1.y=22;
            this.addChild(this.yearGroup1);
            this.moonGroup1=new DateScrollGroup(140,350,70,this);
            this.moonGroup1.x=340;
            this.moonGroup1.y=22;
            this.addChild(this.moonGroup1);
            this.dateGroup1=new DateScrollGroup(140,350,70,this);
            this.dateGroup1.x=524;
            this.dateGroup1.y=22;
            this.addChild(this.dateGroup1);
        }

        public update(index: number) {
            let list:any[]=[];
            for(let i:number=1900;i<=2049;i++){
                let item:any={
                    num:i,
                    type:1,
                    color:1
                }
                list.push(item);
            }
            this.yearGroup1.updateDateList(list);
        }
        public selectCallBack(back:any){
            
        }
        
        public delPanel(){
            
        }

    }
}