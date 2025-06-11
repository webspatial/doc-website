import {getFakeImg} from '@site/src/utils/imgUtils';

export default {
  banner: {
    title: 'Bring Your Web to Space.',
    desc: 'Spatialize any website across real and virtual spaces with widely adopted open-web tech, empowering every web developer and enriching XR ecosystems.',
    imgUrl: getFakeImg(1280, 1280),
    button: {
      text: 'Quick Start',
      url: '#',
    },
  },
  section1: {
    title: 'One App, Every Device , From Screen to Spatial',
    desc: 'One codebase delivers 2D UI on desktop and mobile screens, then unlocks Spatialized UI on spatial-computing devices.',
    children: [
      {
        title: 'Large Screen',
        imgUrl: getFakeImg(800, 400),
      },
      {
        title: 'Small Screen',
        imgUrl: getFakeImg(700, 500),
      },
      {
        title: 'Vision OS',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Android XR',
        imgUrl: getFakeImg(600, 400),
        desc: '（Coming soon）',
        disable: true,
      },
      {
        title: 'Meta Horizon OS',
        imgUrl: getFakeImg(600, 400),
        desc: '（Coming soon）',
        disable: true,
      },
      {
        title: 'PICO OS',
        imgUrl: getFakeImg(600, 400),
        desc: '（Coming soon）',
        disable: true,
      },
    ],
  },
  section2: {
    title: 'Empower Spatial Creativity and Expand Your Web from 2D to 3D',
    desc: 'Add depth, transform, animation, and 3D layout to your app—step by step.',
    children: [
      {
        title: 'Split the Web Page, Free the UI',
        desc: 'Break the crowded, solid-backed web page into independent panels that hover in space, removing the frame so translucent UI lives naturally over the real world.',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Elevate HTML Elements, Unlock Depth',
        desc: 'Move any HTML element off the flat page—whether static or animated—and position or reshape it along the Z-axis, giving your interface true depth beyond width and height.',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Multiple Scene Containers, Native Power',
        desc: 'Compose your web app from multiple OS-managed flat or volumetric scenes so it behaves like a native spatial app and delivers a unified experience across web and native.',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Add True 3D Content, Blend Dimensions',
        desc: 'Introduce volumetric 3D elements that nest and layout seamlessly with 2D elements, then drive them with the 3D engine to host dynamic, interactive 3D content.',
        imgUrl: getFakeImg(600, 400),
      },
    ],
  },
  section3: {
    title: 'Keep Coding Web, Ship Spatial',
    desc: 'Keep coding with React, CSS, JS and the web-dev tools you already know. WebSpatial extends your existing web stack with a minimal set of new spatial APIs, drops straight into any project, and unlock native-grade spatial power with almost no code changes or extra cost.',
    children: [
      {
        title: 'Start with What You Know',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Start with What You Know todo:2',
        imgUrl: getFakeImg(600, 400),
      },
      {
        title: 'Start with What You Know todo:3',
        imgUrl: getFakeImg(600, 500),
      },
      {
        title: 'Start with What You Know todo:4',
        imgUrl: getFakeImg(600, 600),
      },
    ],
  },
  section4: {
    title: 'Explore the WebSpatial Toolkit',
    desc: 'Everything you need to ship spatial apps, plus the tools you already rely on.',
    children: [
      {
        title: 'WebSpatial API',
        desc: 'BAn open, minimal extension to HTML, CSS, and JS that adds spatial powers like elevation, multi-scenes, 3D containers',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(78, 59, 246, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #191919',
      },
      {
        title: 'React SDK',
        desc: 'A drop-in library for React projects that instantly unlocks WebSpatial APIs, and lets you build spatial apps with the same React components and ecosystem you already use.',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(117, 190, 255, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #171717',
      },
      {
        title: 'WebSpatial Builder',
        desc: 'A CLI tool that packages WebSpatial-enabled React projects into installable native spatial app, wrapping web code in a platform-specific App Shell that runs WebSpatial APIs.',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(252, 184, 75, 0.16) 0%, rgba(0, 0, 0, 0.00) 100%), #171717',
      },
      {
        title: 'Platform Simulator',
        desc: 'Preview and debug WebSpatial app on visionOS simulator without a headset.',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(117, 190, 255, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #171717',
      },
      {
        title: 'Safari / Chrome DevTools',
        desc: 'Inspect DOM, measure performance, and live-edit styles using the same tools you know.',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(240, 59, 94, 0.14) 0%, rgba(0, 0, 0, 0.00) 100%), #171717',
      },
      {
        title: '3D Authoring Tools',
        desc: 'Import 3D assets from Blender, Spline, or any authoring tool that supports USD or glTF.',
        moreUrl: 'todo:',
        background:
          'radial-gradient(103.73% 103.73% at 50% -3.73%, rgba(78, 59, 246, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), #191919',
      },
    ],
  },
  bottom: {
    title: 'Start building with WebSpatial',
    imgUrl: getFakeImg(600, 400),
    children: [
      {
        title: 'Quick Start',
        url: 'todo:',
      },
      {
        title: 'Concept',
        url: 'todo:',
      },
    ],
  },
};
