import React from 'react';
import type {ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import {useColorMode, type ColorMode} from '@docusaurus/theme-common';

import styles from './index.module.scss';
import Banner from './_components/Banner';
import Section from './_components/Section';
import data from '../data/index/data';
import Bottom from './_components/Bottom';
import Slider from './_components/Slider';
import CardList from './_components/CardList';
import SliderB from './_components/SliderB';
import CardListMore from './_components/CardListMore';

function HomepageColorMode(): ReactNode {
  const {setColorMode} = useColorMode();

  React.useEffect(() => {
    const setTransientColorMode = setColorMode as unknown as (
      colorMode: ColorMode | null,
      options?: {persist?: boolean},
    ) => void;

    // `useColorMode()` intentionally lags during hydration. Read the current
    // DOM attribute so we restore the user's real choice when leaving home.
    const previousColorModeChoice = (() => {
      const themeChoice = document.documentElement.getAttribute(
        'data-theme-choice',
      );
      if (themeChoice === 'light' || themeChoice === 'dark') {
        return themeChoice;
      }
      return null;
    })();

    setTransientColorMode('dark', {persist: false});

    return () => {
      setTransientColorMode(previousColorModeChoice, {persist: false});
    };
  }, [setColorMode]);

  return null;
}

export default function Home(): ReactNode {
  const title = 'WebSpatial';
  const description = translate({
    id: 'homepage.meta.description',
    message:
      'WebSpatial is a set of spatial APIs and ready-to-use SDK that extend the standard 2D Web ecosystem to support spatial computing across platforms. It enables the entire HTML/CSS-based Web world to step into the spatial era, gaining spatial power on par with native apps (like visionOS apps) while keeping the advantages they already have.',
  });

  return (
    <Layout
      title={title}
      description={description}>
      <HomepageColorMode />
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
