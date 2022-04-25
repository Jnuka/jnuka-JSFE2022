import { ModalWindow } from "./class.modal-window.js";

export class Pet extends ModalWindow {
  constructor({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
    super();
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  generateCardTemplate() {
    let template = '';
    let pet = document.createElement('div');
    pet.className = 'card';
    template += `<img class="card__img" src=${this.img} alt="${this.name}">`;
    template += `<h4 class="card__title">${this.name}</h4>`;
    template += `<button class="card__button">Learn more</button>`;
    template += `</div>`;
    pet.innerHTML = template;
    
    pet.addEventListener("click", (event) => { 
      if (event.currentTarget.closest('.card')) {
        document.body.classList.toggle('body__no-scroll');
        this.renderModal();
      }
    });
    return pet;
  }

  generateModalCardTemplate() {
    let template = '';
    let pet = document.createElement('div');
    pet.className = 'modal__content';
    template += `<img class="modal__img" src=${this.img} alt="${this.name}">`;
      
    template += `<div class="modal__inner">`;
    
    template += `<h3 class="content__title">${this.name}</h3>`;
    template += `<h4 class="content__type">${this.type} - ${this.breed}</h4>`;
    template += `<h5 class="content__description">${this.description}</h5>`;

    template += `<ul class="content__list">`;
    template += `<li class="content__list-item"><span class="item-bold">Age:</span> ${this.age}</li>`;
    template += `<li class="content__list-item"><span class="item-bold">Inoculations:</span> ${this.inoculations}</li>`;
    template += `<li class="content__list-item"><span class="item-bold">Diseases:</span> ${this.diseases}</li>`;
    template += `<li class="content__list-item"><span class="item-bold">Parasites:</span> ${this.parasites}</li>`;
    template += `</ul>`;
    template += `</div>`;
    template += `</button>`;
    template += `</div>`;

    pet.innerHTML = template;
    return pet;
  }

  renderModal() {
    let content = this.generateModalCardTemplate();
    super.bildModalWindow(content);
  }

  toString() {
    return this.name;
  }
}