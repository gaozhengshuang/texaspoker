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
#import "MMMaterialDesignSpinner.h"

@implementation InteractionJsVst
{
    EgretNativeIOS* _native;
    NSString* _loginType;
    GameCenterSdkController* _gcsdkCtl;
    InAppPurchaseManager* _purchaseMgr;
    FBLoginVst *_fbLoginVst;
    UIImageView *splashScreen;
    UIImageView *logoImg;
    MMMaterialDesignSpinner *spinnerView;
    UILabel *_contentLabel;              //中间的label
}
@synthesize loginType = _loginType;

-(void)initialize_inter:(EgretNativeIOS*)ntv viewController:(UIViewController *) view
{
    [self splashImg:view];
    [self circleProgressBar:view];
    [self loadLabel:view];
    
    _native = ntv;
    //game center login
    _gcsdkCtl = [[GameCenterSdkController alloc] init];
    [_gcsdkCtl initialize:view];
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
-(void)splashImg:(UIViewController *)view
{
    splashScreen = [[UIImageView alloc] initWithFrame:view.view.bounds];
    splashScreen.image = [UIImage imageNamed:@"splash.jpg"];
    [view.view addSubview:splashScreen];
    
    logoImg = [[UIImageView alloc] init];
    logoImg.image = [UIImage imageNamed:@"logo.png"];
    int height = view.view.bounds.size.height / 1280 * 269;
    logoImg.bounds = CGRectMake(0, 0, view.view.bounds.size.width, height);
    logoImg.center = CGPointMake(CGRectGetMidX(view.view.bounds), height / 2);
    [view.view addSubview:logoImg];
}
-(void)circleProgressBar:(UIViewController *)view
{
    spinnerView = [[MMMaterialDesignSpinner alloc] initWithFrame:CGRectZero];
    spinnerView.bounds = CGRectMake(0, 0, 65, 65);
    spinnerView.tintColor = [UIColor colorWithRed:51.f/255 green:181.f/255 blue:229.f/255 alpha:1];
    
    spinnerView.center = CGPointMake(CGRectGetMidX(view.view.bounds), CGRectGetMaxY(view.view.bounds) - 100);
    spinnerView.lineWidth = 4;
    spinnerView.translatesAutoresizingMaskIntoConstraints = NO;
    [view.view addSubview:spinnerView];
}
-(void)loadLabel:(UIViewController *)view
{
    _contentLabel = [[UILabel alloc]init];
    _contentLabel.textAlignment = NSTextAlignmentCenter;
    _contentLabel.text = @"loading...";
    _contentLabel.font = [UIFont systemFontOfSize:15];
    _contentLabel.backgroundColor = [UIColor clearColor];
    _contentLabel.textColor = [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0];
    
    _contentLabel.frame = CGRectMake(0, 0, 100, 20);
    _contentLabel.center = CGPointMake(CGRectGetMidX(view.view.bounds), CGRectGetMaxY(view.view.bounds) - 50);
    [view.view addSubview:_contentLabel];
}
- (void)viewDidAppear {
    [spinnerView startAnimating];
}

//添加交互侦听
-(void) addInterObserver
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginFaildHandler:) name:@"interactionJsVst-loginFailed" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginsuccessHandler:) name:@"interactionJsVst-loginSuccess" object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(loginOutHandler:) name:@"interactionJsVst-loginout" object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(gameCenterInitHandler:) name:@"interactionJsVst-gameCenterInit" object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(payResultHandler:) name:@"interactionJsVst-payResult" object:nil];
}
 - (void) loginFaildHandler:(NSNotification *)note
{
    if([note.object isEqual:_gcsdkCtl])
    {
        NSLog(@"%@", @"gc 登录失败 failed");
        //code 3:玩家还没有登录GameCenter，切到后台再切回来登陆，或者去Game Center登陆。
        //code 2:gc login error
        if(note.userInfo != nil)
        {
            [self loginFailed:[note.userInfo objectForKey:@"code"]];
        }
        else
        {
            [self loginFailed:@""];
        }
    }
    else if([note.object isEqual:_fbLoginVst])
    {
         NSLog(@"%@", @"fb 登录失败 failed");
        if(note.userInfo != nil)
        {
            [self loginFailed:[note.userInfo objectForKey:@"code"]];
        }
        else
        {
            [self loginFailed:@""];
        }
    }
}
-(void)loginsuccessHandler:(NSNotification *)note
{
    if([note.object isEqual:_gcsdkCtl])
    {
         NSLog(@"%@", @"gc 登录成功 success");
        [self loginSuccess:@"" openId:@"" nickName:@"" face:@"" gameCenterData:note.userInfo];
    }
    else if([note.object isEqual:_fbLoginVst])
    {
        NSLog(@"fb 登录成功 success %@", [GameLib dictionaryToJson:note.userInfo]);
        [self loginSuccess:[note.userInfo objectForKey:@"token"] openId:[note.userInfo objectForKey:@"openId"] nickName:[note.userInfo objectForKey:@"nickname"] face:[note.userInfo objectForKey:@"face"] gameCenterData:nil];
    }
}
-(void)loginOutHandler:(NSNotification *)note
{
    [self loginout];
}
-(void)gameCenterInitHandler:(NSNotification *)note
{
    //code:0 成功
    //1:重复初始化
    //2:初始化error
    //3:Game Center登出了或者未知错误
    [self gameCenterInit:[note.userInfo objectForKey:@"code"]];
}

-(void)payResultHandler:(NSNotification *)note
{
    [self payResult:note.userInfo];
}
//设置侦听接口
-(void)setExternalInterfaces
{
    [self addInitialize];
    [self addLogin];
    [self addLoginOut];
    [self addCheckLoginState];
    [self addCheckUnFinishedList];
    [self addPay];
    [self addDeleteOrder];
}

//初始化
-(void)addInitialize
{
    __block EgretNativeIOS* support = _native;
//    __block UIImageView *imgView = splashScreen;
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
        [splashScreen removeFromSuperview];
        [logoImg removeFromSuperview];
        [spinnerView removeFromSuperview];
        [_contentLabel removeFromSuperview];
        [support callExternalInterface:Egret_Initialize Value:initDataStr];
    }];
}
//登录
-(void)addLogin
{
    __block InteractionJsVst *sf = self;
    [_native setExternalInterface:Egret_Login Callback:^(NSString* message) {
        _loginType = message;
        if([message isEqual:ChannelLoginType_GameCenter])
        {
            [_gcsdkCtl login];
        }
        else if([message isEqual: ChannelLoginType_FaceBook])
        {
            FBSDKAccessToken *token = [FBSDKAccessToken currentAccessToken];
            if (token != nil) {
                [sf loginSuccess:[token tokenString] openId:[token userID] nickName:@"" face:@"" gameCenterData:nil];
                //FBSDKAccessToken 包含 userID，您可以使用此编号识别用户。
                // User is logged in, do work such as go to next view controller.
            }
            else
            {
                [_fbLoginVst login];
            }
        }
        NSLog(@"白鹭login数据：%@", message);
    }];
}

//登出
-(void)addLoginOut
{
    __block InteractionJsVst *sf = self;
    [_native setExternalInterface:Egret_Loginout Callback:^(NSString* message) {
        _loginType = message;
        if([message isEqual:ChannelLoginType_GameCenter])
        {
            [sf loginout];
        }
        else if([message isEqual: ChannelLoginType_FaceBook])
        {
           [_fbLoginVst loginOut];
           [sf loginout];
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
    [_native setExternalInterface:Egret_CheckUnFinishedPayList Callback:^(NSString* message) {
        [phsMgr checkUnFinishedPayList];
        NSLog(@"白鹭Egret_CheckLoginState");
    }];
}
//充值
-(void) addPay
{
    __block InAppPurchaseManager *phsMgr = _purchaseMgr;
    [_native setExternalInterface:Egret_Pay Callback:^(NSString* message) {
        NSDictionary *dict = [GameLib dictionaryWithJsonString:message];
        NSString *productId = [[[NSBundle mainBundle]infoDictionary] objectForKey:@"CFBundleIdentifier"];
        productId = [productId stringByAppendingString:@"."];
        productId = [productId stringByAppendingString:  [[dict objectForKey:@"awardId"] stringValue]];
        NSString *passData = [dict objectForKey:@"passData"];
        NSLog(@"白鹭Egret_Pay productId:%@ passData:%@", productId, passData);
        [phsMgr purchaseRequest:productId passData:passData];
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
-(void)loginSuccess:(NSString *)token openId:(NSString*) oId nickName:(NSString *)nickname face:(NSString *)fc gameCenterData:(NSMutableDictionary *)gcData
{
    if(gcData == nil)
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
    else
    {
        [gcData setObject:@"1" forKey:@"status"];
        [_native callExternalInterface:Egret_Login Value:[GameLib dictionaryToJson:gcData]];
    }
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
    [_native callExternalInterface:Egret_Loginout Value:@""];
}
//支付结果
-(void)payResult:(NSDictionary *)dict
{
    [_native callExternalInterface:Egret_Pay Value:[GameLib dictionaryToJson:dict]];
}
@end
