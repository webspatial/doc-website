import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Button.module.scss';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
type Props = {
  url: string;
  size?: 'medium' | 'small' | 'large';
  children: React.ReactNode;
};
const Button: React.FC<Props> = ({children, url, size = 'medium'}) => {
  const to = useBaseUrl(url);
  return (
    <div className={styles.button}>
      <Link className={size} to={to}>
        {children}
      </Link>
    </div>
  );
};
export default Button;
