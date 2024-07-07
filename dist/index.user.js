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

  var SELECTORS = {
    copyButton: ".copy-button",
    copyItemContainer: "[data-a-target='accordion_entry'], .item-thank-you",
    gameCode: ".copyable-item input",
    claimInstructions: ".claim-instructions__text"
  };
  var PLATFORMS = {
    gog: "GOG Galaxy"
  };
  var handleContextMenu = function handleContextMenu(e) {
    var _copyItemContainer$qu, _copyItemContainer$qu2;
    var target = e.target;
    var copyButton = target.closest(SELECTORS.copyButton);
    var copyItemContainer = target.closest(SELECTORS.copyItemContainer);
    var gameCode = (_copyItemContainer$qu = copyItemContainer.querySelector(SELECTORS.gameCode)) === null || _copyItemContainer$qu === void 0 ? void 0 : _copyItemContainer$qu.value;
    var claimInstructions = (_copyItemContainer$qu2 = copyItemContainer.querySelector(SELECTORS.claimInstructions)) === null || _copyItemContainer$qu2 === void 0 ? void 0 : _copyItemContainer$qu2.textContent;
    var isGogInstructions = claimInstructions === null || claimInstructions === void 0 ? void 0 : claimInstructions.toLowerCase().includes(PLATFORMS.gog.toLowerCase());
    var isGogKey = copyButton && gameCode && isGogInstructions;
    if (!isGogKey) return;
    e.preventDefault();
    var url = "https://www.gog.com/redeem/".concat(gameCode);
    window.open(url, "_blank");
  };
  document.addEventListener("contextmenu", handleContextMenu);
})();