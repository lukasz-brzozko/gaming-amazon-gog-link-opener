// ==UserScript==
// @name         Gog Redeem Opener
// @namespace    http://tampermonkey.net/
// @version      2024-07-05
// @description  try to take over the world!
// @author       You
// @match        https://gaming.amazon.com/*
// @icon         https://m.media-amazon.com/images/G/01/samus/prime/Favicon_72x72.svg
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const SELECTORS = {
    copyButton: ".copy-button",
    copyItemContainer: "[data-a-target='accordion_entry'], .item-thank-you",
    gameCode: ".copyable-item input",
    claimInstructions: ".claim-instructions__text",
  };

  const PLATFORMS = {
    gog: "GOG Galaxy",
  };

  const handleContextMenu = (e) => {
    const { target } = e;
    const copyButton = target.closest(SELECTORS.copyButton);
    const copyItemContainer = target.closest(SELECTORS.copyItemContainer);
    const gameCode = copyItemContainer.querySelector(SELECTORS.gameCode)?.value;
    const claimInstructions = copyItemContainer.querySelector(
      SELECTORS.claimInstructions
    )?.textContent;

    const isGogInstructions = claimInstructions
      ?.toLowerCase()
      .includes(PLATFORMS.gog.toLowerCase());

    const isGogKey = copyButton && gameCode && isGogInstructions;

    if (!isGogKey) return;

    e.preventDefault();
    const url = `https://www.gog.com/redeem/${gameCode}`;
    window.open(url, "_blank");
  };

  document.addEventListener("contextmenu", handleContextMenu);
})();
