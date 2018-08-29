module game {
    /**
     * 筛选组件
     */
    export class FilterComponent extends GameComponent {
        ls_items_brand: eui.List;

        ls_items_model: eui.List;

        private _dataMain: eui.ArrayCollection;
        private _dataSub: eui.ArrayCollection;
        private _data: FilterComponentVo;

        private _lastSelectItem1: FilterComponentItemVo;
        private _lastSelectItem2: FilterComponentItemVo;

        constructor() {
            super();
        }
        protected init() {
            super.init();
            this._dataMain = new eui.ArrayCollection();
            this._dataSub = new eui.ArrayCollection();

            this.ls_items_brand.dataProvider = this._dataMain;
            this.ls_items_model.dataProvider = this._dataSub;

            this.ls_items_brand.itemRenderer = FilterComponentItem;
            this.ls_items_model.itemRenderer = FilterComponentItem;
        }
        protected getSkinName() {
            return FilterComponentSkin;
        }
        public setData(data: FilterComponentVo) {
            this._data = data;
            this._dataMain.source = data.dataList;
            this._dataSub.source = data.dataList[0].subList;

            this.addEventAndNotify()
        }
        protected addEventAndNotify() {
            super.addEventAndNotify();
            this.ls_items_brand.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchBrand, this);
            this.ls_items_model.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchModel, this);
        }
        protected removeEventAndNotify() {
            super.removeEventAndNotify();
            this.ls_items_brand.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchBrand, this);
            this.ls_items_model.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchModel, this);
        }
        public close() {
			this.removeEventAndNotify();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        private onItemTouchBrand(eve: eui.ItemTapEvent) {
            let data = <FilterComponentItemVo>eve.itemRenderer.data;
            if (this._lastSelectItem1 && this._lastSelectItem1.id == data.id) {
                return;
            }
            this._lastSelectItem1 = data;
            this._dataSub.source = data.subList;
            runCallBackHandler(this._data.callback1);
        }
        private onItemTouchModel(eve: eui.ItemTapEvent) {
            let data = <FilterComponentItemVo>eve.itemRenderer.data;
            if (this._lastSelectItem2 && this._lastSelectItem2.id == data.id) {
                return;
            }
            this._lastSelectItem2 = data;
            runCallBackHandler(this._data.callback2);
        }
    }
}