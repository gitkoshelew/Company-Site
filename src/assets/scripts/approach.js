/* APPROACH section scripts */

if (document.querySelectorAll('.approach__item').lenght !== 0) {
  function approachValidHeight() {
    const items = document.querySelectorAll('.approach__item');
    items.forEach(el => {
      const itemHeight = el.offsetHeight;
      const itemValidHeight = Math.round(itemHeight / 15) * 15 + 5;
      el.style.height = `${itemValidHeight}px`;
    });
  }

  approachValidHeight();
  window.addEventListener('resize', approachValidHeight);
}

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
