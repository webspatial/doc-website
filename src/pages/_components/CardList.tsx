import React from 'react';
import styles from './CardList.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
type Props = {
  data: {
    title: string;
    desc: string;
    imgUrl: string[];
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
              <FadeImages urls={x.imgUrl} />
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

const FadeImages = ({urls}: {urls: string[]}) => {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {urls.map((url, index) => {
        const finalUrl = useBaseUrl(url);
        const isHotfix = url.endsWith('b2.png');
        // const isC = url.endsWith('c1.png') || url.endsWith('c2.png');
        const isD = url.endsWith('d1.png') || url.endsWith('d2.png');
        return (
          <div
            className={clsx(
              styles.imgItem,
              currentImgIndex === index ? styles.active : '',
              isHotfix ? styles.hotfix : '',
              isD ? styles.isD : '',
            )}
            key={index}
            style={{
              backgroundImage: `url(${finalUrl})`,
            }}></div>
        );
      })}
    </>
  );
};
