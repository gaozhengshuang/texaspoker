module game {
    export class LookUserLevelPanel extends eui.Component {

        private headImg: UserHeadImgPanel;

        private houseMax_txt: eui.Label;
        private tiliMax_txt: eui.Label;
        private returnBtn: eui.Group;
        private knowGroup: eui.Group;
        


        private pageView: PageUserInfoView;
        private listPanel:LevelPrivilegePanel;

        public userInfo: IUserInfo = null;

        public constructor(view: PageUserInfoView) {
            super();
            this.pageView = view;
            this.skinName = LookUserLevelSkin;
            this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.knowGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_openList,this);
        }

        private onclick_cancel(){
            this.pageView.delPanelView();

        }
        private onclick_openList(){
            if(this.listPanel==null){
                this.listPanel=new LevelPrivilegePanel();
            }
            this.addChild(this.listPanel);
            this.listPanel.updateLevelList();
        }

        public update(info: IUserInfo) {
            this.userInfo = info;
            this.headImg.update(Number(this.userInfo.face));
            let levelObj: table.ITCharacterLevelDefine = table.TCharacterLevelById[this.userInfo.level];
            if (levelObj) {
                this.tiliMax_txt.text = "最大体力值上线:" + levelObj.StrengthValue;
                this.houseMax_txt.text = "持有房数量上限:" + levelObj.HousesOwned;
            }

        }

        public delPanel() {
            this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.knowGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_openList,this);
        }
    }
}