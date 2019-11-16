export const storageService = (function(){
  
  function saveLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
  }
  function retrieveLocalStorage() {
    return JSON.parse(localStorage.getItem('cards'));
  }

  return {
    saveLocalStorage: saveLocalStorage,
    retrieveLocalStorage: retrieveLocalStorage
  }

})();