#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import {globby} from 'globby';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
  const files = await globby('static/img/**/*.{jpg,jpeg,png,gif}');
  if (files.length === 0) {
    console.log('No images found in static/img');
    return;
  }

  await Promise.all(
    files.map(async (file) => {
      const destDir = path.dirname(file);
      await fs.ensureDir(destDir);
      const compressed = await imagemin([file], {
        //@ts-ignore
        destination: destDir,
        plugins: [
          imageminMozjpeg({quality: 65, progressive: true}),
          imageminPngquant({quality: [0.65, 0.9], speed: 4}),
        ],
      });
      console.log(`Compressed ${file} → ${compressed[0].destinationPath}`);
    }),
  );

  console.log('All images compressed with directory structure preserved.');
})();
