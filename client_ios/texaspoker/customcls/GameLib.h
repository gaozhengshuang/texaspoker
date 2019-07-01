//
//  NSObject+GameLib.h
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GameLib:NSObject
+ (NSString*)getUUId;
+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString;
+ (NSString*)dictionaryToJson:(NSDictionary *)dic;
+(NSString*)getConfigString:(NSString *)key;
+(BOOL) isFacebookInstalled;
+ (NSData *)jsonClassConvertToJosnDataWithJsonClass:(id)jsonClass;
+ (NSString *)jsonClassConvertToJosnStringWithJsonClass:(id)jsonClass;
@end
