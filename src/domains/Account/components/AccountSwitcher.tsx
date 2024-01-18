"use client";

import { useContext } from "react";
import classNames from "classnames";
import { useActiveAccount } from "../hooks";
import { formatAddress } from "@/src/utils/common";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CopyIcon } from "@/src/ui-kit/Icons";

export const AccountSwitcher = () => {
  const [activeAccount] = useActiveAccount();

  const copyAddress = () => {
    if (!activeAccount) return;
    navigator.clipboard.writeText(activeAccount.address);
  };

  return (
    <div
      className={classNames(
        "dropdown font-mono uppercase text-slate-900 text-xs font-medium bg-neutral-50 p-2 rounded-xl border border-slate-900 border-opacity-0"
      )}
    >
      <div className="flex h-6 hover:cursor-pointer items-center" tabIndex={0}>
        <label className="flex hover:cursor-pointer p-0 !m-0 w-full h-6">
          <span className="flex-1 flex items-center gap-2">
            {activeAccount && formatAddress(activeAccount.address)}
          </span>
        </label>
        <MdKeyboardArrowDown size="22" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 py-1 rounded-lg shadow bg-white border-base-300 border w-[240px]"
      >
        <li className="flex justify-center">
          <a onClick={copyAddress} className="">
            <CopyIcon />
            Copy address
          </a>
        </li>
      </ul>
    </div>
  );
};
