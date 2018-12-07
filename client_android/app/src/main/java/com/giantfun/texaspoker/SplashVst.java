package com.giantfun.texaspoker;

import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import com.giant.customloadingview.UniversalLoadingView;

/**
 * 闪屏处理
 */
public class SplashVst {
    public static final String TAG = "SplashVst";
    private MainActivity _target;

    public SplashVst(MainActivity tg) {
        _target = tg;
    }

    public void showSplashView() {
        FrameLayout ly = _target.nativeAndroid.getRootFrameLayout();
        _target.splashImg = new ImageView(_target);
        _target.splashImg.setImageResource(R.drawable.splash);
        ly.addView(_target.splashImg);

        _target.logoImg = new ImageView(_target);
        _target.logoImg.setImageResource(R.drawable.logo);
        ViewGroup.LayoutParams lp = new ViewGroup.LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
        ViewGroup.MarginLayoutParams ml = new ViewGroup.MarginLayoutParams(lp);
        ml.topMargin = -28;
        _target.logoImg.setLayoutParams(ml);
        ly.addView(_target.logoImg);

        _target.loadingView = new UniversalLoadingView(_target);
        ly.addView(_target.loadingView);
    }
}
