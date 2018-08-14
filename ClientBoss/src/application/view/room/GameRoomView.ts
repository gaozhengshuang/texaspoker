module game {
    export class GameRoomView extends eui.Component {
        public static CLOSE: string = "close";
        public static OPEN_NEIGHBOR_LIST: string = "open_neighbor_list";
        //public static OPEN_DONGTAI_LIST: string = "open_dongtai_list";
        public static GOIN_ROOM: string = "goin_room";
        public static SHOW_TOP_ROOM_INFO: string = "show_top_room_info";
        public static RECEIVE: string = "receive";
        public static PLUNDER: string = "plunder";
        public static PLUNDER_ERROR: string = "plunder_error";

        private room_bg: eui.Rect;

        private huxingGroup: eui.Group;
        private downBtnGroup: eui.Group;
        private linjuInfoGroup: eui.Group;
        private roomLevelGroup: eui.Group;

        private down_bg: eui.Image;

        private quit_btn: eui.Button;
        private lingju_btn: eui.Button;
        private dongtai_btn: eui.Button;
        private level_btn: eui.Button;
        private hideList_btn: eui.Button;

        private ljName_txt: eui.Label;
        private ljbName_txt: eui.Label;
        private ljHuxing_txt: eui.Label;
        private lLevel_txt: eui.Label;
        private lVip_txt: eui.Label;

        private roomLevel_txt: eui.Label;
        private shouyi_txt: eui.Label;

        public roomInfo: HouseVO;
        public selfIdNum: number;

        private huxingPanel: RoomHuxingPanel;

        public constructor() {
            super();
            this.skinName = "resource/skins/RoomViewUISkin.exml";
            this.adaptive();

            this.hideList_btn.visible = false;

            this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
            this.lingju_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lingju, this);
            this.dongtai_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_dongtai, this);
            this.level_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            this.hideList_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_hideList, this);

        }
        private downBgScaleH: number = 1;
        private dBgDefaultH: number = 0;
        private dBgDefaultY: number = 0;
        private adaptive() {

            this.room_bg.width = GameConfig.innerWidth;
            this.room_bg.height = GameConfig.innerHeight;

            this.huxingGroup.touchEnabled = false;
            this.huxingGroup.touchChildren = false;

            this.down_bg.scaleX = this.down_bg.scaleY = GameConfig.innerScaleW;
            this.down_bg.x = 0; this.down_bg.y = GameConfig.innerHeight - this.down_bg.height * GameConfig.innerScaleW;

            this.downBtnGroup.scaleX = this.downBtnGroup.scaleY = GameConfig.innerScale;
            this.downBtnGroup.y = this.down_bg.y - (this.downBtnGroup.height * GameConfig.innerScale / 2)
                + 20 * GameConfig.innerScaleW;

            this.roomLevelGroup.scaleX = this.roomLevelGroup.scaleY = GameConfig.innerScale;
            this.roomLevelGroup.x = GameConfig.innerWidth / 2 -
                this.roomLevelGroup.width * GameConfig.innerScale / 2;

            this.roomLevelGroup.y = 160 * GameConfig.innerScale;

            this.quit_btn.scaleX = this.quit_btn.scaleY = GameConfig.innerScale;
            this.quit_btn.y = 160 * GameConfig.innerScale;

            this.linjuInfoGroup.scaleX = this.linjuInfoGroup.scaleY = GameConfig.innerScale;
            this.linjuInfoGroup.x = GameConfig.innerWidth - this.linjuInfoGroup.width * GameConfig.innerScale;
            this.linjuInfoGroup.y = 160 * GameConfig.innerScale;

            this.hideList_btn.scaleX = this.hideList_btn.scaleY = GameConfig.innerScale;
            this.hideList_btn.x = GameConfig.innerWidth / 2 - this.hideList_btn.width * GameConfig.innerScale / 2;
            this.hideList_btn.y = GameConfig.innerHeight - 30 - this.hideList_btn.height * GameConfig.innerScale / 2;

            this.oldY = this.down_bg.y;
            this.oldH = this.down_bg.height;
            this.oldBtnY = this.downBtnGroup.y;

        }
        public updateInfo(rVo: HouseVO, selfId: number) {
            this.roomInfo = rVo;
            this.selfIdNum = selfId;
            this.roomLevel_txt.text = "房屋等级" + this.roomInfo.level;
            if (this.selfIdNum == this.roomInfo.ownerid) {
                this.showSelf();
                this.lingju_btn.visible = true;
            } else {
                this.showOthers();
                this.lingju_btn.visible = false;
            }

            this.huxingPanel = new RoomHuxingPanel(this);


            var scrollView: egret.ScrollView = new egret.ScrollView();
            //设置滚动内容
            scrollView.setContent(this.huxingPanel);
            //设置滚动区域宽高
            scrollView.width = GameConfig.innerWidth;
            scrollView.height = GameConfig.innerHeight;
            //垂直滚动设置为 on 
            scrollView.verticalScrollPolicy = "on";
            //水平滚动设置为 auto
            scrollView.horizontalScrollPolicy = "on";
            //scrollView.y=100;

            this.huxingPanel.init(this.roomInfo);

            scrollView.bounces = false;

            scrollView.setScrollLeft(this.huxingPanel.width / 2 - scrollView.width / 2, 0)

            //scrollView.setScrollTop(this.huxingPanel.height / 2 - scrollView.height / 2, 0)

            this.addChild(scrollView);
            this.swapChildren(scrollView, this.huxingGroup);



        }
        private showSelf() {
            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: true, room: this.roomInfo }));
            this.linjuInfoGroup.visible = false;
            this.roomLevelGroup.visible = true;
            this.downBtnGroup.visible=true;

        }
        private showOthers() {

            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: false }));
            this.linjuInfoGroup.visible = true;
            this.roomLevelGroup.visible = false;
            this.downBtnGroup.visible=false;


            this.ljName_txt.text = this.roomInfo.ownername;
            //this.ljbName_txt.text = "";
            this.ljHuxing_txt.text = ""+this.roomInfo.rId;
        }

        public receiveCoin(coinId: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.RECEIVE,
                { index:coinId, houseid: this.roomInfo.rId }));
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

        private onclick_lingju() {
            this.showlist(3);
        }
        private onclick_dongtai() {
            this.showlist(1);
        }
        private onclick_level() {
            this.showlist(2);
        }


        private onclick_hideList() {
            this.hideItemList();
            this.hideList_btn.visible = false;
            this.listIndex = 0;
            egret.Tween.get(this.downBtnGroup).to({ y: this.oldBtnY }, 300);
            egret.Tween.get(this.down_bg).to({ height: this.oldH, y: this.oldY }, 300)

        }

        private oldY: number = 0;
        private oldH: number = 0;
        private oldBtnY: number = 0;
        private listIndex: number = 1;

        private goalY: number = -1;
        private goalH: number = -1;
        private btnGoalY: number = -1;

        private showlist(index) {
            if (this.goalY == -1) { this.goalY = GameConfig.innerHeight / 4 };
            if (this.goalH == -1) { this.goalH = GameConfig.innerHeight };
            if (this.btnGoalY == -1) {
                this.btnGoalY = this.goalY - (this.downBtnGroup.height * GameConfig.innerScale / 2)
                    + 20 * GameConfig.innerScaleW;
            }
            this.listIndex = index;

            if (this.downBtnGroup.y != this.btnGoalY && this.down_bg.y != this.goalY) {
                egret.Tween.get(this.downBtnGroup).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, [this.listIndex]);
                egret.Tween.get(this.down_bg).to({ height: this.goalH, y: this.goalY }, 300)
                    
            }else{
                this.onComplete(this.listIndex);
            }
        }

        private onComplete(index: number): void {
            this.hideList_btn.visible = true;
            this.showItemList(index);
            egret.Tween.removeTweens(this.downBtnGroup);
            egret.Tween.removeTweens(this.down_bg);
        }

        private itemList: utils.ScrollerPanel;
        private showItemList(index: number) {
            this.hideItemList();
            if (this.itemList == null) {
                this.itemList = new utils.VScrollerPanel();
                this.addChild(this.itemList);
                this.itemList.x = 0;
                this.itemList.y = this.downBtnGroup.y + this.downBtnGroup.height * GameConfig.innerScale;
                this.itemList.height = (this.hideList_btn.y - 20) -
                    (this.downBtnGroup.y + this.downBtnGroup.height * GameConfig.innerScale + 20);
                switch (index) {

                    case 1:
                        this.itemList.initItemRenderer(RoomMessageListItemPanel2);
                        break;
                    case 2:
                        this.itemList.initItemRenderer(RoomUplevelListItemPanel);
                        break;
                    case 3:
                        this.itemList.initItemRenderer(NeighborListItemPanel);
                        break;
                }
                this.itemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            }
            this.bindDataList(index);

        }
        private hideItemList() {
            if (this.itemList != null) {
                this.itemList.parent.removeChild(this.itemList);
                this.itemList = null;
            }
        }
        private bindDataList(index: number) {
            switch (index) {
                case 1:
                    if(this.roomInfo.visitinfo){
                        this.showDongtaiList(this.roomInfo.visitinfo);
                    }
                    break;
                case 2:
                    this.showLevelList();
                    break;
                case 3:
                    this.dispatchEvent(new BasicEvent(GameRoomView.OPEN_NEIGHBOR_LIST));
                    break;
            }
        }
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: any = null;
            switch (this.listIndex) {
                case 1:
                    item= this.dongtaiList[eve.itemIndex];
                    if (item) {
                        //this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM,{rId:item.rId}));
                    }
                    break;
                case 2:
                    item = this.levelInfoList[eve.itemIndex];
                    if (item) {
                        //this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM,{rId:item.rId}));
                    }
                    break;
                case 3:
                    item = this.linjuList[eve.itemIndex];
                    if (item) {
                        this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM,{userid:item.ownerid}));
                    }
                    break;
            }
        }

        /**
         * 动态列表
         */
        private dongtaiList: any[];
        public showDongtaiList(list: any[]) {
            this.dongtaiList = list;
            if (this.itemList && this.listIndex == 1) {
                this.itemList.bindData(this.dongtaiList);
            }
        }

        /**
         * 邻居列表
         */
        private linjuList: HouseVO[];
        public showLinjuList(list: HouseVO[]) {
            this.linjuList = list;
            if (this.itemList && this.listIndex == 3) {
                this.itemList.bindData(this.linjuList);
            }
        }

        private levelInfoList: any[];
        /**
         * 升级列表
         */
        public showLevelList() {
            this.levelInfoList = []
            this.levelInfoList[0] = { index: 1, data: this.roomInfo, name: "房屋" };
            this.levelInfoList[1] = { index: 2, data: this.getCellInfo(1), name: "卧室" };
            this.levelInfoList[2] = { index: 3, data: this.getCellInfo(2), name: "客厅" };
            this.levelInfoList[3] = { index: 4, data: this.getCellInfo(3), name: "厕所" };
            //this.levelInfoList[3]={index:5,data:this.getCellInfo(4),name:"厨房"};
            this.itemList.bindData(this.levelInfoList);
        }
        private getCellInfo(index: number): any {
            let cell: any = null;
            if (this.roomInfo) {
                for (let i: number = 0; i < this.roomInfo.housecells.length; i++) {
                    if (this.roomInfo.housecells[i].index == index) {
                        cell = this.roomInfo.housecells[i];
                    }
                }
            }
            return cell;
        }


        private onGoinRoom(eve: BasicEvent) {
            this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM,
                { rId: eve.EventObj.rId, backType: 1, backId: this.roomInfo.rId }));
        }
        private restoreDownBg() {
            egret.Tween.get(this.down_bg).to({ height: this.dBgDefaultH, y: this.dBgDefaultY }, 300)
                .call(this.onComplete, this, [0]);
        }





        public receiveSuccess(gId: number, rId: number, getNum: number) {
            if (rId == this.roomInfo.rId) {

                this.huxingPanel.receiveSuccess(gId);
            }

        }
        public plunderSuccess(gId: number, rId: number, getNum: number) {
            if (rId == this.roomInfo.rId) {
                this.huxingPanel.plunderSuccess(gId, this.selfIdNum, getNum);
            }

        }
        private onCompleteFun(param1: any): void {
            param1.visible = false;
        }

        public delEvent(): void {
            if (this.huxingPanel) {
                this.huxingPanel.delQipaoTween();
            }

        }
    }
}