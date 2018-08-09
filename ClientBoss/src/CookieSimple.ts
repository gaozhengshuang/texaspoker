/**
 * Created by JL on 2016/3/4.
 *
 * (单例对象)测试Cookie用法:
 * CookieSimple.instance.writeCookie("Te=st","3月19日$>=100活动",2);
 
 * var testtValue:string = CookieSimple.instance.readCookie("Testt");
 * var testValue:string = CookieSimple.instance.readCookie("Test");
 * var te_stValue:string = CookieSimple.instance.readCookie("Te=st");
 * console.log("testtValue:",testtValue,"|  testValue:",testValue,"|    Te=st:",te_stValue);
 
 */
class CookieSimple {
    private static _instance:CookieSimple;
 
    public constructor(s:CookieSimpleSingleFlag){
 
    }
 
    public static get instance():CookieSimple {
        if(!this._instance) {
            this._instance = new CookieSimple(new CookieSimpleSingleFlag());
        }
        return this._instance;
    }
 
    /**
     *  写Cookie
     * @param name 名称
     * @param value 值
     * @param expiredays 单位是天数，默认有效期30天
     */
    public writeCookie(name:string,value:string,expiredays:number = 30):void {
        setCookie(name,value,expiredays);
    }
 
    /**
     * 读Cookie
     * @param name
     */
    public readCookie(name:string):string {
        return getCookie(name);
    }
 
    /**
     * 删Cookie
     * @param name
     */
    public delCookie(name:string):void {
        delCookie(name);
    }

    /**
     * post访问页面
     * @param name
     */
    public postUrl(pUrl:string, PARAMS:any):void {
        post(pUrl, PARAMS);
    }

    public getIPStr():string {
        return getIP();
    }
 
 
}
 
class CookieSimpleSingleFlag{
 
}