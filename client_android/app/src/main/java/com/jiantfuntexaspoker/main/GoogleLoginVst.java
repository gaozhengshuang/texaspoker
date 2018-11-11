package com.jiantfuntexaspoker.main;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
//import com.google.firebase.auth.AuthCredential;
//import com.google.firebase.auth.AuthResult;
//import com.google.firebase.auth.FirebaseAuth;
//import com.google.firebase.auth.FirebaseUser;
//import com.google.firebase.auth.GoogleAuthProvider;

public class GoogleLoginVst {
    private static final int RC_SIGN_IN = 56855;
//    private FirebaseAuth mAuth;
    private MainActivity _target;
    public GoogleSignInAccount account;
//    private FirebaseUser currentUser;


    public GoogleLoginVst(MainActivity tg) {
        _target = tg;
//        mAuth = FirebaseAuth.getInstance();
    }
    //初始化您的 Activity 时，请检查用户当前是否已登录：
    public void onStart()
    {
//        currentUser = mAuth.getCurrentUser();
        account = GoogleSignIn.getLastSignedInAccount(_target);
    }

    public void login() {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(_target.getString(R.string.google_web_client_id))
//                .requestIdToken("com.jiantfuntexaspoker.main")
                .requestEmail()
//                .requestId()
                .build();
        GoogleSignInClient mGoogleSignInClient = GoogleSignIn.getClient(_target, gso);
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        _target.startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                _target.interactionJsVst.loginSucces(account.getIdToken(),account.getId());

                // Signed in successfully, show authenticated UI.
//            updateUI(account);
//                firebaseAuthWithGoogle(account);
            } catch (ApiException e) {
                // The ApiException status code indicates the detailed failure reason.
                // Please refer to the GoogleSignInStatusCodes class reference for more information.
                Log.w(_target.TAG, "signInResult:failed code=" + e.getStatusCode());
//            updateUI(null);
            }
        }
    }
}
