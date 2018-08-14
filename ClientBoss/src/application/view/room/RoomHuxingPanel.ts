module game {
	export class RoomHuxingPanel extends eui.Group {
		private roomView:GameRoomView;
		public constructor(rView:GameRoomView) {
			super();
			this.roomView=rView
		}
		private roomInfo:RoomVO;
		private bubbleList:any[]=[];
		private qiPaoList:QipaoPanel[]=[];
		private huxingImage:egret.Bitmap;
		public init(rVo:RoomVO){
			this.roomInfo=rVo;
			this.huxingImage = new egret.Bitmap();
			//let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId)
             //   if (roomType) {
					this.huxingImage.texture = RES.getRes(/*roomType.rImage+*/"hx_4001_png");
			//	}
			console.log(this.huxingImage.width);
			this.huxingImage.width=this.huxingImage.width*GameConfig.innerScale*3.5;
			this.huxingImage.height=this.huxingImage.height*GameConfig.innerScale*3.5;
			console.log(this.huxingImage.width);
			this.width=this.huxingImage.width;
			this.height=this.huxingImage.height;
			this.addChild(this.huxingImage);
			this.updataQipao(this.roomInfo.bubble);
		}
		private updataQipao(bubble){
			//let origin:egret.Point=this.globalToLocal(0,0);
			
			this.bubbleList=[];
			this.qiPaoList=[];
			if(bubble && bubble.length>0){
				for (let i: number = 0; i < bubble.length; i++) {
					if (bubble[i].status > 0 && bubble[i].status < 3) {
						let qipao: QipaoPanel = new QipaoPanel(this.roomView);
						this.addChild(qipao);
						qipao.x = this.width / 8 + Math.random() * this.width * 6 / 8;
						qipao.y = this.height / 8 + Math.random() * this.height * 6 / 8;
						let oldY: number = qipao.y;
						let timeNum: number = 800 + Math.floor(Math.random() * 500);
						qipao.updataInfo(bubble[i]);
						egret.Tween.get(qipao, { loop: true })
							.to({ y: oldY + 10 }, timeNum)
							.to({ y: oldY }, timeNum);
						this.bubbleList.push(bubble[i].status);
						this.qiPaoList.push(qipao);
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
		private getSingleBubble(id:number):any{
			let bubble:any=null;
			if(this.bubbleList && this.bubbleList.length>0){
				for(let i:number=0;i<this.bubbleList.length;i++){
					if(this.bubbleList[i].id==id){
						bubble=this.bubbleList[i];
						break;
					}
				}
			}

			return bubble;
		}
		public receiveSuccess(gId:number){
			let index:number=-1;
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					if(this.qiPaoList[i].bubble.id==gId){
						//this.qiPaoList[i].removePanel();
						//this.qiPaoList[i].hideTxt2();
						this.receiveFlyGold(this.qiPaoList[i]);
						index=i;
						break;
					}
				}
				if(index>-1){
					this.qiPaoList.splice(index,1);
					this.bubbleList.splice(index,1);
				}
			}
		}
		private receiveFlyGold(qipao: QipaoPanel){
			let origin:egret.Point=this.globalToLocal(GameConfig.goldGPoint.x,GameConfig.goldGPoint.y);
			console.log(origin);
			
			let scale=qipao.scaleX*0.5;
			egret.Tween.removeTweens(qipao);
			egret.Tween.get(qipao)
				.to({x:origin.x,y:origin.y,alpha:0,scaleX:scale,scaleY:scale}, 500)
				 .call(this.FlyGoldOnComplete, this, [qipao]);//设置回调函数及作用域，可用于侦听动画完成

		}
		private FlyGoldOnComplete(param1: QipaoPanel): void {
			egret.Tween.removeTweens(param1);
			param1.removePanel();
		}
		public plunderSuccess(gId:number,pId:number,getNum:number){
			let index:number=-1;
			let qipao:QipaoPanel=null;
			if(this.qiPaoList && this.qiPaoList.length>0){
				for(let i:number=0;i<this.qiPaoList.length;i++){
					if(this.qiPaoList[i].bubble.id==gId){
						this.qiPaoList[i].updatePlunder(pId,getNum);
						index=i;
						qipao=this.qiPaoList[i];
						this.plunderFloatWord(qipao,getNum);
						break;
					}
				}
				if(index>-1 && qipao){
					this.bubbleList[index]=qipao.bubble;
				}
			}
		}
		private plunderFloatWord(qipao: QipaoPanel, num: number) {
			let textField: egret.TextField = new egret.TextField();
			this.addChild(textField);
			textField.size = 50;
			textField.textColor = 0x69470F;
			textField.stroke=3;
			textField.strokeColor=0xffffff;
			textField.width = qipao.width;
			textField.height = 50;
			textField.textAlign = "center";
			textField.text = "+" + num;
			textField.scaleX = textField.scaleY = GameConfig.innerScale;
			textField.x = qipao.x-(qipao.width*qipao.scaleX)/2;
			textField.y = qipao.y-(qipao.height*qipao.scaleY)/2-(textField.height*textField.scaleY)/2;
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