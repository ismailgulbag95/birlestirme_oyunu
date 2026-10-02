# Publication plan

Baseline from the local audit: **59/100**. After the source, build, local
Android, and one physical-device QA pass, the current estimate is **71/100**.
Store release is still gated by production credentials, hosted CI, remaining
device checks, and publisher/account setup. Keep these gates in order so each
later stage verifies a stable output from the earlier stage.

The numeric score snapshot below is from the earlier project audit and was not
recalculated during the 2 October 2026 Play-release pass. Use the current build
and release-gate evidence in the stage table for today's status.

## Score snapshot

Scores are engineering estimates from source review, builds, and one Android
device smoke pass; store-console compliance and broad device/performance
coverage are not yet verified. The overall score is the equal-weight mean of
the six areas.

| Area | Baseline | Current | Evidence / remaining gap |
| --- | ---: | ---: | --- |
| Correctness | 65 | 82 | Six logic tests and web/Android builds pass; phone crafting, mode switch, third slot, save/relaunch pass; full recipe and migration coverage remains |
| Readability | 55 | 58 | Release debug UI is removed; large UI and item files still need modularizing |
| Architecture | 64 | 66 | Native ad provider is integrated; UI, DOM, and 3D responsibilities remain coupled |
| Security | 85 | 82 | Release IDs/signing are gated; 7 dependency advisories (including 1 critical) still need triage |
| Performance | 48 | 60 | Production dist is 155.26 MiB after excluding three unused preview GLBs; initial JS and separately loaded Rapier still produce Vite chunk warnings |
| Release readiness | 38 | 75 | Fresh API 36 debug build passed on 2 October 2026 (144.90 MiB). Release AAB is blocked by missing production AdMob IDs, public HTTPS privacy URL, and local signing values; fresh device QA and Console declarations remain |

Equal-weight result: **59/100 → 71/100**. This is not a substitute for broad
device coverage or real-device frame-time measurements.

| Stage | Gate | Status |
| --- | --- | --- |
| 1. Source and logic | Preserve the active feature edits; run focused Node tests for quota and reward decisions. | 6/6 tests passed |
| 2. Web output | Remove stale Vite bundles on every build; defer Rapier/WASM loading so the UI can start first; exclude ignored source backups from public assets. | Production build passed; `dist/` is 155.26 MiB after removing three unused previews; initial JS and Rapier still produce chunk-size warnings |
| 3. Android toolchain | Build with API 36 and a supported Gradle/AGP pair. | Fresh debug APK build passed with API 36, AGP 8.9.1, and Gradle 8.11.1; APK is 144.90 MiB |
| 4. Ads and progression | Register the Capacitor AdMob plugin, request UMP consent, use demo IDs only in test builds, and fail release builds without production IDs. | UMP consent bridge and privacy-options entry compiled successfully; release requires production AdMob IDs and Privacy & Messaging setup; a fresh device pass remains |
| 5. Release integrity | Keep debug controls in development builds; require a supplied upload key for Android releases. | Production debug controls removed; release remains gated on real IDs and upload key |
| 6. CI | Run focused tests, compile the Android debug app, build the web app, and let deployment failures fail the workflow. | Workflow updated; hosted CI run pending |
| 7. Device QA | Install the debug build on a supported Android phone; verify startup, both crafting modes, rewarded-ad completion/cancel, persistence, rotation/resizing, and relaunch. | Partial pass on device `M2101K6G` (Android 13/API 33, 1080×2400): installed/launched; Fire + Water produced Buhar (4→5 discoveries); drawer/settings responded; Grandmaster exposed three slots and accepted three ingredients; mode and discoveries survived force-stop/relaunch. Returned to Classic with an empty table. Process remained live; filtered logcat showed no Java fatal or uncaught JS errors. Rewarded ad loaded but completion/cancel and rotation/resizing remain unverified. |
| 8. Store submission | Complete AdMob account setup and consent messages, privacy/support and data-safety details, content rating, localized copy review, and final signed-bundle review. | Localized Play copy/assets and the Android icon, splash, and labels are integrated. `bundleRelease` stops at the intended configuration gate until production AdMob IDs, a hosted HTTPS policy URL, and local upload-key values are supplied; Console declarations and account-specific test access remain. |

The web build has no native rewarded-ad provider, so it keeps trio discovery
ungated. The Android release path requires production ad IDs, an HTTPS privacy
policy URL, and an upload keystore; the test build uses Google's demo ad IDs
and cannot pass the release validation task.
The current local `dist` folder is from the test build and must not be used for
web publication. Re-run `npm run build` for production.
