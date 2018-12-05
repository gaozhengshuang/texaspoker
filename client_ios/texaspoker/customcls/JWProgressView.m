#import "JWProgressView.h"
@interface JWProgressView ()
{
    CAShapeLayer *backGroundLayer;      //背景图层
    CAShapeLayer *frontFillLayer;       //用来填充的图层
    UIBezierPath *backGroundBezierPath; //背景贝赛尔曲线
    UIBezierPath *frontFillBezierPath;  //用来填充的贝赛尔曲线
    UILabel *_contentLabel;              //中间的label
}
@end


@implementation JWProgressView

@synthesize progressValue = _progressValue;
- (instancetype)initWithCoder:(NSCoder *)aDecoder
{
    if (self = [super initWithCoder:aDecoder]) {
        [self setUp];
    }
    return self;
}
- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame])
    {
        [self setUp];
        
    }
    return self;
    
}

//初始化创建图层
- (void)setUp
{
    //创建背景图层
    backGroundLayer = [CAShapeLayer layer];
    backGroundLayer.fillColor = nil;
    
    //创建填充图层
    frontFillLayer = [CAShapeLayer layer];
    frontFillLayer.fillColor = nil;
    
    //创建中间label
    CGRect rect = self.bounds;
    _contentLabel = [[UILabel alloc]init];
    _contentLabel.textAlignment = NSTextAlignmentCenter;
    _contentLabel.text = @"loading...";
    _contentLabel.font = [UIFont systemFontOfSize:15];
    _contentLabel.backgroundColor = [UIColor clearColor];
    [self addSubview:_contentLabel];
    
    [self.layer addSublayer:backGroundLayer];
    [self.layer addSublayer:frontFillLayer];
    //设置颜色
    frontFillLayer.strokeColor = [UIColor colorWithRed:51/255.0 green:181/255.0 blue:229/255.0 alpha:1.0].CGColor;
    _contentLabel.textColor = [UIColor colorWithRed:255/255.0 green:255/255.0 blue:255/255.0 alpha:1.0];
    backGroundLayer.strokeColor = [UIColor colorWithRed:51/255.0 green:181/255.0 blue:229/255.0 alpha:0].CGColor;
    
}

#pragma mark -子控件约束
-(void)layoutSubviews {
    
    [super layoutSubviews];
    
    CGFloat width = self.bounds.size.width;
    _contentLabel.frame = CGRectMake(0, 0, width - 4, 20);
    _contentLabel.center = CGPointMake(CGRectGetMidX(self.bounds), CGRectGetMaxY(self.bounds) + 25);
    backGroundLayer.frame = self.bounds;
    
    
    backGroundBezierPath = [UIBezierPath bezierPathWithArcCenter:CGPointMake(width/2.0f, width/2.0f) radius:(CGRectGetWidth(self.bounds)-2.0)/2.f startAngle:0 endAngle:M_PI*2
                                                       clockwise:YES];
    backGroundLayer.path = backGroundBezierPath.CGPath;
    
    
    frontFillLayer.frame = self.bounds;
    
    //设置线宽
    frontFillLayer.lineWidth = 8.0;
    backGroundLayer.lineWidth = 8.0;
}

#pragma mark - 设置label文字和进度的方法
-(void)setContentText:(NSString *)contentText {
    
    if (_progressValue == 1) {
        
        return;
    }
    if (contentText) {
        
//        _contentLabel.text = contentText;
    }
}

- (void)setProgressValue:(CGFloat)progressValue
{
    
    progressValue = MAX( MIN(progressValue, 1.0), 0.0);
    _progressValue = progressValue;
    if (progressValue == 1) {
        
        if ([self.delegate respondsToSelector:@selector(progressViewOver:)]) {
            
            [self.delegate progressViewOver:self];
        }
        return;
    }
    
    CGFloat width = self.bounds.size.width;
    
    frontFillBezierPath = [UIBezierPath bezierPathWithArcCenter:CGPointMake(width/2.0f, width/2.0f) radius:(CGRectGetWidth(self.bounds)-2.0)/2.f startAngle:-0.25*2*M_PI endAngle:(2*M_PI)*progressValue - 0.25*2*M_PI clockwise:YES];
    frontFillLayer.path = frontFillBezierPath.CGPath;
}
- (CGFloat)progressValue
{
    return _progressValue;
}

@end
