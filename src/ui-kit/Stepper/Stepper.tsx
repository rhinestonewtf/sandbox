import React from "react";
import classNames from "classnames";
import { TiTick } from "react-icons/ti";
import { IoCheckmarkOutline } from "react-icons/io5";

import { notReachable } from "@/src/utils/notReachable";

type StepType = "active" | "complete" | "disabled";

type Props = { steps: string[]; currentStep: number; isComplete: boolean };

export const Stepper = ({ steps, currentStep, isComplete }: Props) => {
  const getStepType = (step: number): StepType => {
    if (isComplete) {
      return "complete";
    }

    if (currentStep === step + 1) {
      return "active";
    }
    if (currentStep > step + 1) {
      return "complete";
    }
    return "disabled";
  };

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => {
          const type = getStepType(i);
          return (
            <div
              key={i}
              className={classNames(
                `step-item ${type === "active" && "active"} ${
                  type === "active" && "complete"
                } `
              )}
            >
              {(() => {
                switch (type) {
                  case "active":
                    return (
                      <div className="step bg-primary">
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    );
                  case "complete":
                    return (
                      <div className="step">
                        <IoCheckmarkOutline size={20} />
                      </div>
                    );
                  case "disabled":
                    return <div className="step bg-gray-300 z-50">{i + 1}</div>;
                  default:
                    return notReachable(type);
                }
              })()}

              <div
                className={classNames(
                  "text-neutral-dark text-xs font-medium font-mono uppercase mt-4",
                  {
                    "text-primary": type === "active",
                    "text-gray-300": type === "disabled",
                  }
                )}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
