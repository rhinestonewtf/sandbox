import { useContext } from "react";
import { useActiveAccount } from "../hooks";
import { ActiveNetworkContext } from "@/src/context";
import { mintToken } from "../../Token/ERC20Token/api";
import { getCoinFromFaucet } from "../../Network/helpers/faucet";
import { useQueueTransactions } from "../../Transaction/hooks/useQueueTransactions";
import {
  AssetsIcon,
  USDCIcon,
  USDTIcon,
  Button,
  EtherIcon,
} from "@/src/ui-kit";
import {
  USDC_TOKEN_CONTRACT,
  USDT_TOKEN_CONTRACT,
} from "@/src/constants/constants";

export const ClaimButton = () => {
  const [activeAccount] = useActiveAccount();
  const { activeNetwork } = useContext(ActiveNetworkContext);
  const queueTransaction = useQueueTransactions();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button">
        <Button className="bg-white w-[92px] h-[36px] btn-xs gap-1 pl-0 font-medium border-slate-900 border-opacity-5">
          <AssetsIcon isActive color="#05003B" />
          Claim
        </Button>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-1 rounded-lg bg-white border-base-300 border w-[240px] mt-2"
        style={{
          boxShadow:
            "0px 40px 80px 0px rgba(5, 0, 59, 0.02), 0px 8px 24px 0px rgba(5, 0, 59, 0.02)",
        }}
      >
        <li className="!p-0">
          <a
            onClick={() => {
              queueTransaction({
                icon: <EtherIcon size={50} />,
                name: `Receive 0.1 ${activeNetwork.nativeCurrency.symbol}`,
                transactionFunc: () =>
                  getCoinFromFaucet(
                    activeNetwork,
                    "0.1",
                    activeAccount.address
                  ),
              });
            }}
          >
            <EtherIcon />
            Claim 0.1 {activeNetwork.nativeCurrency.symbol}
          </a>
        </li>
        <li className="!p-0">
          <a
            onClick={() => {
              queueTransaction({
                name: "Mint 10 USDC",
                icon: <USDCIcon size={50} />,
                transactionFunc: () =>
                  mintToken(
                    USDC_TOKEN_CONTRACT,
                    activeAccount.address,
                    "10",
                    activeNetwork
                  ),
              });
            }}
          >
            <USDCIcon />
            Claim 10 USDC
          </a>
        </li>
        <li className="!p-0">
          <a
            onClick={() => {
              queueTransaction({
                name: "Mint 10 USDT",
                icon: <USDTIcon size={50} />,
                transactionFunc: () =>
                  mintToken(
                    USDT_TOKEN_CONTRACT,
                    activeAccount.address,
                    "10",
                    activeNetwork
                  ),
              });
            }}
          >
            <USDTIcon />
            Claim 10 USDT
          </a>
        </li>
      </ul>
    </div>
  );
};
