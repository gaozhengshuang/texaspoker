module game {
    export class ModifySexPanel extends eui.Component {

        private titleRadio1: eui.RadioButton;
		private titleRadio2: eui.RadioButton;
        private radioGroup: eui.RadioButtonGroup;


        private pageView:PageUserInfoView;
        public sexIndex: number = 1;

        public constructor(view:PageUserInfoView) {
            super();
            this.pageView=view;
            this.skinName = ModifySexSkin;

            this.radioGroup = this.titleRadio1.group;
			this.radioGroup.addEventListener(egret.Event.CHANGE, this.onChangeSex, this);
			this.radioGroup.selectedValue = this.titleRadio1.value;
			this.sexIndex = this.radioGroup.selectedValue;
            
        }
        private onChangeSex(e: egret.Event) {
			var rbGroup: eui.RadioButtonGroup = e.target;
            if(rbGroup.selectedValue!=this.sexIndex){
                this.sexIndex = rbGroup.selectedValue;
                sendMessage("msg.C2GW_ReqSetUserSex",msg.C2GW_ReqSetUserSex.encode({sex:this.sexIndex}));
            }
            this.pageView.delPanelView();
		}
        public update(index: number) {
            this.sexIndex = index;
            this.radioGroup.selectedValue=this.sexIndex;
        }
        
        public delPanel(){
            this.radioGroup.removeEventListener(egret.Event.CHANGE, this.onChangeSex, this);
        }
    }
}