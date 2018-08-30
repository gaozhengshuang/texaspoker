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
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            // NotificationCenter.addObserver(this, this.OnMaidUpdate, PlayerModel.MAID_UPDATE);
        }

        private removeEvent() {
            // NotificationCenter.removeObserver(this, PlayerModel.MAID_UPDATE);
        }

        public initRole(maidInfo: msg.IHouseMaidData) {
            this._maidInfo = maidInfo;
            
            this._roleBone = new RoleBone();
            this._roleBone.initRoleData(maidInfo.sex, maidInfo.clothes);
            this._roleBone.scaleX = 0.3;
            this._roleBone.scaleY = 0.3;
            this.grp_role.addChild(this._roleBone);

            this._roleBone.useGirlSpine(actionType.Idle);
        }

        private updateView() {
            
        }
    }
}