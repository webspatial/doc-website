import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Bottom.module.scss';
import data from '../../data/index/data';
import Button from './Button';
import {useNearViewport} from './useNearViewport';

type Props = {};
const Bottom: React.FC<Props> = () => {
  const {ref, isNearViewport} = useNearViewport<HTMLDivElement>({
    rootMargin: '320px 0px',
  });
  const bottomImgUrl = useBaseUrl(data.bottom.imgUrl);
  return (
    <div className={styles.bottomWrap} ref={ref}>
      <div
        className={clsx(styles.topImg, !isNearViewport && styles.topImgPending)}
        style={{
          backgroundImage: isNearViewport ? `url(${bottomImgUrl})` : undefined,
        }}>
        <div className={styles.container}>
          <div className={styles.title}>{data.bottom.title}</div>
          <div className={styles.btnGrp}>
            {data.bottom.children.map((x, i) => {
              return (
                <Button key={i} url={x.url}>
                  {x.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bottom;
