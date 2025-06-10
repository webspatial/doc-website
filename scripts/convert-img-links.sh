#!/bin/bash

# 输入文件
input_file="$1"

# 检查参数
if [ ! -f "$input_file" ]; then
	echo "❌ 文件不存在：$input_file"
	exit 1
fi

# 判断平台：macOS 需要 `-i ''`，Linux 只需要 `-i`
if [[ "$OSTYPE" == "darwin"* ]]; then
	SED_INPLACE=(-i '')
else
	SED_INPLACE=(-i)
fi

# 用 sed 替换 <a><img></a> 为 <Image img={require("src")} alt="alt" />
sed "${SED_INPLACE[@]}" -E \
  's#<a[^>]*><img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"[^>]*/?></a>#<Image img={require("\1")} alt="\2" />#g' "$input_file"

echo "✅ 已就地替换完成：$input_file"
