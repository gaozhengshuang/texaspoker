//
//  NSObject+InteractionJsVst.h
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <EgretNativeIOS.h>
@interface InteractionJsVst:NSObject
{

}
@property (nonatomic, nullable) NSString* loginType;
-(void)initialize_inter:(EgretNativeIOS*)ntv viewController:(UIViewController *) view;
-(void)gameCenterInit:(NSNumber*)code;
-(void)loginFailed:(NSNumber*)code;
-(void)loginout;
@end
