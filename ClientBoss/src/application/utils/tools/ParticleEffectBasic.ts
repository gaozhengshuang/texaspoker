module game {
	export class ParticleEffectBasic extends egret.Sprite {
		private pImage: eui.Image;
		private pTexture: string="/resource/assets/leaf/";
		private pTexNum: number;
		private amount:number = 30;
		private _waitTime:number = 40000;
		private _ranTime:number = 5000;
		private leaf:any;
		public constructor(pTex: string, pNum: number,amNum:number=30,waitTime:number=40000,ranTime:number=5000) {
			super();
			this.pTexture = pTex;
			this.pTexNum = pNum;
			this.amount=amNum;
			this._waitTime=waitTime;
			this._ranTime=ranTime;
			this.init();
		}
		private init() {
			this.leaf = new Array();
			for (let a = 0; a < this.amount; a++) {
				this.leaf.push(new eui.Image(RES.getRes(this.pTexture + (a % this.pTexNum + 1))));
				this.addChild(this.leaf[a]);
					var ran_init_X = Math.random() * GameConfig.stageWidth;
					var ran_scale = 1+2*Math.random();
					var ran_wait_time = Math.random() * this._waitTime;
					this.leaf[a].scaleX = ran_scale;
					this.leaf[a].scaleY = ran_scale;
					this.leaf[a].anchorOffsetX = this.leaf[a].width / 2;
					this.leaf[a].anchorOffsetY = this.leaf[a].height / 2;
					this.leaf[a].x = ran_init_X;
					this.leaf[a].y = -150;
					var ran_rotation = -360 + Math.random() * 720;
					var ran_time = this._ranTime + this.leaf[a].scaleX * 10000;
					var ran_X = Math.random() * GameConfig.stageWidth;
					egret.Tween.get(
						this.leaf[a], { loop: true }).wait(ran_wait_time).to({ rotation: ran_rotation, x: ran_X, y: GameConfig.stageHeight+20 }, ran_time);
			}
		}
		public delEvent():void
		{
			if(this.leaf && this.leaf.length>0)
			{
				for (let i = 0; i < this.leaf.length; i++) {
					egret.Tween.removeTweens(this.leaf[i]);
				}
			}
			this.leaf=new Array();
		}
	}
}