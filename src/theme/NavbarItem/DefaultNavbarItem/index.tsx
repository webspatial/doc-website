import React, {type ReactNode} from 'react';
import DefaultNavbarItemMobile from '@theme/NavbarItem/DefaultNavbarItem/Mobile';
import DefaultNavbarItemDesktop from '@theme/NavbarItem/DefaultNavbarItem/Desktop';
import type {Props} from '@theme/NavbarItem/DefaultNavbarItem';

export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}: Props): ReactNode {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
}
