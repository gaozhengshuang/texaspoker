module game {
    export class TweenSroller extends eui.Component  {
        
        downBtnGroup        : eui.Group;
        center              : eui.Group;
        listGroup           : eui.Group;

        hideList_btn        : eui.Button;
        
        down_bg             : eui.Image;

        private oldY        : number = 0;
        private oldH        : number = 0;
        private oldBtnY     : number = 0;
        private listIndex   : number = 0;

        private goalY       : number = -1;
        private goalH       : number = -1;
        private btnGoalY    : number = -1;


        private _itemRenderer   : eui.ItemRenderer;
        public  carData         : msg.ICarData;
        private dataList        : any[] = [];

        sr_item                 : eui.Scroller;
        ls_items                : eui.List; 
        private _dataProv       : eui.ArrayCollection;
        private _tweenCompleted : Boolean = true;
        private _runingTimers = [];

        protected getSkinName() {
            return TweenScrollerSkin;
        }

        constructor(){
            super();
        }

        public setData(Datas:any[]) {
            if(!Datas) return;
            this.dataList = Datas;
            this.updateView();
        }
        private updateView()
        {          
            if(!this._tweenCompleted) return;
            this.hideList_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideList,this);                        
            this.hideList_btn.visible = false;
            this.listIndex = 0;
            this.initItemList();
            this.showlist();
            
        }

        public initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            //this.ls_items.itemRenderer = this._itemRenderer;
            this.ls_items.itemRenderer = CarPartPieceItem;
            
            //this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            this.oldY = this.listGroup.y;
            this.oldH = this.down_bg.height;
        }


        private showlist() {
            console.log("展示列表showlist----------->");
            let offsetY = 1280 - this.oldY;
            if (this.goalH == -1) {
                this.goalH = this.dataList.length * 150 + this.hideList_btn.height;//按钮贴边
            }
            if (this.btnGoalY == -1) {this.btnGoalY = this.oldY-this.goalH + offsetY}
			//console.log(this.goalH+"//"+this.goalY+"//"+GameConfig.innerHeight);

            if (this.listGroup.y != this.btnGoalY) {
                this._tweenCompleted = false;
                egret.Tween.get(this.listGroup).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, []);  
                egret.Tween.get(this.down_bg).to({ height: this.goalH}, 300);
            }else{
                this.onComplete();
            }
        }
        private onComplete() {
            console.log ("onComplete");
            this._tweenCompleted = true;
            this.hideList_btn.visible = true;
            //this.sr_item.height  -=  this.btnGoalY; 
            egret.Tween.removeTweens(this.listGroup);
            egret.Tween.removeTweens(this.down_bg);
            this.bindData();
        }
        private bindData()
        {   
            if(!this.dataList) return;
            console.log("updateView---->",this.dataList.length);
            this._dataProv.removeAll();
            let self = this;
            this.dataList.forEach(data=>{self._dataProv.addItem(data)});
            this.sr_item.height = this.dataList.length * 150;
           // console.log("-------------->",this.ls_items.numChildren+" "+this.ls_items.numElements);
         }
        private hideList() {
            //scroller适配
            let self = this;
            self._tweenCompleted = false;
            //self.sr_item.height  =  gameConfig.curHeight()* 0.79;
            egret.Tween.get(this.listGroup).to({ y: this.oldY }, 300).call(function(){
                self._tweenCompleted = true;
            });
            egret.Tween.get(this.down_bg).to({ height: this.oldH }, 300);
            this.visible = false;
        }

        public OnCloseHandle() {
        
            this.carData = null;
          
        }
        private OnDisableHandle(){

        }

/*         private onItemTouch(eve: eui.ItemTapEvent) {
            //console.log("onItemTouch------------->",this.listIndex)
            let item :any = null;
            switch (this.listIndex) {
                case 1:
                    item = this.dataList[eve.itemIndex];
                    if (item) {
                        if(item.ownerid==0){
                            openPanel(PanelType.carPublicLot);
                            //console.log(JSON.stringify(item.parkings));
                            CarPublicParkingLotManager.getInstance().UpdateData(item.parkings);
                            return;
                        }
                        this.OnDisableHandle();
                    }
                    break;
            }
        } */

    }
}