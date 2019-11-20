import '../style/main.scss';
import { uiModule } from './ui/cards';

// Event listeners for showing/hiding content, adding/removing cards

uiModule.initialiseCardForm();
uiModule.editCardForm();
uiModule.deleteCard();
uiModule.addCardListener();
uiModule.editCardListener();
uiModule.toggleCardVisibility();
uiModule.toggleContent();
uiModule.refreshContent();
uiModule.shuffleCards();