module gameJson {export var texasfight:Itexasfight = JSON.parse('{"//":"AI奖池抽水上限 %","SystemPumpRate":95,"AIUserAmount":20,"BankerQueueMaxAINum":1,"AIBankerMoneyRate":[110,150],"AIProfitLossHistoryRate":{"Min":100,"Max":101},"AIBetRandRate":[5,15],"AIJoinBetRandNum":[10,20],"AIPumpWaterLevel":1000000,"AIPumpRandRate":[150,150],"AIDumpRandRate":[50,50],"AIAwardPoolPumpRate":90}');export interface Itexasfight {
  '//': string;
  SystemPumpRate: number;
  AIUserAmount: number;
  BankerQueueMaxAINum: number;
  AIBankerMoneyRate: number[];
  AIProfitLossHistoryRate: AIProfitLossHistoryRate;
  AIBetRandRate: number[];
  AIJoinBetRandNum: number[];
  AIPumpWaterLevel: number;
  AIPumpRandRate: number[];
  AIDumpRandRate: number[];
  AIAwardPoolPumpRate: number;
}export interface AIProfitLossHistoryRate {
  Min: number;
  Max: number;
}}