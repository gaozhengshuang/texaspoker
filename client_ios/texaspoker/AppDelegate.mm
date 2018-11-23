#import "AppDelegate.h"
#import "ViewController.h"
#import <EgretNativeIOS.h>
#import "InteractionJsVst.h"
#import "GameCenterSdkController.h"
#import "InAppPurchaseManager.h"

@implementation AppDelegate {
    EgretNativeIOS* _native;
    NSString* _clientVersion;
    //退出游戏的二次确认文字描述
    NSDictionary* _exitGameJsonObj;
    
    InteractionJsVst* _interactionJsVst;
    GameCenterSdkController* _gcsdkCtl;
    InAppPurchaseManager* _purchaseMgr;
}
@synthesize clientVersion = _clientVersion;
@synthesize exitGameJsonObj = _exitGameJsonObj;

@synthesize interactionJsVst = _interactionJsVst;
@synthesize gcsdkCtl = _gcsdkCtl;
@synthesize purchaseMgr = _purchaseMgr;


- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
    
    BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                  openURL:url
                                                        sourceApplication:sourceApplication
                                                               annotation:annotation
                    ];
    // Add any custom logic here.
    return handled;
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    NSString* gameUrl = @"http://192.168.30.17:8087/index.html?online_version=";
    self->_clientVersion = @"0.2.0";
    
    gameUrl = [gameUrl stringByAppendingString:self->_clientVersion];
    
    _native = [[EgretNativeIOS alloc] init];
    _native.config.showFPS = true;
    _native.config.fpsLogTime = 30;
    _native.config.disableNativeRender = false;
    _native.config.clearCache = false;
    
    
    
    UIViewController* viewController = [[ViewController alloc] initWithEAGLView:[_native createEAGLView]];
    if (![_native initWithViewController:viewController]) {
        return false;
    }
    //支付
    _purchaseMgr = [[InAppPurchaseManager alloc] init];
    [_purchaseMgr initBuy:self];
    //侦听交互接口
    _interactionJsVst = [[InteractionJsVst alloc] init];
    [_interactionJsVst initialize:self];
    [_interactionJsVst setExternalInterfaces];
    
    //game center login
    _gcsdkCtl = [[GameCenterSdkController alloc] init];
    [_gcsdkCtl initialize:self];
    
    NSString* networkState = [_native getNetworkState];
    if ([networkState isEqualToString:@"NotReachable"]) {
        __block EgretNativeIOS* native = _native;
        [_native setNetworkStatusChangeCallback:^(NSString* state) {
            if (![state isEqualToString:@"NotReachable"]) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [native startGame:gameUrl];
                });
            }
        }];
        return true;
    }
    
    [_native startGame:gameUrl];
    
    return true;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    
    [_native pause];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    
    [_native resume];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    // Saves changes in the application's managed object context before the application terminates.
}

- (void)setExternalInterfaces {
    __block EgretNativeIOS* support = _native;
    [_native setExternalInterface:@"sendToNative" Callback:^(NSString* message) {
        NSString* str = @"Native get message: ";
        str = [str stringByAppendingString:message];
        NSLog(@"%@", str);
        [support callExternalInterface:@"sendToJS" Value:str];
    }];
}

- (void)dealloc {
    [_native destroy];
}

@end
