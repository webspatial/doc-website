import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPageintroductionthe_new_generation_of_spatial_apps(): React.JSX.Element {
  const target = useBaseUrl('/docs/1.0.x/introduction/the-new-generation-of-spatial-apps');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the legacy docs</title>
    </Head>
  );
}
