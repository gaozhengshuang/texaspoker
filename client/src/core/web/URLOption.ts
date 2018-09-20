class URLOption
{
    /**
     * 应用ID
     */
    public static readonly AppId: string = 'appid';
    /**
     * 渠道标识
     */
    public static readonly Channel: string = 'channel';
    /**
     * 是否连接测试服
     */
    public static readonly ServerTest: string = 'server_test';
    /**
     * 调试登录类型
     */
    public static readonly DebugLoginType: string = 'debug_logintype';
    /**
     * 调试登录的token
     */
    public static readonly DebugToken: string = 'debug_token';
    /**
     * 数字的包id（用于区分这个包是谁的）
     */
    public static readonly Bid: string = 'bid';
    /**
     * 是否输出日志
     */
    public static readonly Log:string = 'log';
    /**
     * 邀请码
     */
    public static readonly InviteCode:string = 'invite_code';
    /**
     * 
     */
    public static readonly State:string = 'state';

    //------------------------------------------------------------------
    // 
    //------------------------------------------------------------------

    public static getString(key: string): string
    {
        return egret.getOption(key);
    }
    public static getBoolean(key: string): boolean
    {
        return game.StringUtil.toBoolean(egret.getOption(key));
    }
    public static getNumber(key: string): number
    {
        return parseFloat(egret.getOption(key));
    }
}