module gameJson {export var mysql:Imysql = JSON.parse('{"//":"缓存连接数","User":"xiejian","Passwd":"123456","Database":"texaspoker","Address":"127.0.0.1","Port":3306,"Connectnum":30}');export interface Imysql {
  '//': string;
  User: string;
  Passwd: string;
  Database: string;
  Address: string;
  Port: number;
  Connectnum: number;
}}