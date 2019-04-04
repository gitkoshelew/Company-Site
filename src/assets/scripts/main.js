// $(window).load(function() {

jQuery(function() {
  var isIE = /*@cc_on!@*/ false || !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia,
    isMS = !(isIE || isEdge);

  if (jQuery('.header__slider').length !== 0) {
    var headerSlider = jQuery('.header__slider');
    console.log('initial');
    headerSlider.slick({
      arrows: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      speed: 700,
      autoplay: false,
      autoplaySpeed: 7000,
      cssEase: 'linear',
      useTransform: isMS,
      useCSS: isMS,
      pauseOnHover: false,
      focusOnSelect: true,
      pauseOnDotsHover: false,
      pauseOnFocus: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        },
      ],
    });

    headerSlider.find('.slick-arrow').html('<div class="round-btn-bg"></div>');
  }

  if (jQuery('.portfolio__slider-wrapper').length !== 0) {
    var portfolioSlider = jQuery('.portfolio__slider-wrapper');

    portfolioSlider.slick({
      arrows: true,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      speed: 700,
      autoplay: false,
      autoplaySpeed: 7000,
      cssEase: 'linear',
      useTransform: isMS,
      useCSS: isMS,
      pauseOnHover: false,
      focusOnSelect: true,
      pauseOnDotsHover: false,
      pauseOnFocus: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        },
      ],
    });

    portfolioSlider.find('.slick-arrow').html('<div class="round-btn-bg"></div>');
  }
});
//});
