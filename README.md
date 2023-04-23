# Needle Engine on Netlify

## Setup on Netlify
1) Go to "Site settings/Build & deploy" and click on "Continous deployment"
2) In "Build Settings" enter:
  - Build command: `npm run build:dev`
  - Publish directory: `dist`


## Troubleshooting
### Deployment fails
- Make sure the package.lock.json is ignored in your project (add it to your `.gitignore` file)
- Make sure gzip is disabled in `vite.config.js`. Remove this line `useGzip(needleConfig) ? viteCompression({ deleteOriginFile: true }) : null`