(function () {
  "use strict";

  // Kill popups
  window.open = function () {
    console.warn("Popup blocked");
    return null;
  };

  // Block forced redirects
  const origAssign = window.location.assign;
  window.location.assign = function (url) {
    if (!url.includes("vipserije.com")) {
      console.warn("Redirect blocked:", url);
      return;
    }
    origAssign.call(window.location, url);
  };

  // Clean ads from DOM
  const selectors = [
    '[id*="ad"]',
    '[class*="ad"]',
    '[class*="banner"]',
    '[class*="ads"]',
    'iframe[src*="ad"]',
    'iframe[src*="ads"]',
    'iframe[src*="banner"]',
    'script[src*="ad"]',
    'script[src*="banner"]',
  ];

  function removeAds() {
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.remove());
    });
  }

  new MutationObserver(removeAds).observe(document, {
    childList: true,
    subtree: true,
  });
  setInterval(removeAds, 1500);
})();
