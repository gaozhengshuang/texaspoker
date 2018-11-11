package com.jiantfuntexaspoker.main;

import android.util.Log;
import android.widget.FrameLayout;

import com.facebook.AccessToken;
import com.facebook.login.LoginManager;
import com.giant.gamelib.ChannelLoginType;
import com.giant.gamelib.ExtFuncName;
import com.giant.gamelib.GameLib;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;

import org.egret.runtime.launcherInterface.INativePlayer;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;

/**
 * JS 交互
 */
public class InteractionJsVst {
    private MainActivity _target;
    /**
     * 登录类型
     */
    public String loginType;

    public InteractionJsVst(MainActivity tg) {
        _target = tg;
    }

    public void setExternalInterfaces() {
        _target.nativeAndroid.setExternalInterface("sendToNative", new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                String str = "Native get message: ";
                str += message;
                Log.d(_target.TAG, str);
                _target.nativeAndroid.callExternalInterface("sendToJS", str);
            }
        });
        this.addInitialize();
        this.addLogin();
        this.addCheckLoginState();
    }

    /**
     * 初始化交互
     */
    private void addInitialize() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.Initialize, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                HashMap<String, String> initMap = new HashMap<String, String>();
                initMap.put("channelType", _target.getString(R.string.channelType));
                initMap.put("appName", _target.getString(R.string.app_name));
                initMap.put("bundleId", _target.getString(R.string.bundleId));
                initMap.put("deviceId", GameLib.getUUUID(_target));
                initMap.put("clientVersion", _target.clientVersion);
                String mapStr = new JSONObject(initMap).toString();
                _target.nativeAndroid.callExternalInterface(ExtFuncName.Initialize, mapStr);
                FrameLayout ly = _target.nativeAndroid.getRootFrameLayout();
                if (_target.splashImg != null) {
                    ly.removeView(_target.splashImg);
                }
                if (_target.loadingView != null) {
                    ly.removeView(_target.loadingView);
                }
                Log.d(_target.TAG, "ExtFuncName.Initialize客户端初始化success！！！" + mapStr);
            }
        });
    }

    /**
     * 登录交互
     */
    private void addLogin() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.Login, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                Log.d(_target.TAG, "登录类型" + message);
                loginType = message;
                switch (message) {
                    case ChannelLoginType.FaceBook:
                        AccessToken accessToken = AccessToken.getCurrentAccessToken();
                        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
                        if(isLoggedIn)
                        {
                            loginSucces(accessToken.getToken(), accessToken.getUserId());
                        }
                        else
                        {
                            LoginManager.getInstance().logInWithReadPermissions(_target, Arrays.asList("public_profile"));
                        }
                        break;
                    case ChannelLoginType.GooglePlay:
                        GoogleSignInAccount account = _target.googleLoginVst.account;
                        if(account != null)
                        {
                            loginSucces(account.getIdToken(), account.getId());
                        }
                        else
                        {
                            _target.googleLoginVst.login();
                        }
                        break;
                    default:
                        Log.d(_target.TAG, "未知的登录类型" + message);
                        break;
                }
            }
        });
    }

    /**
     * 检测登录状态
     */
    private void addCheckLoginState() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.CheckLoginState, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                Log.d(_target.TAG, "登录类型" + message);
                boolean isLoggedIn = false;
                switch (message) {
                    case ChannelLoginType.FaceBook:
                        AccessToken accessToken = AccessToken.getCurrentAccessToken();
                        isLoggedIn = accessToken != null && !accessToken.isExpired();
                        break;
                    case ChannelLoginType.GooglePlay:
                        isLoggedIn = _target.googleLoginVst.account != null;
                        break;
                    default:
                        Log.d(_target.TAG, "未知的登录类型" + message);
                        break;
                }
                if(isLoggedIn)
                {
                    _target.nativeAndroid.callExternalInterface(ExtFuncName.CheckLoginState,"1");
                }
                else
                {
                    _target.nativeAndroid.callExternalInterface(ExtFuncName.CheckLoginState,"");
                }
            }
        });
    }
    public void loginSucces(String token, String openId)
    {
        if(token == null)
        {
            token = "";
        }
        if(openId == null)
        {
            openId = "";
        }
        Log.d(_target.TAG, "android登录成功 token" + token + "userid" + openId);
        HashMap<String, String> map = new HashMap<>();
        map.put("token", token);
        map.put("openid", openId);
        map.put("loginType", loginType);
        map.put("status", "1");
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
    }
    public void loginFailed() {
        Log.d(_target.TAG, "android登录失败");
        HashMap<String, String> map = new HashMap<>();
        map.put("status", "");
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
    }
}
