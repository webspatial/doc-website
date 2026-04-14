import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import data from '../../data/index/data';
import styles from './Banner.module.scss';
import Button from './Button';
const Banner: React.FC = () => {
  const bannerBgUrl = useBaseUrl('/img/banner-img.jpeg');

  return (
    <div
      className={styles.bannerWrap}
      style={{backgroundImage: `url(${bannerBgUrl})`}}>
      <div className={styles.innerWrap}>
        <div className={styles.title}>{data.banner.title}</div>
        <div className={styles.desc}>{data.banner.desc}</div>
        <Button url={data.banner.button.url}>{data.banner.button.text}</Button>
      </div>
    </div>
  );
};

export default Banner;
