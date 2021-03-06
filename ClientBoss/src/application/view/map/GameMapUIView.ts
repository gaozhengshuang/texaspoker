declare function setBtnCallbackFun(fun:Function,body:any);
declare function updataUserInfo(obj:any);
module game {
	export class GameMapUIView extends egret.EventDispatcher {
        public static FUJIN_SWITCH:string = "fujin_switch";
        public static MAP_POSITION:string = "map_position";
        public static OPEN_MAIN_ASSETS:string = "open_main_assets";
        public static GOIN_MESSAGE:string = "goin_message";
        public static EXPLORE_RETURN:string = "explore_return";
        public static OPEN_TRANSACTION:string = "open_transaction";
        public static GOTO_HOME: string = "goto_home";
        public static OPEN_DISCOVERY: string = "open_discovery";
        public static OPEN_MINE: string = "open_mine";
        public static CLOSE_SMALL_GAME: string = "close_small_game";
        public static GOTO_SHOUYI_ROOM: string = "goto_shouyi_room";
        public static BUY_HOUSE: string = "buy_house";
        public static BUY_CAR: string = "buy_car";


        private eventMask:eui.Rect;
        private fujinLabelList:string[]=['附近的人','附近建筑'];
        private fujinStatus:number=1;

        private userInfo:IUserInfo;


		public constructor() {
			super();
            
            setBtnCallbackFun(this.btnCallbackFun,this);
		}
        public updateUserInfoFun(obj: IUserInfo) {
            this.userInfo = obj;
            if (this.userInfoPanel != null) {
                this.userInfoPanel.updataInfo(this.userInfo);
            }
        }
        public btnCallbackFun(type:string,body:any,param=null){
            switch(type){
                case 'transaction':
                    body.onclick_transaction();
                break;
                case 'xiaoxi':
                    body.onclick_xiaoxi();
                break;
                case 'dingwei':
                    body.onclick_mapDingwei(); 
                break;
                case 'assets':
                    body.onclick_mainAssets();
                    
                break;
                case 'fujinJianzhu':
                
                    body.onclick_fujinSwitch(1);
                    
                break;
                case 'fujinRen':
                    body.onclick_fujinSwitch(2);
                break;

                case 'expReturnBtn':

                    body.onclick_expReturn();
                    
                break;
                case 'mine':

                    body.onclick_mine();
                    
                break;
                case 'home':

                    body.onclick_home();
                    
                break;
                 case 'discovery':

                    body.onclick_discovery();
                    
                break;
                case 'gameClose':

                    body.onclick_gameClose();
                    
                break;
                case 'shouyi':

                    body.onclick_shouyi();
                    
                break;
                case 'buyHouse':

                    body.onclick_buyHouse();
                    
                break;
                case 'buyCar':
                    body.onclick_buyCar();
                break;
                case 'returnTrade': //返回交易
                    body.onclick_returnTrade();
                break;
                case 'expedition': //出征模式切换
                    body.onclick_ChangeExpedition();
                break;
                case 'expeditionStateBtn':
                    body.onClickExpeditonStateBtn(param);
                break;
            }
        }

        public userInfoPanel:GameUserInfoPanel;
        public initView(info:IUserInfo):void{
            this.userInfo=info;
            if(this.userInfoPanel==null){
                openPanel(PanelType.GameUserInfoPanel);
                this.userInfoPanel= GameUserInfoPanel.getInstance();
                this.userInfoPanel.x=0;
                this.userInfoPanel.y=0;
            }
            this.userInfoPanel.updataInfo(this.userInfo);
            /*initTopInfo(GameConfig.innerScale,{name:this.userInfo.nickname,
                level:this.userInfo.level,gold1:this.userInfo.gold1});*/
            this.showExpeditionArrivalCarIcon(true);
        }
        public showUserInfo(bool:boolean){
            if(this.userInfoPanel!=null){
                if(bool)
                {
                    openPanel(PanelType.GameUserInfoPanel);
                    this.showExpeditionArrivalCarIcon(true);
                }
                else
                {
                    this.userInfoPanel.remove();
                    this.showExpeditionArrivalCarIcon(false);
                    
                }
            }
        }

		//显示已到达车辆图标覆盖物
		public showExpeditionArrivalCarIcon(bool:boolean){
			CarExpeditionManager.getInstance().showArrivalCarMarkerPos(bool);
		}


        public showRoomWeizhi(isShow:boolean,roomvo:HouseVO=null){
            if(this.userInfoPanel){
                //this.userInfoPanel.showRoomWeizhi(isShow,roomvo);
            }
        }
        public showRoomNum(isShow: boolean, rId: number = 0) {
            if(this.userInfoPanel){
                //this.userInfoPanel.showRoomNum(isShow,rId);
            }
        }
        public showRoomBg(isShow: boolean) {
            if(this.userInfoPanel){
               // this.userInfoPanel.showRoomBg(isShow);
            }
        }
        private onclick_begin(){
            //console.log('???????????');
			
		}
        private onclick_mine(){
			
            this.dispatchEvent(new BasicEvent(GameMapUIView.OPEN_MINE));
		}
        private onclick_home(){
			
            this.dispatchEvent(new BasicEvent(GameMapUIView.GOTO_HOME));
		}
        private onclick_discovery(){
			
            this.dispatchEvent(new BasicEvent(GameMapUIView.OPEN_DISCOVERY));
		}
        private onclick_transaction(){
            this.dispatchEvent(new BasicEvent(GameMapUIView.OPEN_TRANSACTION));
		}
        private onclick_expReturn(){
            this.dispatchEvent(new BasicEvent(GameMapUIView.EXPLORE_RETURN));
		}
        private onclick_gameClose(){
            this.dispatchEvent(new BasicEvent(GameMapUIView.CLOSE_SMALL_GAME));
		}
        private onclick_zichan(){
            
		}
        private onclick_xiaoxi(){
            this.dispatchEvent(new BasicEvent(GameMapUIView.GOIN_MESSAGE));
		}
        private onclick_mainAssets(){
            this.dispatchEvent(new BasicEvent(GameMapUIView.OPEN_MAIN_ASSETS));
		}
        private onclick_mapDingwei(){

            this.dispatchEvent(new BasicEvent(GameMapUIView.MAP_POSITION));
		}
        private onclick_shouyi(){

            this.dispatchEvent(new BasicEvent(GameMapUIView.GOTO_SHOUYI_ROOM));
		}
        private onclick_buyHouse(){

            this.dispatchEvent(new BasicEvent(GameMapUIView.BUY_HOUSE));
		}
        private onclick_buyCar(){

            this.dispatchEvent(new BasicEvent(GameMapUIView.BUY_CAR));
		}
        private onclick_fujinSwitch(status:number){
            //console.log(this.fujinStatus+"//"+(this.fujinStatus==1));
            this.fujinStatus=status;
            this.dispatchEvent(new BasicEvent(GameMapUIView.FUJIN_SWITCH,{index:this.fujinStatus}));
		}
        /**
         * 返回交易
         */
        private onclick_returnTrade()
        {
            TradeManager.getInstance().returnToTrade();
        }

        private onclick_ChangeExpedition()
        {
		    ApplicationFacade.getInstance().sendNotification(CommandName.MAP_OPEN_EXPEDITION_MODEL);
        }

        private onClickExpeditonStateBtn(carID:number){
            CarExpeditionInfoPanel.getInstance().OnStateHandle(carID);
        }   
        /**
         * 释放事件与重置数据状态
         */
        public clear()
        {

        }
	}
}