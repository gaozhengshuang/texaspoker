

module game {
	export class ModelPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
			this.facade().registerProxy( new GameProxy() );
			this.facade().registerProxy( new UserProxy() );
			this.facade().registerProxy( new ServerProxy() );
			this.facade().registerProxy( new MapProxy() );
			this.facade().registerProxy( new SmallGameProxy() );
			this.facade().registerProxy( new AssetsProxy() );
			this.facade().registerProxy( new HouseProxy() );
			this.facade().registerProxy( new BuildingProxy() );
		}
	}
}