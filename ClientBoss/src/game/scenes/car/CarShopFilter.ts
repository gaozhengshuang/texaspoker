module game {
    export class CarShopFilter extends eui.Component  {
        sr_item_brand             : eui.Scroller;
        ls_items_brand            : eui.List;

        sr_item_model             : eui.Scroller;
        ls_items_model            : eui.List;

        private _dataProv_brand   : eui.ArrayCollection;
        private _dataProv_model   : eui.ArrayCollection;
        
        private sortType;
        private SortTypes         : number[] = [];

        private priceSortType     : number  = -1;
        private awardSortType     : number  = -1;
        
        private filterDatas       : CarFilterData[] = [];
        private brandFilterDatas  : CarFilterData[] = [];
    
        private static _instance: CarShopFilter = null;

        public static getInstance(): CarShopFilter {
            if (!CarShopFilter._instance) {
                CarShopFilter._instance = new CarShopFilter();
            }
            return CarShopFilter._instance;
        }
        constructor()
        {
            super();
            this.skinName = "resource/skins/car/CarShopFilterSkin.exml";
        }
        public initItemList() {
            this._dataProv_brand = new eui.ArrayCollection();
            this.ls_items_brand.dataProvider = this._dataProv_brand;
            this.ls_items_brand.itemRenderer = CarShopFilterItem;
            this.ls_items_brand.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchBrand, this);

            this._dataProv_model = new eui.ArrayCollection();
            this.ls_items_model.dataProvider = this._dataProv_model;
            this.ls_items_model.itemRenderer = CarShopFilterItem;
            this.ls_items_model.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouchModel, this);

        }
        public UpdateData(datas:CarFilterData[]) {
            if(!datas) return;
            this.filterDatas = datas;
            this.filterDatas.forEach(data=>{
                if(!this.brandFilterDatas.some(idata=>{return idata.brand==data.brand;})){
                    data.type = CarShop.sortType.BRAND;
                    this.brandFilterDatas.push(data);
                }
            });
            //品牌筛选增加“全部”选项
            if(this.brandFilterDatas[0].type!=CarShop.sortType.BRANDALL){
                this.brandFilterDatas.unshift(new CarFilterData(CarShop.sortType.BRANDALL,"",""));                       
            }
            this.updateViewBrand();
            this.ls_items_brand.selectedIndex = 0;
        }
        //显示品牌列表
        private updateViewBrand()
        {   
            if(!this.brandFilterDatas) return;
            //console.log("updateView---->",this.brandFilterDatas.length);
            this._dataProv_brand.removeAll();
            this._dataProv_model.removeAll();
            this.brandFilterDatas.forEach(data=>{this._dataProv_brand.addItem(data)});

           // console.log("-------------->",this.ls_items_brand.numChildren+" "+this.ls_items_brand.numElements);
            
         }
         //显示对应品牌的型号列表
        private updateViewModel(brand:string)
        {   
            if(!this.filterDatas) return;
            //console.log("updateView---->",this.filterDatas.length);
            this._dataProv_model.removeAll();

            let modelFilterDatas : CarFilterData[] = this.filterDatas.filter(data=>{return data.brand == brand;}).map(data=>{
                let _data : CarFilterData = new CarFilterData(CarShop.sortType.MODEL,data.brand,data.model);
                return _data;
            });

            modelFilterDatas.forEach(data=>{this._dataProv_model.addItem(data)});
            //console.log("-------------->",this.ls_items_model.numChildren+" "+this.ls_items_model.numElements);
        }

        public OnCloseHandle() {
            this.parent.removeChild(this);
            console.log("车型筛选界面关闭");
            delete CarShopFilter._instance;
            CarShopFilter._instance = null;
        }
        //点击事件，选中并且筛选
        private onItemTouchBrand(eve: eui.ItemTapEvent) {
            //console.log("onItemTouchBrand------------->")
            let _CarFilterData = <CarFilterData>eve.itemRenderer.data;
            this.updateViewModel(_CarFilterData.brand);
            //CarShop.getInstance().sortItem(CarShop.sortType.BRAND,_CarFilterData.brand);
            CarShop.getInstance().sortItem(_CarFilterData.type,_CarFilterData.brand);
            
        }
        private onItemTouchModel(eve: eui.ItemTapEvent) {   
            //console.log("onItemTouchModel------------->")
            let _CarFilterData = <CarFilterData>eve.itemRenderer.data;
            CarShop.getInstance().sortItem(CarShop.sortType.MODEL,_CarFilterData.brand+""+_CarFilterData.model);
        }

    }
}