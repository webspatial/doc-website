import React from 'react';
import styles from './CardListMore.module.scss';
import Link from '@docusaurus/Link';
type Props = {
  data: {
    title: string;
    desc: string;
    moreUrl: string;
    background: string;
  }[];
};
const CardListMore: React.FC<Props> = ({data}) => {
  return (
    <>
      {data.map((x, i) => {
        return (
          <div className={styles.wrap} style={{background: x.background}}>
            <div className={styles.content}>
              <div className={styles.title}>{x.title}</div>
              <div className={styles.desc}>{x.desc}</div>
              <Link to={x.moreUrl} className={styles.more}>
                More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none">
                  <path
                    d="M2.5 8.75977L5.35857 5.90136C5.43668 5.82326 5.43669 5.69662 5.35858 5.61852L2.5 2.75977"
                    stroke="white"
                    stroke-opacity="0.7"
                    stroke-linecap="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default CardListMore;
