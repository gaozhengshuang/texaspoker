module game {
	export class CarPartPieceItem extends eui.ItemRenderer  {
        center          : eui.Group;
        img_Icon        : eui.Image;
        ItemName        : eui.Label;
        txt_info        : eui.Label;
        btnJoin         : IconButton;

        colorStrs       : egret.ITextElement[] = [
            {text:'白',style:{ "textColor": 0xffffff,}},
            {text:'绿',style:{ "textColor": 0x0C7F15,}},
            {text:'蓝',style:{ "textColor": 0x073DB5,}},
            {text:'紫',style:{ "textColor": 0x5F0B91,}},
            {text:'橙',style:{ "textColor": 0xF2820C,}}];
        
        private itemData        : table.IItemBaseDataDefine;
        private partPieceType   : msg.CarPartType;
        private restNum         : number   = 0;
        private nowTime         : number   = 0;
        private longPressed     : boolean  = false;

		public constructor(data:any=null) {
            super();
            this.skinName = CarPartPieceItemSkin;
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.OnTouchBegin,this);
            this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchEND,this);
		}

        protected dataChanged():void{
            this.itemData=this.data;
            //this.partPieceType = CarDetailView.CarPartPieceIDs.filter(data=>{return data.id==this.itemData.ImageId})[0].type;
            this.partPieceType = msg.CarPartType.Tyre;
            this.btnJoin.icon = "uiCarAltas_json.buyBtn1";
            this.updateView();
        }

        private updateView()
        {
            this.restNum =  DataManager.playerModel.getItemNum(this.itemData.Id);
            this.ItemName.textFlow = [
                {text: this.itemData.Name},
                {text: " 后备箱中 x"+this.restNum}
            ];
        
           this.txt_info.textFlow = [this.colorStrs[this.itemData.Color-1]];
        }

        //按下
        private OnTouchBegin()
        {
            this.nowTime = egret.getTimer();
            if(this.restNum==0) return;
            egret.startTick(this.countTimer,this);
        }
        //抬起
        private OnTouchEND()
        {
            if(!this.longPressed) {
                if(this.restNum==0){
                    showTips("碎片数量不足！");
                    return;
                }
                this.usePartPiece();
            }
            else{
                this.longPressed = false;
                egret.stopTick(this.countTimer,this);  
            }
        }
        //帧事件回调
        private countTimer(timeStamp:number) {
            var now = timeStamp;
            var time = this.nowTime;
            var pass = now - time;
            if(!this.longPressed){
                if(pass>=3000){
                    console.log("长按事件触发,开始每1秒触发回调");
                    this.longPressed = true;
                    this.nowTime = now;
                    return false;
                }   
                console.log("长按按钮经过了"+pass+"毫秒");
            }
            else{
                if(this.restNum==0) {
                    showTips("碎片数量不足！");                    
                    this.longPressed = false;
                    egret.stopTick(this.countTimer,this);  
                    return false;
                }
                if(pass>=1000){
                    this.nowTime = now;
                    console.log("自动消耗碎片请求升级");
                    this.usePartPiece();
                }
            }

            return false;
        }

        //使用碎片升级
        private usePartPiece(){
            let carPartPiece = new msg.CarPartPiece();
            carPartPiece.id = this.itemData.Id;
            carPartPiece.num = 1;
            let self = this;
            CarDetailView.getInstance().usePartPiece(this.partPieceType,[carPartPiece],[function(){self.updateView();}]);
        }

	}
}