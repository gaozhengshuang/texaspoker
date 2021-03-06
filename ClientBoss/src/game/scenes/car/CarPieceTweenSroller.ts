module game {
    export class CarPieceTweenSroller extends eui.Component  {
        
        downBtnGroup        : eui.Group;
        closePanel          : eui.Group;
        listGroup           : eui.Group;
        selectPartGroup     : eui.Group;
        
        hideList_btn        : eui.Button;
        
        down_bg             : eui.Image;

        sr_item             : eui.Scroller;
        ls_items            : eui.List; 
        _dataProv           : eui.ArrayCollection;

        selectPart          : CarPartInfoItem;

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



        private _tweenCompleted : Boolean = true;
        private _runingTimers = [];

        protected getSkinName() {
            return TweenScrollerSkin;
        }
        
        public setData(Datas:any[]) {
            if(!Datas) return;
            this.dataList = Datas;
            this.updateView();
        }

        public getselectPart()
        {
            return this.selectPart;
        }

        private updateView()
        {          
            if(!this._tweenCompleted) return;
            this.selectPartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnCarPartLvUpHandle,this);
            this.closePanel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideList,this);
            this.hideList_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hideList,this);                        
            this.hideList_btn.visible = false;
            this.listIndex = 0;
            this.initItemList();
            this.adaptive();
            this.showlist();
        }

        private adaptive()
        {
            this.oldY = this.listGroup.y;
            this.oldH = this.down_bg.height;
        }

        public initItemList() { 
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            //this.ls_items.itemRenderer = this._itemRenderer;
            this.ls_items.itemRenderer = CarPartPieceItem;
            //this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
        }


        private showlist() {
            //console.log("展示列表showlist----------->");
            console.log(GameConfig.innerScale+" "+GameConfig.innerScaleH+" "+gameConfig.curHeight());

            let offsetY = 1280 - this.oldY; //默认高度           
            
         
            this.btnGoalY = this.hideList_btn.y  - this.hideList_btn.height - this.dataList.length * 150;//按钮贴边
            //this.goalH = this.dataList.length * 150 + this.hideList_btn.height;
            this.goalH = this.dataList.length * 150 + this.oldH;
        
			//console.log(this.goalH+"//"+this.goalY+"//"+GameConfig.innerHeight);
            if (this.listGroup.y != this.btnGoalY) {
                this._tweenCompleted = false;
                egret.Tween.get(this.listGroup).to({ y: this.btnGoalY }, 250).
                call(this.onComplete, this, []);  
                egret.Tween.get(this.down_bg).to({ height: this.goalH}, 250);
            }else{
                this.onComplete();
            }
        }
        private onComplete() {
           
            //console.log ("onComplete");
            this._tweenCompleted = true;
            this.hideList_btn.visible = true;

            egret.Tween.removeTweens(this.listGroup);
            egret.Tween.removeTweens(this.down_bg);
            this.bindData();
        }
        private bindData()
        {   
            if(!this.dataList) return;
            //console.log("updateView---->",this.dataList.length);
            this._dataProv.removeAll();
            let self = this;
            this.dataList.forEach(data=>{self._dataProv.addItem(data)});
            let scaleH = gameConfig.curHeight() / 1280;
            this.sr_item.height = this.dataList.length * 150;

           // console.log("-------------->",this.ls_items.numChildren+" "+this.ls_items.numElements);
         }
        private hideList() {
            //scroller适配
            let self = this;
            self._tweenCompleted = false;
            //self.sr_item.height  =  gameConfig.curHeight()* 0.79;
            egret.Tween.get(this.listGroup).to({ y: this.oldY }, 200).call(function(){
                self._tweenCompleted = true;
            });
            egret.Tween.get(this.down_bg).to({ height: this.oldH }, 200);
            this.visible = false;
        }

        public OnCloseHandle() {
        
            this.carData = null;
          
        }
        private OnDisableHandle(){

        }

        private OnCarPartLvUpHandle(){
            CarDetailView.getInstance().usePartPieceLvUp();
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