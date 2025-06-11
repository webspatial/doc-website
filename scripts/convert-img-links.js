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
    /<a[^>]*><img[^>]*src="([^"]+)"[^>]*(?:alt="([^"]*)")?[^>]*\/?><\/a>/g,
    (match, src, alt = '') => {
      // return `<Image img={require("${src}")} alt="${alt}" decoding="async" loading="lazy" className="img" />`;
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
