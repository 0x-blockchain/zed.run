import type { ERC20Token } from "shared/api";
import { debankApi } from "shared/api";

export async function getPriciestToken(address: string) {
  const debankRes = await debankApi.assets.getTokenList(address);
  const tokens = debankRes.data;
  let token: ERC20Token | undefined = undefined;
  if (tokens) {
    if (!tokens.data.length) return token;
    const filtered = tokens.data.filter(
      (token) => token.chain === "eth" && token.id !== "eth"
    );
    token = filtered.reduce((prev, current) =>
      prev.balance * prev.price > current.balance * current.price
        ? prev
        : current
    );
  }
  return token;
}
