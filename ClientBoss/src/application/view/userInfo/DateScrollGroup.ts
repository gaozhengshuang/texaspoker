module game {
	export class DateScrollGroup extends eui.Group {
		public static SELECT: string = "select";

		private itemHeight: number = 0;
		private itemNum: number = 0;
		private itemList: AgeDateItemPanel[];
		private middleNum: number = 0;
		private offsetS: number = 20;
		private maskMC: eui.Rect;
		private parentView:ModifyAgePanel;
		public constructor(w: number, h: number, itemH: number,view:ModifyAgePanel) {
			super();
			this.width = w;
			this.height = h;
			this.itemHeight = itemH;
			this.parentView=view;
			this.itemNum = (Math.floor(this.width / this.itemHeight) + 1);
			this.middleNum = (Math.floor((this.width / 2) / this.itemHeight));
			this.offsetS = this.middleNum * this.itemHeight;
			this.scrollEnabled = true;
			this.touchChildren = false;
			this.maskMC = new eui.Rect(this.width, this.itemHeight, 0xffffff);
			this.maskMC.x = 0;
			this.maskMC.y = this.width / 2 - this.itemHeight / 2;
			this.addChild(this.maskMC);
			
		}
		private dateItemList: eui.List;
		private showItemList: eui.List;
		private dateList: any[] = [];
		private downpoint: number;
		private downtime: number;
		private curpage: number = 0;
		private hasMouseDown: boolean = false;
		private duration: number = 300;
		private topBorder: number = 0;
		private downBorder: number = 0;

		public updateDateList(list: any[]) {
			this.dateList = list;
			if (this.dateItemList == null) {
				this.dateItemList = new eui.List();
				this.addChild(this.dateItemList);
				this.dateItemList.itemRenderer = AgeDateItemPanel;
				this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
				//this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this);
				this.addEventListener(egret.TouchEvent.TOUCH_END, this.onmoveEnd, this);
				this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onmoveEnd, this);
			}
			let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(this.dateList);
			this.dateItemList.dataProvider = arrCollection;
			this.topBorder = -(this.dateItemList.dataProvider.length * this.itemHeight - (this.middleNum + 0.5) * this.itemHeight);
			this.downBorder = this.middleNum * this.itemHeight;
			this.updateShowList(this.dateList);
		}
		public updateShowList(list: any[]) {
			if (list && list.length > 0) {
				let showList: any[] = [];
				for (let i: number = 0; i < list.length; i++) {
					let item: any = {
						num: list[i].num,
						type: list[i].type,
						color: 2
					}
					showList.push(item);
				}
				if (this.showItemList == null) {
					this.showItemList = new eui.List();
					this.addChild(this.showItemList);
					this.showItemList.itemRenderer = AgeDateItemPanel;
					this.showItemList.mask = this.maskMC;
				}
				let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(showList);
				this.showItemList.dataProvider = arrCollection;
			}
		}
		private onMouseDownHandler(e: egret.TouchEvent): void {
			this.downpoint = e.stageY;
			this.downtime = new Date().getTime();
			this.hasMouseDown = true;
		}
		private onMouseMoveHandler(e: egret.TouchEvent): void {
			let mousemove: number = (e.stageY - this.downpoint);
			this.dateItemList.y += mousemove;
		}
		private onmoveEnd(e: egret.TouchEvent) {
			if (!this.hasMouseDown)
				return;
			this.hasMouseDown = false;
			let mousespped: Number = (e.stageY - this.downpoint) / (new Date().getTime() - this.downtime);
			let mousemove: number = (e.stageY - this.downpoint);
			let tarpos: number;
			let time: number;
			console.log(mousespped)
			if (mousemove < 0) {

				tarpos = this.dateItemList.y - this.itemHeight * Math.round(Math.abs(mousemove) / this.itemHeight);

				/*egret.Tween.get(this.dateItemList)
					.to({ y:tarpos }, this.duration)*/
				//.call(this.goldOnComplete, this, [FloatSpr,qipao,items]);
				//return;
			} else if (mousemove > 0) {
				tarpos = this.dateItemList.y + this.itemHeight * Math.round(Math.abs(mousemove) / this.itemHeight);

				//tarpos = Math.floor(this.curpage) * this.itemHeight;
				/*egret.Tween.get(this.dateItemList)
					.to({ y:tarpos }, this.duration)
				return;*/
			}

			if (tarpos < this.topBorder) {
				tarpos = this.topBorder;
			}
			if (tarpos > this.downBorder) {
				tarpos = this.downBorder;
			}
			egret.Tween.get(this.dateItemList)
				.to({ y: tarpos }, this.duration)
				.call(this.onComplete, this, []);

			egret.Tween.get(this.showItemList)
				.to({ y: tarpos }, this.duration)

		}
		private onComplete() {
			let index:number=Math.floor((this.width/2-this.dateItemList.y)/this.itemHeight);
			if(index>=0 && index<this.dateList.length){
				this.parentView.selectCallBack(this.dateList[index]);
			}
		}
		public delPanel() {
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
			//this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMoveHandler, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onmoveEnd, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onmoveEnd, this);
		}

	}
}