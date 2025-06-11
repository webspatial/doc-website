const fs = require('fs');
const path = require('path');

// 获取输入文件参数
const inputFile = process.argv[2];

// 检查参数
if (!inputFile) {
  console.error('❌ 请提供输入文件路径');
  console.error('用法: node convert-img-links.js <文件路径>');
  process.exit(1);
}

// 检查文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`❌ 文件不存在：${inputFile}`);
  process.exit(1);
}

try {
  // 读取文件内容
  const content = fs.readFileSync(inputFile, 'utf8');

  // 正则替换：将 <a><img></a> 替换为 React 组件结构
  const updatedContent = content.replace(
    /<a([^>]*?)><img([^>]*)\/?><\/a>/g,
    (match, aAttributes, imgAttributes) => {
      // 提取 a 标签的 href 属性
      const hrefMatch = aAttributes.match(/href=["']([^"']+)["']/);
      const href = hrefMatch ? hrefMatch[1] : '';

      // 提取 src 属性
      const srcMatch = imgAttributes.match(/src=["']([^"']+)["']/);
      const src = srcMatch ? srcMatch[1] : '';

      // 提取 alt 属性
      const altMatch = imgAttributes.match(/alt=["']([^"']*)["']/);
      const alt = altMatch ? altMatch[1] : '';

      if (!src) {
        console.warn(`⚠️ 未找到src属性：${match}`);
        return match; // 保持原样
      }

      // 如果 href 存在且与 src 不同，保留链接结构和所有属性
      if (href && href !== src) {
        return `<a${aAttributes}><Image img={require("${src}")} alt="${alt}" /></a>`;
      }

      // 如果没有 href 或者 href 与 src 相同，只输出 Image 组件
      return `<Image img={require("${src}")} alt="${alt}" />`;
    },
  );

  // 写回文件
  fs.writeFileSync(inputFile, updatedContent, 'utf8');

  console.log(`✅ 已就地替换完成：${inputFile}`);
} catch (error) {
  console.error(`❌ 处理文件时出错：${error.message}`);
  process.exit(1);
}
