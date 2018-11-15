/*
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.jiantfuntexaspoker.running.billing;

import android.util.Log;

import com.android.billingclient.api.BillingClient.SkuType;
import com.android.billingclient.api.SkuDetails;
import com.android.billingclient.api.SkuDetailsResponseListener;
import com.jiantfuntexaspoker.running.MainActivity;
import com.jiantfuntexaspoker.running.billing.row.SkuRowData;

import java.util.ArrayList;
import java.util.List;

//import com.giant.billingsample.R;

import static com.android.billingclient.api.BillingClient.BillingResponse;

/**
 * Displays a screen with various in-app purchase and subscription options
 */
public class AcquireFragment {
    private static final String TAG = "AcquireFragment";

    private MainActivity _target;

    public AcquireFragment(MainActivity tg) {
        _target = tg;
    }

    private void displayAnErrorIfNeeded() {
        if (_target == null || _target.isFinishing()) {
            Log.i(TAG, "No need to show an error - activity is finishing already");
            return;
        }
        int billingResponseCode = _target.googleBillingVst.mBillingManager
                .getBillingClientResponseCode();
        switch (billingResponseCode) {
            case BillingResponse.OK:
                // If manager was connected successfully, then show no SKUs error
//                Log.d(_target.TAG, _target.getString(R.string.error_no_skus));
                break;
            case BillingResponse.BILLING_UNAVAILABLE:
//                Log.d(_target.TAG, _target.getString(R.string.error_billing_unavailable));
                break;
            default:
//                Log.d(_target.TAG, _target.getString(R.string.error_billing_default));
        }
    }

    /**
     * Queries for in-app and subscriptions SKU details and updates an adapter with new data
     */
    public void querySkuDetails(String skuId) {
        long startTime = System.currentTimeMillis();

        Log.d(TAG, "querySkuDetails() got subscriptions and inApp SKU details lists for: "
                + (System.currentTimeMillis() - startTime) + "ms");

        if (_target != null && !_target.isFinishing()) {
            // Filling the list with all the data to render subscription rows
            List<String> list = new ArrayList<String>();
            list.add(skuId);
            addSkuRows(list, SkuType.INAPP, null);
        }
    }

    private void addSkuRows(final List<String> skusList,
                            final @SkuType String billingType, final Runnable executeWhenFinished) {

        _target.googleBillingVst.mBillingManager.querySkuDetailsAsync(billingType, skusList,
                new SkuDetailsResponseListener() {
                    @Override
                    public void onSkuDetailsResponse(int responseCode, List<SkuDetails> skuDetailsList) {

                        if (responseCode != BillingResponse.OK) {
                            Log.w(TAG, "Unsuccessful query for type: " + billingType
                                    + ". Error code: " + responseCode);
                        } else if (skuDetailsList != null
                                && skuDetailsList.size() > 0) {
                            final List<SkuRowData> inList = new ArrayList<>();
                            for (SkuDetails details : skuDetailsList) { //获取应用商品列表
                                inList.add(new SkuRowData(details, SkuRowData.TYPE_NORMAL,
                                        billingType));
                            }
                            _target.googleBillingVst.mBillingManager.initiatePurchaseFlow(skusList.get(0), billingType);
                        } else {
                            // Handle empty state
                            displayAnErrorIfNeeded();
                        }
                        if (executeWhenFinished != null) {
                            executeWhenFinished.run();
                        }
                    }
                });
    }
}