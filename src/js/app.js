import * as myFunctions from './modules/functions.js';
import $ from 'jquery';
import 'slick-carousel';
import { Fancybox } from '@fancyapps/ui';
import 'ion-rangeslider';
import Choices from 'choices.js';

myFunctions.isWebp();

if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
  console.log('this is a touch device');
} else {
  console.log('this is not a touch device');
  document.body.classList.add('no-touch');
}

const menuLinks = document.querySelectorAll('.menu__list-link');
menuLinks.forEach(function (item) {
  if (window.location.pathname.indexOf(item.getAttribute('href')) > -1) {
    menuLinks.forEach(function (el) {
      el.classList.remove('menu__list-link--active');
    });
    item.classList.add('menu__list-link--active');
  }
});

$('.top-slider__inner').slick({
  dots: true,
  arrows: false,
  autoplay: true,
  fade: true,
});

$('.product-slide__thumbs').slick({
  dots: false,
  arrows: false,
  asNavFor: '.product-slide__big',
  vertical: true,
  focusOnSelect: true,
  slidesToShow: 4,
  slidesToScroll: 1,
});

$('.product-slide__big').slick({
  dots: false,
  arrows: false,
  fade: true,
  draggable: false,
  asNavFor: '.product-slide__thumbs',
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1201,
      settings: {
        draggable: true,
      },
    },
  ],
});

$('.blog-list__slider').slick({
  dots: false,
  arrows: true,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  prevArrow:
    '<button type="button" class="slick-prev"><svg width="10px" height="15px"><path d="M 0.03125 7.453125 C 0.0273438 7.1875 0.152344 6.925781 0.386719 6.71875 L 7.867188 0.300781 C 8.074219 0.101562 8.394531 -0.015625 8.730469 -0.015625 C 9.066406 -0.015625 9.386719 0.101562 9.59375 0.300781 C 10.070312 0.726562 10.070312 1.34375 9.59375 1.769531 L 2.972656 7.453125 L 9.59375 13.140625 C 10.066406 13.570312 10.066406 14.195312 9.59375 14.625 C 9.378906 14.816406 9.0625 14.929688 8.730469 14.929688 C 8.398438 14.929688 8.082031 14.816406 7.867188 14.625 L 0.386719 8.203125 C 0.152344 7.996094 0.0273438 7.730469 0.03125 7.453125 Z M 0.03125 7.453125 "/></svg></button>',
  nextArrow:
    '<button type="button" class="slick-next"><svg width="10px" height="15px" viewBox="0 0 10 15" version="1.1"> <path d="M 10 7.484375 C 10 7.214844 9.882812 6.949219 9.660156 6.734375 L 2.121094 0.300781 C 1.910156 0.101562 1.589844 -0.015625 1.25 -0.015625 C 0.910156 -0.015625 0.589844 0.101562 0.378906 0.300781 C -0.101562 0.730469 -0.101562 1.355469 0.378906 1.785156 L 7.039062 7.484375 L 0.378906 13.183594 C -0.101562 13.613281 -0.101562 14.242188 0.378906 14.671875 C 0.597656 14.863281 0.914062 14.972656 1.25 14.972656 C 1.585938 14.972656 1.902344 14.863281 2.121094 14.671875 L 9.660156 8.21875 C 9.890625 8.015625 10.011719 7.753906 10 7.484375 Z M 10 7.484375 "/></svg></button>',
});

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

if (document.querySelector('.deal__clock')) {
  function initializeClock(id, endtime) {
    const clock = document.querySelector('.deal__clock');
    const daysSpan = clock.querySelector('.deal__days');
    const hoursSpan = clock.querySelector('.deal__hours');
    const minutesSpan = clock.querySelector('.deal__minutes');
    const secondsSpan = clock.querySelector('.deal__seconds');
    function updateClock() {
      const t = getTimeRemaining(endtime);
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }
  const deadline = document.querySelector('.deal__clock').dataset.time;
  initializeClock('deal-clock', deadline);
}

$('.jfilter-item__range-input').ionRangeSlider({
  onStart: function (data) {
    $('.price__from').text(data.from);
    $('.price__to').text(data.to);
  },
  onChange: function (data) {
    $('.price__from').text(data.from);
    $('.price__to').text(data.to);
  },
});

const sortBtn = document.querySelectorAll('.shop-sort__button');
sortBtn.forEach(function (item) {
  item.addEventListener('click', function () {
    sortBtn.forEach(function (item) {
      item.classList.remove('active');
    });
    this.classList.toggle('active');
  });
});

const elements = document.querySelectorAll('.multi-default');
elements.forEach(function (item) {
  const choices = new Choices(item, {
    searchEnabled: false,
    allowHTML: true,
  });
});

const shopBtnList = document.querySelector('.shop-sort__button--list');
const shopBtnGrid = document.querySelector('.shop-sort__button--grid');
const productItems = document.querySelectorAll('.products-box__item');
const shopProducts = document.querySelector('.shop-products');

if (shopBtnList) {
  shopBtnList.addEventListener('click', function () {
    productItems.forEach(function (item) {
      item.classList.add('products-box__item--list');
    });
    document.querySelector('.shop-products').classList.add('shop-products--list');
  });
}
if (shopBtnGrid) {
  shopBtnGrid.addEventListener('click', function () {
    productItems.forEach(function (item) {
      item.classList.remove('products-box__item--list');
      shopProducts.classList.remove('shop-products--list');
    });
  });
}

$.fn.numberstyle = function (options) {
  var settings = $.extend(
    {
      value: 0,
      step: undefined,
      min: undefined,
      max: undefined,
    },
    options
  );
  return this.each(function (i) {
    var input = $(this);
    var container = document.createElement('div'),
      btnAdd = document.createElement('div'),
      btnRem = document.createElement('div'),
      min = settings.min ? settings.min : input.attr('min'),
      max = settings.max ? settings.max : input.attr('max'),
      value = settings.value ? settings.value : parseFloat(input.val());
    container.className = 'numberstyle-qty';
    btnAdd.className = max && value >= max ? 'qty-btn qty-add disabled' : 'qty-btn qty-add';
    btnAdd.innerHTML = '+';
    btnRem.className = min && value <= min ? 'qty-btn qty-rem disabled' : 'qty-btn qty-rem';
    btnRem.innerHTML = '-';
    input.wrap(container);
    input.closest('.numberstyle-qty').prepend(btnRem).append(btnAdd);
    $(document)
      .off('click', '.qty-btn')
      .on('click', '.qty-btn', function (e) {
        var input = $(this).siblings('input'),
          sibBtn = $(this).siblings('.qty-btn'),
          step = settings.step ? parseFloat(settings.step) : parseFloat(input.attr('step')),
          min = settings.min ? settings.min : input.attr('min') ? input.attr('min') : undefined,
          max = settings.max ? settings.max : input.attr('max') ? input.attr('max') : undefined,
          oldValue = parseFloat(input.val()),
          newVal;
        if ($(this).hasClass('qty-add')) {
          (newVal = oldValue >= max ? oldValue : oldValue + step), (newVal = newVal > max ? max : newVal);

          if (newVal == max) {
            $(this).addClass('disabled');
          }
          sibBtn.removeClass('disabled');
        } else {
          (newVal = oldValue <= min ? oldValue : oldValue - step), (newVal = newVal < min ? min : newVal);
          if (newVal == min) {
            $(this).addClass('disabled');
          }
          sibBtn.removeClass('disabled');
        }
        input.val(newVal).trigger('change');
      });
    input.on('change', function () {
      const val = parseFloat(input.val()),
        min = settings.min ? settings.min : input.attr('min') ? input.attr('min') : undefined,
        max = settings.max ? settings.max : input.attr('max') ? input.attr('max') : undefined;
      if (val > max) {
        input.val(max);
      }
      if (val < min) {
        input.val(min);
      }
    });
  });
};
$('.numberstyle').numberstyle();

const tabBtns = document.querySelectorAll('.product-tabs__btn');
const tabContents = document.querySelectorAll('.product-tabs__content-item');

tabBtns.forEach(function (item) {
  item.addEventListener('click', function () {
    let tabId = item.getAttribute('data-tab');
    let currentContent = document.querySelector(tabId);
    tabBtns.forEach(function (item) {
      item.classList.remove('active');
    });
    this.classList.add('active');
    tabContents.forEach(function (item) {
      item.classList.remove('active');
    });
    currentContent.classList.add('active');
  });
});

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('clicked');
  menu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

const filterBtn = document.querySelector('.shop-sort__filter-btn');
const filter = document.querySelector('.filter');
if (filter) {
  filterBtn.addEventListener('click', function () {
    filter.classList.toggle('active');
  });
}
