
const initSlider = () => { 
const btnPrev = document.querySelector('.left-arrow');
const btnNext = document.querySelector('.right-arrow');
const slider = document.querySelector('.slider-track__width');
const sliderItems = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-container');
const slidesToScroll = 1;
const slidesToShow = 1;
const itemsCount = items.length;
let position = 0;
const totalItems = document.querySelectorAll('.slider-container').length;
const slideWidth = 100 / totalItems;
sliderItems.style.width = `${totalItems * 100}%`;
items.forEach(item => {
    item.style.width = `${slideWidth}%`;
});
let calculateWidth = 0;

const moveToNextSlide = () => {
  position -= slidesToScroll;
  if (position < -(itemsCount - slidesToShow)) {
      position = 0;
  }
  setPosition();
};

const moveToPrevSlide = () => {
  position += slidesToScroll;
  if (position > 0) {
      position = -(itemsCount - slidesToShow);
  }
  setPosition();
};

const setPosition = () => {
    sliderItems.style.transform = `translateX(${position * slideWidth}%)`;
    updateRadioButtons(position);
};

btnNext.addEventListener('click', moveToNextSlide);
btnPrev.addEventListener('click', moveToPrevSlide);



const radioButtons = document.querySelectorAll('.favourite-pagination__progress-bar');
const labels = document.querySelectorAll('.favourite-pagination__display-progress');
let mainInterval = window.setInterval(moveToNextSlide, 5100);
let timeoutId;

function setNewInterval(){
  clearInterval(mainInterval);
  mainInterval = window.setInterval(moveToNextSlide, 5100);
}

const updateRadioButtons = (index) => {
  radioButtons.forEach((radio, rIndex) => {
    if (Math.abs(index) === rIndex) {
      radio.classList.add('active');
      labels[rIndex].style.display = 'block';
      setNewInterval(); 
    } else {
      radio.classList.remove('active'); 
      labels[rIndex].style.display = 'none'; 
    }
  });
};


updateRadioButtons(0);

const cards = sliderItems;
let isPressed = false;
let cursorX;
let labelIndexl;


slider.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isPressed = true;
  cursorX = e.offsetX - cards.offsetLeft;
});

slider.addEventListener("mousemove", (e) => {
  if (!isPressed) return;
  e.preventDefault();
});

window.addEventListener("mouseup", (e) => {
  if(isPressed){
  if (cursorX > e.offsetX){
    moveToNextSlide();
  } else if (cursorX < e.offsetX){
    moveToPrevSlide();
  }
  isPressed = false;
}
});


sliderItems.addEventListener('mouseover', () => {
  radioButtons.forEach((radio, index) => {
    if (radio.classList.contains('active')) {
      labels[index].classList.add('paused-animation');
      labelIndexl = index;
    }
  });
  clearTimeout(timeoutId);
  clearInterval(mainInterval);
});


sliderItems.addEventListener('mouseout', () => {
  radioButtons.forEach((radio, index) => {
    if (radio.classList.contains('active')) {
      labels[index].classList.remove('paused-animation');
      labels[labelIndexl].classList.remove('paused-animation');
      calculateWidth = getCurrentWidth(index);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        moveToNextSlide();
      }, calculateWidth);
    }
  });
});

function getCurrentWidth(index) {
  const computedStyle = window.getComputedStyle(labels[index]);
  const currentWidth = parseInt(computedStyle.getPropertyValue('width'));
  const percentage = (currentWidth / 40) * 100; 
  const percentageDecimal = parseFloat(percentage) / 100;
  let timeValue = parseInt(5100 - (5100 * percentageDecimal));
  return timeValue;
}

document.addEventListener('keydown', function(e) {
  switch (e.key) {
    case 'ArrowLeft':
      moveToPrevSlide();
      break;
    case 'ArrowRight':
      moveToNextSlide();
      break;
  }
});

let touchScreenINdexvar;

slider.addEventListener('touchstart', function (e) {
  e.preventDefault();
  touchstartX = e.changedTouches[0].screenX;
  labels[Math.abs(position)].classList.add('paused-animation');
  touchScreenINdexvar = Math.abs(position);
  clearTimeout(timeoutId);
  clearInterval(mainInterval);
}, false);


slider.addEventListener('touchend', function (e) {
  touchendX = e.changedTouches[0].screenX;
  labels[touchScreenINdexvar].classList.remove('paused-animation');
  calculateWidth = getCurrentWidth(touchScreenINdexvar);
  handleGesture();
});

function handleGesture() {
  if (touchendX < touchstartX) {
      moveToNextSlide();
  } else if (touchendX > touchstartX) {
      moveToPrevSlide();
  }  else {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      moveToNextSlide();
    }, calculateWidth);
}
}
}

export default initSlider;