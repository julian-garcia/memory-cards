export const storageService = (function(){
  
  function saveLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
  }
  
  function removeFromLocalStorage(index) {
    let cards = retrieveLocalStorage();
    let remove = cards.splice(index, 1);
    saveLocalStorage(cards);
  }

  function retrieveLocalStorage() {
    return JSON.parse(localStorage.getItem('cards'));
  }

  return {
    saveLocalStorage: saveLocalStorage,
    removeFromLocalStorage: removeFromLocalStorage,
    retrieveLocalStorage: retrieveLocalStorage
  }

})();