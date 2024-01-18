import Image from "next/image";
import { useContext } from "react";
import { ActiveNetworkContext } from "@/src/context";
import { useActiveAccount } from "../../Account/hooks";
import { AssetsIcon, Button, MintNFTIcon } from "@/src/ui-kit";
import { getCoinFromFaucet } from "../../Network/helpers/faucet";
import { useQueueTransactions } from "../../Transaction/hooks/useQueueTransactions";

type Props = {
  title?: string;
};

export const EmptyView = ({ title }: Props) => {
  const [activeAccount] = useActiveAccount();
  const { activeNetwork } = useContext(ActiveNetworkContext);
  const queueTransaction = useQueueTransactions();

  return (
    <div className="w-[768px] h-[480px] relative rounded-2xl border border-neutral-dark border-opacity-5 flex flex-col items-center justify-center text-center">
      <Image
        width={200}
        height={200}
        alt=""
        src="/modules.png"
        className="mix-blend-darken"
      />

      <div className="font-medium text-2xl text-neutral-dark mt-3 font-oatmealProMedium">
        {title || `You don't have any assets`}
      </div>
      <div className="text-base font-normal text-neutral-dark mt-1">
        Claim some tokens or NFTs to start testing the Rhinestone Wallet
      </div>

      <div className="flex mt-[52px] gap-4">
        <Button
          className="bg-neutral-dark hover:bg-neutral-dark hover:border-none text-white w-[146px] h-[36px] btn-xs pl-0 font-medium border-slate-900 border-opacity-5 gap-2"
          onClick={() => {
            queueTransaction({
              name: `Receive 0.1 ${activeNetwork.nativeCurrency.symbol}`,
              transactionFunc: () =>
                getCoinFromFaucet(activeNetwork, "0.1", activeAccount.address),
            });
          }}
        >
          <AssetsIcon isActive color="#ffffff" fill="#05003B" size={24} />
          Claim Tokens
        </Button>
      </div>
    </div>
  );
};
