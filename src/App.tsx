import { App as AntdApp } from "antd";

import Router from "@/router/index";
import AntdConfig from "@/theme/antd";

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <Router />
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
