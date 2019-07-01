module game
{
    export var $isWx: boolean = false;
    export var $neiNetIp: string = "https://bfp.giantfun.cn";

    //发货IP
    export var $goodsIp: string = "http://logistics.giantfun.cn:8083";
    export var $goodsPath: string = "/v1/logistics/query";

    //外网IP
    //  export var $registIp: string = "http://210.73.214.74:7003";
    //  export var $netIp: string = "ws://210.73.214.74:7002/ws_handler";
    //  export var $gameNetIp: string = "ws://210.73.214.74:{gamePort}/ws_handler";

    //策划服务器
    // export var $registIp: string = "http://192.168.30.204:7003";
    // export var $netIp: string = "ws://192.168.30.204:7002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.204:{gamePort}/ws_handler";


    // //正双服务器
    // export var $registIp: string = "http://192.168.30.202:7003";
    // export var $netIp: string = "ws://192.168.30.202:7101/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.202:{gamePort}/ws_handler";

    //谢建服务器
    // export var $registIp: string = "http://192.168.30.203:27003";
    // export var $netIp: string = "ws://192.168.30.203:27002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.203:{gamePort}/ws_handler"
    //谢建2号
    // export var $registIp: string = "http://192.168.30.203:37003";
    // export var $netIp: string = "ws://192.168.30.203:37002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.203:{gamePort}/ws_handler";

    //毕强服务器
    // export var $registIp: string = "http://192.168.30.205:7003";
    // export var $netIp: string = "ws://192.168.30.205:7002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.205:{gamePort}/ws_handler";

    //刘凯服务器
    // export var $registIp: string = "http://192.168.30.206:7002";
    // export var $netIp: string = "ws://192.168.30.206:17002/ws_handler";
    // export var $gameNetIp: string = "ws://192.168.30.206:{gamePort}/ws_handler";

    export var serverInfo: ServerInfo = {};

    function setConnectInfo()
    {
        if (RELEASE)
        { //发布模式 自动设置外网连接模式
            //    serverInfo.$registIp = "http://210.73.214.74:7003";
            // serverInfo.$netIp = "ws://192.168.30.202:7101/ws_handler";
            // serverInfo.$gameNetIp = "ws://192.168.30.202:{gamePort}/ws_handler";

            //台湾测试网址
            serverInfo.$netIp = "ws://45.63.4.17:7002/ws_handler";
            serverInfo.$gameNetIp = "ws://45.63.4.17:{gamePort}/ws_handler";
            //公司测试网址
            // serverInfo.$netIp = "ws://210.73.214.74:17002/ws_handler";
            // serverInfo.$gameNetIp = "ws://210.73.214.74:{gamePort}/ws_handler";
        }
    }
    setConnectInfo();

    /**
    * 服务器信息
    */
    export interface ServerInfo
    {
        name?: string;
        $netIp?: string;
        $gameNetIp?: string;
        isDefault?: boolean;
    }
}
