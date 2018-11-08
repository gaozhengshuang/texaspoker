module gameJson {export var room:Iroom = JSON.parse('{"//":"公共房间所在服务器","TexasFightRoomName":"RoomServer00","MTTRoomServer":"RoomServer01","PublicRoomServer":"RoomServer02"}');export interface Iroom {
  '//': string;
  TexasFightRoomName: string;
  MTTRoomServer: string;
  PublicRoomServer: string;
}}