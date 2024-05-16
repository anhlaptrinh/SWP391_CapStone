import { Content } from 'antd/es/layout/layout';
import { CSSProperties, forwardRef } from 'react';

import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/theme/hooks';

import { NAV_WIDTH, HEADER_HEIGHT, MULTI_TABS_HEIGHT, NAV_COLLAPSED_WIDTH } from './config';
import MultiTabs from './multi-tabs';

import { ThemeLayout } from '#/enum';

type Props = {
  offsetTop?: boolean;
};
const Main = forwardRef<HTMLDivElement, Props>(({ offsetTop = false }, ref) => {
  const { themeLayout } = useSettings();
  const { screenMap } = useResponsive();

  const mainStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT + MULTI_TABS_HEIGHT,
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
    backgroundColor: '#fafafa',
  };
  if (themeLayout === ThemeLayout.Horizontal) {
    mainStyle.width = '100vw';
    mainStyle.paddingTop = MULTI_TABS_HEIGHT;
  } else if (screenMap.md) {
    mainStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_COLLAPSED_WIDTH : NAV_WIDTH
    })`;
  } else {
    mainStyle.width = '100vw';
  }
  return (
    <Content ref={ref} style={mainStyle} className="flex overflow-auto">
      <div className="m-auto h-full w-full flex-grow sm:p-2 xl:max-w-screen-xl">
        <MultiTabs offsetTop={offsetTop} />
      </div>
    </Content>
  );
});

export default Main;
