// scripts/convert-img-requires.js

/**
 * 
 * convert <Image img={require('src')}/> to <Image src="src"/>
 */

const fs = require('fs');
const path = require('path');

// 从命令行读取要处理的文件路径
const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ 请提供一个文件路径，例如：');
  console.error(
    '   node scripts/convert-img-requires.js src/components/MyPage.jsx',
  );
  process.exit(1);
}

// 读取文件
let content = fs.readFileSync(filePath, 'utf-8');

// 正则匹配并替换
const imgRequireRegex =
  /<Image\s+img=\{require\("(.+?)"\)\}\s+alt="(.+?)"\s*\/>/g;
const replaced = content.replace(imgRequireRegex, (match, imgPath, altText) => {
  return `<Image src="${imgPath}" alt="${altText}" />`;
});

// 如果没有变化，则提示
if (replaced === content) {
  // console.log(
  //   `⚠️ 未检测到任何 <Image img={require(...)} /> 模式，文件未修改：${filePath}`,
  // );
} else {
  fs.writeFileSync(filePath, replaced, 'utf-8');
  console.log(`✅ 已更新文件：${filePath}`);
}
