module game {
    export class BattleBagItem extends eui.ItemRenderer {
        itemImg: eui.Image;
        itemMask: eui.Image;
        itemName: eui.Label;
        itemNum: eui.Label;
        itemDesc: eui.Label;
        getButton: IconButton;
        data;

        constructor() {
            super();
            this.skinName = BattleBagItemSkin;
            this.getButton.icon = "lucky_json.bagget";
            this.getButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getHandle, this);

            this.itemImg.mask = this.itemMask;
        }

        private getHandle() {
            let list: msg.IDeliveryGoods[] = [{ itemid: this.data.id, num: this.data.num }];
            sendMessage("msg.C2GW_ReqDeliveryGoods", msg.C2GW_ReqDeliveryGoods.encode({ list: list, token: "" }));
        }

        protected dataChanged() {
            let _data = table.ItemBaseDataById[this.data.id];
            if (!_data) {
                egret.log(`${this.data.id}找不到道具!`);
                this.visible = false;
                return;
            }

            this.itemImg.source = getItemIconSource(_data.Id);
            this.itemName.text = _data.Name;
            this.itemDesc.text = _data.Desc;
            this.itemNum.text = "X" + this.data.num;
        }
    }
}