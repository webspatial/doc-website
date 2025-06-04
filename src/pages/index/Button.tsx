import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Button.module.scss';
import clsx from 'clsx';
type Props = {
  url: string;
  size?: 'medium' | 'small' | 'large';
  children: React.ReactNode;
};
const Button: React.FC<Props> = ({children, url, size = 'medium'}) => {
  return (
    <div className={styles.button}>
      <Link className={size} to={url}>
        {children}
      </Link>
    </div>
  );
};
export default Button;
