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

const isIE = /*@cc_on!@*/ false || !!document.documentMode,
  isEdge = !isIE && !!window.StyleMedia,
  isMS = !(isIE || isEdge);

function headerScroll() {
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

headerScroll();

jQuery(function() {
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

  if (jQuery('.stories__slider-wrapper').length !== 0) {
    const storiesSlider = jQuery('.stories__slider-wrapper');
    const sliderLenght = storiesSlider.find('.stories__slide').lenght;

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
    });

    storiesSlider
      .find('.slick-arrow')
      .addClass('stories__arrow button--slide--round')
      .html('<div class="round-btn-bg"></div>');

    const slides = storiesSlider.find('.slick-slide');
    slides[0].classList.add('slick-slide_hidden');
    slides[Math.floor(slides.length / 2) - 2].classList.add('slick-slide_hidden');
    console.log(slides);

    storiesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      const sliderLenght = slick.slideCount;
      console.log('next', nextSlide, 'curr', currentSlide);

      switch (nextSlide - currentSlide) {
        case 0:
          break;
        case 1:
          console.log('1');
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 2]) {
            slides[nextSlide - 2].classList.remove('slick-slide_hidden');
          } else {
            slides[sliderLenght - 1].classList.remove('slick-slide_hidden');
            slides[sliderLenght].classList.remove('slick-slide_hidden');
          }
          break;
        case 1 - sliderLenght:
          console.log('l');
          slides[sliderLenght - 2].classList.remove('slick-slide_hidden');
          slides[0].classList.add('slick-slide_hidden');
          slides[sliderLenght].classList.add('slick-slide_hidden');

          break;
        case -1:
          console.log('-1');
          slides[currentSlide].classList.remove('slick-slide_hidden');
          slides[nextSlide].classList.add('slick-slide_hidden');
          if (slides[nextSlide - 1]) {
            slides[nextSlide - 1].classList.add('slick-slide_hidden');
          } else {
            slides[sliderLenght - 2].classList.add('slick-slide_hidden');
          }
          break;
        case sliderLenght - 1:
          console.log('-l');
          slides[sliderLenght - 1].classList.add('slick-slide_hidden');
          slides[0].classList.remove('slick-slide_hidden');
          slides[sliderLenght].classList.remove('slick-slide_hidden');
          break;
      }
      console.log(slides);
    });

    // storiesSlider.on('afterChange', function(event, slick, currentSlide) {
    //   const sliderLenght = slick.slideCount;
    //   console.log(currentSlide);
    //   slides[currentSlide + 2].classList.remove('slick-slide_hidden');
    //   if (slides[currentSlide - 1]) {
    //     slides[currentSlide - 1].classList.remove('slick-slide_hidden');
    //   } else {
    //     console.log(sliderLenght);
    //     slides[sliderLenght - 1].classList.remove('slick-slide_hidden');
    //   }
    // });
  }

  if (jQuery('.clientsay__slider').length !== 0) {
    const clientsaySlider = jQuery('.clientsay__slider');
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
          break;
        case sliderLenght - 1:
          slides[sliderLenght - 1].classList.add('slick-slide_hidden');
          slides[0].classList.remove('slick-slide_hidden');
          slides[sliderLenght].classList.remove('slick-slide_hidden');
          break;
      }
    });
  }
});

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

if (jQuery('#mainform__form').length !== 0) {
  formHandler('#mainform__form');
}

$('.header__head-open-button').click(function() {
  $(this).toggleClass('isOpen');
  $(this)
    .prev('nav')
    .toggleClass('isOpen');
});

// formHandler argument - BEM id string (#block__element_modificator)

function formHandler(form) {
  const API_URL = 'http://localhost:8080/';
  const file_api = window.File && window.FileReader && window.FileList && window.Blob ? true : false;
  const FormFiles = [];

  const file_extensions = ['pdf', 'doc', 'docx', 'rtf', 'ppt', 'pptx'];
  const file_maxSize = 10000000;

  const formNameSpace = form.split('__')[0].substring(1, form.length - 1);

  const mainFormDragInput = $(form).find('[type="file"]');
  const mainFormDragLabel = mainFormDragInput.closest('label');

  function valideteInput(el) {
    const value = el.value;
    const name = el.name;
    const type = el.type;
    let valid = false;
    let message = '';

    switch (type) {
      case 'email':
        valid = !!value.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%_\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        message = 'please, enter valid email';
        break;
      case 'text':
        valid = !!value.match(/^[A-Za-zА-Яа-яЁёІіЇїЄє]+(\s+[A-Za-zА-Яа-яЁёяЁёІіЇїЄє]+)?/g);
        if (name === 'name') {
          message = 'please, enter your name';
        }
        if (name === 'company') {
          message = 'please, enter your company name';
        }
        break;
      case 'textarea':
        valid = !!value.match(/([A-Za-zА-Яа-яЁёІіЇїЄє]*)/g);
        message = 'please, enter your message';
        break;
      case 'tel':
        valid = !!value.match(/^[0-9+\(\)#\.\s\/ext-]+$/g);
        message = 'please, enter valid phone number';
        break;
      default:
        break;
    }

    if (value.trim() !== '') {
      $(el).addClass('full');
    } else {
      $(el).removeClass('full');
    }
    if (!valid) {
      $(el).addClass('inValid');
      const previous = el.previousElementSibling;
      if (!previous || previous.tagName !== 'MARK') {
        $('<mark>' + message + '</mark>').insertBefore(el);
      }
      return false;
    } else {
      $(el).removeClass('inValid');
      $(el)
        .closest('label')
        .find('mark')
        .remove();
      return true;
    }
  }

  function handleInputChange(e) {
    e.preventDefault();
    e.stopPropagation();

    valideteInput(this);
  }

  $(form)
    .find('textarea,input:not(input[type="file"])')
    .keyup(handleInputChange);

  function dropFileValidation(name, size) {
    const fileNameArr = name.split('.');
    const fileExt = fileNameArr[fileNameArr.length - 1];

    const isValidExtension = file_extensions.some(ext => ext === fileExt);
    const isValidSize = size <= file_maxSize;

    const fileElement = document.createElement('div');
    fileElement.className = `${formNameSpace}__drag-file drag--file`;
    fileElement.innerHTML = `<span class='${formNameSpace}__drag-file-name drag--file--name'>${name}</span>`;

    const fileDeleteElement = document.createElement('span');
    fileDeleteElement.className = `${formNameSpace}__drag-file-delete drag--file--delete`;
    fileDeleteElement.addEventListener('click', function(event) {
      if (this.parentElement.dataset.count) {
        const arrayNumber = Number(this.parentElement.dataset.count);
        FormFiles[arrayNumber] = null;
      }

      this.parentElement.remove();
      event.stopPropagation();
    });
    fileElement.appendChild(fileDeleteElement);

    if (!isValidExtension) {
      $(fileElement).append('<mark>invalid file extension</mark>');
    }

    if (!isValidSize) {
      $(fileElement).append(`<mark>file bigger than ${file_maxSize / 1000000}mb</mark>`);
    }

    if (!(isValidExtension & isValidSize)) {
      fileElement.className = `${formNameSpace}__drag-file_invalid ${formNameSpace}__drag-file drag--file-invalid`;
      $(fileElement).insertBefore(mainFormDragLabel);
      return false;
    }

    fileElement.dataset.count = FormFiles.length;
    $(fileElement).insertBefore(mainFormDragLabel);
    return true;
  }

  function hanlerFilesBeforeSend(files) {
    $(files).each((index, file) => {
      const { name, size } = file;

      if (!name.length) return;

      if (!dropFileValidation(name, size)) {
        return;
      }

      FormFiles.push(file);
    });
  }

  $(mainFormDragInput).change(function(event) {
    if (!file_api) {
      alert('Your browser do not support file sending');
      return;
    }

    hanlerFilesBeforeSend(this.files);
  });
  //.change();

  $(mainFormDragLabel).on({
    click: function(e) {
      console.log(e.target);
    },
    dragenter: function(e) {
      $(this).addClass('label--dragged');
    },
    dragleave: function(e) {
      $(this).removeClass('label--dragged');
    },
    drop: function(e) {
      e.stopPropagation();
      e.preventDefault();

      if (!file_api) {
        alert('Your browser do not support file sending');
        return;
      }

      const dropFiles = e.originalEvent.dataTransfer.files;
      const label_self = this;

      hanlerFilesBeforeSend(dropFiles);

      /* img reader preloader Preview*/
      function imgPreloadHandler(file) {
        const imgReader = new FileReader();

        imgReader.onload = (function(file) {
          return function(event) {
            $(label_self)
              .next()
              .html(`<a href="#" class="${formNameSpace}__upload-img-link upload--img-link">Upload file</a>`);
            $(label_self).html(
              `<img class="${formNameSpace}__upload-img-link upload--img-link" src="${event.target.result}"> <span>${
                file.name
              }</span>`
            );
          };
        })(file);

        imgReader.readAsDataURL(file);
      }
    },
  });

  $(form).on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const validatedInputs = $(this).find(
      'textarea,select,[type]:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]):not([type="file"]):not([type="image"])'
    );

    const sendedInputs = $(this).find(
      'textarea,select,[type]:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]):not([type="image"])'
    );

    function validateBeforeSubmit(nodeList) {
      return Array.prototype.every.call(nodeList, el => valideteInput(el));
    }

    if (validateBeforeSubmit(validatedInputs)) {
      const formData = new FormData();

      sendedInputs.each((idx, { name, value }) => formData.append(name, value));

      $(FormFiles).each(function(index, file) {
        if (file !== null) {
          formData.append('files[]', file, file.name);
        }
      });

      const values = formData.values();
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());
      console.log(values.next());

      //   $.ajax({
      //   url: this.action,
      //   type: this.method,
      //   data: dataToSend,
      //   contentType: false,
      //   processData: false,
      //   success: function(data) {
      //     alert('Файлы были успешно загружены');
      //   },
      // });
    }
  });
}
