module game {
	export class RoomHuxingPanel extends eui.Group {
		private roomView: GameRoomView;
		public constructor(rView: GameRoomView) {
			super();
			this.roomView = rView;
		}
		private roomInfo: HouseVO;
		private roomTypeInfo: table.ITHouseDefine;
		private bubbleList: any[] = [];
		private qiPaoList: QipaoPanel[] = [];
		private huxingImage: egret.Bitmap;
		private huxingSprite: egret.Sprite;
		private maidGroup: eui.Group;
		public lockMaskSprite: egret.Sprite;
		public lockMaskItemList: any[] = [];

		private qipaoWeizhi1: any[] = [{ x: 351, y: 175 }, { x: 472, y: 2 }, { x: 178, y: 17 }, { x: 25, y: 20 }]
		private qipaoWeizhi2: any[] = [{ x: 348, y: 254 }, { x: 187, y: 0 }, { x: 184, y: 139 }, { x: 30, y: 142 }, { x: 473, y: 64 }]
		private qipaoWeizhi3: any[] = [{ x: 338, y: 367 }, { x: 180, y: 64 }, { x: 185, y: 238 }, { x: 28, y: 253 }, { x: 268, y: 0 }, { x: 470, y: 150 }]
		private qipaoWeizhi4: any[] = [{ x: 338, y: 367 }, { x: 180, y: 64 }, { x: 185, y: 238 }, { x: 28, y: 253 }, { x: 268, y: 0 }, { x: 470, y: 150 }, { x: 496, y: 0 }]

		public lockMask: any[] = [{ x: 410, y: -426 }, { x: 157, y: -344 }, { x: 15, y: -383 }, { x: 167, y: -515 }, { x: 260, y: -617 }, { x: 407, y: -581 }]
		public init(rVo: HouseVO) {
			this.roomInfo = rVo;
			if (this.huxingSprite == null) {
				this.huxingSprite = new egret.Sprite();
				this.addChild(this.huxingSprite);
			}
			if (this.maidGroup == null) {
				this.maidGroup = new eui.Group;
				this.maidGroup.width = this.width;
				this.maidGroup.height = this.height;
				this.maidGroup.touchEnabled = false;
				this.addChild(this.maidGroup);
			}
			this.roomTypeInfo = table.THouseById[this.roomInfo.tId];
			if (this.roomTypeInfo) {
				this.huxingImage = new egret.Bitmap();
				this.huxingImage.texture = RES.getRes("huxing_" + this.roomTypeInfo.ImageId + "_b_png");
				//console.log(this.huxingImage.width);
				//this.huxingImage.width = this.huxingImage.width;
				//this.huxingImage.height = this.huxingImage.height;
				//console.log(this.huxingImage.width);
				this.huxingSprite.addChild(this.huxingImage);
				this.huxingImage.y = -this.huxingImage.height;
				this.huxingSprite.y = this.huxingImage.height;
				this.width = this.huxingImage.width;
				this.height = this.huxingImage.height;
				if (this.lockMaskSprite == null) {
					this.lockMaskSprite = new egret.Sprite();
					this.huxingSprite.addChild(this.lockMaskSprite);
				}
				this.lockMaskSprite.removeChildren();
				this.lockMaskItemList = [];
				this.y = this.parent.height / 2 - this.height / 2 + 30;
				this.initQipao(this.roomInfo.housecells);
				this.updateMaid();
			}
		}
		public addLockMask(index: number) {
			let ishave: Boolean = false;
			if (this.lockMaskItemList && this.lockMaskItemList.length > 0) {
				for (let i: number = 0; i < this.lockMaskItemList.length; i++) {
					if (this.lockMaskItemList[i].index == index) {
						ishave = true;
						return;
					}
				}
			}
			if (!ishave) {
				let lockMaskItem: egret.Bitmap = new egret.Bitmap();
				//console.log(("hall_3_json.lockMask" + index + "_png"));
				lockMaskItem.texture = RES.getRes("hall_3_json.lockMask" + index + "_png");
				lockMaskItem.x = this.lockMask[(index - 1)].x;
				lockMaskItem.y = this.lockMask[(index - 1)].y;
				this.lockMaskSprite.addChild(lockMaskItem);
				this.lockMaskItemList.push({ item: lockMaskItem, index: index });
			}

		}
		public delLockMask(index: number) {
			let itemObj: any = null;
			if (this.lockMaskItemList && this.lockMaskItemList.length > 0) {
				let k: number = -1;
				for (let i: number = 0; i < this.lockMaskItemList.length; i++) {
					if (this.lockMaskItemList[i].index == index) {
						itemObj = this.lockMaskItemList[i];
						k = i;
						break;
					}
				}
				if (k > -1) {
					this.lockMaskItemList.splice(k, 1);
				}
			}
			if (itemObj != null) {
				if (itemObj.item && itemObj.item.parent) {
					itemObj.item.parent.removeChild(itemObj.item);
					itemObj.item = null;
				}
			}
		}
		public update(rVo: HouseVO) {
			this.roomInfo = rVo;
			this.updateQipao(this.roomInfo.housecells);
		}
		private initQipao(bubble) {
			//let origin:egret.Point=this.globalToLocal(0,0);
			let roomPosList: string[] = this.roomTypeInfo.RoomPosition.split(";");
			this.bubbleList = [];
			this.qiPaoList = [];
			if (bubble && bubble.length > 0) {
				for (let i: number = 0; i < bubble.length; i++) {
					let qipao: QipaoPanel = new QipaoPanel(this.roomView);
					this.addChild(qipao);
					let roomPos: string[] = roomPosList[bubble[i].index - 1].split("-");
					//let point: any = this["qipaoWeizhi" + (this.roomTypeInfo.MaxCells - 3)][bubble[i].index - 1];
					qipao.x = Number(roomPos[0]);
					qipao.y = Number(roomPos[1]);
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
		public receiveSuccess(index: number, getNum: number, items: any[]) {
			let qipao: QipaoPanel = null;
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					if (this.qiPaoList[i].bubble.index == index) {
						qipao = this.qiPaoList[i];
						this.plunderFloatWord(qipao, getNum, items);
						break;
					}
				}
			}
		}
		public plunderSuccess(index: number, getNum: number, items: any[]) {
			let qipao: QipaoPanel = null;
			if (this.qiPaoList && this.qiPaoList.length > 0) {
				for (let i: number = 0; i < this.qiPaoList.length; i++) {
					if (this.qiPaoList[i].bubble.index == index) {
						qipao = this.qiPaoList[i];
						this.plunderFloatWord(qipao, getNum, items);
						break;
					}
				}
			}
		}
		private plunderFloatWord(qipao: QipaoPanel, num: number, items: any[]) {
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
				.call(this.goldOnComplete, this, [FloatSpr,qipao,items]);//设置回调函数及作用域，可用于侦听动画完成

		}
		private goldOnComplete(param1: egret.Sprite,qipao: QipaoPanel, items: any[]) {
			this.FloatWordOnComplete(param1);
			if (items && items.length > 0) {
				for (let k: number = 0; k < items.length; k++) {
					this.floatItem(qipao, items[k],1000*k);
				}
			}
		}

		private floatItem(qipao: QipaoPanel, item: msg.PairNumItem,wait:number) {
			if (item) {
				let itemType: table.IItemBaseDataDefine = table.ItemBaseDataById[item.itemid];
				if (itemType) {
					let FloatSpr: egret.Sprite = new egret.Sprite();
					let textField: egret.TextField = new egret.TextField();
					let word: string = "+" + itemType.Name + " ×" + item.num;
					textField.size = 25;
					textField.textColor = 0x69470F;
					textField.stroke = 3;
					textField.strokeColor = 0xffffff;
					textField.width = word.length * textField.size + 10;
					textField.height = 30;
					textField.textAlign = "left";
					textField.text = word;
					//textField.scaleX = textField.scaleY = GameConfig.innerScale;
					let goldImg: egret.Bitmap = new egret.Bitmap();
					goldImg.texture = RES.getRes("item_json." + itemType.ImageId + "_png");
					goldImg.width = 50;
					goldImg.height = 50;
					goldImg.anchorOffsetY = goldImg.height / 2;
					goldImg.x = 0; goldImg.y = 0;
					FloatSpr.addChild(goldImg);
					textField.anchorOffsetY = textField.height / 2;
					textField.x = goldImg.width;
					textField.y = 0;
					FloatSpr.addChild(textField);
					FloatSpr.width = textField.width + 60;
					FloatSpr.anchorOffsetX = FloatSpr.width / 2;

					FloatSpr.alpha = 1;
					this.addChild(FloatSpr);
					FloatSpr.x = qipao.x + FloatSpr.width / 2;;
					FloatSpr.y = qipao.y;
					FloatSpr.alpha=0;
					egret.Tween.get(FloatSpr)
						.wait(wait)
						.to({ alpha: 1 }, 100)
						.to({ scaleX: 2, scaleY: 2, y: FloatSpr.y - 30, alpha: 0.3 }, 1000)
						.call(this.FloatWordOnComplete, this, [FloatSpr])//设置回调函数及作用域，可用于侦听动画完成
				}
			}

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

		public updateMaid() {
			if (this.maidGroup) {
				this.maidGroup.removeChildren();
			}
			let maidList: string[] = this.roomTypeInfo.GirlsPosition.split(";");
			if (maidList) {
				if (MaidManager.getInstance().getHouseMaidInfo()) {
					for(let i=0; i<MaidManager.getInstance().getHouseMaidInfo().maids.length; i++) {	//房里面可能有我的女仆和掠夺过来的女仆
						let maidInfo = MaidManager.getInstance().getHouseMaidInfo().maids[i];
						let maidPos: string[] = maidList[i].split("-");
						if (maidPos) {
							let houseMaid = new HouseRolePanel();
							this.maidGroup.addChild(houseMaid);

							houseMaid.anchorOffsetX = houseMaid.width / 2;
							houseMaid.anchorOffsetY = houseMaid.height;
							houseMaid.x = Number(maidPos[0]);
							houseMaid.y = Number(maidPos[1]);

							MaidManager.getInstance()._curSelHouse = this.roomInfo.rId;
							houseMaid.show(maidInfo);
						}
					}
				}
			}
		}
	}
}