// $(window).load(function() {

jQuery(function() {
  var isIE = /*@cc_on!@*/ false || !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia,
    isMS = !(isIE || isEdge);

  if (jQuery('.header__slider').length !== 0) {
    var headerSlider = jQuery('.header__slider');
    console.log('initial');
    headerSlider.slick({
      arrows: false,
      dots: true,
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
            autoplay: false,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        },
      ],
    });

    const numbers = headerSlider
      .find('.slick-dots .slick-active button')
      .attr('aria-label')
      .split(' ');
    headerSlider.append('<div class="header__slider-number">1/' + numbers[2] + '</div>');

    headerSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
      const button = $(this).find('.slick-dots .slick-active button');
      const numbers = $(button)
        .attr('aria-label')
        .split(' ');
      $(this)
        .find('.header__slider-number')
        .html(numbers[0] + '/' + numbers[2]);
    });
  }

  if (jQuery('.stories__slider-wrapper').length !== 0) {
    var storiesSlider = jQuery('.stories__slider-wrapper');

    storiesSlider.slick({
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
            autoplay: false,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        },
      ],
    });

    storiesSlider.find('.slick-arrow').html('<div class="round-btn-bg"></div>');
  }

  if (jQuery('.clientsay__slider').length !== 0) {
    var clientsaySlider = jQuery('.clientsay__slider');

    clientsaySlider.slick({
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
            autoplay: false,
            pauseOnHover: false,
            pauseOnFocus: false,
          },
        },
      ],
    });

    clientsaySlider.find('.slick-arrow').html('<div class="round-btn-bg"></div>');
  }
});
//});
