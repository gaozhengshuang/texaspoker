module game {
    export class CarPartInfoItem extends eui.Component  {
    
        center              : eui.Group;
        LvUp                : eui.Group;     
        partIcon            : eui.Image;
        partNameTxt         : eui.Label;
        lvUpBtn             : eui.Rect;
        expSlider           : SliderComponent;
        
        private itemData    : msg.ICarPartData;
      
        public constructor() {
            super();
            this.skinName = CarPartQiPaoSkin;
        }

        public setData(carPartData:msg.ICarPartData) {
            if(!carPartData) return;
            this.itemData = carPartData;

            this.LvUp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickLvUp,this);
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
            //let carPartLvUpData = table.TCarPartLevelupById[carPartData.partid];
            let _tablecarPartLvUpDatas : table.ITCarPartLevelupDefine[] =[];
            _tablecarPartLvUpDatas = table.TCarPartLevelup.filter(data=>{return data.Quality==carPartItemData.Quality && data.Level==carPartData.level});
            

            if(_tablecarPartLvUpDatas.length==0) return;
            if(_tablecarPartLvUpDatas.length>1)  console.warn("重复的升级表数据");
            this.expSlider.value  = carPartData.exp/_tablecarPartLvUpDatas[0].Exp;
        }

        private OnClickLvUp(){
            CarDetailView.getInstance().showPieceList(this.itemData.parttype);
        }
    }
}