package com.jiantfuntexaspoker.main;

import android.app.AlertDialog;
import android.os.Bundle;
import android.os.Looper;
import android.support.annotation.Nullable;
import android.support.annotation.StringRes;
import android.support.annotation.UiThread;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.Purchase;
import com.jiantfuntexaspoker.main.billing.AcquireFragment;


import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import billing.BillingManager;

/**
 * 谷歌支付
 */
public class GoogleBillingVst {
    // Debug tag, for logging
    private static final String TAG = "BaseGamePlayActivity";

    // Default sample's package name to check if you changed it
    private static final String DEFAULT_PACKAGE_PREFIX = "com.example";

    private MainActivity _target;

    public BillingManager mBillingManager;
    private AcquireFragment mAcquireFragment;
    private UpdateListener mUpdateListener;


    public void setTarget(MainActivity tg) {
        _target = tg;
    }

    public void onCreate(Bundle savedInstanceState) {
        if (_target.getPackageName().startsWith(DEFAULT_PACKAGE_PREFIX)) {
            throw new RuntimeException("Please change the sample's package name!");
        }
        // Try to restore dialog fragment if we were showing it prior to screen rotation
        if (savedInstanceState != null) {
            mAcquireFragment = new AcquireFragment(_target);
        }
        // Create and initialize BillingManager which talks to BillingLibrary
        mUpdateListener = new UpdateListener();
        mUpdateListener.setTarget(this);
        mBillingManager = new BillingManager(_target, mUpdateListener);
    }

    public void onResume() {
        if (mBillingManager != null
                && mBillingManager.getBillingClientResponseCode() == BillingClient.BillingResponse.OK) {
            mBillingManager.queryPurchases();
        }
    }

    public void onPurchaseButtonClicked(JSONObject data) {
        Log.d(TAG, "Purchase button clicked.");
        try {
            if (mBillingManager != null
                    && mBillingManager.getBillingClientResponseCode()
                    > BillingManager.BILLING_MANAGER_NOT_INITIALIZED) {


                int awardId = data.getInt("awardId");
                switch (awardId) {
                    case 801:
                        mAcquireFragment.querySkuDetails("gas");
                        break;
                    case 802:
                        mAcquireFragment.querySkuDetails("premium");
                        break;
                }
            }
        }catch (JSONException e)
        {
            Log.d(_target.TAG, "支付 json 异常");
        }
    }

    public void onDestroy() {
        Log.d(_target.TAG, "Destroying helper.");
        if (mBillingManager != null) {
            mBillingManager.destroy();
        }
    }

    /**
     * Handler to billing updates
     */
    private class UpdateListener implements BillingManager.BillingUpdatesListener {
        private GoogleBillingVst _target;
        public void setTarget(GoogleBillingVst tg)
        {
            _target = tg;
        }
        @Override
        public void onBillingClientSetupFinished() {
            _target.onBillingManagerSetupFinished();
        }

        @Override
        public void onConsumeFinished(String token, @BillingClient.BillingResponse int result) {
            Log.d(TAG, "Consumption finished. Purchase token: " + token + ", result: " + result);

            // Note: We know this is the SKU_GAS, because it's the only one we consume, so we don't
            // check if token corresponding to the expected sku was consumed.
            // If you have more than one sku, you probably need to validate that the token matches
            // the SKU you expect.
            // It could be done by maintaining a map (updating it every time you call consumeAsync)
            // of all tokens into SKUs which were scheduled to be consumed and then looking through
            // it here to check which SKU corresponds to a consumed token.
            if (result == BillingClient.BillingResponse.OK) {
                // Successfully consumed, so we apply the effects of the item in our
                // game world's logic, which in our case means filling the gas tank a bit
                Log.d(TAG, "Consumption successful. Provisioning.");
                _target.alert(R.string.alert_fill_gas, 1);
            } else {
                _target.alert(R.string.alert_error_consuming, result);
            }
            Log.d(TAG, "End consumption flow.");
        }

        @Override
        public void onPurchasesUpdated(List<Purchase> purchaseList) {

            for (Purchase purchase : purchaseList) {
                switch (purchase.getSku()) {
                    case "premium":
                        Log.d(TAG, "You are Premium! Congratulations!!!");
                        break;
                    case "gas":
                        Log.d(TAG, "We have gas. Consuming it.");
                        // We should consume the purchase and fill up the tank once it was consumed
                        _target.mBillingManager.consumeAsync(purchase.getPurchaseToken());
                        break;

                }
            }
        }
    }
    void onBillingManagerSetupFinished() {
    }
    /**
     * Show an alert dialog to the user
     * @param messageId String id to display inside the alert dialog
     */
    @UiThread
    void alert(@StringRes int messageId) {
        alert(messageId, null);
    }

    /**
     * Show an alert dialog to the user
     * @param messageId String id to display inside the alert dialog
     * @param optionalParam Optional attribute for the string
     */
    @UiThread
    void alert(@StringRes int messageId, @Nullable Object optionalParam) {
        if (Looper.getMainLooper().getThread() != Thread.currentThread()) {
            throw new RuntimeException("Dialog could be shown only from the main thread");
        }

        AlertDialog.Builder bld = new AlertDialog.Builder(_target);
        bld.setNeutralButton("OK", null);

        if (optionalParam == null) {
            bld.setMessage(messageId);
        } else {
            bld.setMessage(_target.getResources().getString(messageId, optionalParam));
        }

        bld.create().show();
    }
}
