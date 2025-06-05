import React from 'react';
import data from '../../data/index/data';
import styles from './Banner.module.scss';
import Button from './Button';
import {ColorMode, useColorMode} from '@docusaurus/theme-common';
type Props = {};
const Banner: React.FC<Props> = () => {
  const {colorMode, setColorMode} = useColorMode();
  const initColorMode = React.useRef<ColorMode>(colorMode);
  React.useEffect(() => {
    // force set dark mode in landing page and restore after leaving
    if (colorMode !== 'dark') {
      setColorMode('dark');
    }
    return () => {
      setTimeout(() => {
        setColorMode(initColorMode.current);
      }, 0);
    };
  }, []);
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
