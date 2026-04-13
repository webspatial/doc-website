import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig, type NavbarLogo as NavbarLogoConfig} from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';

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
  const lightSrc = useBaseUrl(logo.src);
  const darkSrc = useBaseUrl(logo.srcDark || logo.src);

  if (isHomepage) {
    return (
      <img
        className={logo.className}
        src={darkSrc}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
      />
    );
  }

  return (
    <ThemedImage
      className={logo.className}
      sources={{light: lightSrc, dark: darkSrc}}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );
}

export default function NavbarLogo(): ReactNode {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const {
    navbar: {title: navbarTitle, logo},
  } = useThemeConfig();
  const isHomepage = useIsHomepage();
  const logoLink = useBaseUrl(logo?.href || '/');

  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

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
      {navbarTitle != null && <b className="navbar__title text--truncate">{navbarTitle}</b>}
    </Link>
  );
}
