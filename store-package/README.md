# Curio Alchemy — Store package

This folder contains a proposed English/Turkish store package for the current alchemy discovery game: market and product notes, store copy, a visual identity, actual-gameplay screenshot compositions, Google Play feature graphics, and a preview-video storyboard.

## Start here

- [Research and positioning](RESEARCH.md)
- [English store listing](STORE_COPY_EN.md)
- [Turkish store listing](STORE_COPY_TR.md)
- [Identity brief and usage](identity/brief.md)
- [Creative test plan](CREATIVE_TESTS.md)
- [Preview storyboard](PREVIEW_STORYBOARD.md)
- [Submission gates](SUBMISSION_GATES.md)
- [Google Play Console checklist (TR)](PLAY_RELEASE_CHECKLIST_TR.md)
- [Privacy policy draft (TR)](PRIVACY_POLICY_TR_DRAFT.md)
- [Privacy policy draft (EN)](PRIVACY_POLICY_EN_DRAFT.md)
- [Visual overview](creative/package-overview.png)
- [Exact upload file map](UPLOAD_FILES.md)

## Creative files

- `assets/app-store/{en,tr}/`: three 1320 × 2868 portrait JPEG listing screenshots per language. PNG files are visual review previews; use JPEG uploads because Apple rejects alpha-channel screenshots.
- `assets/google-play/{en,tr}/`: three 1080 × 1920 portrait JPEG screenshots and a 1024 × 500 JPEG feature graphic per language. Google Play also requires the 512 × 512 PNG icon.
- `assets/brand/`: 512 × 512 Google Play icons, 1024 × 1024 opaque App Store icon PNGs, and additional symbol exports. SVG masters are in `identity/`.
- `source-shots/`: high-resolution raw gameplay captures used in the screenshot compositions, plus a few earlier capture references.
- `creative/`: capture-ready HTML source for the screenshot compositions and feature graphics.

## Release status

The copy and image assets are prepared from the current project and avoid unverified features. The recommended Curio icon and localized app label are now integrated into the Capacitor Android app. This is not yet a signed production release: the publisher still needs to clear the working name, host and review the privacy policy, set production AdMob IDs and consent messages, supply an upload key, complete the Play Console declarations, and finish the required testing track if their account is subject to it. The release task requires production ad IDs, an HTTPS privacy-policy URL, and an upload signing key. There is currently no iOS project in this checkout.

The working name `Curio Alchemy` needs exact/similar trademark and store-name clearance before public use. Keyword demand is qualitative: no paid keyword-volume dataset was available, so this package does not invent search-volume numbers.

## Screenshot integrity

All gameplay panels are captures from the current game running in a browser, composed with localized captions. The second panel shows two selected elements before the combine action; it does not fake a recipe result. The third panel shows the current 40-discovery collection state. There are no fabricated ratings, rewards, timers, social proof, or unimplemented systems in the listing.
