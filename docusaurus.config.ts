import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import xGithubTheme, {emptyTheme} from './src/css/xGithubTheme';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const BASE_URL = process.env.BASE_URL || '/';
const PROJ_NAME = process.env.PROJECT_NAME || 'my-default-project';

const config: Config = {
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
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
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
  favicon: 'img/favicon.ico',

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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {htmlLang: 'en-US'},
      'zh-Hans': {htmlLang: 'zh-CN'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/codeblock.scss', './src/css/custom.scss'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      // todo: test only, to be replaced
      appId: 'X1Z85QJPUV',
      apiKey: 'bf7211c161e8205da2f933a02534105a',
      indexName: 'docusaurus-2',
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
          position: 'left',
          label: 'Docs',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'apiSidebar',
        //   // to: '/docs/api',
        //   label: 'API',
        //   position: 'left',
        // },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: 'showcase', label: 'Showcase', position: 'left'},
        {
          to: '#',
          className: 'dropdownHr',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          versions: ['current'],
          position: 'right',
        },

        {
          type: 'localeDropdown',
          className: 'xheader-locale',
          position: 'right',
        },
        {
          href: 'https://github.com/webspatial/webspatial-sdk',
          // label: 'GitHub',
          className: 'xheader-github-link',
          position: 'right',
        },
        {
          href: 'https://discord.gg/sXtcgNFK',
          // label: 'Discord',
          className: 'xheader-discord-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
        {
          title: 'More2',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: emptyTheme,
      darkTheme: emptyTheme,
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
