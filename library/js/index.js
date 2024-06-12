/*********************
HEADER Burger menu
*********************/
const burger = document.querySelector('.js-burger');
const nav = document.querySelector('.js-nav');
const overlay = document.querySelector('.js-overlay');
const navItem = document.getElementsByClassName('js-nav-item');
const navItems = Array.from(navItem);

burger.addEventListener('click', toggleNav);
navItems.forEach( (elem) => {
  elem.addEventListener('click', removeNav);
});
overlay.addEventListener('click', removeNav);

function toggleNav() {
  if (!profileMenu.classList.contains('none')) {
    closeProfile();
  }
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  overlay.classList.toggle('none');
}

function removeNav() {
  burger.classList.remove('active');
  nav.classList.remove('active');
  overlay.classList.add('none');
}
/*********************
/HEADER Burger menu
*********************/


/*********************
ABOUT Carousel
*********************/
const slider = document.querySelector('.js-slider');
const carretLeft = document.getElementsByClassName('js-carret')[0];
const carretRight = document.getElementsByClassName('js-carret')[1];
const circleBtn = Array.from(document.querySelectorAll('.js-btn'));

const maxImg = 4;
const widthImg = 475;
let currentImg = 0;
let leftPosition = 0;
let currentBtn = circleBtn[0];

carretLeft.classList.add('carret-disable');
currentBtn.classList.add('btn-active');

carretLeft.addEventListener('click', leftClickCarret);
carretRight.addEventListener('click', rightClickCarret);
for (let i = 0; i < circleBtn.length; i++) {
  circleBtn[i].addEventListener('click', () => circleBtnClick(i));
};

window.addEventListener('resize', resize);

function leftClickCarret() {
  if (carretLeft.classList.contains('carret-disable')) {
    return
  }
  carretRight.classList.remove('carret-disable');
  circleBtn[currentImg].classList.remove('btn-active');
  currentImg--;
  currentBtn = circleBtn[currentImg];
  currentBtn.classList.add('btn-active');
  leftPosition += widthImg; 
  slider.style.left = `${leftPosition}px`;
  if (currentImg === 0) {
    carretLeft.classList.add('carret-disable');
  }
}

function rightClickCarret() {
  if (carretRight.classList.contains('carret-disable')) {
    return
  }
  carretLeft.classList.remove('carret-disable');
  circleBtn[currentImg].classList.remove('btn-active');
  currentImg++;
  currentBtn = circleBtn[currentImg];
  currentBtn.classList.add('btn-active');
  leftPosition -= widthImg; 
  slider.style.left = `${leftPosition}px`;
  if (currentImg === maxImg) {
    carretRight.classList.add('carret-disable');
  }
}

function circleBtnClick(i) {
  currentBtn.classList.remove('btn-active');
  currentBtn = circleBtn[i];
  currentBtn.classList.add('btn-active');
  leftPosition -= widthImg * ( i - currentImg );
  currentImg = i;
  slider.style.left = `${leftPosition}px`;
  if (currentImg === 0) {
    carretLeft.classList.add('carret-disable');
  } else {
    carretLeft.classList.remove('carret-disable');
  }
  if (currentImg === 4) {
    carretRight.classList.add('carret-disable');
  } else {
    carretRight.classList.remove('carret-disable');
  }
}

function resize() {
  if ( (getComputedStyle(circleBtn[3]).display === 'none') && (currentImg === 3) ) {
    carretLeft.classList.remove('carret-disable');
    leftClickCarret();
    return;
  }
  if ( (getComputedStyle(circleBtn[4]).display === 'none') && (currentImg === 4) ) {
    leftClickCarret();
    return;
  }
}
/*********************
/ABOUT Carousel
*********************/


/*********************
FAVORITES Seasons
*********************/
const radio = document.getElementsByClassName('js-radio');
const season = document.getElementsByClassName('js-season');

const maxSeason = 3;
const heightSeason = 1150;
let topPosition = 0;
let currentSeason = season[0];

for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('change', () => radioCheck(i))
}
function radioCheck(i) {
  currentSeason.classList.remove('delay');
  currentSeason.style.opacity = '0';
  currentSeason.style.zIndex = '0';
  season[i].classList.add('delay');
  season[i].style.zIndex = '1';
  season[i].style.opacity = '1';
  currentSeason = season[i];
}
/*********************
/FAVORITES Seasons
*********************/


/*********************
dropMenu PROFILE
*********************/

/* Profile button */
const profileBtn = document.querySelector('.js-profile-icon');
const profileMenu = document.querySelector('.js-profile');
const profileTitle = document.querySelector('.js-profile-title');

profileBtn.addEventListener('click', toggleProfile);

function toggleProfile() {
  if (burger.classList.contains('active')) {
    removeNav();
  }
  profileMenu.classList.toggle('none');
  overlay.classList.toggle('none');
}
/* /Profile button */

/* register buttons */
const registerBtn = document.querySelector('.js-register-btn');
const libSignupBtn = document.querySelector('.js-lib-signup-btn');
const loginRegisterBtn = document.querySelector('.js-login-register-btn');

registerBtn.addEventListener('click', openModalRegister);
libSignupBtn.addEventListener('click', openModalRegister);
loginRegisterBtn.addEventListener('click', () => {
  closeModalLogin();
  openModalRegister();
});

function openModalRegister() {
  closeProfile();
  modalRegister.classList.remove('none');
  overlay.classList.remove('none');
  overlay.classList.add('overlay-for-modal');
}
/* /register buttons */

/* login buttons */
const loginBtn = document.querySelector('.js-login-btn');
const libLoginBtn = document.querySelector('.js-lib-login-btn');
const regLoginBtn = document.querySelector('.js-register-login-btn');

// 16 кнопок buy
const buyBtns = Array.from(document.querySelectorAll('.js-buy-btn'));
// забираем все кнопки buy в массив (от 0 до 15)
// каждой кнопке соответствует своя книга

loginBtn.addEventListener('click', openModalLogin);
libLoginBtn.addEventListener('click', openModalLogin);
regLoginBtn.addEventListener('click', () => {
  closeModalRegister();
  openModalLogin();
});
buyBtns.forEach(elem => elem.addEventListener('click', (event) => {
  // если пользователь не вошел в аккаунт,
  // открываем модальное окно Login
  if (logStatus === 'logOut') {
    openModalLogin();
    return;
  // если пользователь вошел в аккаунт, но не купил карту,
  // открываем модальное окно Buy a library card
  } else if (logStatus === 'logIn' && !currentUser.hasCard) {
    console.log('logStatus', logStatus, 'hasCard', currentUser.hasCard);
    openModalBuyCard();
  // если пользователь вошел в аккаунт и у него есть карта,
  // добавляем книгу в Rented books
  } else {
    rentBook(event);
    return;
  }
}));

function openModalLogin() {
  closeProfile();
  modalLogin.classList.remove('none');
  overlay.classList.remove('none');
  overlay.classList.add('overlay-for-modal');
}

function openModalBuyCard() {
  modalBuyCard.classList.remove('none');
  overlay.classList.remove('none');
  overlay.classList.add('overlay-for-modal');
}

function rentBook(event) {
  // при каждой покупке увеличивается количество взятых книг
  currentUser.bookCounter++;
  // добавляем взятую книгу в массив Rented books
  let bookId = event.target.getAttribute('data-book-id');
  currentUser.rentedBooks.push(books[bookId]);
  // записываем в local storage массив юзеров
  localStorage.setItem('library', JSON.stringify(users));
  // кнопка buy меняется на own и становится неактивная
  event.target.innerText = 'Own';
  event.target.classList.add('own');
  // обновляем данные в модальном окне My Profile
  changeMyProfile();
  // обновляем данные в Check the card
  changeCheckCard();
  // обновляем информацию Rented Books на странице
}

/* /login buttons */

/* My profile button */
const myprofileBtn = document.querySelector('.js-myprofile-btn');
const profileLibBtn = document.querySelector('.js-lib-profile-btn');

myprofileBtn.addEventListener('click', openModalMyProfile);
profileLibBtn.addEventListener('click', openModalMyProfile);

function openModalMyProfile() {
  closeProfile();
  modalMyProfile.classList.remove('none');
  overlay.classList.remove('none');
  overlay.classList.add('overlay-for-modal');
}
/* /My profile button */

/* Log Out button */
const logoutBtn = document.querySelector('.js-logout-btn');
logoutBtn.addEventListener('click', logOut);
/* /Log Out button */

overlay.addEventListener('click', closeProfile);

function closeProfile() {
  profileMenu.classList.add('none');
  overlay.classList.add('none');
}
/*********************
/dropMenu PROFILE
*********************/


/*********************
REGISTER
*********************/
const modalRegister = document.querySelector('.js-modal-register');
const registerCloseBtn = modalRegister.querySelector('.js-register-close-btn');
const registerForm = modalRegister.querySelector('.js-register-form');
const fnameRegisterInput = modalRegister.querySelector('.js-fname-input');
const fnameRegisterTooltip = modalRegister.querySelector('.js-tooltip-fname');
const lnameRegisterInput = modalRegister.querySelector('.js-lname-input');
const lnameRegisterTooltip = modalRegister.querySelector('.js-tooltip-lname');
const emailRegisterInput = modalRegister.querySelector('.js-email-input');
const emailRegisterTooltip = modalRegister.querySelector('.js-tooltip-email');
const pswRegisterInput = modalRegister.querySelector('.js-psw-input');
const pswRegisterTooltip = modalRegister.querySelector('.js-tooltip-psw');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

registerCloseBtn.addEventListener('click', closeModalRegister);
overlay.addEventListener('click', closeModalRegister);
registerForm.addEventListener('submit', event => registerCheck(event));
fnameRegisterInput.addEventListener('change', () => {
  removeTooltip(fnameRegisterTooltip)
});
lnameRegisterInput.addEventListener('change', () => {
  removeTooltip(lnameRegisterTooltip)
});
emailRegisterInput.addEventListener('change', () => {
  removeTooltip(emailRegisterTooltip)
});
pswRegisterInput.addEventListener('change', () => {
  removeTooltip(pswRegisterTooltip)
});

function closeModalRegister() {
  registerForm.reset(); //очистка формы
  modalRegister.classList.add('none');
  overlay.classList.add('none');
  overlay.classList.remove('overlay-for-modal');
}

function registerCheck(event) {
  event.preventDefault();
  if ( !(fnameRegisterInput.value.trim()) ) {
    fnameRegisterInput.focus();
    fnameRegisterTooltip.classList.remove('none');
    return;
  } else if (!(lnameRegisterInput.value.trim())) {
    lnameRegisterInput.focus();
    lnameRegisterTooltip.classList.remove('none');
    return;
  } else if ( !( isEmailValid(emailRegisterInput.value) ) ) {
    emailRegisterInput.focus();
    emailRegisterTooltip.classList.remove('none');
    return;
  } else if ( !( isPswValid(pswRegisterInput.value) ) ) {
    pswRegisterInput.focus();
    pswRegisterTooltip.classList.remove('none');
    return;
  }
  register();
}

function register() {
  createUser();
  // иконку профиля меняем на инициалы юзера
  changeProfileIcon(currentUser.fname, currentUser.lname);
  // обновляем данные в модальном окне My Profile
  changeMyProfile();
  // обновляем данные в Check the card
  changeCheckCard();
  logStatus = 'logIn';
  profileWithAuth();
  closeModalRegister();
  openLibraryVisit();
  openCardInfo();
}

function createUser() {
  currentUser = { 
    fname : fnameRegisterInput.value.trim(),
    lname : lnameRegisterInput.value.trim(),
    email : emailRegisterInput.value.trim(),
    psw : pswRegisterInput.value.trim(),
    cardNumber : createCardNumber(),
    visitCounter : 1,
    hasCard : false,
    bookCounter : 0,
    rentedBooks : [],
  }
  console.log('currentUser', currentUser);
  users.push(currentUser);
  console.log('users', users);
  localStorage.setItem('library', JSON.stringify(users));
}

function isEmailValid(email) {
  return EMAIL_REGEXP.test(email);
}

function isPswValid(psw) {
  return (psw.trim().length > 7);
}

function removeTooltip(tooltip) {
  tooltip.classList.add('none');
}

function changeProfileIcon(first, last) {
  profileBtn.classList.remove('profile-icon-default');
  let firstLetter = first.charAt(0).toUpperCase();
  let secondLetter = last.charAt(0).toUpperCase();
  profileBtn.innerText = firstLetter + secondLetter;
  profileBtn.setAttribute('title', `${first} ${last}`);
}

function createCardNumber() {
  let hexNumber = '';
  for (let i = 0; i < 9; i++) {
    let num = getRandomInRange(0, 15);
    if (num === 10) {
      num = 'A';
    }
    if (num === 11) {
      num = 'B';
    }
    if (num === 12) {
      num = 'C';
    }
    if (num === 13) {
      num = 'D';
    }
    if (num === 14) {
      num = 'E';
    }
    if (num === 15) {
      num = 'F';
    }
    hexNumber += num;
  }
  return hexNumber;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function profileWithAuth() {
  loginBtn.classList.add('none');
  registerBtn.classList.add('none');
  myprofileBtn.classList.remove('none');
  logoutBtn.classList.remove('none');
  profileTitle.innerText = currentUser.cardNumber;
  profileTitle.style.fontSize = '12px';
}
/*********************
/REGISTER
*********************/


/*********************
LOGIN
*********************/
const modalLogin = document.querySelector('.js-modal-login');
const loginCloseBtn = modalLogin.querySelector('.js-login-close-btn');
const loginForm = modalLogin.querySelector('.js-login-form');
const emailLoginInput = modalLogin.querySelector('.js-email-input');
const emailLoginTooltip = modalLogin.querySelector('.js-tooltip-email');
const pswLoginInput = modalLogin.querySelector('.js-psw-input');
const pswLoginTooltip = modalLogin.querySelector('.js-tooltip-psw');

loginCloseBtn.addEventListener('click', closeModalLogin);
overlay.addEventListener('click', closeModalLogin);
loginForm.addEventListener('submit', event => loginCheck(event));
emailLoginInput.addEventListener('change', () => {
  removeTooltip(emailLoginTooltip)
});
pswLoginInput.addEventListener('change', () => {
  removeTooltip(pswLoginTooltip)
});

function closeModalLogin() {
  loginForm.reset(); //очистка формы
  modalLogin.classList.add('none');
  overlay.classList.add('none');
  overlay.classList.remove('overlay-for-modal');
}

function loginCheck(event) {
  event.preventDefault();
  if ( !( isEmailValid(emailLoginInput.value) ) ) {
    emailLoginInput.focus();
    emailLoginTooltip.classList.remove('none');
    return;
  } else if ( !( isPswValid(pswLoginInput.value) ) ) {
    pswLoginInput.focus();
    pswLoginTooltip.classList.remove('none');
    return;
  }
  if (hasUserLogin()) {
    logIn();
  };
}

function logIn() {
  currentUser = hasUserLogin();
  // при каждом логине увеличиваем счетчик посещений
  currentUser.visitCounter++;
  // записываем в local storage массив юзеров
  localStorage.setItem('library', JSON.stringify(users));
  // иконку профиля меняем на инициалы юзера
  changeProfileIcon(currentUser.fname, currentUser.lname);
  // обновляем данные в модальном окне My Profile
  changeMyProfile();
  // обновляем данные в Check the card
  changeCheckCard();
  // обновляем кнопки Buy
  changeBuyBtns();
  logStatus = 'logIn';
  profileWithAuth();
  closeModalLogin();
  openLibraryVisit();
  openCardInfo();
}

function hasUserLogin() {
  return users.find(function(item){
    return ((emailLoginInput.value === item.email) && (pswLoginInput.value === item.psw));
  });
}

function changeBuyBtns() {
  currentUser.rentedBooks.forEach(book => {
    buyBtns[book.id].innerText = 'Own';
    buyBtns[book.id].classList.add('own');
  })
}

/*********************
/LOGIN
*********************/


/*********************
LOG OUT
*********************/

function logOut() {
  logStatus = 'logOut';
  hasCard = false;
  console.log('log out');
  defaultProfileIcon();
  profileNoAuth();
  // кнопки Buy в начальное состояние
  defaultBuyBtns();
  closeProfile();
  closeLibraryVisit();
  closeCardInfo();
}

function defaultProfileIcon() {
  profileBtn.classList.add('profile-icon-default');
  profileBtn.innerText = '';
  profileBtn.removeAttribute('title');
}

function profileNoAuth() {
  loginBtn.classList.remove('none');
  registerBtn.classList.remove('none');
  myprofileBtn.classList.add('none');
  logoutBtn.classList.add('none');
  profileTitle.innerText = 'Profile';
  profileTitle.style.fontSize = '15px';
}

function defaultBuyBtns() {
  buyBtns.forEach(elem => {
      elem.innerText = 'Buy';
      elem.classList.remove('own');
  })
}
/*********************
/LOG OUT
*********************/


/*********************
CHECK THE CARD
*********************/
const checkCardVisits = document.querySelector('.js-stat-visits');
const checkCardBooks = document.querySelector('.js-stat-books');

function changeCheckCard() {
  checkCardVisits.innerText = currentUser.visitCounter;
  checkCardBooks.innerText = currentUser.bookCounter;
}
/*********************
/CHECK THE CARD
*********************/


/*********************
MY PROFILE
*********************/
const modalMyProfile = document.querySelector('.js-modal-myprofile');
const mypofileCloseBtn = modalMyProfile.querySelector('.js-myprofile-close-btn');
const mypofileInitials = modalMyProfile.querySelector('.js-myprofile-initials');
const mypofileName = modalMyProfile.querySelector('.js-myprofile-name');
const mypofileVisits = modalMyProfile.querySelector('.js-myprofile-visits');
const mypofileBooks = modalMyProfile.querySelector('.js-myprofile-books');
const mypofileRentedBooks = modalMyProfile.querySelector('.js-rented-books');
const mypofileCard = modalMyProfile.querySelector('.js-card');
const copyBtn = modalMyProfile.querySelector('.js-copy');

mypofileCloseBtn.addEventListener('click', closeModalMyProfile);
overlay.addEventListener('click', closeModalMyProfile);
copyBtn.addEventListener('click', copy);

function closeModalMyProfile() {
  modalMyProfile.classList.add('none');
  overlay.classList.add('none');
  overlay.classList.remove('overlay-for-modal');
}

function changeMyProfile() {
  let firstLetter = currentUser.fname.charAt(0).toUpperCase();
  let secondLetter = currentUser.lname.charAt(0).toUpperCase();
  mypofileInitials.innerText = firstLetter + secondLetter;
  mypofileName.innerText = `${currentUser.fname} ${currentUser.lname}`;
  mypofileVisits.innerText = currentUser.visitCounter;
  mypofileBooks.innerText = currentUser.bookCounter;
  mypofileCard.innerText = currentUser.cardNumber;
  let liElements = [];
  currentUser.rentedBooks.forEach((book) => {
    let li = document.createElement('li');
    li.classList.add('books-list-item');
    li.innerText = `${book.name}, ${book.author}`;
    liElements.push(li);
  })
  mypofileRentedBooks.innerHTML = '';
  mypofileRentedBooks.append(...liElements);
}
/*********************
/MY PROFILE
*********************/


/*********************
COPY TO CLIPBOARD
*********************/
function copy() {
  navigator.clipboard.writeText(currentUser.cardNumber);
}
/*********************
/COPY TO CLIPBOARD
*********************/


/*********************
CHECK THE CARD
*********************/
const findCardForm = document.querySelector('.js-find-card-form');
const checkCardNameInput = findCardForm.querySelector('.js-find-card-name');
const checkCardNumberInput = findCardForm.querySelector('.js-find-card-number');
const checkCardBtn = findCardForm.querySelector('.js-check-card-btn');
const cardStat = findCardForm.querySelector('.js-card-stat');

findCardForm.addEventListener('submit', event => checkCard(event));

function checkCard(event) {
  event.preventDefault();
  if (users.length === 0) {
    console.log('no registered users', users);
    return;
  } 
  if (hasUser()) {
    checkCardBtn.classList.add('none');
    cardStat.classList.remove('none');
    setTimeout(() => {
      cardStat.classList.add('none');
      checkCardBtn.classList.remove('none');
      findCardForm.reset();
    }, 10000);
  } else {
    console.log('no');
  }
}

function openCardInfo() {
  checkCardBtn.classList.add('none');
  cardStat.classList.remove('none');
  checkCardNameInput.value = currentUser.fname;
  checkCardNumberInput.value = currentUser.cardNumber;
}

function closeCardInfo() {
  cardStat.classList.add('none');
  checkCardBtn.classList.remove('none');
  checkCardNameInput.value = '';
  checkCardNumberInput.value = '';
}

function hasUser() {
  return users.find(function(item){
    return ((checkCardNameInput.value === item.fname) && (checkCardNumberInput.value === item.cardNumber));
  });
}
/*********************
/CHECK THE CARD
*********************/


/*********************
BUY A LIBRARY CARD
*********************/
const modalBuyCard = document.querySelector('.js-modal__buy-card');
const buyCardCloseBtn = modalBuyCard.querySelector('.js-buy-card-close-btn');
const cardNumber = modalBuyCard.querySelector('.js-number-input');
const expCode1 = modalBuyCard.querySelector('.js-expcode1-input');
const expCode2 = modalBuyCard.querySelector('.js-expcode2-input');
const cvc = modalBuyCard.querySelector('.js-code-input');

buyCardCloseBtn.addEventListener('click', closeModalBuyCard);
overlay.addEventListener('click', closeModalBuyCard);

function closeModalBuyCard() {
  modalBuyCard.classList.add('none');
  overlay.classList.add('none');
  overlay.classList.remove('overlay-for-modal');
}

const buyCardForm = document.querySelector('.js-buy-card-form');
const buyCardBtn = buyCardForm.querySelector('.js-buy-card-btn');

buyCardForm.addEventListener('submit', event => checkCard(event));

function checkCard(event) {
  event.preventDefault();
  console.log('checkCard');
  if (!cardNumber.value.match(/^\d{16}$/)) {
    //Если три цифры в начале строки и в конце строки
    return;
  }
  if (!expCode1.value.match(/^\d{2}$/)) {
    //Если три цифры в начале строки и в конце строки
    return;
  }
  if (!expCode2.value.match(/^\d{2}$/)) {
    //Если три цифры в начале строки и в конце строки
    return;
  }
  if (!cvc.value.match(/^\d{3}$/)) {
    //Если три цифры в начале строки и в конце строки
    return;
  }
  buyCard();
}

function buyCard() {
  console.log('buyCard');
  if (currentUser.hasCard === true) {
    console.log('already has a card');
    return;
  } 
  currentUser.hasCard = true;
  localStorage.setItem('library', JSON.stringify(users));
  closeModalBuyCard();
}
/*********************
/BUY A LIBRARY CARD
*********************/


/*********************
VISIT YOUR PROFILE
*********************/
const LibraryGet = document.querySelector('.js-lib-get');
const LibraryVisit = document.querySelector('.js-lib-visit');

function openLibraryVisit() {
  LibraryGet.classList.add('none');
  LibraryVisit.classList.remove('none');
}

function closeLibraryVisit() {
  LibraryVisit.classList.add('none');
  LibraryGet.classList.remove('none');
}
/*********************
/VISIT YOUR PROFILE
*********************/


/*********************
LOCAL STORAGE
*********************/
let users = JSON.parse(localStorage.getItem('library'));
if (!users) {
  users = [];
}
console.log('localStorage', users);

/*********************
/LOCAL STORAGE
*********************/


/*********************
STATUS
*********************/
/* before registration */
let currentUser;
let logStatus = 'logOut';
/*********************
/STATUS
*********************/


/*********************
BOOKS
*********************/
const books = [
  {
    id: 0,
    season: 'winter',
    name: 'The Book Eaters',
    author: 'Sunyi Dean',
  },

  {
    id: 1,
    season: 'winter',
    name: 'Cackle',
    author: 'Rachel Harrison',
  },

  {
    id: 2,
    season: 'winter',
    name: 'Dante: Poet of the Secular World',
    author: 'Erich Auerbach',
  },

  {
    id: 3,
    season: 'winter',
    name: 'The Last Queen',
    author: 'Clive Irving',
  },

  {
    id: 4,
    season: 'spring',
    name: 'The Body',
    author: 'Stephen King',
  },

  {
    id: 5,
    season: 'spring',
    name: 'Carry: A Memoir of Survival on Stolen Land',
    author: 'Toni Jenson',
  },

  {
    id: 6,
    season: 'spring',
    name: 'Days of Distraction',
    author: 'Alexandra Chang',
  },

  {
    id: 7,
    season: 'spring',
    name: 'Dominicana',
    author: 'Angie Cruz',
  },

  {
    id: 8,
    season: 'summer',
    name: 'Crude: A Memoir',
    author: 'Pablo Fajardo & ​​Sophie Tardy-Joubert',
  },

  {
    id: 9,
    season: 'summer',
    name: 'Let My People Go Surfing',
    author: 'Yvon Chouinard',
  },

  {
    id: 10,
    season: 'summer',
    name: 'The Octopus Museum: Poems',
    author: 'Brenda Shaughnessy',
  },

  {
    id: 11,
    season: 'summer',
    name: 'Shark Dialogues: A Novel',
    author: 'Kiana Davenport',
  },

  {
    id: 12,
    season: 'autumn',
    name: 'Casual Conversation',
    author: 'Renia White',
  },

  {
    id: 13,
    season: 'autumn',
    name: 'The Great Fire',
    author: 'Lou Ureneck',
  },

  {
    id: 14,
    season: 'autumn',
    name: 'Rickey: The Life and Legend',
    author: 'Howard Bryant',
  },

  {
    id: 15,
    season: 'autumn',
    name: 'Slug: And Other Stories',
    author: 'Megan Milks',
  },
]
/*********************
/BOOKS
*********************/