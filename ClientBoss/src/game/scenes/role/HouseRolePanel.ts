module game {
    export class HouseRolePanel extends BaseUIComponent<any> {
        private grp_role: eui.Group;

        private goldImg: eui.Image;
        private helpImg: eui.Image;
        private blackMaidImg: eui.Image;
        private maidBomBgImg: eui.Image;

        private nameLabel: eui.Label;
        private TimeLabel: eui.Label;

        private _roleBone: RoleBone;
        private _maidInfo: msg.IHouseMaidData;

        private levelInfo: table.ITLevelMaidDefine;

        private needRobCount: number = 2;

        protected getSkinName() {
            return HouseRoleSkin;
        }

        protected init() {
        }

        protected beforeShow() {
            this.registerEvent();
            this.initRole();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            this.grp_role.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roleTouchEvent, this);
            this.goldImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldTouchEvent, this);

            NotificationCenter.addObserver(this, this.OnHouseMaidUpdate, MaidManager.MAID_UPDATE);
        }

        private removeEvent() {
            this.grp_role.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.roleTouchEvent, this);
            this.goldImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.goldTouchEvent, this);

            NotificationCenter.removeObserver(this, MaidManager.MAID_UPDATE);

            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }

        public initRole() {
            this._maidInfo = this.data;

            this._roleBone = new RoleBone();
            this._roleBone.initRoleData(this._maidInfo.sex, this._maidInfo.clothes);
            this._roleBone.scaleX = 0.4;
            this._roleBone.scaleY = 0.4;
            this._roleBone.anchorOffsetX = this._roleBone.width/2;
            this._roleBone.anchorOffsetY = this._roleBone.height;
            this._roleBone.x = this.grp_role.width/2;
            this._roleBone.y = this.grp_role.height;
            this.grp_role.addChild(this._roleBone);
            this._roleBone.useGirlSpine(actionType.Idle);

            this.updateView();

            SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
        }

        private OnHouseMaidUpdate() {
            for(let i=0; i<MaidManager.getInstance().getHouseMaidInfo().maids.length; i++) {
                let maidInfo = MaidManager.getInstance().getHouseMaidInfo().maids[i];
                if (maidInfo.id == this._maidInfo.id) {
                    this._maidInfo = maidInfo;
                    break;
                }
            }

            this._roleBone.updateBones(this._maidInfo.clothes);
        }

        private updateView() {
            this.levelInfo = table.TLevelMaidById[this._maidInfo.level];
            if(!this.levelInfo) return;

            if (this.isMyMaid()) {    //女仆是自己的
                this.helpImg.visible = this.isRobber();

                if (this.isInMyHouse()) {
                    this._roleBone.visible = !this.isRobber();
                    this.maidBomBgImg.visible = !this.isRobber();
                    this.blackMaidImg.visible = this.isRobber();

                    if (!this.isRobber()) {     //女仆没有被抢
                        this.goldImg.visible = this.isTimeGet();
                    } else {    //女仆被抢了
                        this.goldImg.visible = false;
                    }
                } else {
                    this._roleBone.visible = true;
                    this.maidBomBgImg.visible = true;
                    this.blackMaidImg.visible = false;
                    this.goldImg.visible = false;
                }
            } else {    //女仆是别人的
                this.blackMaidImg.visible = false;
                this.helpImg.visible = false;
                
                if (this._maidInfo.robberid == DataManager.playerModel.getUserId()) {   //被我抢的女仆
                    this.goldImg.visible = this.isTimeGet();
                } else {    //不是我抢的女仆
                    this.goldImg.visible = false;
                }
                
                if (this.isInMyHouse()) {
                    this._roleBone.visible = true;
                    this.maidBomBgImg.visible = true;
                } else {
                    this._roleBone.visible = !this.isRobber();
                    this.maidBomBgImg.visible = !this.isRobber();
                }
            }

            this.updateLabelState();
        }

        private roleTouchEvent() {
            if (this.isMyMaid()) {
                if (!this.isRobber()) {
                    openPanel(PanelType.dress);
                } else {
                    if (this._maidInfo.houseid == MaidManager.getInstance()._curSelHouse) { //点黑影操作
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM, {houseid: this._maidInfo.robberto, return: MaidManager.getInstance()._curSelHouse});
                    } else {
                        sendMessage("msg.C2GW_TackBackMaid", msg.C2GW_TackBackMaid.encode({
                            id: this._maidInfo.id
                        }));
                    }
                }
            } else {
                if (!this.isRobber()) {
                    let dialogStr = "是否抢夺"+this._maidInfo.ownername+"家的女仆";
                    showDialog(dialogStr, "确定", function () {
                        if (DataManager.playerModel.userInfo.robcount >= this.needRobCount) {
                            sendMessage("msg.C2GW_RobMaid", msg.C2GW_RobMaid.encode({
                                id: this._maidInfo.id,
                                dropto: MaidManager.getInstance()._startHouse
                            }));
                        } else {
                            showTips("体力不足，无法抢夺对方女仆!", true);
                        }
                    }.bind(this));

                }else if (this._maidInfo.robberid == DataManager.playerModel.getUserId()) {   //我抢回来的女仆点击领取奖励
                    let leftTime = SysTimeEventManager.getInstance().systimeNum - Number(this._maidInfo.tmworking);
                    if (leftTime > this.levelInfo.ProduceTime) {
                        leftTime = Number(this.levelInfo.ProduceTime);
                    }
                    let getGold = leftTime * (this.levelInfo.ProduceGold / Number(this.levelInfo.ProduceTime));
                    let dialogStr = `当前女仆收益${getGold}/${this.levelInfo.ProduceGold}金币,\n是否送回?`;
                    showDialog(dialogStr, "送回", function () {
                        sendMessage("msg.C2GW_SendBackMaid", msg.C2GW_SendBackMaid.encode({
                            id: this._maidInfo.id
                        }));
                    }.bind(this));
                }

            }
        }

        private goldTouchEvent() {
            if (this.isMyMaid()) {
                sendMessage("msg.C2GW_TakeMaidEarning", msg.C2GW_TakeMaidEarning.encode({
                    id: this._maidInfo.id
                }));
            }
        }

        private updateLabelState() {
            if (this.isMyMaid()) {
                if (!this.isRobber()) {
                    if (this.isTimeGet()) {
                        this.nameLabel.strokeColor = 0x2cbc25;
                        this.TimeLabel.strokeColor = 0x2cbc25;

                        this.nameLabel.text = "";
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  可领取`;
                    } else {
                        this.nameLabel.strokeColor = 0x000000;
                        this.TimeLabel.strokeColor = 0x000000;

                        this.nameLabel.text = "生产中";
                        let timeStr = sDhFilter(Number(this.levelInfo.ProduceTime) - (SysTimeEventManager.getInstance().systimeNum - Number(this._maidInfo.tmworking)), ":");
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  ${timeStr}`;
                    }
                } else {
                    this.nameLabel.strokeColor = 0x000000;
                    this.TimeLabel.strokeColor = 0x000000;

                    this.nameLabel.text = "";
                    this.TimeLabel.text = `Lv.${this._maidInfo.level}  被掠夺`;
                }
            } else {
                this.nameLabel.strokeColor = 0x000000;
                this.TimeLabel.strokeColor = 0x000000;

                this.nameLabel.text = this._maidInfo.ownername+"的女仆";
                if (this.isInMyHouse()) {
                    if (this.isTimeGet()) {
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  可领取`;
                    } else {
                        let timeStr = sDhFilter(Number(this.levelInfo.ProduceTime) - (SysTimeEventManager.getInstance().systimeNum - Number(this._maidInfo.tmworking)), ":");
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  ${timeStr}`;
                    }
                } else {
                    if (this.isRobber()) {
                        this.nameLabel.text = "";
                        this.TimeLabel.text = "";
                    } else {
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  可掠夺`;
                    }
                }
            }
        }

        private isMyMaid() {
            return this._maidInfo.ownerid == DataManager.playerModel.getUserId();
        }

        private isInMyHouse() {
            return MaidManager.getInstance()._startHouse == MaidManager.getInstance()._curSelHouse;
        }

        private isRobber() {
            return this._maidInfo.robberid != 0;
        }

        private isTimeGet() {
            let isget = false;
            if (this.levelInfo) {
                if ((SysTimeEventManager.getInstance().systimeNum - Number(this._maidInfo.tmworking)) - Number(this.levelInfo.ProduceTime) >= 0) {
                    isget = true;
                }
            }
            return isget;
        }

        private runningTimer(dt:number,body:any) {
            let leftTime = Number(body.levelInfo.ProduceTime) - (SysTimeEventManager.getInstance().systimeNum - Number(body._maidInfo.tmworking));
            if (leftTime >= 0) {
                body.updateLabelState();
                if (leftTime == 0) {
                    body.goldImg.visible = body.isMyMaid();
                }
            }
        }
    }
}