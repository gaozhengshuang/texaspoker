

module game {

	export class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade {

		public mediatorMap: game.Map<string, puremvc.Mediator> = new game.Map<string, puremvc.Mediator>();

		public constructor() {
			super("game");
		}
		public static STARTUP: string = "startup";
		private static instance: ApplicationFacade;
		public static getInstance(): ApplicationFacade {
			if (this.instance == null) this.instance = new ApplicationFacade();
			return <ApplicationFacade><any>(this.instance);
		}

		public initializeController(): void {
			super.initializeController();
			this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
		}

		/**
		 * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
		 * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
		 */
		public startUp(rootView: egret.DisplayObjectContainer): void {
			this.sendNotification(ApplicationFacade.STARTUP, rootView);
			this.removeCommand(ApplicationFacade.STARTUP); //PureMVC初始化完成，注销STARUP命令
		}
		public getMediator(key: any) {
			return this.mediatorMap.getValue(key);
		}
		public registerMdt<T extends puremvc.Mediator>(name: string, cls: { new (param: any): T }, view: any) {
			let mdt;
			mdt = this.getMediator(name)
			if (!mdt) {
				mdt = new cls(view);
				this.mediatorMap.add(name, mdt);
			}
			this.registerMediator(mdt);
		}
	}
}