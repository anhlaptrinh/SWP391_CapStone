import { App as AntdApp } from "antd";

import Router from "@/router/index";
import AntdConfig from "@/theme/antd";
import { Route } from "react-router-dom";
import PaymentSuccess from "./pages/payment/paymentsuccess";

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <Router />
        {/* <Route path="/payment/success" element={<PaymentSuccess />} /> */}
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
