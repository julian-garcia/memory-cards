export const uiModule = (function() {
  const cardsElement = document.querySelector('.cards');
  const cardButton = document.querySelector('.card-form__button');
  const cardTitle = document.querySelector('.card-form__title');
  const cardDescription = document.querySelector('.card-form__description');

  function generateCard() {
    if (cardTitle.value && cardDescription.value) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('mdc-layout-grid__cell');
      gridCell.classList.add('mdc-layout-grid__cell--span-3-desktop');
      gridCell.classList.add('mdc-layout-grid__cell--span-4-tablet');
      gridCell.classList.add('mdc-layout-grid__cell--span-12-phone');
      const cardElement = document.createElement('div');
      cardElement.classList.add('item');
      cardElement.classList.add('mdc-card');
      cardElement.innerHTML = `
        <div class="item__text-section">
          <h2 class="mdc-typography item__title">${cardTitle.value}</h2>
        </div>
        <div class="item__text-section">
          <p class="mdc-typography item__copy">${cardDescription.value}</p>
        </div>
        <div class="mdc-card__actions">
          <button class="mdc-button mdc-card__action">
            <i class="material-icons">visibility</i>
          </button>
          <button class="mdc-button mdc-card__action">
            <i class="material-icons">visibility_off</i>
          </button>
        </div>`;
      gridCell.appendChild(cardElement);
      cardsElement.appendChild(gridCell);    
    }
  }

  return {
    addCardListener: function() {
      cardButton.addEventListener('click', generateCard);
    }
  };
})();