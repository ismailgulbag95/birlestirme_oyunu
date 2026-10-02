package com.birlestirme.oyunu;

import android.app.Activity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.UserMessagingPlatform;

@CapacitorPlugin(name = "AdPrivacy")
public class AdPrivacyPlugin extends Plugin {

    @PluginMethod
    public void canRequestAds(PluginCall call) {
        try {
            ConsentInformation consentInformation = UserMessagingPlatform.getConsentInformation(getContext());
            JSObject result = new JSObject();
            result.put("canRequestAds", consentInformation.canRequestAds());
            call.resolve(result);
        } catch (Exception error) {
            call.reject("Unable to read advertising consent state.", error);
        }
    }

    @PluginMethod
    public void isPrivacyOptionsRequired(PluginCall call) {
        try {
            ConsentInformation consentInformation = UserMessagingPlatform.getConsentInformation(getContext());
            JSObject result = new JSObject();
            result.put(
                "required",
                consentInformation.getPrivacyOptionsRequirementStatus()
                    == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED
            );
            call.resolve(result);
        } catch (Exception error) {
            call.reject("Unable to read privacy options state.", error);
        }
    }

    @PluginMethod
    public void showPrivacyOptionsForm(PluginCall call) {
        Activity activity = getActivity();
        if (activity == null) {
            call.reject("The Android activity is unavailable.");
            return;
        }

        activity.runOnUiThread(() -> {
            try {
                UserMessagingPlatform.showPrivacyOptionsForm(activity, formError -> {
                    if (formError != null) {
                        call.reject("Unable to show privacy options.", formError.getMessage());
                        return;
                    }

                    ConsentInformation consentInformation = UserMessagingPlatform.getConsentInformation(getContext());
                    JSObject result = new JSObject();
                    result.put("canRequestAds", consentInformation.canRequestAds());
                    call.resolve(result);
                });
            } catch (Exception error) {
                call.reject("Unable to show privacy options.", error);
            }
        });
    }
}
