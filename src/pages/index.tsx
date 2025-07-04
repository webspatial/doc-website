import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.scss';
import Banner from './_components/Banner';
import Section from './_components/Section';
import data from '../data/index/data';
import Bottom from './_components/Bottom';
import Slider from './_components/Slider';
import CardList from './_components/CardList';
import SliderB from './_components/SliderB';
import CardListMore from './_components/CardListMore';
import {useColorMode} from '@docusaurus/theme-common';
import tdk from '../data/tdk';

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
      title={tdk.index.title}
      description={tdk.index.description}>
      {/* <HomepageHeader /> */}
      <Banner />
      <main className={styles.mainWrap}>
        <Section title={data.section1.title} desc={data.section1.desc}>
          <Slider data={data.section1.children} />
        </Section>

        <Section title={data.section2.title} desc={data.section2.desc}>
          <CardList data={data.section2.children} />
        </Section>

        <Section title={data.section3.title} desc={data.section3.desc}>
          <SliderB data={data.section3.children} />
        </Section>

        <Section title={data.section4.title} desc={data.section4.desc}>
          <CardListMore data={data.section4.children} />
        </Section>
        <Bottom />
      </main>
    </Layout>
  );
}
