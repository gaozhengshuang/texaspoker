module game {
    export class MapActionCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

        public constructor() {
            super();
        }
        public static NAME: string = "MapActionCommand";

        public execute(notification: puremvc.INotification): void {
            var mapProxy: MapProxy = <MapProxy><any>this.facade().retrieveProxy(MapProxy.NAME);
            var data: any = notification.getBody();
            if (data) {
                switch (data.type) {
                    case 'zoom_changed':
                        {
                            //console.log(data);

                            //mapProxy.emptyMapMarker(mapProxy.mapStatus);
                            mapProxy.emptyMapMarker(mapProxy.mapStatus);
                            mapProxy.emptyAreaIconFun();
                            let content: any = data.content;
                            mapProxy.mapZoom = content.zoom;
                            mapProxy.currentPoint.setObject({ lat: content.lat, lng: content.lng });
                            //mapProxy.addBuilding();

                            if (mapProxy.mapZoom > 14) {
                                if (mapProxy.mapStatus == 1) {
                                    mapProxy.addBuilding(1000);
                                } else {
                                    mapProxy.addPlayers(1000);
                                }
                                //ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
                            } else {
                                //mapProxy.emptyMapMarker(mapProxy.mapStatus);

                                GameConfig.getCityNameFun(mapProxy.currentPoint.lat, mapProxy.currentPoint.lng, function (data: any[]) {

                                    let cityList: table.ITCitysDefine[] = table.TCitys;
                                    let province: number = 0;
                                    let city: number = 0;
                                    for (let i: number = 0; i < cityList.length; i++) {
                                        if (cityList[i].Name == data[0]) {
                                            province = cityList[i].Id;
                                        }
                                    }

                                    if (mapProxy.mapZoom >= 10) {
                                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, {province:province});
                                    } else if (mapProxy.mapZoom < 10) {
                                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, {province:0});
                                    }

                                    
                                })
                            }

                            break;
                        }
                    case 'dragstart':
                        {


                            break;
                        }
                    case 'dragend':
                        {
                            mapProxy.emptyMapMarker(mapProxy.mapStatus);
                            mapProxy.emptyAreaIconFun();
                            let content: any = data.content;
                            mapProxy.mapZoom = content.zoom;
                            mapProxy.currentPoint.setObject({ lat: content.lat, lng: content.lng });
                            //mapProxy.addBuilding();
                            if (mapProxy.mapZoom > 14) {
                                if (mapProxy.mapStatus == 1) {
                                    mapProxy.addBuilding(1000);
                                } else {
                                    mapProxy.addPlayers(1000);
                                }
                            } else {
                                //mapProxy.emptyMapMarker(mapProxy.mapStatus);
                                GameConfig.getCityNameFun(mapProxy.currentPoint.lat, mapProxy.currentPoint.lng, function (data: any[]) {

                                    let cityList: table.ITCitysDefine[] = table.TCitys;
                                    let province: number = 0;
                                    let city: number = 0;
                                    for (let i: number = 0; i < cityList.length; i++) {
                                        if (cityList[i].Name == data[0]) {
                                            province = cityList[i].Id;
                                        }
                                    }

                                    if (mapProxy.mapZoom >= 10) {
                                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, {province:province});
                                    } else if (mapProxy.mapZoom < 10) {
                                        ApplicationFacade.getInstance().sendNotification(CommandName.MAP_AREA_TOTAL, {province:0});
                                    }

                                    
                                })
                            }
                            break;
                        }
                }
            }
        }
    }
}