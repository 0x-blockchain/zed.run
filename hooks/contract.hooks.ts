import { useMemo } from "react";

import type { Contract, ContractInterface } from "@ethersproject/contracts";

import { useWeb3 } from "./Web3Client";
import { getContract } from "../shared/helpers/contract.helper";

export const useContract = <T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
) => {
  const web3 = useWeb3();
  const library = web3.web3Provider;
  const chainId = web3.network?.chainId;
  const account = web3.address;

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    chainId,
    withSignerIfPossible,
    account,
  ]) as T;
};

export const useFoldedContract = (
  tokenAddress?: string,
  withSignerIfPossible?: boolean,
  ABI?: ContractInterface
) => {
  return useContract(tokenAddress, ABI, withSignerIfPossible);
};
