# Deploying to Zoho Catalyst (Slate)

This is a static Vite + React SPA — deploy via Catalyst **Slate**.

## Build
```
npm install
npm run build
```
Output: `dist/` (includes `index.html` and a copy as `404.html` for SPA deep-link fallback).

## Deploy options

### A) Direct Upload (fastest)
1. `cd dist && zip -r ../dist.zip .`
2. Console → Slate → Create App → Direct Upload → drag `dist.zip`.
3. Framework: select **Vite** (or React).
4. Deploy.

### B) Git Auto-Deploy
1. Push repo to GitHub/GitLab/Bitbucket.
2. Console → Slate → Create App → Connect Git → pick repo.
3. Build command: `npm run build`  Output dir: `dist`
4. Enable Auto Deploy.

## Notes
- App is fully client-side; no Catalyst Functions / Data Store needed.
- `404.html` mirrors `index.html` so refreshing on `/distributors/d1` etc. still loads the SPA.
- Free SSL + custom domain available in Slate console.
