import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Bottom.module.scss';
import data from '../../data/index/data';
import Button from './Button';
type Props = {};
const Bottom: React.FC<Props> = () => {
  const bottomImgUrl = useBaseUrl(data.bottom.imgUrl);
  return (
    <div className={styles.bottomWrap}>
      <div
        className={styles.topImg}
        style={{
          backgroundImage: `url(${bottomImgUrl})`,
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
