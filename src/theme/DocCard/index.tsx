import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Layout from '@theme/DocCard/Layout';
import type {Props} from '@theme/DocCard';

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import {
  getCategoryCardLevel,
  getCategoryIconHref,
  getParentCategoryIconConfig,
  renderDocLinkIcon,
  renderDocsCategoryIcon,
} from '../_components/docsCategoryIcons';
import styles from './styles.module.scss';

function getCardTitle(label: string): string {
  return extractLeadingEmoji(label).rest.trim();
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  const iconHref = getCategoryIconHref(item) ?? href;

  if (!href) {
    return null;
  }

  return (
    <Layout
      item={item}
      className={clsx(item.className, styles.wrap)}
      href={href}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      icon={renderDocsCategoryIcon({
        fallback: 'folder',
        href: iconHref,
        level: getCategoryCardLevel(iconHref),
        size: 20,
      })}
      title={getCardTitle(item.label)}
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  const parentCategoryIcon = isInternalUrl(item.href)
    ? getParentCategoryIconConfig(item.href)
    : null;

  return (
    <Layout
      item={item}
      className={clsx(item.className, styles.wrap)}
      href={item.href}
      description={item.description ?? doc?.description}
      icon={
        parentCategoryIcon
          ? renderDocsCategoryIcon({
              href: parentCategoryIcon.href,
              level: parentCategoryIcon.level,
              size: 20,
            })
          : renderDocLinkIcon({
              external: !isInternalUrl(item.href),
              size: 20,
            })
      }
      title={getCardTitle(item.label)}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
