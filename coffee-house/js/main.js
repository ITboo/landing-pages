import initSlider from './slider.js';
import './burger.js';

window.addEventListener('load', () => {
  initSlider();
});

document.getElementById('main-logo').addEventListener('click', function(event) {
    event.preventDefault(); 
});