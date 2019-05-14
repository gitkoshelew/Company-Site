/* TABS section scripts */

if (document.querySelectorAll('.tabs').lenght !== 0) {
  tabsSwitcher();

  function tabsSwitcher() {
    const tabs = document.querySelectorAll('.tabs');

    tabs.forEach(tabSection => {
      const tabsElements = tabSection.querySelectorAll('.tabs__list-item');
      const tabsContent = tabSection.querySelectorAll('.tabs__content');

      tabsElements.forEach((el, idx) => {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          if (el.classList.contains('tabs__list-item_active')) {
            return false;
          }

          const activeNumber = el.closest('.tabs__list').querySelector('.tabs__list-item_active').dataset.tab;

          tabsElements[activeNumber].classList.remove('tabs__list-item_active');
          tabsContent[activeNumber].classList.remove('tabs__content_active');

          this.classList.add('tabs__list-item_active');
          tabsContent[idx].classList.add('tabs__content_active');
        });
      });
    });
  }
}

/* END TABS section scripts */
