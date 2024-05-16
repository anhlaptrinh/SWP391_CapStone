import { useCallback, useEffect, useState } from 'react';

import { useMatchRouteMeta, useRouter } from '@/router/hooks';

import { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children: any;
};
export default function useKeepAlive() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const { push } = useRouter();
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();
  const currentRouteMeta = useMatchRouteMeta();

  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      if (tabs.length === 1) return;
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);
      if (deleteTabIndex > 0) {
        push(tabs[deleteTabIndex - 1].key);
      } else {
        push(tabs[deleteTabIndex + 1].key);
      }

      tabs.splice(deleteTabIndex, 1);
      setTabs([...tabs]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTabRoutePath],
  );
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.key === path));
    },
    [activeTabRoutePath],
  );

  const closeAll = useCallback(() => {
    setTabs([]);
    push(HOMEPAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push]);

  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(currentTabIndex);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );

  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabs.findIndex((item) => item.key === path);
      const newTabs = tabs.slice(0, currentTabIndex + 1);
      setTabs(newTabs);
      push(path);
    },
    [push, tabs],
  );
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.key === path);

        if (index >= 0) {
          prev[index].timeStamp = getKey();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath],
  );

  useEffect(() => {
    if (!currentRouteMeta) return;
    const existed = tabs.find((item) => item.key === currentRouteMeta.key);
    if (!existed) {
      setTabs((prev) => [
        ...prev,
        { ...currentRouteMeta, children: currentRouteMeta.outlet, timeStamp: getKey() },
      ]);
    }

    setActiveTabRoutePath(currentRouteMeta.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteMeta]);

  return {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTab,
    closeOthersTab,
    refreshTab,
    closeAll,
    closeLeft,
    closeRight,
  };
}

function getKey() {
  return new Date().getTime().toString();
}
