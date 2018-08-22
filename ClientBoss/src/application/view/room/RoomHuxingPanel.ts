module game {
	export class RoomHuxingPanel extends eui.Group {
		private roomView: GameRoomView;
		public constructor(rView: GameRoomView) {
			super();
			this.roomView = rView;
		}
		private roomInfo: HouseVO;
		private bubbleList: any[] = [];
		private qiPaoList: QipaoPanel[] = [];
		private huxingImage: egret.Bitmap;

		private qipaoWeizhi: any[] = [{ x: 190, y: 198 }, { x: 460, y: 330 }, { x: 630, y: 90 }, { x: 448, y: 0 }]
		public init(rVo: HouseVO) {
			this.roomInfo = rVo;
			this.huxingImage = new egret.Bitmap();
			console.log(RES.getRes("hx_4001_png"));
			this.huxingImage.texture = RES.getRes(/*roomType.rImage+*/"hx_4001_png");
			console.log(this.huxingImage.width);
			this.huxingImage.width = this.huxingImage.width * 2;
			this.huxingImage.height = this.huxingImage.height * 2;
			console.log(this.huxingImage.width);
			this.width = this.huxingImage.width;
			this.height = this.huxingImage.height;
			this.addChild(this.huxingImage);
			this.y = this.parent.height / 2 - this.height / 2 + 30;
			this.initQipao(this.roomInfo.housecells);
		}
		public update(rVo: HouseVO) {
			this.roomInfo = rVo;
			this.updateQipao(this.roomInfo.housecells);
		}
		private initQipao(bubble) {
			//let origin:egret.Point=this.globalToLocal(0,0);

			this.bubbleList = [];
			this.qiPaoList = [];
			if (bubble && bubble.length > 0) {
				for (let i: number = 0; i < bubble.length; i++) {
					let qipao: QipaoPanel = new QipaoPanel(this.roomView);
					this.addChild(qipao);
					let point: any = this.qipaoWeizhi[bubble[i].index - 1];
					qipao.x = point.x;
					qipao.y = point.y;
					let oldY: number = qipao.y;
					let timeNum: number = 800 + Math.floor(Math.random() * 500);
					qipao.updataInfo(bubble[i]);
					if (bubble[i].state < 2) {
						egret.Tween.get(qipao, { loop: true })
							.to({ y: oldY + 10 }, timeNum)
							.to({ y: oldY }, timeNum);
					} else {

					}
					this.qiPaoList.push(qipao);
				}
			}
		}
		public updateQipao(bubble) {
			if (bubble && bubble.length > 0) {
				if (this.qiPaoList && this.qiPaoList.length > 0
					&& this.qiPaoList.length == bubble.length) {
					for (let i: number = 0; i < this.qiPaoList.length; i++) {
						for (let k: number = 0; k < bubble.length; k++) {
							if (this.qiPaoList[i].bubble.index == bubble[k].index) {
								if (this.qiPaoList[i].bubble.state == 2 && bubble[k].state < 2) {
									let oldY: number = this.qiPaoList[i].y;
									let timeNum: number = 800 + Math.floor(Math.random() * 500);
									egret.Tween.get(this.qiPaoList[i], { loop: true })
										.to({ y: oldY + 10 }, timeNum)
										.to({ y: oldY }, timeNum);
								}
								this.qiPaoList[i].updataInfo(bubble[k]);
								break;
							}
						}
					}
				}
			}
		}
		private getSingleQipao(id: number): QipaoPanel {
			let qipao: QipaoPanel = null;
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					if (this.qiPaoList[i].bubble.id == id) {
						qipao = this.qiPaoList[i];
						break;
					}
				}
			}

			return qipao;
		}
		public receiveSuccess(index: number, getNum: number) {
			let qipao: QipaoPanel = null;
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					if (this.qiPaoList[i].bubble.index == index) {
						qipao = this.qiPaoList[i];
						this.plunderFloatWord(qipao, getNum);
						break;
					}
				}
			}
		}
		public plunderSuccess(index: number, getNum: number) {
			let qipao: QipaoPanel = null;
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					if (this.qiPaoList[i].bubble.index == index) {
						qipao = this.qiPaoList[i];
						this.plunderFloatWord(qipao, getNum);
						break;
					}
				}
			}
		}
		private plunderFloatWord(qipao: QipaoPanel, num: number) {
			let FloatSpr: egret.Sprite = new egret.Sprite();
			let textField: egret.TextField = new egret.TextField();
			textField.size = 30;
			textField.textColor = 0x69470F;
			textField.stroke = 3;
			textField.strokeColor = 0xffffff;
			textField.width = qipao.width;
			textField.height = 30;
			textField.textAlign = "left";
			textField.text = "+" + num;
			//textField.scaleX = textField.scaleY = GameConfig.innerScale;
			let goldImg: egret.Bitmap = new egret.Bitmap();
			goldImg.texture = RES.getRes("smallGoldIcon1_png");
			goldImg.anchorOffsetY = goldImg.height / 2;
			goldImg.x = 0; goldImg.y = 0;
			FloatSpr.addChild(goldImg);
			textField.anchorOffsetY = textField.height / 2;
			textField.x = goldImg.width;
			textField.y = 0;
			FloatSpr.addChild(textField);
			FloatSpr.width = goldImg.width + 60;
			FloatSpr.anchorOffsetX = FloatSpr.width / 2;


			FloatSpr.alpha = 1;
			this.addChild(FloatSpr);
			FloatSpr.x = qipao.x + 130 / 2;;
			FloatSpr.y = qipao.y;
			egret.Tween.get(FloatSpr)
				.to({ scaleX: 2, scaleY: 2, y: FloatSpr.y - 30, alpha: 0 }, 500)
				.call(this.FloatWordOnComplete, this, [FloatSpr]);//设置回调函数及作用域，可用于侦听动画完成

		}
		private FloatWordOnComplete(param1: egret.Sprite): void {
			egret.Tween.removeTweens(param1);
			this.removeChild(param1);
			param1 = null;
		}
		public delQipaoTween() {
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					egret.Tween.removeTweens(this.qiPaoList[i]);
				}
			}
		}
	}
}