import { useScroll } from 'framer-motion';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CircleLoading } from '@/components/loading';
import ProgressBar from '@/components/progress-bar';
import { useThemeToken } from '@/theme/hooks';

import Header from './header';
import Nav from './nav';

import { ThemeMode } from '#/enum';

function Layout({ Component }: any) {
  const { colorTextBase } = useThemeToken();

  const mainEl = useRef(null);
  const { scrollY } = useScroll({ container: mainEl });
  const [offsetTop, setOffsetTop] = useState(false);
  const onOffSetTop = useCallback(() => {
    scrollY.on('change', (scrollHeight) => {
      if (scrollHeight > 0) {
        setOffsetTop(true);
      } else {
        setOffsetTop(false);
      }
    });
  }, [scrollY]);

  useEffect(() => {
    onOffSetTop();
  }, [onOffSetTop]);

  const verticalLayout = (
    <>
      <Header offsetTop={offsetTop} />
      <div className="z-50 hidden h-full flex-shrink-0 md:block">
        <Nav />
      </div>
      <main
        className="flex overflow-auto"
        style={{
          paddingTop: '112px',
          transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          width: '100vw',
        }}
      >
        <div className="m-auto h-full w-full flex-grow sm:p-2 xl:max-w-screen-xl">{Component}</div>
      </main>
    </>
  );


  const layout = verticalLayout;

  return (
    <StyleWrapper $themeMode={ThemeMode.Light}>
      <ProgressBar />

      <div
        className="flex h-screen overflow-hidden"
        style={{
          color: colorTextBase,
          // background: '#EB1111',
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>{layout}</Suspense>
      </div>
    </StyleWrapper>
  );
}
export default Layout;

const StyleWrapper = styled.div<{ $themeMode?: ThemeMode }>`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#2c2c2c' : '#FAFAFA')};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#6b6b6b' : '#C1C1C1')};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.$themeMode === ThemeMode.Dark ? '#939393' : '##7D7D7D')};
  }
`;
