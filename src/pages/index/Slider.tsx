import React from 'react';
import styles from './Slider.module.scss';
import clsx from 'clsx';
type Props = {
  data: {
    title: string;
    url: string;
    desc?: string;
    disable?: boolean;
  }[];
};
const Slider: React.FC<Props> = ({data}) => {
  const [idx, setIdx] = React.useState(0);
  return (
    <div className={styles.slider}>
      <div
        className={styles.img}
        style={{backgroundImage: `url(${data[idx].url})`}}
      />
      <div className={styles.btnContainer}>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className={clsx(
                styles.btn,
                idx === i ? styles.active : '',
                item.disable ? styles.disabled : '',
              )}
              onClick={() => {
                if (item.disable) return;
                setIdx(i);
              }}>
              {item.title}
              {item.desc && <div className={clsx(styles.desc)}>{item.desc}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;
