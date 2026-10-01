# Publication plan

Baseline from the local audit: **59/100**. After the source, build, local
Android, and one physical-device QA pass, the current estimate is **71/100**.
Store release is still gated by production credentials, hosted CI, remaining
device checks, and publisher/account setup. Keep these gates in order so each
later stage verifies a stable output from the earlier stage.

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
| Performance | 48 | 60 | Dist fell from 509.54 MB to 147.77 MB; main JS is 1.87 MB/339 KB gzip and Rapier loads separately |
| Release readiness | 38 | 75 | API 36 APK builds and one phone smoke pass; production IDs/key, hosted CI, remaining device checks, and store account tasks remain |

Equal-weight result: **59/100 → 71/100**. This is not a substitute for broad
device coverage or real-device frame-time measurements.

| Stage | Gate | Status |
| --- | --- | --- |
| 1. Source and logic | Preserve the active feature edits; run focused Node tests for quota and reward decisions. | 6/6 tests passed |
| 2. Web output | Remove stale Vite bundles on every build; defer Rapier/WASM loading so the UI can start first; exclude ignored source backups from public assets. | Production build passed; dist reduced from 509.54 MB to 147.77 MB; initial JS gzip is 339 KB |
| 3. Android toolchain | Build with API 36 and a supported Gradle/AGP pair. | Debug APK build passed with API 36, AGP 8.9.1, and Gradle 8.11.1; APK is 133.65 MB |
| 4. Ads and progression | Register the Capacitor AdMob plugin, request UMP consent, use demo IDs only in test builds, and fail release builds without production IDs. | Build integration passed; on-device test rewarded ad initialized and loaded with Google's demo unit; completion/cancel reward behavior not exercised; release IDs remain gated |
| 5. Release integrity | Keep debug controls in development builds; require a supplied upload key for Android releases. | Production debug controls removed; release remains gated on real IDs and upload key |
| 6. CI | Run focused tests, compile the Android debug app, build the web app, and let deployment failures fail the workflow. | Workflow updated; hosted CI run pending |
| 7. Device QA | Install the debug build on a supported Android phone; verify startup, both crafting modes, rewarded-ad completion/cancel, persistence, rotation/resizing, and relaunch. | Partial pass on device `M2101K6G` (Android 13/API 33, 1080×2400): installed/launched; Fire + Water produced Buhar (4→5 discoveries); drawer/settings responded; Grandmaster exposed three slots and accepted three ingredients; mode and discoveries survived force-stop/relaunch. Returned to Classic with an empty table. Process remained live; filtered logcat showed no Java fatal or uncaught JS errors. Rewarded ad loaded but completion/cancel and rotation/resizing remain unverified. |
| 8. Store submission | Complete AdMob account setup and consent messages, privacy/support and data-safety details, content rating, localized copy review, and final signed-bundle review. | Account and publisher actions remain |

The web build has no native rewarded-ad provider, so it keeps trio discovery
ungated. The Android release path requires production ad IDs and an upload
keystore; the test build uses Google's demo ad IDs and cannot pass the release
validation task.
The current local `dist` folder is from the test build and must not be used for
web publication. Re-run `npm run build` for production.
