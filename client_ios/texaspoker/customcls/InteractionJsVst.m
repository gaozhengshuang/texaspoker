//
//  NSObject+InteractionJsVst.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//
#import <EgretNativeIOS.h>
#import "InteractionJsVst.h"
#import "ExtFuncName.h"
#import "GameLib.h"
#import "AppDelegate.h"
#import "ChannelLoginType.h"

@implementation InteractionJsVst:NSObject
{
    EgretNativeIOS* _native;
    AppDelegate* target;
    NSString* _loginType;
}
@synthesize loginType = _loginType;
-(void)initialize:(AppDelegate*) ctx
{
    target = ctx;
}
//设置侦听接口
-(void)setExternalInterfaces
{
    [self addInitialize];
    [self addLogin];
    [self addCheckLoginState];
}
//初始化
-(void)addInitialize
{
    __block EgretNativeIOS* support = _native;
    __block AppDelegate* tgt = target;
    [_native setExternalInterface:Egret_Initialize Callback:^(NSString* message) {
        tgt.exitGameJsonObj = [GameLib dictionaryWithJsonString:message];
        
        [[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleDisplayName"];
        
        NSMutableDictionary *initDict = [[NSMutableDictionary alloc] init];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"ChannelType"] forKey:@"channelType"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleDisplayName"] forKey:@"appName"];
        [initDict setObject:[[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleIdentifier"] forKey:@"bundleId"];
        [initDict setObject:[GameLib getUUId] forKey:@"deviceId"];
        [initDict setObject:[target clientVersion] forKey:@"clientVersion"];
        
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
            
        }
        NSLog(@"白鹭login数据：%@", message);
    }];
}
//检测登录状态
-(void)addCheckLoginState
{
    __block EgretNativeIOS* support = _native;
    [_native setExternalInterface:Egret_CheckLoginState Callback:^(NSString* message) {
        _loginType = message;
        BOOL isLoggedIn;
        if([message isEqual:ChannelLoginType_GameCenter])
        {
            isLoggedIn = [target.gcsdkCtl.isAuthenticated];
        }
        else if([message isEqual: ChannelLoginType_FaceBook])
        {
            
        }
        if (isLoggedIn) {
            [support callExternalInterface:Egret_CheckLoginState Value:@"1"];
        } else {
            [support callExternalInterface:Egret_CheckLoginState Value:@""];
        }
        NSLog(@"白鹭login数据：%@", message);
    }];
}
//登录
-(void)loginSuccess:(NSString *)token openId:(NSString*) oId extraData:(NSString *)extData
{
    NSMutableDictionary *loginDict = [[NSMutableDictionary alloc] init];
    [loginDict setObject:token forKey:@"token"];
    [loginDict setObject:oId forKey:@"openid"];
    [loginDict setObject:_loginType forKey:@"loginType"];
    if(extData == nil)
    {
        extData = @"";
    }
    [loginDict setObject:extData forKey:@"extData"];
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
