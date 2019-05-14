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
    const sliderLenght = headerSliderSupportDotsArray.length;

    headerSliderSupport.append('<div class="header__slider-number">1/' + sliderLenght + '</div>');

    headerSliderSupport.on('afterChange', function(event, slick, currentSlide) {
      $(this)
        .find('.header__slider-number')
        .html(currentSlide + 1 + '/' + sliderLenght);
    });

    headerSliderSupport.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      event.stopPropagation();

      switch (nextSlide - currentSlide) {
        case 0:
          break;
        case 1:
        case 1 - sliderLenght:
          headerSlider.slick('slickPrev');
          break;
        case -1:
        case sliderLenght - 1:
          headerSlider.slick('slickNext');
          break;
        default:
          headerSlider.slick('slickGoTo', sliderLenght - nextSlide - 1);
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
    slides[0].classList.add('slick-slide_hidden');

    storiesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const sliderLenght = slick.slideCount;

      const nextSupportSlide = nextSlide >= sliderInitLength ? nextSlide - sliderInitLength : nextSlide;
      const currentSupportSlide = currentSlide >= sliderInitLength ? currentSlide - sliderInitLength : currentSlide;

      storiesSupportSlides[currentSupportSlide].classList.remove('active');
      storiesSupportSlides[nextSupportSlide].classList.add('active');

      switch (nextSlide - currentSlide) {
        case 0:
          break;
        case 1:
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 2]) {
            slides[nextSlide - 2].classList.remove('slick-slide_hidden');
          } else {
            slides[sliderLenght - 1].classList.remove('slick-slide_hidden');
            slides[sliderLenght].classList.remove('slick-slide_hidden');
          }
          break;
        case 1 - sliderLenght:
          slides[sliderLenght - 2].classList.remove('slick-slide_hidden');
          slides[0].classList.add('slick-slide_hidden');
          slides[sliderLenght].classList.add('slick-slide_hidden');

          break;
        case -1:
          slides[currentSlide].classList.remove('slick-slide_hidden');
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 1]) {
            slides[nextSlide - 1].classList.add('slick-slide_hidden');
          }

          break;
        case sliderLenght - 1:
          slides[sliderLenght - 1].classList.add('slick-slide_hidden');
          slides[0].classList.remove('slick-slide_hidden');
          slides[sliderLenght].classList.remove('slick-slide_hidden');
          break;
      }
    });

    storiesSlider.on('afterChange', function(event, slick, currentSlide) {
      const sliderLenght = slick.slideCount;
      if (currentSlide === sliderLenght - 1) {
        slides[sliderLenght - 2].classList.add('slick-slide_hidden');
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
    slides[0].classList.add('slick-slide_hidden');

    clientsaySlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const sliderLenght = slick.slideCount;

      switch (nextSlide - currentSlide) {
        case 0:
          break;
        case 1:
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 2]) {
            slides[nextSlide - 2].classList.remove('slick-slide_hidden');
          } else {
            slides[sliderLenght - 1].classList.remove('slick-slide_hidden');
            slides[sliderLenght].classList.remove('slick-slide_hidden');
          }
          break;
        case 1 - sliderLenght:
          slides[sliderLenght - 2].classList.remove('slick-slide_hidden');
          slides[0].classList.add('slick-slide_hidden');
          slides[sliderLenght].classList.add('slick-slide_hidden');

          break;
        case -1:
          slides[currentSlide].classList.remove('slick-slide_hidden');
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 1]) {
            slides[nextSlide - 1].classList.add('slick-slide_hidden');
          }

          break;
        case sliderLenght - 1:
          slides[sliderLenght - 1].classList.add('slick-slide_hidden');
          slides[0].classList.remove('slick-slide_hidden');
          slides[sliderLenght].classList.remove('slick-slide_hidden');
          break;
      }
    });

    clientsaySlider.on('afterChange', function(event, slick, currentSlide) {
      const sliderLenght = slick.slideCount;
      if (currentSlide === sliderLenght - 1) {
        slides[sliderLenght - 2].classList.add('slick-slide_hidden');
      }
    });
  }
});
