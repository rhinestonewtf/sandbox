"use client";

import { Address } from "viem";
import QRCode from "react-qr-code";
import { useActiveAccount } from "../hooks";
import { SideHeader } from "@/src/ui-kit/SideHeader";
import { Button, CopyIcon, Layout } from "@/src/ui-kit";

export const ReceiveView = () => {
  const [activeAccount] = useActiveAccount();

  return (
    <Layout>
      <Layout.Header>
        <SideHeader
          title="Receive crypto"
          subTitle="Scan the QR code or share your address"
        />
      </Layout.Header>

      <Layout.Content>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-[#E55C3E]">
            Only send Ethereum/L2 assets to this address
          </div>
          <div className="flex flex-col items-center mt-8 rounded-xl border border-slate-900 border-opacity-5 w-[320px] h-[446px]">
            <QRCode
              value={activeAccount.address as Address}
              size={240}
              className="mt-10 overflow-hidden whitespace-pre-wrap"
            />
            <div className="w-[240px] mt-4 break-words">
              {activeAccount.address}
            </div>
            <Button
              className="flex items-center bg-neutral-50 w-[139px] h-[36px] btn-xs text-slate-900 font-medium gap-2 font-mono mt-[26px]"
              onClick={() =>
                activeAccount &&
                navigator.clipboard.writeText(activeAccount.address)
              }
            >
              <CopyIcon />
              Copy address
            </Button>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};
