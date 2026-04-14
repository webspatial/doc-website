export const HOMEPAGE_HERO_STAGE_BREAKPOINT = 768;

export type HomepageHeroAsset = {
  kind: 'image' | 'video';
  portrait: string;
  landscape: string;
  modernFormat?: 'webp';
  weight?: number;
};

export type HomepageHeroPreloadEntry = {
  kind: 'image' | 'video';
  path: string;
  weight: number;
};

export const HOMEPAGE_HERO_ASSETS = {
  backgroundImage: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/background.jpg',
    landscape: '/img/home-hero/horizontal/background.jpg',
  },
  backgroundVideo: {
    kind: 'video',
    portrait: '/img/home-hero/vertical/background.mp4',
    landscape: '/img/home-hero/horizontal/background.mp4',
    weight: 2,
  },
  personBase: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/person-dark.png',
    landscape: '/img/home-hero/horizontal/person-dark.png',
    modernFormat: 'webp',
  },
  personGlow: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/person-bright.png',
    landscape: '/img/home-hero/horizontal/person-bright.png',
    modernFormat: 'webp',
  },
  center: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/center.png',
    landscape: '/img/home-hero/horizontal/center.png',
    modernFormat: 'webp',
  },
  panelTop: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/panel-top.png',
    landscape: '/img/home-hero/horizontal/panel-top.png',
    modernFormat: 'webp',
  },
  panelRight: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/panel-right.png',
    landscape: '/img/home-hero/horizontal/panel-right.png',
    modernFormat: 'webp',
  },
  panelBottom: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/panel-bottom.png',
    landscape: '/img/home-hero/horizontal/panel-bottom.png',
    modernFormat: 'webp',
  },
  panelLeft: {
    kind: 'image',
    portrait: '/img/home-hero/vertical/panel-left.png',
    landscape: '/img/home-hero/horizontal/panel-left.png',
    modernFormat: 'webp',
  },
} satisfies Record<string, HomepageHeroAsset>;

const MODERN_SOURCE_PATTERN = /\.(png|jpe?g)$/i;

export function withBaseUrl(baseUrl: string, path: string): string {
  const normalizedBaseUrl = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

export function resolveHomepageHeroAssetPath(
  asset: HomepageHeroAsset,
  isLandscape: boolean,
  preferModern = false,
): string {
  const selectedPath = isLandscape ? asset.landscape : asset.portrait;

  if (preferModern && asset.modernFormat) {
    return selectedPath.replace(
      MODERN_SOURCE_PATTERN,
      `.${asset.modernFormat}`,
    );
  }

  return selectedPath;
}

export function getHomepageHeroPreloadEntries(
  isLandscape: boolean,
  includeBackgroundVideo: boolean,
): HomepageHeroPreloadEntry[] {
  const entries: HomepageHeroPreloadEntry[] = [
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.backgroundImage,
        isLandscape,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.personBase,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.personGlow,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.center,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.panelTop,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.panelRight,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.panelBottom,
        isLandscape,
        true,
      ),
      weight: 1,
    },
    {
      kind: 'image' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.panelLeft,
        isLandscape,
        true,
      ),
      weight: 1,
    },
  ];

  if (includeBackgroundVideo) {
    entries.push({
      kind: 'video' as const,
      path: resolveHomepageHeroAssetPath(
        HOMEPAGE_HERO_ASSETS.backgroundVideo,
        isLandscape,
      ),
      weight: HOMEPAGE_HERO_ASSETS.backgroundVideo.weight ?? 2,
    });
  }

  return entries;
}
