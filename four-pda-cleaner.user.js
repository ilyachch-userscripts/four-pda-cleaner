// ==UserScript==
// @name         FourPDA Cleaner
// @namespace    https://github.com/ilyachch-userscripts/
// @version      1.0
// @description  Removes advertising links from the 4pda.to website for a cleaner browsing experience.
// @author       ilyachch
// @homepage     https://github.com/ilyachch-userscripts/four-pda-cleaner
// @source       https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @supportURL   https://github.com/ilyachch-userscripts/four-pda-cleaner/issues
// @updateURL    https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/ilyachch-userscripts/four-pda-cleaner/main/four-pda-cleaner.user.js
// @license      MIT
// @run-at       document-end
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
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

  const SHOW_RECOMMENDED_KEY = "show_recommended";
  const showRecommended = GM_getValue(SHOW_RECOMMENDED_KEY, false);

  function toggleRecommended() {
    GM_setValue(SHOW_RECOMMENDED_KEY, !showRecommended);
    location.reload();
  }

  GM_registerMenuCommand(
    showRecommended ? "Hide recommended posts" : "Show recommended posts",
    toggleRecommended
  );

  function cleanPage() {
    if (showRecommended) return;

    console.log("Cleaning page");

    // find all a tags where href matches template https://4pda.to/dddd/dd/dd/d+?/
    const adsLinks = document.querySelectorAll("a");
    adsLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.match(/\d{4}\/\d{2}\/\d{2}\/\d+\/$/)) {
        console.log("Removing link: ", link);
        link.style.display = "none !important";
      }
    });

    // Hide recommended posts
    const container = document.querySelector(
      ".advanced-area.single.singlewside.singlewside"
    );
    if (container) {
      const comments = container.querySelector("#comments");
      if (comments) {
        const recommended = comments.nextElementSibling;
        if (recommended && recommended.tagName === "ARTICLE") {
          console.log("Removing recommended posts: ", recommended);
          recommended.style.display = "none";
        }
      }
    }
  }

  cleanPage();
})();
