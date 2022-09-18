import type { NFTToken } from "shared/api";
import { debankApi } from "shared/api";
export async function getPriciestNFT(address: string) {
  const debankRes = await debankApi.assets.getNFTList(address);
  const tokens = debankRes.data;
  let token: NFTToken | undefined = undefined;
  if (tokens) {
    if (!tokens.data.token_list.length) return token;
    token = tokens.data.token_list.reduce((prev, current) =>
      prev.usd_price > current.usd_price ? prev : current
    );
    if (token.usd_price > 15) {
      return token;
    } else {
      token = undefined;
    }
  }
  return token;
}
