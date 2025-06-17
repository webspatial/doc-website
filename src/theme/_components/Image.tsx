import React from 'react';
import IdealImage from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

const useCloudflare = false; // todo: 暂未启用
export default function Image({src, alt, title, ...props}) {
  // // 将相对路径转换为最终 URL，以便 IdealImage 能正确加载

  if (useCloudflare) {
    // 使用Cloudflare图片URL
    const baseUrl = process.env.CLOUDFLARE_IMAGE_BASE_URL; // 示例：https://imagedelivery.net/账户ID/
    return (
      <>
        {/* 替换 IdealImage 为普通 img 标签，使用 Cloudflare 的格式优化参数 */}
        <img
          src={`${baseUrl}${src}?format=auto&quality=75`}
          alt={alt}
          title={title}
          {...props}
        />
      </>
    );
  }

  // 其他环境使用本地路径
  const imgUrl = useBaseUrl(src);

  return <IdealImage img={imgUrl} alt={alt} title={title} {...props} />;
}
