module game {
    export class ModifyPointViewPanel extends eui.Component {

        
        private nowPoint_txt: eui.Label;
        private cancel_btn: eui.Button;
        private save_btn: eui.Button;
        private filterPanel: CommonFilterPanel;


        private pageView: PageUserInfoView;
        public userInfo: IUserInfo = null;

        private baseprovince:number=0;
        private basecity:number=0;

        public constructor(view: PageUserInfoView) {
            super();
            this.pageView = view;
            this.skinName = ModifyPointViewSkin;
            this.filterPanel.jiage_txt.visible=false;
            this.filterPanel.priceGroup.visible=false;
            this.filterPanel.init(1, table.TCitys);
            this.filterPanel.addEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.save_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_save,this);
            
        }

        private onclick_cancel(){
            this.pageView.delPanelView();

        }
        private onclick_save(){
            if(this.baseprovince!=0 && this.basecity!=0 ){
                sendMessage("msg.C2GW_ReqSetBaseArea",msg.C2GW_ReqSetBaseArea.encode({province:this.baseprovince,city:this.basecity}));
                this.pageView.delPanelView();
            }
        }
        public update(info: IUserInfo) {
            this.userInfo=info;
            if (this.userInfo.baseprovince != 0 && this.userInfo.basecity != 0) {
                
                this.nowPoint_txt.text  = table.TCitysById[this.userInfo.baseprovince].Name +
                    "." + table.TCitysById[this.userInfo.basecity].Name;
            } else {
                this.nowPoint_txt.text = "";
            }
        }

        private select_begin(eve: BasicEvent) {
            if (this.filterPanel.viewType == 1 && this.filterPanel.selectCondition) {
                if (this.filterPanel.selectCondition.second) {
                    this.baseprovince=this.filterPanel.selectCondition.first.data.Id;
                    this.basecity=this.filterPanel.selectCondition.second.data.Id;
                }
            }
        }

        public delPanel() {
            this.filterPanel.removeEventListener(CommonFilterPanel.SELECT, this.select_begin, this);
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.save_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_save,this);
        }
    }
}