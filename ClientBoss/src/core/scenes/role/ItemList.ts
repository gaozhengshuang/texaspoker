module game {
	export class ItemList extends eui.Component{
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
	
	 	window["game.ItemList"] = game.ItemList;
	}
}
