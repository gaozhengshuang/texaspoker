module gameJson {export var game:Igame = JSON.parse('{"//":"地图事件","LuckDrawPrice":2000,"LuckDrawHistroyLimlit":5,"BulletPrice":10,"BombDeductMoney":500,"MaxEnergy":250,"Diamond_To_Coins":1,"SuperBrickReward":3000,"MapEvent":{"//":"弹弹乐免费子弹数","TimeRefresh":2,"TantanleFreeBullet":50}}');export interface Igame {
  '//': string;
  LuckDrawPrice: number;
  LuckDrawHistroyLimlit: number;
  BulletPrice: number;
  BombDeductMoney: number;
  MaxEnergy: number;
  Diamond_To_Coins: number;
  SuperBrickReward: number;
  MapEvent: MapEvent;
}export interface MapEvent {
  '//': string;
  TimeRefresh: number;
  TantanleFreeBullet: number;
}}