import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import useIsHomepage from '../useIsHomepage';
import styles from './styles.module.scss';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerLeft,
          'navbar__items',
        )}>
        {left}
      </div>
      <div
        className={clsx(
          ThemeClassNames.layout.navbar.containerRight,
          'navbar__items navbar__items--right',
        )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const versionDropdownItem = leftItems.find(
    (item) => item.type === 'docsVersionDropdown',
  );
  const mainNavItems = leftItems.filter((item) => item !== versionDropdownItem);

  const searchBarItem = items.find((item) => item.type === 'search');
  const utilityItems = rightItems.filter((item) => item.type !== 'search');
  const localeDropdownItem = utilityItems.find(
    (item) => item.type === 'localeDropdown',
  );
  const socialItems = utilityItems.filter((item) => item !== localeDropdownItem);

  const isHomepage = useIsHomepage();
  const showControlGroup = Boolean(localeDropdownItem) || !isHomepage;
  const showSocialSeparator = socialItems.length > 0;

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          {versionDropdownItem && (
            <>
              <div className={styles.mobileVersion}>
                <NavbarItems items={[versionDropdownItem]} />
              </div>
              <div className={styles.desktopVersion}>
                <NavbarItems items={[versionDropdownItem]} />
              </div>
            </>
          )}
          <NavbarItems items={mainNavItems} />
        </>
      }
      right={
        <>
          {showControlGroup && (
            <div className={styles.utilityControls}>
              <div className={styles.controlGroup}>
                {localeDropdownItem && (
                  <div className={styles.controlGroupItem}>
                    <NavbarItems items={[localeDropdownItem]} />
                  </div>
                )}
                {localeDropdownItem && !isHomepage && (
                  <div className={styles.controlGroupDivider} />
                )}
                {!isHomepage && (
                  <div className={styles.controlGroupItem}>
                    <NavbarColorModeToggle className={styles.colorModeToggle} />
                  </div>
                )}
              </div>
            </div>
          )}

          {!searchBarItem ? (
            <NavbarSearch className={styles.navbarSearch}>
              <SearchBar />
            </NavbarSearch>
          ) : (
            <NavbarItems items={[searchBarItem]} />
          )}

          {showSocialSeparator && <Separator className={styles.utilitySeparator} />}
          {socialItems.length > 0 && (
            <div className={styles.socialItems}>
              <NavbarItems items={socialItems} />
            </div>
          )}
        </>
      }
    />
  );
}

const Separator = ({className}: {className?: string}) => {
  return (
    <div className={clsx(styles.separator, className)} />
  );
};
