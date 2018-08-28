module game {
    export class NewHouseHuxingItemPanel extends eui.ItemRenderer {
        private huxingImg: eui.Image;

        private name_txt: eui.Label;
        private danjia_txt: eui.Label;
        private shouyi_txt: eui.Label;
        private zongjia_txt: eui.Label;
        private shengyu_txt: eui.Label;

        private buy_btn: eui.Button;
        private bg_mc: eui.Rect;

        public constructor(data: any = null) {
            super();
            this.skinName = NewHousehHuxingItemSkin;
            //this.adaptive();
            this.bg_mc.alpha = 0;
            this.touchChildren=false;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onclick_begin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onclick_begin, this);
            this.buy_btn.name = "buyBtn";

        }
        private onclick_begin(eve: egret.TouchEvent) {
            if (eve.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.bg_mc.alpha = 1;
            } else {
                this.bg_mc.alpha = 0;
            }

        }
        private adaptive() {
            //this.scaleX=GameConfig.innerScaleW;
            //this.scaleY=GameConfig.innerScaleW;
        }


        /*item.data = type;
          item.price = Number(strList[1]);
          item.area = Number(strList[2])
          item.count = count;*/
        private itemDate: any;
        protected dataChanged(): void {
            this.itemDate = this.data;
            if (this.itemDate) {
                this.name_txt.text = this.itemDate.data.Des+"("+this.itemDate.area+"平)";
                this.danjia_txt.text=this.itemDate.price+"金/平米";
                this.shouyi_txt.text=this.getTotalChanLiang()+"金";
                this.zongjia_txt.text=this.itemDate.price*this.itemDate.area+"金";
                this.shengyu_txt.text="剩余"+this.itemDate.count+"套";
                this.huxingImg.source=RES.getRes("huxing_"+this.itemDate.data.ImageId+"_s_png");
            }
        }
        private getTotalChanLiang(): number {
            let num: number = 0;
            if (this.itemDate.data) {
                let listStr:string=this.itemDate.data.Cells.split("-");
                if(listStr && listStr.length>0){
                    for (let i: number = 1; i <=listStr.length; i++) {
                    let type: any = table.THouseCellById[i*1000+1];
                    if (type) {
                        num += type.ProduceGold;
                    }
                }
                }
                
            }
            return num;
        }
    }
}