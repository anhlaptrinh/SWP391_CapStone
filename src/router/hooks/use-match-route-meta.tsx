import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { useFlattenedRoutes } from './use-flattened-routes';
import { useRouter } from './use-router';

import { RouteMeta } from '#/router';

export function useMatchRouteMeta() {
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();

  const children = useOutlet();

  const matchs = useMatches();

  const flattenedRoutes = useFlattenedRoutes();

  // const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { push } = useRouter();

  useEffect(() => {
    const lastRoute = matchs.at(-1);

    const currentRouteMeta = flattenedRoutes.find(
      (item) => item.key === lastRoute?.pathname || `${item.key}/` === lastRoute?.pathname,
    );
    if (currentRouteMeta) {
      if (!currentRouteMeta.hideTab) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      }
    } else {
      // push(HOMEPAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchs]);

  return matchRouteMeta;
}
