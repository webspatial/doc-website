import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPageintroductionbuilt_on_the_existing_web_ecosystem(): React.JSX.Element {
  const target = useBaseUrl('/docs/1.0.x/introduction/built-on-the-existing-web-ecosystem');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the legacy docs</title>
    </Head>
  );
}
