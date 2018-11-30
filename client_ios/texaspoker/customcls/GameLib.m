//
//  NSObject+GameLib.m
//  德州扑克
//
//  Created by ztadmin on 2018/11/20.
//  Copyright © 2018年 egret. All rights reserved.
//

#import "GameLib.h"
#import <AdSupport/AdSupport.h>
#import <UIKit/UIKit.h>
//#import "KeychainItemWrapper.h"

@implementation GameLib

+(NSString*)getUUId
{
//    KeychainItemWrapper *keyChainItemQin=[[KeychainItemWrapper alloc]initWithIdentifier:@"com.qingame.warlord.chinaappstore" accessGroup:nil];
//
//    NSString *strUUID = [keyChainItemQin objectForKey:(id)kSecAttrAccount];
//    NSLog(@"strUUID:++++++%@",strUUID);
//    if (strUUID==nil||[strUUID isEqualToString:@""])
//    {
//        NSLog(@"new value:++++++%@__%@",kSecAttrAccount,kSecAttrAccount);
//        strUUID = [[[NSUUID UUID] UUIDString] stringByReplacingOccurrencesOfString:@"-" withString:@""];
//        [keyChainItemQin setObject:strUUID forKey:(id)kSecAttrAccount];
//    }
    NSString *identifierForVendor = [[UIDevice currentDevice].identifierForVendor UUIDString];
    return identifierForVendor;
}

/*!
 
 * @brief 把格式化的JSON格式的字符串转换成字典
 
 * @param jsonString JSON格式的字符串
 
 * @return 返回字典
 
 */


+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString {
    
    if (jsonString == nil) {
        
        return nil;
        
    }
    
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    
    NSError *err;
    
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                         
                                                        options:NSJSONReadingMutableContainers
                         
                                                          error:&err];
    
    if(err) {
        
        NSLog(@"json解析失败：%@",err);
        
        return nil;
        
    }
    
    return dic;
    
}
//字典转json
+ (NSString*)dictionaryToJson:(NSDictionary *)dic

{
    
    NSError *parseError = nil;
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&parseError];
    
    return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
}
//获取配置
+(NSString*)getConfigString:(NSString *)key
{
    NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"giantconfig" ofType:@"plist"];
    NSMutableDictionary *data = [[NSMutableDictionary alloc] initWithContentsOfFile:plistPath];
    return [data objectForKey:key];
}
//fb 是否安装
+(BOOL) isFacebookInstalled
{
    BOOL isInstalled = [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"fb://"]];
    
    return isInstalled;
}
@end
