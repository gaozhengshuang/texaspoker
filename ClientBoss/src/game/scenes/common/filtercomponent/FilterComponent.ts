module game {
    /**
     * 筛选组件
     */
    export class FilterComponent extends GameComponent {
        ls_items_brand: eui.List;

        ls_items_model: eui.List;
        Bg: eui.Image;

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
        public setData(data: FilterComponentVo, lastIndex?: number) {
            this._data = data;
            this._dataMain.source = data.dataList;
            this._dataSub.source = data.dataList[0].subList;
            if (lastIndex != undefined && lastIndex >= 0) {
                this.refreshSub(data.dataList[lastIndex], true);
            }

            this.ls_items_model.visible = this.Bg.visible = !data.isSingle;

            this.addEventAndNotify()
        }
        protected addEventAndNotify() {
            super.addEventAndNotify();
            this.ls_items_brand.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch1, this);
            this.ls_items_model.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch2, this);
        }
        protected removeEventAndNotify() {
            super.removeEventAndNotify();
            this.ls_items_brand.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch1, this);
            this.ls_items_model.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch2, this);
        }
        public close() {
            this.removeEventAndNotify();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        private onItemTouch1(eve: eui.ItemTapEvent) {
            let data = <FilterComponentItemVo>eve.itemRenderer.data;
            // if (this._lastSelectItem1 && this._lastSelectItem1.id == data.id) {
            //     return;
            // }
            this.refreshSub(data);
        }
        private refreshSub(data: FilterComponentItemVo, isOut?:boolean) {
            let isSame = false;
            if (this._lastSelectItem1 && this._lastSelectItem1.id == data.id && isOut) {
                isSame = true;
            }
            this._lastSelectItem1 = data;
            this._dataSub.source = data.subList;
            if (!isSame) {
                runCallBackHandlerWith(this._data.callback1, data);
            }
        }
        private onItemTouch2(eve: eui.ItemTapEvent) {
            let data = <FilterComponentItemVo>eve.itemRenderer.data;
            // if (this._lastSelectItem2 && this._lastSelectItem2.id == data.id) {
            //     return;
            // }
            this._lastSelectItem2 = data;
            runCallBackHandlerWith(this._data.callback2, data);
        }
    }
}