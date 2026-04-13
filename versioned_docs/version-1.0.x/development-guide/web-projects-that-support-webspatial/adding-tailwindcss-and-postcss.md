---
sidebar_position: 2
---

# (Optional) Add TailwindCSS and PostCSS

TailwindCSS is a utility-first CSS framework that provides a large set of atomic classes to speed up UI development.
PostCSS is a tool for transforming CSS, allowing you to use upcoming CSS features today.

## Install dependencies {#install}

```bash npm2yarn
npm install -D tailwindcss postcss autoprefixer
```

## Generate configuration files {#config}

Run the following command to generate the TailwindCSS and PostCSS configuration files.

```bash npm2yarn
npx tailwindcss init -p
```

It will create `tailwind.config.js` and `postcss.config.js`.

Edit `tailwind.config.js` and specify the template paths that TailwindCSS should scan.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Integrate with your web build tool {#build}

Finally, add the necessary configuration to your web build tool.
For example, if you are using Vite, add the TailwindCSS plugin in `vite.config.js`.

```js
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
```
