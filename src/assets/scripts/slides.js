const isIE = /*@cc_on!@*/ false || !!document.documentMode,
  isEdge = !isIE && !!window.StyleMedia,
  isMS = !(isIE || isEdge);

jQuery(function() {
  // Header slider
  if (jQuery('.header__slider').length !== 0) {
    const headerSlider = jQuery('.header__slider');
    headerSlider.slick({
      arrows: false,
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
      pauseOnFocus: true,
    });

    headerSlider
      .find('.slick-list')
      .addClass('header__slider-list')
      .append('<div class="section--filter"></div>');
    headerSlider.slick('slickPrev');

    const headerSliderSupport = jQuery('.header__slider_support');
    headerSliderSupport.slick({
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
      pauseOnFocus: true,
    });

    const headerSliderSupportDots = headerSliderSupport.find('.slick-dots');
    headerSliderSupportDots.addClass('button--dots');
    const headerSliderSupportDotsArray = headerSliderSupportDots.find('button');
    const sliderLength = headerSliderSupportDotsArray.length;

    headerSliderSupport.append('<div class="header__slider-number">1/' + sliderLength + '</div>');

    headerSliderSupport.on('afterChange', function(event, slick, currentSlide) {
      $(this)
        .find('.header__slider-number')
        .html(currentSlide + 1 + '/' + sliderLength);
    });

    headerSliderSupport.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      event.stopPropagation();

      switch (nextSlide - currentSlide) {
        case 0:
          break;
        case 1:
        case 1 - sliderLength:
          headerSlider.slick('slickPrev');
          break;
        case -1:
        case sliderLength - 1:
          headerSlider.slick('slickNext');
          break;
        default:
          headerSlider.slick('slickGoTo', sliderLength - nextSlide - 1);
      }
    });
  }

  // END Header slider

  // Stories slider

  if (jQuery('.stories__slider').length !== 0) {
    const storiesSlider = jQuery('.stories__slider');
    const storiesSlides = storiesSlider.find('.stories__slide');
    const sliderInitLength = storiesSlides.length;

    const storiesSupportSlides = storiesSlider.closest('section').find('.stories__content-slide');

    if (sliderInitLength === 2 || sliderInitLength === 3) {
      storiesSlides.each((idx, el) => {
        const clonedElement = el.cloneNode(true);
        el.parentElement.appendChild(clonedElement);
      });
    }

    storiesSlider.slick({
      arrows: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      speed: 1000,
      autoplay: false,
      autoplaySpeed: 7000,
      cssEase: 'linear',
      useTransform: isMS,
      useCSS: isMS,
      pauseOnHover: false,
      focusOnSelect: true,
      pauseOnDotsHover: false,
      pauseOnFocus: false,
    });

    storiesSlider
      .find('.slick-arrow')
      .addClass('stories__arrow button--slide--round')
      .html('<div class="round-btn-bg"></div>');

    const slides = storiesSlider.find('.slick-slide');

    storiesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const sliderLength = slick.slideCount;
      const nextSupportSlide = nextSlide >= sliderInitLength ? nextSlide - sliderInitLength : nextSlide;
      const currentSupportSlide = currentSlide >= sliderInitLength ? currentSlide - sliderInitLength : currentSlide;

      storiesSupportSlides[currentSupportSlide].classList.remove('active');
      storiesSupportSlides[nextSupportSlide].classList.add('active');

      storiesSlider.find('.slick-visible').removeClass('slick-visible');
      storiesSlider.find('.slick-disabled').removeClass('slick-disabled');

      switch (nextSlide - currentSlide) {
        case 0:
        case 1:
        case -1:
          break;
        case 1 - sliderLength:
          slides[sliderLength + 1].classList.add('slick-visible');
          slides[sliderLength + 2].classList.add('slick-visible');
          slides[sliderLength + 2].classList.add('slick-disabled');
          break;
        case sliderLength - 1:
          slides[0].classList.add('slick-visible');
          slides[1].classList.add('slick-visible');
          slides[1].classList.add('slick-disabled');
          break;
      }
    });
  }

  // END Stories slider

  // Clientsay slider

  if (jQuery('.clientsay__slider').length !== 0) {
    const clientsaySlider = jQuery('.clientsay__slider');
    const clientsaySlides = clientsaySlider.find('.clientsay__slide');
    const sliderLength = clientsaySlides.length;

    if (sliderLength === 2 || sliderLength === 3) {
      clientsaySlides.each((idx, el) => {
        const clonedElement = el.cloneNode(true);
        el.parentElement.appendChild(clonedElement);
      });
    }

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
    });

    clientsaySlider
      .find('.slick-arrow')
      .addClass('clientsay__arrow button--slide--round')
      .html('<div class="round-btn-bg"></div>');

    const slides = clientsaySlider.find('.slick-slide');

    clientsaySlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const sliderLength = slick.slideCount;

      clientsaySlider.find('.slick-visible').removeClass('slick-visible');
      clientsaySlider.find('.slick-disabled').removeClass('slick-disabled');

      switch (nextSlide - currentSlide) {
        case 0:
        case 1:
        case -1:
          break;
        case 1 - sliderLength:
          slides[sliderLength + 1].classList.add('slick-visible');
          slides[sliderLength + 2].classList.add('slick-visible');
          slides[sliderLength + 2].classList.add('slick-disabled');
          break;
        case sliderLength - 1:
          slides[0].classList.add('slick-visible');
          slides[1].classList.add('slick-visible');
          slides[1].classList.add('slick-disabled');
          break;
      }
    });
  }
});
