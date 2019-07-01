module gameJson {export var apple:Iapple = JSON.parse('{"//":"Apple支付验证地址","AppleLoginBundleidArray":["com.giantfun.texaspoker"],"ApplePayCheckUrl":{"paycheckurl":"https://buy.itunes.apple.com/verifyReceipt","paycheckurlsandbox":"https://sandbox.itunes.apple.com/verifyReceipt"}}');export interface Iapple {
  '//': string;
  AppleLoginBundleidArray: string[];
  ApplePayCheckUrl: ApplePayCheckUrl;
}export interface ApplePayCheckUrl {
  paycheckurl: string;
  paycheckurlsandbox: string;
}}