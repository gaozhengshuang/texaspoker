package com.giantfun.texaspoker;

import android.util.Log;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.Profile;
import com.facebook.ProfileTracker;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;


/**
 * facebook loginSuccess
 */
public class FaceBookLoginVst {
    public static final String TAG = "FaceBookLoginVst";
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
                        Profile profile = Profile.getCurrentProfile();
                        AccessToken token = loginResult.getAccessToken();
                        if (Profile.getCurrentProfile() != null) {
                            String fbUserName = profile.getName();
                            String fbUrl = profile.getProfilePictureUri(100, 100).toString();
                            Log.i("Login", "ProfilePic" + Profile.getCurrentProfile().getProfilePictureUri(200, 200));
                            _target.interactionJsVst.loginSucces(token.getToken(), token.getUserId(), fbUserName, fbUrl);
                        } else {
                            _target.interactionJsVst.loginSucces(token.getToken(), token.getUserId(), "", "");
                        }
                    }

                    @Override
                    public void onCancel() {
                        // App code
                        Log.d(TAG, "android facebook 取消登录");
                        _target.interactionJsVst.loginFailed();
                    }

                    @Override
                    public void onError(FacebookException exception) {
                        // App code
                        Log.d(TAG, "android facebook 登录失败");
                        _target.interactionJsVst.loginFailed();
                    }
                });
    }
}
