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

// file load
const API_URL = 'http://localhost:8080/';
const file_api = window.File && window.FileReader && window.FileList && window.Blob ? true : false;
let FormFiles = [];

const mainFormDragLabel = document.getElementById('mainform__drag-label');
const mainFormDragInput = document.getElementById('mainform__drag-input');
const mainFormDragHeading = document.getElementById('mainform__drag-heading');
const mainForm = document.getElementById('mainform__form');

function handleInputChange(e) {
  e.preventDefault();
  e.stopPropagation();

  const value = e.target.value;
  const name = e.target.name;
  let valid = false;
  let message = '';

  switch (this.type) {
    case 'email':
      valid = !!value.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%_\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      message = 'please, enter valid email';
      break;
    case 'textarea':
      valid = !!value.match(/^[0-9+\(\)#\.\s\/ext-]+$/g);
      switch (name) {
        case 'name':
          message = 'please, enter your name';
          break;
        case 'company':
          message = 'please, enter your company name';
          break;
        default:
          break;
      }
      break;
    case 'text':
      valid = !!value.match(/([a-zA-Z]*)/g);
      message = 'please, enter your name';
      break;
    case 'tel':
      valid = !!value.match(/^[0-9+\(\)#\.\s\/ext-]+$/g);
      message = 'please, enter valid phone number';
      break;
    default:
      break;
  }

  if (value !== '') {
    $(this).addClass('full');
  } else {
    $(this).removeClass('full');
  }
  if (!valid) {
    $(this).addClass('inValid');
    const previous = this.previousElementSibling;
    if (!previous || previous.tagName !== 'MARK') {
      $('<mark>' + message + '</mark>').insertBefore(this);
    }
  } else {
    $(this).removeClass('inValid');
    $(this)
      .closest('label')
      .find('mark')
      .remove();
  }
}

$('.mainform__input:not(input[type="file"])').keyup(handleInputChange);

$('.mainform__textarea').keyup(handleInputChange);

function dropFileValidation(name, size) {
  const file_extensions = ['pdf', 'doc', 'docx', 'rtf', 'ppt', 'pptx'];
  const file_maxSize = 10485760;

  const fileNameArr = name.split('.');
  const fileExt = fileNameArr[fileNameArr.length - 1];

  const isValidExtension = file_extensions.some(ext => ext === fileExt);
  const isValidSize = size <= file_maxSize;

  if (isValidExtension & isValidSize) {
    mainFormDragHeading.innerHTML = name;
    return true;
  } else {
    mainFormDragHeading.innerHTML = 'Drag & drop files here …';
  }

  if (!isValidExtension) {
    $(mainFormDragHeading).append('<mark>invalid file extension</mark>');
  }

  if (!isValidSize) {
    $(mainFormDragHeading).append('<mark>file bigger than 10mb</mark>');
  }
}

function hanlerFilesBeforeSend(files) {
  let i = 0;
  while (i < files.length) {
    const { name, size } = files[i];

    if (!name.length) break;

    if (!dropFileValidation(name, size)) {
      FormFiles = [];
      break;
    } else {
      FormFiles.push(files[i]);
    }

    i++;
  }
}

$(mainFormDragInput)
  .change(function() {
    if (!file_api) {
      alert('Your browser do not support file sending');
      return;
    }
    hanlerFilesBeforeSend(this.files);
  })
  .change();

$(mainFormDragLabel).on({
  dragenter: function(e) {
    $(this).css('background-color', 'lightBlue');
  },
  dragleave: function(e) {
    $(this).css('background-color', 'white');
  },
  drop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css('background-color', 'lightgreen');

    if (!file_api) {
      alert('Your browser do not support file sending');
      return;
    }

    const dropFiles = e.originalEvent.dataTransfer.files;
    hanlerFilesBeforeSend(dropFiles);

    /* img reader preloader */
    // var imgReader = new FileReader();

    // var this_obj = $(this);

    // imgReader.onload = (function(file) {
    //   return function(event) {
    //     // Preview
    //     file_name = file.name;
    //     console.log(event.target.result);
    //     //image_data = event.target.result;
    //     $(this_obj)
    //       .next()
    //       .html('<a href="#" class="upload-file">Upload file</a>');
    //     $(this_obj).html('<img style="max-width: 200px; max-height: 200px;" src="' + event.target.result + '">');
    //   };
    // })(file);

    // imgReader.readAsDataURL(file);

    /* END img reader preloader */
  },
});

$(mainForm).on('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();

  const inputs = $(this).find('input');
  const selects = $(this).find('select');
  const textareas = $(this).find('textarea');

  const formData = new FormData();

  inputs.each(function(index, input) {
    if (input.type !== 'file') {
      formData.append(input.name, input.value);
    }
  });

  if (selects.length !== 0) {
    selects.each((index, select) => formData.append(select.name, select.value));
  }

  if (textareas.length !== 0) {
    selects.each((index, textarea) => formData.append(textarea.name, textarea.value));
  }

  $(FormFiles).each(function(index, file) {
    formData.append('files[]', file, file.name);
  });
  // console.log(FormFiles);
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
  //   url: form.action,
  //   type: form.method,
  //   data: dataToSend,
  //   contentType: false,
  //   processData: false,
  //   success: function(data) {
  //     alert('Файлы были успешно загружены');
  //   },
  // });
});

//});
