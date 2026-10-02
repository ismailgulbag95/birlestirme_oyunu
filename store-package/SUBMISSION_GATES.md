# Submission gates

## Google Play

- [x] Apply the selected Curio Alchemy icon to the Android launcher, splash screen, and localized app labels.
- [x] Set the Android/Capacitor application ID to `com.birlestirme.oyunu` and target API 36 in the release project.
- [x] Prepare localized English and Turkish store text, screenshots, feature graphics, and icon files.
- [x] Gate the production build on production AdMob IDs, a public HTTPS privacy-policy URL, and an upload keystore.
- [x] Check UMP consent before initializing the Mobile Ads SDK or requesting rewarded ads; expose the UMP privacy-options form when required.
- [ ] Confirm the Play Console app uses the exact package name `com.birlestirme.oyunu` and the developer profile/package registration is complete.
- [ ] Clear `Curio Alchemy` / `Curio Simya` for exact and similar trademarks and store names in launch markets.
- [ ] Fill the publisher/contact placeholders in both privacy-policy drafts, review the data disclosures, host both language pages, and set `VITE_PRIVACY_POLICY_URL`.
- [ ] Create the production AdMob app and rewarded-ad unit, then configure the needed Privacy & Messaging forms for chosen countries and audience.
- [ ] Complete the Play Console ads, Data safety, target-audience, content-rating, contact, pricing, and country declarations.
- [ ] Generate and safely retain an upload keystore; enable Play App Signing and create a signed Android App Bundle.
- [ ] Complete internal/closed testing. If the developer account is personal and was created after 13 November 2023, keep at least 12 closed-testers opted in continuously for 14 days and apply for production access.
- [ ] Review the signed bundle on supported phones, including startup, ad-consent decisions, rewarded-ad completion/cancel, saved progress, rotation/resizing, and relaunch.
- [ ] Submit the production release and the final store listing for Google's review.
- [ ] After enough listing traffic, run one-variable Google Play store experiments and carry any winning icon change into the Android binary.

Follow the ordered, account-specific steps in [the Google Play Console checklist](PLAY_RELEASE_CHECKLIST_TR.md). Keep release IDs, key files, and passwords outside this repository and do not send secrets in chat.

## Shared product and asset checks

- [ ] Review the full English and Turkish in-game copy. Some Codex/item-lore strings still fall back to Turkish in English mode.
- [ ] Confirm the launch audience and distribution countries; update ad, age-rating, privacy, and support declarations to match.
- [ ] Capture the optional preview video from the final release build before using it.

## Apple App Store (separate future release)

- [ ] Create an iOS project/build; this checkout currently has no iOS target.
- [ ] Add the 1024 × 1024 icon to the iOS app target and complete Apple's age-rating and privacy forms.
- [ ] Add the selected icon to the iOS binary before running icon product-page tests.
- [ ] Review the iOS signed build on supported device sizes against the supplied actual-gameplay screenshots.
