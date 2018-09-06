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
                            if (mapProxy.mapStatus == 1) {
                                mapProxy.addBuilding(1000);
                            } else {
                                mapProxy.addPlayers(1000);
                            }
                            /*if (mapProxy.mapZoom > 14) {
                                let sendObj: any = {
                                    require: mapProxy.mapStatus,
                                    lat: mapProxy.currentPoint.lat,
                                    lng: mapProxy.currentPoint.lng,
                                }
                                //ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
                            } else {
                                //mapProxy.emptyMapMarker(mapProxy.mapStatus);
                                let pRadius = 30*1000;
	                            let cRadius = 20*1000;
                                let level=2;
                                if(mapProxy.mapZoom>=10){
                                    level=2;
                                    pRadius=20*1000;
                                    cRadius =10*1000;
                                }else if(mapProxy.mapZoom<10){
                                    level=1;
                                    pRadius=40*1000;
                                    cRadius =40*1000;
                                }
                                let sendObj: any = {
                                    type: mapProxy.mapStatus,
                                    lat: mapProxy.currentPoint.lat,
                                    lng: mapProxy.currentPoint.lng,
                                    level:level,
                                    pRadius:pRadius,
                                    cRadius:cRadius
                                }
                                //ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_POINT_TOTAL, sendObj);
                            }*/

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
                            if (mapProxy.mapStatus == 1) {
                                mapProxy.addBuilding(1000);
                            } else {
                                mapProxy.addPlayers(1000);
                            }
                            /* if (mapProxy.mapZoom > 14) {
                                 let sendObj: any = {
                                     require: mapProxy.mapStatus,
                                     lat: mapProxy.currentPoint.lat,
                                     lng: mapProxy.currentPoint.lng,
                                 }
                                 ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_MAP_POINT, sendObj);
                             } else {
                                 //mapProxy.emptyMapMarker(mapProxy.mapStatus);
                                 let pRadius = 30*1000;
                                 let cRadius = 20*1000;
                                 let level=2;
                                 if(mapProxy.mapZoom>=10){
                                     level=2;
                                     pRadius=20*1000;
                                     cRadius =10*1000;
                                 }else if(mapProxy.mapZoom<10){
                                     level=1;
                                     pRadius=40*1000;
                                     cRadius =40*1000;
                                 }
                                 let sendObj: any = {
                                     type: mapProxy.mapStatus,
                                     lat: mapProxy.currentPoint.lat,
                                     lng: mapProxy.currentPoint.lng,
                                     level:level,
                                     pRadius:pRadius,
                                     cRadius:cRadius
                                 }
                                 ApplicationFacade.getInstance().sendNotification(CommandName.SOCKET_REQ_POINT_TOTAL, sendObj);
                             }*/
                            break;
                        }
                }
            }
        }
    }
}