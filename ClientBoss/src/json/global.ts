module gameJson {export var global:Iglobal = JSON.parse('{"//":"微信小游戏","string":"string field","int":20170927,"float":2017.0927,"bool":true,"objArray":[{"item":1001,"name":"新手礼包1"},{"item":1002,"name":"新手礼包2"},{"item":1003,"name":"新手礼包3"}],"strArray":["hello1","hello2","hello3"],"intArray":[8001,8002,8003,8004],"disconclean":0,"hearbeat":{"timeout":30000},"NewUser":{"yuanbao":0,"gold":1000,"Diamond":0},"Delivery":{"UrlAPIJumpTest":"http://210.73.214.214:80/Api/V8/ReqDeliveryItem_PP","UrlAPIJump":"http://103.244.233.249:80/Api/V8/ReqDeliveryItem_PP","UrlAPI":"http://logistics.giantfun.cn:8083/v1/logistics/delivery","Cost":100,"Freelimit":2,"GameId":"10002","Dev":"1"},"PickYuanbaoNotice":100,"PresentFreeStep":5,"RechargeCallback":"http://210.73.214.67:19000","HongBaoAPI":{"secret2":"topjump","key2":"topjump","getaddress2":"http://open.std.tvmopt.com/public/user/GetDeliveryAddresses","recharge2":"http://open.std.tvmopt.com/public/finance/MultiRecharge","secret":"cec2795b1ce550ca63a27d3f1d61c91291d9bee2f5c1b1346dba011cae266607","key":"tope7b61803d1091f9b5e0bdcf2f486e","getaddress":"https://open.yx.tvyouxuan.com/public/user/GetDeliveryAddresses","recharge":"https://open.yx.tvyouxuan.com/public/finance/MultiRecharge","CharacterCreation":"https://open.yx.tvyouxuan.com/public/event/CharacterCreation","Online":"https://open.yx.tvyouxuan.com/public/event/Online","Battles":"https://open.yx.tvyouxuan.com/public/event/Battles","CharacterLevel":"https://open.yx.tvyouxuan.com/public/event/CharacterLevel","ConsumeMoney":"https://open.yx.tvyouxuan.com/public/event/ConsumeMoney","LootMoney":"https://open.yx.tvyouxuan.com/public/event/LootMoney","Victory":"https://open.yx.tvyouxuan.com/public/event/Victory","FinanceQuery":"https://open.yx.tvyouxuan.com/public/finance/Query","DecrCoins":"https://open.yx.tvyouxuan.com/public/finance/DecrCoins","IncrDiamonds":"https://open.yx.tvyouxuan.com/public/finance/IncrDiamonds","CheckWechatBound":"https://open.yx.tvyouxuan.com/public/user/CheckWechatBound"},"IntranetFlag":false,"Sms":{"UrlAPI":"http://211.147.239.62:9051/api/v1.0.0/message/mass/send","Account":"shjf@shjf","Passwd":"00ecUAHi","AuthCodeContent":"欢迎来到弹弹乐，您的验证码是"},"Wechat":{"AppId_RRWWJ":"wx03789100061e5d6c","AppSecret_RRWWJ":"81e8f7d08b55f0f4a0ea3c4b15f558c6","Mchid":"1500100872","PaySecret":"RMEqvgecHWoa4Fkv5Q1gaBT82iuBl4hw","AppId":"wx50a65298622b1651","AppSecret":"6934870a36e3d0e3f02e32ef9bd013cb","Mchid1":"1495077762","PaySecret1":"80a8c4a9d76c71e1701c001e3a41583e"},"WechatMiniGame":{"MidasOfferID":"1450016022","MidasSecret1":"80a8c4a9d76c71e1701c001e3a41583e","MidasCancelPay1":"https://api.weixin.qq.com/cgi-bin/midas/cancelpay?access_token=","MidasBalance1":"https://api.weixin.qq.com/cgi-bin/midas/getbalance?access_token=","MidasPay1":"https://api.weixin.qq.com/cgi-bin/midas/pay?access_token=","MidasPresent1":"https://api.weixin.qq.com/cgi-bin/midas/present?access_token=","Jscode2Session":"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code","MidasCancelPay":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/cancelpay?access_token=","MidasBalance":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/getbalance?access_token=","MidasPay":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/pay?access_token=","MidasPresent":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/present?access_token=","MidasSecret":"XYXpkBu1iEzgu0W0WMHmuK8LGVLPRuma"}}');export interface Iglobal {
  '//': string;
  string: string;
  int: number;
  float: number;
  bool: boolean;
  objArray: ObjArray[];
  strArray: string[];
  intArray: number[];
  disconclean: number;
  hearbeat: Hearbeat;
  NewUser: NewUser;
  Delivery: Delivery;
  PickYuanbaoNotice: number;
  PresentFreeStep: number;
  RechargeCallback: string;
  HongBaoAPI: HongBaoAPI;
  IntranetFlag: boolean;
  Sms: Sms;
  Wechat: Wechat;
  WechatMiniGame: WechatMiniGame;
}export interface WechatMiniGame {
  MidasOfferID: string;
  MidasSecret1: string;
  MidasCancelPay1: string;
  MidasBalance1: string;
  MidasPay1: string;
  MidasPresent1: string;
  Jscode2Session: string;
  MidasCancelPay: string;
  MidasBalance: string;
  MidasPay: string;
  MidasPresent: string;
  MidasSecret: string;
}export interface Wechat {
  AppId_RRWWJ: string;
  AppSecret_RRWWJ: string;
  Mchid: string;
  PaySecret: string;
  AppId: string;
  AppSecret: string;
  Mchid1: string;
  PaySecret1: string;
}export interface Sms {
  UrlAPI: string;
  Account: string;
  Passwd: string;
  AuthCodeContent: string;
}export interface HongBaoAPI {
  secret2: string;
  key2: string;
  getaddress2: string;
  recharge2: string;
  secret: string;
  key: string;
  getaddress: string;
  recharge: string;
  CharacterCreation: string;
  Online: string;
  Battles: string;
  CharacterLevel: string;
  ConsumeMoney: string;
  LootMoney: string;
  Victory: string;
  FinanceQuery: string;
  DecrCoins: string;
  IncrDiamonds: string;
  CheckWechatBound: string;
}export interface Delivery {
  UrlAPIJumpTest: string;
  UrlAPIJump: string;
  UrlAPI: string;
  Cost: number;
  Freelimit: number;
  GameId: string;
  Dev: string;
}export interface NewUser {
  yuanbao: number;
  gold: number;
  Diamond: number;
}export interface Hearbeat {
  timeout: number;
}export interface ObjArray {
  item: number;
  name: string;
}}