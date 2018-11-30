//
//  NSObject+InteractionJsVst.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//
#import <EgretNativeIOS.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import "InteractionJsVst.h"
#import "ExtFuncName.h"
#import "GameLib.h"
#import "ChannelLoginType.h"

#import "GameCenterSdkController.h"
#import "InAppPurchaseManager.h"
#import "FBLoginVst.h"

@implementation InteractionJsVst
{
    EgretNativeIOS* _native;
    NSString* _loginType;
    GameCenterSdkController* _gcsdkCtl;
    InAppPurchaseManager* _purchaseMgr;
    FBLoginVst *_fbLoginVst;
}
@synthesize loginType = _loginType;

-(void)initialize_inter:(EgretNativeIOS*)ntv viewController:(UIViewController *) view
{
    _native = ntv;
    //game center login
    _gcsdkCtl = [[GameCenterSdkController alloc] init];
    [_gcsdkCtl initialize];
    //支付
    _purchaseMgr = [[InAppPurchaseManager alloc] init];
    [_purchaseMgr initBuy];
    //fb 登录
    _fbLoginVst = [[FBLoginVst alloc] init];
    [_fbLoginVst initialize_fb:view];
    //添加事件交互侦听
    [self addInterObserver];
    //添加白鹭调用
    [self setExternalInterfaces];
}
//添加交互侦听
-(void) addInterObserver
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginFaildHandler:) name:@"interactionJsVst-loginFailed" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginsuccessHandler:) name:@"interactionJsVst-loginSuccess" object:nil];
}
 - (void) loginFaildHandler:(NSNotification *)note
{
    if([note.object isEqual:_gcsdkCtl])
    {
        NSLog(@"%@", @"gc 登录失败 failed");
        [self loginFailed:[note.userInfo objectForKey:@"code"]];
    }
    else if([note.object isEqual:_fbLoginVst])
    {
         NSLog(@"%@", @"fb 登录失败 failed");
        [self loginFailed:[note.userInfo objectForKey:@"code"]];
    }
}
-(void)loginsuccessHandler:(NSNotification *)note
{
    if([note.object isEqual:_gcsdkCtl])
    {
         NSLog(@"%@", @"gc 登录成功 success");
    }
    else if([note.object isEqual:_fbLoginVst])
    {
        NSLog(@"fb 登录成功 success %@", [GameLib dictionaryToJson:note.userInfo]);
        [self loginSuccess:[note.userInfo objectForKey:@"token"] openId:[note.userInfo objectForKey:@"openId"] nickName:[note.userInfo objectForKey:@"nickname"] face:[note.userInfo objectForKey:@"face"]];
    }
}
//设置侦听接口
-(void)setExternalInterfaces
{
    [self addInitialize];
    [self addLogin];
    [self addCheckLoginState];
    [self addCheckUnFinishedList];
    [self addDeleteOrder];
}

//初始化
-(void)addInitialize
{
    __block EgretNativeIOS* support = _native;
    [_native setExternalInterface:Egret_Initialize Callback:^(NSString* message) {
//        tgt.exitGameJsonObj = [GameLib dictionaryWithJsonString:message]; //apple 退出没有二次确认
        
        NSMutableDictionary *initDict = [[NSMutableDictionary alloc] init];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"ChannelType"] forKey:@"channelType"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleDisplayName"] forKey:@"appName"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleIdentifier"] forKey:@"bundleId"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleShortVersionString"] forKey:@"clientVersion"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"FacebookAppID"] forKey:@"facebook_appid"];
        NSString *hasfb = @"false";
        if([GameLib isFacebookInstalled])
        {
            hasfb = @"true";
        }
        hasfb = @"true";
        [initDict setObject:hasfb forKey:@"hasfacebook"];
        [initDict setObject:[GameLib getUUId] forKey:@"deviceId"];
        
        NSString* initDataStr = [GameLib dictionaryToJson:initDict];
        NSLog(@"白鹭initialize数据：%@", initDataStr);
        [support callExternalInterface:Egret_Initialize Value:initDataStr];
    }];
}
//登录
-(void)addLogin
{
    [_native setExternalInterface:Egret_Login Callback:^(NSString* message) {
        _loginType = message;
        if([message isEqual:ChannelLoginType_GameCenter])
        {
            
        }
        else if([message isEqual: ChannelLoginType_FaceBook])
        {
            [_fbLoginVst login];
        }
        NSLog(@"白鹭login数据：%@", message);
    }];
}
//检测登录状态
-(void)addCheckLoginState
{
    __block EgretNativeIOS* support = _native;
    __block GameCenterSdkController* gcsdkCtl = _gcsdkCtl;
    [_native setExternalInterface:Egret_CheckLoginState Callback:^(NSString* message) {
        _loginType = message;
        BOOL isLoggedIn = false;
        if([message isEqual:ChannelLoginType_GameCenter])
        {
            isLoggedIn = [gcsdkCtl isAuthenticated];
        }
        else if([message isEqual: ChannelLoginType_FaceBook])
        {
            if ([FBSDKAccessToken currentAccessToken]) {
                isLoggedIn = true;
                //FBSDKAccessToken 包含 userID，您可以使用此编号识别用户。
                    // User is logged in, do work such as go to next view controller.
            }
        }
        if (isLoggedIn) {
            [support callExternalInterface:Egret_CheckLoginState Value:@"1"];
        } else {
            [support callExternalInterface:Egret_CheckLoginState Value:@""];
        }
        NSLog(@"白鹭login数据：%@", message);
    }];
}
//检测未完成的订单
-(void)addCheckUnFinishedList
{
    __block InAppPurchaseManager *phsMgr = _purchaseMgr;
    [_native setExternalInterface:Egret_CheckLoginState Callback:^(NSString* message) {
        [phsMgr checkUnFinishedPayList];
        NSLog(@"白鹭Egret_CheckLoginState");
    }];
}
//添加删除订单侦听
-(void)addDeleteOrder
{
    __block InAppPurchaseManager *phsMgr = _purchaseMgr;
    [_native setExternalInterface:Egret_DeleteOrder Callback:^(NSString* message) {
        [phsMgr deleteOrder:message];
         NSLog(@"白鹭Egret_DeleteOrder");
    }];
}
//登录
-(void)loginSuccess:(NSString *)token openId:(NSString*) oId nickName:(NSString *)nickname face:(NSString *)fc
{
    NSMutableDictionary *loginDict = [[NSMutableDictionary alloc] init];
    [loginDict setObject:token forKey:@"token"];
    [loginDict setObject:oId forKey:@"openid"];
    [loginDict setObject:_loginType forKey:@"loginType"];
    [loginDict setObject:nickname forKey:@"nickname"];
    [loginDict setObject:fc forKey:@"face"];
    [loginDict setObject:@"1" forKey:@"status"];
    [_native callExternalInterface:Egret_Login Value:[GameLib dictionaryToJson:loginDict]];
}
//登录失败
-(void)loginFailed:(NSNumber*)code
{
    NSMutableDictionary *loginDict = [[NSMutableDictionary alloc] init];
    [loginDict setObject:code forKey:@"code"];
    [loginDict setObject:_loginType forKey:@"loginType"];
    [loginDict setObject:@"" forKey:@"status"];
    [_native callExternalInterface:Egret_Login Value:[GameLib dictionaryToJson:loginDict]];
}
//game center init
-(void)gameCenterInit:(NSNumber* )code
{
    NSMutableDictionary *gcinitDict = [[NSMutableDictionary alloc] init];
    [gcinitDict setObject:code forKey:@"code"];
    [_native callExternalInterface:Egret_GameCenterInit Value:[GameLib dictionaryToJson:gcinitDict]];
}
//登出
-(void)loginout
{
    NSMutableDictionary *loginDict = [[NSMutableDictionary alloc] init];
    [loginDict setObject:_loginType forKey:@"loginType"];
    [_native callExternalInterface:Egret_Loginout Value:[GameLib dictionaryToJson:loginDict]];
}
@end
