module gameJson {export var wechat:Iwechat = JSON.parse('{"//":"微信小游戏","AppId_RRWWJ":"wx03789100061e5d6c","AppSecret_RRWWJ":"81e8f7d08b55f0f4a0ea3c4b15f558c6","Mchid":"1500100872","PaySecret":"RMEqvgecHWoa4Fkv5Q1gaBT82iuBl4hw","AppId":"wx50a65298622b1651","AppSecret":"6934870a36e3d0e3f02e32ef9bd013cb","Mchid1":"1495077762","PaySecret1":"80a8c4a9d76c71e1701c001e3a41583e","WechatMiniGame":{"MidasOfferID":"1450016022","MidasSecret1":"80a8c4a9d76c71e1701c001e3a41583e","MidasCancelPay1":"https://api.weixin.qq.com/cgi-bin/midas/cancelpay?access_token=","MidasBalance1":"https://api.weixin.qq.com/cgi-bin/midas/getbalance?access_token=","MidasPay1":"https://api.weixin.qq.com/cgi-bin/midas/pay?access_token=","MidasPresent1":"https://api.weixin.qq.com/cgi-bin/midas/present?access_token=","Jscode2Session":"https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code","MidasCancelPay":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/cancelpay?access_token=","MidasBalance":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/getbalance?access_token=","MidasPay":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/pay?access_token=","MidasPresent":"https://api.weixin.qq.com/cgi-bin/midas/sandbox/present?access_token=","MidasSecret":"XYXpkBu1iEzgu0W0WMHmuK8LGVLPRuma"}}');export interface Iwechat {
  '//': string;
  AppId_RRWWJ: string;
  AppSecret_RRWWJ: string;
  Mchid: string;
  PaySecret: string;
  AppId: string;
  AppSecret: string;
  Mchid1: string;
  PaySecret1: string;
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
}}