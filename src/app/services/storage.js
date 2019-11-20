export const storageService = (function(){
  
  function saveLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
  }
  
  function removeFromLocalStorage(index) {
    let cards = retrieveLocalStorage();
    let remove = cards.splice(index, 1);
    saveLocalStorage(cards);
  }
  
  function shuffleStoredCards() {
    let cards = retrieveLocalStorage();
    
    var i, j, temp;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    saveLocalStorage(cards);
  }

  function retrieveLocalStorage() {
    return JSON.parse(localStorage.getItem('cards'));
  }

  return {
    saveLocalStorage: saveLocalStorage,
    removeFromLocalStorage: removeFromLocalStorage,
    retrieveLocalStorage: retrieveLocalStorage,
    shuffleStoredCards: shuffleStoredCards
  }

})();