module game {
    export class LevelPrivilegeItemPanel extends eui.ItemRenderer  {

        private levelIcon: LevelIconPanel;
        private tili_txt: eui.Label;
        private house_txt: eui.Label;

        public constructor(data: any = null) {
            super();
            this.skinName = LevelPrivilegeItemSkin;
            
        }
       
        private itemDate:table.ITCharacterLevelDefine;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.levelIcon.update(this.itemDate.Id);
                this.tili_txt.text = "最大体力值上线:" + this.itemDate.StrengthValue;
                this.house_txt.text = "持有房数量上限:" + this.itemDate.HousesOwned;
                
            }
        }
        
    }
}