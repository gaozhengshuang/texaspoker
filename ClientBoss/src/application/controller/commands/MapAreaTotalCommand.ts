module game {
    export class MapAreaTotalCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "MapAreaTotalCommand";

        private data: any = null;
        private mapProxy: MapProxy;
        private cityList: table.ITCitysDefine[] = null;
        public execute(notification: puremvc.INotification): void {
            this.mapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
            this.data = notification.getBody();
            this.cityList = table.TCitys;
            if (this.data) {
                if (this.mapProxy.mapStatus == 1) {
                    this.buildingAreaTotal();
                } else {
                    this.playersAreaTotal();
                }
            }

        }
        private buildingAreaTotal() {

            if (this.cityList && this.cityList.length > 0) {
                let area_list: any[] = [];
                for (let i: number = 0; i < this.cityList.length; i++) {
                    let area: any = null;
                    if (this.data.province > 0) {
                        if (this.cityList[i].Type == 2 && this.cityList[i].Superior == this.data.province) {
                            area = {
                                lat: this.cityList[i].Lat,
                                lng: this.cityList[i].Lng,
                                count: this.countCityBuild(this.cityList[i].Id)
                            }
                        }
                    } else {
                        if (this.cityList[i].Type == 1) {
                            area = {
                                lat: this.cityList[i].Lat,
                                lng: this.cityList[i].Lng,
                                count: this.countProvinceBuild(this.cityList[i].Id)
                            }
                        }
                    }
                    if (area) {
                        area_list.push(area);
                    }

                }
                this.mapProxy.addMapAreaIcon(area_list);
            }
        }
        private countProvinceBuild(id: number): number {
            let num: number = 0;
            let buildingList: table.ITBuildingsDefine[] = table.TBuildings;
            for (let i: number = 0; i < buildingList.length; i++) {
                if (buildingList[i].Province == id) {
                    num += 1;
                }
            }

            return num;
        }
        private countCityBuild(id: number): number {
            let num: number = 0;
            let buildingList: table.ITBuildingsDefine[] = table.TBuildings;
            for (let i: number = 0; i < buildingList.length; i++) {
                if (buildingList[i].City == id) {
                    num += 1;
                }
            }
            return num;
        }
        private playersAreaTotal() {
            sendMessage("msg.C2GW_ReqPlayerCountByProvince", msg.C2GW_ReqPlayerCountByProvince.encode
                ({ province: this.data.province }));
            NotificationCenter.once(this, this.OnGW2C_AckPlayerCountByProvince, "msg.GW2C_AckPlayerCountByProvince");
        }

        public OnGW2C_AckPlayerCountByProvince(data: msg.GW2C_AckPlayerCountByProvince) {
            if (data.province == this.data.province) {
                if (data.data && data.data.length > 0) {
                    let area_list: any[] = [];
                    for (let i: number = 0; i < data.data.length; i++) {
                        let area: any = null;
                        let keyV: any = data.data[i];
                        for (let k: number = 0; k < this.cityList.length; k++) {
                            if (this.cityList[k].Id == keyV.key) {
                                area = {
                                    lat: this.cityList[k].Lat,
                                    lng: this.cityList[k].Lng,
                                    count: keyV.value
                                }
                                break;
                            }
                        }
                        if (area) {
                            area_list.push(area);
                        }
                    }
                    this.mapProxy.addMapAreaIcon(area_list);
                }
            }
        }
    }
}