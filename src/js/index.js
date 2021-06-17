'use strict';

// ====================
// Header slider
// ====================
// const slider = function () {
const slides = document.querySelectorAll('.header__slide');
const btnLeft = document.querySelector('.header__slider__btn-left');
const btnRight = document.querySelector('.header__slider__btn-right');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
// };
// slider();

// ====================
//rating popup
// ====================
function rating() {
  const btnRating = document.querySelectorAll('.slider-btn');
  btnRating.forEach(function (rate) {
    rate.addEventListener('click', function () {
      const popup = document.querySelector('.header__rating');
      popup.classList.toggle('rating_animation');
    });
  });
}
rating();

// ====================
// spaces carousal
// ====================

new Glide('.space__glide', {
  type: 'carousel',
  autoplay: 1500,
  perView: 3,
  gap: 1,

  breakpoints: {
    900: {
      perView: 2,
    },
    600: {
      perView: 1,
    },
  },
}).mount();

// ====================
// company carousal
// ====================
new Glide('.company__glide', {
  type: 'carousel',
  autoplay: 1500,
  perView: 6,
  gap: 150,

  breakpoints: {
    1600: {
      perView: 5,
    },
    1200: {
      perView: 4,
    },
    900: {
      perView: 3,
    },
    600: {
      perView: 3,
      gap: 70,
    },
    400: {
      perView: 2,
      gap: 100,
    },
  },
}).mount();

// ====================
// contact form
// ====================

// just for the demo purpose not for real submission

const form = document.querySelector('#form');
const inputMsg = document.querySelector('#msg');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputSubject = document.querySelector('#subject');
const sendBtn = document.querySelector('.send__btn');

function valid(email) {
  return /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
    email
  );
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.textContent = message;
  small.style.visibility = 'visible';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.style.visibility = 'hidden';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msgValue = inputMsg.value.trim();
  const nameValue = inputName.value.trim();
  const emailValue = inputEmail.value.trim();
  const subjectValue = inputSubject.value.trim();

  if (msgValue === '') {
    setErrorFor(inputMsg, 'Message cannot be blank');
  } else if (msgValue.length > 500) {
    setErrorFor(inputMsg, `Please write between 20 to 500 characters`);
  } else {
    setSuccessFor(inputMsg);
  }

  if (nameValue === '') {
    setErrorFor(inputName, 'Name cannot be blank');
  } else if (!isNaN(nameValue)) {
    setErrorFor(inputName, 'Not a valid name');
  } else {
    setSuccessFor(inputName);
  }

  if (emailValue === '') {
    setErrorFor(inputEmail, 'Email cannot be blank');
  } else if (!valid(emailValue)) {
    setErrorFor(inputEmail, 'Not a valid email');
  } else {
    setSuccessFor(inputEmail);
  }

  if (subjectValue === '') {
    setErrorFor(inputSubject, 'Subject cannot be blank');
  } else if (!isNaN(subjectValue)) {
    setErrorFor(inputSubject, 'Not a valid subject');
  } else {
    setSuccessFor(inputSubject);
  }

  if (
    msgValue !== '' &&
    msgValue.length < 500 &&
    nameValue !== '' &&
    isNaN(nameValue) &&
    emailValue !== '' &&
    valid(emailValue) &&
    subjectValue !== '' &&
    isNaN(subjectValue)
  ) {
    const sendMsg = document.querySelector('.send-msg');
    sendMsg.style.visibility = 'visible';
    inputMsg.value = '';
    inputName.value = '';
    inputEmail.value = '';
    inputSubject.value = '';
    setTimeout(function () {
      const sendMsg = document.querySelector('.send-msg');
      sendMsg.style.visibility = 'hidden';
    }, 5000);
  }
});

// ====================
// subscribe news
// ====================
// only for demo purpose logic not for submission
const formSubscribe = document.querySelector('#form-subscribe');
const inputEmailSubscribe = document.querySelector('.subscribe__email');

formSubscribe.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailValueSubscribe = inputEmailSubscribe.value.trim();

  if (emailValueSubscribe === '') {
    setErrorFor(inputEmailSubscribe, 'Email cannot be blank');
  } else if (!valid(emailValueSubscribe)) {
    setErrorFor(inputEmailSubscribe, 'Not a valid email');
  } else {
    setSuccessFor(inputEmailSubscribe);

    const subscribeMsg = document.querySelector('.subscribe-msg');
    subscribeMsg.style.display = 'block';
    inputEmailSubscribe.value = '';
    setTimeout(function () {
      subscribeMsg.style.display = 'none';
    }, 5000);
  }
});

// ====================
// navigation
// ====================
const scrollNav = document.querySelectorAll(
  '.navigation__link,.footer__link,.explore-btn,.about-more,.logo-home'
);

scrollNav.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
// --------------------
// sticky navigation
// --------------------
window.addEventListener('scroll', function () {
  const stickyNav = document.querySelector('.navigation');
  stickyNav.classList.toggle('sticky', window.scrollY > 0);
});

// --------------------
// onClick navigation hide
// --------------------
const hideNav = document.querySelectorAll('.navigation__link');

hideNav.forEach(function (hide) {
  hide.addEventListener('click', function () {
    document.querySelector('.navigation__checkbox').checked = false;
  });
});

// ====================
// onscroll active link
// ====================

const sections = document.querySelectorAll(
  '#home,#about,#space,#feature,#contact'
);

function navActive() {
  let scrollDown = window.pageYOffset;

  sections.forEach(function (present) {
    const sectionHeight = present.offsetHeight;
    const sectionUp = present.offsetTop - 150;
    const sectionID = present.getAttribute('id');

    if (scrollDown > sectionUp && scrollDown <= sectionUp + sectionHeight) {
      document
        .querySelector('.navigation__nav a[href*=' + sectionID + ']')
        .classList.add('active');
    } else {
      document
        .querySelector('.navigation__nav a[href*=' + sectionID + ']')
        .classList.remove('active');
    }
  });
}

window.addEventListener('scroll', navActive);
