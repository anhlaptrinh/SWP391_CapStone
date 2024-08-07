import { lazy } from "react";
import {
  Navigate,
  RouteObject,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import DashboardLayout from "@/layouts/dashboard";
import AuthGuard from "@/router/components/auth-guard";
import { usePermissionRoutes } from "@/router/hooks";
import { ErrorRoutes } from "@/router/routes/error-routes";

import { AppRouteObject } from "#/router";

import { GoldPriceTableShow } from "@/layouts/dashboard/goldPrice2";
import PaymentSuccess from "@/pages/payment/paymentsuccess";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/sys/login/Login")),
};

const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  const asyncRoutes: AppRouteObject = {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Navigate to={HOMEPAGE} replace /> },
      ...permissionRoutes,
    ],
  };
    const goldPriceAsyncRoutes: AppRouteObject = {
      path: "/goldPrice",
      element: (
        <AuthGuard>
          <GoldPriceTableShow />
        </AuthGuard>
      ),
    };
    const PaymentRoute: AppRouteObject = {
      path: "/payment/success",
      element: (
        <AuthGuard>
          <PaymentSuccess  />
        </AuthGuard>
      ),
    };
    
    
  const routes = [
    LoginRoute,
    asyncRoutes,
    PaymentRoute,
    ErrorRoutes,
    goldPriceAsyncRoutes,
    PAGE_NOT_FOUND_ROUTE,
  ];

  const router = createHashRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
}
