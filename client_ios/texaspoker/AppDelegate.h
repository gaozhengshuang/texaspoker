#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>
#import "InteractionJsVst.h"
#import "GameCenterSdkController.h"
#import "InAppPurchaseManager.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>
{
    
}
@property(nonatomic) NSDictionary* exitGameJsonObj;
@property(nonatomic) NSString* clientVersion;
@property(nonatomic) InteractionJsVst* interactionJsVst;
@property(nonatomic) GameCenterSdkController* gcsdkCtl;
@property(nonatomic) InAppPurchaseManager* purchaseMgr;
@end
