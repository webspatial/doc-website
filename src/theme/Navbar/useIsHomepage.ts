import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

function normalizePath(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
}

export default function useIsHomepage(): boolean {
  const location = useLocation();
  const homepagePath = useBaseUrl('/');

  return normalizePath(location.pathname) === normalizePath(homepagePath);
}
