console.log
(`1. Слайдер изображений в секции destinations +50
 - на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
 - три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
 - анимации плавного перемещения для слайдера +10
2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
 - логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
 - логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал, а просто меняет его наполнение). +25
Итоговая оценка: 125 баллов`
)

// burger-menu 

const navigationWrapper = document.querySelector('.burger');
const background = document.querySelector('.black-background');
const burger = document.querySelector('.header__burger');
const burgerClose = document.querySelector('.burger_close');
const navigationLinks = document.querySelectorAll('.navigation__link');

const onOpenNavigation = () => {
  navigationWrapper.style.transform = 'translateX(0)';
  background.style.opacity = '0.4';
  background.style.zIndex = '2';
}

const onCloseNavigation = () => {
  navigationWrapper.style.transform = 'translateX(165px)';
  background.style.opacity = '0';
  background.style.zIndex = '-1';
}

burger.addEventListener('click', onOpenNavigation);
burgerClose.addEventListener('click', onCloseNavigation);
background.addEventListener('click', onCloseNavigation);
navigationLinks.forEach(element => element.addEventListener('click', onCloseNavigation));

// login pop-up

const popUpWrapper = document.querySelector('.pop-up');
const buttonLogin = document.querySelector('.button_login');
const mobileAccount = document.getElementById('account');
const loginSignIn = document.querySelector('.pop-up__sign-in');
const loginSignUp = document.querySelector('.pop-up__sign-up');
const buttonNotAccount= document.querySelector('.not-account_register');
const buttonHaveAccount = document.querySelector('.have-account_log-in');
const inputEmailIn = document.getElementById('e-mail_in');
const inputPasswordIn = document.getElementById('password_in');
const inputEmailUp = document.getElementById('e-mail_up');
const inputPasswordUp = document.getElementById('password_up');
const buttonSignIn = document.querySelector('.sign-in_form');
const buttonSignUp = document.querySelector('.sign-up_form');

const onOpenLoginPopUp = () => {
  popUpWrapper.style.transform = 'translateY(30px)';
  background.style.opacity = '0.25';
  background.style.zIndex = '2';
  loginSignIn.style.display = 'block';
  loginSignUp.style.display = 'none';
}

const onCloseLoginPopUp = () => {
  popUpWrapper.style.transform = 'translateY(-1125px)';
  background.style.opacity = '0';
  background.style.zIndex = '-1';
}

const onOpenLoginSignUp = () => {
  loginSignIn.style.display = 'none';
  loginSignUp.style.display = 'block';
}

const onCloseLoginSignUp = () => {
  loginSignIn.style.display = 'block';
  loginSignUp.style.display = 'none';
}

const onOpenAlertIn = () => {
  if(!inputEmailIn.value || !inputPasswordIn.value) {
    alert ('Поля E-mail и Password должны быть заполнены');
  } else {
    alert (`E-mail: ${inputEmailIn.value}
Password: ${inputPasswordIn.value}`);
  }
  inputEmailIn.value = '';
  inputPasswordIn.value = '';
}

const onOpenAlertUp = () => {
  if(!inputEmailUp.value || !inputPasswordUp.value) {
    alert ('Поля E-mail и Password должны быть заполнены');
  } else {
    alert (`E-mail: ${inputEmailUp.value}
Password: ${inputPasswordUp.value}`);
  }
  inputEmailUp.value = '';
  inputPasswordUp.value = '';
}

buttonLogin.addEventListener('click', onOpenLoginPopUp);
mobileAccount.addEventListener('click', onOpenLoginPopUp);
background.addEventListener('click', onCloseLoginPopUp);
buttonNotAccount.addEventListener('click', onOpenLoginSignUp);
buttonHaveAccount.addEventListener('click', onCloseLoginSignUp);
buttonSignIn.addEventListener('click', onOpenAlertIn);
buttonSignUp.addEventListener('click', onOpenAlertUp);

// slider

let currentSlide = 2; // 2 is initial slide

const slides = Array.from(document.querySelectorAll('.country'));
const sliderWrapper = document.querySelector('.destinations__countries');
const sliderScrollPoints = Array.from(document.querySelectorAll('.scroll'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const changeSlide = (currentSlideNumber) => {
  sliderWrapper.style.transform = `translateX(${-100 * currentSlideNumber}%)`;
  sliderScrollPoints.forEach((sliderScrollPointElement, indexInArr) => {
    sliderScrollPointElement.classList.remove('scroll-active');
    if ((indexInArr + 1) === currentSlideNumber) {
      sliderScrollPointElement.classList.add('scroll-active');
    }
  });

  leftArrow.classList.remove('arrow-inactive');
  rightArrow.classList.remove('arrow-inactive');
  if (currentSlideNumber === 1) {
    leftArrow.classList.add('arrow-inactive');
  } else if (currentSlideNumber === sliderScrollPoints.length) {
    rightArrow.classList.add('arrow-inactive');
  }
}

const slideClickHandler = (slideNumericId) => () => {
  currentSlide = slideNumericId;
  changeSlide(currentSlide);
}

const leftArrowClickHandler = () => {
  if (currentSlide > 1) {
    currentSlide--;
    changeSlide(currentSlide);
  }
}

const rightArrowClickHandler = (maxAmountOfSlides) => () => {
  if (currentSlide < maxAmountOfSlides) {
    currentSlide++;
    changeSlide(currentSlide);
  }
}

const initializeSlider = () => {
  const firstSlide= slides.at(0);
  const lastSlide = slides.at(-1);
  const firstSlideCopy = firstSlide.cloneNode(true);
  const lastSlideCopy = lastSlide.cloneNode(true);
  sliderWrapper.prepend(lastSlideCopy);
  sliderWrapper.append(firstSlideCopy);
  firstSlideCopy.style.opacity = '0.6';
  lastSlideCopy.style.opacity = '0.6';

  slides.forEach((slideElement, slideId) => {
    const slideNumericId = Number(slideElement.dataset.slide);
    const point = sliderScrollPoints[slideId];
    point.addEventListener('click', slideClickHandler(slideNumericId));
    slideElement.addEventListener('click', slideClickHandler(slideNumericId));
  });

  leftArrow.addEventListener('click', leftArrowClickHandler);
  rightArrow.addEventListener('click', rightArrowClickHandler(slides.length));

  changeSlide(currentSlide);
}

initializeSlider();
