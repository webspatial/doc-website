import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.scss';
import Banner from './Banner';
import Section from './Section';
import data from './data';
import Bottom from './Bottom';
import Slider from './Slider';
import CardList from './CardList';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <Banner />
      <main className={styles.mainWrap}>
        <Section title={data.section1.title} desc={data.section1.desc}>
          {/* image slider */}
          <Slider
            data={data.section1.children.map((x) => ({...x, url: x.imgUrl}))}
          />
        </Section>

        <Section title={data.section2.title} desc={data.section2.desc}>
          {/* image list */}
          <CardList data={data.section2.children}/>
        </Section>

        <Section title={data.section3.title} desc={data.section3.desc}>
          {/* image slider */}
        </Section>

        <Section title={data.section4.title} desc={data.section4.desc}>
          {/* card list */}
        </Section>
        <Bottom />
      </main>
    </Layout>
  );
}
