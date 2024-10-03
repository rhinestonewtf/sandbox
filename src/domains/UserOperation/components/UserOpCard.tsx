import { formatEther } from "viem";
import { sumUserOpValues } from "../helpers";
import { FunctionDetails } from "./FunctionDetails";
import { useActiveNetwork } from "../../Network/hooks";
import { UserOperationActivityStruct } from "../UserOperation";
import { InteractActivityIcon, SendActivityIcon } from "@/src/ui-kit/Icons";

type Props = {
  userOp: UserOperationActivityStruct;
};

export const UserOpCard = ({ userOp }: Props) => {
  const [activeNetwork] = useActiveNetwork();

  return (
    <div tabIndex={0} className="collapse focus:bg-base-200 hover:bg-base-200">
      <div className="collapse-title p-4">
        <div className="flex gap-2 items-center justify-center w-full">
          <div className="flex flex-1 gap-3">
            <div className="self-center text-2xl">
              {userOp.details[0].isContractInteraction ? (
                <InteractActivityIcon size={48} />
              ) : (
                <SendActivityIcon size={48} />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-neutral-dark text-base font-medium font-oatmealProMedium">
                {userOp.title}
              </div>
              <div className="opacity-50 text-neutral-dark text-base font-normal">
                {userOp.time}, {userOp.success ? "Included" : "Processing..."}
              </div>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-right text-neutral-dark font-medium text-sm font-oatmealProMedium">
              {sumUserOpValues(userOp.details)} {userOp.symbol}
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content flex flex-col gap-2">
        <div className="flex flex-col gap-2 border border-slate-200 rounded-xl p-4">
          <div className="flex justify-between">
            <div className="text-slate-500">Transaction details</div>
            <div
              className="link"
              onClick={() => {
                window.open(
                  `${activeNetwork.blockExplorerUrl}/tx/${userOp.transactionHash}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              View on {activeNetwork.explorerName}
            </div>
          </div>

          {userOp.details.length == 1 && (
            <div className="flex justify-between">
              <div>Transfer to</div>
              <div className="">{userOp.details[0].to}</div>
            </div>
          )}

          <div className="flex justify-between">
            <div>Gas Fee</div>
            <div className="">
              {formatEther(BigInt(userOp.actualGasCost))} {userOp.symbol}
            </div>
          </div>
        </div>

        {userOp.details.length > 1 && (
          <div className="flex flex-col gap-2 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col justify-between">
              <div className="text-slate-500">
                Transactions included in this batch
              </div>
              <div className="flex flex-col mt-4">
                {userOp.details.map((detail, index) => (
                  <div
                    className="flex gap-2 border-b-[2px] border-base-200 items-center justify-center join-item w-full pb-4"
                    key={index}
                  >
                    <div className="flex-1">
                      <div className="flex flex-col gap-1">
                        <div className="text-left">{detail.title}</div>
                        <div className="text-slate-500">
                          {userOp.time},{" "}
                          {userOp.success ? "Included" : "Processing..."}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <div className="">
                        {detail.value} {userOp.symbol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <FunctionDetails userOp={userOp} />
      </div>
    </div>
  );
};
