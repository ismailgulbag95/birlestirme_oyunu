# Release checklist

## Local and CI checks

```sh
npm ci
npm test
npm run build
```

The web build intentionally has no rewarded ads. When the native AdMob provider
is unavailable, the web build leaves trio formula discovery ungated.

The Android project targets API 36 and uses the minimum Android Gradle Plugin
and Gradle versions documented for compiling against that API. Keep these
values current with Google Play's submission policy.

Production Vite builds omit the three unused original/preview character GLBs
from `public/` while leaving those source files untouched. The game loads
`character.glb`, `character2.glb`, and `character3.glb`; keeping preview copies
out of `dist/` prevents them from inflating the Android package.

## Android phone test

```sh
npm run build:android:test
cd android
./gradlew assembleDebug
```

On Windows, use `gradlew.bat assembleDebug`. The test build uses Google's demo
rewarded-ad unit and app IDs. Never publish that build.
This command leaves `dist/` in test mode; run `npm run build` again before a
web production deployment.

## Android Play release

Copy `.env.example` to the Git-ignored `.env.local` and set these production
values there before building the web assets and Android bundle:

- `VITE_ADMOB_REWARDED_AD_UNIT_ID`: the production rewarded ad unit ID.
- `VITE_PRIVACY_POLICY_URL`: public HTTPS privacy-policy page; the app shows it
  in Settings and the release task rejects a missing/non-HTTPS URL.
- `ADMOB_APP_ID`: the production AdMob application ID.

Vite reads the `VITE_` values for the app UI. Gradle reads the same three
values from `.env.local` when packaging the native app, so they do not need to
be copied into a separate shell session. Do not put keystore passwords in this
file.

Set the upload signing key in the ignored local file `android/key.properties`:

```properties
storeFile=app/upload-key.jks
keyAlias=upload
storePassword=your-store-password
keyPassword=your-key-password
```

`storeFile` is relative to the `android/` directory. Copy the format from
`android/key.properties.example`; never commit `key.properties`, the keystore,
or passwords. Gradle reads these properties automatically. The four
`ANDROID_KEYSTORE_*` environment variables remain available as a CI/advanced
alternative when the properties are left as `REPLACE_ME`.

Then run:

```sh
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

The release Gradle task fails when the AdMob IDs, privacy-policy URL, or
signing key are missing, or when Google's demo IDs are supplied. Keep the
keystore and passwords out of version control. UMP consent is checked before
the Mobile Ads SDK initializes or requests a rewarded ad. The app exposes
Google's privacy-options form in Settings when UMP reports that an entry point
is required.

Before store submission, finish the store-specific privacy, data-safety,
content-rating, support, and publisher fields in `store-package/SUBMISSION_GATES.md`.
