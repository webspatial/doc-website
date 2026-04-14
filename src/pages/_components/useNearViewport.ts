import React from 'react';

type Options = {
  rootMargin?: string;
};

export function useNearViewport<T extends Element>({
  rootMargin = '360px 0px',
}: Options = {}) {
  const ref = React.useRef<T | null>(null);
  const [isNearViewport, setIsNearViewport] = React.useState(false);

  React.useEffect(() => {
    if (isNearViewport) {
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (!firstEntry) {
          return;
        }

        if (firstEntry.isIntersecting || firstEntry.intersectionRatio > 0) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      {rootMargin},
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isNearViewport, rootMargin]);

  return {ref, isNearViewport};
}
