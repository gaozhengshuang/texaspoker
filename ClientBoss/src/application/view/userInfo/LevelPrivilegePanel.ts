module game {
    export class LevelPrivilegePanel extends eui.Component {

        private headImg: UserHeadImgPanel;

        private listGroup: eui.Group;
        private returnBtn: eui.Button;


        public constructor() {
            super();
            this.skinName = LevelPrivilegeSkin;
            this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
        }

        private onclick_cancel(){
            this.delPanel();

        }

        private levelItemList:utils.ScrollerPanel;
		private levelList:table.ITCharacterLevelDefine[]=[];
		private buildingId:number=0;
		public updateLevelList()
		{
			this.levelList=table.TCharacterLevel;
			if(this.levelItemList==null)
			{
				this.levelItemList=new utils.VScrollerPanel();
				this.listGroup.addChild(this.levelItemList);
				this.levelItemList.height=this.listGroup.height;
				this.levelItemList.x=0;
				this.levelItemList.y=0;
				this.levelItemList.initItemRenderer(LevelPrivilegeItemPanel);
			}
			this.levelItemList.bindData(this.levelList);			
		}

        public delPanel() {
            //this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_cancel,this);
            this.parent.removeChild(this);
        }
    }
}