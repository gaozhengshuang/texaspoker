package com.jiantfuntexaspoker.main;

import android.app.AlertDialog;
import android.os.Bundle;
import android.os.Looper;
import android.support.annotation.DrawableRes;
import android.support.annotation.Nullable;
import android.support.annotation.StringRes;
import android.support.annotation.UiThread;
import android.support.annotation.VisibleForTesting;
import android.support.v4.app.DialogFragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import com.android.billingclient.api.BillingClient;
import com.jiantfuntexaspoker.main.billing.AcquireFragment;


import billing.BillingManager;
import billing.BillingProvider;

/**
 * 谷歌支付
 */
public class GoogleBillingVst implements BillingProvider {
    // Debug tag, for logging
    private static final String TAG = "BaseGamePlayActivity";

    // Tag for a dialog that allows us to find it when screen was rotated
    private static final String DIALOG_TAG = "dialog";
    // Default sample's package name to check if you changed it
    private static final String DEFAULT_PACKAGE_PREFIX = "com.example";

    private MainActivity _target;

    private boolean mGoldMonthly;
    private boolean mGoldYearly;
    private boolean mIsPremium;

    private BillingManager mBillingManager;
    private AcquireFragment mAcquireFragment;
    private MainViewController mViewController;

    private View mScreenWait, mScreenMain;
    private ImageView mCarImageView, mGasImageView;


    public void setTarget(MainActivity tg) {
        _target = tg;
    }

    public void onCreate(Bundle savedInstanceState) {
        mViewController = new MainViewController(this);
        if (_target.getPackageName().startsWith(DEFAULT_PACKAGE_PREFIX)) {
            throw new RuntimeException("Please change the sample's package name!");
        }
        // Try to restore dialog fragment if we were showing it prior to screen rotation
        if (savedInstanceState != null) {
            mAcquireFragment = (AcquireFragment) _target.getSupportFragmentManager()
                    .findFragmentByTag(DIALOG_TAG);
        }
        // Create and initialize BillingManager which talks to BillingLibrary
        mBillingManager = new BillingManager(_target, mViewController.getUpdateListener());

        mScreenWait = _target.findViewById(R.id.screen_wait);
        mScreenMain = _target.findViewById(R.id.screen_main);
        mCarImageView = _target.findViewById(R.id.free_or_premium);
        mGasImageView = _target.findViewById(R.id.gas_gauge);

        // Specify purchase and drive buttons listeners
        // Note: This couldn't be done inside *.xml for Android TV since TV layout is inflated
        // via AppCompat
       _target.findViewById(R.id.button_purchase).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onPurchaseButtonClicked(view);
            }
        });
//        _target.findViewById(R.id.button_drive).setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                onDriveButtonClicked(view);
//            }
//        });
    }

    public void onResume() {
        if (mBillingManager != null
                && mBillingManager.getBillingClientResponseCode() == BillingClient.BillingResponse.OK) {
            mBillingManager.queryPurchases();
        }
    }

    @Override
    public BillingManager getBillingManager() {
        return mBillingManager;
    }

    @Override
    public boolean isPremiumPurchased() {
        return mViewController.isPremiumPurchased();
    }

    @Override
    public boolean isGoldMonthlySubscribed() {
        return mViewController.isGoldMonthlySubscribed();
    }

    @Override
    public boolean isGoldYearlySubscribed() {
        return mViewController.isGoldYearlySubscribed();
    }

    @Override
    public boolean isTankFull() {
        return mViewController.isTankFull();
    }

    public void onPurchaseButtonClicked(final View arg0) {
        Log.d(TAG, "Purchase button clicked.");

        if (mAcquireFragment == null) {
            mAcquireFragment = new AcquireFragment();
        }

        if (!isAcquireFragmentShown()) {
            mAcquireFragment.show(_target.getSupportFragmentManager(), DIALOG_TAG);

            if (mBillingManager != null
                    && mBillingManager.getBillingClientResponseCode()
                    > BillingManager.BILLING_MANAGER_NOT_INITIALIZED) {
                mAcquireFragment.onManagerReady(this);
            }
        }
    }

    public void onDestroy() {
        Log.d(_target.TAG, "Destroying helper.");
        if (mBillingManager != null) {
            mBillingManager.destroy();
        }
    }


    /**
     * Remove loading spinner and refresh the UI
     */
    public void showRefreshedUi() {
        setWaitScreen(false);
        updateUi();
        if (mAcquireFragment != null) {
            mAcquireFragment.refreshUI();
        }
    }
    void onBillingManagerSetupFinished() {
        if (mAcquireFragment != null) {
            mAcquireFragment.onManagerReady(this);
        }
    }
    @VisibleForTesting
    public MainViewController getViewController() {
        return mViewController;
    }
    /**
     * Enables or disables the "please wait" screen.
     */
    private void setWaitScreen(boolean set) {
        mScreenMain.setVisibility(set ? View.GONE : View.VISIBLE);
        mScreenWait.setVisibility(set ? View.VISIBLE : View.GONE);
    }
    /**
     * Sets image resource and also adds a tag to be able to verify that image is correct in tests
     */
    private void setImageResourceWithTestTag(ImageView imageView, @DrawableRes int resId) {
        imageView.setImageResource(resId);
        imageView.setTag(resId);
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
     * Update UI to reflect model
     */
    @UiThread
    private void updateUi() {
        Log.d(TAG, "Updating the UI. Thread: " + Thread.currentThread().getName());

        // Update car's color to reflect premium status or lack thereof
        setImageResourceWithTestTag(mCarImageView, isPremiumPurchased() ? R.drawable.premium
                : R.drawable.free);

        // Update gas gauge to reflect tank status
        setImageResourceWithTestTag(mGasImageView, mViewController.getTankResId());

        if (isGoldMonthlySubscribed() || isGoldYearlySubscribed()) {
            mCarImageView.setBackgroundColor(ContextCompat.getColor(_target, R.color.gold));
        }
    }
    public boolean isAcquireFragmentShown() {
        return mAcquireFragment != null && mAcquireFragment.isVisible();
    }

    public DialogFragment getDialogFragment() {
        return mAcquireFragment;
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
