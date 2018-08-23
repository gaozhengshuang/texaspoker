module game {
    export class GameRoomView extends PanelComponent {
        public static CLOSE: string = "close";
        public static OPEN_NEIGHBOR_LIST: string = "open_neighbor_list";
        public static GOIN_ROOM: string = "goin_room";
        public static SHOW_TOP_ROOM_INFO: string = "show_top_room_info";
        public static RECEIVE: string = "receive";
        public static PLUNDER: string = "plunder";
        public static PLUNDER_ERROR: string = "plunder_error";
        public static LEVEL: string = "level";
        public static SHOW_TOP_ROOM_NUM: string = "show_top_room_num";
        public static REFRESH_LINJU: string = "refresh_linju";
        private room_bg: eui.Rect;

        private huxingGroup: eui.Group;
        private downBtnGroup: eui.Group;
        private linjuInfoGroup: eui.Group;
        private roomLevelGroup: eui.Group;
        private bootomGroup: eui.Group;
        private down_bg: eui.Group;

        private quit_btn: eui.Button;
        private lingju_btn: eui.Button;
        private dongtai_btn: eui.Button;
        private level_btn: eui.Button;
        private hideList_btn: eui.Button;

        private shualingju_btn: eui.Button;

        private xuanBtnBg: eui.Image;


        private downBtnRed1: eui.Image;
        private downBtnRed2: eui.Image;
        private downBtnRed3: eui.Image;


        private ljName_txt: eui.Label;
        private ljbName_txt: eui.Label;
        private ljHuxing_txt: eui.Label;
        private lLevel_txt: eui.Label;
        private lVip_txt: eui.Label;
        private totalChanLiang_txt: eui.Label;

        private roomLevel_txt: eui.Label;
        //private shouyi_txt: eui.Label;

        private parkingLot: CarParkingLot;
        private parkingLots: CarParkingLot[];

        public roomInfo: HouseVO;
        public selfIdNum: number | Long;

        private huxingPanel: RoomHuxingPanel;
        private scrollView: egret.ScrollView;
        private sussImg: eui.Image;

        private xuanBgPointX: number[] = [-9, 137, 284];
        private static _inMyRoom: boolean = false;
        public IsInMyRoom(): boolean {
            return this.roomLevelGroup.visible && GameRoomView._inMyRoom;
        }
        public constructor() {
            super();
            this._isShowDark = false;
            this._isShowEffect = false;
            this.adaptive();
        }
        protected getSkinName() {
            return RoomViewUISkin;
        }
        protected init() {
            this.hideList_btn.visible = false;
            this.shualingju_btn.visible = false;
            this.xuanBtnBg.visible = false;

            this.downBtnRed1.visible = false;
            this.downBtnRed2.visible = false;
            this.downBtnRed3.visible = false;
            this.sussImg.visible = false;
        }
        protected beforeShow() {
            this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_begin, this);
            this.lingju_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_lingju, this);
            this.dongtai_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_dongtai, this);
            this.level_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            this.hideList_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_hideList, this);
            this.shualingju_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_shualingju, this);

        }
        private downBgScaleH: number = 1;
        private dBgDefaultH: number = 0;
        private dBgDefaultY: number = 0;
        private adaptive() {

            this.huxingGroup.touchEnabled = false;
            this.huxingGroup.touchChildren = false;

            this.down_bg.y = gameConfig.curHeight() - this.down_bg.height;

            this.bootomGroup.y = gameConfig.curHeight() - this.bootomGroup.height - 100;
            this.downBtnGroup.y = this.down_bg.y - this.downBtnGroup.height / 2 + 20;

            this.hideList_btn.y = gameConfig.curHeight() - 60 - this.hideList_btn.height / 2;
            this.shualingju_btn.y = this.hideList_btn.y;

            this.oldY = this.down_bg.y;
            this.oldH = this.down_bg.height;
            this.oldBtnY = this.downBtnGroup.y;

        }
        private returnType: number = 0;
        public initInfo(rVo: HouseVO, selfId: number | Long, retType: number = 0) {
            this.roomInfo = rVo;
            this.selfIdNum = selfId;
            this.returnType = retType;
            if (this.roomInfo.bId <= 0) {
                this.roomLevel_txt.text = "房屋等级" + this.roomInfo.level + "(租)";
            } else {
                this.roomLevel_txt.text = "房屋等级" + this.roomInfo.level;
            }
            this.totalChanLiang_txt.text = "当前收益:" + this.getTotalChanLiang();
            if (this.selfIdNum == this.roomInfo.ownerid) {
                this.showSelf();
                this.lingju_btn.visible = true;

                if (this.returnType > 0) {
                    switch (this.returnType) {
                        case 1:
                            this.showlist(1);
                            break;
                        case 2:
                            this.showlist(3);
                            break;
                    }
                }
            } else {
                this.showOthers();
                this.lingju_btn.visible = false;
            }
            if (!this.huxingPanel) {
                this.huxingPanel = new RoomHuxingPanel(this);

                this.scrollView = new egret.ScrollView();
                //设置滚动内容
                this.scrollView.setContent(this.huxingPanel);

                //垂直滚动设置为 on 
                this.scrollView.verticalScrollPolicy = "on";
                //水平滚动设置为 auto
                this.scrollView.horizontalScrollPolicy = "on";
                this.scrollView.bounces = false;
                //scrollView.y=100;
                this.addChild(this.scrollView);
                this.swapChildren(this.scrollView, this.huxingGroup);
            }
            //设置滚动区域宽高
            this.scrollView.width = gameConfig.curWidth();
            this.scrollView.height = gameConfig.curHeight();
            this.scrollView.setScrollLeft(this.huxingPanel.width / 2 - this.scrollView.width / 2, 0)
            this.huxingPanel.init(this.roomInfo);

            //scrollView.setScrollTop(this.huxingPanel.height / 2 - scrollView.height / 2, 0)

            this.showParkingLotList();
        }

        public haveNewDongtai(isRed: number) {
            if (isRed == 1) {
                this.downBtnRed1.visible = true;
            }
            else {
                this.downBtnRed1.visible = false;
            }

        }
        public updateInfo(rVo: HouseVO, selfId: number) {
            this.roomInfo = rVo;
            this.selfIdNum = selfId;
            if (this.roomInfo.bId <= 0) {
                this.roomLevel_txt.text = "房屋等级" + this.roomInfo.level + "(租)";
            } else {
                this.roomLevel_txt.text = "房屋等级" + this.roomInfo.level;
            }

            this.totalChanLiang_txt.text = "预计当前收益:" + this.getTotalChanLiang();
            if (this.selfIdNum == this.roomInfo.ownerid) {
                this.showSelf();
                this.lingju_btn.visible = true;
            } else {
                this.showOthers();
                this.lingju_btn.visible = false;
            }
            if (this.huxingPanel) {
                this.huxingPanel.update(this.roomInfo);
            }
            if (this.listIndex > 0 && this.itemList) {
                this.bindDataList(this.listIndex, 2);
            }
        }

        private getTotalChanLiang(): number {
            let num: number = 0;
            if (this.roomInfo && this.roomInfo.housecells) {
                for (let i: number = 0; i < this.roomInfo.housecells.length; i++) {
                    let type: any = table.THouseCellById[this.roomInfo.housecells[i].tid];
                    if (type) {
                        num += type.ProduceGold;
                    }
                }
            }
            return num;
        }
        private showSelf() {
            console.log("sssaa:" + this.roomInfo.robcheckflag);
            this.haveNewDongtai(this.roomInfo.robcheckflag);
            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: true, room: this.roomInfo }));
            this.linjuInfoGroup.visible = false;
            this.roomLevelGroup.visible = true;
            this.downBtnGroup.visible = true;
            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_NUM, { isShow: true, rId: this.roomInfo.rId }));

        }
        private showOthers() {

            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_INFO, { isShow: false }));
            this.linjuInfoGroup.visible = true;
            this.roomLevelGroup.visible = false;
            this.downBtnGroup.visible = false;


            this.ljName_txt.text = this.roomInfo.ownername;
            //this.ljbName_txt.text = "";
            this.ljHuxing_txt.text = "" + this.roomInfo.rId;
            this.dispatchEvent(new BasicEvent(GameRoomView.SHOW_TOP_ROOM_NUM, { isShow: false }));
        }

        public receiveCoin(coinId: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.RECEIVE,
                { index: coinId, houseid: this.roomInfo.rId }));
        }

        public plunderCoin(coinId: number) {
            if (DataManager.playerModel.getUserInfo().robcount <= 0) {
                game.showTips("抢夺次数不足!", true);
            } else {
                this.dispatchEvent(new BasicEvent(GameRoomView.PLUNDER,
                    { index: coinId, houseid: this.roomInfo.rId }));
            }
        }

        public levelFun(item: any) {
            if (item.index <= 0) {
                this.dispatchEvent(new BasicEvent(GameRoomView.LEVEL,
                    { index: 0, houseid: this.roomInfo.rId }));
            } else {
                if (item.hLevel < item.lockLevel) {
                    //game.showTips("房屋"+item.lockLevel+"级解锁，请先提升房屋等级!", true);
                } else {
                    if (item.data.level >= this.roomInfo.level) {
                        // game.showTips("房屋等级不足，请先提升房屋等级!", true);
                    } else {
                        this.dispatchEvent(new BasicEvent(GameRoomView.LEVEL,
                            { index: item.index, houseid: this.roomInfo.rId }));
                    }
                }

            }
        }
        public plunderCoinError(eid: number) {
            this.dispatchEvent(new BasicEvent(GameRoomView.PLUNDER_ERROR, { eid: eid }));
        }

        private onclick_begin() {
            this.beforeRemove();
            this.dispatchEvent(new BasicEvent(GameRoomView.CLOSE, { userid: this.roomInfo.ownerid }));
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
        private onclick_shualingju() {
            this.dispatchEvent(new BasicEvent(GameRoomView.REFRESH_LINJU));
        }

        private onclick_hideList() {
            this.hideItemList();
            this.hideList_btn.visible = false;
            this.shualingju_btn.visible = false;
            this.xuanBtnBg.visible = false;
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
            if (this.goalY == -1) { this.goalY = gameConfig.curHeight() / 4 };
            if (this.goalH == -1) { this.goalH = gameConfig.curHeight() * 3 / 4 };
            if (this.btnGoalY == -1) {
                this.btnGoalY = gameConfig.curHeight() / 4 - this.downBtnGroup.height / 2 + 20
            }
            this.listIndex = index;
            console.log(this.goalH + "//" + this.goalY + "//" + GameConfig.innerHeight);

            if (this.downBtnGroup.y != this.btnGoalY && this.down_bg.y != this.goalY) {
                egret.Tween.get(this.downBtnGroup).to({ y: this.btnGoalY }, 300).
                    call(this.onComplete, this, [this.listIndex]);
                egret.Tween.get(this.down_bg).to({ height: this.goalH, y: this.goalY }, 300)

            } else {
                this.onComplete(this.listIndex);
            }
        }

        private onComplete(index: number): void {
            this.hideList_btn.visible = true;
            this.showItemList(index);
            egret.Tween.removeTweens(this.downBtnGroup);
            egret.Tween.removeTweens(this.down_bg);
            this.xuanBtnBg.visible = true;
            this.xuanBtnBg.x = this.xuanBgPointX[index - 1];
        }

        private itemList: utils.ScrollerPanel;
        private showItemList(index: number) {
            this.hideItemList();
            if (this.itemList == null) {
                this.itemList = new utils.VScrollerPanel();
                this.addChild(this.itemList);
                this.itemList.x = 0;
                this.itemList.y = this.downBtnGroup.y + this.downBtnGroup.height + 10;
                this.itemList.height = (this.hideList_btn.y - 10) -
                    (this.downBtnGroup.y + this.downBtnGroup.height + 10);
                switch (index) {

                    case 1:
                        this.itemList.initItemRenderer(RoomMessageListItemPanel2);
                        if (this.downBtnRed1.visible) {
                            sendMessage("msg.C2GW_ReqResetRobCheckFlag",
                                msg.C2GW_ReqResetRobCheckFlag.encode({ houseid: this.roomInfo.rId }));
                            this.downBtnRed1.visible = false;
                        }

                        break;
                    case 2:
                        this.itemList.initItemRenderer(RoomUplevelListItemPanel);
                        break;
                    case 3:
                        this.itemList.initItemRenderer(NeighborListItemPanel);
                        break;
                }
                this.itemList.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
                this.itemList.dataList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouchTap, this);
            }
            this.bindDataList(index, 1);

        }
        private hideItemList() {
            if (this.itemList != null) {
                this.itemList.parent.removeChild(this.itemList);
                this.itemList = null;
            }
        }
        private bindDataList(index: number, type: number = 1) {
            switch (index) {
                case 1:
                    if (this.roomInfo.visitinfo) {
                        this.showDongtaiList(this.roomInfo.visitinfo);
                        this.shualingju_btn.visible = false;
                        this.hideList_btn.x = 285;
                    }
                    break;
                case 2:
                    this.showLevelList();
                    this.shualingju_btn.visible = false;
                    this.hideList_btn.x = 285;
                    break;
                case 3:
                    if (type == 1) {
                        this.dispatchEvent(new BasicEvent(GameRoomView.REFRESH_LINJU));
                    } else {
                        this.dispatchEvent(new BasicEvent(GameRoomView.OPEN_NEIGHBOR_LIST));
                    }

                    this.shualingju_btn.visible = true;
                    this.hideList_btn.x = 177;
                    break;
            }
        }
        private onItemTouch(eve: eui.ItemTapEvent) {
            let item: any = null;
            switch (this.listIndex) {
                case 1:
                    item = this.dongtaiList[eve.itemIndex];
                    if (item) {
                        this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM, { userid: item.visitorid, return: this.roomInfo, type: 1 }));
                    }
                    break;
                /* case 2:
                     item = this.levelInfoList[eve.itemIndex];
                     if (item) {
                         this.levelFun(item);
                     }
                     break;*/
                case 3:
                    this.onclick_hideList();
                    item = this.linjuList[eve.itemIndex];
                    if (item) {
                        this.dispatchEvent(new BasicEvent(GameRoomView.GOIN_ROOM, { userid: item.ownerid, return: this.roomInfo, type: 2 }));
                    }
                    break;
            }
        }
        private onItemTouchTap(eve: TouchEvent) {
            console.log(eve.target["name"]);
            let item: any = eve.target["parent"].itemDate;
            switch (this.listIndex) {
                case 2:
                    if (item) {
                        if (eve.target["name"] == "levelBtnGruop") {
                            this.levelFun(item);
                        }
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
            this.levelInfoList[0] = {
                index: 0, data: this.roomInfo,
                name: "房屋", hLevel: this.roomInfo.level, lockLevel: 0
            };
            this.levelInfoList[1] = {
                index: 1, data: this.getCellInfo(1),
                name: "客厅", hLevel: this.roomInfo.level, lockLevel: this.getOpenLockLevel(1)
            };
            this.levelInfoList[2] = {
                index: 2, data: this.getCellInfo(2),
                name: "卧室", hLevel: this.roomInfo.level, lockLevel: this.getOpenLockLevel(2)
            };
            this.levelInfoList[3] = {
                index: 3, data: this.getCellInfo(3),
                name: "厕所", hLevel: this.roomInfo.level, lockLevel: this.getOpenLockLevel(3)
            };
            this.levelInfoList[4] = {
                index: 4, data: this.getCellInfo(4),
                name: "厨房", hLevel: this.roomInfo.level, lockLevel: this.getOpenLockLevel(4)
            };
            this.itemList.bindData(this.levelInfoList);
        }
        private getOpenLockLevel(index): number {
            let level: number = 0;
            let houseTypeObj = table.THouseById[this.roomInfo.tId];
            if (houseTypeObj) {
                let cStrArr: string[] = houseTypeObj.Cells.split("|");
                if (cStrArr && cStrArr.length > 0) {
                    for (let i: number = 0; i < cStrArr.length; i++) {
                        let item: string[] = cStrArr[i].split("-");
                        if (item && item.length >= 2) {
                            if (index == Number(item[0])) {
                                level = Number(item[1]);
                                return level;
                            }
                        }
                    }
                }

            }

            return level;
        }

        //车库列表
        public showParkingLotList() {
            //console.log("showParkingLotList");
            let self = this;

            for (let index = 1; index < self.bootomGroup.numChildren; index++) {
                self.bootomGroup.removeChildAt(self.bootomGroup.numChildren - 1);
            }
            self.parkingLot.visible = false;
            self.parkingLots = [];

            let _showParkingLotList: Function = function (parkingDatas: msg.IParkingData[]) {
                //console.log("回调_showParkingLotList------->",parkingDatas.length);
                if (parkingDatas && parkingDatas.length > 0) {
                    parkingDatas.forEach((data, index, array) => {
                        //console.log("车位赋值--->",data.ownername+" "+data.houseid+" "+self.roomInfo.rId);
                        if (data.houseid == self.roomInfo.rId) {
                            if (self.parkingLots.length == 0) {
                                self.parkingLot.setData(data);
                                self.parkingLot.visible = true;
                                self.parkingLots.push(self.parkingLot);
                            }
                            else {
                                let _parkingLot: CarParkingLot = new CarParkingLot();
                                self.bootomGroup.addChild(_parkingLot);
                                _parkingLot.x = self.parkingLot.x;
                                _parkingLot.y = self.parkingLot.y + 100;
                                _parkingLot.setData(data);
                                self.parkingLots.push(_parkingLot);
                            }
                        }
                    });
                };
            };
            CarManager.getInstance().ReqParkingInfoByType(0, this.roomInfo.ownerid, _showParkingLotList);
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

        public receiveSuccess(houseid: number, index: number, getNum: number) {
            if (houseid == this.roomInfo.rId) {
                this.huxingPanel.receiveSuccess(index, getNum);
            }

        }
        public plunderSuccess(houseid: number, index: number, getNum: number) {
            if (houseid == this.roomInfo.rId) {
                this.huxingPanel.plunderSuccess(index, getNum);
            }
        }
        public levelSuccess(index: number) {
            //showTipsImage('resource/assets/levelSuccessImg1.png')
            this.levelSuccessAction();
        }
        private levelSuccessAction() {
            this.addChildAt(this.sussImg, this.numChildren - 1);
            this.sussImg.x = gameConfig.curWidth() / 2;
            this.sussImg.y = gameConfig.curHeight() / 2;
            this.sussImg.scaleX = this.sussImg.scaleY = 0.3;
            this.sussImg.alpha = 0;
            this.sussImg.visible = true;

            egret.Tween.get(this.sussImg)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300)
                .wait(300)
                .to({ y: this.sussImg.y - 60, alpha: 0 }, 300)
                .call(this.levelSuccessComplete, this, [this.sussImg]);//设置回调函数及作用域，可用于侦听动画完成

        }
        private levelSuccessComplete(param1: eui.Image): void {
            egret.Tween.removeTweens(param1);
            this.sussImg.visible = false;
        }
        private onCompleteFun(param1: any): void {
            param1.visible = false;
        }

        public delEvent(): void {
            if (this.huxingPanel) {
                this.huxingPanel.delQipaoTween();
            }

        }

        protected beforeRemove() {
            console.log("房屋界面关闭");
            GameRoomView._inMyRoom = false;
            this.parkingLots.forEach(item => {
                item.removeTimer();
            })
        }

        private static _instance: GameRoomView = null;
        public static getInstance(): GameRoomView {
            if (!GameRoomView._instance) {
                GameRoomView._instance = new GameRoomView();
            }
            return GameRoomView._instance;
        }

    }
}