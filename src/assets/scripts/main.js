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

const file_api = window.File && window.FileReader && window.FileList && window.Blob ? true : false;

const mainFormDragLabel = document.getElementById('mainform__drag-label');
const mainFormDragInput = document.getElementById('mainform__drag-input');
const mainFormDragHeading = document.getElementById('mainform__drag-heading');

let file_name;
let file_size;

function dropFileValidation(name, size) {
  const file_extensions = ['pdf', 'doc', 'docx', 'rtf', 'ppt', 'pptx'];
  const file_maxSize = 10485760;

  const fileNameArr = name.split('.');
  const fileExt = fileNameArr[fileNameArr.length - 1];

  const isValidExtension = file_extensions.some(ext => ext === fileExt);
  const isValidSize = size <= file_maxSize;

  if (isValidExtension & isValidSize) {
    mainFormDragHeading.innerHTML = name;
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

$(mainFormDragInput)
  .change(function() {
    if (file_api && mainFormDragInput.files[0]) {
      const { name, size } = mainFormDragInput.files[0];
      file_name = name;
      file_size = size;
    } else
      file_name = $(mainFormDragInput)
        .val()
        .replace('C:\\fakepath\\', '');

    if (!file_name.length) return;

    dropFileValidation(file_name, file_size);
  })
  .change();

// $.event.props.push('dataTransfer');

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

    var dropFile = e.originalEvent.dataTransfer.files[0];

    function hanlerFilesBeforeSend(files) {
      let Data = new FormData();
      $(files).each(function(index, file) {
        if (file.size <= maxFileSize && (file.type == 'image/png' || file.type == 'image/jpeg')) {
          Data.append('files[]', file);
        }
      });

      return Data;
    }

    $.ajax({
      url: dropZone.attr('action'),
      type: dropZone.attr('method'),
      data: hanlerFilesBeforeSend(dropFiles),
      contentType: false,
      processData: false,
      success: function(data) {
        alert('Файлы были успешно загружены');
      },
    });

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
  },
});

//});
