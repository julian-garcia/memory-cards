import { storageService } from '../services/storage';

export const uiModule = (function() {
  const cardsElement = document.querySelector('.cards');
  const cardButton = document.querySelector('.card-form__button');
  const cardTitle = document.querySelector('.card-form__title');
  const cardDescription = document.querySelector('.card-form__description');
  const cardFormButton = document.querySelector('.show-form-button');

  function generateCard(title, description, index) {
    if (title && description) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('mdc-layout-grid__cell');
      gridCell.classList.add('mdc-layout-grid__cell--span-3-desktop');
      gridCell.classList.add('mdc-layout-grid__cell--span-4-tablet');
      gridCell.classList.add('mdc-layout-grid__cell--span-12-phone');
      const cardElement = document.createElement('div');
      cardElement.classList.add('item');
      cardElement.classList.add('mdc-card');
      cardElement.setAttribute('data-index', index);
      cardElement.innerHTML = `
        <div class="item__text-section">
          <h2 class="mdc-typography item__title">${title}</h2>
        </div>
        <div class="item__text-section">
          <p class="mdc-typography item__copy">${description}</p>
        </div>
        <div class="mdc-card__actions">
          <button class="mdc-button mdc-card__action button__show">
            <i class="material-icons icon__show">visibility</i>
          </button>
          <button class="mdc-button mdc-card__action button__hide">
            <i class="material-icons icon__hide">visibility_off</i>
          </button>
          <button class="mdc-button mdc-card__action button__delete">
            <i class="material-icons icon__delete">delete</i>
          </button>
        </div>`;
      gridCell.appendChild(cardElement);
      cardsElement.appendChild(gridCell);  
      storageService.saveLocalStorage(cardList());
    }
  }

  function getParentCardElement(targetElement) {
    if (/button__.+/.test(targetElement.className)) {
      return targetElement.parentElement.parentElement;
    } else if (/icon__.+/.test(targetElement.className)) {
      return targetElement.parentElement.parentElement.parentElement;
    } else { 
      return; 
    }
  }

  function toggleContent(e) {
    const targetElement = e.target;
    const cards = storageService.retrieveLocalStorage();

    let cardElement = getParentCardElement(targetElement);

    if (/.+__hide/.test(targetElement.className)) {
      cardElement.querySelector('.item__title').textContent = 'Hidden';
      cardElement.querySelector('.item__copy').classList.add('hidden');
    } else if (/.+__show/.test(targetElement.className)) {
      cardElement.querySelector('.item__title').textContent = cards[parseInt(cardElement.getAttribute('data-index'))].title;
      cardElement.querySelector('.item__copy').classList.remove('hidden');
    }
  }

  function deleteCard(e) {
    const targetElement = e.target;
    let cardElement = getParentCardElement(targetElement);

    if (/.+__delete/.test(targetElement.className)) {
      storageService.removeFromLocalStorage(parseInt(cardElement.getAttribute('data-index')));
      cardsElement.innerHTML = '';
      refreshContent();
    }
  }

  function cardList() {
    let cardList = [];
    document.querySelectorAll('.item')
      .forEach(item => {
        cardList.push({ title: item.querySelector('.item__title').textContent,
                        description: item.querySelector('.item__copy').textContent });
      });
    return cardList;
  }

  function refreshContent() {
    const cards = storageService.retrieveLocalStorage();
    if (cards) {
      cards.forEach((card, index) => {
        generateCard(card.title, card.description, index);
      });
    }
  }

  return {
    addCardListener: function() {
      cardButton.addEventListener('click', function() {
        const cards = storageService.retrieveLocalStorage() || [];
        generateCard(cardTitle.value, cardDescription.value, cards.length);
      });
    },
    initialiseCardForm: function() {
      cardFormButton.addEventListener('click', function() {
        setTimeout(function() {
          cardTitle.value = '';
          cardDescription.value = '';
          cardTitle.focus();
        }, 0);
      });
    },
    toggleContent: function(e) {
      cardsElement.addEventListener('click', function(e) {
        toggleContent(e);
      });
    },
    deleteCard: function(e) {
      cardsElement.addEventListener('click', function(e) {
        deleteCard(e);
      });
    },
    refreshContent: function() {
      document.addEventListener('DOMContentLoaded', refreshContent);
    }
  };
})();