const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ 请提供一个 .md 文件路径作为参数');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf-8');

// 处理嵌套链接图片：[![image](...)](...)
const nestedImgRegex = /\[!\[.*?\]\((.*?)\)\]\((.*?)\)/g;
content = content.replace(nestedImgRegex, (match, imgSrc1, imgSrc2) => {
  const src = imgSrc1;
  const fileName = path.basename(src);
  const alt = `Scene Example ${fileName.match(/\d+/)?.[0] || 'X'}`;
  console.log('嵌套链接图片');
  // return `<Image img={require("${src}")} alt="${alt}" decoding="async" loading="lazy" className="img" />`;
  return `<Image img={require("${src}")} alt="${alt}" />`;
});

// 处理普通图片：![](...)
const normalImgRegex = /!\[.*?\]\((.*?)\)/g;
content = content.replace(normalImgRegex, (match, imgSrc) => {
  const fileName = path.basename(imgSrc);
  const alt = `Scene Example ${fileName.match(/\d+/)?.[0] || 'X'}`;
  console.log('普通图片');
  // return `<Image img={require("${imgSrc}")} alt="${alt}" decoding="async" loading="lazy" className="img" />`;
  return `<Image img={require("${imgSrc}")} alt="${alt}" />`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已处理文件: ${filePath}`);
