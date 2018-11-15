package com.giant.gamelib;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Looper;
import android.provider.Settings.Secure;

public class GameLib {
    public static String getUUUID(Context context) {
        String android_id = Secure.getString(context.getContentResolver(),
                Secure.ANDROID_ID);
        return android_id;
    }

    //判断当前应用是否是debug状态
    public static boolean isApkInDebug(Context context) {
        try {
            ApplicationInfo info = context.getApplicationInfo();
            return (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Show an alert dialog to the user
     */
    public static void alert(String msg, Activity context) {
        if (Looper.getMainLooper().getThread() != Thread.currentThread()) {
            throw new RuntimeException("Dialog could be shown only from the main thread");
        }
        AlertDialog.Builder bld = new AlertDialog.Builder(context);
        bld.setNeutralButton("OK", null);
        bld.setMessage(msg);
        bld.create().show();
    }
}
