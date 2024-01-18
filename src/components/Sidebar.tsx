"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { useMemo } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { PendingUserOpsList } from "../domains/UserOperation/components";
import { PendingTransactionsList } from "../domains/Transaction/components";
import {
  DashboardIcon,
  ModulesIcon,
  AssetsIcon,
  ActivityIcon,
  SettingsIcon,
} from "../ui-kit/Icons";

const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    link: "/",
    icon: DashboardIcon,
  },
  { id: 4, label: "Activity", icon: ActivityIcon, link: "/activity" },
];

const ICON_COLOR = "#666482";
const ACTIVE_ICON_COLOR = "#4F41EF";

export const Sidebar = () => {
  const pathname = usePathname();
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  return (
    <div className="px-4 pt-4 bg-background w-64 h-screen sticky top-0 z-[100]">
      <div>
        <Logo />
        <div className="flex flex-col gap-4 mt-[84px]">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            return (
              <Link
                href={menu.link}
                className={classNames(
                  "flex cursor-pointer hover:!bg-secondary rounded-lg h-10",
                  {
                    "text-primary bg-secondary border-[1px] border-primary border-opacity-[2%]":
                      activeMenu?.id === menu.id,
                    "text-gray-800": activeMenu?.id !== menu.id,
                  }
                )}
                key={menu.id}
              >
                <div className="flex m-2 items-center gap-3">
                  <Icon
                    color={
                      activeMenu?.id === menu.id
                        ? ACTIVE_ICON_COLOR
                        : ICON_COLOR
                    }
                    isActive={activeMenu?.id === menu.id}
                  />
                  <span className="text-sm font-medium font-oatmealProMedium">
                    {menu.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-5 left-0 w-full px-4">
        <PendingTransactionsList />
        <PendingUserOpsList />
      </div>
    </div>
  );
};
