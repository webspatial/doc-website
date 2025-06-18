import React from 'react';
import IdealImage from '@theme/IdealImage';
// import useBaseUrl from '@docusaurus/useBaseUrl';

const useCloudflare = false; // todo: 暂未启用
export default function Image({img, alt, title, ...props}) {
  // // 将相对路径转换为最终 URL，以便 IdealImage 能正确加载

  // if (useCloudflare) {
  //   // 使用Cloudflare图片URL
  //   const baseUrl = process.env.CLOUDFLARE_IMAGE_BASE_URL; // 示例：https://imagedelivery.net/账户ID/
  //   return (
  //     <>
  //       {/* 替换 IdealImage 为普通 img 标签，使用 Cloudflare 的格式优化参数 */}
  //       <img
  //         src={`${baseUrl}${src}?format=auto&quality=75`}
  //         alt={alt}
  //         title={title}
  //         {...props}
  //       />
  //     </>
  //   );
  // }

  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        if (typeof img === 'string') {
          window.open(img);
          return;
        }
        const lengths = img?.src?.images?.length;
        const fullImageURL = img?.src?.images?.[lengths - 1]?.path;
        fullImageURL && window.open(fullImageURL);
      }}>
      <IdealImage img={img} alt={alt} title={title} {...props} />
    </div>
  );
}
