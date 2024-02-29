import { UserOpCard } from "./UserOpCard";
import { InfoMessage } from "@/src/ui-kit/InfoMessage";
import { UserOperationActivityStruct } from "../UserOperation";

type Props = {
  activities?: Record<string, UserOperationActivityStruct[]>;
};
export const ActivityList = ({ activities }: Props) => {
  if (!activities) {
    return (
      <InfoMessage
        title="No activity to show"
        desc="Claim some tokens and start playing around with the Sandbox Wallet"
      />
    );
  }

  return Object.keys(activities).length ? (
    <div className="flex flex-col divide-y divide-base-300">
      {Object.keys(activities)
        .slice(0, 1)
        .map((groupTitle, idx) => {
          return (
            <div className="flex flex-col divide-y divide-base-300" key={idx}>
              {activities[groupTitle].slice(0, 3).map((userOp, index) => (
                <div key={index}>
                  <UserOpCard userOp={userOp} />
                </div>
              ))}
            </div>
          );
        })}
    </div>
  ) : (
    <InfoMessage
      title="No activity to show"
      desc="Claim some tokens and start playing around with the Sandbox Wallet"
    />
  );
};
