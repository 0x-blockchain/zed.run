import { useFoldedContract } from "hooks/contract.hooks";

import ERC20_ABI from "../shared/constants/contracts/erc20_abi.json";
import ERC721_ABI from "../shared/constants/contracts/erc721_abi.json";

const useERC20Contract = (contractAddress?: string) =>
  useFoldedContract(contractAddress, undefined, ERC20_ABI.abi);

const useNFTContract = (contractAddress?: string) =>
  useFoldedContract(contractAddress, undefined, ERC721_ABI.abi);

export const wrappers = {
  useERC20Contract,
  useNFTContract,
};
