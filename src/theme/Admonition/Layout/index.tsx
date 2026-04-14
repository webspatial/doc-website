import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDocsPreferredVersion} from '@docusaurus/plugin-content-docs/client';

import type {Props} from '@theme/Admonition/Layout';

import styles from './styles.module.scss';

const LEGACY_OUTDATED_TITLES = new Set(['Old Documentation', '旧版文档']);
const LEGACY_OUTDATED_LABELS = {
  en: {
    title: 'This document is outdated',
    bodyBeforeVersion: 'This page is part of the legacy ',
    bodyAfterVersion: ' documentation. We recommend using the ',
    linkLabel: 'latest documentation',
    bodyAfterLink: ' instead.',
  },
  'zh-Hans': {
    title: '当前文档已过时',
    bodyBeforeVersion: '本文档属于旧版 ',
    bodyAfterVersion: ' 文档，建议使用',
    linkLabel: '新版文档',
    bodyAfterLink: '。',
  },
} as const;

function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & {children: ReactNode}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title}: Pick<Props, 'icon' | 'title'>) {
  return (
    <div className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </div>
  );
}

function AdmonitionContent({children}: Pick<Props, 'children'>) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

function LegacyOutdatedTitle({title}: {title: string}): ReactNode {
  return title;
}

function LegacyOutdatedContent({
  bodyBeforeVersion,
  bodyAfterVersion,
  linkLabel,
  bodyAfterLink,
}: {
  bodyBeforeVersion: string;
  bodyAfterVersion: string;
  linkLabel: string;
  bodyAfterLink: string;
}): ReactNode {
  const latestDocsPath = useBaseUrl('/docs');
  const {savePreferredVersionName} = useDocsPreferredVersion();

  return (
    <p>
      {bodyBeforeVersion}
      <code>1.0.x</code>
      {bodyAfterVersion}
      <Link
        to={latestDocsPath}
        onClick={() => savePreferredVersionName('current')}>
        {linkLabel}
      </Link>
      {bodyAfterLink}
    </p>
  );
}

export default function AdmonitionLayout(props: Props): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {type, icon, title, children, className} = props;
  const isLegacyOutdatedAdmonition =
    typeof title === 'string' && LEGACY_OUTDATED_TITLES.has(title);
  const legacyOutdatedLabels =
    LEGACY_OUTDATED_LABELS[
      currentLocale as keyof typeof LEGACY_OUTDATED_LABELS
    ] ?? LEGACY_OUTDATED_LABELS.en;
  const resolvedTitle = isLegacyOutdatedAdmonition ? (
    <LegacyOutdatedTitle title={legacyOutdatedLabels.title} />
  ) : (
    title
  );
  const resolvedChildren = isLegacyOutdatedAdmonition ? (
    <LegacyOutdatedContent
      bodyBeforeVersion={legacyOutdatedLabels.bodyBeforeVersion}
      bodyAfterVersion={legacyOutdatedLabels.bodyAfterVersion}
      linkLabel={legacyOutdatedLabels.linkLabel}
      bodyAfterLink={legacyOutdatedLabels.bodyAfterLink}
    />
  ) : (
    children
  );

  return (
    <AdmonitionContainer
      type={type}
      className={clsx(className, {
        [styles.legacyOutdatedAdmonition]: isLegacyOutdatedAdmonition,
      })}>
      {resolvedTitle || icon ? (
        <AdmonitionHeading title={resolvedTitle} icon={icon} />
      ) : null}
      <AdmonitionContent>{resolvedChildren}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
