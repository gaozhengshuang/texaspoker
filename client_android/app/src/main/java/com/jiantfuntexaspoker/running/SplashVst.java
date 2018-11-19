package com.jiantfuntexaspoker.running;

import android.widget.FrameLayout;
import android.widget.ImageView;

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
        _target.loadingView = new UniversalLoadingView(_target);
        ly.addView(_target.loadingView);
    }
}
