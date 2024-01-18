"use client";

import { SectionHeader } from "@/src/ui-kit";
import { EmptyView } from "../components/EmptyView";
import { TokensList } from "../components/TokensList";
import { useActiveAccount } from "../../Account/hooks";

export const AssetsPage = () => {
  const [{ tokens }] = useActiveAccount();

  if (!tokens.length) {
    return <EmptyView />;
  }

  return (
    <>
      <div className="my-10">
        <SectionHeader title="Tokens" />
        <div className="mt-6" />
        <TokensList tokens={tokens} />
      </div>
    </>
  );
};
