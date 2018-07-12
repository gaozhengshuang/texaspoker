module game {
    export class DeliverySetting extends PanelComponent {
        nameLabel: eui.EditableText;
        phoneLabel: eui.EditableText;
        addressLabel: eui.EditableText;

        btn_close: IconButton;
        btn_setting: IconButton;

        protected getSkinName() {
            return DeliverySettingSkin;
        }

        protected init() {
            this.btn_close.icon = "lucky/luckycloseBtn";
            this.btn_setting.icon = "user/updateBtn";
        }

        protected beforeShow() {
            this._touchEvent = [
                {target: this.btn_close, callBackFunc: this.closeHandle},
                {target: this.btn_setting, callBackFunc: this.settingHandle},
            ];
            
            this.initView();
        }

        private initView() {
            if (DataManager.playerModel.getUserInfo().addrlist.length > 0) {
                let addressInfo = DataManager.playerModel.getUserInfo().addrlist[0];
                this.nameLabel.text = addressInfo.receiver;
                this.phoneLabel.text = addressInfo.phone;
                this.addressLabel.text = addressInfo.address;
            }
        }

        private closeHandle() {
            this.remove();
        }

        private settingHandle() {
            if (deleteBlank(this.nameLabel.text) == "") {
                showTips("请输入您的姓名!", true);
                return;
            }

            if (deleteBlank(this.phoneLabel.text) == "") {
                showTips("请输入您的手机号!", true);
                return;
            }

            if (deleteBlank(this.addressLabel.text) == "") {
                showTips("请输入您的收货地址!", true);
                return;
            }

            let addressInfo:msg.IUserAddress = {
                receiver:this.nameLabel.text, 
                phone:this.phoneLabel.text, 
                address:this.addressLabel.text
            }
            sendMessage("msg.C2GW_ChangeDeliveryAddress", msg.C2GW_ChangeDeliveryAddress.encode({
                index: 0,
                info: addressInfo
            }));
        }

        private static _instance: DeliverySetting;

        public static getInstance(): DeliverySetting {
            if (!DeliverySetting._instance) {
                DeliverySetting._instance = new DeliverySetting();
            }
            return DeliverySetting._instance;
        }
    }
}