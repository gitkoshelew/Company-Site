// Sticky nav

if (jQuery('.header__nav').length !== 0) {
  if (window.innerWidth >= 1200) {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 200) {
        $('.header__nav')
          .fadeIn()
          .addClass('fixed');
      } else {
        $('.header__nav')
          .fadeIn(10)
          .removeClass('fixed');
      }
    });
  }
}

// Cookie warning

if (document.querySelectorAll('.header__cookie-btn').length !== 0) {
  document.querySelector('.header__cookie-btn').addEventListener('click', function() {
    this.closest('.header__cookie').classList.add('d-none');
  });
}

// Nav mobile open

$('.header__head-open-button').click(function() {
  $(this).toggleClass('isOpen');
  $(document.body).toggleClass('no--scroll');
  $(this)
    .prev('nav')
    .toggleClass('isOpen');
});
