import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {useCurrentSidebarCategory, useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import Heading from '@theme/Heading';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';

import styles from './styles.module.css';

function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: ReactNode;
  href?: string;
  isLast: boolean;
}) {
  if (isLast || !href) {
    return <span className="breadcrumbs__link">{children}</span>;
  }

  return (
    <Link className="breadcrumbs__link" href={href}>
      <span>{children}</span>
    </Link>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  return (
    <li
      className={`breadcrumbs__item${active ? ' breadcrumbs__item--active' : ''}`}>
      {children}
    </li>
  );
}

function MobileBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  if (!breadcrumbs && !homePageRoute) {
    return null;
  }

  return (
    <nav
      className={styles.mobileBreadcrumbs}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}>
      <ul className={`breadcrumbs ${styles.mobileBreadcrumbsList}`}>
        {homePageRoute && <HomeBreadcrumbItem />}
        {breadcrumbs?.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          const href =
            item.type === 'category' && item.linkUnlisted ? undefined : item.href;

          return (
            <BreadcrumbsItem key={idx} active={isLast}>
              <BreadcrumbsItemLink href={href} isLast={isLast}>
                {item.label}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          );
        })}
      </ul>
    </nav>
  );
}

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): ReactNode {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const category = useCurrentSidebarCategory();

  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <div className={styles.docBreadcrumbsDesktop}>
        <DocBreadcrumbs />
      </div>
      <div className={styles.mobileToolbar}>
        <div className={styles.mobileToolbarBar}>
          <MobileBreadcrumbs />
        </div>
      </div>
      <DocVersionBadge />
      <header>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p>{categoryGeneratedIndex.description}</p>
        )}
      </header>
      <article className="margin-top--lg">
        <DocCardList items={category.items} className={styles.list} />
      </article>
      <footer className="margin-top--md">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
