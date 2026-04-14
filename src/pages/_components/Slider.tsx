import React from 'react';
import styles from './Slider.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
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
  const currentVideoUrl = useBaseUrl(data[idx].imgUrl);
  return (
    <div className={styles.slider}>
      <div className={styles.img}>
        <video
          className={styles.video}
          src={currentVideoUrl}
          autoPlay
          muted
          loop
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
