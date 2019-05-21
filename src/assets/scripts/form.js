// formHandler argument - BEM id string (#block__element_modificator)

if (jQuery('#mainform__form').length !== 0) {
  formHandler('#mainform__form');

  function formHandler(form) {
    const API_URL = 'http://localhost:8080/';
    const file_api = window.File && window.FileReader && window.FileList && window.Blob ? true : false;
    const FormFiles = [];

    const file_extensions = ['pdf', 'doc', 'docx', 'rtf', 'ppt', 'pptx'];
    const file_maxSize = 10000000;

    const formNameSpace = form.split('__')[0].substring(1, form.length - 1);

    const mainFormDragInput = $(form).find('[type="file"]');
    const mainFormDragLabel = mainFormDragInput.closest('label');

    $(`.${formNameSpace}__success`).click(function(e) {
      $(this).removeClass('active');
    });

    function validateInput(el) {
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

    function fullInput(el) {
      const value = el.value;
      if (value.trim() !== '') {
        $(el).addClass('full');
      } else {
        $(el).removeClass('full');
      }
    }

    function handleInputChange(e) {
      e.preventDefault();
      e.stopPropagation();
      validateInput(this);
    }

    function handleInputFulling(e) {
      e.preventDefault();
      e.stopPropagation();
      fullInput(this);
    }

    $(form)
      .find('textarea,input:not(input[type="file"])')
      .keyup(handleInputFulling);

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
        $(this).removeClass('label--dragged');

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
        nodeList.each((idx, el) => {
          validateInput(el);
          el.addEventListener('keyup', handleInputChange);
          console.log(el);
        });
        return Array.prototype.every.call(nodeList, el => !el.classList.contains('inValid'));
      }

      if (validateBeforeSubmit(validatedInputs)) {
        const formData = new FormData();
        $(`.${formNameSpace}__success`).addClass('active');

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
}
