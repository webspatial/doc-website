import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPagedevelopment_guideweb_projects_that_support_webspatialcreating_new_web_projects(): React.JSX.Element {
  const target = useBaseUrl('/docs/');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the latest docs</title>
    </Head>
  );
}
