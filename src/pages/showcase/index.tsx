/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode} from 'react';
import Translate, {translate} from '@docusaurus/Translate';

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// import ShowcaseSearchBar from '@site/src/pages/showcase/_components/ShowcaseSearchBar';
import ShowcaseCards from './_components/ShowcaseCards';
// import ShowcaseFilters from './_components/ShowcaseFilters';
import styles from './index.module.scss';
import clsx from 'clsx';
import tdk from '@site/src/data/tdk';

const TITLE = tdk.showcase.title; // translate({message: 'Docusaurus Site Showcase'});
const DESCRIPTION = tdk.showcase.description;
// translate({
//   message: 'List of websites people are building with Docusaurus',
// });
const SUBMIT_URL = 'https://github.com/facebook/docusaurus/discussions/7826'; // todo:

function ShowcaseHeader() {
  // margin-top--lg
  return (
    <section
      className={clsx(
        'markdown margin-bottom--lg text--center',
        styles.headerSection,
      )}>
      <Heading as="h1" className={styles.title}>
        {TITLE}
      </Heading>
      <p className={styles.desc}>{DESCRIPTION}</p>
      <Link
        className={clsx('button button--primary', styles.button)}
        to={SUBMIT_URL}>
        <Translate id="showcase.header.button"> Add your site</Translate>
      </Link>
    </section>
  );
}

export default function Showcase(): ReactNode {
  return (
    <Layout
      title={TITLE}
      description={DESCRIPTION}
      wrapperClassName={styles.backColor}>
      {/* // margin-vert--xl */}
      <main className="" style={{marginBottom: '5rem'}}>
        <ShowcaseHeader />
        {/* <ShowcaseFilters /> */}
        {/* <div
          style={{display: 'flex', marginLeft: 'auto'}}
          className="container">
          <ShowcaseSearchBar />
        </div> */}
        <ShowcaseCards />
      </main>
    </Layout>
  );
}
