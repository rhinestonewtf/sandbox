import { getBalance } from "@wagmi/core";
import { Address, isAddress } from "viem";
import { ERC20Token } from "../ERC20Token";
import { Network } from "@/src/domains/Network";
import { getTokenDisplayValue } from "../../helpers";
import { AccountBalance } from "@/src/domains/Account";
import { getConfig } from "@/src/domains/Network/helpers/getConfig";

type Params = {
  token?: ERC20Token;
  tokenBalance?: string;
  accountBalance?: AccountBalance;
  accountAddress: string;
  activeNetwork: Network;
};

export const getFormattedTokenBalance = async ({
  accountBalance,
  token,
  tokenBalance,
  accountAddress,
  activeNetwork,
}: Params) => {
  const config = getConfig(activeNetwork);
  if (token && isAddress(token.token_address)) {
    const balance = await getBalance(config, {
      token: token.token_address,
      chainId: token.chainId as any,
      address: accountAddress as Address,
    });

    return `${getTokenDisplayValue({
      balance: String(
        tokenBalance || Number(balance.value) / 10 ** balance.decimals
      ),
    })} ${token.symbol}`;
  }
  if (accountBalance) {
    return `${tokenBalance || accountBalance.balance} ${accountBalance.symbol}`;
  }
  return "0";
};
