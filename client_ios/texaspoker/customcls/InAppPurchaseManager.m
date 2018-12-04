//
//  InAppPurchaseManager.m
//  MoGoSample_iPad
//
//  Created by ShangYu on 3/7/13.
//
//

#import "InAppPurchaseManager.h"

NSString *productId;
NSString *appusername;

//是否可以处理程序
BOOL iosCanLoadTempTransactions = NO;

//NSString *AppleStoreGuidTemp;//生成guid作为订单号
int QingShopItemPrice;
NSString *QingShopItemName;

@implementation InAppPurchaseManager

#pragma mark - SKProductsRequestDelegate
//接收到产品的返回信息，然后用返回的商品信息进行发起购买请求
- (void)productsRequest:(SKProductsRequest *)request didReceiveResponse:(SKProductsResponse *)response NS_AVAILABLE_IOS(3_0)
{
    NSArray *product = response.products;
    
    //如果服务器没有产品
    if([product count] == 0){
        NSLog(@"没有该商品%@", productId);
        return;
    }
    
    SKProduct *requestProduct = nil;
    for (SKProduct *pro in product) {
        
        NSLog(@"%@", [pro description]);
        NSLog(@"%@", [pro localizedTitle]);
        NSLog(@"%@", [pro localizedDescription]);
        NSLog(@"%@", [pro price]);
        NSLog(@"%@", [pro productIdentifier]);
        
        //如果后台消费条目的ID与我这里需要请求的一样（用于确保订单的正确性）
        if([pro.productIdentifier isEqualToString:productId]){
            requestProduct = pro;
        }
    }
    
    //发送购买请求
    SKMutablePayment *payment = [SKMutablePayment paymentWithProduct:requestProduct];
    payment.applicationUsername = appusername;//可以是userId，也可以是订单id，跟你自己需要而定
    [[SKPaymentQueue defaultQueue] addPayment:payment];
}

//viewDidLoad 初始化调用
- (void)initBuy
{
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
        NSLog(@"用户允许内购");
        
        //bundleid+xxx 就是你添加内购条目设置的产品ID
        NSArray *product = [[NSArray alloc] initWithObjects:productid,nil];
        NSSet *nsset = [NSSet setWithArray:product];
        
        //初始化请求
        SKProductsRequest *request = [[SKProductsRequest alloc] initWithProductIdentifiers:nsset];
        request.delegate = self;
        
        //开始请求
        [request start];
        
    }else{
        NSLog(@"用户不允许内购");
    }
    
//    productId = [[NSString alloc] initWithString:productid];
//    NSLog(@"发起购买%@",productid);
//    productid = @"com.giantfun.texaspoker.801";
//    appusername = [[NSString alloc] initWithString:passdata];
//    //是否允许内购
//    if ([SKPaymentQueue canMakePayments]) {
//        SKMutablePayment *payment = [SKMutablePayment paymentWithProductIdentifier:productid];
//        payment.applicationUsername = appusername;//透传数据
//        [[SKPaymentQueue defaultQueue] addPayment:payment];
//
//    }else{
//        NSLog(@"用户不允许内购");
//    }

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
        NSString *receipt = [transaction.transactionReceipt base64EncodedStringWithOptions:0];
        NSString* passData = transaction.payment.applicationUsername;
        if (transaction.payment.applicationUsername == nil)
        {
            passData = @"";
        }
        NSDictionary *dict = @{@"status":@"1", @"productIdentifier":productIdentifier, @"passData":passData,@"receipt":receipt,@"transactionIdentifier":transaction.transactionIdentifier};
        
        BOOL isYes = [NSJSONSerialization isValidJSONObject:dict];
        if (isYes)
        {
//            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:0 error:NULL];
//            NSString* message = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            [self postPaySuccess:dict];
//            UnitySendMessage("ChannelGameObject","PaySucceed",[message UTF8String]);
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
//    UnitySendMessage("ChannelGameObject","PayFailed",[transaction.payment.applicationUsername UTF8String]);
    if (transaction.error.code != SKErrorPaymentCancelled)
    {
        //UnitySendMessage("ChannelGameObject","PayError",[[NSString stringWithFormat:@"支付失败:%ld",transaction.error.code] UTF8String]);
        [self postPayFailed:@"1"];
        // error!
        [self finishTransaction:transaction];
    }
    else
    {
//        UnitySendMessage("ChannelGameObject","PayCancel","");
        // this is fine, the user just cancelled, so don’t notify
        [self postPayFailed:@"2"];
        [self finishTransaction:transaction];
    }
    NSLog(@"交易错误：%@",transaction.error);
}

-(void)postPayFailed:(NSString *)code
{
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    [dict setObject:code forKey:@"errcode"];
    [dict setObject:@"0" forKey:@"status"];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"interactionJsVst-payResult" object:self userInfo:dict];
}
-(void)postPaySuccess:(NSDictionary *)note
{
//    [note setValue:@"1" forKey:@"status"];
//    [note set];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"interactionJsVst-payResult" object:self userInfo:note];
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
