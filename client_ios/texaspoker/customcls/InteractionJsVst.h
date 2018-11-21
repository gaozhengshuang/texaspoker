//
//  NSObject+InteractionJsVst.h
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AppDelegate.h"

@interface InteractionJsVst:NSObject
{

}
@property (nonatomic, nullable) NSString* loginType;
-(void)initialize:(AppDelegate *) ctx;
-(void)setExternalInterfaces;
-(void)gameCenterInit:(NSNumber*)code;
-(void)loginSuccess:(NSString *)token openId:(NSString*) oId extraData:(NSString *)extData;
-(void)loginFailed:(NSNumber*)code;
-(void)loginout;
@end
