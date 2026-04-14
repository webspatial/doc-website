import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import OriginalNotFoundContent from '@theme-original/NotFound/Content';
import React, {type ReactNode} from 'react';

const LEGACY_SECTION_PREFIXES = [
  '/docs/core-concepts',
  '/docs/development-guide',
  '/docs/quick-example',
];

type NotFoundContentProps = {
  className?: string;
};

function stripBaseUrl(pathname: string, baseUrl: string): string {
  if (baseUrl === '/') {
    return pathname;
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  if (pathname === normalizedBaseUrl) {
    return '/';
  }

  if (pathname.startsWith(`${normalizedBaseUrl}/`)) {
    return pathname.slice(normalizedBaseUrl.length);
  }

  return pathname;
}

function stripLocalePrefix(
  pathname: string,
  locales: string[],
  defaultLocale: string,
): string {
  for (const locale of locales) {
    if (locale === defaultLocale) {
      continue;
    }

    const localePrefix = `/${locale}`;

    if (pathname === localePrefix) {
      return '/';
    }

    if (pathname.startsWith(`${localePrefix}/`)) {
      return pathname.slice(localePrefix.length);
    }
  }

  return pathname;
}

function trimTrailingSlash(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
}

function getLegacyRedirectPath(
  pathname: string,
  locales: string[],
  defaultLocale: string,
): string | null {
  const localeAgnosticPath = stripLocalePrefix(pathname, locales, defaultLocale);
  const matchedPrefix = LEGACY_SECTION_PREFIXES.find(
    (prefix) =>
      localeAgnosticPath === prefix || localeAgnosticPath.startsWith(`${prefix}/`),
  );

  if (!matchedPrefix) {
    return null;
  }

  return trimTrailingSlash(localeAgnosticPath.replace('/docs/', '/docs/1.0.x/'));
}

export default function NotFoundContent(props: NotFoundContentProps): ReactNode {
  const {pathname, search, hash} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const sitePath = stripBaseUrl(pathname, siteConfig.baseUrl);
  const redirectPath = getLegacyRedirectPath(
    sitePath,
    siteConfig.i18n.locales,
    siteConfig.i18n.defaultLocale,
  );
  const target = redirectPath ? `${useBaseUrl(redirectPath)}${search}${hash}` : null;

  if (target) {
    return (
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <meta name="robots" content="noindex,follow" />
        <title>Redirecting to the legacy docs</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace(${JSON.stringify(target)});`,
          }}
        />
      </Head>
    );
  }

  return <OriginalNotFoundContent {...props} />;
}
