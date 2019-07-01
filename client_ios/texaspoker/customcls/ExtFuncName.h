//
//  ExtFuncName.h
//  texaspoker
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//

#ifndef ExtFuncName_h
#define ExtFuncName_h

/**
 * JS初始化完成
 */
extern NSString * const  Egret_Initialize = @"Initialize";
/**
 * 登录
 */
extern NSString * const Egret_Login = @"Login";
/**
 * 检查登录状态 如果没过期，且登录类型相符合，则自动登录
 */
extern NSString * const Egret_CheckLoginState = @"CheckLoginState";
/**
 * 支付
 */
extern NSString * const Egret_Pay = @"Pay";
/**
 * 检测未消耗的订单
 */
extern NSString * const  Egret_CheckUnFinishedPayList = @"CheckUnFinishedPayList";
/**
 * 消耗订单
 */
extern NSString * const Egret_DeleteOrder = @"DeleteOrder";
/**
 * 登出
 */
extern NSString * const Egret_Loginout = @"Logout";
/**
 * game cneter init
 */
extern NSString * const Egret_GameCenterInit = @"GameCenterInit";
#endif /* ExtFuncName_h */
