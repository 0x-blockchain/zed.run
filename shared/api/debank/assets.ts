import type { AxiosPromise } from "axios";
import type { NFTTokenList, ERC20TokenList } from "./models";

import { debankAPI } from "./base";

const NFT_BASE_URL = "/nft";
const ERC20_BASE_URL = "/token";

export const getNFTList = (address: string): AxiosPromise<NFTTokenList> => {
  return debankAPI.get<NFTTokenList>(
    `${NFT_BASE_URL}/list?chain=eth&user_addr=${address}&is_collection=1`
  );
};

export const getTokenList = (address: string): AxiosPromise<ERC20TokenList> => {
  return debankAPI.get<ERC20TokenList>(
    `${ERC20_BASE_URL}/balance_list?user_addr=${address}&is_all=false&chain=eth`
  );
};
