module game {
	export class NearbyPlayersPopupPanel extends PanelComponent {

		public static CLOSE: string = "close";
        public static LOOK_ASSES: string = "look_asses";

		private topImg: eui.Image;
        private headImg: eui.Image;
        private sexImg: eui.Image;
        private xingzuoIcon: eui.Image;
        

        private bPoint_txt: eui.Label;
        private name_txt: eui.Label;
        private level_txt: eui.Label;
        private age_txt: eui.Label;
        private xingzuo_txt: eui.Label;
        private juli_txt: eui.Label;
        private qianming_txt: eui.Label;

        private lookAsses_btn: eui.Button;
        private close_btn: IconButton;

        
		public constructor() {
			super();
		}
        protected getSkinName() {
            return NearbyPlayersViewUI;
        }
        private static _instance: NearbyPlayersPopupPanel = null;
        public static getInstance(): NearbyPlayersPopupPanel {
            if (!NearbyPlayersPopupPanel._instance) {
                NearbyPlayersPopupPanel._instance = new NearbyPlayersPopupPanel();
            }
            return NearbyPlayersPopupPanel._instance;
        }
        protected beforeShow() {
            
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);
        }
        protected beforeRemove() {
            
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_close, this);

            
        }
        protected init() {
            this.horizontalCenter = this.verticalCenter = 0;
            this.close_btn.icon="lucky_json.leftBack";
            
            
        }
		private onclick_close(){
           this.dispatchEvent(new BasicEvent(NearbyPlayersPopupPanel.CLOSE));
		}
		
	}
}