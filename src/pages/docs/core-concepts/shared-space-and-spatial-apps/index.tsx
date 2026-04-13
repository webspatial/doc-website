import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPagecore_conceptsshared_space_and_spatial_apps(): React.JSX.Element {
  const target = useBaseUrl('/docs/');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the latest docs</title>
    </Head>
  );
}
