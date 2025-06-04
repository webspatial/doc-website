import React from 'react';
import styles from './CardList.module.scss';
type Props = {
  data: {
    title: string;
    desc: string;
    imgUrl: string;
  }[];
};
const CardList: React.FC<Props> = ({data}) => {
  return (
    <div>
      {data.map((x, i) => {
        return (
          <div className={styles.wrap}>
            <div
              className={styles.img}
              style={{backgroundImage: `url(${x.imgUrl})`}}></div>
            <div className={styles.content}>
              <div className={styles.title}>{x.title}</div>
              <div className={styles.desc}>{x.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CardList;
