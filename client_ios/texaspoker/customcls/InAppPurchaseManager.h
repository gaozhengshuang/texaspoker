//
//  InAppPurchaseManager.h
//  MoGoSample_iPad
//
//  Created by ShangYu on 3/7/13.
//
//
#import "AppDelegate.h"
#import <StoreKit/StoreKit.h>
//#import "QingLoginUtil.h"
#define kInAppPurchaseManagerTransactionFailedNotification @"kInAppPurchaseManagerTransactionFailedNotification"
#define kInAppPurchaseManagerTransactionSucceededNotification @"kInAppPurchaseManagerTransactionSucceededNotification"
@interface InAppPurchaseManager : NSObject <SKProductsRequestDelegate,SKPaymentTransactionObserver>

- (void)initBuy:(AppDelegate *)tgt;
- (void)checkUnFinishedPayList;
- (BOOL)canMakePurchases;
- (void) purchaseRequest:(NSString *)productid passData:(NSString *)passdata;
- (void)deleteOrder:(NSString*)message;
@end
