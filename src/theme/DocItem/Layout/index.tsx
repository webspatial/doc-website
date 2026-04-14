import React, {type ReactNode, useEffect, useId} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useDoc, useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {translate} from '@docusaurus/Translate';
import {useWindowSize, useCollapsible, Collapsible} from '@docusaurus/theme-common';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import ContentVisibility from '@theme/ContentVisibility';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import TOCItems from '@theme/TOCItems';

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
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
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
      <ul className={clsx('breadcrumbs', styles.mobileBreadcrumbsList)}>
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

function MobileDocToolbar({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
  hidden,
}: {
  toc: ReturnType<typeof useDoc>['toc'];
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
  hidden: boolean | undefined;
}): ReactNode {
  const toolbarPanelId = useId();
  const windowSize = useWindowSize();
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: true,
  });

  const hasTOC = !hidden && toc.length > 0;
  const isDesktop = windowSize === 'desktop';
  const toggleLabel = collapsed
    ? translate({
        id: 'theme.docs.mobileToolbar.showContents',
        message: 'Show contents',
        description: 'Label for the mobile docs toolbar toggle when closed',
      })
    : translate({
        id: 'theme.docs.mobileToolbar.hideContents',
        message: 'Hide contents',
        description: 'Label for the mobile docs toolbar toggle when open',
      });
  const closeContentsLabel = translate({
    id: 'theme.docs.mobileToolbar.closeContents',
    message: 'Close contents',
    description: 'Label for the mobile docs toolbar backdrop close action',
  });
  const panelTitle = translate({
    id: 'theme.docs.mobileToolbar.contentsTitle',
    message: 'Table of contents',
    description: 'Title shown above the mobile table of contents panel',
  });

  useEffect(() => {
    if (isDesktop) {
      setCollapsed(true);
    }
  }, [isDesktop, setCollapsed]);

  if (!hasTOC) {
    return (
      <div className={styles.mobileToolbar}>
        <div className={styles.mobileToolbarBar}>
          <MobileBreadcrumbs />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mobileToolbar}>
      <div className={styles.mobileToolbarBar}>
        <MobileBreadcrumbs />
        <button
          type="button"
          className={styles.mobileToolbarToggle}
          aria-expanded={!collapsed}
          aria-controls={toolbarPanelId}
          aria-label={toggleLabel}
          title={toggleLabel}
          onClick={toggleCollapsed}>
          {collapsed ? (
            <span className={styles.mobileToolbarToggleContentsIcon} aria-hidden="true" />
          ) : (
            <span className={styles.mobileToolbarToggleChevronIcon} aria-hidden="true" />
          )}
        </button>
      </div>
      <Collapsible
        id={toolbarPanelId}
        lazy
        collapsed={collapsed}
        className={styles.mobileToolbarPanelWrapper}>
        <button
          type="button"
          className={styles.mobileToolbarPanelBackdrop}
          aria-label={closeContentsLabel}
          onClick={() => setCollapsed(true)}
        />
        <div
          className={styles.mobileToolbarPanel}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest('a')) {
              setCollapsed(true);
            }
          }}>
          <div className={styles.mobileToolbarPanelTitle}>{panelTitle}</div>
          <TOCItems
            toc={toc}
            minHeadingLevel={minHeadingLevel}
            maxHeadingLevel={maxHeadingLevel}
            className={clsx('table-of-contents', styles.mobileToolbarToc)}
            linkClassName={clsx('table-of-contents__link toc-highlight', styles.mobileToolbarTocLink)}
            linkActiveClassName="table-of-contents__link--active"
          />
        </div>
      </Collapsible>
    </div>
  );
}

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    toc,
    minHeadingLevel: frontMatter.toc_min_heading_level,
    maxHeadingLevel: frontMatter.toc_max_heading_level,
    desktop,
  };
}

export default function DocItemLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.docBreadcrumbsDesktop}>
              <DocBreadcrumbs />
            </div>
            <MobileDocToolbar
              toc={docTOC.toc}
              minHeadingLevel={docTOC.minHeadingLevel}
              maxHeadingLevel={docTOC.maxHeadingLevel}
              hidden={docTOC.hidden}
            />
            <DocVersionBadge />
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
