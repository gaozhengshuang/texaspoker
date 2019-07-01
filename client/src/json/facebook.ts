module gameJson {export var facebook:Ifacebook = JSON.parse('{"//":"Facebook登录","FaceBookLogin":[{"appid":"363730244187851","appsecret":"238d2b5c659c0c16441b697ee2c6e01a"}]}');export interface Ifacebook {
  '//': string;
  FaceBookLogin: FaceBookLogin[];
}export interface FaceBookLogin {
  appid: string;
  appsecret: string;
}}