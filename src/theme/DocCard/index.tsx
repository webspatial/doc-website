import React, {type ReactNode} from 'react';
import DocCard from '@theme-original/DocCard';
import type DocCardType from '@theme/DocCard';
import type {WrapperProps} from '@docusaurus/types';
// import clsx from 'clsx';
import styles from "./styles.module.scss";

type Props = WrapperProps<typeof DocCardType>;

export default function DocCardWrapper(props: Props): ReactNode {
  //@ts-ignore
  const {item, ...rest} = props;
  console.log('🚀 ~ DocCardWrapper ~ item:', item);
  return (
    <>
      <DocCard {...rest} item={{...item, className: styles.wrap}} />
    </>
  );
}
