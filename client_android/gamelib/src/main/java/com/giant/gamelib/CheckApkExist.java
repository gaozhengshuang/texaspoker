package com.giant.gamelib;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;

/**
 * 检测apk是否已经安装
 */
public class CheckApkExist {

    public static boolean checkApkExist(Context context, String packageName){
        if (TextUtils.isEmpty(packageName))
            return false;
        try {
            ApplicationInfo info = context.getPackageManager()
                    .getApplicationInfo(packageName,
                            PackageManager.GET_UNINSTALLED_PACKAGES);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    public static boolean checkFacebookExist(Context context){
        return checkApkExist(context, "com.facebook.katana");
    }
    public static boolean checkGooglePlayExist(Context context){
        return checkApkExist(context, "com.android.vending");
    }
}