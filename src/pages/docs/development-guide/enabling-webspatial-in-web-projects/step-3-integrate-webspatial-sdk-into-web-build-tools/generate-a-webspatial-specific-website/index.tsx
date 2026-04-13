import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function LegacyRedirectPagedevelopment_guideenabling_webspatial_in_web_projectsstep_3_integrate_webspatial_sdk_into_web_build_toolsgenerate_a_webspatial_specific_website(): React.JSX.Element {
  const target = useBaseUrl('/docs/');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <title>Redirecting to the latest docs</title>
    </Head>
  );
}
