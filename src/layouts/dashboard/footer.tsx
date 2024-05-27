import Color from "color";
import { CSSProperties } from "react";
import { useSettings } from "@/store/settingStore";
import { useResponsive, useThemeToken } from "@/theme/hooks";


import {
  NAV_COLLAPSED_WIDTH,
  NAV_WIDTH,
  OFFSET_HEADER_HEIGHT,
} from "./config";

import { ThemeLayout } from "#/enum";

type Props = {
  className?: string;
  offsetTop?: boolean;
};
export default function Footer({ className = "" }: Props) {
  const { themeLayout } = useSettings();
  const { colorBgElevated } = useThemeToken();
  const { screenMap } = useResponsive();

  const headerStyle: CSSProperties = {
    position: "fixed",
    borderBottom: "",
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  if (screenMap.md) {
    headerStyle.bottom = "0px";
    headerStyle.right = "0px";
    headerStyle.left = "auto";
    headerStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`;
  } else {
    headerStyle.width = "100vw";
  }

  return (
    <>
      <footer className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="text-gray flex flex-grow items-center justify-center px-4 backdrop-blur xl:px-6 2xl:px-10"
          style={{
            height: "45px",
            transition: "height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        >
          © 2024 All rights reserved. - JEWELRY
        </div>
      </footer>
    </>
  );
}
