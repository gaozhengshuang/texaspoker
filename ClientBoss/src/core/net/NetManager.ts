module game {
    export var $isWx: boolean = false;
    export var $neiNetIp: string = "https://bfp.giantfun.cn";

    //发货IP
    export var $goodsIp: string = "http://logistics.giantfun.cn:8083";
    export var $goodsPath: string = "/v1/logistics/query";

    //外网IP
     // export var $registIp: string = "http://210.73.214.74:7003";
     // export var $netIp: string = "ws://210.73.214.74:7002/ws_handler";
     // export var $gameNetIp: string = "ws://210.73.214.74:{gamePort}/ws_handler";

    //策划服务器
    // export var $registIp: string = "http://192.168.30.204:7003";
    // export var $netIp: string = "ws://192.168.30.204:7002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.204:{gamePort}/ws_handler";

    //正双服务器
    //export var $registIp: string = "http://192.168.30.202:7003";
    //export var $netIp: string = "ws://192.168.30.202:7101/ws_handler";
    //export var $gameNetIp: string = "ws://192.168.30.202:{gamePort}/ws_handler";

    //谢建服务器
/*      export var $registIp: string = "http://192.168.30.203:7003";
     export var $netIp: string = "ws://192.168.30.203:7002/ws_handler";
     export var $gameNetIp: string = "ws://192.168.30.203:{gamePort}/ws_handler"; */

    //毕强服务器
        //export var $registIp: string = "http://192.168.30.205:7003";
       // export var $netIp: string = "ws://192.168.30.205:7002/ws_handler";
       // export var $gameNetIp: string = "ws://192.168.30.205:{gamePort}/ws_handler"; 

    //刘凯服务器
    export var $registIp: string = "http://192.168.30.206:7002";
    export var $netIp: string = "ws://192.168.30.206:7002/ws_handler";
    export var $gameNetIp: string = "ws://192.168.30.206:{gamePort}/ws_handler"; 


    export interface IUpdateScore {
        openid: string;
        face: string;
        name: string;
        score: number;
        token: string;
    }

    export interface IGetRankList {
        openid: string;
        face: string;
        name: string;
        start: number;
        stop: number;
        token: string;
    }

    export interface IHttpRetInfo {
        code: string;
        msg: IMsgInfo;
    }

    export interface IMsgInfo {
        ranklist: IRankInfo[];
        userInfo: IRankInfo;
    }

    export interface IRankInfo {
        userid: number | Long;
        face: string;
        name: string;
        score: number;
        rank: number;
    }

    export interface IUserInfo {
        userid: number | Long;
        face: string;
        name: string;
        rank: number;
        level: number;
        gold: number;
        diamond: number;
        openid: string;
        addrlist: msg.IUserAddress[];
        newplayerstep: number;
        cardatas: msg.ICarData[];
        parkingdatas: msg.IParkingData[];
        robcount: number;
        tmaddrobcount:number
    }

    export var $uploadScore = "/score/uploadScore";
    export var $getRankList = "/score/getRankList";
}