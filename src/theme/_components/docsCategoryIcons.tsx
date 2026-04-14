import React, {type ReactNode} from 'react';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItemCategory} from '@docusaurus/plugin-content-docs';

type CategoryIconOptions = {
  className?: string;
  fallback?: 'folder' | 'none';
  href?: string;
  level: number;
  size?: number;
};

type LinkIconOptions = {
  className?: string;
  external?: boolean;
  size?: number;
};

function iconProps({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return {
    'aria-hidden': true,
    className,
    fill: 'none',
    height: size,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    width: size,
  };
}

export function getDocSegments(href?: string): string[] {
  if (!href) {
    return [];
  }

  const docsIndex = href.indexOf('/docs/');
  if (docsIndex === -1) {
    return [];
  }

  return href
    .slice(docsIndex + '/docs/'.length)
    .split('/')
    .filter(Boolean);
}

export function getCategoryIconHref(
  item: Pick<
    PropSidebarItemCategory,
    'collapsible' | 'href' | 'items' | 'linkUnlisted'
  >,
): string | undefined {
  if (item.href && !item.linkUnlisted) {
    return item.href;
  }

  return findFirstSidebarItemLink(item);
}

export function getCategoryCardLevel(href?: string): number {
  const segments = getDocSegments(href);

  if (segments[0] === 'api') {
    if (segments.length >= 3) {
      return 3;
    }
    if (segments.length >= 2) {
      return 2;
    }
  }

  return 1;
}

export function getParentCategoryIconConfig(
  href?: string,
): {href: string; level: number} | null {
  const segments = getDocSegments(href);

  if (segments.length < 2) {
    return null;
  }

  const parentSegments = segments.slice(0, -1);

  let level = 1;
  if (parentSegments[0] === 'api') {
    if (parentSegments.length >= 3) {
      level = 3;
    } else if (parentSegments.length >= 2) {
      level = 2;
    }
  }

  return {
    href: `/docs/${parentSegments.join('/')}`,
    level,
  };
}

function renderFolderIcon({
  className,
  size,
}: {
  className?: string;
  size?: number;
}): ReactNode {
  return (
    <svg {...iconProps({className, size})}>
      <path d="M4 8.5h16v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <path d="M4 8.5V7A2 2 0 0 1 6 5h4l2 2h6a2 2 0 0 1 2 2v-.5" />
    </svg>
  );
}

export function renderDocsCategoryIcon({
  className,
  fallback = 'none',
  href,
  level,
  size = 18,
}: CategoryIconOptions): ReactNode {
  const segments = getDocSegments(href);
  const rootSegment = segments[0];
  const props = iconProps({className, size});

  if (level === 1) {
    switch (rootSegment) {
      case 'introduction':
        return (
          <svg {...props}>
            <path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h12.5v14H7a2.5 2.5 0 0 0-2.5 2.5V6.5Z" />
            <path d="M7 4A2.5 2.5 0 0 0 4.5 6.5V20" />
            <path d="M9 8h7" />
            <path d="M9 11h7" />
          </svg>
        );
      case 'concepts':
        return (
          <svg {...props}>
            <circle cx="6.5" cy="12" r="2.5" />
            <circle cx="17.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
            <path d="M8.7 10.8 15 7.7" />
            <path d="m8.8 13.2 6.1 3.1" />
          </svg>
        );
      case 'how-to':
        return (
          <svg {...props}>
            <rect x="6" y="4.5" width="12" height="15" rx="2" />
            <path d="M9.5 8h5.5" />
            <path d="M9.5 12h5.5" />
            <path d="M9.5 16H13" />
            <path d="m8 11 1 1 1.8-2" />
          </svg>
        );
      case 'api':
        return (
          <svg {...props}>
            <path d="m9 7-4 5 4 5" />
            <path d="m15 7 4 5-4 5" />
            <path d="M13 5 11 19" />
          </svg>
        );
      default:
        break;
    }
  }

  if (rootSegment === 'api' && level === 2) {
    switch (segments[1]) {
      case 'react-sdk':
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="1.6" />
            <ellipse cx="12" cy="12" rx="7.5" ry="3.4" />
            <ellipse
              cx="12"
              cy="12"
              rx="7.5"
              ry="3.4"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="7.5"
              ry="3.4"
              transform="rotate(-60 12 12)"
            />
          </svg>
        );
      case 'builder':
        return (
          <svg {...props}>
            <path d="M4 7h16" />
            <path d="M7 12h4" />
            <path d="M7 16h3" />
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="m14.5 13 2 2 3-4" />
          </svg>
        );
      default:
        break;
    }
  }

  if (rootSegment === 'api' && level === 3) {
    switch (segments[2]) {
      case 'react-components':
        return (
          <svg {...props}>
            <rect x="4" y="4" width="7" height="7" rx="1.5" />
            <rect x="13" y="4" width="7" height="7" rx="1.5" />
            <rect x="4" y="13" width="7" height="7" rx="1.5" />
            <rect x="13" y="13" width="7" height="7" rx="1.5" />
          </svg>
        );
      case 'css-api':
        return (
          <svg {...props}>
            <path d="M6 8h12" />
            <path d="M6 12h12" />
            <path d="M6 16h12" />
            <circle cx="9" cy="8" r="1.4" />
            <circle cx="14.5" cy="12" r="1.4" />
            <circle cx="11" cy="16" r="1.4" />
          </svg>
        );
      case 'dom-api':
        return (
          <svg {...props}>
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="M4 9h16" />
            <path d="M8 7h.01" />
            <path d="M11 7h.01" />
          </svg>
        );
      case 'event-api':
        return (
          <svg {...props}>
            <path d="m6 5 10 7-4 1.2 1.6 4.8-2.1.7-1.6-4.7L7 17 6 5Z" />
          </svg>
        );
      case 'js-api':
        return (
          <svg {...props}>
            <path d="m9 7-3 5 3 5" />
            <path d="m15 7 3 5-3 5" />
            <circle cx="12" cy="12" r="1.2" />
          </svg>
        );
      case 'manifest-options':
        return (
          <svg {...props}>
            <path d="M8 4h6l4 4v12H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            <path d="M14 4v4h4" />
            <path d="M10 13h6" />
            <path d="M10 16h4" />
          </svg>
        );
      case 'scene-options':
        return (
          <svg {...props}>
            <path d="m12 4 7 4v8l-7 4-7-4V8l7-4Z" />
            <path d="M12 12 19 8" />
            <path d="M12 12 5 8" />
            <path d="M12 12v8" />
          </svg>
        );
      default:
        break;
    }
  }

  if (fallback === 'folder') {
    return renderFolderIcon({className, size});
  }

  return null;
}

export function renderDocLinkIcon({
  className,
  external = false,
  size = 20,
}: LinkIconOptions): ReactNode {
  const props = iconProps({className, size});

  if (external) {
    return (
      <svg {...props}>
        <path d="M14 5h5v5" />
        <path d="m10 14 9-9" />
        <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M8 4h6l4 4v12H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M14 4v4h4" />
      <path d="M10 13h6" />
      <path d="M10 16h4" />
    </svg>
  );
}
