module game {
    export var $isWx: boolean = false;
    export var $neiNetIp: string = "https://bfp.giantfun.cn";

    //发货IP
    export var $goodsIp: string = "http://logistics.giantfun.cn:8083";
    export var $goodsPath: string = "/v1/logistics/query";

    //外网IP
    export var $registIp: string = "https://tantanle-service7003.giantfun.cn/";
    export var $netIp: string = "wss://tantanle-service7002.giantfun.cn/ws_handler";
    export var $gameNetIp: string = "wss://tantanle-service{gamePort}.giantfun.cn/ws_handler";

    //谢建服务器
    // export var $registIp: string = "http://192.168.30.204:7003";
    // export var $netIp: string = "ws://192.168.30.204:7002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.204:{gamePort}/ws_handler";

    //毕强服务器
    // export var $registIp: string = "http://192.168.30.205:7003";
    // export var $netIp: string = "ws://192.168.30.205:7002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.205:{gamePort}/ws_handler";

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
        userid: number|Long;
        face: string;
        name: string;
        score: number;
        rank: number;
    }

    export interface IUserInfo {
        userid: number|Long;
        face: string;
        name: string;
        rank: number;
        gold: number;
        diamond: number;
        openid: string;
        addrlist: msg.IUserAddress[];
        PersonalImage: msg.IPersonalImage;
    }

    export var $uploadScore = "/score/uploadScore";
    export var $getRankList = "/score/getRankList";
}