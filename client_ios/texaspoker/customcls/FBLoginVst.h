//
//  NSObject+FBLoginVst.h
//  德州扑克
//
//  Created by ztadmin on 2018/11/21.
//  Copyright © 2018年 egret. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface FBLoginVst:NSObject
-(void)initialize_fb:(UIViewController*) view;
-(void)login;
-(void)loginOut;
@end
