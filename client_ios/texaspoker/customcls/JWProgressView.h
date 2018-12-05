#import <UIKit/UIKit.h>

@class JWProgressView;

@protocol JWProgressViewDelegate <NSObject>

-(void)progressViewOver:(JWProgressView *)progressView;

@end

@interface JWProgressView : UIView

//进度值0-1.0之间
@property (nonatomic,assign)CGFloat progressValue;


//内部label文字
@property(nonatomic,strong)NSString *contentText;

//value等于1的时候的代理
@property(nonatomic,weak)id<JWProgressViewDelegate>delegate;

@end
