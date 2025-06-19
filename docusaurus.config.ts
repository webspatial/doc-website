import {darkTheme} from './src/css/prism-theme/xdark';
import {lightTheme} from './src/css/prism-theme/xlight';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import tdk from './src/data/tdk';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const BASE_URL = process.env.BASE_URL || '/';
const PROJ_NAME = 'doc-website'; //process.env.PROJECT_NAME || 'my-default-project';

const isProd = BASE_URL == '/';

const config: Config = {
  // onBrokenLinks: 'throw', // 发现死链就 fail‐fast
  // onBrokenAnchors: 'throw', // 发现失效锚点也直接失败

  staticDirectories: ['static'],

  headTags: [
    // {
    //   tagName: 'link',
    //   attributes: {
    //     rel: 'preconnect',
    //     href: '//rsms.me/',
    //   },
    // },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: '//fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: '//fonts.gstatic.com',
        crossorigin: 'true',
      },
    },
    {
      tagName: 'script',
      attributes: {
        async: 'true',
        src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`,
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GA_ID}');
      `,
    },
  ],

  stylesheets: [
    // {
    //   href: '//rsms.me/inter/inter.css',
    //   type: 'text/css',
    // },

    {
      href: '//fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      type: 'text/css',
    },
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-generate-llms-txt',
      {
        outputFile: 'llms.txt', // defaults to llms.txt if not specified
      },
    ],
    '@docusaurus/theme-live-codeblock',
    [
      'ideal-image',
      {
        quality: 70,
        max: 1920,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: false,
      } satisfies IdealImageOptions,
    ],
    // [
    //   'docusaurus-plugin-typedoc',

    //   // Options
    //   {
    //     id: 'core-sdk',
    //     // ── begin explicit source-link settings ──

    //     // Ensure TypeDoc always generates links, even if Git auto-detection is off
    //     disableGit: true,

    //     // Template for linking to GitHub.
    //     // {path} is the file path under the SDK repo, {line} the line number.
    //     sourceLinkTemplate:
    //       'https://github.com/webspatial/webspatial-sdk/blob/main/core/src/core/{path}#L{line}',

    //     // (Optional) override the revision—use your default branch or commit SHA
    //     gitRevision: 'main',
    //     cleanOutputDir: false,

    //     // ── end explicit settings ──
    //     entryPoints: ['./XRSDK/packages/core/src/index.ts'],
    //     tsconfig: './XRSDK/packages/core/tsconfig.json',
    //     out: 'docs/api-core',
    //     sidebar: {
    //       autoConfiguration: true,
    //       pretty: true,
    //       typescript: true,
    //       deprecatedItemClassName: 'typedoc-sidebar-item-deprecated',
    //     },
    //   },
    // ],
    // [
    //   'docusaurus-plugin-typedoc',

    //   // Options
    //   {
    //     id: 'react-sdk',
    //     // ── begin explicit source-link settings ──

    //     // Ensure TypeDoc always generates links, even if Git auto-detection is off
    //     disableGit: true,

    //     // // Template for linking to GitHub.
    //     // // {path} is the file path under the SDK repo, {line} the line number.
    //     basePath: './XRSDK/packages/react/src',
    //     sourceLinkTemplate:
    //       'https://github.com/webspatial/webspatial-sdk/blob/main/react/src/{path}#L{line}',

    //     // // (Optional) override the revision—use your default branch or commit SHA
    //     gitRevision: 'main',
    //     cleanOutputDir: false,

    //     // ── end explicit settings ──
    //     entryPoints: ['./XRSDK/packages/react/src/index.ts'],
    //     tsconfig: './XRSDK/packages/react/tsconfig.json',
    //     out: 'docs/api-react',
    //     sidebar: {
    //       autoConfiguration: true,
    //       pretty: true,
    //       typescript: true,
    //       deprecatedItemClassName: 'typedoc-sidebar-item-deprecated',
    //     },
    //   },
    // ],
  ],
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://webspatial.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'webspatial', // Usually your GitHub org/user name.
  projectName: PROJ_NAME, // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: [
  //     'en',
  //     // 'zh-Hans'
  //   ],
  //   localeConfigs: {
  //     en: {htmlLang: 'en-US'},
  //     'zh-Hans': {htmlLang: 'zh-CN'},
  //   },
  // },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: false,
          remarkPlugins: [
            [
              require('@docusaurus/remark-plugin-npm2yarn'),
              {sync: true, converters: ['pnpm', 'yarn']},
            ],
          ],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          blogTitle: tdk.blog.title,
          blogDescription: tdk.blog.description,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: [
            // './src/css/codeblock.scss',
            './src/css/custom.scss',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      // todo: test only, to be replaced
      appId: 'LIUME5J8UD',
      apiKey: 'b7d539514fa1d4e67dbbaf010aeb004c', //'56e68bd6f98ae749cbb893fb483e5284',
      indexName: 'webspatial',
    },
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      // title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: 'Docs',
          group: 'left',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'apiSidebar',
        //   // to: '/docs/api',
        //   label: 'API',
        //   position: 'left',
        // },
        // {to: '/blog', label: 'Blog', position: 'right', group: 'left'},
        // {to: 'showcase', label: 'Showcase', position: 'right', group: 'left'},
        {
          to: '#',
          className: 'dropdownHr',
          position: 'right',
          group: 'left',
        },
        // {
        //   type: 'docsVersionDropdown',
        //   versions: ['current'],
        //   position: 'right',
        // },

        // {
        //   type: 'localeDropdown',
        //   className: 'xheader-locale',
        //   position: 'right',
        // },
        {
          href: 'https://github.com/webspatial/webspatial-sdk',
          // label: 'GitHub',
          h5Label: 'GitHub',
          className: 'xheader-github-link',
          h5ClassName: '',
          position: 'right',
        },
        {
          href: 'https://discord.gg/nhFhSuhNF2',
          // label: 'Discord',
          h5Label: 'Discord',
          className: 'xheader-discord-link',
          h5ClassName: '',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction/',
            },
            {
              label: 'Core Concepts',
              to: '/docs/core-concepts/',
            },
            {
              label: 'Quick Example',
              to: '/docs/quick-example/',
            },
            {
              label: 'Video',
              className: 'disabled',
              to: '/',
            },
          ],
        },
        {
          title: 'Develop',
          items: [
            {
              label: 'Compatibility',
              to: '/docs/development-guide/web-projects-that-support-webspatial/',
            },
            {
              label: 'Setup Guide',
              to: '/docs/development-guide/enabling-webspatial-in-web-projects/',
            },
            {
              label: 'WebSpatial API',
              to: '/docs/development-guide/using-the-webspatial-api/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: '//github.com/webspatial/webspatial-sdk/issues',
            },
            {
              label: 'Join Discord',
              href: '//discord.gg/nhFhSuhNF2',
            },
            {
              label: 'FAQ',
              className: 'disabled',
              to: '/',
            },
          ],
        },
        {
          title: 'News',
          items: [
            {
              label: 'Blog',
              className: 'disabled',
              to: '/blog',
            },
            {
              label: 'Releases',
              href: 'https://github.com/webspatial/webspatial-sdk/releases',
            },
            {
              label: 'X',
              className: 'disabled',
              to: '/',
            },
            {
              label: 'Events',
              className: 'disabled',
              to: '/',
            },
          ],
        },
      ],
      copyright: `Released under the MIT License. \nCopyright © ${new Date().getFullYear()} WebSpatial`,
    },
    prism: {
      theme: darkTheme, // lightTheme, //emptyTheme,
      darkTheme: darkTheme, //emptyTheme,
      // theme: prismThemes.github,
      // darkTheme: prismThemes.gruvboxMaterialDark,
      additionalLanguages: ['diff', 'json5', 'ini'],
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: {start: 'highlight-start', end: 'highlight-end'},
        },
        {
          className: 'code-block-diff-add-line',
          line: 'diff-add',
        },
        {
          className: 'code-block-diff-remove-line',
          line: 'diff-remove',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
