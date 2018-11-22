//
//  NSObject+FBLoginVst.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/21.
//  Copyright © 2018年 egret. All rights reserved.
//

#import "FBLoginVst.h"
#import "AppDelegate.h"

@implementation FBLoginVst
{
        AppDelegate* target;
}
-(void)initialize:(AppDelegate *) ctx
{
    target = ctx;
    //侦听登录变更的事件
    [[NSNotificationCenter defaultCenter] addObserverForName:FBSDKAccessTokenDidChangeNotification
                                                      object:nil
                                                       queue:[NSOperationQueue mainQueue]
                                                  usingBlock:
     ^(NSNotification *notification) {
         if (notification.userInfo[FBSDKAccessTokenDidChangeUserID]) {
             // Handle user change 用户变更
         }
     }];
}
-(void)login
{
    __block AppDelegate *_ctx = target;
    FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
    [login
     logInWithReadPermissions: @[@"public_profile"]
     fromViewController:self
     handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
         if (error) {
             NSLog(@"Process error");
              [_ctx.interactionJsVst loginFailed];
         } else if (result.isCancelled) {
             NSLog(@"Cancelled");
             [_ctx.interactionJsVst loginFailed];
         } else {
             NSLog(@"Logged in");
             [_ctx.interactionJsVst.loginSucces  result.getToken() openId:result.getUserId(), extraData:@""];
         }
     }];
}

@end
