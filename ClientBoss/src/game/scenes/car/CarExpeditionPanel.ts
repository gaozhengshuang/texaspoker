module game {
    export class CarExpeditionPanel extends PanelComponent  {
    
        center              : eui.Group;
        starsGroup          : eui.Group;
        FilterGroup         : eui.Group;
        selectFilterGroup   : eui.Group;

        carIcon             : eui.Image;
        select_mc           : eui.Rect;
        diamondNum          : eui.Label;
        goldNum             : eui.Label;
        percentNum          : eui.Label;
        InfoTxt             : eui.Label;
        carNameTxt          : eui.Label;
        InfoTxt_1           : eui.Label;
        InfoTxt_2           : eui.Label;
        InfoTxt_3           : eui.Label;
        expeditionInfoTxt   : eui.Label;
        selectFilterTxt     : eui.Label;
        
        Capacity            : eui.RadioButton;
        Speed               : eui.RadioButton;
        Range               : eui.RadioButton;
        Star                : eui.RadioButton;

        btnClose            : IconButton;
        expeditionIBtn      : IconButton;
        expeditionBtn       : eui.Button;

        sr_item             : eui.Scroller;
        ls_items            : eui.List;

        public static _instance: CarExpeditionPanel = null;

        public static getInstance(): CarExpeditionPanel {
            if (!CarExpeditionPanel._instance) {
                CarExpeditionPanel._instance = new CarExpeditionPanel();
            }
            return CarExpeditionPanel._instance;
        }
      
        public  sortType = 
        {
            ALL         : 0,
            CAPACITY    : 1,
            SPEED       : 2,
            RANGE       : 3,
            STAR        : 4,
        };

        private _dataProv           : eui.ArrayCollection;
        private Datas               : msg.ICarData[] = [];
        private sortDatas           : msg.ICarData[] = [];
      

        private _selectPointRange   : number  = -1;
        private SortType            : number  = -1;
        private _inited             : Boolean = false;
        private carData             : msg.ICarData;
        private selectMapPointInfo  : table.ITMapEventDefine;
        private selectPoint         : MapIconInfo;
/*         //部位RadioButton列表
        private _partsToggles;
        //部位RadioButton组
        private _partRadioBtnGroup : eui.RadioButtonGroup; */

        private _runingTimers = [];
        constructor()
        {
            super();
            this.skinName = CarExpeditionSkin;
        }

        protected beforeShow() {
            this.btnClose.icon       = "uiCarAltas_json.backBtn2";
            this.expeditionIBtn.icon = "uiCarAltas_json.buyBtn3";

            this.Capacity.selected = this.Range.selected =  this.Speed.selected =  this.Star.selected = false;
            this.SortType = this.sortType.ALL;
            this.selectFilterTxt.text = "全部";

            this._touchEvent = [
                { target: this.btnClose,            callBackFunc: this.OnCloseHandle},
                { target: this.selectFilterGroup,   callBackFunc: this.OnSortOpenHandle},
                { target: this.Capacity,            callBackFunc: this.OnSortCapacityHandle},
                { target: this.Range,               callBackFunc: this.OnSortRangeHandle},
                { target: this.Speed,               callBackFunc: this.OnSortSpeedHandle},
                { target: this.Star,                callBackFunc: this.OnSortStarHandle},
                { target: this.expeditionBtn,       callBackFunc: this.OnExpeditionHandle},
                
                { target: this.expeditionIBtn,       callBackFunc: this.OnExpeditionHandle},
                
            ];

            this._inited   = true;
            this.initItemList();
            this._selectPointRange = 20;
 /*            this._partRadioBtnGroup = new eui.RadioButtonGroup();
            this._partRadioBtnGroup.addEventListener(eui.UIEvent.CHANGE, this.OnSortHandle, this); */

        }
        private initItemList() {
            this._dataProv = new eui.ArrayCollection();
            this.ls_items.dataProvider = this._dataProv;
            this.ls_items.itemRenderer = CarExpeditionItem;
            this.ls_items.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTouch, this);
        }
        public refreshData(){
            let self = this;
            CarManager.getInstance().ReqMyCarInfo(function(){
                self.UpdateData(DataManager.playerModel.getUserInfo().cardatas);
            });
        }
        public UpdateData(datas:msg.ICarData[],point:MapIconInfo=null) {
            if(point){
                this.selectPoint = point;
                this._selectPointRange   = getDistance(DataManager.playerModel.getSelfPoint(),{lat:point.latitude,lng:point.longitude});
                this.selectMapPointInfo  = table.TMapEventById[point.tid];
            }

            if(!datas) return;
            //默认范围排序
            datas = datas.filter(data=>{return data.state==msg.CarState.Ready;});
            datas = datas.filter(data=>{return data.attr.range>=this._selectPointRange}).concat(datas.filter(data=>{return data.attr.range < this._selectPointRange}));

            this.Datas = datas;
            let userInfo         = DataManager.playerModel.getUserInfo();
            this.goldNum.text    = userInfo.gold.toString();
            this.diamondNum.text = userInfo.diamond.toString();
            this.percentNum.text = userInfo.robcount + "/" + 20;

            //目标信息
            this.InfoTxt.text = "目标：" + this.selectMapPointInfo.Desc + "\n" + "距离您"+ this._selectPointRange + "公里";

            this.updateView(this.Datas[0]);
            this.UpdateBagList(this.Datas);
        }
        //刷新选中车辆信息
        private updateView(data:msg.ICarData)
        {   
            if(!data) return;
            this.carData     = data;
            let carItemData  = table.TCarById[data.tid];
            if(!carItemData) return;
            //Icon
            let txtr:egret.Texture = RES.getRes(carItemData.path);
            let factor = 1;
            if(txtr)
            {
                this.carIcon.source    = txtr;
                this.carIcon.width     = txtr.textureWidth * factor;
                this.carIcon.height    = txtr.textureHeight * factor;
            }
            //名字
            this.carNameTxt.text = getCarName(carItemData.Id);
            //星级
            for (let index = 0; index < this.starsGroup.numChildren; index++) {
                this.starsGroup.getChildAt(index).visible = data.star > index;
            }
            //容量
            this.InfoTxt_1.text = "容量："+data.attr.moneylimit+"金币" +"\t"+"道具数"+data.attr.itemlimit+"个";
            //其他属性
            this.InfoTxt_2.textFlow =[
                {text:"速度："+data.attr.speed+"公里/分钟"},
                {text:"\n\n"+"停靠："+data.attr.stoptime+"分钟"},
            ];
            
            this.InfoTxt_3.textFlow =[
                {text:"移动范围："+data.attr.range+"公里"},    
                {text:"\n\n"+"收益："+data.attr.reward+"金币/分钟"},
            ];
            //出征预计到达时间
            let second = Math.round(this._selectPointRange / this.carData.attr.speed * 60);
            this.expeditionInfoTxt.text = "出征：" + sDhFilter(second,":");
            
        }
        //刷新背包列表
        private UpdateBagList(datas:msg.ICarData[]){
            if(!datas) return;
            console.log("updateView---->",datas.length);
            if(!this._dataProv) {this._dataProv = new eui.ArrayCollection();}
            this._dataProv.removeAll();
            datas.forEach(data=>{this._dataProv.addItem(data)});
            this.ls_items.selectedIndex = 0;
        }
        private OnCloseHandle() {
            if(!this.Inited()) return;
            this.remove();
            console.log("出征界面关闭");

            this._inited  = false;
 
            //显示主页个人信息界面
            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_USER_INFO, { isShow: true});
            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_MAP_UI, { isShow: true });            
			ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_TOP_ROOM_BG, { isShow: true });
			//显示下方菜单栏
            GameConfig.showDownBtnFun(true); 
            //显示地图关闭event
            GameConfig.setEventsReply(false);

            delete CarExpeditionPanel._instance;
            CarExpeditionPanel._instance = null;
        }

        private OnSortOpenHandle()
        {
            this.FilterGroup.visible = !this.FilterGroup.visible;
        }
        private OnSortCapacityHandle()
        {
            this.sortShopItem(this.sortType.CAPACITY);
            this.OnSortOpenHandle();
        }
        private OnSortRangeHandle()
        {   
            this.sortShopItem(this.sortType.RANGE);
            this.OnSortOpenHandle()            
        }
        private OnSortSpeedHandle()
        {
            this.sortShopItem(this.sortType.SPEED);    
            this.OnSortOpenHandle()        
        }
        private OnSortStarHandle()
        {
            this.sortShopItem(this.sortType.STAR);    
            this.OnSortOpenHandle()                    
        }

        private OnExpeditionHandle()
        {
            let selectCarData = <msg.ICarData>this.ls_items.selectedItem;
            if(!this.carData || !selectCarData){
                console.warn("没有选择车辆");
                return;
            }
            if(this.carData.id != selectCarData.id){
                console.warn("选择车辆显示错误");                
                return;
            }
            console.log("出征------------>"+this.carData.id);

            if(!this.isInRange(this.carData.attr.range)){
                console.warn("选择车辆移动范围不足");     
                showTips("车辆移动范围不足！");           
                return;
            }

            let self = this;
            let selfPoint = DataManager.playerModel.getSelfPoint();
            CarManager.getInstance().ReqCarExpedition(
                this.carData.id,msg.CarTargetType.CTTBuilding,this.selectPoint.id,
                selfPoint.lat,selfPoint.lng,
                this.selectPoint.latitude,this.selectPoint.longitude,
                function(result:number,carData:msg.ICarData){
                    if(result==0){
                        showTips("出征成功！");
                        self.OnCloseHandle();
                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_SHOW_POLYLINE_ONE,{data:carData});    
                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_SHOW_CAR_MAKER);     
			            ApplicationFacade.getInstance().sendNotification(CommandName.SHOW_MAP_UI, { isShow: true });			                
                    }
                }
            );

        }

        //按类型排序
        private sortShopItem(type:number)
        {   
            let datas: msg.ICarData[] = [];
            datas =  this.Datas;
            switch (type) {
                case this.sortType.ALL:
                    this.selectFilterTxt.text = "全部";
                    break;
                case this.sortType.CAPACITY:
                    datas.sort((a,b)=>{return b.attr.moneylimit - a.attr.moneylimit});
                    this.selectFilterTxt.text = "容量优先";
                    break;
                case this.sortType.RANGE:
                    datas.sort((a,b)=>{return b.attr.range - a.attr.range});
                    this.selectFilterTxt.text = "范围优先";
                break;
                case this.sortType.SPEED:
                    datas.sort((a,b)=>{return b.attr.speed - a.attr.speed});
                    this.selectFilterTxt.text = "速度优先";                    
                break;
                case this.sortType.STAR:
                    datas.sort((a,b)=>{return b.star - a.star});
                    this.selectFilterTxt.text = "星级优先";                    
                break;
            }
            datas = datas.filter(data=>{return data.attr.range>=this._selectPointRange}).concat(datas.filter(data=>{return data.attr.range < this._selectPointRange}));
            this.sortDatas = datas;
            this.updateView(datas[0]);
            this.UpdateBagList(datas);
        }

        private onItemTouch(eve: eui.ItemTapEvent) {
            console.log("onItemTouch------------->")
            let itemData = <msg.ICarData>eve.itemRenderer.data;
            this.updateView(itemData);
        }
        //-----------------------------------------------------------------------------//
        public isInRange(range:number)
        {
            return range >= this._selectPointRange;
        }
        public Inited(){
            return this._inited;
        }

    }
}