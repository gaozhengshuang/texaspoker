module gameJson {export var google:Igoogle = JSON.parse('{"//":"谷歌支付","GoogleLoginAppIdArray":["101076164035-tn8cllnmdhdhjro70scvedt9gj0kc1l9.apps.googleusercontent.com"],"GooglePayConfig":[{"clientid":"101076164035-tn8cllnmdhdhjro70scvedt9gj0kc1l9.apps.googleusercontent.com","clientsecret":"pEA-Dk3AbOkd41Fo9pffWwVc","refreshtoken":"1/PCGsl2_fu6EH4jcy447nmGh9_sH5ybdQgSZ36fky47I","packagename":"com.giantfun.texaspoker"}]}');export interface Igoogle {
  '//': string;
  GoogleLoginAppIdArray: string[];
  GooglePayConfig: GooglePayConfig[];
}export interface GooglePayConfig {
  clientid: string;
  clientsecret: string;
  refreshtoken: string;
  packagename: string;
}}