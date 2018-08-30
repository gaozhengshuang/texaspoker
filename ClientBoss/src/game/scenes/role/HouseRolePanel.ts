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
            this.grp_role.addEventListener(egret.TouchEvent.TOUCH_TAP, this.roleTouchEvent, this);
        }

        private removeEvent() {
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
        }

        private updateView() {
            
        }

        private roleTouchEvent() {
            if (this._maidInfo.ownerid == DataManager.playerModel.getUserId() && this._maidInfo.robberid == 0) {
                openPanel(PanelType.dress);
            }
        }
    }
}