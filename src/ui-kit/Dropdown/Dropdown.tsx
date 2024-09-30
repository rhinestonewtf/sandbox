"use client";

import classNames from "classnames";
import { AssetsIcon, CheckedIcon } from "../Icons";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  items: {
    label: ReactNode;
    value: string;
  }[];
  selectedItem: string;
  bordered?: boolean;
  className?: string;
  variant?: "small" | "large";
  width?: string;
  position?: string;
  highlightSelected?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const Dropdown = ({
  items,
  className = "",
  selectedItem,
  width = "w-full",
  disabled = false,
  highlightSelected = false,
  onChange,
}: Props) => {
  const [selected, setSelected] = useState(
    items.find((item) => item.value === selectedItem)?.label
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelected(items.find((item) => item.value === selectedItem)?.label);
  }, [selectedItem]);

  return (
    <div
      className={classNames(
        "dropdown w-full font-mono uppercase text-slate-900 text-xs font-medium bg-neutral-50 rounded-xl border border-slate-900 border-opacity-0",
        { [className]: !!className }
      )}
    >
      <div
        className={classNames("flex h-6 hover:cursor-pointer items-center", {
          "!text-gray-400": disabled,
        })}
        tabIndex={0}
        onClick={() => !disabled && setIsOpen(true)}
      >
        <label className="flex hover:cursor-pointer p-0 !m-0 w-full h-6">
          <span className="flex-1 flex items-center gap-2">{selected}</span>
        </label>
        <MdKeyboardArrowDown size="20" />
      </div>

      {isOpen && (
        <ul
          tabIndex={0}
          className={classNames(
            "dropdown-content z-[1] menu !p-1 rounded-lg bg-white border-base-300 border min-w-min font-mono",
            {
              [width]: !!width,
            }
          )}
          style={{
            boxShadow:
              "0px 40px 80px 0px rgba(5, 0, 59, 0.02), 0px 8px 24px 0px rgba(5, 0, 59, 0.02)",
          }}
        >
          {items.map((item, index) => {
            return (
              <li key={index} className="flex w-full !p-0 !rounded">
                <a
                  className={classNames({
                    selected: highlightSelected && selectedItem === item.value,
                  })}
                  onClick={() => {
                    if (item.value) {
                      setSelected(item.label);
                      setIsOpen(false);
                    }
                    onChange(item.value);
                  }}
                >
                  {item.label}
                  {highlightSelected && selectedItem === item.value && (
                    <CheckedIcon bgColor="#EFEDFE" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
