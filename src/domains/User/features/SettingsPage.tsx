"use client";

import { useState } from "react";
import { SideDrawer } from "@/src/components";
import { SignIcon, LoginIcon } from "@/src/ui-kit";
import { notReachable } from "@/src/utils/notReachable";
import { Item, SectionHeader, Card } from "@/src/ui-kit";
import { useActiveValidator } from "../../Account/hooks";
import { ValidatorSwitcher } from "../../Account/components";
import { ConfigureValidatorFlow } from "./ConfigureValidatorFlow";

type SideViewState =
  | {
      type: "closed";
    }
  | {
      type: "add_validator_open";
    };

const SettingsPage = () => {
  const [activeValidator, setActiveValidator] = useActiveValidator();
  const [sideViewState, setSideViewState] = useState<SideViewState>({
    type: "closed",
  });

  return (
    <>
      <div className="my-10">
        <SectionHeader title="Security" />
        <div className="mt-6" />
        <div className="flex flex-col gap-3 mt-4 divide-y divide-base-300">
          <div>
            <Item
              icon={<LoginIcon />}
              title="Login method"
              value="WalletConnect"
              className="border-none !p-0 h-10"
            />
          </div>
          <div className="pt-3">
            <Item
              icon={<SignIcon />}
              className="border-none !p-0 h-10"
              title="Sign with"
              value={
                <ValidatorSwitcher
                  selectedValidator={activeValidator.name}
                  onChange={setActiveValidator}
                  onAddSignerClick={() => {
                    setSideViewState({ type: "add_validator_open" });
                  }}
                />
              }
            />
          </div>
        </div>
      </div>

      <div className="my-14">
        <SectionHeader title="Get help" />
        <div className="mt-6" />

        <div className="flex gap-4">
          <Card
            icon={<div className="w-12 h-12 rounded-full bg-base-300 mb-8" />}
            title="Read our F.A.Q"
            description="Learn more about the Rhinestone Wallet and what powers the Rhinestone applications"
            onClick={() => {}}
          />
          <Card
            icon={<div className="w-12 h-12 rounded-full bg-base-300 mb-8" />}
            title="Contact us"
            description="If you need to solve an issue with your wallet. We promise to get back to you within 48 hours."
            onClick={() => {}}
          />
        </div>
      </div>

      <SideDrawer
        title=""
        isOpen={sideViewState.type !== "closed"}
        onClose={() => setSideViewState({ type: "closed" })}
      >
        {(() => {
          switch (sideViewState.type) {
            case "add_validator_open":
              return (
                <ConfigureValidatorFlow
                  onClose={() => setSideViewState({ type: "closed" })}
                />
              );
            case "closed":
              return null;
            default:
              return notReachable(sideViewState);
          }
        })()}
      </SideDrawer>
    </>
  );
};

export default SettingsPage;
