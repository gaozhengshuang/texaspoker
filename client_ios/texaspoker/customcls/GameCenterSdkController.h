//
//  GameCenterSdkController.h
//  texaspoker
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//
@interface GameCenterSdkController:NSObject
-(void)initialize :(UIViewController *) view;
-(void)login;
-(BOOL) isAuthenticated;
-(NSString*) getLocalPlayerId;
@end
