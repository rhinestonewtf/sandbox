"use client";

import { Dropdown } from "@/src/ui-kit";
import { networks } from "../api/networks";
import { useContext, useEffect } from "react";
import { PolygonIcon } from "@/src/ui-kit/Icons";
import { ConnectorData, useAccount } from "wagmi";
import { ActiveNetworkContext } from "@/src/context/activeNetwork";

type Props = {
  className?: string;
  width?: string;
};

const getNetworkIcon = (networkId: number) => {
  switch (networkId) {
    case 80001:
      return <PolygonIcon size={20} />;
    default:
      return null;
  }
};

export const NetworkSwitcher = ({ className, width }: Props) => {
  const { connector: activeConnector } = useAccount();
  const { activeNetwork, setActiveNetwork } = useContext(ActiveNetworkContext);

  useEffect(() => {
    const handleConnectorUpdate = ({ account, chain }: ConnectorData) => {
      if (chain) {
        console.log("chain changed", chain);
      }
    };

    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate);
    }

    if (!activeNetwork) {
      setActiveNetwork(networks[0]);
    }

    return () => activeConnector?.off("change", handleConnectorUpdate) as any;
  }, [activeConnector]);

  return (
    <Dropdown
      className={`dropdown-text p-2 ${className}`}
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
