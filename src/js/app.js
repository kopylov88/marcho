import * as myFunctions from './modules/functions.js';
import $ from 'jquery';
import 'slick-carousel';
import { Fancybox } from '@fancyapps/ui';

myFunctions.isWebp();

$('.top-slider__inner').slick({
  dots: true,
  arrows: false,
  fade: true,
  autoplay: true,
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
