"use client";

import { ReactNode } from "react";
import { Validator } from "../../Module/Module";
import { contracts, validators } from "@/src/constants/contracts";
import { useActiveAccount, useActiveValidator } from "../hooks";
import { Dropdown, EOAWalletIcon, KeyIcon } from "@/src/ui-kit";

type Props = {
  onChange: (validator: Validator) => void;
  onAddSignerClick: () => void;
  selectedValidator?: Validator["name"];
};

export const ValidatorSwitcher = ({
  selectedValidator,
  onAddSignerClick,
  onChange,
}: Props) => {
  const [activeAccount] = useActiveAccount();
  const [activeValidator] = useActiveValidator();

  const options: {
    label: ReactNode;
    value: Validator["name"] | "";
  }[] = [];

  if (activeAccount?.webauthnKeyId) {
    options.push({
      label: (
        <>
          <KeyIcon size={20} bgColor={"#4F41EF"} />
          Passkeys
        </>
      ),
      value: "webauthn",
    });
  } else {
    options.push({
      label: (
        <>
          <KeyIcon size={20} bgColor={"#05003B"} />
          Add Passkeys
        </>
      ),
      value: "",
    });
  }

  if (activeAccount?.walletSigner) {
    options.unshift({
      label: (
        <>
          <EOAWalletIcon size={20} bgColor={"#4F41EF"} /> EOA Wallet
        </>
      ),
      value: "ecdsa",
    });
  } else {
    options.push({
      label: (
        <>
          <EOAWalletIcon size={20} bgColor={"#05003B"} /> Add EOA Wallet
        </>
      ),
      value: "",
    });
  }

  const onValidtorSelected = (validatorName: Validator["name"]) => {
    if (!validatorName) {
      onAddSignerClick();
      onChange(activeValidator);
      return;
    }
    const validator = validators[validatorName];
    validator.address = contracts[validatorName];
    onChange(validator);
  };

  return (
    <Dropdown
      position="dropdown-end"
      items={options}
      width="!w-[232px]"
      selectedItem={selectedValidator || activeValidator.name}
      variant="small"
      onChange={(validator) =>
        onValidtorSelected(validator as Validator["name"])
      }
    />
  );
};
