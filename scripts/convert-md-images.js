const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ 请提供一个 .md 文件路径作为参数');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf-8');

// 处理嵌套链接图片：[![image](...)](...)
const nestedImgRegex = /\[!\[([^\]]*?)\]\(([^)]+?)\)\]\(([^)]+?)\)/g;
content = content.replace(nestedImgRegex, (match, imgAlt, imgSrc, linkHref) => {
  // 解析图片src，可能包含title
  const imgSrcMatch = imgSrc.match(/^([^"\s]+)(?:\s+"([^"]*)")?/);
  const src = imgSrcMatch ? imgSrcMatch[1] : imgSrc;
  const imgTitle = imgSrcMatch ? imgSrcMatch[2] || '' : '';

  // 解析链接href，可能包含title
  const linkHrefMatch = linkHref.match(/^([^"\s]+)(?:\s+"([^"]*)")?/);
  const href = linkHrefMatch ? linkHrefMatch[1] : linkHref;
  const linkTitle = linkHrefMatch ? linkHrefMatch[2] || '' : '';

  // 使用原始alt或生成默认alt
  const fileName = path.basename(src);
  const alt = imgAlt || `Scene Example ${fileName.match(/\d+/)?.[0] || 'X'}`;

  console.log('嵌套链接图片');

  // 如果链接地址与图片地址不同，保留链接结构
  if (href && href !== src) {
    const titleAttr = linkTitle ? ` title="${linkTitle}"` : '';
    return `<a href="${href}"${titleAttr}><Image img={require("${src}")} alt="${alt}" /></a>`;
  }

  // 如果链接地址与图片地址相同或没有链接，只输出Image组件
  return `<Image img={require("${src}")} alt="${alt}" />`;
});

// 处理普通图片：![](...)
const normalImgRegex = /!\[([^\]]*?)\]\(([^)]+?)\)/g;
content = content.replace(normalImgRegex, (match, imgAlt, imgSrc) => {
  // 解析图片src，可能包含title
  const imgSrcMatch = imgSrc.match(/^([^"\s]+)(?:\s+"([^"]*)")?/);
  const src = imgSrcMatch ? imgSrcMatch[1] : imgSrc;

  // 使用原始alt或生成默认alt
  const fileName = path.basename(src);
  const alt = imgAlt || `Scene Example ${fileName.match(/\d+/)?.[0] || 'X'}`;

  console.log('普通图片');
  return `<Image img={require("${src}")} alt="${alt}" />`;
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已处理文件: ${filePath}`);
