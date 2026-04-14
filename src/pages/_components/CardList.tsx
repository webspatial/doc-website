import React from 'react';
import styles from './CardList.module.scss';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {withBaseUrl} from './homepageMedia';
import {useNearViewport} from './useNearViewport';

type Props = {
  data: {
    title: string;
    desc: string;
    imgUrl: string[];
    imgUrlh5: string[];
    imgUrlPad: string[];
    url?: string;
  }[];
};
const CardList: React.FC<Props> = ({data}) => {
  const cardBgUrl = useBaseUrl('/img/index-s2/cbg.jpg');
  const {ref, isNearViewport} = useNearViewport<HTMLDivElement>({
    rootMargin: '420px 0px',
  });

  return (
    <div className={styles.container} ref={ref}>
      {data.map((x, i) => {
        if (x.url) {
          return (
            <Link
              key={i}
              to={x.url}
              className={clsx(styles.wrap, styles.linkWrap)}
              aria-label={x.title}
              style={
                {
                  '--card-bg-url': `url(${cardBgUrl})`,
                } as React.CSSProperties
              }>
              <div
                className={styles.img} // placeholder
                // style={{
                //   backgroundImage: `url(${x.imgUrl[currentImgIndex]})`,
                // }}
              >
                <FadeImages
                  urls={x.imgUrl}
                  h5urls={x.imgUrlh5}
                  padurls={x.imgUrlPad}
                  isActive={isNearViewport}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.title}>{x.title}</div>
                <div className={styles.desc}>{x.desc}</div>
              </div>
            </Link>
          );
        }

        return (
          <div
            className={styles.wrap}
            key={i}
            style={
              {
                '--card-bg-url': `url(${cardBgUrl})`,
              } as React.CSSProperties
            }>
            <div
              className={styles.img} // placeholder
              // style={{
              //   backgroundImage: `url(${x.imgUrl[currentImgIndex]})`,
              // }}
            >
              <FadeImages
                urls={x.imgUrl}
                h5urls={x.imgUrlh5}
                padurls={x.imgUrlPad}
                isActive={isNearViewport}
              />
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

const FadeImages = ({
  urls,
  h5urls,
  padurls,
  isActive,
}: {
  urls: string[];
  h5urls: string[];
  padurls: string[];
  isActive: boolean;
}) => {
  const {siteConfig} = useDocusaurusContext();
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);

  const resolvedImages = React.useMemo(
    () =>
      urls.map((url, index) => ({
        pcUrl: withBaseUrl(siteConfig.baseUrl, url),
        h5Url: withBaseUrl(siteConfig.baseUrl, h5urls[index] ?? url),
        padUrl: withBaseUrl(siteConfig.baseUrl, padurls[index] ?? url),
      })),
    [h5urls, padurls, siteConfig.baseUrl, urls],
  );

  React.useEffect(() => {
    if (!isActive || resolvedImages.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isActive, resolvedImages.length]);

  if (!isActive) {
    return <div className={styles.imgPlaceholder} aria-hidden="true" />;
  }

  return (
    <>
      {resolvedImages.map(({pcUrl, h5Url, padUrl}, index) => {
        return (
          <div
            className={clsx(styles.imgItem, {
              [styles.active]: currentImgIndex === index,
            })}
            key={index}
            style={{
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
