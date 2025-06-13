---
sidebar_position: 3
---

# (Optional) Simplify Builder Usage with dotenv

To avoid typing the same environment variables each time you run these [npm scripts](../step-2-add-build-tool-for-packaged-webspatial-apps#npm-scripts), you can place all required variables in a dotenv configuration file and have them loaded automatically before the scripts run.

## dotenv Files

First, create `.env.example` in the project root and commit it to Git:

```ini
XR_DEV_SERVER=
XR_PRE_SERVER=
XR_PROD_SERVER=
XR_BUNDLE_ID=
XR_TEAM_ID=
XR_VERSION=
XR_DEV_NAME=
XR_DEV_PASSWORD=
```

All developers must then create their own `.env.local` file after cloning the repository:

```shell
cp .env.example .env.local
```

:::tip
`*.local` is usually listed in `.gitignore`, so `.env.local` will not be committed to Git.
:::

## Used in npm scripts

Install dependencies:

```bash npm2yarn
npm install -D dotenv dotenv-cli
```

:::info
For Vite projects you do not need to install the `dotenv` package above, because Vite already supports dotenv. You still need `dotenv-cli` so that the variables in dotenv files take effect inside npm scripts.
:::

`dotenv-cli` lets npm scripts access the variables defined in dotenv files.

Wrap each of the WebSpatial Builder scripts in npm scripts with `dotenv -e .env.local -- sh -c 'original script'`, for example:

```json5
"run:avp": "dotenv -e .env.local -- sh -c 'webspatial-builder run --base=$XR_DEV_SERVER'",
"build:avp": "dotenv -e .env.local -- sh -c 'webspatial-builder build --base=$XR_PRE_SERVER --bundle-id=$XR_BUNDLE_ID --teamId=$XR_TEAM_ID'",
"publish:avp": "dotenv -e .env.local -- sh -c 'webspatial-builder publish  --base=$XR_PROD_SERVER --bundle-id=$XR_BUNDLE_ID --teamId=$XR_TEAM_ID --version=$XR_VERSION --u=$XR_DEV_NAME --p=$XR_DEV_PASSWORD'",
```

## Used in Node.js Scripts

If you need to use environment variables from dotenv files in other Node.js-based scripts, add the following line at the top of the script:

```js
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.XR_ENV);
```

:::info

In Vite projects you can use Vite's built-in utilities to load variables from dotenv files in Node.js scripts.

For example, in `vite.config.js`:

```jsx
// diff-remove
import { defineConfig } from 'vite'
// diff-add
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
// diff-add
  const env = loadEnv(mode, process.cwd(), '')
// diff-add
  console.log(env.XR_ENV)
  return {
   plugins: [
     react(),
```

In other Node.js scripts:

```js
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");

console.log(env.XR_ENV);
```

:::

## Used in Client-side JS Code

See ["Check if Running in WebSpatial Mode"](../step-3-integrate-webspatial-sdk-into-web-build-tools/check-if-running-in-webspatial-mode).
