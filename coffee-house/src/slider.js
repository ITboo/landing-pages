const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__button-left');
const btnRight = document.querySelector('.slider__button-right');
const trackingElements = document.querySelectorAll('.tracking__item');

// Init
const slidesAmount = 3;
let currentSlide = 1;
let isPaused = false;
let xTouchStart = 0;
let xTouchEnd = 0;
trackingElements[0].classList.add('tracking__item_active');

// Pause when over slider
['mouseover', 'touchstart'].forEach((event) => {
  slider.addEventListener(event, () => {
    if (matchMedia('(pointer: coarse)').matches && event === 'mouseover') return;
    isPaused = true;
    trackingElements[currentSlide - 1].classList.add('paused');
  });
});

['mouseleave', 'touchend'].forEach((event) => {
  slider.addEventListener(event, () => {
    isPaused = false;
    trackingElements[currentSlide - 1].classList.remove('paused');
  });
});

// Mobile swipe
slider.addEventListener('touchstart', (e) => {
  xTouchStart = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  xTouchEnd = e.changedTouches[0].clientX;

  if (Math.abs(xTouchStart - xTouchEnd) >= 5) {
    xTouchStart < xTouchEnd
      ? btnHandler('left', slidesAmount)
      : btnHandler('right', slidesAmount);
  }
});

slider.addEventListener('contextmenu', (e) => e.preventDefault());

// Manual switch
btnLeft.addEventListener('click', () => btnHandler('left', slidesAmount));
btnRight.addEventListener('click', () => btnHandler('right', slidesAmount));

// Auto swipe
trackingElements.forEach((element) => {
  element.addEventListener('animationend', () => btnHandler('right', slidesAmount));
});

function btnHandler(direction, maxSlidesNumber) {
  if (direction === 'left') {
    currentSlide--;
    if (currentSlide <= 0) currentSlide = 3;
  }
  if (direction === 'right') {
    currentSlide++;
    if (currentSlide > maxSlidesNumber) currentSlide = 1;
  }
  changeSlide();
  changeTrackingElement(currentSlide - 1); // передается в коллекцию (начало с 0)
}

function changeSlide() {
  slider.style.transform = `translateX(-${ 100 * (currentSlide - 1) }%)`;
}

function changeTrackingElement(activeElement) {
  trackingElements.forEach((element) => {
    element.classList.remove('tracking__item_active');
  });
  trackingElements[activeElement].classList.add('tracking__item_active');
}