module game {
    export class CarFilterData {
        public type     : number;
        public brand    : string;
        public model    : string;
        constructor(type:number,brand:string,model:string)
        {
            this.type  = type;            
            this.brand = brand;
            this.model = model;
        }
        public equal(other:CarFilterData)
        {
            return this.type==other.type &&  this.brand==other.brand && this.model==other.model;
        }
    }
    export class CarShop extends PanelComponent  {
    
        center              : eui.Group;
        down_bg             : eui.Group;
        BuyInfo             : eui.Group;
        Filter              : eui.Group;

        carIcon             : eui.Image;
        arrowBrand          : eui.Image;
        arrowUpPrice        : eui.Image;
        arrowDownPrice      : eui.Image;
        arrowUpPercent      : eui.Image;
        arrowDownPercent    : eui.Image;
        
        diamondNum          : eui.Label;
        goldNum             : eui.Label;
        percentNum          : eui.Label;

        btnFilterBrand      : eui.Group;
        btnFilterPrice      : eui.Group;
        btnFilterPercent    : eui.Group;
        btnClose            : IconButton;
     
        sr_item             : eui.Scroller;
        ls_items            : eui.List;
        carFilter           : CarShopFilter;
        carBuyInfo          : CarShopBuy;
        
        public static _instance: CarShop = null;

        public static getInstance(): CarShop {
            if (!CarShop._instance) {
                CarShop._instance = new CarShop();
            }
            return CarShop._instance;
        }
      
        public static sortType = 
        {
            BRAND       : 0,
            MODEL       : 1,
            PRICEUP     : 2,
            PRICEDOWN   : 3,
            AWARDUP     : 4,
            AWARDDOWN   : 5
        };
        private shopDatas           : msg.ICarProductData[] = [];
        private sortShopDatas       : msg.ICarProductData[] = [];
        private _dataProv           : eui.ArrayCollection;

        private SortTypes           : CarFilterData[] = [];
        private priceSortType       : number  = -1;
        private awardSortType       : number  = -1;
        
        private CarFilterDatas      : CarFilterData[]= [];
        private _inited             : boolean;
        private _runingTimers = [];
        constructor()
        {
            super();
            this.skinName = CarShopSkin;
        }
        public init() 
        {
            this._inited = false;
        }

        protected beforeShow() {
            this.btnClose.icon = "uiCarAltas_json.backBtn";
       
            this._touchEvent = [
                { target: this.btnClose,         callBackFunc: this.OnCloseHandle },
                { target: this.btnFilterBrand,   callBackFunc: this.OnSortBrandHandle },
                { target: this.btnFilterPrice,   callBackFunc: this.OnSortPriceHandle },
                { target: this.btnFilterPercent, callBackFunc: this.OnSortAwardHandle },

            ];

            this._inited   = true;
            this.initItemList();
            this.carFilter.initItemList();
            this.CarFilterDatas = table.TCar.map(data=>{
                return new CarFilterData(CarShop.sortType.BRAND,data.Brand,data.Model); 
            });            
        }
        public initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = CarShopItem;
            //this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
            this.oldY = this.center.y;
            this.oldH = this.center.height;
    
        }
        public refreshData(){
            let self = this;
            CarManager.getInstance().ReqCarShopInfo(1,function(CarShopDatas:msg.ICarProductData[]){
                self.UpdateData(CarShopDatas);
            });
        }
        public UpdateData(datas:msg.ICarProductData[]) {
            if(!datas) return;
            //默认价格升序
            datas.sort(function(a,b){
                let carShopData_a :table.ITCarDefine = table.TCarShopById[a.pid];
                let carShopData_b :table.ITCarDefine = table.TCarShopById[b.pid];
                return  carShopData_a.Price - carShopData_b.Price;
            });

            this.shopDatas = datas;
            let userInfo = DataManager.playerModel.getUserInfo();
            this.goldNum.text    = userInfo.gold.toString();
            this.diamondNum.text = userInfo.diamond.toString();
            this.percentNum.text = userInfo.robcount + "/" + 20;

            if(this.SortTypes.length>0){
                //按照之前的类型刷新商品列表
                this.sortShopDatas = [];
                let SortTypes = this.SortTypes.map(data=>{return data;});
                SortTypes.forEach(data=>{
                    let value = data.type==CarShop.sortType.BRAND ? data.brand : (data.type==CarShop.sortType.MODEL ? data.brand+""+data.model : "");
                    this.sortShopItem(data.type,value);
                });
            }
            else{
                this.updateView(this.shopDatas);
            }
        }
        private updateView(datas:msg.ICarProductData[])
        {   
            if(!datas) return;
            console.log("updateView---->",datas.length);
            this._dataProv.removeAll();
            let self = this;
            datas.forEach(data=>{self._dataProv.addItem(data)});

           // console.log("-------------->",this.ls_items.numChildren+" "+this.ls_items.numElements);
         
            
         }
  
        public OnCloseHandle() {
            if(!this.Inited()) return;
            this.remove();
            console.log("商店界面关闭");
            
            this._inited  = false;
            //显示主页个人信息界面
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true});
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: true });
			//显示下方菜单栏
            GameConfig.showDownBtnFun(true); 
            //显示地图关闭event
            GameConfig.setEventsReply(false);
            this.carFilter.visible = false;
            this.Filter.visible =false;
            this.clearSortTypes();
            delete CarShop._instance;
            CarShop._instance = null;
        }

        private OnSortBrandHandle(){
            let _IsFilter = !this.carFilter.visible;
            this.Filter.visible = this.carFilter.visible = _IsFilter;
            this.arrowBrand.rotation = _IsFilter && 180 || 0;
            if(_IsFilter){
                this.carFilter.UpdateData(this.CarFilterDatas);
                this.showlist();
            }
            else{ //关闭并且忽略品牌筛选
                this.hideList();
                //清除筛选Types
                this.SortTypes = this.SortTypes.filter(data=>{return data.type!=CarShop.sortType.BRAND && data.type!=CarShop.sortType.MODEL;});
                //重新刷新商品列表
                if(this.SortTypes.length>0){
                    //按照之前的类型刷新商品列表
                    this.sortShopDatas = [];
                    let SortTypes = this.SortTypes.map(data=>{return data;});
                    SortTypes.forEach(data=>{
                        let value = data.type==CarShop.sortType.BRAND ? data.brand : (data.type==CarShop.sortType.MODEL ? data.brand+""+data.model : "");
                        this.sortShopItem(data.type,value);
                    });
                }
                else{
                    this.updateView(this.shopDatas);
                }
            }
        }
        private OnSortPriceHandle(){
            this.priceSortType = this.priceSortType == -1 ? CarShop.sortType.PRICEDOWN : (this.priceSortType==CarShop.sortType.PRICEDOWN?CarShop.sortType.PRICEUP:CarShop.sortType.PRICEDOWN);
            
            let isUp = this.priceSortType== CarShop.sortType.PRICEUP;
          
            this.arrowUpPrice.source = isUp ? "uiCarAltas_json.arrowUpRed" : "uiCarAltas_json.arrowDownL";
            this.arrowUpPrice.rotation = isUp ? 0 : 180;
            this.arrowDownPrice.source = !isUp ? "uiCarAltas_json.arrowUpRed" : "uiCarAltas_json.arrowDownL";
            this.arrowDownPrice.rotation = !isUp ? 180 : 0;

            this.sortShopItem(this.priceSortType);
        }

        private OnSortAwardHandle(){
            this.awardSortType = this.awardSortType == -1 ? CarShop.sortType.AWARDDOWN : (this.awardSortType==CarShop.sortType.AWARDDOWN?CarShop.sortType.AWARDUP:CarShop.sortType.AWARDDOWN);
            
            let isUp = this.awardSortType== CarShop.sortType.AWARDUP;
            this.arrowUpPercent.source = isUp ? "uiCarAltas_json.arrowUpRed" : "uiCarAltas_json.arrowDownL";
            this.arrowUpPercent.rotation = isUp ? 0 : 180;
            this.arrowDownPercent.source = !isUp ? "uiCarAltas_json.arrowUpRed" : "uiCarAltas_json.arrowDownL";
            this.arrowDownPercent.rotation = !isUp ? 180 : 0;

            this.sortShopItem(this.awardSortType);
        }
        //排序和筛选
        public sortItem(type:number,value:any=null)
        {
            if(type==CarShop.sortType.BRAND || type==CarShop.sortType.MODEL){
                this.sortByBrandOrModel(type,value);
            }
            else{
                this.sortShopItem(type,value);
            }
        }
        //按照品牌刷新
        private sortByBrandOrModel(type:number,value:any=null)
        {
            if(type==CarShop.sortType.BRAND || type==CarShop.sortType.MODEL)
            {
                //按照之前的类型刷新商品列表
                if(this.SortTypes.length>0){
                    this.sortShopDatas = [];
                    this.addSortType(type,value);
                    let SortTypes = this.SortTypes.map(data=>{return data;});
                    SortTypes.forEach(data=>{
                        let value = data.type==CarShop.sortType.BRAND ? data.brand : (data.type==CarShop.sortType.MODEL ? data.brand+""+data.model : "");
                        this.sortShopItem(data.type,value);
                    });    
                }else{
                    this.sortShopItem(type,value); 
                }
            }
        }
        //按类型排序
        private sortShopItem(type:number,value:any=null)
        {   
            this.addSortType(type,value);
            let datas: msg.ICarProductData[] = [];
            datas = this.sortShopDatas.length==0 ? this.shopDatas : this.sortShopDatas;
            if(type == CarShop.sortType.BRAND)
            {
                datas =  datas.filter(data=>{
                    let carShopItemData :table.ITCarShopDefine = table.TCarShopById[data.pid];
                    let carItemData :table.ITCarDefine = table.TCarById[carShopItemData.Carid];
                    return carItemData.Brand== value;
                });
            }
            else if(type == CarShop.sortType.MODEL)
            {
                datas =  datas.filter(data=>{
                    let carShopItemData :table.ITCarShopDefine = table.TCarShopById[data.pid];
                    let carItemData :table.ITCarDefine = table.TCarById[carShopItemData.Carid];
                    return (carItemData.Brand+""+carItemData.Model)== value;
                });
            }
            else if(type == CarShop.sortType.PRICEUP)
            {
                datas.sort(function(a,b){
                    let carShopData_a :table.ITCarDefine = table.TCarShopById[a.pid];
                    let carShopData_b :table.ITCarDefine = table.TCarShopById[b.pid];
                    return  carShopData_a.Price - carShopData_b.Price;
                });
            }
            else if(type == CarShop.sortType.PRICEDOWN)
            {
                datas.sort(function(a,b){
                    let carShopData_a :table.ITCarDefine = table.TCarShopById[a.pid];
                    let carShopData_b :table.ITCarDefine = table.TCarShopById[b.pid];
                    return  carShopData_b.Price - carShopData_a.Price;
                });
            }
            else if(type == CarShop.sortType.AWARDUP)
            {
                datas.sort(function(a,b){
                    let carItemData_a :table.ITCarDefine = table.TCarById[table.TCarShopById[a.pid].Carid];
                    let carItemData_b :table.ITCarDefine = table.TCarById[table.TCarShopById[b.pid].Carid];
                    return  carItemData_a.RewardPerH - carItemData_b.RewardPerH;
                });
            }
            else if(type == CarShop.sortType.AWARDDOWN)
            {
                datas.sort(function(a,b){
                    let carItemData_a :table.ITCarDefine = table.TCarById[table.TCarShopById[a.pid].Carid];
                    let carItemData_b :table.ITCarDefine = table.TCarById[table.TCarShopById[b.pid].Carid];
                    return  carItemData_b.RewardPerH - carItemData_a.RewardPerH;
                });
            }
           this.sortShopDatas = datas;
           this.updateView(datas);
        }

        //记录筛选类型
        private addSortType(type:number,value:any=null){
            //删除同类型
            let index = -1;
            if(this.SortTypes.some((data,iindex,array)=>{index=iindex;return data.type==type;})){
                this.SortTypes.splice(index,1);
            }
            let _CarFilterData : CarFilterData = null;
            switch (type) {
                case CarShop.sortType.BRAND:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.MODEL){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,value,""); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
                case CarShop.sortType.MODEL:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.BRAND){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,"",value); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
                case CarShop.sortType.PRICEUP:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.PRICEDOWN){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,"",""); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
                case CarShop.sortType.PRICEDOWN:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.PRICEUP){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,"",""); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
                case CarShop.sortType.AWARDUP:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.AWARDDOWN){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,"",""); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
                case CarShop.sortType.AWARDDOWN:
                {
                    for (let i = 0; i < this.SortTypes.length; i++) {
                        if(this.SortTypes[i].type==CarShop.sortType.AWARDUP){
                            this.SortTypes.splice(i,1);
                            break;
                        }
                    }
                    _CarFilterData  = new CarFilterData(type,"",""); 
                    this.SortTypes.push(_CarFilterData);
                }
                break;
            }
        }   
        private clearSortTypes(){
            this.SortTypes = [];
            this.sortShopDatas = [];
        }

        private oldY: number = 0;
        private oldH: number = 0;
  
        private goalY: number = -1;
        private goalH: number = -1;
        private btnGoalY: number = -1;


        private showlist() {
            console.log("展示列表showlist----------->");
            if (this.btnGoalY == -1) {
                //this.btnGoalY = gameConfig.curHeight() / 4 + this.center.height / 2 + 20
                this.btnGoalY = 300;
            }
         
			console.log(this.goalH+"//"+this.goalY+"//"+GameConfig.innerHeight);

            if (this.center.y != this.btnGoalY) {
                egret.Tween.get(this.center).to({ y: this.btnGoalY }, 300).
                call(this.onComplete, this, []);  
            }else{
                this.onComplete();
            }
        }
        private onComplete() {
            console.log ("onComplete");
            egret.Tween.removeTweens(this.center);
        }

        private hideList() {
            egret.Tween.get(this.center).to({ y: this.oldY }, 300);
        }

/*         private onItemTouch(eve: eui.ItemTapEvent) {
            console.log("onItemTouch------------->")
            let itemData = <msg.CarProductData>eve.itemRenderer.data;
            CarShop.getInstance().OpenBuyInfoPanel(itemData);
        } */

        public OpenBuyInfoPanel(data:msg.CarProductData)
        {
            this.BuyInfo.visible = true;
            this.carBuyInfo.visible = true;
            this.carBuyInfo.setData(data);
        }

        public CloseBuyInfoPanel(){
            this.BuyInfo.visible = false;
            this.carBuyInfo.visible =  false;
        }

        public BuyItem(shopId:number,pId:number){
            CarManager.getInstance().ReqBuyCarShopItem(shopId,pId,function(){
                showTips("购买成功！");   
                egret.setTimeout(() => {
                    CarShop.getInstance().CloseBuyInfoPanel();
                    CarShop.getInstance().refreshData();
                    }, this, 1);
            });             
        }
/*         public updataInfo(info: IUserInfo) {

            this.percentNum.text = DataManager.playerModel.getUserInfo().robcount + "/" + 20;
            if (DataManager.playerModel.getUserInfo().robcount < 20) {
                this.timeGroup.visible = true;
                this.isTime = true;
                this.showTime();
                this.qiang_txt.y = 13;
            }
            else {
                this.timeGroup.visible = false;
                this.removeTimer();
                this.isTime = false;
                this.qiang_txt.y = 27;
            }
        }
        private endTime: number;
        private showTime() {
            this.timeGroup.visible = true;
            this.endTime = this.userInfo.tmaddrobcount;
            if (this.isTime) {
                SysTimeEventManager.getInstance().addFunction(this.runningTimer, this);
            }
            this.runningTimer(SysTimeEventManager.getInstance().systimeNum, this);

        }

        private runningTimer(time: number, body: any): void {
            if (time < body.endTime) {
                body.time_txt.text = SysTimeEventManager.getInstance().
                    getHourMinutesTime(body.endTime - time, true, true);
            } else {
                if (body.userInfo.robcount >= 20) {
                    body.removeTimer();
                    body.timeGroup.visible = false;
                    body.isTime = false;
                    this.percentNum.y = 13;
                }
            }
        }
        public removeTimer(): void {
            SysTimeEventManager.getInstance().delFunction(this.runningTimer, this);
        }
 */
        //-----------------------------------------------------------------------------//
        public Inited(){
            return this._inited;
        }

    }
}