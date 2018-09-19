module game {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
			var main:game.GameLayer = notification.getBody();
			this.facade().registerMediator( new ApplicationMediator(main) );
		}
	}
}