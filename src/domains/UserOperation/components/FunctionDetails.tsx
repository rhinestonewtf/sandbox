import { Hex } from "viem";
import { useEffect, useState } from "react";
import { UserOperationActivityStruct } from "../UserOperation";
import { getCalldataFunctionDetails } from "../api/getFuncNameAndParams";

type Props = {
  userOp: UserOperationActivityStruct;
};

export const FunctionDetails = ({ userOp }: Props) => {
  const [funcDetails, setFuncDetails] = useState<
    | {
        name: string;
        params: string[];
        args: string[];
      }
    | undefined
  >();

  useEffect(() => {
    if (userOp.details.length == 1) {
      getFuncDetails(userOp.details[0].funcHash, userOp.details[0].data);
    }
  }, []);

  const getFuncDetails = async (funcHash: string, callData: Hex) => {
    setFuncDetails(undefined);
    if (funcHash == "") return;
    const functionDetails = await getCalldataFunctionDetails(
      funcHash,
      callData
    );
    if (functionDetails) {
      setFuncDetails(functionDetails);
    }
  };
  return funcDetails ? (
    <div className="flex flex-col gap-2 border border-slate-300 rounded p-4">
      <div className="flex justify-between">
        <div className="text-slate-500">Function</div>
      </div>
      <div className="flex justify-between">
        <div>Name</div>
        <div className="">{funcDetails.name.split("(")[0]}</div>
      </div>
      {funcDetails.args &&
        funcDetails.params.map((param, idx) => {
          return (
            <div className="flex justify-between" key={idx}>
              <div>{param}</div>
              <div
                className="overflow-scroll"
                data-tip={funcDetails.params[idx].toString()}
              >
                <div>
                  {funcDetails.args[idx].toString().slice(0, 60)}{" "}
                  {funcDetails.args[idx].toString().length > 60 && "..."}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  ) : null;
};
