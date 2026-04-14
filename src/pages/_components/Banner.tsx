import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import data from '../../data/index/data';
import Button from './Button';
import {
  HOMEPAGE_HERO_ASSETS,
  HOMEPAGE_HERO_STAGE_BREAKPOINT,
} from './homepageMedia';
import styles from './Banner.module.scss';

type ResponsiveAsset = {
  portrait: string;
  landscape: string;
  portraitModern?: string;
  landscapeModern?: string;
  modernType?: string;
  alt: string;
};

type LayerProps = {
  asset: ResponsiveAsset;
  className?: string;
  loading?: 'eager' | 'lazy';
  style?: React.CSSProperties;
};

type EntranceOptions = {
  fromX?: number;
  fromY?: number;
  fromScale?: number;
  fromRotate?: number;
  fromBlur?: number;
};

const STAGE_BREAKPOINT = HOMEPAGE_HERO_STAGE_BREAKPOINT;
const WHEEL_PHASE_DISTANCE = 520;
const TOUCH_PHASE_DISTANCE = 260;
const KEYBOARD_PHASE_DISTANCE = 180;
const BACKGROUND_SCRUB_SECONDS = 4.8;

function useHeroAsset(
  portraitPath: string,
  landscapePath: string,
  alt = '',
  modernFormat?: 'webp',
): ResponsiveAsset {
  const portrait = useBaseUrl(portraitPath);
  const landscape = useBaseUrl(landscapePath);
  const portraitModern = useBaseUrl(
    modernFormat
      ? portraitPath.replace(/\.(png|jpe?g)$/i, `.${modernFormat}`)
      : portraitPath,
  );
  const landscapeModern = useBaseUrl(
    modernFormat
      ? landscapePath.replace(/\.(png|jpe?g)$/i, `.${modernFormat}`)
      : landscapePath,
  );

  return React.useMemo(
    () => ({
      portrait,
      landscape,
      portraitModern: modernFormat ? portraitModern : undefined,
      landscapeModern: modernFormat ? landscapeModern : undefined,
      modernType: modernFormat ? `image/${modernFormat}` : undefined,
      alt,
    }),
    [
      alt,
      landscape,
      landscapeModern,
      modernFormat,
      portrait,
      portraitModern,
    ],
  );
}

const ResponsiveLayer: React.FC<LayerProps> = ({
  asset,
  className,
  loading = 'eager',
  style,
}) => (
  <picture
    className={clsx(styles.layer, className)}
    style={style}
    aria-hidden="true">
    {asset.landscapeModern ? (
      <source
        media={`(min-width: ${STAGE_BREAKPOINT}px)`}
        srcSet={asset.landscapeModern}
        type={asset.modernType}
      />
    ) : null}
    <source
      media={`(min-width: ${STAGE_BREAKPOINT}px)`}
      srcSet={asset.landscape}
    />
    {asset.portraitModern ? (
      <source srcSet={asset.portraitModern} type={asset.modernType} />
    ) : null}
    <img src={asset.portrait} alt={asset.alt} loading={loading} />
  </picture>
);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const segment = (progress: number, start: number, end: number) => {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return clamp((progress - start) / (end - start), 0, 1);
};

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

const buildEntranceStyle = (
  progress: number,
  start: number,
  end: number,
  {
    fromX = 0,
    fromY = 0,
    fromScale = 0.96,
    fromRotate = 0,
    fromBlur = 0,
  }: EntranceOptions = {},
): React.CSSProperties => {
  const amount = easeOutCubic(segment(progress, start, end));
  const transform = `translate3d(${mix(fromX, 0, amount).toFixed(3)}%, ${mix(
    fromY,
    0,
    amount,
  ).toFixed(3)}%, 0) scale(${mix(fromScale, 1, amount).toFixed(4)}) rotate(${mix(
    fromRotate,
    0,
    amount,
  ).toFixed(3)}deg)`;

  return {
    opacity: amount,
    transform,
    filter: fromBlur > 0 ? `blur(${mix(fromBlur, 0, amount).toFixed(3)}px)` : undefined,
  };
};

const Banner: React.FC = () => {
  const backgroundVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const touchYRef = React.useRef<number | null>(null);
  const phaseProgressRef = React.useRef(0);
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);
  const [isLandscapeStage, setIsLandscapeStage] = React.useState<boolean | null>(
    null,
  );
  const [phaseProgress, setPhaseProgress] = React.useState(0);

  const portraitBackgroundUrl = useBaseUrl(
    HOMEPAGE_HERO_ASSETS.backgroundImage.portrait,
  );
  const landscapeBackgroundUrl = useBaseUrl(
    HOMEPAGE_HERO_ASSETS.backgroundImage.landscape,
  );
  const portraitBackgroundVideoUrl = useBaseUrl(
    HOMEPAGE_HERO_ASSETS.backgroundVideo.portrait,
  );
  const landscapeBackgroundVideoUrl = useBaseUrl(
    HOMEPAGE_HERO_ASSETS.backgroundVideo.landscape,
  );
  const personBase = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.personBase.portrait,
    HOMEPAGE_HERO_ASSETS.personBase.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.personBase.modernFormat,
  );
  const personGlow = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.personGlow.portrait,
    HOMEPAGE_HERO_ASSETS.personGlow.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.personGlow.modernFormat,
  );
  const center = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.center.portrait,
    HOMEPAGE_HERO_ASSETS.center.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.center.modernFormat,
  );
  const panelTop = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.panelTop.portrait,
    HOMEPAGE_HERO_ASSETS.panelTop.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.panelTop.modernFormat,
  );
  const panelRight = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.panelRight.portrait,
    HOMEPAGE_HERO_ASSETS.panelRight.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.panelRight.modernFormat,
  );
  const panelBottom = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.panelBottom.portrait,
    HOMEPAGE_HERO_ASSETS.panelBottom.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.panelBottom.modernFormat,
  );
  const panelLeft = useHeroAsset(
    HOMEPAGE_HERO_ASSETS.panelLeft.portrait,
    HOMEPAGE_HERO_ASSETS.panelLeft.landscape,
    '',
    HOMEPAGE_HERO_ASSETS.panelLeft.modernFormat,
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    syncReducedMotion();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncReducedMotion);
      return () => mediaQuery.removeEventListener('change', syncReducedMotion);
    }

    mediaQuery.addListener(syncReducedMotion);
    return () => mediaQuery.removeListener(syncReducedMotion);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(min-width: ${STAGE_BREAKPOINT}px)`);
    const syncStage = () => {
      setIsLandscapeStage(mediaQuery.matches);
    };

    syncStage();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncStage);
      return () => mediaQuery.removeEventListener('change', syncStage);
    }

    mediaQuery.addListener(syncStage);
    return () => mediaQuery.removeListener(syncStage);
  }, []);

  React.useEffect(() => {
    phaseProgressRef.current = phaseProgress;
  }, [phaseProgress]);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const updatePhase = (delta: number, distance: number) => {
      if (!Number.isFinite(delta) || delta === 0) {
        return false;
      }

      if (window.scrollY > 1) {
        return false;
      }

      const currentPhase = phaseProgressRef.current;
      const nextPhase = clamp(currentPhase + delta / distance, 0, 1);

      if (nextPhase === currentPhase) {
        return false;
      }

      phaseProgressRef.current = nextPhase;
      setPhaseProgress(nextPhase);
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (updatePhase(event.deltaY, WHEEL_PHASE_DISTANCE)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      const previousY = touchYRef.current;

      if (previousY == null || nextY == null) {
        return;
      }

      const deltaY = previousY - nextY;
      touchYRef.current = nextY;

      if (updatePhase(deltaY, TOUCH_PHASE_DISTANCE)) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      touchYRef.current = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      let delta = 0;

      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
          delta = KEYBOARD_PHASE_DISTANCE;
          break;
        case 'ArrowUp':
        case 'PageUp':
          delta = -KEYBOARD_PHASE_DISTANCE;
          break;
        case ' ':
          delta = event.shiftKey
            ? -KEYBOARD_PHASE_DISTANCE
            : KEYBOARD_PHASE_DISTANCE;
          break;
        default:
          break;
      }

      if (updatePhase(delta, KEYBOARD_PHASE_DISTANCE)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, {passive: false});
    window.addEventListener('touchstart', handleTouchStart, {passive: true});
    window.addEventListener('touchmove', handleTouchMove, {passive: false});
    window.addEventListener('touchend', handleTouchEnd, {passive: true});
    window.addEventListener('touchcancel', handleTouchEnd, {passive: true});
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const syncBackgroundVideo = React.useCallback(
    (video: HTMLVideoElement | null) => {
      if (!video || isReducedMotion) {
        return;
      }

      const duration =
        Number.isFinite(video.duration) && video.duration > 0
          ? Math.min(video.duration, BACKGROUND_SCRUB_SECONDS)
          : BACKGROUND_SCRUB_SECONDS;
      const targetTime = phaseProgressRef.current * duration;

      try {
        if (Math.abs(video.currentTime - targetTime) > 0.033) {
          video.currentTime = targetTime;
        }
      } catch (error) {
        void error;
      }

      video.pause();
    },
    [isReducedMotion],
  );

  React.useEffect(() => {
    syncBackgroundVideo(backgroundVideoRef.current);
  }, [phaseProgress, syncBackgroundVideo, isLandscapeStage]);

  const handleBackgroundVideoReady = React.useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      syncBackgroundVideo(event.currentTarget);
    },
    [syncBackgroundVideo],
  );

  const copyFade = easeInOutCubic(segment(phaseProgress, 0.02, 0.34));
  const uiPresence = easeOutCubic(segment(phaseProgress, 0.08, 0.9));
  const personProgress = easeInOutCubic(segment(phaseProgress, 0.02, 0.84));
  const personGlowProgress = easeInOutCubic(segment(phaseProgress, 0.12, 0.84));

  const copySceneStyle: React.CSSProperties = {
    opacity: 1 - copyFade,
    transform: `translate3d(0, ${mix(0, 5.8, copyFade).toFixed(3)}%, 0) scale(${mix(
      1,
      0.975,
      copyFade,
    ).toFixed(4)})`,
    pointerEvents: phaseProgress < 0.92 ? 'auto' : 'none',
  };

  const uiSceneStyle: React.CSSProperties = {
    opacity: uiPresence,
    transform: `translate3d(0, ${mix(2.6, 0, uiPresence).toFixed(3)}%, 0) scale(${mix(
      0.988,
      1,
      uiPresence,
    ).toFixed(4)})`,
  };

  const personBaseStyle: React.CSSProperties = {
    transform: `translate3d(0, ${mix(0.95, 0, personProgress).toFixed(3)}%, 0) scale(${mix(
      0.986,
      1,
      personProgress,
    ).toFixed(4)})`,
    filter: `brightness(${mix(0.92, 1.03, personProgress).toFixed(3)}) saturate(${mix(
      1.02,
      1.12,
      personProgress,
    ).toFixed(3)})`,
  };

  const personGlowStyle: React.CSSProperties = {
    opacity: mix(0.08, 0.62, personGlowProgress),
    transform: `translate3d(0, ${mix(0.72, 0, personGlowProgress).toFixed(3)}%, 0) scale(${mix(
      0.992,
      1,
      personGlowProgress,
    ).toFixed(4)})`,
    filter: `brightness(${mix(1.02, 1.28, personGlowProgress).toFixed(3)}) saturate(${mix(
      1.08,
      1.36,
      personGlowProgress,
    ).toFixed(3)})`,
  };

  const panelLeftStyle = buildEntranceStyle(phaseProgress, 0.08, 0.32, {
    fromX: -2.4,
    fromY: 3.2,
    fromScale: 0.95,
    fromRotate: -1.8,
    fromBlur: 7,
  });
  const panelTopStyle = buildEntranceStyle(phaseProgress, 0.3, 0.52, {
    fromY: -2.4,
    fromScale: 0.982,
    fromRotate: -1.1,
    fromBlur: 4,
  });
  const panelRightStyle = buildEntranceStyle(phaseProgress, 0.1, 0.34, {
    fromX: 2.5,
    fromY: 1.8,
    fromScale: 0.955,
    fromRotate: 1.6,
    fromBlur: 6,
  });
  const centerStyle = buildEntranceStyle(phaseProgress, 0.58, 0.88, {
    fromY: 5.2,
    fromScale: 0.82,
    fromRotate: -4,
    fromBlur: 10,
  });
  const panelBottomStyle = buildEntranceStyle(phaseProgress, 0.34, 0.58, {
    fromX: 1.2,
    fromY: 3.6,
    fromScale: 0.94,
    fromRotate: 1.2,
    fromBlur: 7,
  });

  const rootStyle = {
    '--hero-phase': phaseProgress,
    '--hero-background-portrait': `url("${portraitBackgroundUrl}")`,
    '--hero-background-landscape': `url("${landscapeBackgroundUrl}")`,
  } as React.CSSProperties;

  const activeBackgroundPosterUrl =
    isLandscapeStage === true ? landscapeBackgroundUrl : portraitBackgroundUrl;
  const activeBackgroundVideoUrl =
    isLandscapeStage === true
      ? landscapeBackgroundVideoUrl
      : portraitBackgroundVideoUrl;

  return (
    <section
      className={clsx(styles.bannerWrap, {
        [styles.reduceMotion]: isReducedMotion,
      })}
      style={rootStyle}>
      <div className={styles.backgroundFill} aria-hidden="true">
        {!isReducedMotion && isLandscapeStage !== null ? (
          <video
            ref={backgroundVideoRef}
            className={styles.backgroundVideo}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster={activeBackgroundPosterUrl}
            tabIndex={-1}
            onLoadedMetadata={handleBackgroundVideoReady}
            onLoadedData={handleBackgroundVideoReady}>
            <source src={activeBackgroundVideoUrl} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className={styles.foregroundViewport}>
        <div className={styles.foregroundStage}>
          <div className={styles.copyScene} style={copySceneStyle}>
            <div className={styles.title}>{data.banner.title}</div>
            <div className={styles.desc}>{data.banner.desc}</div>
            <div className={styles.ctaWrap}>
              <Button url={data.banner.button.url}>
                {data.banner.button.text}
              </Button>
            </div>
          </div>

          <div className={styles.uiScene} style={uiSceneStyle} aria-hidden="true">
            <div className={styles.uiCanvas}>
              <ResponsiveLayer
                asset={panelTop}
                className={styles.uiTop}
                style={panelTopStyle}
              />
              <ResponsiveLayer
                asset={panelRight}
                className={styles.uiRight}
                style={panelRightStyle}
              />
              <ResponsiveLayer
                asset={panelBottom}
                className={styles.uiBottom}
                style={panelBottomStyle}
              />
              <ResponsiveLayer
                asset={panelLeft}
                className={styles.uiLeft}
                style={panelLeftStyle}
              />
              <ResponsiveLayer
                asset={center}
                className={styles.uiCenter}
                style={centerStyle}
              />
            </div>
          </div>

          <ResponsiveLayer
            asset={personBase}
            className={clsx(styles.personLayer, styles.personBase)}
            style={personBaseStyle}
          />
          <ResponsiveLayer
            asset={personGlow}
            className={clsx(styles.personLayer, styles.personGlow)}
            style={personGlowStyle}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
