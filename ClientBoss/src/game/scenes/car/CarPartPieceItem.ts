module game {
	export class CarPartPieceItem extends eui.ItemRenderer  {
        center          : eui.Group;
        img_Icon        : eui.Image;
        ItemName        : eui.Label;
        txt_info        : eui.Label;
        btnJoin         : IconButton;

        colorStrs       : egret.ITextElement[] = [
            {text:'白色',style:{ "textColor": 0xffffff,}},
            {text:'绿色',style:{ "textColor": 0x0C7F15,}},
            {text:'蓝色',style:{ "textColor": 0x073DB5,}},
            {text:'紫色',style:{ "textColor": 0x5F0B91,}},
            {text:'橙色',style:{ "textColor": 0xF2820C,}}];
        
        private itemData        : table.IItemBaseDataDefine;
        private partPieceType   : msg.CarPartType;
        private restNum         : number   = 0;
        private nowTime         : number   = 0;
    
        private btnState        : ClickState = ClickState.Normal;
		public constructor(data:any=null) {
            super();
            this.skinName = CarPartPieceItemSkin;
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.OnTouchBegin,this);
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchEND,this);
		}

        protected dataChanged():void{
            this.itemData=this.data;
            let carPartPieceDef = table.TLevelCarPartById[this.itemData.ImageId];
            carPartPieceDef && (this.partPieceType = carPartPieceDef.PartType) || (console.warn("没有找到配件碎片表数据"+this.itemData.ImageId));
            this.btnJoin.icon = "uiCarAltas_json.buyBtn1";
            this.updateView();
        }

        private updateView()
        {
            this.restNum =  DataManager.playerModel.getItemNum(this.itemData.Id);
            this.ItemName.textFlow = [
                {text: this.itemData.Name,style:{textColor:0x000000}},
                {text: " 后备箱中有x",style:{textColor:0x000000}},
                {text:this.restNum.toString(),style:{textColor:0xF45F11}}
            ];
        
           this.txt_info.textFlow = [this.colorStrs[this.itemData.Color-1]];
        }

        //按下
        private OnTouchBegin()
        {
            this.nowTime = egret.getTimer();
            if(this.restNum==0) return;
            this.btnState = ClickState.Click;
            egret.startTick(this.countTimer,this);
        }
        //抬起
        private OnTouchEND()
        {
            egret.stopTick(this.countTimer,this);  
            if(this.btnState==ClickState.Click) {
                this.btnState = ClickState.Normal;
                if(this.restNum==0){
                    showTips("碎片数量不足！");
                    return;
                }
                this.usePartPiece();
            }

        }
        //帧事件回调
        private countTimer(timeStamp:number) {
            var now = timeStamp;
            var time = this.nowTime;
            var pass = now - time;
            if(this.btnState!=ClickState.LongPress){
                if(pass>1000){
                    this.btnState = ClickState.Normal;
                    if(pass>=2000){
                        console.log("长按事件触发,开始每1秒触发回调");
                        this.btnState =ClickState.LongPress;
                        this.nowTime = now;
                        return false;
                    }   
                    //console.log("长按按钮经过了"+pass+"毫秒");
                }
            }
            else{
                if(this.restNum==0) {
                    showTips("碎片数量不足！");                    
                    this.btnState =ClickState.Normal;
                    egret.stopTick(this.countTimer,this);  
                    return false;
                }
                if(pass>=100){
                    this.nowTime = now;
                    console.log("自动消耗碎片请求升级");
                    this.usePartPiece();
                }
            }
            //console.log("长按按钮经过了"+pass+"毫秒");
            return false;
        }

        //使用碎片升级
        private usePartPiece(){
            let carPartPiece = new msg.CarPartPiece();
            carPartPiece.id = this.itemData.Id;
            carPartPiece.num = 1;
            let self = this;
            //CarDetailView.getInstance().usePartPiece(this.partPieceType,[carPartPiece],[function(){self.updateView();}]);
        
            CarDetailView.getInstance().showPartPieceExp(this.partPieceType,carPartPiece,function(result:number){
                if(result)
                {
                    self.restNum--;
                    self.ItemName.textFlow = [
                        {text: self.itemData.Name,style:{textColor:0x000000}},
                        {text: " 后备箱中有x",style:{textColor:0x000000}},
                        {text: self.restNum.toString(),style:{textColor:0xF45F11}}
                    ];
                }
            });
        }

	}
}