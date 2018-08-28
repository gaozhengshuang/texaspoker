module gameJson {export var game:Igame = JSON.parse('{"//":"超级砖块获得奖励","LuckDrawPrice":2000,"LuckDrawHistroyLimlit":5,"FreePresentRule":{"Count":1,"FloorTrigger":1000,"Money":1000},"BulletPrice":10,"BombDeductMoney":500,"MaxEnergy":250,"Diamond_To_Coins":1,"SuperBrickReward":3000}');export interface Igame {
  '//': string;
  LuckDrawPrice: number;
  LuckDrawHistroyLimlit: number;
  FreePresentRule: FreePresentRule;
  BulletPrice: number;
  BombDeductMoney: number;
  MaxEnergy: number;
  Diamond_To_Coins: number;
  SuperBrickReward: number;
}export interface FreePresentRule {
  Count: number;
  FloorTrigger: number;
  Money: number;
}}