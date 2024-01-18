import { useEffect, useState } from "react";
import { Validator } from "../../Module/Module";
import { useActiveAccount } from "./useActiveAccount";
import { contracts, validators } from "@/src/constants/contracts";

export const useActiveValidator = () => {
  const [activeAccount] = useActiveAccount();
  const [activeValidator, setActiveValidator] = useState<Validator>({} as any);

  useEffect(() => {
    const validatorName = localStorage.getItem(
      `${activeAccount.address}-signer`
    );

    let validator = validatorName ? validators[validatorName] : null;

    if (validatorName && validator) {
      setActiveValidator(validator);
    } else {
      const selectedValidator = activeAccount.webauthnKeyId
        ? "webauthn"
        : "ecdsa";

      localStorage.setItem(
        `${activeAccount.address}-signer`,
        selectedValidator
      );

      validator = validators[selectedValidator];

      setActiveValidator(validator);
    }
  }, [activeAccount]);

  useEffect(() => {
    if (activeValidator.name) {
      localStorage.setItem(
        `${activeAccount?.address}-signer`,
        activeValidator.name
      );
    }
  }, [activeValidator]);

  return [activeValidator, setActiveValidator] as const;
};
