// Swaps the preloaded Google Fonts stylesheet link to an active stylesheet
// once it finishes loading. Done here, as a same-origin external script,
// rather than via an inline onload="" attribute, so it works under a strict
// Content-Security-Policy (script-src 'self', no 'unsafe-inline').
(function () {
  var link = document.querySelector('link[data-font-swap]');
  if (!link) return;
  link.addEventListener('load', function onLoad() {
    link.removeEventListener('load', onLoad);
    link.rel = 'stylesheet';
  });
})();
