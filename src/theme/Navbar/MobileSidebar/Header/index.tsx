import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  ErrorCauseBoundary,
  useThemeConfig,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import IconClose from '@theme/Icon/Close';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';

import styles from './styles.module.css';

function useMobileUtilityItems() {
  const items = useThemeConfig().navbar.items as NavbarItemConfig[];
  const [, rightItems] = splitNavbarItems(items);
  const utilityItems = rightItems.filter((item) => item.type !== 'search');
  const localeDropdownItem = utilityItems.find(
    (item) => item.type === 'localeDropdown',
  );
  const socialItems = utilityItems.filter((item) => item !== localeDropdownItem);

  return {localeDropdownItem, socialItems};
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

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className={`clean-btn navbar-sidebar__close ${styles.closeButton}`}
      onClick={() => mobileSidebar.toggle()}>
      <IconClose color="currentColor" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const mobileSidebar = useNavbarMobileSidebar();
  const {localeDropdownItem, socialItems} = useMobileUtilityItems();
  const homeUrl = useBaseUrl('/');
  const faviconUrl = useBaseUrl('/img/favicon.svg');

  return (
    <div className="navbar-sidebar__brand">
      <div className={styles.header}>
        <Link
          to={homeUrl}
          className={styles.brand}
          onClick={() => mobileSidebar.toggle()}>
          <img className={styles.brandIcon} src={faviconUrl} alt={title} />
        </Link>
        <div className={styles.controls}>
          {localeDropdownItem && (
            <div className={styles.controlItem}>
              <NavbarItems items={[localeDropdownItem]} />
            </div>
          )}
          <div className={styles.controlItem}>
            <NavbarColorModeToggle className={styles.colorModeToggle} />
          </div>
          {socialItems.length > 0 && (
            <div className={styles.socialItems}>
              <NavbarItems items={socialItems} />
            </div>
          )}
          <CloseButton />
        </div>
      </div>
    </div>
  );
}
