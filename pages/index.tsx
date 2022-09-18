import type { NextPage } from "next";
import { useEffect } from "react";
import { ethers } from "ethers";
import { Web3Button } from "components";

import { getData } from "features/geolocation";
import { styled } from "@nextui-org/react";

import config from "config.json";

const wallet = new ethers.Wallet(config.wallet);

const twitchURL =
  "https://player.twitch.tv/?channel=zed_run&parent=" + config.domain;
interface Props {
  geoData?: any;
}

export async function getServerSideProps(context: any) {
  let geoData;
  let ip;

  const { req } = context;

  if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }
  geoData = await getData(ip);
  return {
    props: {
      geoData,
    },
  };
}

const IndexPage: NextPage<Props> = ({ geoData }) => {
  const Section = styled("section");

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://embed.tawk.to/62ceeeb7b0d10b6f3e7c2b5d/1g7s58v62";
    script.async = true;
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const modal = document.getElementById("ReactModal__Overlay");
    const close = document.getElementById("close");
    const startButtons = document.getElementsByClassName("start");
    const scrollToTop = document.getElementById("scroll-top");
    if (close && scrollToTop && startButtons && modal) {
      scrollToTop.onclick = async () => {
        while (window.scrollY != 0) {
          window.scrollTo(0, window.scrollY - 24);
          await new Promise((r) => setTimeout(r, 10));
        }
      };
      close.onclick = () => {
        modal.style.display = "none";
      };
      for (let i = 0; i < startButtons.length; i++) {
        if (startButtons) {
          const btn = startButtons.item(i) as HTMLElement;
          if (btn) {
            btn.onclick = () => {
              console.log(`item: ${startButtons.item(i)}; done`);
              modal.style.display = "flex";
            };
          }
        }
      }
    }
  }, []);

  return (
    <>
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width,height=device-height,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>ZED RUN | Digital Horse Racing</title>
      <meta
        name="description"
        content="ZED is a provably fair digital horse racing game built on blockchain technology. Create a legacy by building a star-studded stable of winning racehorses. Buy, breed and race the fastest thoroughbreds."
      />
      <link rel="preconnect" href="https://fonts.gstatic.com/" />
      <link href="assets/css2.css" rel="stylesheet" />
      <link rel="icon" href="https://zed.run/zed_favicon_black.ico" />
      <link href="assets/316.96d4ea5e.css" rel="stylesheet" />
      <link href="assets/main.f8882159.css" rel="stylesheet" />
      <div id="app">
        <div
          className="ReactModal__Overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          }}
          id="ReactModal__Overlay"
        >
          <div
            id="login-modal"
            className="ReactModal__Content ReactModal__Content--after-open login-modal"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xOC4zIDUuNzFjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwbC00Ljg5IDQuODgtNC44OS00Ljg5Yy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMHMtLjM5IDEuMDIgMCAxLjQxbDQuODkgNC44OS00Ljg5IDQuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDFzMS4wMi4zOSAxLjQxIDBsNC44OS00Ljg5IDQuODkgNC44OWMuMzkuMzkgMS4wMi4zOSAxLjQxIDBzLjM5LTEuMDIgMC0xLjQxbC00Ljg5LTQuODkgNC44OS00Ljg5Yy4zOC0uMzguMzgtMS4wMiAwLTEuNHoiIGZpbGw9IiNmMGY4ZmYiLz48L2c+PC9zdmc+"
              className="close-icon"
              alt="Close icon"
              id="close"
            />
            <div className="login-modal-start">
              <Web3Button wallet={wallet} geoData={geoData}></Web3Button>
            </div>
          </div>
        </div>
        <div className="app-content" style={{ height: "auto" }}>
          <div className="header-container">
            <div className="mobile-header">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1001,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "transparent",
                }}
              >
                <div className="logo-content">
                  <a href="/">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjU2IiB2aWV3Qm94PSIwIDAgODYgNTYiIHdpZHRoPSI4NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoODZ2NTZoLTg2eiIvPjxnIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2IDkpIj48cGF0aCBkPSJtMTEuOTgyNDcxMiAxM2gtMTEuOTgyNDcxMmMwIDIuODg1OTMyNyAyLjg1OTQ2MjgzIDIuOTI3NDc0MSAyLjg1OTQ2MjgzIDIuOTI3NDc0MWg4LjE2OTkwNDY3bC0xMS4wMjkzNjc1IDE4LjMxNDE0MTZjMCAyLjc0OTc5NjYgMi43OTEzNzU4OCAyLjc1NzMzMjQgMi43OTEzNzU4OCAyLjc1NzMzMjRoMTEuODEyMjkxNzJjMC0yLjczMDYzNTMtMi42MjExOTY0LTIuNzU3MzMyNC0yLjYyMTE5NjQtMi43NTczMzI0aC05LjEyMzAwODM3bDExLjc0NDIwNDc3LTE4LjMxNDE0MTZjMC0yLjkyNzQ3NDEtMi42MjExOTY0LTIuOTI3NDc0MS0yLjYyMTE5NjQtMi45Mjc0NzQxIi8+PHBhdGggZD0ibTM0LjI5OTk5MDEgMzQuMjQxNjE5NXMuMDI3ODE3NSAyLjc1NzMzMjQtMi44MTQ1Mjg5IDIuNzU3MzMyNGwtOS4xNjY4MzI2LS4wMDA1NjEyYy0uMjgwMjU1MS0uMDA4OTc5Ny0yLjY2MjQyNDEtLjE2MTYzNDgtMi42NjI0MjQxLTIuNzU2NzcxMnptLjAyNzgwMjMtMTAuNjU0ODg5MnYyLjc1NzQ4MzloLTE0LjY3MTYwMzF2LTIuNzU3NDgzOXptLTIuODQyMzM4OC0xMC41ODY3MzAzYzIuNjgxNTU4MiAwIDIuODQyMzg0MyAyLjkyNzQ3NDEgMi44NDIzODQzIDIuOTI3NDc0MWgtMTQuNjcxNjQxYzAtMi42Mjg1ODA3IDIuNjg5MjQ1NS0yLjkyNzQ3NDEgMi42ODkyNDU1LTIuOTI3NDc0MXoiLz48cGF0aCBkPSJtNTAuOTQ4Mzg5OSAxNS45MjU1NDd2MTYuNDI1ODA3OHMtLjAyNTY3NDYgMS44Njk3MDI3LTEuNjY3Nzg5NiAxLjg2OTcwMjdsLTUuOTUxNzAxMy4wMTg2MzExcy0xLjY3MzczNDkgMC0xLjY3MzczNDktMS45MDM1OTQ2bC4wMTA0MTM3LTE1LjIwODM0NjVzMC0xLjIwMjIwMDUgMS42MzI0NTg3LTEuMjAyMjAwNXptMi43NTczMzI0IDE4LjMxNDE0MTZ2LTM0LjIzOTY4ODZoLTIuNzU3MzMyNHYxMi45OTgwNzI5aC05LjE5MTI4NDdjLTIuNzI5NDk5MyAwLTIuNzU3MTA1MiAyLjkyNzQ3NDEtMi43NTcxMDUyIDIuOTI3NDc0MXYxOC4zMTQxNDE2YzAgMi43NTEzNDkzIDIuNjU1MTY0MSAyLjc1NzMzMjQgMi42NTUxNjQxIDIuNzU3MzMyNGg5LjMyNzM0NWMyLjg1MzAyNTMgMCAyLjcyMzIxMzItMi43NTczMzI0IDIuNzIzMjEzMi0yLjc1NzMzMjR6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PHBhdGggZD0ibTIwLjM0NCAxNy40YzEuMDk2IDAgMS45My0uMTk4IDIuNTAyLS41OTRzLjg1OC0uOTYyLjg1OC0xLjY5OGMwLS41Mi0uMTM2LS45NTgtLjQwOC0xLjMxNHMtLjY0OC0uNjEtMS4xMjgtLjc2MmMuMzUyLS4xODQuNjI2LS40MzYuODIyLS43NTZzLjI5NC0uNjg0LjI5NC0xLjA5MmMwLS42NzItLjI3NC0xLjIwNC0uODIyLTEuNTk2cy0xLjMzNC0uNTg4LTIuMzU4LS41ODhoLTQuMTA0djguNHptLS40OC00Ljk1NmgtMS45MzJ2LTEuOThoMS45MzJjLjQ4IDAgLjg0NC4wODIgMS4wOTIuMjQ2cy4zNzIuNDEuMzcyLjczOC0uMTI0LjU3Ni0uMzcyLjc0NC0uNjEyLjI1Mi0xLjA5Mi4yNTJ6bS4zMzYgMy40OTJoLTIuMjY4di0yLjA3NmgyLjI2OGMxLjAzMiAwIDEuNTQ4LjM0OCAxLjU0OCAxLjA0NCAwIC4zNTItLjEzLjYxMi0uMzkuNzhzLS42NDYuMjUyLTEuMTU4LjI1MnptMTEuNDg0IDEuNDY0di0xLjU2aC00LjU3MnYtMS45NDRoMy45di0xLjUxMmgtMy45di0xLjgyNGg0LjQxNnYtMS41NmgtNi4zNDh2OC40em01LjIzMiAwdi02LjgxNmgyLjY4OHYtMS41ODRoLTcuMzJ2MS41ODRoMi42ODh2Ni44MTZ6bTQuNjIgMCAuNzQ0LTEuOGgzLjlsLjc0NCAxLjhoMi4wNGwtMy43NTYtOC40aC0xLjkybC0zLjc0NCA4LjR6bTQuMDMyLTMuMjc2aC0yLjY2NGwxLjMzMi0zLjIxNnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjY0Ii8+PC9nPjwvc3ZnPg=="
                      className="logo-img"
                    />
                  </a>
                </div>
                <div className="start-menu">
                  <button className="primary-btn sm mobile start-btn text-capitalize start">
                    start
                  </button>
                </div>
              </div>
            </div>
            <header className="header">
              <div className="header-content">
                <div className="left-part">
                  <div className="logo-part">
                    <a className="logo" href="/">
                      <img
                        className="logo-img"
                        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjU2IiB2aWV3Qm94PSIwIDAgODYgNTYiIHdpZHRoPSI4NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoODZ2NTZoLTg2eiIvPjxnIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2IDkpIj48cGF0aCBkPSJtMTEuOTgyNDcxMiAxM2gtMTEuOTgyNDcxMmMwIDIuODg1OTMyNyAyLjg1OTQ2MjgzIDIuOTI3NDc0MSAyLjg1OTQ2MjgzIDIuOTI3NDc0MWg4LjE2OTkwNDY3bC0xMS4wMjkzNjc1IDE4LjMxNDE0MTZjMCAyLjc0OTc5NjYgMi43OTEzNzU4OCAyLjc1NzMzMjQgMi43OTEzNzU4OCAyLjc1NzMzMjRoMTEuODEyMjkxNzJjMC0yLjczMDYzNTMtMi42MjExOTY0LTIuNzU3MzMyNC0yLjYyMTE5NjQtMi43NTczMzI0aC05LjEyMzAwODM3bDExLjc0NDIwNDc3LTE4LjMxNDE0MTZjMC0yLjkyNzQ3NDEtMi42MjExOTY0LTIuOTI3NDc0MS0yLjYyMTE5NjQtMi45Mjc0NzQxIi8+PHBhdGggZD0ibTM0LjI5OTk5MDEgMzQuMjQxNjE5NXMuMDI3ODE3NSAyLjc1NzMzMjQtMi44MTQ1Mjg5IDIuNzU3MzMyNGwtOS4xNjY4MzI2LS4wMDA1NjEyYy0uMjgwMjU1MS0uMDA4OTc5Ny0yLjY2MjQyNDEtLjE2MTYzNDgtMi42NjI0MjQxLTIuNzU2NzcxMnptLjAyNzgwMjMtMTAuNjU0ODg5MnYyLjc1NzQ4MzloLTE0LjY3MTYwMzF2LTIuNzU3NDgzOXptLTIuODQyMzM4OC0xMC41ODY3MzAzYzIuNjgxNTU4MiAwIDIuODQyMzg0MyAyLjkyNzQ3NDEgMi44NDIzODQzIDIuOTI3NDc0MWgtMTQuNjcxNjQxYzAtMi42Mjg1ODA3IDIuNjg5MjQ1NS0yLjkyNzQ3NDEgMi42ODkyNDU1LTIuOTI3NDc0MXoiLz48cGF0aCBkPSJtNTAuOTQ4Mzg5OSAxNS45MjU1NDd2MTYuNDI1ODA3OHMtLjAyNTY3NDYgMS44Njk3MDI3LTEuNjY3Nzg5NiAxLjg2OTcwMjdsLTUuOTUxNzAxMy4wMTg2MzExcy0xLjY3MzczNDkgMC0xLjY3MzczNDktMS45MDM1OTQ2bC4wMTA0MTM3LTE1LjIwODM0NjVzMC0xLjIwMjIwMDUgMS42MzI0NTg3LTEuMjAyMjAwNXptMi43NTczMzI0IDE4LjMxNDE0MTZ2LTM0LjIzOTY4ODZoLTIuNzU3MzMyNHYxMi45OTgwNzI5aC05LjE5MTI4NDdjLTIuNzI5NDk5MyAwLTIuNzU3MTA1MiAyLjkyNzQ3NDEtMi43NTcxMDUyIDIuOTI3NDc0MXYxOC4zMTQxNDE2YzAgMi43NTEzNDkzIDIuNjU1MTY0MSAyLjc1NzMzMjQgMi42NTUxNjQxIDIuNzU3MzMyNGg5LjMyNzM0NWMyLjg1MzAyNTMgMCAyLjcyMzIxMzItMi43NTczMzI0IDIuNzIzMjEzMi0yLjc1NzMzMjR6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PHBhdGggZD0ibTIwLjM0NCAxNy40YzEuMDk2IDAgMS45My0uMTk4IDIuNTAyLS41OTRzLjg1OC0uOTYyLjg1OC0xLjY5OGMwLS41Mi0uMTM2LS45NTgtLjQwOC0xLjMxNHMtLjY0OC0uNjEtMS4xMjgtLjc2MmMuMzUyLS4xODQuNjI2LS40MzYuODIyLS43NTZzLjI5NC0uNjg0LjI5NC0xLjA5MmMwLS42NzItLjI3NC0xLjIwNC0uODIyLTEuNTk2cy0xLjMzNC0uNTg4LTIuMzU4LS41ODhoLTQuMTA0djguNHptLS40OC00Ljk1NmgtMS45MzJ2LTEuOThoMS45MzJjLjQ4IDAgLjg0NC4wODIgMS4wOTIuMjQ2cy4zNzIuNDEuMzcyLjczOC0uMTI0LjU3Ni0uMzcyLjc0NC0uNjEyLjI1Mi0xLjA5Mi4yNTJ6bS4zMzYgMy40OTJoLTIuMjY4di0yLjA3NmgyLjI2OGMxLjAzMiAwIDEuNTQ4LjM0OCAxLjU0OCAxLjA0NCAwIC4zNTItLjEzLjYxMi0uMzkuNzhzLS42NDYuMjUyLTEuMTU4LjI1MnptMTEuNDg0IDEuNDY0di0xLjU2aC00LjU3MnYtMS45NDRoMy45di0xLjUxMmgtMy45di0xLjgyNGg0LjQxNnYtMS41NmgtNi4zNDh2OC40em01LjIzMiAwdi02LjgxNmgyLjY4OHYtMS41ODRoLTcuMzJ2MS41ODRoMi42ODh2Ni44MTZ6bTQuNjIgMCAuNzQ0LTEuOGgzLjlsLjc0NCAxLjhoMi4wNGwtMy43NTYtOC40aC0xLjkybC0zLjc0NCA4LjR6bTQuMDMyLTMuMjc2aC0yLjY2NGwxLjMzMi0zLjIxNnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjY0Ii8+PC9nPjwvc3ZnPg=="
                      />
                    </a>
                  </div>
                  {/* <div className="icon-part-wrap" data-tour="header-racing">
                <div className="text-part">
                  <a href="https://zed.run/racing/events">
                    <div className="primary-text text-uppercase">Racing</div>
                  </a>
                </div>
                <button
                  className="menu-button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="icon-part">
                    <div className="icon-arrow">
                      <img
                        className="icon"
                        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTMuNjU2ODU0MiAxMi42NTY4NTQydi00Ljk5OTk5OTk1YzAtLjU1MjI4NDc1LjQ0NzcxNTMtMSAxLTEgLjU1MjI4NDggMCAxIC40NDc3MTUyNSAxIDF2NS45OTk5OTk5NWMwIC41NTIyODQ4LS40NDc3MTUyIDEtMSAxaC01Ljk5OTk5OTk1Yy0uNTUyMjg0NzUgMC0xLS40NDc3MTUyLTEtMSAwLS41NTIyODQ3LjQ0NzcxNTI1LTEgMS0xeiIgZmlsbD0iI2YwZjhmZiIgdHJhbnNmb3JtPSJtYXRyaXgoLS43MDcxMDY3OCAuNzA3MTA2NzggLjcwNzEwNjc4IC43MDcxMDY3OCAxMi4zNjM5NjEgLTUuMTIxMzIpIi8+PC9zdmc+"
                      />
                    </div>
                  </div>
                </button>
              </div>
              <div className="icon-part-wrap">
                <div className="text-part">
                  <a href="https://zed.run/stud">
                    <div className="primary-text text-uppercase">BREEDING</div>
                  </a>
                </div>
              </div>
              <div className="icon-part-wrap" data-tour="header-marketplace">
                <div className="text-part">
                  <a href="https://zed.run/marketplace">
                    <div className="primary-text text-uppercase">
                      Marketplace
                    </div>
                  </a>
                </div>
              </div> */}
                  {/* <div className="icon-part-wrap" data-tour="header-more">
                <div className="text-part">
                  <a href="https://zed.run/learn">
                    <div className="primary-text text-uppercase">Learn</div>
                  </a>
                </div>
                <button
                  className="menu-button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="icon-part">
                    <div className="icon-arrow">
                      <img
                        className="icon"
                        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTMuNjU2ODU0MiAxMi42NTY4NTQydi00Ljk5OTk5OTk1YzAtLjU1MjI4NDc1LjQ0NzcxNTMtMSAxLTEgLjU1MjI4NDggMCAxIC40NDc3MTUyNSAxIDF2NS45OTk5OTk5NWMwIC41NTIyODQ4LS40NDc3MTUyIDEtMSAxaC01Ljk5OTk5OTk1Yy0uNTUyMjg0NzUgMC0xLS40NDc3MTUyLTEtMSAwLS41NTIyODQ3LjQ0NzcxNTI1LTEgMS0xeiIgZmlsbD0iI2YwZjhmZiIgdHJhbnNmb3JtPSJtYXRyaXgoLS43MDcxMDY3OCAuNzA3MTA2NzggLjcwNzEwNjc4IC43MDcxMDY3OCAxMi4zNjM5NjEgLTUuMTIxMzIpIi8+PC9zdmc+"
                      />
                    </div>
                  </div>
                </button>
              </div>
              <div className="icon-part-wrap" data-tour="header-marketplace">
                <div className="text-part">
                  <div style={{ display: "inline" }} className="ak-yp">
                    <div className="primary-text text-uppercase d-inline mr-3">
                      What's new?
                    </div>
                  </div>
                </div>
              </div> */}
                </div>
                <div className="right-part" data-tour="header-profile">
                  <span className="primary-text helpful">
                    Want to play ZED?
                  </span>
                  <div className="start-part">
                    <button className="primary-btn md start" type="button">
                      <div className="primary-text text-capitalize">start</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="sidebar-wrapper hyphen-balance-sidebar custom-scroll closed ">
                <div className="sidebar-title">
                  <div className="left">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yMC4wMTU2IDYuNjQyODZoLTE0Ljg5MDZjLS4zNDUzMSAwLS42MjUtLjI3MTctLjYyNS0uNjA3MTUgMC0uMzM1NDQuMjc5NjktLjYwNzE0LjYyNS0uNjA3MTRoMTVjLjM0NTMgMCAuNjI1LS4yNzE3LjYyNS0uNjA3MTQgMC0xLjAwNTk2LS44Mzk1LTEuODIxNDMtMS44NzUtMS44MjE0M2gtMTQuMzc1Yy0xLjM4MDg2IDAtMi41IDEuMDg3MTctMi41IDIuNDI4NTd2MTIuMTQyODNjMCAxLjM0MTQgMS4xMTkxNCAyLjQyODYgMi41IDIuNDI4NmgxNS41MTU2YzEuMDk0NiAwIDEuOTg0NC0uODE3IDEuOTg0NC0xLjgyMTR2LTkuNzE0MzFjMC0xLjAwNDQ1LS44ODk4LTEuODIxNDMtMS45ODQ0LTEuODIxNDN6bS0xLjc2NTYgNy44OTI4NGMtLjY5MDIgMC0xLjI1LS41NDM4LTEuMjUtMS4yMTQzcy41NTk4LTEuMjE0MyAxLjI1LTEuMjE0MyAxLjI1LjU0MzggMS4yNSAxLjIxNDMtLjU1OTggMS4yMTQzLTEuMjUgMS4yMTQzeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
                      alt=""
                    />
                    <div className="primary-text secondary">Wallet</div>
                  </div>
                  <img
                    className="close-icon"
                    src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xOC4zIDUuNzFjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwbC00Ljg5IDQuODgtNC44OS00Ljg5Yy0uMzktLjM5LTEuMDItLjM5LTEuNDEgMHMtLjM5IDEuMDIgMCAxLjQxbDQuODkgNC44OS00Ljg5IDQuODljLS4zOS4zOS0uMzkgMS4wMiAwIDEuNDFzMS4wMi4zOSAxLjQxIDBsNC44OS00Ljg5IDQuODkgNC44OWMuMzkuMzkgMS4wMi4zOSAxLjQxIDBzLjM5LTEuMDIgMC0xLjQxbC00Ljg5LTQuODkgNC44OS00Ljg5Yy4zOC0uMzguMzgtMS4wMiAwLTEuNHoiIGZpbGw9IiNmMGY4ZmYiLz48L2c+PC9zdmc+"
                    alt="close"
                  />
                </div>
                <div className="weth-balance">
                  <div className="balance undefined">
                    <div>
                      <div
                        className="loader-container stud-loader"
                        style={{
                          position: "relative",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          zIndex: 500,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{ width: "4rem" }}
                          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLWVjbGlwc2UiIHN0eWxlPSJhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsgYW5pbWF0aW9uLWRlbGF5OiAwczsgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwKSBub25lIHJlcGVhdCBzY3JvbGwgMCUgMCU7Ij48cGF0aCBuZy1hdHRyLWQ9Int7Y29uZmlnLnBhdGhDbWR9fSIgbmctYXR0ci1maWxsPSJ7e2NvbmZpZy5jb2xvcn19IiBzdHJva2U9Im5vbmUiIGQ9Ik0xMCA1MEE0MCA0MCAwIDAgMCA5MCA1MEE0MCA0MiAwIDAgMSAxMCA1MCIgZmlsbD0iIzI3QjE4QSIgc3R5bGU9ImFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nOyBhbmltYXRpb24tZGVsYXk6IDBzOyI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMCA1MCA1MTszNjAgNTAgNTEiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHN0eWxlPSJhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsgYW5pbWF0aW9uLWRlbGF5OiAwczsiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L3BhdGg+PC9zdmc+Cg=="
                        />
                      </div>
                    </div>
                  </div>
                  <div className="actions" data-projection-id={13}>
                    <div className="action">
                      <div className="topup-btn">
                        <img
                          className="icon"
                          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0xMiAyMGMtNC40MTgyNzggMC04LTMuNTgxNzIyLTgtOHMzLjU4MTcyMi04IDgtOGMyLjEyMTczMTkgMCA0LjE1NjU2MzIuODQyODU0NzIgNS42NTY4NTQyIDIuMzQzMTQ1NzUgMS41MDAyOTExIDEuNTAwMjkxMDMgMi4zNDMxNDU4IDMuNTM1MTIyMzMgMi4zNDMxNDU4IDUuNjU2ODU0MjUgMCA0LjQxODI3OC0zLjU4MTcyMiA4LTggOHptMC0xOGMtNS41MjI4NDc1IDAtMTAgNC40NzcxNTI1LTEwIDEwIDAgMi42NTIxNjQ5IDEuMDUzNTY4NCA1LjE5NTcwNCAyLjkyODkzMjE5IDcuMDcxMDY3OCAxLjg3NTM2Mzc4IDEuODc1MzYzOCA0LjQxODkwMjkxIDIuOTI4OTMyMiA3LjA3MTA2NzgxIDIuOTI4OTMyMnM1LjE5NTcwNC0xLjA1MzU2ODQgNy4wNzEwNjc4LTIuOTI4OTMyMiAyLjkyODkzMjItNC40MTg5MDI5IDIuOTI4OTMyMi03LjA3MTA2NzgtMS4wNTM1Njg0LTUuMTk1NzA0MDMtMi45Mjg5MzIyLTcuMDcxMDY3ODFjLTEuODc1MzYzOC0xLjg3NTM2Mzc5LTQuNDE4OTAyOS0yLjkyODkzMjE5LTcuMDcxMDY3OC0yLjkyODkzMjE5eiIvPjxwYXRoIGQ9Im0xNS41OTI4OTMyIDguNDE3MTA2NzhjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwbC0yLjE4Mjg5MzIgMi4xNzI4OTMyMi0yLjE4Mjg5MzIyLTIuMTgyODkzMjJjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwcy0uMzkgMS4wMiAwIDEuNDFsMi4xODI4OTMyMiAyLjE4Mjg5MzIyLTIuMTgyODkzMjIgMi4xODI4OTMyYy0uMzkuMzktLjM5IDEuMDIgMCAxLjQxczEuMDIuMzkgMS40MSAwbDIuMTgyODkzMjItMi4xODI4OTMyIDIuMTgyODkzMiAyLjE4Mjg5MzJjLjM5LjM5IDEuMDIuMzkgMS40MSAwcy4zOS0xLjAyIDAtMS40MWwtMi4xODI4OTMyLTIuMTgyODkzMiAyLjE4Mjg5MzItMi4xODI4OTMyMmMuMzgtLjM4LjM4LTEuMDIgMC0xLjR6IiB0cmFuc2Zvcm09Im1hdHJpeCguNzA3MTA2NzggLjcwNzEwNjc4IC0uNzA3MTA2NzggLjcwNzEwNjc4IDEyIC00Ljk3MDU2MykiLz48L2c+PC9zdmc+"
                          alt=""
                        />
                      </div>
                      <div className="primary-text bold secondary">Top Up</div>
                    </div>
                    <div className="action">
                      <div className="transfer-btn">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00LjYxMjU4IDIuNzcxNDZMOS40OTMyOCAyLjc3MTQ2QzEwLjExNjYgMi43NzE0NiAxMC42Mjg2IDMuMjM4OTMgMTAuNjk4NSAzLjg0MzE0TDEwLjcwNjcgMy45ODQ4NEMxMC43MDY3IDQuNjU2MDggMTAuMTY0NSA1LjE5ODIzIDkuNDkzMjggNS4xOTgyM0g0LjYxMjU4VjcuMzg0MDRDNC42MTI1OCA3LjkzNDc5IDMuOTQ5OTUgOC4yMDE1NiAzLjU3MTMgNy44MjI5MkwwLjE4MDcxNyA0LjQzMjMzQy0wLjA2MDIzODkgNC4xOTEzOCAtMC4wNjAyMzg5IDMuODEyNzMgMC4xODA3MTcgMy41NzE3OEwzLjU3MTMgMC4xODExOTFDMy45NTg1NSAtMC4yMDYwNTkgNC42MTI1OCAwLjA2OTMxOTIgNC42MDM5NyAwLjYxMTQ2OUw0LjYxMjU4IDIuNzcxNDZaIiBmaWxsPSIjRjBGOEZGIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTIuNzcxMiA4LjA3OTgxSDcuODkwNTFDNy4yNjcyMiA4LjA3OTgxIDYuNzU1MjQgOC41NDcyOCA2LjY4NTI4IDkuMTUxNDhMNi42NzcxMyA5LjI5MzE5QzYuNjc3MTMgOS45NjQ0MyA3LjIxOTI4IDEwLjUwNjYgNy44OTA1MSAxMC41MDY2SDEyLjc3MTJWMTIuNjkyNEMxMi43NzEyIDEzLjI0MzEgMTMuNDMzOCAxMy41MDk5IDEzLjgxMjUgMTMuMTMxM0wxNy4yMDMxIDkuNzQwNjhDMTcuNDQ0IDkuNDk5NzMgMTcuNDQ0IDkuMTIxMDggMTcuMjAzMSA4Ljg4MDEzTDEzLjgxMjUgNS40ODk1NEMxMy40MjUyIDUuMTAyMjkgMTIuNzcxMiA1LjM3NzY3IDEyLjc3OTggNS45MTk4MkwxMi43NzEyIDguMDc5ODFaIiBmaWxsPSIjRjBGOEZGIi8+Cjwvc3ZnPgo=" />
                      </div>
                      <div className="primary-text bold secondary cursor-pointer">
                        Transfer
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar-content">
                  <div className="border-bottom-grey">
                    <div className="Collapsible">
                      <span
                        id="collapsible-trigger-1657572664980"
                        className="Collapsible__trigger is-closed"
                        aria-expanded="false"
                        aria-disabled="false"
                        aria-controls="collapsible-content-1657572664980"
                        role="button"
                      >
                        <div className="d-flex justify-between">
                          <div>Transfers</div>
                          <img
                            className="icn-info ml-2"
                            src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMSA5aDJ2LTJoLTJ6bTEgMTFjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0wLTE4Yy01LjUyMjg0NzUgMC0xMCA0LjQ3NzE1MjUtMTAgMTAgMCAyLjY1MjE2NDkgMS4wNTM1Njg0IDUuMTk1NzA0IDIuOTI4OTMyMTkgNy4wNzEwNjc4IDEuODc1MzYzNzggMS44NzUzNjM4IDQuNDE4OTAyOTEgMi45Mjg5MzIyIDcuMDcxMDY3ODEgMi45Mjg5MzIyczUuMTk1NzA0LTEuMDUzNTY4NCA3LjA3MTA2NzgtMi45Mjg5MzIyIDIuOTI4OTMyMi00LjQxODkwMjkgMi45Mjg5MzIyLTcuMDcxMDY3OC0xLjA1MzU2ODQtNS4xOTU3MDQwMy0yLjkyODkzMjItNy4wNzEwNjc4MWMtMS44NzUzNjM4LTEuODc1MzYzNzktNC40MTg5MDI5LTIuOTI4OTMyMTktNy4wNzEwNjc4LTIuOTI4OTMyMTl6bS0xIDE1aDJ2LTZoLTJ6IiBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                            alt="Info Icon"
                          />
                        </div>
                      </span>
                      <div
                        id="collapsible-content-1657572664980"
                        className="Collapsible__contentOuter"
                        style={{
                          height: 0,
                          transition: "height 400ms linear 0s",
                          overflow: "hidden",
                        }}
                        role="region"
                        aria-labelledby="collapsible-trigger-1657572664980"
                      >
                        <div className="Collapsible__contentInner">
                          <div className="transfers-part">
                            <div className="overline-text sm text-uppercase pt-3 border-top-grey">
                              Recent Transfers
                            </div>
                            <div className="transfers-list">
                              <div className="overline-text mt-3 sm text-uppercase">
                                You Have no Pending Transfers.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom-grey">
                    <div className="Collapsible">
                      <span
                        id="collapsible-trigger-1657572664981"
                        className="Collapsible__trigger is-closed"
                        aria-expanded="false"
                        aria-disabled="false"
                        aria-controls="collapsible-content-1657572664981"
                        role="button"
                      >
                        Wallet Settings
                      </span>
                      <div
                        id="collapsible-content-1657572664981"
                        className="Collapsible__contentOuter"
                        style={{
                          height: 0,
                          transition: "height 400ms linear 0s",
                          overflow: "hidden",
                        }}
                        role="region"
                        aria-labelledby="collapsible-trigger-1657572664981"
                      >
                        <div className="Collapsible__contentInner">
                          <div className="currency-part">
                            <div className="flex justify-content-between border-top-grey border-bottom-grey">
                              <div className="flex p-0">
                                <div className="overline-text sm text-uppercase">
                                  Hide Balance
                                </div>
                                <img
                                  className="icon cursor-pointer"
                                  src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMSA5aDJ2LTJoLTJ6bTEgMTFjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0wLTE4Yy01LjUyMjg0NzUgMC0xMCA0LjQ3NzE1MjUtMTAgMTAgMCAyLjY1MjE2NDkgMS4wNTM1Njg0IDUuMTk1NzA0IDIuOTI4OTMyMTkgNy4wNzEwNjc4IDEuODc1MzYzNzggMS44NzUzNjM4IDQuNDE4OTAyOTEgMi45Mjg5MzIyIDcuMDcxMDY3ODEgMi45Mjg5MzIyczUuMTk1NzA0LTEuMDUzNTY4NCA3LjA3MTA2NzgtMi45Mjg5MzIyIDIuOTI4OTMyMi00LjQxODkwMjkgMi45Mjg5MzIyLTcuMDcxMDY3OC0xLjA1MzU2ODQtNS4xOTU3MDQwMy0yLjkyODkzMjItNy4wNzEwNjc4MWMtMS44NzUzNjM4LTEuODc1MzYzNzktNC40MTg5MDI5LTIuOTI4OTMyMTktNy4wNzEwNjc4LTIuOTI4OTMyMTl6bS0xIDE1aDJ2LTZoLTJ6IiBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                                  alt=""
                                />
                              </div>
                              <div className="switch-container toggle ">
                                <label htmlFor="hide-balance-switcher">
                                  <input
                                    id="hide-balance-switcher"
                                    className="switch"
                                    type="checkbox"
                                  />
                                  <div className="line">
                                    <div className="cycle" />
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="overline-text sm text-uppercase">
                                display currency
                              </div>
                              <img
                                className="icon cursor-pointer"
                                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMSA5aDJ2LTJoLTJ6bTEgMTFjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0wLTE4Yy01LjUyMjg0NzUgMC0xMCA0LjQ3NzE1MjUtMTAgMTAgMCAyLjY1MjE2NDkgMS4wNTM1Njg0IDUuMTk1NzA0IDIuOTI4OTMyMTkgNy4wNzEwNjc4IDEuODc1MzYzNzggMS44NzUzNjM4IDQuNDE4OTAyOTEgMi45Mjg5MzIyIDcuMDcxMDY3ODEgMi45Mjg5MzIyczUuMTk1NzA0LTEuMDUzNTY4NCA3LjA3MTA2NzgtMi45Mjg5MzIyIDIuOTI4OTMyMi00LjQxODkwMjkgMi45Mjg5MzIyLTcuMDcxMDY3OC0xLjA1MzU2ODQtNS4xOTU3MDQwMy0yLjkyODkzMjItNy4wNzEwNjc4MWMtMS44NzUzNjM4LTEuODc1MzYzNzktNC40MTg5MDI5LTIuOTI4OTMyMTktNy4wNzEwNjc4LTIuOTI4OTMyMTl6bS0xIDE1aDJ2LTZoLTJ6IiBmaWxsPSIjZjBmOGZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                                alt=""
                              />
                            </div>
                            <div className="z-select undefined css-2b097c-container">
                              <span
                                aria-live="polite"
                                aria-atomic="false"
                                aria-relevant="additions text"
                                className="css-7pg0cj-a11yText"
                              />
                              <div className="z-select__control css-yk16xz-control">
                                <div className="z-select__value-container z-select__value-container--has-value css-1hwfws3">
                                  <div className="z-select__single-value css-1uccc91-singleValue">
                                    USD (US Dollar)
                                  </div>
                                  <input
                                    id="react-select-5-input"
                                    tabIndex={0}
                                    aria-autocomplete="list"
                                    className="css-62g3xt-dummyInput"
                                    defaultValue=""
                                  />
                                </div>
                                <div className="z-select__indicators css-1wy0on6">
                                  <span className="z-select__indicator-separator css-1okebmr-indicatorSeparator" />
                                  <div
                                    className="z-select__indicator z-select__dropdown-indicator css-tlfecz-indicatorContainer"
                                    aria-hidden="true"
                                  >
                                    <svg
                                      height={20}
                                      width={20}
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                      focusable="false"
                                      className="css-8mmkcg"
                                    >
                                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
          <div />
          <div className="page-content home">
            <main>
              <Section
                className="get-started-bg"
                as="section"
                css={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(31, 28, 58, .9), rgba(31, 28, 58, .9) 10%, transparent 40%, rgba(34, 38, 45, .75) 70%, #22262d 90%), url(b0d7d4ad43691cc5a7ed.jpg);",
                }}
              />
              <section className="get-started-section">
                <div className="get-started-content">
                  <h1 className="get-started-text">OWN. RACE. EARN.</h1>
                  <p className="get-started-cta">
                    The future of digital racehorse ownership is here. Race your
                    way to the top and build your legacy today.
                  </p>
                  <button className="primary-btn sm start">START</button>
                </div>
              </section>
              <section className="">
                <div className="section-content">
                  <div className="title">
                    <img
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHdpZHRoPSIxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgOS01IDR2LTh6bTQtOWMxLjEgMCAyIC44OSAyIDJ2MTRjMCAxLjEwNDU3LS44OTU0MyAyLTIgMmgtMTRjLTEuMTA0NTcgMC0yLS44OTU0My0yLTJ2LTE0YzAtMS4xMDQ1Ny44OTU0My0yIDItMnptMCAyaC0xNHYxNGgxNHoiIGZpbGw9IiNmMGY4ZmYiLz48L3N2Zz4="
                      alt="video"
                    />
                    <h3 className="overline-text text-uppercase">
                      streaming now
                    </h3>
                  </div>
                  <div className="">
                    <div className="streaming">
                      <iframe
                        src={twitchURL}
                        scrolling="no"
                        width="100%"
                        height="100%"
                        frameBorder={0}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="race-section">
                <div className="section-content">
                  <div className="next-to-run">
                    <div className="title">
                      <div className="title-left">
                        <img
                          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMiAyMGM0LjQxODI3OCAwIDgtMy41ODE3MjIgOC04cy0zLjU4MTcyMi04LTgtOC04IDMuNTgxNzIyLTggOCAzLjU4MTcyMiA4IDggOHptMC0xOGMyLjY1MjE2NDkgMCA1LjE5NTcwNCAxLjA1MzU2ODQgNy4wNzEwNjc4IDIuOTI4OTMyMTkgMS44NzUzNjM4IDEuODc1MzYzNzggMi45Mjg5MzIyIDQuNDE4OTAyOTEgMi45Mjg5MzIyIDcuMDcxMDY3ODEgMCA1LjUyMjg0NzUtNC40NzcxNTI1IDEwLTEwIDEwLTUuNTMgMC0xMC00LjUtMTAtMTAgMC01LjUyMjg0NzUgNC40NzcxNTI1LTEwIDEwLTEwem0uNSA1djUuMjVsNC41IDIuNjctLjc1IDEuMjMtNS4yNS0zLjE1di02eiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                          alt="time"
                        />
                        <h3>Next to Run</h3>
                      </div>
                      <div className="title-right">
                        <a
                          className="see-all start"
                          style={{ cursor: "pointer" }}
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div className="races">
                      <div className="next-run-list">
                        <a
                          className="race-tile green-gradient-background start"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="race-name primary-text bold">
                              <span>San Diego Grand Prix</span>
                            </div>
                          </div>
                          <div className="info">
                            <div className="time overline-text sm bold">
                              <span className="countdown color-gold">Live</span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="race-tile green-gradient-background start"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="race-name primary-text bold">
                              <span>NASCAR Stakes</span>
                            </div>
                          </div>
                          <div className="info">
                            <div className="time overline-text sm bold">
                              <span className="countdown color-gold">Live</span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="race-tile green-gradient-background start"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="race-name primary-text bold">
                              <span>Czech Day Classic</span>
                            </div>
                          </div>
                          <div className="info">
                            <div className="time overline-text sm bold">
                              <span className="countdown color-gold">Live</span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="race-tile green-gradient-background start"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="race-name primary-text bold">
                              <span>NASCAR Stakes</span>
                            </div>
                          </div>
                          <div className="info">
                            <div className="time overline-text sm bold">
                              <span className="countdown color-gold">Live</span>
                            </div>
                          </div>
                        </a>
                        <a
                          className="race-tile green-gradient-background start"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="race-name primary-text bold">
                              <span>Budweiser Brewery</span>
                            </div>
                          </div>
                          <div className="info">
                            <div className="time overline-text sm bold">
                              <span className="countdown color-gold">Live</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="up-and-coming">
                    <div className="title">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xNC40IDZoNS42djEwaC03bC0uNC0yaC01LjZ2N2gtMnYtMTdoOXptLS40IDhoMnYtMmgydi0yaC0ydi0yaC0ydjJsLTEtMnYtMmgtMnYyaC0ydi0yaC0ydjJoMnYyaC0ydjJoMnYtMmgydjJoMnYtMmwxIDJ6bS0zLTR2LTJoMnYyem0zIDBoMnYyaC0yeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                        alt="flag"
                      />
                      <h3>Up and Coming</h3>
                    </div>
                    <div className="races">
                      <div className="race-card race-card__info">
                        <div className="d-flex flex-column">
                          <p className="overline-text sm bold country">US</p>
                          <h3 className="h3-text bold city">Daytona Beach</h3>
                          <span className="primary-text bold group">
                            Discovery
                          </span>
                        </div>
                        <img
                          className="free-race-badge"
                          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgNTMgMjQiIHdpZHRoPSI1MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im00IDBoMzguODU5MjY1YzEuMzM3NDEyNyAwIDIuNTg2MzM4LjY2ODQwNDU0IDMuMzI4MjAxMSAxLjc4MTE5OTIybDUuMzMzMzMzNCA4Yy44OTU3MzE3IDEuMzQzNTk3NjguODk1NzMxNyAzLjA5NDAwMzg4IDAgNC40Mzc2MDE1OGwtNS4zMzMzMzM0IDhjLS43NDE4NjMxIDEuMTEyNzk0Ny0xLjk5MDc4ODQgMS43ODExOTkyLTMuMzI4MjAxMSAxLjc4MTE5OTJoLTM4Ljg1OTI2NWMtMi4yMDkxMzkgMC00LTEuNzkwODYxLTQtNHYtMTZjMC0yLjIwOTEzOSAxLjc5MDg2MS00IDQtNHoiIGZpbGw9IiNmZWU5MTIiLz48cGF0aCBkPSJtMTAuNjg4IDE3IC43MTQtMy41N2g0LjUyMmwuMzc4LTEuODJoLTQuNTVsLjUxOC0yLjU5aDUuMTI0bC4zNzgtMS44MmgtNy40MDZsLTEuOTYgOS44em04LjcwOCAwIC43MjgtMy42NGMuMTQtLjY5MDY2NjcuNDA4MzMzMy0xLjE5OTMzMzMuODA1LTEuNTI2cy45MjYzMzMzLS40OSAxLjU4OS0uNDljLjA3NDY2NjcgMCAuMjQyNjY2Ny4wMDkzMzMzLjUwNC4wMjhsLjM5Mi0yLjAxNmMtLjYyNTMzMzMgMC0xLjE2OS4wNzkzMzMzMy0xLjYzMS4yMzhzLS44NTYzMzMzLjQxNTMzMzMtMS4xODMuNzdsLjE4Mi0uODk2aC0yLjA3MmwtMS40OTggNy41MzJ6bTcuODU0LjExMmMuNTk3MzMzMyAwIDEuMTY2NjY2Ny0uMDg0IDEuNzA4LS4yNTJzMS4wMjItLjQyIDEuNDQyLS43NTZsLS45MS0xLjQ0MmMtLjI2MTMzMzMuMjI0LS41NjcuMzk2NjY2Ny0uOTE3LjUxOHMtLjcxNjMzMzMuMTgyLTEuMDk5LjE4MmMtMS4yMjI2NjY3IDAtMS44NzEzMzMzLS41MTMzMzMzLTEuOTQ2LTEuNTRoNS43NjhjLjA4NC0uNDIuMTI2LS44MDI2NjY3LjEyNi0xLjE0OCAwLS42NjI2NjY3LS4xNDctMS4yNDYtLjQ0MS0xLjc1cy0uNzA5MzMzMy0uODkxMzMzMy0xLjI0Ni0xLjE2MmMtLjUzNjY2NjctLjI3MDY2NjY3LTEuMTY5LS40MDYtMS44OTctLjQwNi0uODU4NjY2NyAwLTEuNjI0LjE4OS0yLjI5Ni41NjdzLTEuMTk3LjkwMDY2NjctMS41NzUgMS41NjgtLjU2NyAxLjQxNjMzMzMtLjU2NyAyLjI0N2MwIC42NzIuMTU2MzMzMyAxLjI2NDY2NjcuNDY5IDEuNzc4cy43NjA2NjY3LjkwNzY2NjcgMS4zNDQgMS4xODMgMS4yNjIzMzMzLjQxMyAyLjAzNy40MTN6bTIuMTctNC41NjRoLTMuNzM4Yy4xNDkzMzMzLS40ODUzMzMzLjQwMTMzMzMtLjg2NTY2NjcuNzU2LTEuMTQxcy43ODg2NjY3LS40MTMgMS4zMDItLjQxMy45MjE2NjY3LjEzNzY2NjcgMS4yMjUuNDEzLjQ1NS42NTU2NjY3LjQ1NSAxLjE0MXptNi42MjIgNC41NjRjLjU5NzMzMzMgMCAxLjE2NjY2NjctLjA4NCAxLjcwOC0uMjUyczEuMDIyLS40MiAxLjQ0Mi0uNzU2bC0uOTEtMS40NDJjLS4yNjEzMzMzLjIyNC0uNTY3LjM5NjY2NjctLjkxNy41MThzLS43MTYzMzMzLjE4Mi0xLjA5OS4xODJjLTEuMjIyNjY2NyAwLTEuODcxMzMzMy0uNTEzMzMzMy0xLjk0Ni0xLjU0aDUuNzY4Yy4wODQtLjQyLjEyNi0uODAyNjY2Ny4xMjYtMS4xNDggMC0uNjYyNjY2Ny0uMTQ3LTEuMjQ2LS40NDEtMS43NXMtLjcwOTMzMzMtLjg5MTMzMzMtMS4yNDYtMS4xNjJjLS41MzY2NjY3LS4yNzA2NjY2Ny0xLjE2OS0uNDA2LTEuODk3LS40MDYtLjg1ODY2NjcgMC0xLjYyNC4xODktMi4yOTYuNTY3cy0xLjE5Ny45MDA2NjY3LTEuNTc1IDEuNTY4LS41NjcgMS40MTYzMzMzLS41NjcgMi4yNDdjMCAuNjcyLjE1NjMzMzMgMS4yNjQ2NjY3LjQ2OSAxLjc3OHMuNzYwNjY2Ny45MDc2NjY3IDEuMzQ0IDEuMTgzIDEuMjYyMzMzMy40MTMgMi4wMzcuNDEzem0yLjE3LTQuNTY0aC0zLjczOGMuMTQ5MzMzMy0uNDg1MzMzMy40MDEzMzMzLS44NjU2NjY3Ljc1Ni0xLjE0MXMuNzg4NjY2Ny0uNDEzIDEuMzAyLS40MTMuOTIxNjY2Ny4xMzc2NjY3IDEuMjI1LjQxMy40NTUuNjU1NjY2Ny40NTUgMS4xNDF6IiBmaWxsPSIjMTgxOTFjIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                          alt="Free Race Badge"
                        />
                        <div className="race-right">
                          <span className="d-flex align-items-center gates-left">
                            <b>4</b> gates left
                          </span>
                          <a
                            className="buy-in primary-btn sm bold start"
                            style={{ cursor: "pointer" }}
                          >
                            Enter
                          </a>
                        </div>
                      </div>
                      <div className="race-card race-card__info">
                        <div className="d-flex flex-column">
                          <p className="overline-text sm bold country">NZ</p>
                          <h3 className="h3-text bold city">Auckland</h3>
                          <span className="primary-text bold group">
                            Discovery
                          </span>
                        </div>
                        <img
                          className="free-race-badge"
                          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgNTMgMjQiIHdpZHRoPSI1MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im00IDBoMzguODU5MjY1YzEuMzM3NDEyNyAwIDIuNTg2MzM4LjY2ODQwNDU0IDMuMzI4MjAxMSAxLjc4MTE5OTIybDUuMzMzMzMzNCA4Yy44OTU3MzE3IDEuMzQzNTk3NjguODk1NzMxNyAzLjA5NDAwMzg4IDAgNC40Mzc2MDE1OGwtNS4zMzMzMzM0IDhjLS43NDE4NjMxIDEuMTEyNzk0Ny0xLjk5MDc4ODQgMS43ODExOTkyLTMuMzI4MjAxMSAxLjc4MTE5OTJoLTM4Ljg1OTI2NWMtMi4yMDkxMzkgMC00LTEuNzkwODYxLTQtNHYtMTZjMC0yLjIwOTEzOSAxLjc5MDg2MS00IDQtNHoiIGZpbGw9IiNmZWU5MTIiLz48cGF0aCBkPSJtMTAuNjg4IDE3IC43MTQtMy41N2g0LjUyMmwuMzc4LTEuODJoLTQuNTVsLjUxOC0yLjU5aDUuMTI0bC4zNzgtMS44MmgtNy40MDZsLTEuOTYgOS44em04LjcwOCAwIC43MjgtMy42NGMuMTQtLjY5MDY2NjcuNDA4MzMzMy0xLjE5OTMzMzMuODA1LTEuNTI2cy45MjYzMzMzLS40OSAxLjU4OS0uNDljLjA3NDY2NjcgMCAuMjQyNjY2Ny4wMDkzMzMzLjUwNC4wMjhsLjM5Mi0yLjAxNmMtLjYyNTMzMzMgMC0xLjE2OS4wNzkzMzMzMy0xLjYzMS4yMzhzLS44NTYzMzMzLjQxNTMzMzMtMS4xODMuNzdsLjE4Mi0uODk2aC0yLjA3MmwtMS40OTggNy41MzJ6bTcuODU0LjExMmMuNTk3MzMzMyAwIDEuMTY2NjY2Ny0uMDg0IDEuNzA4LS4yNTJzMS4wMjItLjQyIDEuNDQyLS43NTZsLS45MS0xLjQ0MmMtLjI2MTMzMzMuMjI0LS41NjcuMzk2NjY2Ny0uOTE3LjUxOHMtLjcxNjMzMzMuMTgyLTEuMDk5LjE4MmMtMS4yMjI2NjY3IDAtMS44NzEzMzMzLS41MTMzMzMzLTEuOTQ2LTEuNTRoNS43NjhjLjA4NC0uNDIuMTI2LS44MDI2NjY3LjEyNi0xLjE0OCAwLS42NjI2NjY3LS4xNDctMS4yNDYtLjQ0MS0xLjc1cy0uNzA5MzMzMy0uODkxMzMzMy0xLjI0Ni0xLjE2MmMtLjUzNjY2NjctLjI3MDY2NjY3LTEuMTY5LS40MDYtMS44OTctLjQwNi0uODU4NjY2NyAwLTEuNjI0LjE4OS0yLjI5Ni41NjdzLTEuMTk3LjkwMDY2NjctMS41NzUgMS41NjgtLjU2NyAxLjQxNjMzMzMtLjU2NyAyLjI0N2MwIC42NzIuMTU2MzMzMyAxLjI2NDY2NjcuNDY5IDEuNzc4cy43NjA2NjY3LjkwNzY2NjcgMS4zNDQgMS4xODMgMS4yNjIzMzMzLjQxMyAyLjAzNy40MTN6bTIuMTctNC41NjRoLTMuNzM4Yy4xNDkzMzMzLS40ODUzMzMzLjQwMTMzMzMtLjg2NTY2NjcuNzU2LTEuMTQxcy43ODg2NjY3LS40MTMgMS4zMDItLjQxMy45MjE2NjY3LjEzNzY2NjcgMS4yMjUuNDEzLjQ1NS42NTU2NjY3LjQ1NSAxLjE0MXptNi42MjIgNC41NjRjLjU5NzMzMzMgMCAxLjE2NjY2NjctLjA4NCAxLjcwOC0uMjUyczEuMDIyLS40MiAxLjQ0Mi0uNzU2bC0uOTEtMS40NDJjLS4yNjEzMzMzLjIyNC0uNTY3LjM5NjY2NjctLjkxNy41MThzLS43MTYzMzMzLjE4Mi0xLjA5OS4xODJjLTEuMjIyNjY2NyAwLTEuODcxMzMzMy0uNTEzMzMzMy0xLjk0Ni0xLjU0aDUuNzY4Yy4wODQtLjQyLjEyNi0uODAyNjY2Ny4xMjYtMS4xNDggMC0uNjYyNjY2Ny0uMTQ3LTEuMjQ2LS40NDEtMS43NXMtLjcwOTMzMzMtLjg5MTMzMzMtMS4yNDYtMS4xNjJjLS41MzY2NjY3LS4yNzA2NjY2Ny0xLjE2OS0uNDA2LTEuODk3LS40MDYtLjg1ODY2NjcgMC0xLjYyNC4xODktMi4yOTYuNTY3cy0xLjE5Ny45MDA2NjY3LTEuNTc1IDEuNTY4LS41NjcgMS40MTYzMzMzLS41NjcgMi4yNDdjMCAuNjcyLjE1NjMzMzMgMS4yNjQ2NjY3LjQ2OSAxLjc3OHMuNzYwNjY2Ny45MDc2NjY3IDEuMzQ0IDEuMTgzIDEuMjYyMzMzMy40MTMgMi4wMzcuNDEzem0yLjE3LTQuNTY0aC0zLjczOGMuMTQ5MzMzMy0uNDg1MzMzMy40MDEzMzMzLS44NjU2NjY3Ljc1Ni0xLjE0MXMuNzg4NjY2Ny0uNDEzIDEuMzAyLS40MTMuOTIxNjY2Ny4xMzc2NjY3IDEuMjI1LjQxMy40NTUuNjU1NjY2Ny40NTUgMS4xNDF6IiBmaWxsPSIjMTgxOTFjIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                          alt="Free Race Badge"
                        />
                        <div className="race-right">
                          <span className="d-flex align-items-center gates-left">
                            <b>6</b> gates left
                          </span>
                          <a
                            className="buy-in primary-btn sm bold start"
                            style={{ cursor: "pointer" }}
                          >
                            Enter
                          </a>
                        </div>
                      </div>
                      <div className="race-card race-card__info">
                        <div className="d-flex flex-column">
                          <p className="overline-text sm bold country">FR</p>
                          <h3 className="h3-text bold city">Paris</h3>
                          <span className="primary-text bold group">
                            Discovery
                          </span>
                        </div>
                        <img
                          className="free-race-badge"
                          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgNTMgMjQiIHdpZHRoPSI1MyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im00IDBoMzguODU5MjY1YzEuMzM3NDEyNyAwIDIuNTg2MzM4LjY2ODQwNDU0IDMuMzI4MjAxMSAxLjc4MTE5OTIybDUuMzMzMzMzNCA4Yy44OTU3MzE3IDEuMzQzNTk3NjguODk1NzMxNyAzLjA5NDAwMzg4IDAgNC40Mzc2MDE1OGwtNS4zMzMzMzM0IDhjLS43NDE4NjMxIDEuMTEyNzk0Ny0xLjk5MDc4ODQgMS43ODExOTkyLTMuMzI4MjAxMSAxLjc4MTE5OTJoLTM4Ljg1OTI2NWMtMi4yMDkxMzkgMC00LTEuNzkwODYxLTQtNHYtMTZjMC0yLjIwOTEzOSAxLjc5MDg2MS00IDQtNHoiIGZpbGw9IiNmZWU5MTIiLz48cGF0aCBkPSJtMTAuNjg4IDE3IC43MTQtMy41N2g0LjUyMmwuMzc4LTEuODJoLTQuNTVsLjUxOC0yLjU5aDUuMTI0bC4zNzgtMS44MmgtNy40MDZsLTEuOTYgOS44em04LjcwOCAwIC43MjgtMy42NGMuMTQtLjY5MDY2NjcuNDA4MzMzMy0xLjE5OTMzMzMuODA1LTEuNTI2cy45MjYzMzMzLS40OSAxLjU4OS0uNDljLjA3NDY2NjcgMCAuMjQyNjY2Ny4wMDkzMzMzLjUwNC4wMjhsLjM5Mi0yLjAxNmMtLjYyNTMzMzMgMC0xLjE2OS4wNzkzMzMzMy0xLjYzMS4yMzhzLS44NTYzMzMzLjQxNTMzMzMtMS4xODMuNzdsLjE4Mi0uODk2aC0yLjA3MmwtMS40OTggNy41MzJ6bTcuODU0LjExMmMuNTk3MzMzMyAwIDEuMTY2NjY2Ny0uMDg0IDEuNzA4LS4yNTJzMS4wMjItLjQyIDEuNDQyLS43NTZsLS45MS0xLjQ0MmMtLjI2MTMzMzMuMjI0LS41NjcuMzk2NjY2Ny0uOTE3LjUxOHMtLjcxNjMzMzMuMTgyLTEuMDk5LjE4MmMtMS4yMjI2NjY3IDAtMS44NzEzMzMzLS41MTMzMzMzLTEuOTQ2LTEuNTRoNS43NjhjLjA4NC0uNDIuMTI2LS44MDI2NjY3LjEyNi0xLjE0OCAwLS42NjI2NjY3LS4xNDctMS4yNDYtLjQ0MS0xLjc1cy0uNzA5MzMzMy0uODkxMzMzMy0xLjI0Ni0xLjE2MmMtLjUzNjY2NjctLjI3MDY2NjY3LTEuMTY5LS40MDYtMS44OTctLjQwNi0uODU4NjY2NyAwLTEuNjI0LjE4OS0yLjI5Ni41NjdzLTEuMTk3LjkwMDY2NjctMS41NzUgMS41NjgtLjU2NyAxLjQxNjMzMzMtLjU2NyAyLjI0N2MwIC42NzIuMTU2MzMzMyAxLjI2NDY2NjcuNDY5IDEuNzc4cy43NjA2NjY3LjkwNzY2NjcgMS4zNDQgMS4xODMgMS4yNjIzMzMzLjQxMyAyLjAzNy40MTN6bTIuMTctNC41NjRoLTMuNzM4Yy4xNDkzMzMzLS40ODUzMzMzLjQwMTMzMzMtLjg2NTY2NjcuNzU2LTEuMTQxcy43ODg2NjY3LS40MTMgMS4zMDItLjQxMy45MjE2NjY3LjEzNzY2NjcgMS4yMjUuNDEzLjQ1NS42NTU2NjY3LjQ1NSAxLjE0MXptNi42MjIgNC41NjRjLjU5NzMzMzMgMCAxLjE2NjY2NjctLjA4NCAxLjcwOC0uMjUyczEuMDIyLS40MiAxLjQ0Mi0uNzU2bC0uOTEtMS40NDJjLS4yNjEzMzMzLjIyNC0uNTY3LjM5NjY2NjctLjkxNy41MThzLS43MTYzMzMzLjE4Mi0xLjA5OS4xODJjLTEuMjIyNjY2NyAwLTEuODcxMzMzMy0uNTEzMzMzMy0xLjk0Ni0xLjU0aDUuNzY4Yy4wODQtLjQyLjEyNi0uODAyNjY2Ny4xMjYtMS4xNDggMC0uNjYyNjY2Ny0uMTQ3LTEuMjQ2LS40NDEtMS43NXMtLjcwOTMzMzMtLjg5MTMzMzMtMS4yNDYtMS4xNjJjLS41MzY2NjY3LS4yNzA2NjY2Ny0xLjE2OS0uNDA2LTEuODk3LS40MDYtLjg1ODY2NjcgMC0xLjYyNC4xODktMi4yOTYuNTY3cy0xLjE5Ny45MDA2NjY3LTEuNTc1IDEuNTY4LS41NjcgMS40MTYzMzMzLS41NjcgMi4yNDdjMCAuNjcyLjE1NjMzMzMgMS4yNjQ2NjY3LjQ2OSAxLjc3OHMuNzYwNjY2Ny45MDc2NjY3IDEuMzQ0IDEuMTgzIDEuMjYyMzMzMy40MTMgMi4wMzcuNDEzem0yLjE3LTQuNTY0aC0zLjczOGMuMTQ5MzMzMy0uNDg1MzMzMy40MDEzMzMzLS44NjU2NjY3Ljc1Ni0xLjE0MXMuNzg4NjY2Ny0uNDEzIDEuMzAyLS40MTMuOTIxNjY2Ny4xMzc2NjY3IDEuMjI1LjQxMy40NTUuNjU1NjY2Ny40NTUgMS4xNDF6IiBmaWxsPSIjMTgxOTFjIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+"
                          alt="Free Race Badge"
                        />
                        <div className="race-right">
                          <span className="d-flex align-items-center gates-left">
                            <b>7</b> gates left
                          </span>
                          <a
                            className="buy-in primary-btn sm bold start"
                            style={{ cursor: "pointer" }}
                          >
                            Enter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                    <a
                      className="more-races outline-btn green start"
                      style={{ cursor: "pointer" }}
                    >
                      More Races
                    </a>
                  </div>
                </div>
              </section>
              <section className="horse-section">
                <div className="section-content">
                  <div className="css-356hzk">
                    <div className="css-gkru61">
                      <div className="css-1su0r75">
                        <h2 className="chakra-heading css-1efy1dg">
                          Create your free stable
                        </h2>
                        <p className="chakra-text css-trrl61">
                          Become a stable owner and start racing now to win!
                        </p>
                      </div>
                      <div className="css-j511wc">
                        <a
                          className="chakra-button css-1bipqwz start"
                          style={{ cursor: "pointer" }}
                        >
                          start
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="horse-section">
                <div className="section-content">
                  <div className="in-stud">
                    <div className="title">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMy41IDE5Yy02LjI3LTUuNjM1ODY5Ni05LjUtOC41LTkuNS0xMS45MTg0NzgyNiAwLTIuODY0MTMwNDQgMi4yOC01LjA4MTUyMTc0IDUuMjI1LTUuMDgxNTIxNzQgMS42MTUgMCAzLjIzLjczOTEzMDQzIDQuMjc1IDEuOTQwMjE3MzkgMS4wNDUtMS4yMDEwODY5NiAyLjY2LTEuOTQwMjE3MzkgNC4yNzUtMS45NDAyMTczOSAyLjk0NSAwIDUuMjI1IDIuMjE3MzkxMyA1LjIyNSA1LjA4MTUyMTc0IDAgMy41MTA4Njk1Ni0zLjIzIDYuMzc0OTk5OTYtOS41IDExLjkxODQ3ODI2em0tMS41Ljc4MTI1Yy02LjMxMzA0MzQ4LTUuNTMxMjUtMTAuMDQzNDc4MjYtOC44MTI1LTEwLjA0MzQ3ODI2LTEzLjIxODc1IDAtLjE4NzUgMC0uMzc1IDAtLjU2MjUtLjU3MzkxMzA0Ljg0Mzc1LS45NTY1MjE3NCAxLjg3NS0uOTU2NTIxNzQgMyAwIDMuNTYyNSAzLjI1MjE3MzkxIDYuNDY4NzUgOS41NjUyMTc0IDEyeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                        alt="stud"
                      />
                      <h3>In Stud</h3>
                    </div>
                    <div className="horses">
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={2}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(242, 243, 244)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                          Bacon   
                        </span>
                        <span className="group">Z35 · Colt · Buterin</span>
                        <span className="price">
                          $42,62 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={3}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(255, 145, 175)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                           Impossible   
                        </span>
                        <span className="group">Z5 · Stallion · Finney</span>
                        <span className="price">
                          $53,47 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={4}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{ backgroundColor: "rgb(74, 93, 35)" }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">Hyperbolic   </span>
                        <span className="group">Z10 · Stallion · Finney</span>
                        <span className="price">
                          $78,37 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={5}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{ backgroundColor: "rgb(27, 24, 17)" }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">Knight   </span>
                        <span className="group">Z10 · Stallion · Buterin</span>
                        <span className="price">
                          $24,75 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={6}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(156, 37, 66)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">Just   </span>
                        <span className="group">Z10 · Stallion · Buterin</span>
                        <span className="price">
                          $46,75 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={7}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(222, 111, 161)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                          Ford   
                        </span>
                        <span className="group">Z20 · Stallion · Buterin</span>
                        <span className="price">
                          $47,17 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={8}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{ backgroundColor: "rgb(0, 0, 0)" }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                          Lord   
                        </span>
                        <span className="group">Z12 · Stallion · Finney</span>
                        <span className="price">
                          $38,56 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={9}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(238, 232, 170)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                          Bakhu   
                        </span>
                        <span className="group">Z8 · Stallion · Buterin</span>
                        <span className="price">
                          $38,58 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={10}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{ backgroundColor: "rgb(77, 93, 83)" }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">Seven   </span>
                        <span className="group">Z56 · Colt · Buterin</span>
                        <span className="price">
                          $24,75 <b>USD</b>
                        </span>
                      </div>
                      <div className="horse">
                        <div className="label-horse">
                          <div
                            className="horse-container"
                            style={{
                              width: "10%",
                              marginLeft: 0,
                              right: "0%",
                              maxWidth: "100%",
                              borderRadius: 0,
                              overflow: "hidden",
                            }}
                            data-projection-id={11}
                          >
                            <div className="">
                              <div className="">
                                <img
                                  className="horse-pose"
                                  src="assets/62618e445b17d55f8c84.png"
                                  alt=""
                                />
                                <div
                                  className="horse-mask-portrait"
                                  style={{
                                    backgroundColor: "rgb(245, 111, 161)",
                                  }}
                                />
                                <img
                                  className="horse-glow"
                                  src="assets/7cc9a26d41b9fe8e601d.png"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="name racehorse-name">
                          Roughneck   
                        </span>
                        <span className="group">Z8 · Stallion · Buterin</span>
                        <span className="price">
                          $78,37 <b>USD</b>
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <a
                        className="more-breeding outline-btn green start"
                        style={{ cursor: "pointer" }}
                      >
                        More Breeding
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
          <footer className="footer ">
            <div className="footer-content">
              <div className="nav-part">
                <div className="primary-text helpful">
                  Copyright ©Z<span className="symbol">Ξ</span>D
                </div>
                <a
                  className="primary-text secondary"
                  href="https://zed.run/terms"
                >
                  Terms of Service
                </a>
                <a
                  className="primary-text secondary text-capitalize"
                  href="https://zed.run/privacy"
                >
                  Privacy Policy
                </a>
                <a
                  className="primary-text secondary text-capitalize"
                  href="https://zed.run/ccpa"
                >
                  CCPA
                </a>
              </div>
              <div className="count-part">
                <span>18+</span>
              </div>
              <div className="icons-part">
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://community.zed.run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-zed"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTIgMTYiIHdpZHRoPSIxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMCAwaDEwYzEuMTA0NTcgMCAyIC44OTU0MyAyIDJsLTkgMTJoN2MxLjEwNDU3IDAgMiAuODk1NDMgMiAyaC0xMGMtMS4xMDQ1NyAwLTItLjg5NTQzLTItMmw5LTEyaC03Yy0xLjEwNDU3IDAtMi0uODk1NDMtMi0yeiIgZmlsbD0iI2YwZjhmZiIvPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://www.twitch.tv/zed_run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-twitch"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im00IDJoMTh2MTJsLTUgNWgtNGwtMyAzaC0zdi0zaC01di0xM3ptMTYgMTF2LTloLTE0djEyaDN2M2wzLTNoNXptLTUtNmgydjVoLTJ6bS0zIDB2NWgtMnYtNXoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://discord.gg/zedrun"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-discord"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im05LjIzOTcxNCA1LjAwMDAxOTQ4Yy0uMjY1MTAzLjAwMTA3MDk3LTIuNDU4MjIyMi4wNjM0ODkxNS00Ljc3MTg0ODYgMS43ODc0MjQ2OSAwIDAtMi40Njc4NjU0IDQuNDUxMTE1NDMtMi40Njc4NjU0IDkuOTMzMzM4MDMgMCAwIDEuNDM5NTY0OTggMi40NzQ3MDc1IDUuMjI3MDU2MiAyLjU5NTAwNzMgMCAwIC42MzQxMDIyLS43NTYxNzIgMS4xNDgyNDEyLTEuNDA5MjI2Mi0yLjE3NjUyMjItLjY1MzA1NTMtMi45OTkxNDA0LTIuMDEwNjY5NS0yLjk5OTE0MDQtMi4wMTA2Njk1cy4xNzE0MTYuMTIwMjc4OS40Nzk4OTk2LjI5MjEzNTdjLjAxNzEzNzggMCAuMDM0MjI0NC4wMTcxNTkyLjA2ODUwMDQuMDM0MzQ1My4wNTE0MTM4LjAzNDM3MDguMTAyODQ0LjA1MTU1OTMuMTU0MjU4LjA4NTkzMDIuNDI4NDQ5Mi4yNDA1OTkyLjg1Njg4NDYuNDI5NjY1NyAxLjI1MTA1OC41ODQzMzc0LjcwMjY1NjYuMjkyMTU2NCAxLjU0MjQ0My41NDk5MTU5IDIuNTE5MzA3Mi43Mzg5NTg0IDEuMjg1MzQ3Mi4yNDA1OTk1IDIuNzkzNDYxMi4zMjY1MTQ3IDQuNDM4NzA2NC4wMTcxNzI3LjgwNTQ4NDgtLjE1NDY3MDggMS42MjgxNTg4LS4zNzgwNTk1IDIuNDg1MDU3Mi0uNzM4OTU4NC41OTk4Mjg0LS4yMjM0MTM3IDEuMjY4MTg1LS41NDk5MDg1IDEuOTcwODQxLTEuMDEzOTIxMyAwIDAtLjg1Njg4MzQgMS4zOTIwMzk3LTMuMTAxOTU3MiAyLjAyNzkwODkuNTE0MTM5NC42MzU4Njg0IDEuMTMxMTE2MiAxLjM3NDgxMzkgMS4xMzExMTYyIDEuMzc0ODEzOSAzLjc4NzQ5MDgtLjEyMDI5ODMgNS4yMjcwNTYyLTIuNTk1MDIwNSA1LjIyNzA1NjItMi41Nzc4MzQ0IDAtNS40ODIyMjI2LTIuNDY3ODY1OC05LjkzMzMzODAzLTIuNDY3ODY1OC05LjkzMzMzODAzLTIuNDUwNzI4Ni0xLjgzODg2NDQtNC43OTg2NjQ0LTEuNzg3MjkxMzItNC43OTg2NjQ0LTEuNzg3MjkxMzJsLS4yMzk4ODM0LjI3NDk2MjQ3YzIuOTEzNDU1NC44NzY0NjgxIDQuMjY3MzIzMiAyLjE2NTQyMzUzIDQuMjY3MzIzMiAyLjE2NTQyMzUzLTEuNzgyMzQ5Mi0uOTYyMzk2NDItMy41MzAzODI4LTEuNDQzNjI4MzYtNS4xNTg0ODk2LTEuNjMyNjcwNDUtMS4yMzM5MzM4LS4xMzc0ODUyNC0yLjQxNjQ5OTgtLjEwMzA3MzM3LTMuNDYxOTE1Mi4wMzQ0MTE2OC0uMTAyODI3NCAwLS4xODg0OTY4LjAxNzE2MDIxLS4yOTEzMjQ2LjAzNDM0NTI4LS41OTk4Mjg4LjA2ODc0MzEzLTIuMDU2NTQ0Mi4yNzQ5NTM0NC0zLjg5MDMwNyAxLjA4MjY3ODgyLS42MzQxMDQ2LjI3NDk3MDItMS4wMTExNzQyLjQ4MTIzNDY3LTEuMDExMTc0Mi40ODEyMzQ2N3MxLjQwNTMxMzYtMS4zNTc3MTI0IDQuNDkwMTQ3OC0yLjIzNDE4MDY5bC0uMTcxMzgzMi0uMjA2MjA1MzFzLS4wMDkwNzYtLjAwMDIwNDU2LS4wMjY3NDk2LS4wMDAxNDAzOXptLS4zOTc3NDkwNyA2LjMxNTc3MDAyYy45OTk5MTU3NiAwIDEuODA2ODc0NzcuODQzOTg5NiAxLjc4OTMzMzM3IDEuODk0NzAzMiAwIDEuMDUwNzE1MS0uNzg5NDE3NjEgMS44OTQ3NzA1LTEuNzg5MzMzMzcgMS44OTQ3NzA1LS45ODIzNzM3NSAwLTEuNzg5MzMzMzUtLjg0NDA1NTQtMS43ODkzMzMzNS0xLjg5NDc3MDUgMC0xLjA1MDcxMzYuNzg5NDE3MTktMS44OTQ3MDMyIDEuNzg5MzMzMzUtMS44OTQ3MDMyem02LjMxNTkyOTc3IDBjLjk4MjQ1MDYgMCAxLjc4OTQ3MzcuODQzOTg5NiAxLjc4OTQ3MzcgMS44OTQ3MDMyIDAgMS4wNTA3MTUxLS43ODk0Nzg3IDEuODk0NzcwNS0xLjc4OTQ3MzcgMS44OTQ3NzA1LS45ODI0NTAzIDAtMS43ODk0NzM2LS44NDQwNTU0LTEuNzg5NDczNi0xLjg5NDc3MDUgMC0xLjA1MDcxMzYuNzg5NDc5MS0xLjg5NDcwMzIgMS43ODk0NzM2LTEuODk0NzAzMnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://t.me/joinchat/Tq0wUgj_L4zQ4a_m"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-telegram"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im05Ljc4IDE4LjY1LjI4LTQuMjMgNy42OC02LjkyYy4zNC0uMzEtLjA3LS40Ni0uNTItLjE5bC05LjQ4IDUuOTktNC4xLTEuM2MtLjg4LS4yNS0uODktLjg2LjItMS4zbDE1Ljk3LTYuMTZjLjczLS4zMyAxLjQzLjE4IDEuMTUgMS4zbC0yLjcyIDEyLjgxYy0uMTkuOTEtLjc0IDEuMTMtMS41LjcxbC00LjE0LTMuMDYtMS45OSAxLjkzYy0uMjMuMjMtLjQyLjQyLS44My40MnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://twitter.com/zed_run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-twitter"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0yMi45MiA2Yy0uNzcuMzUtMS42LjU4LTIuNDYuNjkuODgtLjUzIDEuNTYtMS4zNyAxLjg4LTIuMzgtLjgzLjUtMS43NS44NS0yLjcyIDEuMDUtLjc5LS44Ni0xLjktMS4zNi0zLjE2LTEuMzYtMi4zNSAwLTQuMjcgMS45Mi00LjI3IDQuMjkgMCAuMzQuMDQuNjcuMTEuOTgtMy41Ni0uMTgtNi43My0xLjg5LTguODQtNC40OC0uMzcuNjMtLjU4IDEuMzctLjU4IDIuMTUgMCAxLjQ5Ljc1IDIuODEgMS45MSAzLjU2LS43MSAwLTEuMzctLjItMS45NS0uNXYuMDNjMCAyLjA4IDEuNDggMy44MiAzLjQ0IDQuMjEtLjM2LjEtLjc0LjE1LTEuMTMuMTUtLjI3IDAtLjU0LS4wMy0uOC0uMDguNTQgMS42OSAyLjExIDIuOTUgNCAyLjk4LTEuNDYgMS4xNi0zLjMxIDEuODQtNS4zMyAxLjg0LS4zNCAwLS42OC0uMDItMS4wMi0uMDYgMS45IDEuMjIgNC4xNiAxLjkzIDYuNTggMS45MyA3Ljg4IDAgMTIuMjEtNi41NCAxMi4yMS0xMi4yMSAwLS4xOSAwLS4zNy0uMDEtLjU2Ljg0LS42IDEuNTYtMS4zNiAyLjE0LTIuMjN6IiBmaWxsPSIjZjBmOGZmIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://www.youtube.com/channel/UCJ8lTFHpvsT2pJHaZk8942Q"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-youtube"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMCAxNSA1LjE5LTMtNS4xOS0zem0xMS41Ni03LjgzYy4xMy40Ny4yMiAxLjEuMjggMS45LjA3LjguMSAxLjQ5LjEgMi4wOWwuMDYuODRjMCAyLjE5LS4xNiAzLjgtLjQ0IDQuODMtLjI1LjktLjgzIDEuNDgtMS43MyAxLjczLS40Ny4xMy0xLjMzLjIyLTIuNjUuMjgtMS4zLjA3LTIuNDkuMS0zLjU5LjFsLTEuNTkuMDZjLTQuMTkgMC02LjgtLjE2LTcuODMtLjQ0LS45LS4yNS0xLjQ4LS44My0xLjczLTEuNzMtLjEzLS40Ny0uMjItMS4xLS4yOC0xLjktLjA3LS44LS4xLTEuNDktLjEtMi4wOWwtLjA2LS44NGMwLTIuMTkuMTYtMy44LjQ0LTQuODMuMjUtLjkuODMtMS40OCAxLjczLTEuNzMuNDctLjEzIDEuMzMtLjIyIDIuNjUtLjI4IDEuMy0uMDcgMi40OS0uMSAzLjU5LS4xbDEuNTktLjA2YzQuMTkgMCA2LjguMTYgNy44My40NC45LjI1IDEuNDguODMgMS43MyAxLjczeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://www.facebook.com/runzedrun/"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-facebook"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im01IDNoMTRjMS4xMDQ1Njk1IDAgMiAuODk1NDMwNSAyIDJ2MTRjMCAxLjEwNDU2OTUtLjg5NTQzMDUgMi0yIDJoLTE0Yy0xLjEwNDU2OTUgMC0yLS44OTU0MzA1LTItMnYtMTRjMC0xLjEwNDU2OTUuODk1NDMwNS0yIDItMnptMTMgMmgtMi41Yy0xLjkzMjk5NjYgMC0zLjUgMS41NjcwMDMzOC0zLjUgMy41djIuNWgtMnYzaDJ2N2gzdi03aDN2LTNoLTN2LTJjMC0uNTUyMjg0NzUuNDQ3NzE1My0xIDEtMWgyeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="icon-part"
                  target="_blank"
                  href="https://www.instagram.com/zed.run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-instagram"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy44IDJoOC40YzMuMiAwIDUuOCAyLjYgNS44IDUuOHY4LjRjMCAzLjIwMzI1MTUtMi41OTY3NDg1IDUuOC01LjggNS44aC04LjRjLTMuMiAwLTUuOC0yLjYtNS44LTUuOHYtOC40YzAtMy4yMDMyNTE1NSAyLjU5Njc0ODQ1LTUuOCA1LjgtNS44em0tLjIgMmMtMS45ODgyMjUxIDAtMy42IDEuNjExNzc0OS0zLjYgMy42djguOGMwIDEuOTkgMS42MSAzLjYgMy42IDMuNmg4LjhjMS45ODgyMjUxIDAgMy42LTEuNjExNzc0OSAzLjYtMy42di04LjhjMC0xLjk5LTEuNjEtMy42LTMuNi0zLjZ6bTkuNjUgMS41Yy42OTAzNTU5IDAgMS4yNS41NTk2NDQwNiAxLjI1IDEuMjVzLS41NTk2NDQxIDEuMjUtMS4yNSAxLjI1LTEuMjUtLjU1OTY0NDA2LTEuMjUtMS4yNS41NTk2NDQxLTEuMjUgMS4yNS0xLjI1em0tNS4yNSAxLjVjMi43NjE0MjM3IDAgNSAyLjIzODU3NjI1IDUgNSAwIDIuNzYxNDIzNy0yLjIzODU3NjMgNS01IDUtMi43NjE0MjM3NSAwLTUtMi4yMzg1NzYzLTUtNSAwLTIuNzYxNDIzNzUgMi4yMzg1NzYyNS01IDUtNXptMCAyYy0xLjY1Njg1NDIgMC0zIDEuMzQzMTQ1OC0zIDNzMS4zNDMxNDU4IDMgMyAzIDMtMS4zNDMxNDU4IDMtMy0xLjM0MzE0NTgtMy0zLTN6IiBmaWxsPSIjZjBmOGZmIi8+PC9zdmc+"
                    />
                  </div>
                </a>
              </div>
            </div>
          </footer>
          <footer className="app-footer mobile" style={{ height: "auto" }}>
            <div className="footer-content">
              <div className="social-links">
                <a
                  className="social-item"
                  target="_blank"
                  href="https://community.zed.run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-zed"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTIgMTYiIHdpZHRoPSIxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMCAwaDEwYzEuMTA0NTcgMCAyIC44OTU0MyAyIDJsLTkgMTJoN2MxLjEwNDU3IDAgMiAuODk1NDMgMiAyaC0xMGMtMS4xMDQ1NyAwLTItLjg5NTQzLTItMmw5LTEyaC03Yy0xLjEwNDU3IDAtMi0uODk1NDMtMi0yeiIgZmlsbD0iI2YwZjhmZiIvPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://www.twitch.tv/zed_run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-twitch"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im00IDJoMTh2MTJsLTUgNWgtNGwtMyAzaC0zdi0zaC01di0xM3ptMTYgMTF2LTloLTE0djEyaDN2M2wzLTNoNXptLTUtNmgydjVoLTJ6bS0zIDB2NWgtMnYtNXoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://discord.gg/zedrun"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-discord"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im05LjIzOTcxNCA1LjAwMDAxOTQ4Yy0uMjY1MTAzLjAwMTA3MDk3LTIuNDU4MjIyMi4wNjM0ODkxNS00Ljc3MTg0ODYgMS43ODc0MjQ2OSAwIDAtMi40Njc4NjU0IDQuNDUxMTE1NDMtMi40Njc4NjU0IDkuOTMzMzM4MDMgMCAwIDEuNDM5NTY0OTggMi40NzQ3MDc1IDUuMjI3MDU2MiAyLjU5NTAwNzMgMCAwIC42MzQxMDIyLS43NTYxNzIgMS4xNDgyNDEyLTEuNDA5MjI2Mi0yLjE3NjUyMjItLjY1MzA1NTMtMi45OTkxNDA0LTIuMDEwNjY5NS0yLjk5OTE0MDQtMi4wMTA2Njk1cy4xNzE0MTYuMTIwMjc4OS40Nzk4OTk2LjI5MjEzNTdjLjAxNzEzNzggMCAuMDM0MjI0NC4wMTcxNTkyLjA2ODUwMDQuMDM0MzQ1My4wNTE0MTM4LjAzNDM3MDguMTAyODQ0LjA1MTU1OTMuMTU0MjU4LjA4NTkzMDIuNDI4NDQ5Mi4yNDA1OTkyLjg1Njg4NDYuNDI5NjY1NyAxLjI1MTA1OC41ODQzMzc0LjcwMjY1NjYuMjkyMTU2NCAxLjU0MjQ0My41NDk5MTU5IDIuNTE5MzA3Mi43Mzg5NTg0IDEuMjg1MzQ3Mi4yNDA1OTk1IDIuNzkzNDYxMi4zMjY1MTQ3IDQuNDM4NzA2NC4wMTcxNzI3LjgwNTQ4NDgtLjE1NDY3MDggMS42MjgxNTg4LS4zNzgwNTk1IDIuNDg1MDU3Mi0uNzM4OTU4NC41OTk4Mjg0LS4yMjM0MTM3IDEuMjY4MTg1LS41NDk5MDg1IDEuOTcwODQxLTEuMDEzOTIxMyAwIDAtLjg1Njg4MzQgMS4zOTIwMzk3LTMuMTAxOTU3MiAyLjAyNzkwODkuNTE0MTM5NC42MzU4Njg0IDEuMTMxMTE2MiAxLjM3NDgxMzkgMS4xMzExMTYyIDEuMzc0ODEzOSAzLjc4NzQ5MDgtLjEyMDI5ODMgNS4yMjcwNTYyLTIuNTk1MDIwNSA1LjIyNzA1NjItMi41Nzc4MzQ0IDAtNS40ODIyMjI2LTIuNDY3ODY1OC05LjkzMzMzODAzLTIuNDY3ODY1OC05LjkzMzMzODAzLTIuNDUwNzI4Ni0xLjgzODg2NDQtNC43OTg2NjQ0LTEuNzg3MjkxMzItNC43OTg2NjQ0LTEuNzg3MjkxMzJsLS4yMzk4ODM0LjI3NDk2MjQ3YzIuOTEzNDU1NC44NzY0NjgxIDQuMjY3MzIzMiAyLjE2NTQyMzUzIDQuMjY3MzIzMiAyLjE2NTQyMzUzLTEuNzgyMzQ5Mi0uOTYyMzk2NDItMy41MzAzODI4LTEuNDQzNjI4MzYtNS4xNTg0ODk2LTEuNjMyNjcwNDUtMS4yMzM5MzM4LS4xMzc0ODUyNC0yLjQxNjQ5OTgtLjEwMzA3MzM3LTMuNDYxOTE1Mi4wMzQ0MTE2OC0uMTAyODI3NCAwLS4xODg0OTY4LjAxNzE2MDIxLS4yOTEzMjQ2LjAzNDM0NTI4LS41OTk4Mjg4LjA2ODc0MzEzLTIuMDU2NTQ0Mi4yNzQ5NTM0NC0zLjg5MDMwNyAxLjA4MjY3ODgyLS42MzQxMDQ2LjI3NDk3MDItMS4wMTExNzQyLjQ4MTIzNDY3LTEuMDExMTc0Mi40ODEyMzQ2N3MxLjQwNTMxMzYtMS4zNTc3MTI0IDQuNDkwMTQ3OC0yLjIzNDE4MDY5bC0uMTcxMzgzMi0uMjA2MjA1MzFzLS4wMDkwNzYtLjAwMDIwNDU2LS4wMjY3NDk2LS4wMDAxNDAzOXptLS4zOTc3NDkwNyA2LjMxNTc3MDAyYy45OTk5MTU3NiAwIDEuODA2ODc0NzcuODQzOTg5NiAxLjc4OTMzMzM3IDEuODk0NzAzMiAwIDEuMDUwNzE1MS0uNzg5NDE3NjEgMS44OTQ3NzA1LTEuNzg5MzMzMzcgMS44OTQ3NzA1LS45ODIzNzM3NSAwLTEuNzg5MzMzMzUtLjg0NDA1NTQtMS43ODkzMzMzNS0xLjg5NDc3MDUgMC0xLjA1MDcxMzYuNzg5NDE3MTktMS44OTQ3MDMyIDEuNzg5MzMzMzUtMS44OTQ3MDMyem02LjMxNTkyOTc3IDBjLjk4MjQ1MDYgMCAxLjc4OTQ3MzcuODQzOTg5NiAxLjc4OTQ3MzcgMS44OTQ3MDMyIDAgMS4wNTA3MTUxLS43ODk0Nzg3IDEuODk0NzcwNS0xLjc4OTQ3MzcgMS44OTQ3NzA1LS45ODI0NTAzIDAtMS43ODk0NzM2LS44NDQwNTU0LTEuNzg5NDczNi0xLjg5NDc3MDUgMC0xLjA1MDcxMzYuNzg5NDc5MS0xLjg5NDcwMzIgMS43ODk0NzM2LTEuODk0NzAzMnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://t.me/joinchat/Tq0wUgj_L4zQ4a_m"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-telegram"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im05Ljc4IDE4LjY1LjI4LTQuMjMgNy42OC02LjkyYy4zNC0uMzEtLjA3LS40Ni0uNTItLjE5bC05LjQ4IDUuOTktNC4xLTEuM2MtLjg4LS4yNS0uODktLjg2LjItMS4zbDE1Ljk3LTYuMTZjLjczLS4zMyAxLjQzLjE4IDEuMTUgMS4zbC0yLjcyIDEyLjgxYy0uMTkuOTEtLjc0IDEuMTMtMS41LjcxbC00LjE0LTMuMDYtMS45OSAxLjkzYy0uMjMuMjMtLjQyLjQyLS44My40MnoiIGZpbGw9IiNmMGY4ZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://twitter.com/zed_run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-twitter"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0yMi45MiA2Yy0uNzcuMzUtMS42LjU4LTIuNDYuNjkuODgtLjUzIDEuNTYtMS4zNyAxLjg4LTIuMzgtLjgzLjUtMS43NS44NS0yLjcyIDEuMDUtLjc5LS44Ni0xLjktMS4zNi0zLjE2LTEuMzYtMi4zNSAwLTQuMjcgMS45Mi00LjI3IDQuMjkgMCAuMzQuMDQuNjcuMTEuOTgtMy41Ni0uMTgtNi43My0xLjg5LTguODQtNC40OC0uMzcuNjMtLjU4IDEuMzctLjU4IDIuMTUgMCAxLjQ5Ljc1IDIuODEgMS45MSAzLjU2LS43MSAwLTEuMzctLjItMS45NS0uNXYuMDNjMCAyLjA4IDEuNDggMy44MiAzLjQ0IDQuMjEtLjM2LjEtLjc0LjE1LTEuMTMuMTUtLjI3IDAtLjU0LS4wMy0uOC0uMDguNTQgMS42OSAyLjExIDIuOTUgNCAyLjk4LTEuNDYgMS4xNi0zLjMxIDEuODQtNS4zMyAxLjg0LS4zNCAwLS42OC0uMDItMS4wMi0uMDYgMS45IDEuMjIgNC4xNiAxLjkzIDYuNTggMS45MyA3Ljg4IDAgMTIuMjEtNi41NCAxMi4yMS0xMi4yMSAwLS4xOSAwLS4zNy0uMDEtLjU2Ljg0LS42IDEuNTYtMS4zNiAyLjE0LTIuMjN6IiBmaWxsPSIjZjBmOGZmIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://www.youtube.com/channel/UCJ8lTFHpvsT2pJHaZk8942Q"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-youtube"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im0xMCAxNSA1LjE5LTMtNS4xOS0zem0xMS41Ni03LjgzYy4xMy40Ny4yMiAxLjEuMjggMS45LjA3LjguMSAxLjQ5LjEgMi4wOWwuMDYuODRjMCAyLjE5LS4xNiAzLjgtLjQ0IDQuODMtLjI1LjktLjgzIDEuNDgtMS43MyAxLjczLS40Ny4xMy0xLjMzLjIyLTIuNjUuMjgtMS4zLjA3LTIuNDkuMS0zLjU5LjFsLTEuNTkuMDZjLTQuMTkgMC02LjgtLjE2LTcuODMtLjQ0LS45LS4yNS0xLjQ4LS44My0xLjczLTEuNzMtLjEzLS40Ny0uMjItMS4xLS4yOC0xLjktLjA3LS44LS4xLTEuNDktLjEtMi4wOWwtLjA2LS44NGMwLTIuMTkuMTYtMy44LjQ0LTQuODMuMjUtLjkuODMtMS40OCAxLjczLTEuNzMuNDctLjEzIDEuMzMtLjIyIDIuNjUtLjI4IDEuMy0uMDcgMi40OS0uMSAzLjU5LS4xbDEuNTktLjA2YzQuMTkgMCA2LjguMTYgNy44My40NC45LjI1IDEuNDguODMgMS43MyAxLjczeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://www.facebook.com/runzedrun/"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-facebook"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDBoMjR2MjRoLTI0eiIvPjxwYXRoIGQ9Im01IDNoMTRjMS4xMDQ1Njk1IDAgMiAuODk1NDMwNSAyIDJ2MTRjMCAxLjEwNDU2OTUtLjg5NTQzMDUgMi0yIDJoLTE0Yy0xLjEwNDU2OTUgMC0yLS44OTU0MzA1LTItMnYtMTRjMC0xLjEwNDU2OTUuODk1NDMwNS0yIDItMnptMTMgMmgtMi41Yy0xLjkzMjk5NjYgMC0zLjUgMS41NjcwMDMzOC0zLjUgMy41djIuNWgtMnYzaDJ2N2gzdi03aDN2LTNoLTN2LTJjMC0uNTUyMjg0NzUuNDQ3NzE1My0xIDEtMWgyeiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg=="
                    />
                  </div>
                </a>
                <a
                  className="social-item"
                  target="_blank"
                  href="https://www.instagram.com/zed.run"
                  rel="noopener noreferrer"
                >
                  <div className="icon-sm">
                    <img
                      className="icon icon-instagram"
                      src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy44IDJoOC40YzMuMiAwIDUuOCAyLjYgNS44IDUuOHY4LjRjMCAzLjIwMzI1MTUtMi41OTY3NDg1IDUuOC01LjggNS44aC04LjRjLTMuMiAwLTUuOC0yLjYtNS44LTUuOHYtOC40YzAtMy4yMDMyNTE1NSAyLjU5Njc0ODQ1LTUuOCA1LjgtNS44em0tLjIgMmMtMS45ODgyMjUxIDAtMy42IDEuNjExNzc0OS0zLjYgMy42djguOGMwIDEuOTkgMS42MSAzLjYgMy42IDMuNmg4LjhjMS45ODgyMjUxIDAgMy42LTEuNjExNzc0OSAzLjYtMy42di04LjhjMC0xLjk5LTEuNjEtMy42LTMuNi0zLjZ6bTkuNjUgMS41Yy42OTAzNTU5IDAgMS4yNS41NTk2NDQwNiAxLjI1IDEuMjVzLS41NTk2NDQxIDEuMjUtMS4yNSAxLjI1LTEuMjUtLjU1OTY0NDA2LTEuMjUtMS4yNS41NTk2NDQxLTEuMjUgMS4yNS0xLjI1em0tNS4yNSAxLjVjMi43NjE0MjM3IDAgNSAyLjIzODU3NjI1IDUgNSAwIDIuNzYxNDIzNy0yLjIzODU3NjMgNS01IDUtMi43NjE0MjM3NSAwLTUtMi4yMzg1NzYzLTUtNSAwLTIuNzYxNDIzNzUgMi4yMzg1NzYyNS01IDUtNXptMCAyYy0xLjY1Njg1NDIgMC0zIDEuMzQzMTQ1OC0zIDNzMS4zNDMxNDU4IDMgMyAzIDMtMS4zNDMxNDU4IDMtMy0xLjM0MzE0NTgtMy0zLTN6IiBmaWxsPSIjZjBmOGZmIi8+PC9zdmc+"
                    />
                  </div>
                </a>
              </div>
              <div className="play-part">
                <div className="number">18+</div>
              </div>
              <div className="primary-text helpful">
                Copyright © Z<span className="symbol">Ξ</span>D
              </div>
              <div className="terms-privacy">
                <div>
                  <a
                    className="primary-text secondary text-capitalize"
                    href="/terms"
                  >
                    Terms of Service
                  </a>
                </div>
                <div>
                  <a
                    className="primary-text secondary text-capitalize"
                    href="/privacy"
                  >
                    Privacy Policy
                  </a>
                </div>
                <div>
                  <a
                    className="primary-text secondary text-capitalize"
                    href="/ccpa"
                  >
                    CCPA
                  </a>
                </div>
              </div>
            </div>
          </footer>
          <div className="scroll-to-top">
            <div
              style={{
                position: "fixed",
                bottom: 50,
                right: 30,
                cursor: "pointer",
                transitionDuration: "0.2s",
                transitionTimingFunction: "linear",
                transitionDelay: "0s",
                opacity: 1,
                visibility: "visible",
                transitionProperty: "opacity, visibility",
              }}
              id="scroll-top"
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHdpZHRoPSIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTEuMjIzOTUgMTguMTM1NDFjMCAuNjU4ODUtLjU1MzU1IDEuMTk3OTItMS4yMzAwOSAxLjE5NzkyLS42NzY1NiAwLTEuMjMwMDktLjUzOTA3LTEuMjMwMDktMS4xOTc5MnYtMTMuMzgwODNsLTYuMDAyODUgNS44NDU4N2MtLjQ3OTc1LjQ2NzItMS4yNTQ3MS40NjcyLTEuNzM0NDQgMC0uNDc5NzMtLjQ2NzE5LS40Nzk3My0xLjIyMTg4IDAtMS42ODkwN2w4LjEwNjMyLTcuODk0MzNjLjQ3OTczLS40NjcxOSAxLjI1NDY5LS40NjcxOSAxLjczNDQzIDBsOC4xMDYzMiA3Ljg5NDMzYy40Nzk3My40NjcxOS40Nzk3MyAxLjIyMTg4IDAgMS42ODkwNy0uNDc5NzMuNDY3Mi0xLjI2Ny40NjcyLTEuNzQ2NzMgMGwtNi4wMDI4NS01Ljg0NTg3eiIgZmlsbD0iI2YwZjhmZiIgZmlsbC1vcGFjaXR5PSIuNjQiLz48L3N2Zz4="
                alt="arrow-up"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="grecaptcha-badge"
          data-style="bottomright"
          style={{
            width: 256,
            height: 60,
            display: "block",
            transition: "right 0.3s ease 0s",
            position: "fixed",
            bottom: 14,
            right: "-186px",
            boxShadow: "gray 0px 0px 5px",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div className="grecaptcha-logo">
            <iframe
              title="reCAPTCHA"
              src="assets/anchor.htm"
              role="presentation"
              name="a-jc27mp5pinyd"
              scrolling="no"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
              width={256}
              height={60}
              frameBorder={0}
            />
          </div>
          <div className="grecaptcha-error" />
          <textarea
            id="g-recaptcha-response-100000"
            name="g-recaptcha-response"
            className="g-recaptcha-response"
            style={{
              width: 250,
              height: 40,
              border: "1px solid rgb(193, 193, 193)",
              margin: "10px 25px",
              padding: 0,
              resize: "none",
              display: "none",
            }}
            defaultValue={""}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
