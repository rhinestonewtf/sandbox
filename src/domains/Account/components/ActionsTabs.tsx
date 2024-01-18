"use client";

import { useState } from "react";
import { capitalize } from "lodash";
import classnames from "classnames";
import { ReceiveView } from "./ReceiveView";
import { SendFlow } from "../features/SendFlow";

import { SideActions } from "@/src/ui-kit/SideActions";
import { notReachable } from "@/src/utils/notReachable";
import { Layout, ReceiveIcon, SendIcon, SwapIcon } from "@/src/ui-kit";

type Tab = "send" | "receive";

type Props = {
  active: Tab;
  onClose: () => void;
};

export const ActionsTabs = ({ active, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>(active);
  const [transactionSubmitted, setTransactionSubmitted] = useState(false);
  const tabs: Tab[] = ["send", "receive"];

  return (
    <Layout>
      {!transactionSubmitted && (
        <Layout.Actions>
          <SideActions>
            <div className="tabs rounded-lg border border-slate-900 border-opacity-5 px-6 gap-6 text-xs font-medium uppercase font-mono">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={classnames(
                    "flex justify-between tab tab-bordered px-2 gap-2 text-xs",
                    {
                      "!border-transparent text-[#8e85f5]": activeTab !== tab,
                      "tab-active !border-primary text-primary !hover:text-white":
                        activeTab === tab,
                    }
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  <TabIcon
                    tab={tab}
                    color={activeTab === tab ? "#4F41EF" : "#8e85f5"}
                  />
                  {capitalize(tab)}
                </div>
              ))}
            </div>
          </SideActions>
        </Layout.Actions>
      )}

      {(() => {
        switch (activeTab) {
          case "send":
            return (
              <SendFlow
                onClose={onClose}
                onTransactionSubmitted={() => setTransactionSubmitted(true)}
              />
            );
          case "receive":
            return <ReceiveView />;
          default:
            return notReachable(activeTab);
        }
      })()}
    </Layout>
  );
};

const TabIcon = ({ tab, color }: { tab: Tab; color: string }) => {
  switch (tab) {
    case "send":
      return <SendIcon size={12} color={color} />;
    case "receive":
      return <ReceiveIcon size={20} color={color} />;
    default:
      return notReachable(tab);
  }
};
