package com.giant.gamelib;

public final class ExtFuncName {
    /**
     * JS初始化完成
     */
    public  static final String Initialize = "Initialize";
    /**
     * 登录
     */
    public  static final  String Login = "Login";
    /**
     * 登出
     */
    public  static final  String LoginOut = "Logout";
    /**
     * 检查登录状态 如果没过期，且登录类型相符合，则自动登录
     */
    public  static final  String CheckLoginState = "CheckLoginState";
    /**
     * 支付
     */
    public  static  final String Pay = "Pay";
    /**
     * 检测未消耗的订单
     */
    public  static final String CheckUnFinishedPayList = "CheckUnFinishedPayList";
    /**
     * 消耗订单
     */
    public  static  final String DeleteOrder = "DeleteOrder";
}
