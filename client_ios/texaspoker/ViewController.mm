#import "ViewController.h"

@implementation ViewController

- (instancetype)initWithEAGLView:(UIView*)eaglView {
    if (self = [super init]) {
        self.view = eaglView;
    }
    return self;
}

- (BOOL)prefersStatusBarHidden {
    return YES;
}

- (BOOL)shouldAutorotate {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskPortrait|UIInterfaceOrientationMaskLandscape;
}
-(void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [[NSNotificationCenter defaultCenter] postNotificationName:@"MainView-viewDidAppear" object:self userInfo:nil];
}
@end
