import React from 'react';
import styles from './SliderB.module.scss';
import clsx from 'clsx';
type Props = {
  data: {
    title: string;
    imgUrl: string;
    desc?: string;
    disable?: boolean;
  }[];
};
const SliderB: React.FC<Props> = ({data}) => {
  const [idx, setIdx] = React.useState(0);

  const hasPre = idx > 0;
  const hasNext = idx < data.length - 1;

  function go(i: number) {
    if (i < 0 || i >= data.length) return;
    setIdx(i);
  }

  return (
    <div className={styles.slider}>
      <div className={styles.topWrap}>
        <div
          className={styles.imgContainer}
          style={{
            //@ts-ignore
            '--pc-transform': `translateX(calc(-${idx * 100}% - ${
              idx * 20
            }px))`,
            '--h5-transform': `translateX(calc(-${idx * 100}%))`,
          }}>
          {data.map((item, i) => (
            <div
              key={i}
              className={styles.img}
              style={{backgroundImage: `url(${item.imgUrl})`}}
            />
          ))}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <div className={styles.left}>
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className={clsx(
                  styles.btn,
                  idx === i ? styles.active : '',
                  item.disable ? styles.disabled : '',
                )}
                onClick={(e) => {
                  if (item.disable) return;
                  go(i);
                }}></div>
            );
          })}
        </div>
        <div className={styles.right}>
          <div
            className={clsx(styles.pre, !hasPre ? styles.disabled : '')}
            onClick={() => {
              if (!hasPre) return;
              go(idx - 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none">
              <g opacity={hasPre ? '0.8' : '0.32'}>
                <circle
                  cx="16"
                  cy="16.1299"
                  r="15.25"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M18 11.9297L13 16.3547L18 21.0964"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
          <div
            className={clsx(styles.next, !hasNext ? styles.disabled : '')}
            onClick={() => {
              if (!hasNext) return;
              go(idx + 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none">
              <g opacity={hasNext ? '0.8' : '0.32'}>
                <circle
                  cx="16"
                  cy="16.1299"
                  r="15.25"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M14 11.9297L19 16.3547L14 21.0964"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SliderB;
