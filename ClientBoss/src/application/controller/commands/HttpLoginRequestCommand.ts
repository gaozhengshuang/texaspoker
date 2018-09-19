module game {
    export class HttpLoginRequestCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "HttpLoginRequestCommand";


        public mapProxy: MapProxy;
        public execute(notification: puremvc.INotification): void {
            let serverProxy: ServerProxy = <ServerProxy><any>this.facade().retrieveProxy(ServerProxy.NAME);
            if (this.mapProxy == null) {
                this.mapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
            }
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case CommandName.HTTP_REQ_LOGIN:
                    {
                        if (data != null) {

                            serverProxy.login(data, this.loginSuccess,this);
                        }
                        break;
                    }
            }
        }
        private loginSuccess(body:any) {
            var account: string = CookieSimple.instance.readCookie(GameConfig.cookieAccStr);
            var password: string = CookieSimple.instance.readCookie(GameConfig.cookiePassStr);
            var today: Date = new Date();
            var year: number = today.getFullYear();
            var moon: number = today.getMonth() + 1;
            var day: number = today.getDate();

            /*console.log(String(this.userProxy.getUserInfo().gameId) + "_" + String(year) + String(moon) + String(day)
                + "_" + GameConfig.cookieFirstLoginStr);
            var FirstLoginStr: string = CookieSimple.instance.readCookie
                (String(this.userProxy.getUserInfo().gameId) + "_" + String(year) + String(moon) + String(day)
                + "_" + GameConfig.cookieFirstLoginStr);
            if (FirstLoginStr == null || FirstLoginStr == "1") {
                GameConfig.isDayFirstLogin = true;
            }
            else {
                GameConfig.isDayFirstLogin = false;
            }*/

            if (account == null || account == "" || account != GameConfig.userAccount) {
                if (GameConfig.userAccount != "") {
                    CookieSimple.instance.writeCookie(GameConfig.cookieAccStr, GameConfig.userAccount, 30);
                }
            }
            if (password == null || password == "" || password != GameConfig.userPassword) {
                if (GameConfig.userPassword != "") {
                    CookieSimple.instance.writeCookie(GameConfig.cookiePassStr, GameConfig.userPassword, 30);
                }
            }
            body.mapProxy.LoginBtnClick();
        }
    }

}