import { Account } from "../Account";
import { Network } from "../../Network";
import { Address, Hex, encodeFunctionData } from "viem";
import AccountInterface from "@/src/constants/abis/Account.json";
import { ExecuteAction } from "../../UserOperation/UserOperation";
import ExtensibleFallbackHandler from "@/src/constants/abis/ExtensibleFallbackHandler.json";
import {
  isExecutorInstalled,
  isFallbackInstalled,
  isHookInstalled,
  isValidatorInstalled,
} from "./activeModules";
import { contracts } from "@/src/constants/contracts";

export async function installValidator(
  network: Network,
  account: Account,
  validator: Address,
  initData: Hex
): Promise<ExecuteAction[]> {
  const actions: ExecuteAction[] = [];
  const isModuleInstalled = await isValidatorInstalled(
    network,
    account,
    validator
  );

  if (!isModuleInstalled) {
    actions.push({
      target: account.address,
      value: BigInt(0),
      callData: encodeFunctionData({
        functionName: "installValidator",
        abi: AccountInterface.abi,
        args: [validator, initData],
      }),
    });
  }
  return actions;
}

export async function installExecutor(
  network: Network,
  account: Account,
  executor: Address,
  initData: Hex
): Promise<ExecuteAction[]> {
  const actions: ExecuteAction[] = [];
  const isModuleInstalled = await isExecutorInstalled(
    network,
    account,
    executor
  );

  if (!isModuleInstalled) {
    actions.push({
      target: account.address,
      value: BigInt(0),
      callData: encodeFunctionData({
        functionName: "installExecutor",
        abi: AccountInterface.abi,
        args: [executor, initData],
      }),
    });
  }
  return actions;
}

export async function installFallback(
  network: Network,
  account: Account,
  functionSelector: Hex,
  isStatic: boolean,
  subHandler: Address
): Promise<ExecuteAction[]> {
  const actions: ExecuteAction[] = [];
  // TODO: this only checks if the queried handler is installed, but the account will also revert if any other handler is installed
  const isHandlerInstalled = await isFallbackInstalled(
    network,
    account,
    contracts.EXTENSIBLE_FALLBACK_HANDLER_ADDRESS
  );

  if (!isHandlerInstalled) {
    actions.push({
      target: account.address,
      value: BigInt(0),
      callData: encodeFunctionData({
        functionName: "installFallback",
        abi: AccountInterface.abi,
        args: [contracts.EXTENSIBLE_FALLBACK_HANDLER_ADDRESS, "0x"],
      }),
    });
  }

  actions.push({
    target: contracts.EXTENSIBLE_FALLBACK_HANDLER_ADDRESS,
    value: BigInt(0),
    callData: encodeFunctionData({
      functionName: "setFunctionSig",
      abi: ExtensibleFallbackHandler.abi,
      args: [
        {
          selector: functionSelector,
          fallbackType: BigInt(isStatic ? 0 : 1),
          handler: subHandler,
        },
      ],
    }),
  });
  return actions;
}

export async function installHook(
  network: Network,
  account: Account,
  hook: Address,
  initData: Hex
): Promise<ExecuteAction[]> {
  const actions: ExecuteAction[] = [];
  // TODO: this only checks if the queried hook is installed, but the account will also revert if any other hook is installed
  const isModuleInstalled = await isHookInstalled(network, account, hook);

  if (!isModuleInstalled) {
    actions.push({
      target: account.address,
      value: BigInt(0),
      callData: encodeFunctionData({
        functionName: "installHook",
        abi: AccountInterface.abi,
        args: [hook, initData],
      }),
    });
  }
  return actions;
}
