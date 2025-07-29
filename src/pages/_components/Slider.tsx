import React from 'react';
import styles from './Slider.module.scss';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
type Props = {
  data: {
    title: string;
    imgUrl: string;
    desc?: string;
    disable?: boolean;
  }[];
};
const Slider: React.FC<Props> = ({data}) => {
  const [idx, setIdx] = React.useState(2);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // const windowSize = useWindowSize();

  // React.useEffect(() => {
  //   if (windowSize == 'mobile' && !isMobile) {
  //     setIsMobile(true);
  //   }
  // }, [windowSize]);

  React.useEffect(() => {
    console.log("🚀 ~ Slider ~ isMobile:", isMobile)
    if (isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
            videoRef.current && (videoRef.current.currentTime = 0); // 重置播放进度
          }
        });
      },
      {
        threshold: 0.5, // 当50%进入视口时触发
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [idx, isMobile]);

  return (
    <div className={styles.slider}>
      <div className={styles.img}>
        <video
          ref={videoRef}
          className={styles.video}
          src={data[idx].imgUrl}
          muted
          loop
          preload="none"
          // autoPlay={isMobile}
        />
      </div>
      {/* <div
        className={styles.img}
        style={{backgroundImage: `url(${data[idx].imgUrl})`}}
      /> */}
      <div className={styles.btnContainer}>
        <div className={clsx(styles.bgline)}></div>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className={clsx(styles.btn, {
                [styles.active]: idx === i,
                [styles.disabled]: item.disable,
              })}
              onClick={(e) => {
                if (item.disable) return;
                setIdx(i);
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              }}>
              {item.title}
              {item.desc && (
                <div className={clsx(styles.desc)}>{item.desc}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;
