module game {
    export class DeliveryItem extends eui.ItemRenderer {
        itemImg: eui.Image;
        itemMask: eui.Image;
        itemName: eui.Label;
        itemNum: eui.Label;
        itemInfo: eui.Label;

        data;

        constructor() {
            super();
            this.skinName = DeliveryItemSkin;
            this.itemImg.mask = this.itemMask;
        }

        protected dataChanged() {
            let _data = table.ItemBaseDataById[this.data.itemid];
            if (!_data) {
                egret.log(`${this.data.itemid}找不到道具!`);
                this.visible = false;
                return;
            }

            if (this.data.remark) {
                this.itemInfo.text = `${this.data.remark}`;
            } else if (this.data.time) {
                this.itemInfo.text = `下单时间: ${this.data.time}`;
            }

            this.itemImg.source = getItemIconSource(_data.Id);
            this.itemName.text = _data.Name;
            this.itemNum.text = this.data.count;
        }
    }
}