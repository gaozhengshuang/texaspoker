module game {
    export class CarPartInfoItem extends eui.Component  {
    
        LvUp                : eui.Group;     
        partIcon            : eui.Image;
        partNameTxt         : eui.Label;
        expSlider           : SliderComponent;

        private itemData    : msg.ICarPartData;
      

        public constructor() {
            super();
            this.skinName = CarPartQiPaoSkin;
            this.LvUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickLvUp,this);
        }

        public setData(carPartData:msg.ICarPartData) {
            if(!carPartData) return;
            this.itemData = carPartData;
            
            let carPartItemData = table.TCarPartById[carPartData.partid];
            if(!carPartItemData) return;
            //Icon
/*             let txtr:egret.Texture = RES.getRes(carPartItemData.path);
            let factor = 1;
            if(txtr)
            {
                this.partIcon.source    = txtr;
                this.partIcon.width     = txtr.textureWidth * factor;
                this.partIcon.height    = txtr.textureHeight * factor;
            } */
            
            //名字、状态
            
            let nameStr = "";
            switch (carPartData.parttype) {
                case msg.CarPartType.Tyre:  nameStr = "轮胎";   break;
                case msg.CarPartType.Tank:  nameStr = "油箱";   break;
                case msg.CarPartType.Trunk:  nameStr = "后备箱"; break;
                case msg.CarPartType.Engine:  nameStr = "发动机"; break;
                case msg.CarPartType.Battery:  nameStr = "电瓶";   break; 
            }

            this.partNameTxt.textFlow = [
                { text: nameStr+":LV."+carPartData.level, style: { bold: true } },
            ]
            //经验
            let carPartLvUpData = table.TCarPartLevelupById[carPartData.partid];
            if(!carPartLvUpData) return;
            this.expSlider.value  = carPartData.exp/carPartLvUpData.Exp;
        }

        private OnClickLvUp(){
            CarDetailView.getInstance().showPieceList(this.itemData.parttype);
        }
    }
}