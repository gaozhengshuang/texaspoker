module game {
    export class HouseRolePanel extends BaseUIComponent<any> {
        private grp_role: eui.Group;
        private _roleBone: RoleBone;
        private _maidInfo: msg.IHouseMaidData;

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
            NotificationCenter.addObserver(this, this.OnHouseMaidUpdate, PlayerModel.HOUSEMAID_UPDATE);

            this.grp_role.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roleTouchEvent, this);
        }

        private removeEvent() {
            NotificationCenter.removeObserver(this, PlayerModel.HOUSEMAID_UPDATE);

            this.grp_role.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.roleTouchEvent, this);
        }

        public initRole() {
            this._maidInfo = this.data;

            this._roleBone = new RoleBone();
            this._roleBone.initRoleData(this._maidInfo.sex, this._maidInfo.clothes);
            this._roleBone.scaleX = 0.3;
            this._roleBone.scaleY = 0.3;
            this.grp_role.addChild(this._roleBone);
            this._roleBone.useGirlSpine(actionType.Idle);

            this.updateView();
        }

        private OnHouseMaidUpdate() {
            for(let i=0; i<DataManager.playerModel.getHouseMaidInfo().maids.length; i++) {	//房里面可能有我的女仆和掠夺过来的女仆
                let maidInfo = DataManager.playerModel.getHouseMaidInfo().maids[i];
                if (maidInfo.id == this._maidInfo.id) {
                    this._maidInfo = maidInfo;
                    break;
                }
            }

            this.updateView();
        }

        private updateView() {

        }

        private roleTouchEvent() {
            if (this._maidInfo.ownerid == DataManager.playerModel.getUserId()) {    //女仆是自己的
                if (this._maidInfo.robberid == 0) {     //打开女仆换装
                    openPanel(PanelType.dress);
                } else {    //夺回女仆

                }
            } else {    //女仆是别人的
                if (this._maidInfo.robberid == DataManager.playerModel.getUserId()) {   //我抢了别人的女仆

                }
            }
        }
    }
}