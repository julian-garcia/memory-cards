import { storageService } from '../services/storage';

export const uiModule = (function() {
  const cardsElement = document.querySelector('.cards');
  const addButton = document.querySelector('.card-form__button.add-button');
  const editButton = document.querySelector('.card-form__button.edit-button');
  const toggleCardsButton = document.querySelector('.toggle-all-cards');
  const shuffleButton = document.querySelector('.shuffle-cards');
  const cardFormButton = document.querySelector('.show-form-button');
  const cardTitle = document.querySelector('.card-form__title');
  const cardDescription = document.querySelector('.card-form__description');
  const cardForm = document.querySelector('.card-form');

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
          <button class="mdc-button mdc-card__action button__edit">
            <i class="material-icons icon__edit">edit</i>
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

  function toggleContent(cardElement, className) {
    const cards = storageService.retrieveLocalStorage();

    if (/.+__hide/.test(className)) {
      cardElement.querySelector('.item__title').textContent = 'Hidden';
      cardElement.querySelector('.item__copy').classList.add('hidden');
    } else if (/.+__show/.test(className)) {
      cardElement.querySelector('.item__title').textContent = cards[parseInt(cardElement.getAttribute('data-index'))].title;
      cardElement.querySelector('.item__copy').classList.remove('hidden');
    }
  }

  function editCardForm(e) {
    let cardElement = getParentCardElement(e.target);

    if (/.+__edit/.test(e.target.className)) {
      let cards = storageService.retrieveLocalStorage();
      let currentCard = cards[parseInt(cardElement.getAttribute('data-index'))];
      cardTitle.value = currentCard.title;
      cardDescription.value = currentCard.description;
      cardForm.classList.add('card-form__show');
      editButton.setAttribute('data-index', cardElement.getAttribute('data-index'));
      addButton.style.display = 'none';
      editButton.style.display = 'block';
      cardTitle.focus();
    }
  }

  function deleteCard(e) {
    let cardElement = getParentCardElement(e.target);

    if (/.+__delete/.test(e.target.className)) {
      storageService.removeFromLocalStorage(parseInt(cardElement.getAttribute('data-index')));
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
    cardsElement.innerHTML = '';

    if (cards) {
      cards.forEach((card, index) => {
        generateCard(card.title, card.description, index);
      });
    }
  }

  function toggleCardVisibility(visibilityClass) {
    document.querySelectorAll('.item')
      .forEach(item => {
        toggleContent(item, visibilityClass);
      });
  }

  function shuffleCards() {
    storageService.shuffleStoredCards();
    toggleCardsButton.textContent = 'visibility_off';
    refreshContent();
  }

  return {
    addCardListener: function() {
      addButton.addEventListener('click', function() {
        const cards = storageService.retrieveLocalStorage() || [];
        generateCard(cardTitle.value, cardDescription.value, cards.length);
      });
    },
    editCardListener: function() {
      editButton.addEventListener('click', function() {
        let cards = storageService.retrieveLocalStorage();
        cards[parseInt(this.getAttribute('data-index'))] = {title: cardTitle.value, description: cardDescription.value};
        storageService.saveLocalStorage(cards);
        refreshContent();
      });
    },
    initialiseCardForm: function() {
      cardFormButton.addEventListener('click', function() {
        setTimeout(function() {
          cardTitle.value = '';
          cardDescription.value = '';
          cardTitle.focus();
          addButton.style.display = 'block';
          editButton.style.display = 'none';
        }, 0);
      });
    },
    editCardForm: function() {
      cardsElement.addEventListener('click', function(e) {
        editCardForm(e);
      });
    },
    toggleContent: function(e) {
      cardsElement.addEventListener('click', function(e) {
        const targetElement = e.target;
        let cardElement = getParentCardElement(targetElement);
        toggleContent(cardElement, targetElement.className);
      });
    },
    toggleCardVisibility: function() {
      toggleCardsButton.addEventListener('click', function() { 
        let visibilityClass = (this.textContent === 'visibility_off') ? 'a__hide' : 'a__show';
        toggleCardVisibility(visibilityClass);
        this.textContent = (this.textContent === 'visibility_off') ? 'visibility' : 'visibility_off';
      });
    },
    deleteCard: function(e) {
      cardsElement.addEventListener('click', function(e) {
        deleteCard(e);
      });
    },
    refreshContent: function() {
      document.addEventListener('DOMContentLoaded', refreshContent);
    },
    shuffleCards: function() {
      shuffleButton.addEventListener('click', shuffleCards);
    }
  };
})();