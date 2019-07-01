package com.giant.gamelib;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
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

    /*
    初始化AlertDialog
     */
    public static void showDialog(Activity ctx, String title, String message, String confirm, String cancel, final IMyCallBack callBack) {
        //创建AlertDialog的构造器的对象
        AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
        //设置构造器标题
        builder.setTitle(title);
        //构造器对应的图标
        //构造器内容,为对话框设置文本项(之后还有列表项的例子)
        builder.setMessage(message);
        //为构造器设置确定按钮,第一个参数为按钮显示的文本信息，第二个参数为点击后的监听事件，用匿名内部类实现
        builder.setPositiveButton(confirm, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                callBack.run();
            }
        });
        //为构造器设置取消按钮,若点击按钮后不需要做任何操作则直接为第二个参数赋值null
        builder.setNegativeButton(cancel, null);
        builder.create().show();
    }

    public interface IMyCallBack {
        public void run();
    }
}
