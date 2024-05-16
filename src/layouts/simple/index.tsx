import React from 'react';

import { useThemeToken } from '@/theme/hooks';

type Props = {
  children: React.ReactNode;
};
export default function SimpleLayout({ children }: Props) {
  const { colorBgElevated, colorTextBase } = useThemeToken();
  return (
    <div
      className="flex h-screen w-full flex-col"
      style={{
        color: colorTextBase,
        background: colorBgElevated,
      }}
    >
      {children}
    </div>
  );
}
