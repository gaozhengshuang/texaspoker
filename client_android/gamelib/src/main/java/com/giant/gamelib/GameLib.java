package com.giant.gamelib;
    import android.content.Context;
    import android.content.pm.PackageInfo;
    import android.content.pm.PackageManager;
    import android.provider.Settings.Secure;

    public class GameLib {
    public static String getUUUID(Context context)
    {
        String android_id = Secure.getString(context.getContentResolver(),
                Secure.ANDROID_ID);
        return  android_id;
    }
        /**
         * 获取应用程序名称
         */
        public static synchronized String getAppName(Context context) {
            try {
                PackageManager packageManager = context.getPackageManager();
                PackageInfo packageInfo = packageManager.getPackageInfo(
                        context.getPackageName(), 0);
                int labelRes = packageInfo.applicationInfo.labelRes;
                return context.getResources().getString(labelRes);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
}
