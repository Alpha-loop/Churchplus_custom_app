# Church App (lean, single-tenant, Modern-only)

Extracted from the main faithConnect app — this is a standalone
project for building a dedicated, separately-listed app for one
specific church. No Join a Church flow, no Classic layout, no
layout branching at all. The tenant and layout are both fixed at
build time.

## First-time setup

```
npm install
```

Copy `.env.example`-style values into `.env`:

```
EXPO_PUBLIC_API_URL=https://unionfaith.azurewebsites.net/api
EXPO_PUBLIC_TENANT_ID=<this church's real tenant GUID>
```

The app will not load anything without `EXPO_PUBLIC_TENANT_ID` set
— there's no Join screen to fall back to.

## Per-church build identity

Set these before running `eas build` (or `expo prebuild`), not in
`.env` — they're read by `app.config.js` at build time, not by
the app itself at runtime:

```
APP_NAME=Holy Rosary Connect
APP_SLUG=holy-rosary-connect
APP_ICON=./assets/holy-rosary-icon.png
APP_SPLASH_IMAGE=./assets/holy-rosary-splash.png
IOS_BUNDLE_IDENTIFIER=com.holyrosary.app
ANDROID_PACKAGE=com.holyrosary.app
GOOGLE_SERVICES_FILE=./google-services.json
EAS_PROJECT_ID=<from eas init, see below>
```

**Before your first real build for a new church, you need:**

1. `eas init` — run this fresh for every new church. `projectId`
   is tied to one specific EAS project; it cannot be shared
   across separate App Store/Play Store listings.
2. That church's own `google-services.json` from a Firebase
   project tied to *their* Android package name. Firebase configs
   are keyed to the package name — this repo doesn't ship one at
   all (there's nothing valid to include), so builds will fail at
   the Android step until you add a real one.
3. Their own icon/splash image assets.
4. Separate developer-account-level listings on the App Store and
   Play Store for their bundle ID/package name — this is a manual
   process on your end, not something any config file handles.

## How the tenant gets loaded

There's no `confirmChurch()`-on-tap flow here. `App.tsx` fetches
this one hardcoded tenant's real profile and real branding once,
automatically, before the navigator ever renders — same
underlying service calls (`getMinistryProfile`,
`getBrandingConfiguration`) the main app uses, just triggered on
launch instead of after someone taps a search result.

Layout is hardcoded to `"modern"` directly — it is NOT read from
this tenant's branding config the way the main multi-church app
does, since there's no reason for a dedicated single-church build
to depend on that config staying correct.

## What's genuinely unused dead weight, left in on purpose

Bulk-copying `src/modules/` pulled in some files only Classic
ever used, which are harmless (nothing imports them) but not worth
hunting down individually right now:

- `src/modules/onboarding/hooks/useChurchProfile.ts` — the
  Join-flow confirm logic. Not used anywhere in this app; only
  `getMinistryProfile`/`getBrandingConfiguration` from
  `onboarding.service.ts` (used directly in `App.tsx`) are real
  dependencies.
- A handful of Classic-only component files bulk-copied alongside
  real ones in the same folders (e.g. `CelebrantAvatar.tsx`,
  `CelebrantItem.tsx` — these reference a `"Celebrants"` screen
  that isn't registered in the *main* app's navigator either, a
  pre-existing dead end there too, not something introduced here).

None of these are imported by anything `AppNavigator.tsx` or
`App.tsx` actually renders, so they don't affect the build — just
know they're there if you're auditing the codebase later.

## Reused screens with no Modern-styled version yet

These came from Classic as-is (moved to `src/shared/screens/`,
same honesty rule as the main app — reuse the real, working thing
rather than leave a dead end): `ExternalUrlScreen`,
`EventQRScanner`, `ConnectionProfileScreen`, `CreatePost`,
`BankAccounts`, `OnlineGiving`, `Pledges`. If/when Modern-styled
versions of these get built for the main app, the same versions
can be copied over here.

## Known pre-existing gaps (not introduced by this extraction)

- `"Celebrants"` and `"ResetPassword"` are navigated to from a
  couple of components/screens but aren't registered anywhere —
  confirmed this is true in the main app too, not something this
  extraction broke.
- `SettingsScreen.tsx` didn't actually exist in the uploaded main
  project at all, despite being a real navigation target from
  Profile. Worth checking the main app for this specifically.
  Rebuilt fresh here, without "Switch Church" (doesn't apply to a
  single-tenant build).
