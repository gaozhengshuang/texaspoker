module game {
    export class HouseRolePanel extends BaseUIComponent<any> {
        private grp_role: eui.Group;
        private _roleBone: RoleBone;

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

        public initRole(houseInfo: table.ITHouseDefine) {
            this._roleBone = new RoleBone();
            this._roleBone.useGirlSpine(SexType.Girl, actionType.Idle);
            this.grp_role.addChild(this._roleBone);
            this.grp_role.setChildIndex(this._roleBone, 1);

            this._roleBone.scaleX = 0.3;
            this._roleBone.scaleY = 0.3;
        }

        private updateView() {
            
        }
    }
}