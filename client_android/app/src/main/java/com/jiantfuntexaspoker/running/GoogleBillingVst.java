package com.jiantfuntexaspoker.running;

import android.util.Log;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.ConsumeResponseListener;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.SkuDetails;
import com.giant.gamelib.GameLib;
import com.texaspoker.giant.googlebilling.GoogleBillingUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

/**
 * 谷歌支付
 */
public class GoogleBillingVst {
    //初始化
//1、public static GoogleBillingUtil getInstance() 获取单实例
//2、public GoogleBillingUtil build()
//    创建内购实例，连接谷歌支付服务(如果未创建、未连接)，并查询商品信息列表。
//    如果默认自动消耗已内购但未被消耗的商品，可以通过设置isAutoConsumeAsync改变。
//            3、public void startConnection()
//    连接谷歌支付服务(一般情况下不需要手动调用，build的时候已经调用了)
//
//
////查询、购买与消耗
//4、public void queryInventoryInApp() 查询内购商品信息列表
//5、public void queryInventorySubs() 查询订阅商品信息列表
//6、public void purchaseInApp(Activity activity,String skuId) 发起内购
//7、public void purchaseSubs(Activity activity,String skuId) 发起订阅
//8、public void consumeAsync(String purchaseToken) 消耗商品(一般情况下不需要手动调用，内购的时候自动调用了)
//
////购买历史、有效订阅数
// 9、public List<Purchase> queryPurchasesInApp() 获取已经内购的商品列表
//10、public List<Purchase> queryPurchasesSubs() 获取已经订阅的商品列表
//11、public int getPurchasesSizeSubs() 获取有效订阅的数量(-1查询失败，0没有有效订阅，>0具有有效的订阅)
//
////便捷工具
//12、public int getSubsPositionBySku(String sku) 通过sku获取订阅商品序号
//13、public int getInAppPositionBySku(String sku) 通过sku获取内购商品序号
//14、public String getSubsSkuByPosition(int position) 通过序号获取订阅sku
//15、public String getInAppSkuByPosition(int position) 通过序号获取内购sku
//16、private String getSkuType(String sku) 通过sku获取商品类型(订阅获取内购)inapp内购，subs订阅
//
////接口设置
//17、public GoogleBillingUtil setOnPurchaseFinishedListener(OnPurchaseFinishedListener onPurchaseFinishedListener) 购买回调接口
//18、public GoogleBillingUtil setOnQueryFinishedListener(OnQueryFinishedListener onQueryFinishedListener) 商品信息查询接口
//19、public GoogleBillingUtil setOnStartSetupFinishedListener(OnStartSetupFinishedListener onStartSetupFinishedListener) 服务初始化结果回调接口
//
////其他、内存
//20、public void setIsAutoConsumeAsync(boolean isAutoConsumeAsync) 设置是否自动消耗商品
//21、public static void cleanListener() 清除所有监听器，避免内存泄漏，回调错乱等问题。
//22、public static void endConnection() 断开连接google服务（一般情况不建议调用该方法，让google保留连接是最好的选择。）
    public final String TAG = "GoogleBillingVst";
    private MainActivity _target;
    private GoogleBillingUtil googleBillingUtil = null;
    private MyOnPurchaseFinishedListener mOnPurchaseFinishedListener = new MyOnPurchaseFinishedListener();//购买回调接口
    private MyOnQueryFinishedListener mOnQueryFinishedListener = new MyOnQueryFinishedListener();//查询回调接口
    private MyOnStartSetupFinishedListener mOnStartSetupFinishedListener = new MyOnStartSetupFinishedListener();//启动结果回调接口
    private MyConsumeResponseListener mConsumeResponseListener = new MyConsumeResponseListener();//启动结果回调接口

    public GoogleBillingVst(MainActivity tg) {
        _target = tg;
        googleBillingUtil = GoogleBillingUtil.getInstance()
                .setOnPurchaseFinishedListener(mOnPurchaseFinishedListener)
                .setOnQueryFinishedListener(mOnQueryFinishedListener)
                .setOnStartSetupFinishedListener(mOnStartSetupFinishedListener)
                .setConsumeResponseListener(mConsumeResponseListener)
                .build(_target);
    }


    //如果下个页面或者上个页面没有使用到googleBuillingUtil.getInstance()，那么就需要在finish或者startActivity之前调用cleanListener()方法，来清除接口。
    public void onBackPressed() {
        GoogleBillingUtil.cleanListener();
    }

    //返回键点击
    public void onBackClick() {
        GoogleBillingUtil.cleanListener();
    }

    //查询商品信息回调接口
    private class MyOnQueryFinishedListener implements GoogleBillingUtil.OnQueryFinishedListener {
        @Override
        public void onQuerySuccess(String skuType, List<SkuDetails> list) {
            //查询成功，返回商品列表，
            //skuDetails.getPrice()获得价格(文本)
            //skuDetails.getType()获得类型 sub或者inapp,因为sub和inapp的查询结果都走这里，所以需要判断。
            //googleBillingUtil.getSubsPositionBySku(skuDetails.getSku())获得当前subs sku的序号
            //googleBillingUtil.getInAppPositionBySku(skuDetails.getSku())获得当前inapp suk的序号
        }

        @Override
        public void onQueryFail(int responseCode) {
            //查询失败
            GameLib.alert("查询失败 code:" + responseCode, _target);
        }

        @Override
        public void onQueryError() {
            //查询错误
            GameLib.alert("查询错误", _target);
        }
    }

    //服务初始化结果回调接口
    private class MyOnStartSetupFinishedListener implements GoogleBillingUtil.OnStartSetupFinishedListener {
        //...;
        @Override
        public void onSetupSuccess() {
            Log.i(TAG, "启动成功");
        }

        @Override
        public void onSetupFail(int responseCode) {
            Log.i(TAG, "启动失败 code:" + responseCode);
        }

        @Override
        public void onSetupError() {
            Log.i(TAG, "启动错误 google 服务不可用");
        }
    }

    //购买商品回调接口
    private class MyOnPurchaseFinishedListener implements GoogleBillingUtil.OnPurchaseFinishedListener {
        @Override
        public void onPurchaseSuccess(List<Purchase> list) {
            //内购或者订阅成功,可以通过purchase.getSku()获取suk进而来判断是哪个商品
            for (Purchase purchase : list) {
                String sku = purchase.getSku();
                if (sku != null) {
                    String skuType = googleBillingUtil.getSkuType(sku);
                    if (skuType != null) {
                        if (skuType.equals(BillingClient.SkuType.INAPP)) {
                            googleBillingUtil.consumeAsync(purchase.getPurchaseToken());
                            GameLib.alert("购买成功，开始消耗商品" + purchase.getPurchaseToken(), _target);
                        }
                    }
                }
            }
        }

        @Override
        public void onPurchaseFail(int responseCode) {
            GameLib.alert("购买失败 code:" + responseCode, _target);
        }

        @Override
        public void onPurchaseError() {
            GameLib.alert("购买错误mBillingClient is null or startConnection fault", _target);
        }
    }

    /**
     * Googlg消耗商品回调
     */
    private class MyConsumeResponseListener implements ConsumeResponseListener {
        @Override
        public void onConsumeResponse(int responseCode, String s) {
            if (responseCode == BillingClient.BillingResponse.OK) {
                GameLib.alert("消耗商品成功", _target);
            } else {
                GameLib.alert("消耗商品失败 code" + responseCode, _target);
            }
        }
    }

    public void onPurchaseButtonClicked(JSONObject data) {
        try {
            int awardId = data.getInt("awardId");
            switch (awardId) {
                case 801:
                    googleBillingUtil.purchaseInApp(_target, "android.test.purchased");
                    break;
                case 802:
                    googleBillingUtil.purchaseInApp(_target, "premium");
                    break;
            }
        } catch (JSONException e) {
            Log.d(_target.TAG, "支付 json 异常");
        }
    }

    /**
     * 恢复 的时候，查询 内购缓存库，有则尝试消耗
     */
    public void onResume() {
        List<Purchase> list = googleBillingUtil.queryPurchasesInApp();
        if (list != null) {
            mOnPurchaseFinishedListener.onPurchaseSuccess(list);
        }
    }

    public void onDestroy() {
        GoogleBillingUtil.endConnection();
        Log.d(_target.TAG, "Destroying helper.");
    }
}
