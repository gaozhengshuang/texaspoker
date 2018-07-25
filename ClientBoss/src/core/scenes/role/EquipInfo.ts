module game {
    export class EquipInfo extends eui.Component {

        img_star1       : eui.Image;
        img_star2       : eui.Image;
        img_star3       : eui.Image;
        img_star4       : eui.Image;
        img_star5       : eui.Image;
        txt_name        : eui.Label;
        totalAddition   : eui.Label;  

        public constructor() {
            super();
        }

        protected partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }


        protected childrenCreated(): void {
            super.childrenCreated();
        }

        public set stars(n: number) {
            for(let i = 1; i <=n; ++i) {
                this[`img_star${i}`].visible = true;
            }
        }
        public set equip_name(name:string) {
            this.txt_name && (this.txt_name.text = name);
        }
        
        public set skillAddition (des:string)
        {
            this.totalAddition.lineSpacing = 5;
            this.totalAddition.textFlow = (new egret.HtmlTextParser).parser(des);
        }
    }


    window["game.EquipInfo"] = game.EquipInfo;

}