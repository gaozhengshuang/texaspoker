module game {
    export class RoleLevelUpPanel extends PanelComponent {
        btn_close: IconButton;
        btn_lvUp: IconButton;

        lvUpItemNum: eui.Label;
        lvLabel: eui.Label;
        nextlvLabel: eui.Label;
        produceGoldLabel: eui.Label;
        nextproduceGoldLabel: eui.Label;
        maxGoldLabel: eui.Label;
        nextmaxGoldLabel: eui.Label;

        btn_UnlvUp: eui.Image;

        protected getSkinName() {
            return RoleLevelUpSkin;
        }

        protected init() {
            this.btn_close.icon = "dress_01_json.lvUpCloseBtn";
            this.btn_lvUp.icon = "dress_01_json.lvUpBtn";
        }

        protected beforeShow() {
            this.registerEvent();
            this.updateView();
        }

        protected beforeRemove() {
            this.removeEvent();
        }

        private registerEvent() {
            NotificationCenter.addObserver(this, this.OnMaidUpdate, PlayerModel.MAID_UPDATE);

             this._touchEvent = [
                { target: this.btn_close, callBackFunc: this.backHandle },
                { target: this.btn_lvUp, callBackFunc: this.lvUpHandle },
            ];
        }

        private removeEvent() {
            NotificationCenter.removeObserver(this, PlayerModel.MAID_UPDATE);
        }

        private backHandle() {
            this.remove();
        }

        private lvUpHandle() {
            sendMessage("msg.C2GW_MaidUpgrade", msg.C2GW_MaidUpgrade.encode({
                id: DataManager.playerModel.getMaidInfo().id
            }));
        }

        private OnMaidUpdate() {
            this.updateView();
        }

        private updateView() {
            let levelInfo = table.TLevelMaidById[DataManager.playerModel.getMaidInfo().level];
            if (levelInfo) {
                this.lvLabel.text = "等级："+ levelInfo.Id;
                this.produceGoldLabel.text = "产能：" + levelInfo.ProduceGold/(Number(levelInfo.ProduceTime)/60);
                this.maxGoldLabel.text = "上限：" + levelInfo.ProduceGold;
                this.lvUpItemNum.text = DataManager.playerModel.getItemNum(levelInfo.UpgradeID) + "/" + levelInfo.Upgradenum;
            } else {
                return;
            }

            let nextlevelInfo = table.TLevelMaidById[levelInfo.NextLevel];
            if (nextlevelInfo) {
                this.nextlvLabel.text = `${nextlevelInfo.Id}`;
                this.nextproduceGoldLabel.text = `${nextlevelInfo.ProduceGold/(Number(nextlevelInfo.ProduceTime)/60)}`;
                this.nextmaxGoldLabel.text = `${nextlevelInfo.ProduceGold}`;
            } else {
                this.nextlvLabel.text = "max";
                this.nextproduceGoldLabel.text = "max";
                this.nextmaxGoldLabel.text = "max";
            }

            this.btn_lvUp.visible = DataManager.playerModel.getItemNum(levelInfo.UpgradeID) >= levelInfo.Upgradenum;
            this.btn_UnlvUp.visible = DataManager.playerModel.getItemNum(levelInfo.UpgradeID) < levelInfo.Upgradenum;
        }

        private static _instance: RoleLevelUpPanel;

        public static getInstance(): RoleLevelUpPanel {
            if (!RoleLevelUpPanel._instance) {
                RoleLevelUpPanel._instance = new RoleLevelUpPanel();
            }
            return RoleLevelUpPanel._instance;
        }
    }
}