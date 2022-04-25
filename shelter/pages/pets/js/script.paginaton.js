import { convertJsonEntitiesToPets, shuffleArray,  } from "../../main/js/utils.js";
import { petsJson } from "../../main/js/json.pets.js";

function resolvePaginationSize() {
  const screenWidth = window.screen.width;
  if (screenWidth >= 1280) return 8;
  if (screenWidth >= 768) return 6;
  return 3;
}

function generateRandomPages(pets, paginationSize) {
  let petCollisionMap = {};
  pets.forEach(pet => petCollisionMap[pet] = 0);

  const PAGES_LENGTH = MAX_ELEMENT / paginationSize;
  let pages = [];

  let unusedPetsArray = [...pets];

  for (let pageIndex = 0; pageIndex < PAGES_LENGTH; pageIndex++) {
      let newPage = shufflePets(unusedPetsArray, petCollisionMap, paginationSize);
      pages.push(newPage);

      newPage.forEach(pet => petCollisionMap[pet] += 1);
      unusedPetsArray = unusedPetsArray.filter(pet => petCollisionMap[pet] < MAX_COLLISION);
  }

  return pages;
}

function shufflePets(pets, collisionMap, paginationSize) {
  let smallUsedPets = shuffleArray(pets)
      .sort((leftPet, rightPet) => collisionMap[leftPet] - collisionMap[rightPet])
      .slice(0, paginationSize);

  return shuffleArray(smallUsedPets);
}

function replaveCardsView(pageNumber) {
  let cardsView = document.querySelectorAll(".card");
  let pageContent = GENERATED_PAGES[pageNumber - 1];

  for (let i = 0; i < pageContent.length; i++) {
    cardsView[i].replaceWith(pageContent[i].generateCardTemplate());
  }
}

function viewLeftPage() {  
  if (currentPage > 1) {
    enableAnimation();
    
    currentPage -= 1;
    pageNumberElement.innerHTML = currentPage;
    replaveCardsView(currentPage);

    enableRightButtons();
    if (currentPage === 1) {
      disableLeftButtons();
    }
  }
}

function viewRightPage() {
  let latestPageNumber = MAX_ELEMENT / PAGINATION_SIZE;
  
  if (currentPage < latestPageNumber) {
    enableAnimation();

    currentPage += 1;
    pageNumberElement.innerHTML = currentPage;
    replaveCardsView(currentPage);

    enableLeftButtons();
    if (currentPage === latestPageNumber) {
      disableRightButtons();
    }
  }
}

function viewFirstPage() {
  if (currentPage > 1) {
    enableAnimation();

    currentPage = 1;
    pageNumberElement.innerHTML = currentPage;
    replaveCardsView(currentPage);

    disableLeftButtons();
    enableRightButtons();
  }
}

function viewLastPage() {
  let latestPageNumber = MAX_ELEMENT / PAGINATION_SIZE;

  if (currentPage < latestPageNumber) {
    enableAnimation();

    currentPage = latestPageNumber;
    pageNumberElement.innerHTML = currentPage;
    replaveCardsView(currentPage);

    disableRightButtons();
    enableLeftButtons();
  }
}

const disableLeftButtons = () => {
  leftButton.classList.add('paginator__button-disabled');
  leftToTheEndButton.classList.add('paginator__button-disabled');
}

const disableRightButtons = () => {
  rightButton.classList.add('paginator__button-disabled');
  rightToTheEndButton.classList.add('paginator__button-disabled');
}

const enableLeftButtons = () => {
  leftButton.classList.remove('paginator__button-disabled');
  leftToTheEndButton.classList.remove('paginator__button-disabled');
}

const enableRightButtons = () => {
  rightButton.classList.remove('paginator__button-disabled');
  rightToTheEndButton.classList.remove('paginator__button-disabled');
}

const enableAnimation = () => {
  ourContent.classList.add('transition');
}

const disableAnimation = () => {
  ourContent.classList.remove('transition');
}

const MAX_COLLISION = 6;
const MAX_ELEMENT = 48;

const PETS = convertJsonEntitiesToPets(petsJson);
const PAGINATION_SIZE = resolvePaginationSize();
const GENERATED_PAGES = generateRandomPages(PETS, PAGINATION_SIZE);

let leftButton = document.querySelector("#left");
let rightButton = document.querySelector("#right");

let leftToTheEndButton = document.querySelector("#endLeft");
let rightToTheEndButton = document.querySelector('#endRight');

const ourContent = document.querySelector('.our__content');

ourContent.addEventListener("animationstart", () => {
  leftButton.removeEventListener("click", viewLeftPage);
  rightButton.removeEventListener("click", viewRightPage);

  leftToTheEndButton.removeEventListener("click", viewFirstPage);
  rightToTheEndButton.removeEventListener("click",viewLastPage);
});

ourContent.addEventListener("animationend", () => {
  disableAnimation();

  leftButton.addEventListener("click", viewLeftPage);
  rightButton.addEventListener("click", viewRightPage);

  leftToTheEndButton.addEventListener("click", viewFirstPage);
  rightToTheEndButton.addEventListener("click",viewLastPage);
});

let currentPage = 1;
let pageNumberElement = document.querySelector("#pageNumber");

pageNumberElement.innerHTML = currentPage;
replaveCardsView(currentPage);

leftButton.addEventListener("click", viewLeftPage);
rightButton.addEventListener("click", viewRightPage);

leftToTheEndButton.addEventListener("click", viewFirstPage);
rightToTheEndButton.addEventListener("click",viewLastPage);