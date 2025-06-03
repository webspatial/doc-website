import React from 'react';
import data from './data';
import styles from './Banner.module.scss';
import Button from './Button';
type Props = {};
const Banner: React.FC<Props> = () => {
  return (
    <div className={styles.bannerWrap}>
      <div className={styles.innerWrap}>
        <div className={styles.title}>{data.banner.title}</div>
        <div className={styles.desc}>{data.banner.desc}</div>
        <Button url={data.banner.button.url}>{data.banner.button.text}</Button>
      </div>
    </div>
  );
};
export default Banner;
