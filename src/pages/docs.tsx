import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function DocsRedirect(): React.JSX.Element {
  const target = useBaseUrl('/docs/introduction/getting-started');

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <meta name="robots" content="noindex,follow" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(target)});`,
        }}
      />
    </Head>
  );
}
