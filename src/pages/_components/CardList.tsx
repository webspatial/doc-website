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
  const observerRef = React.useRef<IntersectionObserver>(null);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.setProperty('--pc-url', target.dataset.pcUrl || '');
          target.style.setProperty('--h5-url', target.dataset.h5Url || '');
          target.style.setProperty('--pad-url', target.dataset.padUrl || '');
          observerRef.current.unobserve(target);
        }
      });
    }, {rootMargin: '200px 0px'});

    return () => observerRef.current?.disconnect();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {urls.map((url, index) => {
        const pcUrl = useBaseUrl(url);
        const h5Url = useBaseUrl(h5urls[index]);
        const padUrl = useBaseUrl(padurls[index]);

        return (
          <div
            ref={(el) => el && observerRef.current?.observe(el)}
            className={clsx(styles.imgItem, {
              [styles.active]: currentImgIndex === index,
            })}
            key={index}
            data-pc-url={`url(${pcUrl})`}
            data-h5-url={`url(${h5Url})`}
            data-pad-url={`url(${padUrl})`}
            style={{
              // 初始时不设置背景图
              //@ts-ignore
              '--pc-url': 'none',
              '--h5-url': 'none', 
              '--pad-url': 'none',
            }}></div>
        );
      })}
    </>
  );
};
