package com.giantfun.texaspoker;

import android.content.Intent;
import android.util.Log;


import com.giant.gamelib.HttpClient;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;


public class GoogleLoginVst {
    private static final int RC_SIGN_IN = 56855;
    private MainActivity _target;
    public GoogleSignInAccount account;

    GoogleSignInClient mGoogleSignInClient;

    public GoogleLoginVst(MainActivity tg) {
        _target = tg;
    }

    //初始化您的 Activity 时，请检查用户当前是否已登录：
    public void onStart() {
// Android 4.0 之后不能在主线程中请求HTTP请求
        final GoogleSignInAccount acct = GoogleSignIn.getLastSignedInAccount(_target);
        if (acct != null) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    String result = HttpClient.doGet("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + acct.getIdToken());
                    if(result!=null && result.indexOf("error_description") == -1)
                    {
                        account = acct;
                    }
                    else
                    {
                        Log.d("GoogleLoginVst", "google idtoken 过期了");
                    }
                }
            }).start();
        }
    }

    public boolean isGoogleServiceAvaliable() {
        boolean googleserviceFlag = true;
        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = googleApiAvailability.isGooglePlayServicesAvailable(_target);
        if (resultCode != ConnectionResult.SUCCESS) {
            if (googleApiAvailability.isUserResolvableError(resultCode)) {
                googleApiAvailability.getErrorDialog(_target, resultCode, 2404).show();
            }
            googleserviceFlag = false;
        }
        return googleserviceFlag;
    }

    public void login() {
        boolean isAvaliable = isGoogleServiceAvaliable();
        if (isAvaliable == false) //不支持google service
        {
            return;
        }
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(_target.getString(R.string.google_web_client_id))
                .requestEmail()
                .build();
        if (mGoogleSignInClient == null) {
            mGoogleSignInClient = GoogleSignIn.getClient(_target, gso);
        }
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        _target.startActivityForResult(signInIntent, RC_SIGN_IN);
    }


    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                _target.interactionJsVst.loginSucces(account.getIdToken(), account.getId(), account.getDisplayName(), account.getPhotoUrl().toString());
                // Signed in successfully, show authenticated UI.
            } catch (ApiException e) {
                // The ApiException status code indicates the detailed failure reason.
                // Please refer to the GoogleSignInStatusCodes class reference for more information.
                Log.w(_target.TAG, "google login:failed code=" + e.getStatusCode());
                _target.interactionJsVst.loginFailed();
            }
        }
    }
}
