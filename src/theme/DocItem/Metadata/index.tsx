import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {PageMetadata} from '@docusaurus/theme-common';

const LEGACY_VERSION = '1.0.x';

const LEGACY_META_NOTICE: Record<string, string> = {
  en: 'Legacy WebSpatial 1.0.x documentation. This document is outdated. Prefer the latest WebSpatial docs.',
  'zh-Hans':
    'WebSpatial 1.0.x 旧版文档。当前文档已过时，建议优先查看新版 WebSpatial 文档。',
};

const LEGACY_PAGE_NOTICE_SNIPPETS = [
  'This page is part of the legacy `1.0.x` documentation.',
  'This page is part of the legacy 1.0.x documentation.',
  '本文档属于旧版 `1.0.x` 文档',
  '本文档属于旧版 1.0.x 文档',
];

function normalizeDescription(description: string): string {
  return description.replace(/\s+/g, ' ').trim();
}

function stripLegacyNotice(description: string): string {
  let normalized = normalizeDescription(description);

  for (const snippet of LEGACY_PAGE_NOTICE_SNIPPETS) {
    if (normalized.includes(snippet)) {
      return '';
    }
  }

  return normalized;
}

function getLegacyDescription(
  description: string,
  locale: string,
): string {
  const notice = LEGACY_META_NOTICE[locale] ?? LEGACY_META_NOTICE.en;
  const cleanedDescription = stripLegacyNotice(description);

  return cleanedDescription ? `${notice} ${cleanedDescription}` : notice;
}

export default function DocItemMetadata(): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {metadata, frontMatter, assets} = useDoc();
  const isLegacyDoc = metadata.version === LEGACY_VERSION;
  const description = isLegacyDoc
    ? getLegacyDescription(metadata.description, currentLocale)
    : metadata.description;

  return (
    <PageMetadata
      title={metadata.title}
      description={description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}>
      {description && <meta name="twitter:description" content={description} />}
    </PageMetadata>
  );
}
