import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useColorMode,
  useThemeConfig,
  type NavbarLogo as NavbarLogoConfig,
} from '@docusaurus/theme-common';

import useIsHomepage from '../useIsHomepage';

function LogoImage({
  logo,
  alt,
  isHomepage,
}: {
  logo: NavbarLogoConfig;
  alt: string;
  isHomepage: boolean;
}) {
  const {colorMode} = useColorMode();
  const lightSrc = useBaseUrl(logo.src);
  const darkSrc = useBaseUrl(logo.srcDark || logo.src);
  const compactSrc = useBaseUrl('/img/favicon.svg');
  const documentTheme =
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : null;
  const fullSrc =
    isHomepage || documentTheme === 'dark' || colorMode === 'dark'
      ? darkSrc
      : lightSrc;

  return (
    <picture>
      <source media="(max-width: 429.98px)" srcSet={compactSrc} />
      <img
        className={logo.className}
        src={fullSrc}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
        suppressHydrationWarning
      />
    </picture>
  );
}

export default function NavbarLogo(): ReactNode {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const {
    navbar: {logo},
  } = useThemeConfig();
  const isHomepage = useIsHomepage();
  const logoLink = useBaseUrl(logo?.href || '/');

  const alt = logo?.alt ?? title;

  return (
    <Link
      to={logoLink}
      className="navbar__brand"
      {...(logo?.target && {target: logo.target})}>
      {logo && (
        <div className="navbar__logo">
          <LogoImage logo={logo} alt={alt} isHomepage={isHomepage} />
        </div>
      )}
    </Link>
  );
}
