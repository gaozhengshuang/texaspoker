/**
 * Created by sunboy on 2015/3/27.
 */
declare function adaptive(scale: number):number;
declare function exploreUI(isShow:boolean);
declare function smallGameClose(isShow:boolean);
declare function updataMaskBg(color:string,alpha:number)
declare function setEgretEventsReply(bool:boolean);
declare function showDownBtn(bool:boolean);
declare function updataLoginMaskBg(color:string,alpha:number);
declare function getCityName(lat:number,lng:number,fun:Function);
module app {
    export class GameConfig {
        public static instance: GameConfig;
        public constructor() {
            if (GameConfig.instance == null) GameConfig.instance = this;
        }

        public static getInstance(): GameConfig {
            if (GameConfig.instance == null) {
                GameConfig.instance = new GameConfig();
            }
            return GameConfig.instance;
        }

        public static mvcKey: string = "game";
        public static language: string;
        public static platformID: number = 1;

        public static mainVersion: string = "1.0.0";
        public static configVersion: string = "0001";
        public static isDebug: boolean = true;

        public static stageWidth: number = 720*2;
        public static stageHeight: number = 1280*2;
        public static stageFullWidth: number = 720*2;
        public static stageFullHeight: number = 1280*2;

        public static gameWidth: number = 720*2;
        public static gameHeight: number = 1280*2;

        public static innerWidth: number = 720*2;
        public static innerHeight: number = 1280*2;
        public static innerPageHeight: number = 1280*2;

        public static innerScale:number=1;
        public static innerScaleW:number=1;
        public static innerScaleH:number=1;

        public static appContainer: AppContainer;

        /**
         * 生产服务器
         */
        //public static socketUrl:string="ws://101.251.195.254:9000/";
        /**
         * 测试服务器
         */
        //public static socketUrl: string = "ws://127.0.0.1:9000/";
        //public static socketUrl: string = "ws://192.168.30.96:9000/";
        //public static socketUrl:string="ws://47.96.4.117:9000/";
        //public static socketUrl:string="ws://101.251.195.254:9000/";
        //public static serverUrl:string="192.168.30.26:9002";
        //public static serverUrl:string="192.168.199.214:9002";
        //public static serverUrl:string="101.251.195.254:9002";


        public static protoRes: string = "cityStar_proto";
        public static socketKey: string = "cityStar_proto";

        public static logining: boolean = false;

        public static errorJson: string = "errorCode_json";
        public static errorObj: any;

        public static sceneType: number = 1;

        public static pageType: number = 1;

        public static goldGPoint:egret.Point = new egret.Point(0,0);


        public static userAccount:string="";
        public static userPassword:string="";

        public static cookieAccStr:string="csAccount";
        public static cookiePassStr:string="csPassword";
        public static cookieFirstLoginStr:string="csFirstLogin";
        public static isDayFirstLogin:boolean=true;

        public static adaptiveUI(scale: number){
            this.innerPageHeight=this.innerHeight-adaptive(scale);
            console.log(this.innerPageHeight+"//"+this.innerHeight);
        }

        public static exploring:boolean=false;
        public static explorRId:number=0;
        public static explorLimit:any=null;

        public static exploreUIFun(isShow:boolean){
            exploreUI(isShow);
        }

        public static closeGameFun(isShow:boolean){
            smallGameClose(isShow);
        }

        public static showDownBtnFun(isShow:boolean){
            showDownBtn(isShow);
        }

        public static updataMaskBgFun(color:string,alpha:number){
            updataMaskBg(color,alpha);
        }
        public static loginMaskBgFun(color:string,alpha:number){
            updataLoginMaskBg(color,alpha);
        }

        public static setEventsReply(bool:boolean){
            setEgretEventsReply(bool);
        }

        public static getErrorStr(eid: number): string {
            var str: string = "";
            if (this.errorObj && eid > 1) {
                return this.errorObj[String(eid)];
            }
            return str;
        }

        public static getCityNameFun(lat:number,lng:number,fun:Function) {
            getCityName(lat,lng,fun);
        }

    }
}