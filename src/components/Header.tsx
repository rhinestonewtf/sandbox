"use client";
import { PageTitle } from "./PageTitle";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "../domains/Account/hooks";
import { AccountSwitcher } from "@/src/domains/Account/components";
import { GasPrice, NetworkSwitcher } from "@/src/domains/Network/components";

export const Header = () => {
  const pathname = usePathname();
  const [activeAccount] = useActiveAccount();

  return (
    <div className="navbar p-0 mb-[74px] sticky top-0 bg-background z-30">
      <div className="flex-1">
        <PageTitle>{getPageName(pathname!)}</PageTitle>
      </div>
      {activeAccount.address && (
        <>
          <GasPrice className="mr-3 dropdown-text border-none" />
          <div className="">
            <NetworkSwitcher width="w-[200px]" />
          </div>
          <AccountSwitcher />
        </>
      )}
    </div>
  );
};

const getPageName = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Playground";
    case "/activity":
      return "Playground Activity";
    default:
      return "Playground";
  }
};
