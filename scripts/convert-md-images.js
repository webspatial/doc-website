const fs = require('fs');
const path = require('path');

// 获取命令行参数中的文件路径
const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ 请提供一个 .md 文件路径作为参数');
  process.exit(1);
}

// 读取文件内容
let content = fs.readFileSync(filePath, 'utf-8');

// 匹配嵌套图片链接的正则表达式
const regex = /\[!\[.*?\]\((.*?)\)\]\((.*?)\)/g;

content = content.replace(regex, (match, imgSrc1, imgSrc2) => {
  // 如果两个链接不一致，警告但继续用第一个
  if (imgSrc1 !== imgSrc2) {
    console.warn(`⚠️ 图片链接不一致：${imgSrc1} vs ${imgSrc2}`);
  }

  // 提取图片名用于 alt 属性
  const fileName = path.basename(imgSrc1);
  const altText = 'Scene Example ' + (fileName.match(/\d+/)?.[0] || 'X');

  return `<Image img={require("${imgSrc1}")} alt="${altText}" />`;
});

// 写回原文件（或你也可以写入新文件）
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 文件处理完成: ${filePath}`);
