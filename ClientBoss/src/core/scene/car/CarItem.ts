module game {
    export class CarItem extends eui.ItemRenderer  {
        
        allGroup            : eui.Group;
        img_Icon            : eui.Image;
      
        img_gold            : eui.Image;
        img_diamond         : eui.Image;
  
        ItemName            : eui.Label;
        txt_price           : eui.Label;

        btn_select          : IconButton;
        btn_detail          : IconButton;

        private itemData    : table.ITCarDefine;
        private _select = false;

        public constructor() {
            super();
            this._select = false;
            this.skinName = CarItemSkin;
            this.btn_select.icon = this.btn_detail.icon = "shopItemButtonBg_png";
            this.btn_select.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnSelect,this);
            this.btn_detail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClickDetail,this);
         
        }
        protected dataChanged():void{
            //数据改变时，会自动调用 dataChanged 这个方法
            //console.log("dataChanged "+this.data.tid);
            this.setData(table.TCarById[this.data.tid]);
        }

        public setData(carItemData:table.ITCarDefine) {
            if(!carItemData) return;
            this.itemData = carItemData;
        
            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.path);
            let factor = 1;
            if(txtr)
            {
                this.img_Icon.source    = txtr;
                this.img_Icon.width     = txtr.textureWidth * factor;
                this.img_Icon.height    = txtr.textureHeight * factor;
            }
            
            //名字
            this.ItemName.textFlow = [
                { text: this.itemData.Brand+""+this.itemData.Model, style: { bold: true } },
                //{ text: `:${gold}`, style: { fontFamily: "DynoBold" } },
            ]

            //描述
    /*             let skillDes : egret.ITextElement[] = [];
            ShopItemData.Skill.forEach(
                (item,index,array)=>
                {
                    let skillData : table.ITSkillDefine = table.TSkillById[parseInt(item)];
                    if(skillData)
                    {
                        let nextStr =  index%2==1 ? "\n" : "  ";
                        let txt_element_des: egret.ITextElement =  {text: skillData.Des.split(";"[0])[0]+"  ", style: {"textColor": 0xffffff,"size": 18,"strokeColor": 0x7e97d9, "stroke": 2}};
                        let txt_element_num: egret.ITextElement =  {text: skillData.Des.split(";"[0])[1]+nextStr, style: {"textColor": 0xfcf505,"size": 18,"strokeColor": 0x7e97d9, "stroke": 2}};
                        skillDes.push(txt_element_des);
                        skillDes.push(txt_element_num);
                    }
                }
            ); 
            this.shopItemAddtion.lineSpacing = 5;
            this.shopItemAddtion.textFlow = <Array<egret.ITextElement>>skillDes; */
            //价格
            this.img_gold.visible  =  true;
            this.img_diamond.visible = false;
            this.txt_price.text = this.itemData.Price.toString();
        }

        public chooseAll(select:Boolean)
        {
            this._select = !select;
            this.OnSelect();    
        }
        private OnSelect()
        {
            this._select = !this._select;
            //this.img_shopItemSelect.visible  = this._select;
            //RoleDressShopCart.getInstance().OnChooseItem(this._select,this.itemData);
        }
        private OnClickDetail(){
            CarManager.getInstance().ReqMyCarInfo();
            openPanel(PanelType.carDetail);
            ApplicationFacade.getInstance().sendNotification(CommandName.REMOVE_POPUP);   
            GameConfig.showDownBtnFun(false);         
            CarDetailView.getInstance().setData(this.data);
        }
    }
}