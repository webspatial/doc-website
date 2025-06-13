import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import type {Props} from '@theme/NavbarItem/DefaultNavbarItem/Mobile';

export default function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  ...props
}: Props): ReactNode {
  console.log('🚀 ~ props:', props);
  const finalLabel = props.h5Label ?? props.label;
  const finalClassName = props.h5ClassName ?? className;

  return (
    <li className="menu__list-item">
      <NavbarNavLink
        className={clsx('menu__link', finalClassName)}
        {...props}
        label={finalLabel}
      />
    </li>
  );
}
