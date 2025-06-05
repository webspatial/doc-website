import React from 'react';
import styles from './Bottom.module.scss';
import data from '../../data/index/data';
import Button from './Button';
type Props = {};
const Bottom: React.FC<Props> = () => {
  return (
    <div className={styles.bottomWrap}>
      <div
        className={styles.topImg}
        style={{
          backgroundImage: `url(${data.bottom.imgUrl})`,
        }}
      />
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
  );
};
export default Bottom;
