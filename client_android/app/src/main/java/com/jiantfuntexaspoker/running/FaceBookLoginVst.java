package com.jiantfuntexaspoker.running;

import android.util.Log;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;

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
                        _target.interactionJsVst.loginSucces(token.getToken(), token.getUserId());
                    }

                    @Override
                    public void onCancel() {
                        // App code
                        Log.d(_target.TAG, "android facebook 取消登录");
                        _target.interactionJsVst.loginFailed();
                    }

                    @Override
                    public void onError(FacebookException exception) {
                        // App code
                        Log.d(_target.TAG, "android facebook 登录失败");
                        _target.interactionJsVst.loginFailed();
                    }
                });
    }
}
