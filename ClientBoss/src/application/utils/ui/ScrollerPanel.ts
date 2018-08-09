module utils{
	export class ScrollerPanel extends eui.Scroller implements eui.UIComponent {
		public dataList: eui.List;
		public constructor(type:number=1) {
			super();
			if(type==1)
			{
				this.skinName = "resource/eui_skins/ScrollerPanelSkin.exml";
			}
			else if(type==2)
			{
				this.skinName = "resource/eui_skins/VScrollBarPanelSkin.exml";
			}
			
			this.viewport = this.dataList;
		}
		/**
		* 通过SkinName 初始化item皮肤
		* @param itemSkin item皮肤
		*/
		public initItemSkin(itemSkin: any): void {
			this.dataList.itemRendererSkinName = itemSkin;
		}
		/**
		 *  通过itemRenderer 初始化item皮肤 
		*  @param itemRenderer 所有item都要继承 eui.ItemRenderer
		*/
		public initItemRenderer(itemRenderer: any): void {
			this.dataList.itemRenderer = itemRenderer;
		}
		/** 进行数据绑定 */
		public bindData(data: Array<any>): void {
			let arrCollection: eui.ArrayCollection = new eui.ArrayCollection(data);
			this.dataList.dataProvider = arrCollection;
		}
	}
}