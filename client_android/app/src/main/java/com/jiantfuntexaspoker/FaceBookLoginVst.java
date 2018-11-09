package com.jiantfuntexaspoker;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.giant.gamelib.ChannelLoginType;
import com.giant.gamelib.ExtFuncName;

import org.json.JSONObject;

import java.util.HashMap;

/**
 * facebook loginSuccess
 */
public class FaceBookLoginVst {
    private MainActivity _target;
    public CallbackManager callbackManager;

    public FaceBookLoginVst(MainActivity tg) {
        _target = tg;
        callbackManager = CallbackManager.Factory.create();
        LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<LoginResult>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        // App code
                        AccessToken token = loginResult.getAccessToken();
                        FaceBookLoginVst.this.loginSuccess(token, ChannelLoginType.FaceBook);
                    }

                    @Override
                    public void onCancel() {
                        // App code
                        HashMap<String, String> map = new HashMap<>();
                        map.put("status", "0");
                        String tokenStr = new JSONObject(map).toString();
                        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
                    }

                    @Override
                    public void onError(FacebookException exception) {
                        // App code
                        HashMap<String, String> map = new HashMap<>();
                        map.put("status", "false");
                        String tokenStr = new JSONObject(map).toString();
                        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
                    }
                });
    }

    /**
     * 登录
     * @param token
     */
    public void loginSuccess(AccessToken token, String loginType)
    {
        HashMap<String, String> map = new HashMap<>();
        map.put("token", token.getToken());
        map.put("openid", token.getUserId());
        map.put("loginType", loginType);
        map.put("status", "1");
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
    }
}
