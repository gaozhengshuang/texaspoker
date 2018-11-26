package com.giantfun.texaspoker;

import android.util.Log;
import android.widget.FrameLayout;

import com.android.billingclient.api.Purchase;
import com.facebook.AccessToken;
import com.facebook.login.LoginManager;
import com.giant.gamelib.ChannelLoginType;
import com.giant.gamelib.CheckApkExist;
import com.giant.gamelib.ExtFuncName;
import com.giant.gamelib.GameLib;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;

import org.egret.runtime.launcherInterface.INativePlayer;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.HashMap;

/**
 * JS 交互
 */
public class InteractionJsVst {
    public static final String TAG = "InteractionJsVst";
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
                Log.d(TAG, str);
                _target.nativeAndroid.callExternalInterface("sendToJS", str);
            }
        });
        this.addInitialize();
        this.addLogin();
        this.addCheckLoginState();
        this.addPay();
        this.addCheckUnFinishedList();
        this.deleteOrder();
    }

    /**
     * 初始化交互
     */
    private void addInitialize() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.Initialize, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                try {
                    JSONObject obj = new JSONObject(message);
                    _target.exitGameJsonObj = new JSONObject(obj.getString("exitgameinfo"));
                    Log.d(TAG, "白鹭初始化 message:" + message);
                } catch (JSONException e) {
                    Log.w(TAG, "白鹭初始化 异常 message:" + message);
                }
                HashMap<String, String> initMap = new HashMap<String, String>();
                initMap.put("channelType", _target.getString(R.string.channelType));
                initMap.put("appName", _target.getString(R.string.app_name));
                initMap.put("bundleId", _target.getApplicationContext().getPackageName());
                initMap.put("deviceId", GameLib.getUUUID(_target));
                initMap.put("clientVersion", _target.clientVersion);
                String hasfb = CheckApkExist.checkFacebookExist(_target) ? "true" : "false";
                initMap.put("hasfacebook", hasfb);
                String hasGp = CheckApkExist.checkGooglePlayExist(_target) ? "true" : "false";
                initMap.put("hasgoogleplay", hasGp);
                String mapStr = new JSONObject(initMap).toString();
                _target.nativeAndroid.callExternalInterface(ExtFuncName.Initialize, mapStr);
                FrameLayout ly = _target.nativeAndroid.getRootFrameLayout();
                if (_target.splashImg != null) {
                    ly.removeView(_target.splashImg);
                }
                if (_target.loadingView != null) {
                    ly.removeView(_target.loadingView);
                }
                Log.d(TAG, "ExtFuncName.Initialize客户端初始化success！！！" + mapStr);
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
                Log.d(TAG, "登录类型" + message);
                loginType = message;
                switch (message) {
                    case ChannelLoginType.FaceBook:
                        AccessToken accessToken = AccessToken.getCurrentAccessToken();
                        boolean isLoggedIn = accessToken != null && !accessToken.isExpired();
                        if (isLoggedIn) {
                            loginSucces(accessToken.getToken(), accessToken.getUserId(),"","");
                        } else {
                            LoginManager.getInstance().logInWithReadPermissions(_target, Arrays.asList("public_profile"));
                        }
                        break;
                    case ChannelLoginType.GooglePlay:
                        GoogleSignInAccount account = _target.googleLoginVst.account;
//                        if (account != null) {
//                            loginSucces(account.getIdToken(), account.getId(), "", "", "");
//                        } else {
//                            _target.googleLoginVst.login();
//                        }
                        _target.googleLoginVst.login();
                        break;
                    default:
                        Log.d(TAG, "未知的登录类型" + message);
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
                Log.d(TAG, "登录类型" + message);
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
                        Log.d(TAG, "未知的登录类型" + message);
                        break;
                }
                if (isLoggedIn) {
                    _target.nativeAndroid.callExternalInterface(ExtFuncName.CheckLoginState, "1");
                } else {
                    _target.nativeAndroid.callExternalInterface(ExtFuncName.CheckLoginState, "");
                }
            }
        });
    }

    /**
     * 添加支付
     */
    private void addPay() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.Pay, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                try {
                    JSONObject obj = new JSONObject(message);
                    _target.googleBillingVst.onPurchase(obj);
                } catch (JSONException e) {

                }
            }
        });
    }
    //检测google支付库存
    private void addCheckUnFinishedList()
    {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.CheckUnFinishedPayList, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                _target.googleBillingVst.queryInventoryList();
            }
        });
    }
    /**
     * 支付成功
     */
    public void paySuccess(Purchase purchase) {
        HashMap<String, String> map = new HashMap<>();
        if (purchase != null) {
            map.put("token", purchase.getPurchaseToken());
            map.put("orderId", purchase.getOrderId());
            map.put("productId", purchase.getSku());
            map.put("status", "1");
        } else {
            map.put("status", "0");
        }
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Pay, tokenStr);
    }

    public void deleteOrder() {
        _target.nativeAndroid.setExternalInterface(ExtFuncName.DeleteOrder, new INativePlayer.INativeInterface() {
            @Override
            public void callback(String message) {
                try {
                    JSONObject obj = new JSONObject(message);
                    _target.googleBillingVst.consumeOrder(obj.getString("token"));
                } catch (JSONException e) {

                }
            }
        });
    }

    public void loginSucces(String token, String openId, String nickName, String face) {
        if (token == null) {
            token = "";
        }
        if (openId == null) {
            openId = "";
        }
        Log.d(TAG, "android登录成功 token" + token + "userid" + openId);
        HashMap<String, String> map = new HashMap<>();
        map.put("token", token);
        map.put("openid", openId);
        map.put("loginType", loginType);
        map.put("nickname", nickName);
        map.put("face", face);
//        map.put("gender", gender);
        map.put("status", "1");
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
    }

    public void loginFailed() {
        Log.d(TAG, "android登录失败");
        HashMap<String, String> map = new HashMap<>();
        map.put("status", "");
        String tokenStr = new JSONObject(map).toString();
        _target.nativeAndroid.callExternalInterface(ExtFuncName.Login, tokenStr);
    }

}
