// ==UserScript==
// @name         GitHub PR: Lines Viewed Progress Bar
// @namespace    https://github.com/ilyachch-userscripts/
// @version      1.0
// @description  Adds a progress bar to GitHub PRs showing the number of lines viewed based on reviewed checkboxes.
// @author       ilyachch
// @homepage     https://github.com/ilyachch-userscripts/four-pda-cleaner
// @source       https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @supportURL   https://github.com/ilyachch-userscripts/four-pda-cleaner/issues
// @updateURL    https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @license      MIT
// @run-at       document-end
// @grant        GM_addStyle
// @match        https://4pda.to/*
// @icon         https://4pda.to/s/CBbKBwWAx2gpwRhz1cGtMFubQ.ico
// ==/UserScript==

GM_addStyle(`
    html, body {
        height: 0 !important;
    }
    `);

(function () {
  "use strict";

  function removeAdsLinks() {
    console.log("Removing ads links");
    // find all a tags where href matches template https://4pda.to/dddd/dd/dd/d+?/

    const adsLinks = document.querySelectorAll("a");
    adsLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.match(/\d{4}\/\d{2}\/\d{2}\/\d+\/$/)) {
        console.log("Removing link: ", link);
        link.style.display = "none !important";
      }
    });
  }

  removeAdsLinks();
})();
