import React from 'react';
import styles from './CardList.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
type Props = {
  data: {
    title: string;
    desc: string;
    imgUrl: string[];
    imgUrlh5: string[];
    imgUrlPad: string[];
  }[];
};
const CardList: React.FC<Props> = ({data}) => {
  return (
    <div className={styles.container}>
      {data.map((x, i) => {
        return (
          <div className={styles.wrap} key={i}>
            <div
              className={styles.img} // placeholder
              // style={{
              //   backgroundImage: `url(${x.imgUrl[currentImgIndex]})`,
              // }}
            >
              <FadeImages urls={x.imgUrl} h5urls={x.imgUrlh5} padurls={x.imgUrlPad} />
            </div>

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

const FadeImages = ({urls, h5urls, padurls}: {urls: string[]; h5urls: string[]; padurls: string[]}) => {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  React.useEffect(() => {
    // const timer = setInterval(() => {
    //   setCurrentImgIndex((prev) => (prev + 1) % 2);
    // }, 3000);
    // return () => clearInterval(timer);
  }, []);

  return (
    <>
      {urls.map((url, index) => {
        const pcUrl = useBaseUrl(url);
        const h5Url = useBaseUrl(h5urls[index]);
        const padUrl = useBaseUrl(padurls[index]);

        // const isHotfix = url.endsWith('b2.png');
        // const isC = url.endsWith('c1.png') || url.endsWith('c2.png');
        // const isD = url.endsWith('d1.png') || url.endsWith('d2.png');
        return (
          <div
            className={clsx(styles.imgItem, {
              [styles.active]: currentImgIndex === index,
              // [styles.hotfix]: isHotfix,
              // [styles.isD]: isD,
            })}
            key={index}
            style={{
              // backgroundImage: `url(${finalUrl})`,
              //@ts-ignore
              '--pc-url': `url(${pcUrl})`,
              //@ts-ignore
              '--h5-url': `url(${h5Url})`,
              //@ts-ignore
              '--pad-url': `url(${padUrl})`,
            }}></div>
        );
      })}
    </>
  );
};
