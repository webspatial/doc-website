import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPagecore_conceptsspatialized_elements_and_3d_container_elements(): React.JSX.Element {
  const target = useBaseUrl('/docs/');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the latest docs</title>
    </Head>
  );
}
