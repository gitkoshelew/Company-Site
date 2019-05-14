window.addEventListener(
  'dragover',
  function(e) {
    e = e || event;
    e.preventDefault();
  },
  false
);
window.addEventListener(
  'drop',
  function(e) {
    e = e || event;
    e.preventDefault();
  },
  false
);

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
