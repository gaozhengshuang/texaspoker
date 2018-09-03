module game {
	export class DepotDetailsPanel extends eui.Component {
		private itemImg: eui.Image;

		private name_txt: eui.Label;
		private num_txt: eui.Label;
		private info_txt: eui.Label;

		private use_btn: eui.Button;
		private item: any;
		private itemInfo: any;

		public constructor() {
			super();
			this.skinName = DepotDetailsPanelSkin;
		}

		public showPanel(info: any) {
			this.item = info;
			if (this.item) {
				this.itemImg.visible = true;
				this.name_txt.visible = true;
				this.num_txt.visible = true;
				this.info_txt.visible = true;
				this.use_btn.visible = true;
				this.itemInfo = table.ItemBaseDataById[this.item.id];
				if (this.itemInfo) {
					this.itemImg.source = RES.getRes(this.itemInfo.ImageId + "_png");
					this.name_txt.text = this.itemInfo.Name;
					this.info_txt.text = this.itemInfo.Desc;
					this.num_txt.text = "数量:" + this.item.num;
					if (this.itemInfo.Clothes > 0 && this.item.num>=10) {
						this.use_btn.visible = true;
					} else {
						this.use_btn.visible = false;
					}
				}
			}
			else{
				this.hidePanel();
			}
		}
		public hidePanel() {
			this.itemImg.visible = false;
			this.name_txt.visible = false;
			this.num_txt.visible = false;
			this.info_txt.visible = false;
			this.use_btn.visible = false;

		}
	}
}