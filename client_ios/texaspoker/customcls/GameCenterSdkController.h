//
//  GameCenterSdkController.h
//  texaspoker
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//
#import "AppDelegate.h"
@interface GameCenterSdkController:NSObject
-(void)initialize:(AppDelegate*) ctx;
-(void)login;
-(BOOL) isAuthenticated;
-(NSString*) getLocalPlayerId;
@end
