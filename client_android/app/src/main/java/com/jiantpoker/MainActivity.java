package com.jiantpoker;

import android.app.Activity;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.giant.customloadingview.UniversalLoadingView;
import com.giant.gamelib.GameLib;

import org.egret.runtime.launcherInterface.INativePlayer;
import org.egret.egretnativeandroid.EgretNativeAndroid;
import org.json.JSONObject;

import java.util.HashMap;

public class MainActivity extends Activity {
    private final String TAG = "MainActivity";
    private final String clientVersion = "0.2.0";
    private final String Game_Url = "http://192.168.30.17:8088/2001.html?online_version=";
    //    private final String clientVersion = "";
//    private final String Game_Url = "http://jump.test.giantfun.cn/poker/index.html";
    private EgretNativeAndroid nativeAndroid;
    private ImageView splashImg;
    private UniversalLoadingView loadingView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        nativeAndroid = new EgretNativeAndroid(this);
        if (!nativeAndroid.checkGlEsVersion()) {
            Toast.makeText(this, "This device does not support OpenGL ES 2.0.",
                    Toast.LENGTH_LONG).show();
            return;
        }

        nativeAndroid.config.showFPS = true;
        nativeAndroid.config.fpsLogTime = 30;
        nativeAndroid.config.disableNativeRender = false;
        nativeAndroid.config.clearCache = false;
        nativeAndroid.config.loadingTimeout = 0;

        setExternalInterfaces();
        String runUrl = Game_Url + clientVersion;
        Log.d("游戏地址：runUrl", runUrl);
        if (!nativeAndroid.initialize(runUrl)) {
            Toast.makeText(this, "Initialize native failed.",
                    Toast.LENGTH_LONG).show();
            return;
        }

        this.showSplashView();
        setContentView(nativeAndroid.getRootFrameLayout());
    }
    private void showSplashView()
    {
        FrameLayout ly = nativeAndroid.getRootFrameLayout();
        splashImg = new ImageView(this);
        splashImg.setImageResource(R.drawable.splash);
        ly.addView(splashImg);
        loadingView = new UniversalLoadingView(this);
        ly.addView(loadingView);
    }
    @Override
    protected void onPause() {
        super.onPause();
        nativeAndroid.pause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        nativeAndroid.resume();
    }

    @Override
    public boolean onKeyDown(final int keyCode, final KeyEvent keyEvent) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            nativeAndroid.exitGame();
        }

        return super.onKeyDown(keyCode, keyEvent);
    }

    private void setExternalInterfaces() {
        nativeAndroid.setExternalInterface("sendToNative", new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                String str = "Native get message: ";
                str += message;
                Log.d(TAG, str);
                nativeAndroid.callExternalInterface("sendToJS", str);
            }
        });
        nativeAndroid.setExternalInterface(ExtFuncName.Initialize, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                HashMap<String, String> initMap = new HashMap<String, String>();
                initMap.put("channelType", "");
                initMap.put("appName", getString(R.string.app_name));
                initMap.put("bundleId", getString(R.string.bundleId));
                initMap.put("clientVersion", clientVersion);
                String mapStr = new JSONObject(initMap).toString();
                nativeAndroid.callExternalInterface(ExtFuncName.Initialize, mapStr);
                FrameLayout ly = nativeAndroid.getRootFrameLayout();
                if(splashImg != null)
                {
                    ly.removeView(splashImg);
                }
                if(loadingView!= null)
                {
                    ly.removeView(loadingView);
                }
                Log.d(TAG, "ExtFuncName.Initialize客户端初始化！！！" + mapStr);
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
