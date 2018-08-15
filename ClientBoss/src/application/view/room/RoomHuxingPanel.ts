module game {
	export class RoomHuxingPanel extends eui.Group {
		private roomView:GameRoomView;
		public constructor(rView:GameRoomView) {
			super();
			this.roomView=rView;
		}
		private roomInfo:HouseVO;
		private bubbleList:any[]=[];
		private qiPaoList:QipaoPanel[]=[];
		private huxingImage:egret.Bitmap;

		private qipaoWeizhi:any[]=[{x:190,y:198},{x:460,y:330},{x:630,y:90},{x:448,y:0}]
		public init(rVo:HouseVO){
			this.roomInfo=rVo;
			this.huxingImage = new egret.Bitmap();
			this.huxingImage.texture = RES.getRes(/*roomType.rImage+*/"hx_4001_png");
			console.log(this.huxingImage.width);
			this.huxingImage.width=this.huxingImage.width*GameConfig.innerScale*2;
			this.huxingImage.height=this.huxingImage.height*GameConfig.innerScale*2;
			console.log(this.huxingImage.width);
			this.width=this.huxingImage.width;
			this.height=this.huxingImage.height;
			this.addChild(this.huxingImage);
			this.y=this.parent.height/2-this.height/2+30;
			this.initQipao(this.roomInfo.housecells);
		}
		public update(rVo:HouseVO){
			this.roomInfo=rVo;
			this.updateQipao(this.roomInfo.housecells);
		}
		private initQipao(bubble){
			//let origin:egret.Point=this.globalToLocal(0,0);
			
			this.bubbleList=[];
			this.qiPaoList=[];
			if(bubble && bubble.length>0){
				for (let i: number = 0; i < bubble.length; i++) {
						let qipao: QipaoPanel = new QipaoPanel(this.roomView);
						this.addChild(qipao);
						let point:any=this.qipaoWeizhi[bubble[i].index-1];
						qipao.x = point.x*GameConfig.innerScale;
						qipao.y = point.y*GameConfig.innerScale;
						let oldY: number = qipao.y;
						let timeNum: number = 800 + Math.floor(Math.random() * 500);
						qipao.updataInfo(bubble[i]);
						egret.Tween.get(qipao, { loop: true })
							.to({ y: oldY + 10 }, timeNum)
							.to({ y: oldY }, timeNum);
						//this.bubbleList.push(bubble[i].status);
						this.qiPaoList.push(qipao);
				}
			}
		}
		public updateQipao(bubble){
			if(bubble && bubble.length>0){
				if(this.qiPaoList && this.qiPaoList.length>0 
				&& this.qiPaoList.length==bubble.length){
					for (let i: number = 0; i < this.qiPaoList.length; i++) {
						this.qiPaoList[i].updataInfo(bubble[i]);
					}
				}
			}
		}
		private getSingleQipao(id:number):QipaoPanel{
			let qipao:QipaoPanel=null;
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					if(this.qiPaoList[i].bubble.id==id){
						qipao=this.qiPaoList[i];
						break;
					}
				}
			}

			return qipao;
		}
		public receiveSuccess(index: number, getNum: number){
			let qipao:QipaoPanel=null;
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					if(this.qiPaoList[i].bubble.index==index){
						qipao=this.qiPaoList[i];
						this.plunderFloatWord(qipao,getNum);
						break;
					}
				}
			}
		}
		public plunderSuccess(index: number, getNum: number){
			let qipao:QipaoPanel=null;
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					if(this.qiPaoList[i].bubble.index==index){
						qipao=this.qiPaoList[i];
						this.plunderFloatWord(qipao,getNum);
						break;
					}
				}
			}
		}
		private plunderFloatWord(qipao: QipaoPanel, num: number) {
			let textField: egret.TextField = new egret.TextField();
			this.addChild(textField);
			textField.size = 25;
			textField.textColor = 0x69470F;
			textField.stroke=3;
			textField.strokeColor=0xffffff;
			textField.width = qipao.width;
			textField.height = 25;
			textField.textAlign = "center";
			textField.text = "+" + num;
			textField.scaleX = textField.scaleY = GameConfig.innerScale;
			textField.x = qipao.x;
			textField.y = qipao.y;
			textField.alpha=0;
			egret.Tween.get(textField)
				.to({ y: textField.y - 20 ,alpha:1}, 500)
				.wait(500)
				.to({alpha: 0 }, 500)
				 .call(this.FloatWordOnComplete, this, [textField]);//设置回调函数及作用域，可用于侦听动画完成

		}
		private FloatWordOnComplete(param1: egret.TextField): void {
			egret.Tween.removeTweens(param1);
			this.removeChild(param1);
			param1=null;
		}
		public delQipaoTween(){
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					egret.Tween.removeTweens(this.qiPaoList[i]);
				}
			}
		}
	}
}