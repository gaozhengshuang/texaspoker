module game {
	export class Coins extends eui.Component{
		public num:eui.Label;

		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
		}
	
	 	
		public set coins(n:number) {
			this.num.text = `${n}`;
		}

	}
	window["game.Coins"] = game.Coins;
}
