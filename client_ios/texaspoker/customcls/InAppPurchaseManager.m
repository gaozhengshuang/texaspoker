//
//  InAppPurchaseManager.m
//  MoGoSample_iPad
//
//  Created by ShangYu on 3/7/13.
//
//

#import "InAppPurchaseManager.h"
#import "AppDelegate.h"

NSString *productId;
NSString *appusername;
AppDelegate *target;

//是否可以处理程序
BOOL iosCanLoadTempTransactions = NO;

@implementation InAppPurchaseManager

//viewDidLoad 初始化调用
- (void)initBuy:(AppDelegate *)tgt
{
    target = tgt;
    iosCanLoadTempTransactions = true;
    [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
}
//检测未完成的支付
- (void)checkUnFinishedPayList
{
    NSArray* transactions = [SKPaymentQueue defaultQueue].transactions;
    if (transactions.count > 0)
    {
        [self doWithTransactions:transactions];
    }
}
#pragma -
#pragma Public methods
//
// call this before making a purchase 是否可以支付
//
- (BOOL)canMakePurchases
{
    return [SKPaymentQueue canMakePayments];
}
//请求支付
-(void) purchaseRequest:(NSString *)productid passData:(NSString *)passdata
{
    productId = [[NSString alloc] initWithString:productid];
    appusername = [[NSString alloc] initWithString:passdata];
    //是否允许内购
    if ([SKPaymentQueue canMakePayments]) {
        SKMutablePayment *payment = [SKMutablePayment paymentWithProductIdentifier:productid];
        payment.applicationUsername = appusername;//透传数据
        [[SKPaymentQueue defaultQueue] addPayment:payment];
        
    }else{
        NSLog(@"用户不允许内购");
    }
}



#pragma mark -
#pragma mark SKPaymentTransactionObserver methods
//
// called when the transaction status is updated
//SKPaymentTransactionObserver进度监测
//
- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions
{
    if (iosCanLoadTempTransactions)
    {
        [self doWithTransactions:transactions];
    }
    NSLog(@"[shop]count：%lu",(unsigned long)[transactions count]);
}

//处理apple返回的交易列表 (以恢复的形式 or 直接购买返回的形式)
-(void)doWithTransactions:(NSArray *)transactions
{
    for (SKPaymentTransaction *transaction in transactions)
    {
        NSLog(@"[shop]transactionState：%ld",(long)SKPaymentTransactionStatePurchased);
        switch (transaction.transactionState)
        {
            case SKPaymentTransactionStatePurchased:
                NSLog(@"交易完成");
                [self completeTransaction:transaction];//交易完成
                break;
            case SKPaymentTransactionStatePurchasing:
                NSLog(@"商品添加进列表");
                break;
            case SKPaymentTransactionStateRestored:
                NSLog(@"已经购买过商品");
                [self restoreTransaction:transaction];
                break;
            case SKPaymentTransactionStateFailed:
                NSLog(@"交易失败");
                [self failedTransaction:transaction];
                break;
            default:
                break;
        }
        NSLog(@"[shop]paymentQueue：%ld",(long)transaction.transactionState);
    }
}
//
// called when the transaction was successful
// 交易成功
- (void)completeTransaction:(SKPaymentTransaction *)transaction
{
    NSString * productIdentifier = transaction.payment.productIdentifier;
    NSLog(@"id:%@" , productIdentifier);
    @try
    {
        NSString *receipt = [self getPurcheReceiptData];
        NSString* passData = transaction.payment.applicationUsername;
        if (transaction.payment.applicationUsername == nil)
        {
            passData = @"";
        }
        NSDictionary *dict = @{@"productId":productIdentifier,@"passData":passData,@"receipt":receipt};
        
        BOOL isYes = [NSJSONSerialization isValidJSONObject:dict];
        if (isYes)
        {
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:0 error:NULL];
            NSString* message = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            UnitySendMessage("ChannelGameObject","PaySucceed",[message UTF8String]);
        }
        else
        {
            //非法支付
            [self finishTransaction:transaction];
        }
    }
    @catch (NSException * e) {
        [self finishTransaction:transaction];
        
    }
    NSLog(@"[shop]completeTransaction");
}
#pragma -
#pragma Purchase helpers
//
// removes the transaction from the queue and posts a notification with the transaction result
// 从队列移除
- (void)finishTransaction:(SKPaymentTransaction *)transaction
{
    // remove the transaction from the payment queue.
    [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
    NSLog(@"[shop]finishTransaction");
}
//
// called when a transaction has been restored and and successfully completed
// 得到恢复和成功地完成交易时调用
- (void)restoreTransaction:(SKPaymentTransaction *)transaction
{
    [self finishTransaction:transaction];
    NSLog(@"[shop]restoreTransaction");
}
//
// called when a transaction has failed
// 当交易失败
- (void)failedTransaction:(SKPaymentTransaction *)transaction
{
    UnitySendMessage("ChannelGameObject","PayFailed",[transaction.payment.applicationUsername UTF8String]);
    if (transaction.error.code != SKErrorPaymentCancelled)
    {
        //UnitySendMessage("ChannelGameObject","PayError",[[NSString stringWithFormat:@"支付失败:%ld",transaction.error.code] UTF8String]);
        // error!
        [self finishTransaction:transaction];
    }
    else
    {
        UnitySendMessage("ChannelGameObject","PayCancel","");
        // this is fine, the user just cancelled, so don’t notify
        [self finishTransaction:transaction];
    }
    NSLog(@"交易错误：%@",transaction.error);
}

//服务器验证成功 删除订单
- (void)deleteOrder:(NSString*)message
{
    NSLog(@"[shop]deleteOrder111");
    NSArray* transactions = [SKPaymentQueue defaultQueue].transactions;
    if (transactions.count > 0)
    {
        for (SKPaymentTransaction *transaction in transactions)
        {
            switch (transaction.transactionState)
            {
                case SKPaymentTransactionStatePurchasing:
                    break;
                case SKPaymentTransactionStatePurchased: //状态 已经购买 删除订单仅处理交易完成的情况
                    @try
                    {
                        NSString *receipt = [transaction.transactionReceipt base64EncodedStringWithOptions:0];
                        if ([transaction.payment.applicationUsername isEqualToString:message] || [receipt isEqualToString:message])
                        {
                            NSLog(@"[shop]deleteOrder22");
                            [self finishTransaction:transaction];
                        }
                    }
                    @catch (NSException * e) {
                        [self finishTransaction:transaction];
                    }
                    break;
                case SKPaymentTransactionStateFailed:
                    break;
                case SKPaymentTransactionStateRestored:
                    break;
                case SKPaymentTransactionStateDeferred:
                    break;
            }
            NSLog(@"[shop]deleteOrder：%ld",(long)transaction.transactionState);
        }
    }
}
//获取支付收据 暂时不用
-(NSString*)getPurcheReceiptData
{
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    // 从沙盒中获取到购买凭据
    NSData *receiptData = [NSData dataWithContentsOfURL:receiptURL];
    NSString *receipt = [receiptData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    return  receipt;
}
@end
