module gameJson {export var global:Iglobal = JSON.parse('{"//":"邮件最大存储时效,天","String":"string field","Int":20170927,"Float":2017.0927,"Bool":true,"ObjArray":[{"item":1001,"name":"新手礼包1"},{"item":1002,"name":"新手礼包2"},{"item":1003,"name":"新手礼包3"}],"StrArray":["hello1","hello2","hello3"],"IntArray":[8001,8002,8003,8004],"DisconClean":0,"HearBeat":{"timeout":300000},"NewUser":{"yuanbao":10000,"gold":10000,"Diamond":10000},"RechargeCallback":"http://210.73.214.67:19000","IntranetFlag":false,"Sms":{"UrlAPI":"http://211.147.239.62:9051/api/v1.0.0/message/mass/send","Account":"shjf@shjf","Passwd":"00ecUAHi","AuthCodeContent":"欢迎来到弹弹乐，您的验证码是"},"Mail":{"ExpiryDate":30,"Capacity":30}}');export interface Iglobal {
  '//': string;
  String: string;
  Int: number;
  Float: number;
  Bool: boolean;
  ObjArray: ObjArray[];
  StrArray: string[];
  IntArray: number[];
  DisconClean: number;
  HearBeat: HearBeat;
  NewUser: NewUser;
  RechargeCallback: string;
  IntranetFlag: boolean;
  Sms: Sms;
  Mail: Mail;
}export interface Mail {
  ExpiryDate: number;
  Capacity: number;
}export interface Sms {
  UrlAPI: string;
  Account: string;
  Passwd: string;
  AuthCodeContent: string;
}export interface NewUser {
  yuanbao: number;
  gold: number;
  Diamond: number;
}export interface HearBeat {
  timeout: number;
}export interface ObjArray {
  item: number;
  name: string;
}}