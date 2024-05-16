import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';

import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from './theme';

type Props = {
  children: React.ReactNode;
};
export default function AntdConfig({ children }: Props) {

  const algorithm = theme.defaultAlgorithm;
  const colorPrimary = colorPrimarys.default;

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken.light.token },
        components: { ...customComponentConfig, ...themeModeToken.light.components },
        algorithm,
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
