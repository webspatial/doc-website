/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Image from '@theme/IdealImage';
import {Tags, TagList, type TagType, type User} from '@site/src/data/users';
import {sortBy} from '@site/src/utils/jsUtils';
import Heading from '@theme/Heading';
import FavoriteIcon from '../FavoriteIcon';
import styles from './styles.module.scss';
import {useColorMode} from '@docusaurus/theme-common';

function TagItem({
  label,
  description,
  color,
  backgroundColor,
  darkColor,
  darkBackgroundColor,
}: {
  label: string;
  description: string;
  color: string;
  backgroundColor?: string;
  darkColor?: string;
  darkBackgroundColor?: string;
}) {
  const {colorMode, setColorMode} = useColorMode();
  const finalColor = colorMode === 'dark' ? darkColor ?? color : color;
  const finalBackGroundColor =
    colorMode === 'dark'
      ? darkBackgroundColor ?? backgroundColor
      : backgroundColor;
  return (
    <li
      className={styles.tag}
      title={description}
      style={{
        color: finalColor,
        backgroundColor: finalBackGroundColor,
      }}>
      <span className={styles.textLabel}>{label}</span>
      {/* <span className={styles.colorLabel} style={{backgroundColor: color}} /> */}
    </li>
  );
}

function ShowcaseCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        // escape for empty label
        if (!tagObject.label) return null;
        return <TagItem key={index} {...tagObject} />;
      })}
    </>
  );
}

function getCardImage(user: User): string {
  // return user.preview ?? '';
  return (
    user.preview ??
    // TODO make it configurable
    `https://slorber-api-screenshot.netlify.app/${encodeURIComponent(
      user.website,
    )}/showcase`
  );
}

function ShowcaseCard({user}: {user: User}) {
  const image = getCardImage(user);
  return (
    <Link href={user.website}>
      <li
        key={user.title}
        className={clsx('card ', styles.cardWrap)} /**shadow--md */
      >
        <div className={clsx('card__image', styles.showcaseCardImage)}>
          {image && <Image img={image} alt={user.title} />}
        </div>
        <div className="card__body">
          <div className={clsx(styles.showcaseCardHeader)}>
            <Heading as="h4" className={styles.showcaseCardTitle}>
              <span className={styles.showcaseCardLink}>{user.title}</span>
            </Heading>
            {/* {user.tags.includes('favorite') && (
            <FavoriteIcon size="medium" style={{marginRight: '0.25rem'}} />
          )} */}
            {/* {user.source && <Link href={user.website}></Link>} */}
            {user.source && (
              <Link href={user.source} style={{marginLeft: '4px'}}>
                <div className={styles.sourceIcon}>
                  <svg
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9926 4.55444C7.29752 4.55282 3.49219 8.35491 3.49219 13.0484C3.49219 16.7597 5.87214 19.9143 9.18641 21.0731C9.63209 21.1849 9.56402 20.8681 9.56402 20.6517V19.1794C6.98716 19.4816 6.88181 17.7759 6.70921 17.4906C6.36077 16.8942 5.53423 16.7427 5.78057 16.4574C6.36725 16.156 6.96609 16.5336 7.65893 17.5571C8.16052 18.3001 9.1386 18.1745 9.63452 18.0514C9.74229 17.6049 9.97486 17.2062 10.2933 16.8966C7.62327 16.4185 6.50987 14.7882 6.50987 12.8515C6.50987 11.9115 6.81942 11.0468 7.42717 10.35C7.03983 9.2009 7.46364 8.21715 7.52036 8.07048C8.62403 7.97162 9.77066 8.86056 9.8606 8.93106C10.487 8.7617 11.2033 8.67256 12.0047 8.67256C12.8094 8.67256 13.5282 8.76575 14.1602 8.93673C14.375 8.77385 15.4381 8.00971 16.464 8.1029C16.5191 8.24876 16.9332 9.21062 16.5685 10.3443C17.1844 11.0428 17.4972 11.9147 17.4972 12.8563C17.4972 14.7979 16.3765 16.4299 13.6983 16.8999C14.1448 17.3407 14.422 17.9525 14.422 18.6283V20.7652C14.4374 20.9353 14.422 21.1055 14.7072 21.1055C18.0701 19.971 20.4922 16.7945 20.4922 13.0508C20.4922 8.35572 16.686 4.55525 11.9934 4.55525"
                      // fill="var(--color-fill-5)"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </div>
          <p className={styles.showcaseCardBody}>{user.description}</p>
        </div>
        <div className={clsx(styles.cardFooterWrap)}>
          <ul className={clsx('card__footer', styles.cardFooter)}>
            <ShowcaseCardTag tags={user.tags} />
          </ul>
        </div>
      </li>
    </Link>
  );
}

export default React.memo(ShowcaseCard);
