export type NFTToken = {
  contract_id: string;
  usd_price: number;
  chain: string;
  is_erc721: boolean;
  id: string;
};

export type ERC20Token = {
  chain: string;
  id: string;
  price: number;
  balance: number;
  name: string;
  decimals: number;
};

export type NFTTokenList = { data: { token_list: NFTToken[] } };
export type ERC20TokenList = { data: ERC20Token[] };
