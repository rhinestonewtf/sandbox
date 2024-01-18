"use client";

import { UserOpCard } from "../components";
import { SectionHeader, Spinner } from "@/src/ui-kit";
import { InfoMessage } from "@/src/ui-kit/InfoMessage";
import { useGetAccountActivity } from "../api/getAddressActivity";

export function ActivityPage() {
  const { data: groupedUserOps } = useGetAccountActivity();

  if (!groupedUserOps) return <Spinner />;

  return Object.keys(groupedUserOps).length > 0 ? (
    <>
      {Object.keys(groupedUserOps).map((groupTitle, index) => {
        return (
          <div className="my-12" key={index}>
            <SectionHeader title={groupTitle} />
            <div className="flex flex-col mt-4 divide-y divide-base-300">
              {groupedUserOps[groupTitle].map((userOp, index) => (
                <div key={index}>
                  <UserOpCard userOp={userOp} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  ) : (
    <div />
  );
}
