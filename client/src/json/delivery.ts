module gameJson {export var delivery:Idelivery = JSON.parse('{"//":"发货API，运费，几个包邮","UrlAPIJumpTest":"http://210.73.214.214:80/Api/V8/ReqDeliveryItem_PP","UrlAPIJump":"http://103.244.233.249:80/Api/V8/ReqDeliveryItem_PP","UrlAPI":"http://logistics.giantfun.cn:8083/v1/logistics/delivery","Cost":100,"Freelimit":2,"GameId":"10002","Dev":"1"}');export interface Idelivery {
  '//': string;
  UrlAPIJumpTest: string;
  UrlAPIJump: string;
  UrlAPI: string;
  Cost: number;
  Freelimit: number;
  GameId: string;
  Dev: string;
}}