/* APPROACH section scripts */

if (document.querySelectorAll('.approach__item_reverse--2').lenght !== 0) {
  function arrowValidHeight() {
    const items = document.querySelectorAll('.approach__item_reverse--2');
    items.forEach(el => {
      const itemHeight = el.offsetHeight;
      const prevItemHeight = el.previousElementSibling.offsetHeight;
      const itemsHeight = itemHeight + prevItemHeight;
      const itemValidHeight = Math.round(itemsHeight / 15) * 15;
      el.querySelector('.approach__item-arrow').style.height = `${itemValidHeight}px`;
    });
  }

  arrowValidHeight();
  window.addEventListener('resize', arrowValidHeight);
}

/* END APPROACH section scripts */
