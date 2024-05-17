import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import Color from "color";
import { CSSProperties, useEffect, useState } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";

import LogoImg from "@/assets/images/logo/logo-no-background.png";
import curved from "@/assets/images/characters/white-curved.jpeg";
import Scrollbar from "@/components/scrollbar";
import { useRouteToMenuFn, usePermissionRoutes } from "@/router/hooks";
import { menuFilter } from "@/router/utils";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { useThemeToken } from "@/theme/hooks";

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from "./config";

import { ThemeLayout } from "#/enum";
import { Iconify } from "@/components/icon";
import { GoldPriceTable } from "./goldPrice";

// import { ThemeLayout } from '#/enum';

type Props = {
  closeSideBarDrawer?: () => void;
};
export default function Nav(props: Props) {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorTextBase, colorBgElevated, colorBorder } = useThemeToken();

  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };

  const routeToMenuFn = useRouteToMenuFn();
  const permissionRoutes = usePermissionRoutes();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);
  const [menuList, setMenuList] = useState<ItemType[]>([]);
  const [menuMode, setMenuMode] = useState<MenuProps["mode"]>("inline");
  const [showGoldPrice, setShowGoldPrice] = useState(false);
  useEffect(() => {
    const openKeys = matches
      .filter((match) => match.pathname !== "/")
      .map((match) => match.pathname);
    setOpenKeys(openKeys);

    setSelectedKeys([pathname]);
  }, [pathname, matches, collapsed]);

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    const menus = routeToMenuFn(menuRoutes);
    setMenuList(menus);
  }, [permissionRoutes, routeToMenuFn]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);
      setMenuMode("inline");
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
      setMenuMode("inline");
    }
  }, [themeLayout]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
    }
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
    props?.closeSideBarDrawer?.();
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapsed = () => {
    if (!collapsed) {
      setThemeLayout(ThemeLayout.Mini);
    } else {
      setThemeLayout(ThemeLayout.Vertical);
    }
    setCollapsed(!collapsed);
  };
  const closeGoldPrice = async () => {
    setShowGoldPrice(false);
  };
  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        {collapsed ? (
          <img src={LogoImg} alt="" className="w-20 p-4" />
        ) : (
          <>
            <h1 className="home-page__heading">
              <span>JEWELRY</span>
            </h1>
            <img src={LogoImg} alt="" className="w-20 p-4" />
          </>
        )}
        <button
          onClick={toggleCollapsed}
          className="!text-gray absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center md:block"
          style={{
            color: colorTextBase,
            borderColor: colorTextBase,
            fontSize: 16,
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined size={20} />
          ) : (
            <MenuFoldOutlined size={20} />
          )}
        </button>
      </div>

      <Scrollbar
        style={{
          height: "calc(100vh - 70px)",
        }}
      >
        <Menu
          mode={menuMode}
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
          style={menuStyle}
          inlineCollapsed={collapsed}
        />
      </Scrollbar>
      <div className="m-4">
        <div
          className="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']"
          sidenav-card
        >
          <div
            className="mb-7.5 absolute h-full w-full rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${curved})` }}
          ></div>
          {collapsed ? (
            <div className="relative z-20 flex-auto w-full p-2 text-left text-white flex items-center justify-center">
              <div className="flex items-center justify-center w-8 h-8 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
                <i className="top-0 z-10 text-lg leading-none text-transparent ni ni-diamond bg-gradient-to-tl from-slate-600 to-slate-300 bg-clip-text opacity-80">
                  <Iconify icon="twemoji:diamond-with-a-dot" size={18} />
                </i>
              </div>
            </div>
          ) : (
            <div className="relative z-20 flex-auto w-full p-4 text-left text-white">
              <div className="flex items-center justify-center w-8 h-8 mb-4 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
                <i className="top-0 z-10 text-lg leading-none text-transparent ni ni-diamond bg-gradient-to-tl from-slate-600 to-slate-300 bg-clip-text opacity-80">
                  <Iconify icon="twemoji:diamond-with-a-dot" size={18} />
                </i>
              </div>
              <div className="transition-all duration-200 ease-nav-brand">
                <h6 className="mb-0 text-white">gold price list?</h6>
                <p className="mt-0 mb-4 text-xs font-semibold leading-tight">
                  Please check our docs
                </p>
                <Button type="primary" htmlType="submit" className="w-full" onClick={() => setShowGoldPrice(true)}>
                  SEE MORE
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showGoldPrice && <GoldPriceTable onClose={closeGoldPrice} />}
    </div>
  );
}
