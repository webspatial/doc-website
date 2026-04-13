import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {Props} from '@theme/Admonition/Layout';

import styles from './styles.module.scss';

const LEGACY_OUTDATED_TITLES = new Set(['Old Documentation', '旧版文档']);
const LEGACY_OUTDATED_LABELS: Record<string, string> = {
  en: 'This document is outdated',
  'zh-Hans': '当前文档已过时',
};

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

export default function AdmonitionLayout(props: Props): ReactNode {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {type, icon, title, children, className} = props;
  const isLegacyOutdatedAdmonition =
    typeof title === 'string' && LEGACY_OUTDATED_TITLES.has(title);
  const resolvedTitle = isLegacyOutdatedAdmonition
    ? LEGACY_OUTDATED_LABELS[currentLocale] ?? LEGACY_OUTDATED_LABELS.en
    : title;

  return (
    <AdmonitionContainer
      type={type}
      className={clsx(className, {
        [styles.legacyOutdatedAdmonition]: isLegacyOutdatedAdmonition,
      })}>
      {resolvedTitle || icon ? (
        <AdmonitionHeading title={resolvedTitle} icon={icon} />
      ) : null}
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
