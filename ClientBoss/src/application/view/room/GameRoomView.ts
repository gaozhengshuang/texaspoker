module game {
    export class GameRoomView extends eui.Component {
        public static CLOSE: string = "close";
        public static OPEN_NEIGHBOR_LIST: string = "open_neighbor_list";
        //public static OPEN_ASSETS_LIST: string = "open_assets_list";
        //public static POPUP_ASSETS_LIST: string = "popup_assets_list";
        public static GOIN_ROOM: string = "goin_room";
        public static SHOW_TOP_ROOM_INFO: string = "show_top_room_info";
        //public static EXPLORE_MAP: string = "explore_map";
        public static RECEIVE: string = "receive";
        public static PLUNDER: string = "plunder";
        public static PLUNDER_ERROR: string = "plunder_error";

        private room_bg: eui.Rect;

        private huxingGroup: eui.Group;
        private downBtnGroup: eui.Group;
        private topRightGroup: eui.Group;
        private linjuInfoGroup: eui.Group;
        private contentGroup: eui.Group;
        private roomLevelGroup: eui.Group;

        //private fanweiGroup: eui.Group;

        //private successGroup: eui.Group;

        private huxing_img: eui.Image;
        private down_bg: eui.Image;
        private dongtai_txt: eui.Image;

        private quit_btn: eui.Button;
        //private tansuo_btn: eui.Button;
        private zichan_btn: eui.Button;
        private canku_btn: eui.Button;
        private lingju_btn: eui.Button;

        //private bName_txt: eui.Label;
        //private bWeizhi_txt: eui.Label;
        //private bFangwei_txt: eui.Label;
        //private moreMsg: eui.Image;
        //private downLine: eui.Image;

        //private success_txt: eui.Label;


        private ljName_txt: eui.Label;
        private ljbName_txt: eui.Label;
        private ljWeizhi_txt: eui.Label;
        private ljHuxing_txt: eui.Label;
        private lLevel_txt: eui.Label;
        private lVip_txt: eui.Label;

        private roomLevel_txt: eui.Label;
        private shouyi_txt: eui.Label;

        public roomInfo: RoomVO;
        public playersInfo: UserVO;
        public selfIdNum: number;

        private huxingPanel: RoomHuxingPanel;

        public constructor() {
            super();
            this.skinName = "resource/skins/RoomViewUISkin.exml";
            this.adaptive();

            this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
            //this.zichan_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_zichan, this);
            this.canku_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_cangku, this);
            this.lingju_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lingju, this);
            //this.tansuo_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_explore, this);
            //this.moreMsg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_moreMsg, this);

        }
        private downBgScaleH: number = 1;
        private dBgDefaultH: number = 0;
        private dBgDefaultY: number = 0;
        private adaptive() {

            this.room_bg.width=GameConfig.innerWidth;
            this.room_bg.height=GameConfig.innerHeight;

            //this.successGroup.visible=false;

            this.huxingGroup.touchEnabled = false;
            this.huxingGroup.touchChildren = false;

            let oldDownBgW: number = this.down_bg.width;
            this.down_bg.width = GameConfig.innerWidth;
            this.downBgScaleH = this.down_bg.width / oldDownBgW
            this.down_bg.height = GameConfig.innerScale * this.down_bg.height;
            this.down_bg.x = 0; this.down_bg.y = GameConfig.innerHeight - this.down_bg.height;
            this.dBgDefaultH = this.down_bg.height;
            this.dBgDefaultY = this.down_bg.y;


            /*this.successGroup.scaleX=this.successGroup.scaleY=this.downBgScaleH;

            this.successGroup.x=0;
            this.successGroup.y=GameConfig.innerHeight/4-
            this.successGroup.height*this.successGroup.scaleY/2;*/

            /*this.downLine.width = GameConfig.innerWidth;
            this.downLine.height = 2;
            this.downLine.y = GameConfig.innerHeight-200*GameConfig.innerScaleH;

            this.moreMsg.scaleX = this.moreMsg.scaleY = GameConfig.innerScale;
            //this.moreMsg.anchorOffsetX = this.moreMsg.width / 2;
            console.log(GameConfig.innerWidth,this.moreMsg.width);
            this.moreMsg.x = GameConfig.innerWidth/2-this.moreMsg.width*GameConfig.innerScale/2;
            this.moreMsg.y = this.downLine.y+(GameConfig.innerHeight-this.downLine.y)/2
            -this.moreMsg.height*GameConfig.innerScale/2;*/


            this.dongtai_txt.scaleX = this.dongtai_txt.scaleY = GameConfig.innerScale;
            this.dongtai_txt.x = 60 * GameConfig.innerScaleW;
            this.dongtai_txt.y = this.down_bg.y + 100*GameConfig.innerScaleH;
            console.log(this.down_bg.y+"//"+this.downBgScaleH);

            this.downBtnGroup.scaleX = this.downBtnGroup.scaleY = GameConfig.innerScale;
            this.downBtnGroup.x = 1400 * GameConfig.innerScaleW;
            this.downBtnGroup.y = this.down_bg.y - (this.downBtnGroup.height * GameConfig.innerScale / 2) - 20;

            this.quit_btn.scaleX = this.quit_btn.scaleY = GameConfig.innerScale;
            this.quit_btn.x = GameConfig.innerWidth - 60 * GameConfig.innerScale;
            this.quit_btn.y = 40 * GameConfig.innerScale;


            /*this.fanweiGroup.scaleX = this.fanweiGroup.scaleY = GameConfig.innerScale;
            this.fanweiGroup.x = GameConfig.innerWidth;
            this.fanweiGroup.y = 238 * GameConfig.innerScale;*/

            this.linjuInfoGroup.scaleX = this.linjuInfoGroup.scaleY = GameConfig.innerScale;
            this.linjuInfoGroup.x = GameConfig.innerWidth;
            this.linjuInfoGroup.y = 370 * GameConfig.innerScaleH;

        }
        public updateInfo(rVo: RoomVO, pVo: UserVO, selfId: number) {
            this.roomInfo = rVo;
            this.playersInfo = pVo;
            this.selfIdNum = selfId;
            if (this.selfIdNum == this.roomInfo.rUserId) {
                this.showSelf();
                this.lingju_btn.visible = true;
                this.canku_btn.visible = true;
                //this.moreMsg.visible = true;
                //this.tansuo_btn.visible = true;
                //this.fanweiGroup.visible = true;
            } else {
                this.showOthers();
                this.lingju_btn.visible = false;
                this.canku_btn.visible = false;
                //this.moreMsg.visible = false;
                //this.tansuo_btn.visible = false;
                //this.fanweiGroup.visible = false;
            }

            this.huxingPanel = new RoomHuxingPanel(this);
            this.huxingPanel.init(this.roomInfo);
            var scrollView: egret.ScrollView = new egret.ScrollView();
            //设置滚动内容
            scrollView.setContent(this.huxingPanel);
            //设置滚动区域宽高
            scrollView.width = GameConfig.innerWidth;
            scrollView.height = this.down_bg.y + 20;
            //垂直滚动设置为 on 
            scrollView.verticalScrollPolicy = "on";
            //水平滚动设置为 auto
            scrollView.horizontalScrollPolicy = "on";

            scrollView.bounces = false;

            scrollView.setScrollLeft(this.huxingPanel.width / 2 - scrollView.width / 2, 0)
            scrollView.setScrollTop(scrollView.height, 0)

            this.addChild(scrollView);
            this.swapChildren(scrollView, this.huxingGroup);

        }
        private showSelf() {
            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: true, room: this.roomInfo }));
            this.linjuInfoGroup.visible = false;
            //this.bFangwei_txt.visible = true;
            //this.tansuo_btn.visible = true;

           /* let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId)
            if (roomType) {
                this.bFangwei_txt.text = "范围:" + roomType.exRange + "公里";
            }*/
        }
        private showOthers() {

            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: false }));
            this.linjuInfoGroup.visible = true;
            //this.bFangwei_txt.visible = false;
            //this.tansuo_btn.visible = false;

            this.ljName_txt.text=this.roomInfo.rUserName;
            this.ljbName_txt.text = this.roomInfo.bName;
            this.ljHuxing_txt.text = "";
            let weizhiTxt = this.ljWeizhi_txt;
            GameConfig.getCityNameFun(this.roomInfo.bLatLng[0],
                this.roomInfo.bLatLng[1], function (txt: string) {
                    weizhiTxt.text = txt;
                });
            /*let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId)
            if (roomType) {
                this.ljHuxing_txt.text = "房间(" + roomType.area + "平米)";
            }*/
        }

        public receiveCoin(coinId: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.RECEIVE,
             { coinId: coinId, rId: this.roomInfo.rId }));
        }

        public plunderCoin(coinId: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.PLUNDER,
             { coinId: coinId, rId: this.roomInfo.rId }));

        }
        public plunderCoinError(eid: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.PLUNDER_ERROR, { eid: eid }));
        }

        private onclick_begin() {
            this.dispatchEvent(new BasicEvent(GameRoomView.CLOSE));
        }

        /*private onclick_zichan() {
            this.dispatchEvent(new BasicEvent(GameRoomView.OPEN_ASSETS_LIST, { gameId: this.roomInfo.rUserId,backType:2 }));
        }*/
        private onclick_cangku() {

        }
        /*private onclick_explore() {
            let roomType: RoomTypeVO = GameConfig.getRoomType(this.roomInfo.tId)
            if (roomType) {
                this.dispatchEvent(new BasicEvent(GameRoomView.EXPLORE_MAP, {
                    lat: this.roomInfo.bLatLng[0],
                    lng: this.roomInfo.bLatLng[1], radius: roomType.exRange
                }));
            }

        }*/
        private onclick_lingju() {
            this.dispatchEvent(new BasicEvent(GameRoomView.OPEN_NEIGHBOR_LIST,
                { backType: 2, bId: this.roomInfo.bId, rId: this.roomInfo.rId }));
        }
        private onclick_moreMsg() {
            //if(this.messageList && this.messageList.length>3){
            this.showDongtaiList(this.messageList);
            //}
        }

        /**
         * 资产列表
         */
        /*private zichanListView: RoomZichanListView;
        public showZichanList(list: RoomVO[]) {
            this.removeZichanListView();
            //list=(list.concat(list.concat(list)))
            if (list && list.length > 0) {
                this.downBtnGroup.visible = false;
                this.dongtai_txt.visible = false;
                this.downLine.visible = false;
                if (this.messageItemList) {
                    this.messageItemList.visible = false;
                }
                this.moreMsg.visible = false;

                let OHeight = (260 + 378 * list.length + 230);
                let goalH = OHeight * (GameConfig.innerWidth / GameConfig.stageWidth);
                let limit = GameConfig.innerHeight - (266 * GameConfig.innerScale + 18);
                goalH = goalH <= limit ? goalH : limit;

                let goalY = GameConfig.innerHeight - goalH;

                egret.Tween.get(this.down_bg).to({ height: goalH, y: goalY }, 300)
                    .call(this.onComplete, this, [1, list]);
            }
        }
        private removeZichanEvnet(eve: BasicEvent) {
            this.zichanListView.removeEventListener(RoomZichanListView.CLOSE, this.removeZichanListView, this);
            this.removeZichanListView();
            this.restoreDownBg();
        }
        private removeZichanListView() {
            if (this.zichanListView && this.zichanListView.parent) {
                this.zichanListView.delEvent();
                this.zichanListView.parent.removeChild(this.zichanListView);
                this.zichanListView = null;
            }
        }*/

        /**
         * 邻居列表
         */
        private linjuListView: RoomLinjuListView;
        public showLinjuList(list: RoomVO[]) {
            this.removeLinjuListView();
            if (list && list.length > 0) {
                this.downBtnGroup.visible = false;
                this.dongtai_txt.visible = false;
                //this.downLine.visible = false;
                if (this.messageItemList) {
                    this.messageItemList.visible = false;
                }
                //this.moreMsg.visible = false;

                let OHeight = (260 + 188 * list.length + 230);
                let goalH = OHeight * (GameConfig.innerWidth / GameConfig.stageWidth);
                let limit = GameConfig.innerHeight - (266 * GameConfig.innerScale + 18);
                goalH = goalH <= limit ? goalH : limit;

                let goalY = GameConfig.innerHeight - goalH;

                egret.Tween.get(this.down_bg).to({ height: goalH, y: goalY }, 300)
                    .call(this.onComplete, this, [2, list]);
            }
        }
        private removeLinjuEvnet(eve: BasicEvent) {
            this.linjuListView.removeEventListener(RoomLinjuListView.CLOSE, this.removeLinjuEvnet, this);
            this.removeLinjuListView();
            this.restoreDownBg();
        }
        private removeLinjuListView() {
            if (this.linjuListView && this.linjuListView.parent) {
                this.linjuListView.delEvent();
                this.linjuListView.parent.removeChild(this.linjuListView);
                this.linjuListView = null;
            }
        }

        /**
         * 动态列表
         */
        private dongtaiListView: RoomDongtaiListView;
        public showDongtaiList(list: MessageVO[]) {
            this.removeLinjuListView();
            if (list && list.length > 0) {
                this.downBtnGroup.visible = false;
                this.dongtai_txt.visible = false;
                //this.downLine.visible = false;
                if (this.messageItemList) {
                    this.messageItemList.visible = false;
                }
                //this.moreMsg.visible = false;

                let OHeight = (260 + 120 * list.length + 230);
                let goalH = OHeight * (GameConfig.innerWidth / GameConfig.stageWidth);
                let limit = GameConfig.innerHeight - (266 * GameConfig.innerScale + 18);
                goalH = goalH <= limit ? goalH : limit;

                let goalY = GameConfig.innerHeight - goalH;

                egret.Tween.get(this.down_bg).to({ height: goalH, y: goalY }, 300)
                    .call(this.onComplete, this, [3, list]);
            }
        }
        private removeDongtaiEvnet(eve: BasicEvent) {
            this.dongtaiListView.removeEventListener(RoomLinjuListView.CLOSE, this.removeDongtaiEvnet, this);
            this.removeDongtaiListView();
            this.restoreDownBg();
        }
        private removeDongtaiListView() {
            if (this.dongtaiListView && this.dongtaiListView.parent) {
                this.dongtaiListView.delEvent();
                this.dongtaiListView.parent.removeChild(this.dongtaiListView);
                this.dongtaiListView = null;
            }
        }


        private onComplete(type: number, list: any[] = null): void {
            switch (type) {
                case 0:
                    this.downBtnGroup.visible = true;
                    this.dongtai_txt.visible = true;
                    //this.downLine.visible = true;
                    if (this.messageItemList) {
                        this.messageItemList.visible = true;
                    }
                    if (this.selfIdNum == this.roomInfo.rUserId) {
                        //this.moreMsg.visible = true;
                    }

                    break;
                case 1:
                    /*this.zichanListView = new RoomZichanListView(list,
                        GameConfig.innerWidth / GameConfig.stageWidth, this.down_bg.height);

                    this.addChild(this.zichanListView);
                    this.zichanListView.x = GameConfig.innerWidth / 2;
                    this.zichanListView.y = this.down_bg.y + 20;
                    this.zichanListView.addEventListener(RoomZichanListView.CLOSE, this.removeZichanEvnet, this);
                    this.zichanListView.addEventListener(RoomZichanListView.GOIN_ROOM, this.onGoinRoom, this);
                    break;*/
                case 2:
                    this.linjuListView = new RoomLinjuListView(list,
                        GameConfig.innerWidth / GameConfig.stageWidth, this.down_bg.height);

                    this.addChild(this.linjuListView);
                    this.linjuListView.x = GameConfig.innerWidth / 2;
                    this.linjuListView.y = this.down_bg.y + 20;
                    this.linjuListView.addEventListener(RoomLinjuListView.CLOSE, this.removeLinjuEvnet, this);
                    this.linjuListView.addEventListener(RoomLinjuListView.GOIN_ROOM, this.onGoinRoom, this);
                    break;
                case 3:
                    this.dongtaiListView = new RoomDongtaiListView(list,
                        GameConfig.innerWidth / GameConfig.stageWidth, this.down_bg.height);

                    this.addChild(this.dongtaiListView);
                    this.dongtaiListView.x = GameConfig.innerWidth / 2;
                    this.dongtaiListView.y = this.down_bg.y + 20;
                    this.dongtaiListView.addEventListener(RoomDongtaiListView.CLOSE, this.removeDongtaiEvnet, this);
                    //this.dongtaiListView.addEventListener(RoomDongtaiListView.POPUP_ASSETS_LIST, this.onAssetsList, this);
                    break;
            }
        }
        private onGoinRoom(eve: BasicEvent) {
            this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM,
                { rId: eve.EventObj.rId, backType: 1, backId: this.roomInfo.rId }));
        }
        /*private onAssetsList(eve: BasicEvent) {
            this.dispatchEvent(new BasicEvent(GameRoomView.POPUP_ASSETS_LIST, { gameId: eve.EventObj.pId,backType:3 }));
        }*/
        private restoreDownBg() {
            egret.Tween.get(this.down_bg).to({ height: this.dBgDefaultH, y: this.dBgDefaultY }, 300)
                .call(this.onComplete, this, [0]);
        }


        private messageItemList: utils.VScrollerPanel;
        private messageList: MessageVO[] = [];
        private roomId: number = 0;
        private goodsId: number = 0;
        public updateMessageList(list: MessageVO[]) {
            this.messageList = list;
            this.messageList.sort(this.sortOnMessage);
            if (this.messageItemList == null) {
                this.messageItemList = new utils.VScrollerPanel();
                this.addChild(this.messageItemList);
                this.messageItemList.height = 360;
                this.messageItemList.scaleX = this.messageItemList.scaleY = GameConfig.innerScale;
                this.messageItemList.x = this.dongtai_txt.x;
                this.messageItemList.y = this.dongtai_txt.y + this.dongtai_txt.height * this.dongtai_txt.scaleY
                    + 70 * GameConfig.innerScale;
                this.messageItemList.initItemRenderer(RoomMessageListItemPanel);
                this.messageItemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            }
            this.messageItemList.bindData(this.messageList);

        }
        public sortOnMessage(a: MessageVO, b: MessageVO): number {

            if (a.createTime > b.createTime) {
                return -1;
            } else if (a.createTime < b.createTime) {
                return 1;
            } else {
                if (a.createTime > b.createTime) {
                    return 1;
                }
                else if (a.createTime < b.createTime) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: MessageVO = eve.item;
            //this.dispatchEvent(new BasicEvent(GameRoomView.POPUP_ASSETS_LIST, { gameId: item.initiateId, backType: 3 }));
        }


        public receiveSuccess(gId:number,rId:number,getNum:number) {
            if(rId==this.roomInfo.rId){
                //this.successGroup.visible=true;
                //this.successGroup.alpha = 1;
                //this.success_txt.text="恭喜你领取了"+getNum+"个金币";
                this.huxingPanel.receiveSuccess(gId);
            }
			/*egret.Tween.get(this.successGroup)
					.wait(2000)//设置等待1000毫秒;
					.to({ alpha: 0 }, 1000)
					.call(this.onCompleteFun, this, [this.successGroup]);*/
			
		}
        public plunderSuccess(gId:number,rId:number,getNum:number) {
            if(rId==this.roomInfo.rId){
                //this.successGroup.visible=true;
                //this.successGroup.alpha = 1;
                //this.success_txt.text="恭喜你掠夺了"+getNum+"个金币";
                this.huxingPanel.plunderSuccess(gId,this.selfIdNum,getNum);
            }
			/*egret.Tween.get(this.successGroup)
					.wait(2000)//设置等待1000毫秒;
					.to({ alpha: 0 }, 1000)
					.call(this.onCompleteFun, this, [this.successGroup]);*/
			
		}
        private onCompleteFun(param1: any): void {
			param1.visible = false;
		}

        public delEvent(): void {
            if(this.huxingPanel){
                this.huxingPanel.delQipaoTween();
            }

        }
    }
}