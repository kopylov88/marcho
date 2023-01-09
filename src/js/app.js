import * as myFunctions from './modules/functions.js';
import $ from 'jquery';
import 'slick-carousel';

myFunctions.isWebp();
$('.top-slider__inner').slick({
  dots: true,
  arrows: false,
  fade: true,
  autoplay: true,
});
