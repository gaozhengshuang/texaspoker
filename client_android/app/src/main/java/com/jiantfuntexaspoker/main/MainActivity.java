package com.jiantfuntexaspoker.main;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.ImageView;
import android.widget.Toast;

import com.giant.customloadingview.UniversalLoadingView;
import com.giant.gamelib.ChannelLoginType;
import com.giant.gamelib.GameLib;

import org.egret.egretnativeandroid.EgretNativeAndroid;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MainActivity extends Activity {
    public final String TAG = "MainActivity";
    public EgretNativeAndroid nativeAndroid;

    //custom property
    public ImageView splashImg;
    public UniversalLoadingView loadingView;

    private SplashVst _splashVst;
    public InteractionJsVst interactionJsVst;
    public FaceBookLoginVst fbLoginVst;
    public GoogleLoginVst googleLoginVst;

//    private final String Game_Url = "http://jump.test.giantfun.cn/poker/2001.html?online_version=";
    public final String clientVersion = "0.2.0";
//    private final String Game_Url = "http://192.168.30.17:8088/2001.html?online_version=";
    private final String Game_Url = "http://192.168.30.17:8087/index.html?online_version=";
    //    private final String clientVersion = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
//            String packageName = this.getApplicationContext().getPackageName();
            String packageName = "com.jiantfuntexaspoker.main";
            Log.d("KeyHash:", packageName);
            PackageInfo info = getPackageManager().getPackageInfo(
                    packageName,
                    PackageManager.GET_SIGNATURES);
            for (Signature signature : info.signatures) {
                MessageDigest md = MessageDigest.getInstance("SHA");
                md.update(signature.toByteArray());
                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT) + "键值");
            }
        } catch (PackageManager.NameNotFoundException e) {
            Log.d("KeyHash:", "NameNotFoundException error");
        } catch (NoSuchAlgorithmException e) {
            Log.d("KeyHash:", "NoSuchAlgorithmException error");
        }

        nativeAndroid = new EgretNativeAndroid(this);
        if (!nativeAndroid.checkGlEsVersion()) {
            Toast.makeText(this, "This device does not support OpenGL ES 2.0.",
                    Toast.LENGTH_LONG).show();
            return;
        }

        nativeAndroid.config.showFPS = GameLib.isApkInDebug(this);
        nativeAndroid.config.fpsLogTime = 30;
        nativeAndroid.config.disableNativeRender = false;
        nativeAndroid.config.clearCache = false;
        nativeAndroid.config.loadingTimeout = 0;

        interactionJsVst = new InteractionJsVst(this);
        interactionJsVst.setExternalInterfaces();
        String runUrl = Game_Url + clientVersion;
        Log.d("游戏地址：runUrl", runUrl);
        if (!nativeAndroid.initialize(runUrl)) {
            Toast.makeText(this, "Initialize native failed.",
                    Toast.LENGTH_LONG).show();
            return;
        }
        _splashVst = new SplashVst(this);
        _splashVst.showSplashView();
        fbLoginVst = new FaceBookLoginVst(this);
        setContentView(nativeAndroid.getRootFrameLayout());
    }
    @Override
    public void onStart()
    {
        super.onStart();
        googleLoginVst = new GoogleLoginVst(this);
        googleLoginVst.onStart();
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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(interactionJsVst != null)
        {
            switch (interactionJsVst.loginType)
            {
                case ChannelLoginType.FaceBook:
                    this.fbLoginVst.callbackManager.onActivityResult(requestCode, resultCode, data);
                    break;
                case ChannelLoginType.GooglePlay:
                    this.googleLoginVst.onActivityResult(requestCode, resultCode, data);
                    break;
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
