import React from 'react';
import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';
import IdealImage from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Image({src, alt, title, ...props}) {
  // 将相对路径转换为最终 URL，以便 IdealImage 能正确加载
  const imgUrl = useBaseUrl(src);

  return (
    <Zoom>
      <IdealImage img={imgUrl} alt={alt} title={title} {...props} />
    </Zoom>
  );
}
