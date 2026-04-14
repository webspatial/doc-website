import React, {type ReactNode, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Desktop/Content';

import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const scrollActiveItemIntoView = () => {
      const menu = menuRef.current;
      if (!menu) {
        return;
      }

      const activeItem = menu.querySelector<HTMLElement>(
        ".menu__link[aria-current='page']",
      );

      if (!activeItem) {
        return;
      }

      const menuRect = menu.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const isItemAbove = itemRect.top < menuRect.top;
      const isItemBelow = itemRect.bottom > menuRect.bottom;

      if (isItemAbove || isItemBelow) {
        activeItem.scrollIntoView({
          block: 'nearest',
        });
      }
    };

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollActiveItemIntoView);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, [path, sidebar]);

  return (
    <nav
      ref={menuRef}
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
