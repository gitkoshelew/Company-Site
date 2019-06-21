/* src/app.js */

// Styles
import 'styles/_app.scss';

// Slider
import 'slick-carousel';

$(document).ready(() => {
  console.log('Ready!');

  require('scripts/main');
  require('scripts/header');
  require('scripts/approach');
  require('scripts/slides');
  require('scripts/tabs');
  require('scripts/form');
});
