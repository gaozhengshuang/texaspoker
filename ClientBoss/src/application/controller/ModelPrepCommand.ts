

module app {

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
		}
	}
}