//
//  NSObject+FBLoginVst.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/21.
//  Copyright © 2018年 egret. All rights reserved.
//

#import "FBLoginVst.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import "GameLib.h"

@implementation FBLoginVst
{
    UIViewController *viewCtrl;
    FBSDKLoginManager *login;
}
-(void)initialize_fb:(UIViewController*) view
{
    [FBSDKProfile enableUpdatesOnAccessTokenChange:YES];
    viewCtrl = view;
    //侦听登录变更的事件
    [[NSNotificationCenter defaultCenter] addObserverForName:FBSDKAccessTokenDidChangeNotification
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:
     ^(NSNotification *notification) {
         if (notification.userInfo[FBSDKAccessTokenDidChangeUserID]) {
             // Handle user change 用户变更
             NSLog(@"Handle user change 用户变更");
         }
     }];
}
-(void)buildLoginInstance
{
    if(login == nil)
    {
        login =[[FBSDKLoginManager alloc] init];
    }
}
-(void)login
{
    [self buildLoginInstance];
    [login logInWithReadPermissions: @[@"public_profile",@"email"]  fromViewController:viewCtrl handler:^(FBSDKLoginManagerLoginResult *result, NSError *error)
    {
         if (error) {
             NSLog(@"facebook Process error");
             [self postLoginFailed];
         } else if (result.isCancelled) {
             NSLog(@"facebook-Cancelled");
             [self postLoginFailed];
         } else {
             NSLog(@"Logged in");
             
//             NSMutableDictionary *userdict = [[NSMutableDictionary alloc] init];
//
//             [userdict setObject:result.token.tokenString forKey:@"token"];
//             [userdict setObject:result.token.userID forKey:@"openId"];
//             FBSDKProfile *proFile = [FBSDKProfile currentProfile];
//             if(proFile != nil)
//             {
//                 NSLog(@"fb头像路径%@,host%@, query%@", [proFile.linkURL path] ,[proFile.linkURL host], [proFile.linkURL query]   );
//                 [userdict setObject:[proFile.linkURL absoluteString] forKey:@"face"];
//                 [userdict setObject:proFile.name forKey:@"nickname"];
//             }
//             else
//             {
//                 [userdict setObject:@"" forKey:@"face"];
//                 [userdict setObject:@"" forKey:@"nickname"];
//             }
//
//             NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
//             [nc postNotificationName: @"interactionJsVst-loginSuccess"   // 消息名（字符串）
//                               object:self                                // 消息源
//                             userInfo:userdict];
             [self getUserInfoWithResult:result token:result.token.tokenString openId:result.token.userID];
         }
     }];
}

-(void)loginOut
{
    [self buildLoginInstance];
    [login logOut];
}

//获取用户信息 picture用户头像
- (void)getUserInfoWithResult:(FBSDKLoginManagerLoginResult *)result token:(NSString *)tk openId:(NSString *)oid
{
    NSDictionary*params= @{@"fields":@"id,name,email,age_range,first_name,last_name,link,gender,locale,picture,timezone,updated_time,verified"};
    
    FBSDKGraphRequest *request = [[FBSDKGraphRequest alloc]
                                  initWithGraphPath:result.token.userID
                                  parameters:params
                                  HTTPMethod:@"GET"];
    [request startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
        NSLog(@"%@",result);
        @try
        {
            NSString* resStr = [GameLib jsonClassConvertToJosnStringWithJsonClass:result];
            NSDictionary *rDict = [GameLib dictionaryWithJsonString:resStr];
            NSMutableDictionary *userdict = [[NSMutableDictionary alloc] init];
            
            [userdict setObject:tk forKey:@"token"];
            [userdict setObject:oid forKey:@"openId"];
            [userdict setObject:[[[rDict objectForKey:@"picture"] objectForKey:@"data"] objectForKey:@"url"] forKey:@"face"];
            [userdict setObject:[rDict objectForKey:@"name"] forKey:@"nickname"];
            
            NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
            [nc postNotificationName: @"interactionJsVst-loginSuccess"   // 消息名（字符串）
                              object:self                                // 消息源
                            userInfo:userdict];
        }
        @catch (NSException * e) {
            NSMutableDictionary *userdict = [[NSMutableDictionary alloc] init];
            
            [userdict setObject:tk forKey:@"token"];
            [userdict setObject:oid forKey:@"openId"];
            [userdict setObject:@"" forKey:@"face"];
            [userdict setObject:@"" forKey:@"nickname"];
            
            NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
            [nc postNotificationName: @"interactionJsVst-loginSuccess"   // 消息名（字符串）
                              object:self                                // 消息源
                            userInfo:userdict];
            
        }
        
        /*
         {
         "age_range" =     {
         min = 21;
         };
         "first_name" = "\U6dd1\U5a1f";
         gender = female;
         id = 320561731689112;
         "last_name" = "\U6f58";
         link = "https://www.facebook.com/app_scoped_user_id/320561731689112/";
         locale = "zh_CN";
         name = "\U6f58\U6dd1\U5a1f";
         picture =     {
         data =         {
         "is_silhouette" = 0;
         url = "https://fb-s-c-a.akamaihd.net/h-ak-fbx/v/t1.0-1/p50x50/18157158_290358084709477_3057447496862917877_n.jpg?oh=01ba6b3a5190122f3959a3f4ed553ae8&oe=5A0ADBF5&__gda__=1509731522_7a226b0977470e13b2611f970b6e2719";
         };
         };
         timezone = 8;
         "updated_time" = "2017-04-29T07:54:31+0000";
         verified = 1;
         }
         */
    }];
}

-(void)postLoginFailed
{
    NSNotificationCenter *nc = [NSNotificationCenter defaultCenter];
    [nc postNotificationName: @"interactionJsVst-loginFailed"   // 消息名（字符串）
                      object:self                                // 消息源
                    userInfo:nil];
}

@end
