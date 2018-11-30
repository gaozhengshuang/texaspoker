//
//  GameCenterSdkController.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//

#import <GameKit/GameKit.h>
#import "GameCenterSdkController.h"
#import "GameLib.h"

@implementation GameCenterSdkController :NSObject
{
    // 记录上次的账号，用于确认是否有登出操作
    NSString* _lastPlayerId;
    // 保证只初始化一次
    BOOL _hasInit;
    // 判断是否登陆过一次了
    BOOL _hasLoginOnce;
}

//初始化
-(void)initialize
{
    

    
    
    NSLog(@"初始化 init");
    //一般要在这里增加回调监听
    
    if (self->_hasInit)
    {
        [self postGameCenterInit:1];
//        [target.interactionJsVst gameCenterInit:[NSNumber numberWithInt:1]];
//        [self sendMessageToUnity:"init" code:1 data:@"想要再次验证Game Center，请切到后台再切回来，或者重启游戏。"];

        return;
    }
    self->_hasInit = true;
    
    [self registerForAuthenticationNotification];
    [self setAuthenticateLocalPlayer];
}
//抛送gcdinit事件
-(void)postGameCenterInit:(int)code
{
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:code] forKey:@"code"];
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc postNotificationName: @"interactionJsVst-gameCenterInit"   // 消息名（字符串）
                      object:self                                // 消息源
                    userInfo:dict];
}
-(void)postLoginFailed:(int)code
{
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:[NSNumber numberWithInt:code] forKey:@"code"];
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc postNotificationName: @"interactionJsVst-loginFailed"   // 消息名（字符串）
                      object:self                                // 消息源
                    userInfo:dict];
}
//注销
- (void)logout
{
    NSLog(@"注销 logout");
    
    // 苹果没有主动登出一说
//    [self sendMessageToUnity:"logout" code:0 data:@""];
//    [target.interactionJsVst loginout];
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc postNotificationName: @"interactionJsVst-loginout"   // 消息名（字符串）
                      object:self                                // 消息源
                    userInfo:nil];
}

//登陆
- (void)login
{
    NSLog(@"登陆 login");
    
    [self getSignature];
    
}

-(BOOL) isAuthenticated
{
    return [[GKLocalPlayer localPlayer] isAuthenticated];
}

-(NSString*) getLocalPlayerId
{
    if ([self isAuthenticated])
    {
        return [GKLocalPlayer localPlayer].playerID;
    }
    
    return nil;
}


// 这玩意只有第一次执行的时候会触发回调
-(void) setAuthenticateLocalPlayer
{
    NSLog(@"setAuthenticateLocalPlayer");
    
    GKLocalPlayer *localPlayer = [GKLocalPlayer localPlayer];
    
    [localPlayer setAuthenticateHandler:(^(UIViewController* viewcontroller, NSError *error)
                                         {
                                             [self authenticateCallback:viewcontroller Error:error];
                                         })];
}

// 这玩意每次切换到桌面再切回来还会被调用一次，有点像支付
-(void) authenticateCallback:(UIViewController*)viewcontroller Error:(NSError*)error
{
    NSLog(@"authenticateCallback");
    
    if (viewcontroller != nil)
    {
        NSLog(@"打开Game Center验证界面。");
        
//        [self.rootViewController  presentViewController:viewcontroller animated:YES completion:nil]; //move todo
    }
    else
    {
        // 登出再登陆的，说明已经初始化过了
        if (self->_hasLoginOnce)
        {
            return;
        }
        
        // 切到后台，登出，再切回来，依旧是空viewcontroller，空error，非常神奇
        if ([self isAuthenticated])
        {
            self->_hasLoginOnce = true;
            
//            [self sendMessageToUnity:"init" code:0 data:@""];
            [self postGameCenterInit:0];
//            [target.interactionJsVst gameCenterInit:[NSNumber numberWithInt:0]];
        }
        else
        {
            if (error)
            {
                [self postGameCenterInit:2];
//                [target.interactionJsVst gameCenterInit:[NSNumber numberWithInt:2]];
//                [self sendMessageToUnity:"init" code:1 data:[NSString stringWithFormat:@"code=%ld description=%@", (long)error.code, error.description]];
            }
            else
            {
                [self postGameCenterInit:3];
//                [target.interactionJsVst gameCenterInit:[NSNumber numberWithInt:3]];
//                [self sendMessageToUnity:"init" code:1 data:@"Game Center登出了或者未知错误"];
            }
        }
    }
}


-(void) getSignature
{
    // 如果还没有登录，特殊处理
    if (![self isAuthenticated])
    {
//        [self sendMessageToUnity:"login" code:2 data:@"玩家还没有登录GameCenter，切到后台再切回来登陆，或者去Game Center登陆。"];
//        [target.interactionJsVst loginFailed:[NSNumber numberWithInt:3]];
        [self postLoginFailed:3];
        return;
    }
    
    GKLocalPlayer *localPlayer = [GKLocalPlayer localPlayer];
    [localPlayer generateIdentityVerificationSignatureWithCompletionHandler:^(NSURL *publicKeyUrl, NSData *signature, NSData *salt, uint64_t timestamp, NSError *error)
     {
         
         if(error != nil)
         {
//             [self sendMessageToUnity:"login" code:2 data:[NSString stringWithFormat:@"code=%ld description=%@", (long)error.code, error.description]];
//             [target.interactionJsVst loginFailed:[NSNumber numberWithInt:2]];
             [self postLoginFailed:2];
             return;
         }
         
         
         NSMutableDictionary* dict = [[NSMutableDictionary alloc] init];
         [dict setObject:[publicKeyUrl absoluteString] forKey:@"url"];
          [dict setObject:[NSString stringWithFormat:@"%@", [signature base64EncodedStringWithOptions: 0]] forKey:@"sig"];
          [dict setObject:[NSString stringWithFormat:@"%@", [salt base64EncodedStringWithOptions: 0]] forKey:@"slt"];
          [dict setObject:[NSString stringWithFormat:@"%llu", timestamp] forKey:@"stamp"];
          [dict setObject:[GKLocalPlayer localPlayer].playerID forKey:@"playerId"];
          [dict setObject:[NSBundle mainBundle].bundleIdentifier forKey:@"bundleId"];
         
//         NSString* url = [publicKeyUrl absoluteString];
//         NSString* sig = [NSString stringWithFormat:@"%@", [signature base64EncodedStringWithOptions: 0]];
//         NSString* slt = [NSString stringWithFormat:@"%@", [salt base64EncodedStringWithOptions: 0]];
//         NSString* stamp = [NSString stringWithFormat:@"%llu", timestamp];
//         NSString* playerId = [GKLocalPlayer localPlayer].playerID;
//         NSString* bundleId = [NSBundle mainBundle].bundleIdentifier;
         
//         NSString* data = [NSString stringWithFormat:@"%@|%@|%@|%@|%@|%@", playerId, sig, slt, stamp, url, bundleId];
//         NSLog(@"%@", data);
//         [target.interactionJsVst loginSuccess:@"" openId:@"" extraData:[GameLib dictionaryToJson:dict]];
         
         NSMutableDictionary *userdict = [[NSMutableDictionary alloc] init];
         [userdict setObject:@"" forKey:@"token"];
         [userdict setObject:@"" forKey:@"openId"];
         [userdict setObject:[GameLib dictionaryToJson:dict] forKey:@"extraData"];
         NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
         [nc postNotificationName: @"interactionJsVst-loginSuccess"   // 消息名（字符串）
                           object:self                                // 消息源
                         userInfo:userdict];
         
//         [self postLoginSuccess:<#(int)#>:2];
//         [self sendMessageToUnity:"login" code:0 data:data];
     }];
}

-(void) registerForAuthenticationNotification
{
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc addObserver: self selector:@selector(authenticationChanged) name:GKPlayerAuthenticationDidChangeNotificationName object:nil];
}

// 这玩意会比authenticationHandler早回调
-(void) authenticationChanged
{
    NSLog(@"authenticationChanged");
    
    // 登出了或者切换了账号
    if (self->_lastPlayerId != nil)
    {
        [self logout];
    }
    self->_lastPlayerId = [self getLocalPlayerId];
}
@end
