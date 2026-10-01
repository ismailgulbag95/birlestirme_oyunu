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

Set these environment variables in the build shell before building the web
assets and Android bundle:

- `VITE_ADMOB_REWARDED_AD_UNIT_ID`: the production rewarded ad unit ID.
- `ADMOB_APP_ID`: the production AdMob application ID.
- `ANDROID_KEYSTORE_PATH`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`,
  and `ANDROID_KEY_PASSWORD`: the upload signing key configuration.

Then run:

```sh
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

The release Gradle task fails when the AdMob IDs or signing key are missing, or
when Google's demo IDs are supplied. Keep the keystore and passwords outside
the repository.

Before store submission, finish the store-specific privacy, data-safety,
content-rating, support, and publisher fields in `store-package/SUBMISSION_GATES.md`.
