module game {
    export var $netIp: string = "https://bf.giantfun.cn";
    export var $neiNetIp: string = "https://bfp.giantfun.cn";
    export var $shuangshuangIp: string = "http://192.168.30.202";
    export var $kaiIp: string = "http://192.168.30.206:30002";
    export var $isWx: boolean = false;

    //发货IP
    export var $goodsIp: string = "http://logistics.giantfun.cn:8083";
    export var $goodsPath: string = "/v1/logistics/query";

    //外网IP
    // export var $registIp: string = "https://tantanle-service7003.giantfun.cn/";
    // export var $netIp: string = "https://tantanle-service7002.giantfun.cn/";

    //内网IP
    export var $registIp: string = "http://192.168.30.203:7003";
    export var $netIp: string = "ws://192.168.30.203:7002/ws_handler";

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
        money: number;
        openid: string;
        addrlist: msg.IUserAddress[];
    }

    export var $uploadScore = "/score/uploadScore";
    export var $getRankList = "/score/getRankList";
}