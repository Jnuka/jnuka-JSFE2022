import {convertJsonEntitiesToPets, shuffleArray} from './utils.js';
import { petsJson } from './json.pets.js'; 

// Найти направление движение карусели
function isRightMove(animationName) { 
  return animationName.split('-')[1] === "right"; 
}

// Найти размер отображаемых элементов на карусели
function resolveViwedCaroselSize() {
  const screenWidth = window.screen.width;
  if (screenWidth >= 1280) return 3;
  if (screenWidth >= 768) return 2;
  return 1;
}

// Генерация первых элементов карусели
function generateFirstCaroselElements() {
  let newCaroselElements = [];
  newCaroselElements.push(...getRandomNotUsedElements([], VIWED_ELEMENTS_SIZE));  
  return fillNeighboringElements(newCaroselElements);
};

// Заполнить новыми случайными элементами слева и справа основных
function fillNeighboringElements(vivedElements) {
  let leftPart = getRandomNotUsedElements(vivedElements, VIWED_ELEMENTS_SIZE);
  let rightPart = getRandomNotUsedElements(vivedElements, VIWED_ELEMENTS_SIZE);

  vivedElements.unshift(...leftPart);
  vivedElements.push(...rightPart);

  return vivedElements;
}

// Получить случайные классы животных определённого размера, исключая уже использованные эелементы
function getRandomNotUsedElements(alreadyUsedElementsArr, elementsCount) {
  let notUsedElements = [...PETS].filter(pet => !alreadyUsedElementsArr.includes(pet));
  notUsedElements = shuffleArray(notUsedElements);
  return notUsedElements.slice(0, elementsCount);
};

// Сдвинуть карусель
function moveCaroselView(animationEvent) {
  let isRight = isRightMove(animationEvent.animationName);
  petsCarousel = moveCaroselElements(isRight);

  let carosel = document.querySelector('.our__content');
  let caroselElements = document.querySelectorAll('.card');

  for (let i = 0; i < VIWED_ELEMENTS_SIZE; i++) {
    if (isRight) {
      CARUSEL_CONTENT.classList.remove('transition-right');

      caroselElements[i].remove();
      caroselElements[i + VIWED_ELEMENTS_SIZE].replaceWith(petsCarousel[i].generateCardTemplate());
      carosel.append(petsCarousel[petsCarousel.length - VIWED_ELEMENTS_SIZE + i].generateCardTemplate());
    
    } else {
      CARUSEL_CONTENT.classList.remove('transition-left');

      caroselElements[caroselElements.length - (i + 1)].remove();
      caroselElements[i + VIWED_ELEMENTS_SIZE].replaceWith(petsCarousel[petsCarousel.length - VIWED_ELEMENTS_SIZE + i].generateCardTemplate());
      carosel.prepend(petsCarousel[i].generateCardTemplate());
    }    
  }
  BUTTON_LEFT.addEventListener("click", carouselLeft);
  BUTTON_RIGHT.addEventListener("click", carouselRight);
}

// Сдвинуть элемент в нужную сторону и пересоздать левые и правые элементы
function moveCaroselElements(isRightMove) {
  let upptededPetsCarousel = [...petsCarousel];

  let nextViewedElements = isRightMove 
    ? upptededPetsCarousel.slice(-VIWED_ELEMENTS_SIZE)
    : upptededPetsCarousel.slice(0, VIWED_ELEMENTS_SIZE);
  return fillNeighboringElements(nextViewedElements);
}

// Инициализация элементов карусели
function initializeCaroselElements() {
  CARUSEL_CONTENT.innerHTML = '';
  petsCarousel.forEach(pet => {
    CARUSEL_CONTENT.append(pet.generateCardTemplate());
  });
}

// Нажатие карусели вправо
const carouselRight = () => {
  CARUSEL_CONTENT.classList.add('transition-right');    
  BUTTON_LEFT.removeEventListener("click", carouselLeft);
  BUTTON_RIGHT.removeEventListener("click", carouselRight);
}

// Нажатие карусели влево
const carouselLeft = () => {
  CARUSEL_CONTENT.classList.add('transition-left');  
  BUTTON_LEFT.removeEventListener("click", carouselLeft);
  BUTTON_RIGHT.removeEventListener("click", carouselRight);
}

// Все существующие животные
const PETS = convertJsonEntitiesToPets(petsJson);

// Количество отображаемых элементов на карусели
const VIWED_ELEMENTS_SIZE = resolveViwedCaroselSize();

// Карусель животных
let petsCarousel = generateFirstCaroselElements();
console.log(petsCarousel.length);

// DOM Elements
const BUTTON_LEFT = document.querySelector('#button-left');
const BUTTON_RIGHT = document.querySelector('#button-right');
const CARUSEL_CONTENT = document.querySelector('#our__content');

BUTTON_LEFT.addEventListener("click", carouselLeft);
BUTTON_RIGHT.addEventListener("click", carouselRight);

CARUSEL_CONTENT.addEventListener("animationend", (e) => moveCaroselView(e));
initializeCaroselElements();

