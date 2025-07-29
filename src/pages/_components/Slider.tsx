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

  const [shouldAutoplay, setShouldAutoplay] = React.useState(false);

  const windowSize = useWindowSize();

  const isMobile = windowSize === 'mobile';

  const [usePoster, setUsePoster] = React.useState(true);

  const [poster, setPoster] = React.useState<string | undefined>(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 动态抓取
    const onMeta = () => {
      video.currentTime = 0.1;
    };
    const onSeeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')!.drawImage(video, 0, 0);
      setPoster(canvas.toDataURL('image/jpeg'));
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      video.currentTime = 0;
    };
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    video.load();
  }, []);

  React.useEffect(() => {
    if (windowSize === 'ssr') return;

    const listener = () => {
      videoRef.current?.play();
      setShouldAutoplay(true);
      setUsePoster(false);
    };
    if (isMobile) {
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('touchstart', listener);
      };
    }

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
  }, [idx, windowSize]);

  return (
    <div className={styles.slider}>
      <div className={styles.img}>
        <video
          poster={usePoster ? poster : null}
          ref={videoRef}
          playsInline
          className={styles.video}
          src={data[idx].imgUrl}
          muted
          loop
          preload="metadata"
          autoPlay={shouldAutoplay}
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
