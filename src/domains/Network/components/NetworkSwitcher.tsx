"use client";

import { useConfig } from "wagmi";
import { Dropdown } from "@/src/ui-kit";
import { networks } from "../api/networks";
import { useContext, useEffect } from "react";
import { EtherIcon, PolygonIcon } from "@/src/ui-kit/Icons";
import { ActiveNetworkContext } from "@/src/context/activeNetwork";

type Props = {
  className?: string;
  width?: string;
};

const getNetworkIcon = (networkId: number) => {
  switch (networkId) {
    case 80001:
      return <PolygonIcon size={20} />;
    case 11_155_111:
      return <EtherIcon size={20} />;
    default:
      return null;
  }
};

export const NetworkSwitcher = ({ className, width }: Props) => {
  const { activeNetwork, setActiveNetwork } = useContext(ActiveNetworkContext);
  const config = useConfig();

  return (
    <Dropdown
      highlightSelected
      className={`dropdown-end dropdown-text p-2 ${className}`}
      width={width}
      items={networks.map((network) => {
        return {
          label: (
            <>
              {getNetworkIcon(network.id)}
              {network.name}
            </>
          ),
          value: network.id.toString(),
        };
      })}
      selectedItem={
        activeNetwork ? activeNetwork.id.toString() : networks[0].id.toString()
      }
      onChange={(value) => {
        setActiveNetwork(networks.find((n) => n.id.toString() === value)!);
      }}
    />
  );
};
