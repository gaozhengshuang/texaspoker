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

            this._roleBone.visible = this._maidInfo.robberid == 0;
            this.maidBomBgImg.visible = this._maidInfo.robberid == 0;
            if (this.isMyMaid()) {    //女仆是自己的
                this.blackMaidImg.visible = this._maidInfo.robberid != 0;
                this.helpImg.visible = this._maidInfo.robberid != 0;

                if (this._maidInfo.robberid == 0) {     //女仆没有被抢
                    this.goldImg.visible = this.isTimeGet();
                } else {    //女仆被抢了
                    this.goldImg.visible = true;
                }
            } else {    //女仆是别人的
                this.blackMaidImg.visible = false;
                this.helpImg.visible = false;
                
                if (this._maidInfo.robberid == DataManager.playerModel.getUserId()) {   //被我抢的女仆
                    this.goldImg.visible = this.isTimeGet();
                } else {    //不是我抢的女仆
                    this.goldImg.visible = false;
                }
            }

            this.updateLabelState();
        }

        private roleTouchEvent() {
            if (this.isMyMaid()) {
                if (this._maidInfo.robberid == 0) {
                    openPanel(PanelType.dress);
                } else {
                    if (this._maidInfo.houseid == MaidManager.getInstance().getCurHouseId()) { //点黑影操作
                        ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_GOIN_ROOM, {houseid: this._maidInfo.robberto, return: MaidManager.getInstance().getCurHouseId()});
                    } else {
                        sendMessage("msg.C2GW_TackBackMaid", msg.C2GW_TackBackMaid.encode({
                            id: this._maidInfo.id
                        }));
                    }
                }
            } else {
                if (this._maidInfo.robberid == 0) {
                    let dialogStr = "是否抢夺"+this._maidInfo.ownername+"家的女仆";
                    showDialog(dialogStr, "确定", function () {
                        sendMessage("msg.C2GW_RobMaid", msg.C2GW_RobMaid.encode({
                            id: this._maidInfo.id,
                            dropto: MaidManager.getInstance().getCurHouseId()
                        }));
                    }.bind(this));

                }else if (this._maidInfo.robberid == DataManager.playerModel.getUserId()) {   //我抢回来的女仆点击领取奖励
                    let dialogStr = `当前收益${this._maidInfo.earning}金币`;
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
                if (this._maidInfo.robberid == 0) {
                    if (this.isTimeGet()) {
                        this.nameLabel.strokeColor = 0x2cbc25;
                        this.TimeLabel.strokeColor = 0x2cbc25;

                        this.nameLabel.text = "";
                        this.TimeLabel.text = `Lv.${this._maidInfo.level}  可领取`;
                    } else {
                        this.nameLabel.strokeColor = 0x000000;
                        this.TimeLabel.strokeColor = 0x000000;

                        this.nameLabel.text = "生产中";
                        let timeStr = sDhFilter(Number(this.levelInfo.ProduceTime) - (Math.floor(new Date().getTime() / 1000) - Number(this._maidInfo.tmworking)), ":");
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

                this.nameLabel.text = this._maidInfo.ownername;
                if (this.isTimeGet()) {
                    this.TimeLabel.text = `Lv.${this._maidInfo.level}  可领取`;
                } else {
                    let timeStr = sDhFilter(Number(this.levelInfo.ProduceTime) - (Math.floor(new Date().getTime() / 1000) - Number(this._maidInfo.tmworking)), ":");
                    this.TimeLabel.text = `Lv.${this._maidInfo.level}  ${timeStr}`;
                }
            }
        }

        private isMyMaid() {
            return this._maidInfo.ownerid == DataManager.playerModel.getUserId();
        }

        private isTimeGet() {
            let isget = false;
            if (this.levelInfo) {
                if ((Math.floor(new Date().getTime() / 1000) - Number(this._maidInfo.tmworking)) - Number(this.levelInfo.ProduceTime) >= 0) {
                    isget = true;
                }
            }
            return isget;
        }

        private runningTimer(dt:number,body:any)
        {
            if (Number(body.levelInfo.ProduceTime) - (Math.floor(new Date().getTime() / 1000) - Number(body._maidInfo.tmworking)) >= 0) {
                body.updateLabelState();
            }
        }
    }
}