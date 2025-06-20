---
sidebar_position: 1
---

# Creating a New Web Project

:::tip
You can also start from [existing Web projects](/docs/development-guide/web-projects-that-support-webspatial/)
:::

## Modern Web Project Essentials {#requirements}

To build a brand-new WebSpatial project from scratch, first create a modern Web project (currently React-only) that meets the following requirements:

- Use HTML APIs (for example, JSX) through a UI framework such as React
- Use CSS APIs through the same UI framework (supports [PostCSS, TailwindCSS](/docs/development-guide/web-projects-that-support-webspatial/adding-tailwindcss-and-postcss), CSS-in-JS, and other approaches)
- Manage project dependencies with npm or any npm-compatible package manager (like [pnpm](/docs/development-guide/web-projects-that-support-webspatial/adding-pnpm))
- Compile and build HTML and static web assets (JS, CSS, images, etc.) that run directly in desktop / mobile browsers
- Run a Web server that exposes URLs accessible from desktop / mobile browsers

## Project Templates for Getting Started {#templates}

Below are several options for creating a modern Web project that satisfies the requirements above. Any of these can serve as the starting point before you add the [WebSpatial SDK](/docs/core-concepts/unique-concepts-in-webspatial.md#webspatial-sdk).

:::note
Ensure Node.js is installed first. See the [official Node.js site](https://nodejs.org/en/download) for installation instructions.
:::

1. React + Vite

   ```bash npm2yarn
   npx create-vite --template react
   ```

2. React + Vite + TypeScript

   ```bash npm2yarn
   npx create-vite --template react-ts
   ```

3. React + Next.js

   ```bash npm2yarn
   npx create-next-app --js
   ```

4. React + Next.js + TypeScript

   ```bash npm2yarn
   npx create-next-app --ts
   ```

5. React + Rsbuild

   ```bash npm2yarn
   npx create-rsbuild --template react
   ```

6. React + Rsbuild + TypeScript

   ```bash npm2yarn
   npx create-rsbuild --template react-ts
   ```

7. React + Rspack

   ```bash npm2yarn
   npx create-rspack --template react
   ```

8. React + Rspack + TypeScript

   ```bash npm2yarn
   npx create-rspack --template react-ts
   ```

## Adding Other Common Features (Optional) {#other-features}

- [Add TailwindCSS + PostCSS](/docs/development-guide/web-projects-that-support-webspatial/adding-tailwindcss-and-postcss)
- [Add pnpm](/docs/development-guide/web-projects-that-support-webspatial/adding-pnpm)
