module game {
    export class TweenSroller extends eui.Component  {
        
        downBtnGroup        : eui.Group;
        center              : eui.Group;
        hideList_btn        : eui.Button;
        
       
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
            this.oldY = this.center.y;
            this.oldH = this.center.height;
        }


        private showlist() {
            console.log("展示列表showlist----------->");
            if (this.btnGoalY == -1) {
                this.btnGoalY = 300/1280 * gameConfig.curHeight();
            }
			//console.log(this.goalH+"//"+this.goalY+"//"+GameConfig.innerHeight);

            if (this.center.y != this.btnGoalY) {
                this._tweenCompleted = false;
                egret.Tween.get(this.center).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, []);  
            }else{
                this.onComplete();
            }
        }
        private onComplete() {
            console.log ("onComplete");
            this._tweenCompleted = true;
            this.sr_item.height  -=  this.btnGoalY; 
            egret.Tween.removeTweens(this.center);
            this.bindData();
        }
        private bindData()
        {   
            if(!this.dataList) return;
            console.log("updateView---->",this.dataList.length);
            this._dataProv.removeAll();
            let self = this;
            this.dataList.forEach(data=>{self._dataProv.addItem(data)});

           // console.log("-------------->",this.ls_items.numChildren+" "+this.ls_items.numElements);
         }
        private hideList() {
            //scroller适配
            let self = this;
            self._tweenCompleted = false;
            self.sr_item.height  =  gameConfig.curHeight()* 0.79;
            egret.Tween.get(this.center).to({ y: this.oldY }, 300).call(function(){
                self._tweenCompleted = true;
            });
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